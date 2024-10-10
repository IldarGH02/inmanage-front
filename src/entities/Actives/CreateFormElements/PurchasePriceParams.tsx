import { useContext } from "react"
import { useError } from "../../../features/hooks/useError/useError"
import { InputSum } from "../../../widgets/Custom/Inputs/InputSum"
import { Select } from "../../../widgets/Custom/Select"
import { Context } from "../../../main"
import { observer } from "mobx-react-lite"

import './PurchasePriceParams.scss'

export const PurchasePriceParams= observer(() => {
    const { immovablesStore } = useContext(Context).rootStore

    const paymentError = useError('')
    

    const selectedPaymentType = immovablesStore.payments_type_list.find(
        (item) => item.content === immovablesStore.payment_type)

    return (
        <div className="purchase__price">
            <h2 className="add-property-form__block-title">Цена покупки</h2>
            <InputSum 
                value={immovablesStore.bought_price}
                type='text'
                currency='₽'
                placeholder='Стоимость недвижимости'
                classNameCurrency="price__sum-currency"
                onChange={immovablesStore.handleChangeBoughtPrice}       
            />
            <Select
                onChange={immovablesStore.handleChangePaymentType}
                errorMessage={paymentError.error}
                selected={selectedPaymentType || null}
                classNameContainer={`dropdown__container`}
                classNameSelect='dropdown__select'
                classNameList='dropdown__list'
                placeholder="Тип выплаты"
                options={immovablesStore.payments_type_list}
            />
        </div>
    )
})