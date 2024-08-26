// import React, { useEffect, useState } from "react";
// import "./addTaskBlock.css";
// import { TaskTimeItem } from "./TaskTimeItem/TaskTimeItem";
// import { IPlannerTime } from "../../../../app/types/planner/IPlanner";
// import { useTypedSelector } from "../../../../features/hooks/useTypedSelector";
// import { useDispatch } from "react-redux";
// import { addTaskPlanner } from "../../../../app/store/actions/diaryActions";
// import { actionTypes } from "../../../../app/store/types/types";

// interface IAddTaskBlock {
//     onClose: ()=>void
// }

// export function AddTaskBlock({onClose}: IAddTaskBlock) {
//     const state = useTypedSelector(state => state.diaryReducer)
//     const [arrTime, setArrTime] = useState<IPlannerTime[]>([])
//     const [activeAddBtn, setActiveAddBtn] = useState(false)
//     const dispatch = useDispatch()
//     // const [tasks, setTasks] = useState<IPlannerTask[]>(dataTasks)

//     useEffect(()=>{
//         if(state.taskForAdd.steps.step1 && state.taskForAdd.steps.step2 && state.taskForAdd.steps.step3 && state.taskForAdd.steps.step4) {
//             setActiveAddBtn(true)
//         } else {
//             setActiveAddBtn(false)
//         }
//         // console.log(state.taskForAdd)
//     }, [state.taskForAdd])

//     const changeActive = (id: string) => {
//         const arr = arrTime.map(el=>{
//             if(el.time===id) {
//                 // if(el.active) {
//                     el.active = !el.active
//                 // }
                
//             } else {
//                 el.active=false
//             }
//             return el
//         })
//         // console.log(arr)
//         setArrTime(arr)
//     }

//     useEffect(()=>{
//         // console.log(getArrTime())
//         setArrTime(getArrTime())
//     }, [state.currentDateTasks])

//     const getArrTime = () => {
//         const tasks = state.currentDateTasks
//         const arr: IPlannerTime[] = []
//         var counter = 0
//         while(counter<24) {
//             let tasksTmp = []
//             var taskTmp = tasks.find(el=>(el.date_start.getHours()+':'+el.date_start.getMinutes()) === String(counter)+':'+'0')
//             var endTime = 0
//             if(taskTmp) {
//                 tasksTmp.push(taskTmp)
//                 endTime = taskTmp.date_end.getMinutes()===0?taskTmp.date_end.getHours():taskTmp.date_end.getHours()+1
//                 while(taskTmp) {
//                     taskTmp = tasks.find(el=>String(el.date_start) === String(taskTmp?.date_end))
//                     if(taskTmp) {
//                         tasksTmp.push(taskTmp)
//                         endTime = taskTmp.date_end.getMinutes()===0?taskTmp.date_end.getHours():taskTmp.date_end.getHours()+1
//                     }
//                 }
//                 const objTime: IPlannerTime = {
//                     time: String(counter),
//                     active: false,
//                     arrTasks: tasksTmp
//                 }
//                 arr.push(objTime)
//             } else {
//                 const objTime: IPlannerTime = {
//                     time: String(counter),
//                     active: false,
//                     arrTasks: []
//                 }
//                 arr.push(objTime)
//             }
//             if(endTime!==0) {
//                 counter=endTime
//             } else {
//                 counter++
//             }   
//         }
//         return arr
//     }

//     const onAddTask = () => {
//         if(activeAddBtn) {
//             const res = addTaskPlanner(actionTypes.ADD_PLANNER_TASK, state.taskForAdd.task)
//             res.then(e => {
//                 dispatch(e!);
//             })
//             .catch((e) => {
//                 console.log(e)
//             })
//         }
//     }

//     return (
//         <div className="add-task-block">
//             <button className="add-task-block__close-btn" onClick={onClose}>&#10006;</button>
//             <div className="add-task-block__title">Задача</div>
//             <div className="add-task-block__content">
//                 <div className="add-task-block__list">
//                     {arrTime.map(el => {
//                         return (
//                             <TaskTimeItem data={el} key={el.time} onChangeActive={changeActive}/>
//                         )
//                     })}
//                 </div>
//                 <button className={`add-task-block__add-btn${activeAddBtn?'--active':''}`} onClick={onAddTask}>+</button>
//             </div>
//         </div>
//     )
// }
