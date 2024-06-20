import { useEffect, useState } from 'react'
import { IToDo } from '../../../app/types/planner/IPlanner'

const toDoList:IToDo[] = [
  {
      id: 1,
      user_id: 1,
      // project_id: 0,
      date_start: new Date(2024, 4, 16, 15, 24),
      date_end: new Date(2024, 4, 16, 15, 24),
      title: 'Задача 11111111111111111111111',
      // start_time: '11:00',
      // end_time: '12:00',
      description: '', 
      desc_list: [
        {id:1,text:'item 1', done: false},
        {id:2,text:'item 2', done: true},
        {id:3,text:'item 3', done: false},
      ],
      expense: 0,
      done: false
  },
  {
      id: 2,
      user_id: 1,
      // project_id:0,
      date_start: new Date(2024, 4, 16, 15, 24),
      date_end: new Date(2024, 4, 16, 15, 24),
      // start_time: '11:00',
      // end_time: '12:00',
      title: 'Задача 2',
      description: 'New task 2',
      desc_list: [],
      done: false,
      expense: 0,
  },
  {
    id: 3,
    user_id: 1,
    // project_id:0,
    date_start: new Date(2024, 4, 16, 15, 24),
    date_end: new Date(2024, 4, 16, 15, 24),
    // start_time: '11:00',
    // end_time: '12:00',
    title: 'Задача 3',
    description: 'New task 3',
    desc_list: [],
    done: false,
    expense: 1500,
  },
  // {
  //     id: 4,
  //     user_id: 1,
  //     date: 'new Date()',
  //     title: 'Задача 3',
  //     startTime: '13:00',
  //     endTime: '14:00',
  //     description: 'New task 3',
  //     descList: [],
  //     done: false,
  //     expense: 0
  // },
  // {
  //     id: 5,
  //     user_id: 1,
  //     date: 'new Date()',
  //     title: 'Задача 3',
  //     startTime: '13:00',
  //     endTime: '14:00',
  //     description: 'New task 3',
  //     descList: [],
  //     done: false,
  //     expense: 0
  // },
  // {
  //     id: 6,
  //     user_id: 1,
  //     date: 'new Date()',
  //     title: 'Задача 3',
  //     startTime: '13:00',
  //     endTime: '14:00',
  //     description: 'New task 3',
  //     descList: [],
  //     done: false,
  //     expense: 0
  // }
]

export function useImportantToday() {
  const [importantToday, setImportantToday] = useState<IToDo[]>([])

  async function getImportantToday() {
    let data: IToDo[] = []
    toDoList.forEach(el=>{
        if(el.expense! > 0) {
           data.push(el)
        }
    })
    setImportantToday(data)
    // try {
    //   setError('')
    //   setLoading(true)
    //   const response = await axios.get<IAssetsTransport[]>(`${url}/actives/transport/`)
    //   setTransports(response.data)
    //   setLoading(false)
    // } catch (e: unknown) {
    //   const error = e as AxiosError
    //   setLoading(false)
    //   setError(error.message)
    // }
  }

  const editImportantToday = async (id: number) => {
    console.log("important")
    let newTodo = importantToday.map(el => {
      if(el.id === id) {
        el.done = !el.done
        return el
      }
      return el
    })
    console.log(newTodo)
    setImportantToday(newTodo)
    // console.log(newDt)
    // try {
    //     const res = await axios.patch(`${url}/actives/transport/up/${newDt.id}`, newDt)
    //     let transoprtsTmp = transoprts.map((el)=>{
    //         if(el.id === newDt.id) {
    //             el.brand = newDt.brand
    //             el.name = newDt.name
    //             el.owner = newDt.owner
    //             el.owner_type = newDt.owner_type
    //             el.use = newDt.use
    //             el.vin = newDt.vin
    //         }
    //         return el
    //     })
    //     setTransports(transoprtsTmp)
    // } catch (error) {
    //     console.log(error)
    // }
}

const removeImportantToday = async (id: number) => {
      let newTodo = importantToday.filter(el => el.id !== id)
      setImportantToday(newTodo)
    // try {
    //     await axios.delete(`${url}/actives/transport/del/${id}`)
    //     let newTransports = transoprts.filter(el => el.id !== id)
    //     setTransports(newTransports)
    // } catch (error) {
    //     console.log(error)
    // }
    
}

  useEffect(() => {
    getImportantToday()
  }, [])

  return { importantToday, editImportantToday, removeImportantToday }
}