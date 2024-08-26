import { FC } from "react"
import { useError } from "../../../features/hooks/useError/useError"
import { InputSum } from "../../../widgets/Custom/Inputs/InputSum"
import { Select } from "../../../widgets/Custom/Select"
import { IDropDownList } from "../../../app/types/elements/IDropDownList"
import './PurchasePriceParams.scss'

interface PurchasePriceParams {
    setPaymentValue: (value: string) => void
    // setPaymentError: (value: string) => void
    setPriceValue: (value: string) => void
    setErrorPrice: (value: string) => void
    paymentsType: IDropDownList[]
    paymentValue: string
    priceValue: string
}

export const PurchasePriceParams: FC<PurchasePriceParams> = (
    {
        setPaymentValue,
        paymentsType,
        paymentValue,
        setErrorPrice,
        setPriceValue,
        priceValue
    }) => {
    const paymentError = useError('')
    
    const handlePaymentChange = (value: string) => {
        setPaymentValue(value)
        if(value.length > 0) {
            paymentError.setError('')
        }
    }

    const selectedPaymentType = paymentsType.find((item) => item.content === paymentValue)

    return (
        <div className="purchase__price">
            <h2 className="add-property-form__block-title">Цена покупки</h2>
            <InputSum 
                value={priceValue} 
                type='text' 
                currency='₽'
                placeholder='Стоимость недвижимости'
                classNameCurrency="price__sum-currency"
                setValue={setPriceValue}
                setError={setErrorPrice}                               
            />
            <Select
                onChange={handlePaymentChange}
                errorMessage={paymentError.error}
                selected={selectedPaymentType || null}
                classNameContainer={`dropdown__container`}
                classNameSelect='dropdown__select'
                classNameList='dropdown__list'
                placeholder="Тип выплаты"
                options={paymentsType}
            />
        </div>
    )
}