import React, { useEffect, useState } from "react";
import "./addAboutTask.css";
import { Alert } from "../../../../../../Alert/Alert";
import { IPlannerTaskAdd } from "../../../../../../../app/types/planner/IPlanner";

interface IAddAboutTask {
    data: IPlannerTaskAdd,
    onChangeTaskAdd: (obj: IPlannerTaskAdd) => void 
}

export function AddAboutTask({data, onChangeTaskAdd}: IAddAboutTask) {
    const [name, setName] = useState('')
    const [sum, setSum] = useState('')
    const [textAreaValue, setTextAreaValue] = useState('')
    const [attentionNameVisible, setAttentionNameVisible] = useState(false)

    const [nameAlert, setNameAlert] = useState('')
    const [sumAlert, setSumAlert] = useState('')
    const [textAreaAlert, setTextAreaAlert] = useState('')

    useEffect(()=>{
        const taskTmp = {...data}
        taskTmp.task!.title = name
        taskTmp.task!.expenses = Number(sum.replace(/ /g,''))
        taskTmp.task!.description = textAreaValue
        if(nameAlert==='' && name!=='' && sumAlert==='' && textAreaAlert==='') {
            // if()
            taskTmp.steps.step1 = true
        } else {
            taskTmp.steps.step1 = false
        }
        onChangeTaskAdd(taskTmp)
    }, [name, sum, textAreaValue])

    function discharge(str:string): string {
        return str.replace(/[^0-9.]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }

    const inputTextArea = ()=> {
        const val = document.getElementById('post-creator-input')!.textContent!
        const maxLength = 100
        const length = val.trim().length
        setTextAreaValue(val)
        if(length<=maxLength) {
            setTextAreaAlert('')
        }
        else {
            setTextAreaAlert(`допустимое количество символов превышено на ${length - maxLength}`)
        }
    }

    const changeName = (event: React.FormEvent<HTMLInputElement>) => {
        const maxLength = 100
        const length = event.currentTarget.value.trim().length
        setName(event.currentTarget.value)
        if(length<=maxLength) {
            setNameAlert('')
        }
        else {
            setNameAlert(`допустимое количество символов превышено на ${length - maxLength}`)
        }
    }

    const changeSum = (event: React.FormEvent<HTMLInputElement>) => {
        const maxLength = 12
        const lengthCurrent = event.currentTarget.value.replace(/ /g,'').length
        // if(sum == '0' && event.currentTarget.value[1]) {
        //     setValue(event.currentTarget.value[1])
        // }
        // else {
        //     setValue(event.currentTarget.value)
        // }
        
        setSum(event.currentTarget.value)
        if(lengthCurrent<=maxLength) {
            setSumAlert('')
        }
        else {
            setSumAlert(`кол-во символов превышено на ${lengthCurrent - maxLength}`)
        }
    }

    const blurNameInput = ()=> {
        if(nameAlert!==''||name==='') {
            setAttentionNameVisible(true)
        }
        else {
            setAttentionNameVisible(false)
        }
    }

    return (
        <div className="add-about-task">
            <div className="add-about-task__item">
                <div className="add-about-task__label">Наименование</div>
                <div className="add-about-task__wrapper-alert">
                    <div className="add-about-task__wrapper-input">
                        <input type="text" className="add-about-task__input" value={name} onChange={changeName} onBlur={blurNameInput}></input>
                        {attentionNameVisible && <b className="add-about-task__attention">!</b>}
                    </div>
                    {nameAlert!=='' && <Alert text={nameAlert} type={'warning'}/>}
                </div>
                
            </div>
            <div className="add-about-task__item">
                <div className="add-about-task__label">Описание</div>
                <div className="add-about-task__wrapper-desc">
                    <div id="post-creator-input" contentEditable data-value={textAreaValue} onKeyUp={inputTextArea}></div>
                    {textAreaAlert!=='' && <Alert text={textAreaAlert} type={'warning'}/>}
                </div>
            </div>
            <div className="add-about-task__item">
                <div className="add-about-task__label">Расходы</div>
                <div className="add-about-task-expense add-about-task__wrapper-alert">
                    <div className="add-about-task__wrapper-input">
                        <input type="text" className="add-about-task__input" value={sum} onChange={changeSum} onKeyUp={()=>setSum(discharge(sum))}></input>
                        <b className="add-about-task__valuta"> руб.</b>
                    </div>
                    {sumAlert!=='' && <Alert text={sumAlert} type={'warning'}/>}
                </div>
            </div>
        </div>
    )
}