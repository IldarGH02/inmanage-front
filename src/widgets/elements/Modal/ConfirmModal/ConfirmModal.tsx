import React from "react";
import "./confirmModal.css";

interface IConfirmModal {
    title: string,
    text: string,
    onClose: (flag: boolean)=>void
}

export function ConfirmModal({title, text, onClose}: IConfirmModal) {
    return (
        <div className="confirm-modal">
            <div className="confirm-modal__header">
                <div className="confirm-modal__title">{title}</div>
            </div>
            <div className="confirm-modal__content">
                <div className="confirm-modal__text">{text}</div>
            </div>
            <div className="confirm-modal__footer">
                <button className="confirm-modal__cancel-btn" onClick={()=>onClose(false)}>Отменить</button>
                <button className="confirm-modal__accept-btn" onClick={()=>onClose(true)}>Подтвердить</button>
            </div>
        </div>
    )
}