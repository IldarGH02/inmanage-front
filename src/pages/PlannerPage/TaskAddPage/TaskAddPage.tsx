import { useContext, useEffect, useState } from "react"
import "./taskAddPage.css"
import { Link } from "react-router-dom"
import { BackBtn } from "../../../widgets/elements/buttons/BackBtn/BackBtn"
import Steps from "../../../widgets/modalWindow/steps/StepsTest"
import { IStep, Status } from "../../../app/types/steps"
import { TaskStep1 } from "../../../widgets/planner/AddTask/Step1/TaskStep1"
import { ITodoDTO } from "../../../app/types/dto/planner/projects/IProject"
// import { useTodo } from "../../../features/hooks/planner/plannerHooks"
import { PlannerDateContext } from "../../../features/context/planner/plannerData/PlannerDateContext"
import { TaskStep2 } from "../../../widgets/planner/AddTask/Step2/TaskStep2"
import { TaskStep3 } from "../../../widgets/planner/AddTask/Step3/TaskStep3"

interface IContext {
    date: Date,
    getDate: ()=> void,
    setDate: (date: Date)=> void, 
}

let steps: IStep[] = [
    {
        header: "Задача",
        id: 1,
        status: Status.done
    },
    {
        header: "Список дел",
        id: 2,
        status: Status.active
    },
    {
        header: "Расходы",
        id: 3,
        status: Status.inactive
    },
]

export function TaskAddPage() {
    const { setDate } = useContext(PlannerDateContext) as IContext
    // const { addTodo } = useTodo()
    const [nextBtnVisible, setNextBtnVisible] = useState(false)
    const [stepsArr, setStepsArr] = useState(steps)
    const [contentArrIndex, setContentArrIndex] = useState(0)

    useEffect(()=>{
        // setDate(new Date())
        clearSteps()
    },[])

    const [task, setTask] = useState<ITodoDTO>({
        user_id: 1,
        date_start: new Date(),
        date_end: new Date(),
        title: '',
        description: '',
        items: [],
        expense: 0,
        done: false
    })

    const changeBtnVisible = (flag: boolean)=> {
        setNextBtnVisible(flag)
    }

    const changeValues = (obj: ITodoDTO)=> {
        setTask(obj)
    }

    const contentArr = [<TaskStep1 onChangeBtnVisible={changeBtnVisible} onChangeValues={changeValues} data={task}/>,
    <TaskStep2 onChangeBtnVisible={changeBtnVisible} onChangeValues={changeValues} data={task}/>,
    <TaskStep3 onChangeBtnVisible={changeBtnVisible} onChangeValues={changeValues} data={task}/>    
    ]

    const nextStep = ()=> {
        if(nextBtnVisible) {
            let resTmp = stepsArr
            let index: number = -1;
            let steps: IStep[] = resTmp.map((el:IStep, i: number)=>{
                if(el.status === Status.active) {
                    el.status = Status.done
                    index = i
                }
                return el
            })
            if(index!==-1 && index<resTmp.length-1) {
                steps[index+1].status = Status.active
            }
            setContentArrIndex(contentArrIndex+1)
            setStepsArr(steps)
        }
        
    }

    const earlierStep = ()=> {
        let resTmp = stepsArr
        let index: number = -1;
        var flag = false
        let steps: IStep[] = resTmp.map((el:IStep, i: number)=>{
            if(el.status === Status.active && !flag) {
                flag = true
                if(i===1) {
                    index = 0
                }
                else {
                    el.status = Status.inactive
                    index = i-1
                }
            }
            return el
        })
        if(index>0) {
            steps[index].status = Status.active
        }
        else if(index===-1){
            steps[steps.length-1].status = Status.active
        }
        setContentArrIndex(contentArrIndex-1)
        setStepsArr(steps)
        
    }

    const clearSteps = ()=> {
        for(let i = 0; i<stepsArr.length; i++) {
            if(i === 1) {
                stepsArr[i].status = Status.active
            }
            else if(i>1) {
                stepsArr[i].status = Status.inactive
            }
        }
        setStepsArr(stepsArr)
    }

    return (
        <div id="assets-wrapper" className="wrapper">
        <div className="container" >
            <div className="task-add-page">
                <Link className="task-add-page__back-btn" to="/planner">
                    <BackBtn/>
                </Link>
                <div className="task-add-page__title">Добавление недвижимости</div>
                <Steps stepsArr={stepsArr}/>
                <div className="task-add-page__container">
                    <div className="task-add-page__content">
                        <div className="task-add-page__content-title">Шаг {contentArrIndex+1}</div>
                        {contentArr[contentArrIndex]}
                    </div>
                    <div className="task-add-page__actions-btn">
                        {stepsArr[contentArrIndex].id!==stepsArr[0].id && 
                        <button className="blue-btn task-add-page__next-btn--active" onClick={earlierStep}>Назад</button>
                        }
                        {(stepsArr[stepsArr.length-1].status===Status.inactive || stepsArr[stepsArr.length-1].status===Status.active) &&
                        <button className={`task-add-page__next-btn${nextBtnVisible ? '--active' : ''}`} onClick={nextStep}>Далее</button>
                        }
                        {stepsArr[stepsArr.length-1].status===Status.done && 
                        <Link className="task-add-page__add-btn--active" to="/planner" onClick={()=>{
                            // addTodo(task, date)
                            setDate(new Date())
                        }}>Добавить</Link>
                        }
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    )
}