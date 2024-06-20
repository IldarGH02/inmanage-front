import React, { useEffect, useState } from "react"
import "./taskStep3.css"
import { ITodoDTO } from "../../../../app/types/dto/planner/projects/IProject"
import { InputSum } from "../../../../shared/ui/input/InputSum/InputSum" 
import { Alert } from "../../../Alert/Alert"

interface ITaskStep3 {
    onChangeBtnVisible: (flag: boolean) => void,
    onChangeValues: (obj: ITodoDTO) => void,
    data: ITodoDTO
}

export function TaskStep3({onChangeValues, onChangeBtnVisible, data}: ITaskStep3) {
    const [valueSum, setValueSum] = useState('')
    const [alertSum] = useState('') //setAlertSum
    const [valueTimeStart, setValueTimeStart] = useState('')
    const [valueTimeEnd, setValueTimeEnd] = useState('')
    const [mainAlertVisible, setMainAlertVisible] = useState(false)

    useEffect(()=>{
        if(data.expense!==undefined) {
            setValueSum(data.expense===0?'':discharge(String(data.expense)))
        }
        else {
            setValueSum('')
        }
    },[])

    useEffect(()=>{
        let time1 = valueTimeStart.split(':')
        let time2 = valueTimeEnd.split(':')
        data.expense = Number(valueSum.replace(/ /g,''))
        const dt1 = new Date(data.date_start.getFullYear(), data.date_start.getMonth(), data.date_start.getDate(), Number(time1[0]), Number(time1[1]))
        const dt2 = new Date(data.date_start.getFullYear(), data.date_start.getMonth(), data.date_start.getDate(), Number(time2[0]), Number(time2[1]))
        data.date_start = dt1
        data.date_end = dt2
        onChangeValues(data)
        setMainAlertVisible(false)
        
        if(alertSum==='' && valueTimeStart !== '' && valueTimeEnd !== '') {
            if(time1[0]>time2[0] || (time1[0] === time2[0] && time1[1]>time2[1])) {
                onChangeBtnVisible(false)
                setMainAlertVisible(true)
            }
            onChangeBtnVisible(true)
        }
        else {
            onChangeBtnVisible(false)
        }
                
    },[valueSum, valueTimeStart, valueTimeEnd])

    ////////////
    function discharge(str:string): string {
        return str.replace(/[^0-9.]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }
    ////////////
    
    return (
        <div className="property-add">
            <div className="property-add__item">
                <div className="property-add__name">Сумма расходов</div>
                <InputSum length={10} value={valueSum} setValue={setValueSum}/>
            </div>
            <div className="project-add-page__item-container">
                <div className="project-add-page__item">
                    <div className="project-add-page__name">Время начала</div>
                    <input className="project-add-page__time" type="time" value={valueTimeStart} min={0} max={23} onChange={e=>setValueTimeStart(e.currentTarget.value)}></input>
                </div>
                <div className="project-add-page__item">
                    <div className="project-add-page__name">Время окончания</div>
                    <input className="project-add-page__time" type="time" value={valueTimeEnd} min={0} max={23} onChange={e=>setValueTimeEnd(e.currentTarget.value)}></input>
                </div>
            </div>
            {mainAlertVisible && <Alert text={'Время начала должно быть меньше времени окончания мероприятия.'} type={'Error'}/>}   
        </div>
    )
}