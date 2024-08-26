// import React, { useEffect } from "react"
// import "./tasksToday.css"
// import { TaskTodayItem } from "./TasksTodayItem/TaskTodayItem"
// import { useTypedSelector } from "../../../../features/hooks/useTypedSelector"
// import { monthName } from "../../dataForCalendar/data"
// import { getTasksByDate } from "../../../../app/store/actions/diaryActions"
// import { useDispatch } from "react-redux"
// import { actionTypes } from "../../../../app/store/types/types"

// interface ITasksToday {
//     onChangeBlock: (numBlock: number)=>void
// }

// export function TasksToday({onChangeBlock}: ITasksToday) {
//     const state = useTypedSelector(state => state.diaryReducer)
//     const dispatch = useDispatch()

//     useEffect(()=> {
//         // console.log(state.currentDateTasks)
//         dispatch(getTasksByDate(actionTypes.GET_TASKS_BY_DATE, new Date()))
//         // console.log(state.date.getMonth()===new Date().getMonth())
//         // console.log(state.date.getFullYear()===(new Date().getFullYear()))
//     }, [])

//     const dateEqual = () => {
//         if(state.date.getMonth()===new Date().getMonth() &&
//         state.date.getFullYear()===(new Date().getFullYear())&& 
//         state.date.getDate() === new Date().getDate()) {
//             return true
//         }
//         return false
//     }

//     return (
//         <div className="tasks-today">
//             <div className="tasks-today__header">
//                 <div className="tasks-today__title">{dateEqual() ? 'Сегодня':state.date.getDate() +' '+ monthName[state.date.getMonth()]}</div>
//                 <button className="tasks-today__add-btn" onClick={()=>onChangeBlock(2)}>Добавить</button>
//             </div>
//             <div className="tasks-today__list">
//                 {state.currentDateTasks.length === 0 && 
//                 <div className="tasks-today__list-empty">Задач нет...</div>
//                 }
//                 {state.currentDateTasks.map(el=>{
//                     // console.log(el)
//                     return (
//                         <TaskTodayItem data={el} key={el.id}/>
//                     )
//                 })} 
                
//             </div>
//         </div>
//     )
// }