import { useEffect, useState } from "react"
import "./projectAddPage.css"
import { BackBtn } from "../../../widgets/elements/buttons/BackBtn/BackBtn"
import { Link } from "react-router-dom"
import { InputText } from "../../../shared/ui/input/InputText/InputTextTest"
import { InputTextArea } from "../../../shared/ui/input/InputTextArea/InputTextArea"
// import { InputSum } from "../../../shared/ui/input/InputSum/InputSum" 
import { DropDownList } from "../../../widgets/DropDownList/DropDownList"
import { Calendar } from "../../../widgets/planner/Calendar/Calendar" 
import { SketchPicker } from 'react-color'
import { IProjectItemDTO } from "../../../app/types/dto/planner/projects/IProject"
import { Alert } from "../../../widgets/Alert/Alert"
import { useProject } from "../../../features/hooks/planner/project/projectHooks2"

const name = [
    {
        id: 1,
        content: 'Сбер',
    },
    {
        id: 2,
        content: 'Тинек',
    },
    {
        id: 3,
        content: 'Альфа',
    },
    {
        id: 4,
        content: 'ВТБ',
    },
    {
        id: 5,
        content: 'РосГос',
    },
]

export function ProjectAddPage() {
    const { addProject } = useProject()
    const [valueName, setValueName] = useState('')
    const [alertName, setAlertName] = useState('')
    const [valueDesc, setValueDesc] = useState('')
    const [alertDesc, setAlertDesc] = useState('')
    const [valueSum] = useState('') //setValueSum
    const [alertSum] = useState<any>('') //setAlertSum
    const [valueReservedSum] = useState('') //setValueReservedSum
    const [alertReservedSum] = useState('') //setAlertReservedSum
    const [color, setColor] = useState('#818080')

    const [changeColorVisible, setChangeColorVisible] = useState(false)

    const [valueDateStart, setValueDateStart] = useState('')
    const [valueDateEnd, setValueDateEnd] = useState('')

    const [checkSelector, setCheckSelector] = useState('')

    const [addBtnVisible, setAddBtnVisible] = useState(false)

    const [textAlertMain, setTextAlertMain] = useState('')

    useEffect(()=>{
        if(valueDateStart!=='' && valueDateEnd!=='' && valueName!=='' && alertName==='' && alertDesc==='' && alertSum==='' && alertReservedSum==='') {
            let dt1 = valueDateStart.split('.')
            let dt2 = valueDateEnd.split('.')
            if(Number(dt1[2])<Number(dt2[2]) || (Number(dt1[2])===Number(dt2[2]) && Number(dt1[1])<Number(dt2[1])) || (Number(dt1[2])===Number(dt2[2]) && Number(dt1[1])===Number(dt2[1]) && Number(dt1[0])<Number(dt2[0]))) {
                setTextAlertMain('')
                setAddBtnVisible(true)
            }
            else {
                setTextAlertMain('Внимание! Дата начала проекта должна быть больше даты завершения.')
            }
        }
        else {
            setAddBtnVisible(false)
        }
    },[valueName, valueDesc, valueSum, valueReservedSum, color, valueDateStart, valueDateEnd])

    const clickCalendarStart = (date: string) => {
        setValueDateStart(date)
    }

    const clickCalendarEnd = (date: string) => {
        console.log(date)
        setValueDateEnd(date)
    }

    const changeColor = (colorTmp: any)=> {
        setColor(colorTmp.hex)
    }

    const onAddProject = ()=> {
        let dt1 = valueDateStart.split('.')
        let dt2 = valueDateEnd.split('.')
        const newProject: IProjectItemDTO = {
            name: valueName,
            description: valueDesc,
            date_start: new Date(Number(dt1[2]), Number(dt1[1]), Number(dt1[0])),
            date_end: new Date(Number(dt2[2]), Number(dt2[1]), Number(dt2[0])),
            planned_sum: Number(valueSum.replace(/ /g,'')),
            reserved_sum: Number(valueReservedSum.replace(/ /g,'')),
            writeoff_account: checkSelector
        }
        addProject(newProject)
    }

    return (
        <div id="assets-wrapper" className="wrapper">
            <div className="container" >
                <div className="project-add-page">
                    <Link className="project-add-page__back-btn" to="/planner">
                        <BackBtn/>
                    </Link>
                    <div className="project-add-page__title">Добавление нового проекта</div>
                    <div className="project-add-page__container">
                        <div className="project-add-page__content">
                            {/* <div className="add-expense"> */}
                                <div className="property-add__item">
                                    <div className="property-add__name">Название<b>*</b></div>
                                    <InputText length={30} value={valueName} attentionFlag={true} setValue={setValueName} setAlert={setAlertName}/>
                                </div>
                                <div className="project-add-page__item-color">
                                    <div className="project-add-page__item-color-name">Цвет проекта</div>
                                    <div className="project-add-page__color" onClick={()=>setChangeColorVisible(true)} style={{backgroundColor:`${color}`}}></div>
                                    {changeColorVisible && 
                                        <div className="color-change">
                                            <div className="color-change__header">
                                                <div className="color-change__title">Выбор цвета проекта</div>
                                                <button className="color-change__close-btn" onClick={()=>setChangeColorVisible(false)}>x</button>
                                            </div>
                                            <SketchPicker
                                                color={color}
                                                onChangeComplete={changeColor}
                                            />
                                        </div>
                                    }
                                </div>
                                <div className="project-add-page__item">
                                    <div className="project-add-page__name">Описание</div>
                                    <InputTextArea length={500} value={valueDesc} attentionFlag={true} setValue={setValueDesc} setAlert={setAlertDesc}/>
                                </div>
                                <div className="project-add-page__item">
                                    <div className="project-add-page__name">Планируемая сумма</div>
                                    {/* <InputSum length={10} value={valueSum} setValue={setValueSum} setAlert={setAlertSum}/> */}
                                </div>
                                <div className="project-add-page__item">
                                    <div className="project-add-page__name">Зарезервированные средства</div>
                                    {/* <InputSum length={10} value={valueReservedSum} setValue={setValueReservedSum} setAlert={setAlertReservedSum}/> */}
                                </div>
                                <div className="project-add-page__item" style={{position: 'relative'}}>
                                    <div className="project-add-page__name">Счет списания</div>
                                    <DropDownList data={name} value={checkSelector} setValue={setCheckSelector} id={'accord_1'} idSearching='list1' placeholder="Выберете счет"/>
                                </div>
                                <div className="project-add-page__item-container">
                                    <div className="project-add-page__item">
                                        <div className="project-add-page__name">Дата начала проекта</div>
                                        <Calendar onCickCalendar={clickCalendarStart}/>
                                    </div>
                                    <div className="project-add-page__item">
                                        <div className="project-add-page__name">Дата окончания проекта</div>
                                        <Calendar onCickCalendar={clickCalendarEnd}/>
                                    </div>
                                </div>
                                {textAlertMain !== '' && <Alert text={textAlertMain} type={'Error'}/>}   
                            {/* </div> */}
                        </div>
                        <div className="project-add-page__actions-btn">
                            <Link onClick={(events)=>{
                                if(!addBtnVisible) {
                                    events.preventDefault()
                                }
                                else {
                                    onAddProject()
                                }
                            }
                            } className={`project-add-page__add-btn${addBtnVisible ? '--active' : ''}`} to="/planner">Добавить</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}