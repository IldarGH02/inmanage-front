// import { useEffect, useState } from "react"
// // import { IListItem } from "../../../app/types/planner/IPlanner"
// import "./diary.css"
// import { ExpensesToday } from "../TasksBlock/ExpensesToday/ExpensesToday"
// // import { CalendarBlock } from "../CalendarBlock/CalendarBlock"
// import { TasksToday } from "../TasksBlock/TasksToday/TasksToday"
// import { useDispatch } from "react-redux"
// import { setDate } from "../../../app/store/actions/diaryActions"
// import { actionTypes } from "../../../app/store/types/types"
// import { AddTaskBlock } from "../TasksBlock/AddTaskBlock/AddTaskBlock"

// // const monthName: string[] = [
// //     'Января', 'Февраля', 'Марта', 'Апреля',
// //     'Мая', 'Июня', 'Июля', 'Августа',
// //     'Сентября', 'Октября', 'Ноября', 'Декабря'
// // ]

// // interface ITodoDTO {
// //     user_id?: number,
// //     date_start: Date,//здесь должен быть формат даты типа dd.mm.yyyy
// //     date_end: Date,//здесь должен быть формат даты типа dd.mm.yyyy
// //     title: string,
// //     // start_time: string,
// //     // end_time: string,
// //     description: string, 
// //     desc_list?: IListItem[],
// //     expense: number, //расходы
// //     done: boolean
// // }

// // interface IDate {
// //     month: number,
// //     day: number,
// //     year: number
// // }



// export function Diary() {
//     // const state = useTypedSelector(state => state.diaryReducer)
//     const dispatch = useDispatch()
//     const [blockVisible, setBlockVisible] = useState(1)

//     useEffect(()=>{
//         // console.log('aaa')
//         // dispatch(showLoader(actionTypes.SHOW_LOADER))
//         dispatch(setDate(actionTypes.SET_DATE_DIARY, new Date()))
//     },[])

//     const changeBlock = (numBlock: number) => {
//         setBlockVisible(numBlock)
//     }
    
//     return (
//         <div className="diary">
//             <div className="diary__calendar-block">
//                 {/* <CalendarBlock addTaskFlag={blockVisible===2?true:false}/> */}
//             </div>
//             { blockVisible === 1 && 
//                 <div className="diary__tasks-block">
//                     {/* <AddTaskBlock/> */}
//                     <div className="diary__tasks-today">
//                         <TasksToday onChangeBlock={changeBlock}/>
//                     </div>
//                     <div className="diary__expenses-today">
//                         <ExpensesToday/>
//                     </div>
//                 </div>
//             }
//             { blockVisible === 2 &&
//                 <div className="diary__add-task-block">
//                     <AddTaskBlock onClose={()=>setBlockVisible(1)}/>
//                 </div>
//             }
//         </div> 
//     )
// }