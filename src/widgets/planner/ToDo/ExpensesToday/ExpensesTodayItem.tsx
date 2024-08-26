import { DawOrange } from "../../../elements/Daw/DawOrange/DawOrange"

// const cart = require('../../../../assets/img/trash.svg')

export function ExpensesTodayItem() {
    const changeDaw = ()=> {
        // setDawActive(!dawActive)
        // onChangeItem(data.id!)
    }

    return (
        <div className="expenses-today-item">
            <div className="expenses-today-item__time">8:20</div>
            <div className="expenses-today-item__container">
                <div className="expenses-today-item__title">Сходить за молоком</div>
                
                <div className="expenses-today-item__actions">
                    <div className="expenses-today-item__sum">{Number(45000).toLocaleString()} ₽</div>
                    <div className="expenses-today-item__daw">
                        <DawOrange onChangeDaw={changeDaw} dawActive={false}/>
                    </div>
                    <img className="expenses-today-item__remove-btn" src={''} alt="cart" />
                    
                </div>
            </div>
        </div>
    )
}