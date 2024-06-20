import {useEffect, useState} from 'react'
import axios, {AxiosError} from 'axios'
import { IListItem, IToDo } from '../../../app/types/planner/IPlanner'

const API_URL = process.env.REACT_APP_PRIVATE_API_URL

interface ITodoDTO {
  user_id?: number,
  date_start: Date,//здесь должен быть формат даты типа dd.mm.yyyy
  date_end: Date,//здесь должен быть формат даты типа dd.mm.yyyy
  title: string,
  // start_time: Date,
  // end_time: Date,
  description: string, 
  items?: IListItem[],
  expense: number, //расходы
  done: boolean
}

export function useTodo() {
  const [importantToday, setImportantToday] = useState<IToDo[]>([])
  const [todo, setTodo] = useState<IToDo[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function addTodo(todo: ITodoDTO, date: Date) {
    // let todoTmp: IToDo = {
    //   id: Number(new Date()),
    //   user_id: 1,
    //   ...todo,
    // }
    // setTodo(prev=>[...prev, todoTmp])
    // let timedelta = todo.date_end.getDate() + '.' + (todo.date_end.getMonth()) + '.' + todo.date_end.getFullYear()
    // let timedelta = '29.5.2023'
    // console.log(todo)
    try {
        await axios.post(`${API_URL}/planner/tasks/`, todo)
        // const elems = await (await axios.get(`${API_URL}/planner/tasks/?timedelta=${timedelta}`)).data
        const elems = await (await axios.get(`${API_URL}/planner/tasks/`)).data
        // let dtTmp = date.split('.')
        // let dt = new Date(Number(dtTmp[2]), Number(dtTmp[1]), Number(dtTmp[0]))
        let newArr:IToDo[]  = []
        elems.forEach((el: IToDo)=>{
        
          let dt1 = new Date(new Date(el.date_start!).getFullYear(),new Date(el.date_start!).getMonth(),new Date(el.date_start!).getDate())
          let dt2 = new Date(new Date(el.date_end).getFullYear(),new Date(el.date_end).getMonth(),new Date(el.date_end).getDate())
          // console.log(new Date(el.date_end).getMonth()+1)
          // console.log(el.date_start)
          if(dt1<=date && dt2>=date) {
            
            newArr.push(el)
          }
        })
        
        getImportantToday(new Date().getDate()+'.'+(new Date().getMonth())+'.'+new Date().getFullYear())
        setTodo(newArr)  
    } catch (error) {
        // throw new Error(error.message)
        console.log(error)
    }
    
  }

  // async function getTodo(date: string) {
  //   // setTodo(toDoList2)
  //   // console.log(date)
  //   try {
  //     setError('')
  //     setLoading(true)
  //     const response = await axios.get<IToDo[]>(`${url}/planner/tasks/?timedelta=${date}`)
  //     setTodo(response.data)
  //     // console.log(response.data)
  //     setLoading(false)
  //   } catch (e: unknown) {
  //     const error = e as AxiosError
  //     setLoading(false)
  //     setError(error.message)
  //   }
  // }

  async function getTodo(date: string) {
    // setTodo(toDoList2)
    let dtTmp = date.split('.')
    let dt = new Date(Number(dtTmp[2]), Number(dtTmp[1]), Number(dtTmp[0]))
    // console.log(dtTmp)
    try {
      setError('')
      setLoading(true)
      // const response = await axios.get<any>(`${url}/planner/projects/${id}/?timedelta=${date}`)
      const response = await axios.get(`${API_URL}/planner/tasks/`)
      let arr: IToDo[] = response.data
      console.log(arr)
      let newArr:IToDo[]  = []
      // console.log(arr[0])
      
      arr.forEach((el: IToDo)=>{
        
        let dt1 = new Date(new Date(el.date_start!).getFullYear(),new Date(el.date_start!).getMonth(),new Date(el.date_start!).getDate())
        let dt2 = new Date(new Date(el.date_end).getFullYear(),new Date(el.date_end).getMonth(),new Date(el.date_end).getDate())
        // console.log(new Date(el.date_end).getMonth()+1)
        // console.log(el.date_end)
        console.log(dt1)
        // console.log(dt1)
        if(dt1<=dt && dt2>=dt) {
          
          newArr.push(el)
        }
      })
      setTodo(newArr)
      // setTodo(response.data.tasks_list)
      // console.log(response.data)
      setLoading(false)
    } catch (e: unknown) {
      const error = e as AxiosError
      setLoading(false)
      setError(error.message)
    }
  }

  const editTodoInner  = async (id: number, idInner: number) => {
    try {
      // const res = await axios.put(`${API_URL}/planner/items/${idInner}/`)
      let newTodo = todo.map(el => {
        if(el.id === id) {
          el.desc_list!.map(innerEl=>{
            if(innerEl.id === idInner) {
              innerEl.done = !innerEl.done
            }
            return innerEl
          })
        }
        return el
      })
      setTodo(newTodo)
  } catch (error) {
      console.log(error)
  }
    
  }

  const editTodo = async (id: number) => {
    // let newTodo = todo.map(el => {
    //   if(el.id === id) {
    //     el.done = !el.done
    //     return el
    //   }
    //   return el
    // })
    // setTodo(newTodo)
    // console.log(1)
    try {
        // const res = await axios.put(`${url}/planner/tasks/${id}/`)
        let newTodo = todo.map(el => {
          if(el.id === id) {
            el.done = !el.done
            return el
          }
          return el
        })
        setTodo(newTodo)

        let newTodoI = importantToday.map(el => {
          if(el.id === id) {
            el.done = !el.done
            return el
          }
          return el
        })
        setImportantToday(newTodoI)
    } catch (error) {
        console.log(error)
    }
    // let newTodoI = importantToday.map(el => {
    //   if(el.id === id) {
    //     el.done = !el.done
    //     return el
    //   }
    //   return el
    // })
    // setImportantToday(newTodoI)
}

const removeTodo = async (id: number) => {
      // let newTodo = todo.filter(el => el.id !== id)
      // setTodo(newTodo)
      // console.log(id)
    try {
        await axios.delete(`${API_URL}/planner/tasks/del/${id}/`)
        let newTodo = todo.filter(el => el.id !== id)
        setTodo(newTodo)
        let newTodoI = importantToday.filter(el => el.id !== id)
        setImportantToday(newTodoI)
    } catch (error) {
        console.log(error)
    }
  // let newTodoI = importantToday.filter(el => el.id !== id)
  // setImportantToday(newTodoI)
}

// async function getImportantToday(date: string) {
//   let data: IToDo[] = []
//   // toDoList.forEach(el=>{
//   //     if(el.expense! > 0) {
//   //        data.push(el)
//   //     }
//   // })
//   // todo.forEach(el=>{
//   //   if(el.expense! > 0) {
//   //      data.push(el)
//   //   }
//   // })
//   // setImportantToday(data)
//   try {
//     let data: IToDo[] = []
//     setError('')
//     setLoading(true)
//     const response = await axios.get<IToDo[]>(`${url}/planner/tasks/?timedelta=${date}`)
//     // console.log(response.data)
//     response.data.forEach(el=>{
//       if(el.expense! > 0) {
//          data.push(el)
//       }
//     })
//     setImportantToday(data)
//     console.log(data)
//     setLoading(false)
//   } catch (e: unknown) {
//     const error = e as AxiosError
//     setLoading(false)
//     setError(error.message)
//   }
// }
async function getImportantToday(date: string) {
  // let data: IToDo[] = []
  // toDoList.forEach(el=>{
  //     if(el.expense! > 0) {
  //        data.push(el)
  //     }
  // })
  // todo.forEach(el=>{
  //   if(el.expense! > 0) {
  //      data.push(el)
  //   }
  // })
  // setImportantToday(data)
  // console.log(date)
  try {
    let data: IToDo[] = []
    setError('')
    setLoading(true)
    // const elems = await (await axios.get(`${url}/planner/projects/${id}/?timedelta=${date}`)).data.tasks_list
    // const response = (await axios.get<IToDo[]>(`${url}/planner/projects/${id}/?timedelta=${date}`)).data
    const elems = await axios.get(`${API_URL}/planner/tasks/`)
    console.log(elems.data)
    let dtTmp = date.split('.')
    let dt = new Date(Number(dtTmp[2]), Number(dtTmp[1]), Number(dtTmp[0]))
    elems.data.forEach((el:IToDo)=>{
      let dt1 = new Date(new Date(el.date_start!).getFullYear(),new Date(el.date_start!).getMonth(),new Date(el.date_start!).getDate())
      let dt2 = new Date(new Date(el.date_end).getFullYear(),new Date(el.date_end).getMonth(),new Date(el.date_end).getDate())
      if(el.expense! > 0 && dt1<=dt && dt2>=dt) {
         data.push(el)
      }
    })
    setImportantToday(data)
    // console.log(data)
    setLoading(false)
  } catch (e: unknown) {
    const error = e as AxiosError
    setLoading(false)
    setError(error.message)
  }
}

const editImportantToday = async (id: number) => {
  // let newTodoI = importantToday.map(el => {
  //   if(el.id === id) {
  //     el.done = !el.done
  //     return el
  //   }
  //   return el
  // })
  // setImportantToday(newTodoI)
  try {
        // const res = await axios.put(`${API_URL}/planner/tasks/${id}/`)
        let newTodoI = importantToday.map(el => {
          if(el.id === id) {
            el.done = !el.done
            return el
          }
          return el
        })
        setImportantToday(newTodoI)

        let newTodo = todo.map(el => {
          if(el.id === id) {
            el.done = !el.done
            return el
          }
          return el
        })
        setTodo(newTodo)
    } catch (error) {
        console.log(error)
    }
  // let newTodo = todo.map(el => {
  //   if(el.id === id) {
  //     el.done = !el.done
  //     return el
  //   }
  //   return el
  // })
  // setTodo(newTodo)
}

const removeImportantToday = async (id: number) => {
  // let newTodoI = importantToday.filter(el => el.id !== id)
  // setImportantToday(newTodoI)
  try {
    await axios.delete(`${API_URL}/planner/tasks/del/${id}/`)
    let newTodoI = importantToday.filter(el => el.id !== id)
    setImportantToday(newTodoI)
    let newTodo = todo.filter(el => el.id !== id)
    setTodo(newTodo)
  } catch (error) {
      console.log(error)
  }
  // let newTodo = todo.filter(el => el.id !== id)
  // setTodo(newTodo)
}

  useEffect(() => {
    console.log(new Date().getDate()+'.'+(new Date().getMonth())+'.'+new Date().getFullYear())
    getTodo(new Date().getDate()+'.'+(new Date().getMonth())+'.'+new Date().getFullYear())
    getImportantToday(new Date().getDate()+'.'+(new Date().getMonth())+'.'+new Date().getFullYear())
  }, [])

  return { todo, error, loading, getTodo, addTodo, editTodo, removeTodo, editTodoInner, importantToday, editImportantToday, removeImportantToday }
}