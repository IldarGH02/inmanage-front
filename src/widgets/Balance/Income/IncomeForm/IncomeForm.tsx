import React, {FC, useEffect, useState} from "react";
import { observer } from "mobx-react-lite";
import { ButtonAdd } from "../../../../shared/ui/ButtonAdd/ButtonAdd";

interface IIncomeForm {
    placeholder: string
    handleChange: React.ChangeEventHandler<HTMLInputElement>
    handleChangeComment: React.ChangeEventHandler<HTMLInputElement>
    value: string
    textValue: string
}

export const IncomeForm: FC<IIncomeForm> = observer(
    ({
        textValue,
        handleChangeComment
    }) => {
        const [open, setOpen] = useState<boolean>(false)
        const handleOpenModal = () => {
            setOpen(true)
        }
        
        useEffect(() => {
            const overlayModal = document.getElementById('overlay__modal')

            if(open) {
                overlayModal?.classList.add('modal--active')
            }
        }, [open])


    return (
        <form action='#' className="job__form" onSubmit={(e) => e.preventDefault()}>
            <div className="job__form-add_name">
                {/* <input type="text" placeholder={placeholder} value={currentValue} onChange={handleChange}/> */}
                <ButtonAdd 
                    classNameContainer="button__add-container" 
                    classNameTitle="button__add-title"
                    classNameButton="button__add-btn" 
                    handleClickItem={handleOpenModal} 
                />
            </div>
            <div className="job__form-comment">
                <input
                    value={textValue}
                    onChange={handleChangeComment}
                    className="job__comment"
                    placeholder="Добавить комментарий"
                />
            </div>
        </form>
    )
    })