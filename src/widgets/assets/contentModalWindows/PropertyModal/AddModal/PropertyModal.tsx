import { useContext, useState } from "react";
import { ModalContext } from "../../../../../features/context/modalProperty/ModalContext";
// import "./propertyModal.css"

export function PropertyModal() {
    const {hide} = useContext(ModalContext)
    const [valRb1, setValRb1] = useState(true)
    const [valRb2, setValRb2] = useState(false)

    return (
        <div className="add-modal">
            <div className="add-modal__title">
                <h1>Добавление новой недвижимости</h1>
                <button className="add-modal__close-btn" onClick={hide}>x</button>
            </div>
            <div className="add-modal__content">
                <div className="add-modal__item">
                    <div className="add-modal__label">Название недвижимости</div>
                    <input type="text"/>
                </div>
                <div className="add-modal__item">
                    <div className="add-modal__label">Адрес недвижимости</div>
                    <input type="text"/>
                </div>
                <div className="add-modal__item">
                    <div className="add-modal__label">Цена покупки актива</div>
                    <input type="number"/>
                </div>
                <div className="add-modal__item">
                    <div className="add-modal__label">Тип аренды</div>
                    <div className="add-modal__checkbox-group">
                        <div className="add-modal__item-container">
                            <input type="radio" id="rent1" checked={valRb1} onChange={()=>{
                                setValRb2(false)
                                setValRb1(!valRb1)}}/>
                            <label htmlFor="rent1">посуточная</label>
                            {/* <span></span> */}
                            {/* <div>посуточно</div> */}
                        </div>
                        <div className="add-modal__item-container">
                            <input type="radio" id="rent2" checked={valRb2} onChange={()=>{
                                setValRb1(false)
                                setValRb2(!valRb2)}}/>
                            <label htmlFor="rent2">долгосрочная</label>
                            {/* <span></span> */}
                            {/* <div>посуточно</div> */}
                        </div>
                        {/* <div className="add-modal__item-container">
                            <input type="checkbox" />
                            <span>долгосрочная</span>
                        </div> */}
                    </div>
                    
                </div>
            </div>
            <div className="add-modal__footer">
                <button className="add-modal__add-btn">Добавить</button>
                <button className="add-modal__cancel-btn" onClick={hide}>Отменить</button>
            </div>
        </div>
    )
}