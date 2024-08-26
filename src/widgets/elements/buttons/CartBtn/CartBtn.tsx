import "./cartBtn.css"

import cart from '../../../../shared/assets/img/trash.svg'

export function CartBtn() {
    return (
        <img className="cart-btn" src={cart} alt='cart'></img>
    )
}