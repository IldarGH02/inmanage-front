import React, { useContext, useState } from "react"
import { ModalContext } from "../../../features/context/modalProperty/ModalContext"
import "./deleteModalWindow.css"

interface IDeleteModalWindow {
    onRemoveItem: (reason: number, price?: number)=>void
}

export function DeleteModalWindow({onRemoveItem}:IDeleteModalWindow) {
    const {hide} = useContext(ModalContext)
    const [valRb1, setValRb1] = useState(true)
    const [valRb2, setValRb2] = useState(false)
    const [valRb3, setValRb3] = useState(false)
    const [valuePrice, setValuePrice] = useState<string|number>('')

    const changeValuePrice = (event: React.FormEvent<HTMLInputElement>) => {
        if(Number(event.currentTarget.value)===0) {
            setValuePrice('')
        }
        else {
            setValuePrice(Number(event.currentTarget.value))
        }
    }

    return (
        <div className="delete-modal">
            <div className="delete-modal__title">
                <h1>Удаление</h1>
                <button className="delete-modal__close-btn" onClick={hide}>x</button>
            </div>
            <div className="delete-modal__content">
                <h2>Пожалуйста, выберите причину удаления</h2>
                <div className="delete-modal__item">
                    <input type="radio" id="delete1" checked={valRb1} onChange={()=>{
                        setValRb2(false)
                        setValRb3(false)
                        setValRb1(true)
                    }}/>
                    <label className="delete-modal__label" htmlFor="delete1">Добавлено по ошибке</label>               
                </div>
                <div className="delete-modal__item">
                    <input type="radio" id="delete2" checked={valRb2} onChange={()=>{
                        setValRb1(false)
                        setValRb3(false)
                        setValRb2(true)
                    }}/>
                    <label className="delete-modal__label" htmlFor="delete2">Было передано</label>               
                </div>
                <div className="delete-modal__item">
                    <input type="radio" id="delete3" checked={valRb3} onChange={()=>{
                        setValRb1(false)
                        setValRb2(false)
                        setValRb3(true)
                    }}/>
                    <label className="delete-modal__label" htmlFor="delete3">Бало продано</label>               
                    {valRb3 && <input type="number" value={valuePrice} onChange={changeValuePrice} placeholder="Укажите стоимость продажи"/>}
                </div>
            </div>
            <div className="delete-modal__footer">
                <button className="delete-modal__add-btn" onClick={()=>{
                    var reason = 1
                    var price
                    if(valRb2) {
                        reason = 2
                    }
                    else if(valRb3) {
                        reason = 3
                        if (valuePrice==='' || valuePrice===0) {
                            console.log('Error.tsx!')
                            reason = 0
                        }
                        else {
                            price = Number(valuePrice)
                        }    
                    }
                    if(reason !== 0) {
                        onRemoveItem(reason, price)
                        hide()
                    }
                }
                }>Удалить</button>
                <button className="delete-modal__cancel-btn" onClick={hide}>Отменить</button>
            </div>
        </div>
    )
}
// import React, { useContext, useState } from "react";
// import { ModalContext } from "../../../../context/modalProperty/ModalContext";
// import "./deleteModal.css"

// interface IdeleteModal {
//     name: string,
//     price: number
// }

// export function deleteModal({name, price}: IdeleteModal) {
//     const [valueName, setValueName] = useState(name)
//     const [valuePrice, setValuePrice] = useState(price)
//     const {hide} = useContext(ModalContext)
//     document.getElementById('rent1')?.addEventListener('click', ()=>{
//         // document.getElementById('rent2')?.prop('checked', false)
//     })

//     const changeName = (event: React.FormEvent<HTMLInputElement>) => {
//         setValueName(event.currentTarget.value)
//     }

//     const changePrice = (event: React.FormEvent<HTMLInputElement>) => {
//         setValuePrice(Number(event.currentTarget.value))
//     }

//     return (
//         <div className="delete-modal">
//             <div className="delete-modal__title">
//                 <h1>Редактирование</h1>
//                 <button className="delete-modal__close-btn" onClick={hide}>x</button>
//             </div>
//             <div className="delete-modal__content">
//                 <div className="delete-modal__item">
//                     <div className="delete-modal__label">Название недвижимости</div>
//                     <input type="text" value={valueName} onChange={changeName}/>
//                 </div>
//                 <div className="delete-modal__item">
//                     <div className="delete-modal__label">Цена покупки актива</div>
//                     <input type="number" value={valuePrice} onChange={changePrice}/>
//                 </div>
//             </div>
//             <div className="delete-modal__footer">
//                 <button className="delete-modal__add-btn">Редактировать</button>
//                 <button className="delete-modal__cancel-btn" onClick={hide}>Отменить</button>
//             </div>
//         </div>
//     )
// }