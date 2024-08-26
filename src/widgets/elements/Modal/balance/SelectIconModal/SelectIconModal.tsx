import { useEffect, useState } from "react";
import "./selectIconModal.css";
import { IExpensePersonalIcons } from "../../../../../app/types/balance/IBalance";
import { InputTextTransport } from "../../../../assets/Transport/AddTransport/InputTextTransport/InputTextTransport";

interface IIconBalance {
    id: number,
    src: string
}

interface ISelectIconModal {
    data: IIconBalance[],
    onClose: (newIcon?: IExpensePersonalIcons)=>void
}

export function SelectIconModal({data, onClose}: ISelectIconModal) {
    const [idCard, setIdCard] = useState<number|null>(null)
    const [inputName, setInputName] = useState('')
    const [alertInputName, setAlertInputName] = useState('')
    const [addBtnActive, setAddBtnActive] = useState(false)

    useEffect(()=>{
        if(idCard && inputName!=='' && alertInputName==='') {
            setAddBtnActive(true)
        } else {
            setAddBtnActive(false)
        }
    }, [inputName, idCard])
    
    return (
        <div className="select-icon-modal">
            <div className="select-icon-modal__title">Добавить категорию</div>
            <div className="select-icon-modal__input">
                <InputTextTransport value={inputName} setValue={setInputName} setAlert={setAlertInputName} placeHolder="Введите наименование"/>
            </div>
            <div className="select-icon-modal__title">Выбор иконки</div>
            <div className="select-icon-modal__content">
                <div className="select-icon-modal__list-icons">
                    {data.map(el=>{
                        if(el.id!==-1) {
                            return (
                                <div className={`select-icon-modal__item${el.id===idCard?'--active':''}`} key={el.id!} onClick={()=>setIdCard(el.id!)}>
                                    <img className="select-icon-modal__item-img" src={el.src} />
                                    {/* <div className="select-icon-modal__item-name">{el.name}</div> */}
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
            <div className="select-icon-modal__footer">
                <button className="select-icon-modal__cancel-btn" onClick={()=>onClose()}>Отменить</button>
                <button className={`select-icon-modal__add-btn${addBtnActive?'--active':''}`} onClick={(e)=>{
                    if(addBtnActive) {
                        onClose({
                            icon_id: idCard!,
                            title: inputName
                        })
                    } else {
                        e.preventDefault()
                    }
                }}>Добавить</button>
            </div>
        </div>
    )
}