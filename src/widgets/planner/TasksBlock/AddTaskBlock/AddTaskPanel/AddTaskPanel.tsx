import React, { useRef, useState } from "react";
import "./addTaskPanel.css";
import { AddAboutTask } from "./AddTaskPanelContent/AddAboutTask/AddAboutTask";
import { AddListTask } from "./AddTaskPanelContent/AddListTask/AddListTask";
import { AddTaskAccountSelection } from "./AddTaskPanelContent/AddTaskAccountSelection/AddTaskAccountSelection";
import { AddTimeTask } from "./AddTaskPanelContent/AddTimeTask/AddTimeTask";
// import { dataTasks } from "../data";
import { IPlannerTask, IPlannerTaskAdd } from "../../../../../app/types/planner/IPlanner";
import { useTypedSelector } from "../../../../../features/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { setTaskForAdd } from "../../../../../app/store/actions/diaryActions";
import { actionTypes } from "../../../../../app/store/types/types";

import cash from "../../../../../shared/assets/img/planner/plannerCash.png"
import info from "../../../../../shared/assets/img/planner/plannerInfo.png"
import list from "../../../../../shared/assets/img/planner/plannerList.png"
import timer from "../../../../../shared/assets/img/planner/plannerTimer.png"

import check from "../../../../../shared/assets/img/planner/plannerCheck.png"

type activeBtn = 'cash' | 'info' | 'list' | 'timer'
type activeColor = '#679DF4'|'#9BD3FF'|'#FFC677'|'#FFADAD'|'#A8E8AB'

interface IAddAboutTask {
    onClose: ()=>void,
    data: IPlannerTask,
    currentTime: string
}

export function AddTaskPanel({onClose, data, currentTime}: IAddAboutTask) {
    const state = useTypedSelector(state => state.diaryReducer)
    const dispatch = useDispatch()
    const [maxTimeEnd] = useState<Date>(findNextDate) //setMaxTimeEnd
    const [activeButton, setActiveButton] = useState<activeBtn>('info')
    const [activeColor, setActiveColor] = useState<activeColor>('#679DF4')
    const newTaskRef = useRef<IPlannerTaskAdd>({
        steps: {
            step1: false,
            step2: true,
            step3: true,
            step4: false
        },
        task: {
            title: '',
            description: '',
            date_start: setDateStart(),
            date_end: setDateStart(),
            desc_list: [], 
            color: '#679DF4',
            done: false, 
        }
    })

    const contentArr = new Map([['info', <AddAboutTask data={newTaskRef.current} onChangeTaskAdd={changeTaskAdd}/>], 
                            ['list', <AddListTask data={newTaskRef.current} onChangeTaskAdd={changeTaskAdd}/>], 
                            ['cash', <AddTaskAccountSelection data={newTaskRef.current} onChangeTaskAdd={changeTaskAdd}/>], 
                            ['timer', <AddTimeTask maxTimeEnd={maxTimeEnd} data={newTaskRef.current.task!} taskAdd={newTaskRef.current} onChangeTaskAdd={changeTaskAdd}/>
                        ]])

    function changeTaskAdd(taskObj: IPlannerTaskAdd) {
        newTaskRef.current = taskObj
        dispatch(setTaskForAdd(actionTypes.SET_PLANNER_TASK_FOR_ADD, taskObj))

    }

    const changeActiveColor = (color: activeColor) => {
        setActiveColor(color)
        newTaskRef.current.task!.color = color
    }

    function setDateStart() {
        let dateStart = new Date()
        if(data) {
            dateStart = new Date(data.date_end)
        } else {
            dateStart = new Date(state.date)
            dateStart.setHours(Number(currentTime))
            dateStart.setMinutes(0)
        }
        return dateStart
    }

    function findNextDate() {
        const dataTasks = state.currentDateTasks
        if(data) {
            var time = new Date(data.date_end)
            time.setHours(23)
            time.setMinutes(59)
            for(let i=0; i<dataTasks.length; i++) {
                let timeTmp = dataTasks[i].date_start
                if(timeTmp > data.date_end && timeTmp < time) {
                    time = timeTmp
                }
            }
        } else {
            let currentTimeItem = new Date(state.date)
            currentTimeItem.setHours(Number(currentTime))
            currentTimeItem.setMinutes(0)
            time = new Date(state.date)
            time.setHours(23)
            time.setMinutes(59)
            for(let i=0; i<dataTasks.length; i++) {
                let timeTmp = dataTasks[i].date_start
                if(timeTmp > currentTimeItem && timeTmp < time) {
                    time = timeTmp
                }
            }
        }
        // console.log(time)
        return time
    }

    return (
        <div className="add-task-panel">
            <button className="add-task-panel__close-btn" onClick={onClose}>&#10006;</button>
            <div className="add-task-panel__done-rb">
                <div className="add-task-panel__point" style={{backgroundColor: `${activeColor}`}}></div>
            </div>
            <div className="add-task-panel__content-wrapper">
                <div className="add-task-panel__content">
                    {contentArr.get(activeButton)}
                </div>
                <div className="add-task-panel__footer">
                    <div className="add-task-panel__colors">
                        <div className="deep-blue-color add-task-panel__color" onClick={()=>changeActiveColor('#679DF4')}>{activeColor === '#679DF4' && <img src={check}/>}</div>
                        <div className="blue-color add-task-panel__color" onClick={()=>changeActiveColor('#9BD3FF')}>{activeColor === '#9BD3FF' && <img src={check}/>}</div>
                        <div className="orange-color add-task-panel__color" onClick={()=>changeActiveColor('#FFC677')}>{activeColor === '#FFC677' && <img src={check}/>}</div>
                        <div className="pink-color add-task-panel__color" onClick={()=>changeActiveColor('#FFADAD')}>{activeColor === '#FFADAD' && <img src={check}/>}</div>
                        <div className="green-color add-task-panel__color" onClick={()=>changeActiveColor('#A8E8AB')}>{activeColor === '#A8E8AB' && <img src={check}/>}</div>
                    </div>
                    <div className="add-task-panel__buttons">
                        <img className={`add-task-panel__btn${activeButton==='info'?'--active':''}`} src={info} alt="info" onClick={()=>setActiveButton('info')}/>
                        <img className={`add-task-panel__btn${activeButton==='list'?'--active':''}`} src={list} alt="list" onClick={()=>setActiveButton('list')}/>
                        <img className={`add-task-panel__btn${activeButton==='cash'?'--active':''}`} src={cash} alt="cash" onClick={()=>setActiveButton('cash')}/>
                        <img className={`add-task-panel__btn${activeButton==='timer'?'--active':''}`} src={timer} alt="timer" onClick={()=>setActiveButton('timer')}/>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
