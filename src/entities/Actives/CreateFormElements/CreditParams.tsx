import { useContext } from "react"
import { InputSum } from "../../../widgets/Custom/Inputs/InputSum"
import { InputPercent } from "../../../widgets/Custom/Inputs/InputPercent"
import { InputDate } from "../../../shared/ui/input/InputDate"
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import './CreditParams.scss';
import { Select } from "../../../widgets/Custom/Select";


export const CreditParams = observer(() => {
    const { immovablesStore } = useContext(Context).rootStore

    const selectedPaymentOrder = immovablesStore.payment_order_list.find((
        item
    ) => item.content === immovablesStore.payment_order)

    const selectedPaymentPeriod = immovablesStore.payment_period_list.find((
        item
    ) => item.content === immovablesStore.payment_period)

    const selectedWriteoffAccount = immovablesStore.writeoff_account_list.find((
        item
    ) => item.content === immovablesStore.writeoff_account)
    
    return (
        <div className={`credit ${immovablesStore.loan ? 'active--loan' : ''}`}>
            <Select
                onChange={immovablesStore.handleChangeWriteoffAccount}
                options={immovablesStore.writeoff_account_list}
                selected={selectedWriteoffAccount || null}
                placeholder="Счёт списания"
                classNameContainer={`dropdown__container`}
                classNameSelect='dropdown__select'
                classNameList='dropdown__list'
                errorMessage=""
            />
            <InputSum
                onChange={immovablesStore.handleChangeInitialPayment}
                value={immovablesStore.initial_payment} 
                type="text" 
                currency="₽" 
                placeholder="Первый взнос"
                classNameCurrency="price__sum-currency"         
            />
            <InputSum
                onChange={immovablesStore.handleChangeLoanTerm}
                classNameCurrency="price__sum-currency"
                currency={`${immovablesStore.loan_term ? '.мес' : ''}`}
                placeholder="Срок кредитования"
                type="text"
                value={immovablesStore.loan_term}
            />
            <InputDate 
                onChange={immovablesStore.handleChangeDate} 
                value={immovablesStore.first_payment_date} 
                placeholder="Дата первого платежа"
            />
            <InputPercent
                setPercentValue={immovablesStore.handleChangeInterestRate}
                setPercentError={() => {}}
                classNameCurrency="price__sum-currency"
                currency={`${immovablesStore.interest_rate ? '%' : ''}`}
                placeholder="Процентная ставка"
                type="text"
                value={immovablesStore.interest_rate}
            />
            <Select
                onChange={immovablesStore.handleChangePaymentOrder}
                selected={selectedPaymentOrder || null}
                options={immovablesStore.payment_order_list}
                placeholder="Порядок выплаты"
                classNameContainer={`dropdown__container`}
                classNameSelect='dropdown__select'
                classNameList='dropdown__list'
                errorMessage=""
            />
            <Select
                onChange={immovablesStore.handleChangePaymentPeriod}
                selected={selectedPaymentPeriod || null}
                options={immovablesStore.payment_period_list}
                placeholder="Периодичность выплаты"
                classNameContainer={`dropdown__container`}
                classNameSelect='dropdown__select'
                classNameList='dropdown__list'
                errorMessage=""
            />
        </div>
    )
})