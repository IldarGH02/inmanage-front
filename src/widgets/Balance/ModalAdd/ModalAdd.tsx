import { IncomeSelect } from "../Income/IncomeSelect/IncomeSelect"

export const ModalAdd = () => {
    const types = ['Найм', 'Самозанятый']
    return (
        <div className="modal__add">
            <div className="modal__add-content">
                <IncomeSelect 
                    types={types} 
                    labelClassName="modal__add-label"
                    classNameSelect="modal__add-select" 
                    classNameOption="modal__add-option" 
                />
            </div>
        </div>
    )
}