import { observer } from "mobx-react-lite";
import { InputSum } from "../../../widgets/Custom/Inputs/InputSum.tsx";
import { Select } from "../../../widgets/Custom/Select.tsx";
import { useError } from "../../../features/hooks/useError/useError.tsx";
import { useContext } from "react";
import { Context } from "../../../main.tsx";


export const Credit = observer(() => {
    const { transportStore } = useContext(Context).rootStore
    
    const selectErrorPaymentOrder = useError('')
    const selectErrorPaymentPeriod = useError('')
    const selectedErrorBank = useError('')
    const selectedPaymentOrder = transportStore.payments_order_list.find((item) => item.content === transportStore.payment_order)
    const selectedPaymentPeriod = transportStore.payments_period_list.find((item) => item.content === transportStore.payment_period)
    const selectedBank = transportStore.bank_list.find((item) => item.content === transportStore.bank)
    const selectAccount = transportStore.writeoff_account_list.find((item) => item.content === transportStore.writeoff_account)

    return (
        <>
            <Select
                selected={selectAccount || null}
                options={transportStore.writeoff_account_list} // to fix
                classNameContainer={`dropdown__container ${selectedErrorBank.error ? 'error' : ''}`}
                classNameSelect='dropdown__select'
                classNameList='dropdown__list'
                placeholder='Счет списания'
                mode='rows'
                errorMessage={selectedErrorBank.error}
                onChange={transportStore.handleChangeWriteoffAccount}
            />
            
            <Select
                selected={selectedBank || null}
                options={transportStore.bank_list}
                classNameContainer={`dropdown__container ${selectedErrorBank.error ? 'error' : ''}`}
                classNameSelect='dropdown__select'
                classNameList='dropdown__list'
                placeholder='Банк'
                mode='rows'
                errorMessage={selectedErrorBank.error}
                onChange={transportStore.handleChangeBank}
            />

            <InputSum
                value={transportStore.down_payment}
                type='text'
                currency='₽'
                placeholder="Первый взнос"
                classNameCurrency='price__sum-currency'
                onChange={transportStore.handleChangeDownPayment}
            />

            <InputSum
                value={transportStore.loan_term}
                type='text'
                currency='мес.'
                placeholder='Срок кредитования'
                classNameCurrency='price__sum-currency'
                onChange={transportStore.handleChangeLoanTerm}
            />

            <InputSum
                value={transportStore.interest_rate}
                type='text'
                currency='%'
                placeholder='Процентная ставка'
                classNameCurrency='price__sum-currency'
                onChange={transportStore.handleChangeInterestRate}
            />

            <Select
                selected={selectedPaymentOrder || null}
                options={transportStore.payments_order_list} // to fix
                classNameContainer={`dropdown__container ${selectErrorPaymentOrder.error ? 'error' : ''}`}
                classNameSelect='dropdown__select'
                classNameList='dropdown__list'
                placeholder='Порядок выплаты'
                mode='rows'
                errorMessage={selectErrorPaymentOrder.error}
                onChange={transportStore.handleChangePaymentOrder}
            />

            <Select
                selected={selectedPaymentPeriod || null}
                options={transportStore.payments_period_list} // to fix
                classNameContainer={`dropdown__container ${selectErrorPaymentPeriod.error ? 'error' : ''}`}
                classNameSelect='dropdown__select'
                classNameList='dropdown__list'
                placeholder='Периодичность выплаты'
                mode='rows'
                onChange={transportStore.handleChangePaymentPeriod}
                errorMessage={selectErrorPaymentPeriod.error}
            />
        </>
    )
})