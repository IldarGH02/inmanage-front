import { observer } from "mobx-react-lite";
import { InputSum } from "../../../widgets/Custom/Inputs/InputSum.tsx";
import { Select } from "../../../widgets/Custom/Select.tsx";
import { useError } from "../../../features/hooks/useError/useError.tsx";
import {FC, useContext, useEffect, useState} from "react";
import { IDropDownList } from "../../../app/types/elements/IDropDownList.ts";
import { paymentsOrder, paymentsPeriod } from "../../../features/constants/payments.ts";
import {getBankList} from "../../../features/func/parsData.ts";
import { Context } from "../../../main.tsx";

interface ICreditProps {
    setOrder: (value: string) => void
    setBank:(value: string) => void
    setPeriod: (value: string) => void
    setAccount: (value: string) => void
    setDownPaymentValue: (value: string) => void
    setLoanTermValue: (value: string) => void
    setRateValue: (value: string) => void
    rateValue: string
    loanTermValue: string
    downPaymentValue: string
    order: string
    period: string
    bank: string
    account: string
}

export const Credit:FC<ICreditProps> = observer((
    {
        setOrder,
        setPeriod,
        order,
        period,
        setRateValue,
        setDownPaymentValue,
        downPaymentValue,
        setLoanTermValue,
        rateValue,
        loanTermValue,
        setBank,
        setAccount,
        account,
        bank
    }) => {

    const store = useContext(Context).balanceStore
    const selectErrorPaymentOrder = useError('')
    const selectErrorPaymentPeriod = useError('')
    const selectedErrorBank = useError('')
    const selectErrorAccount = useError('')

    const inputErrorDownPayment = useError('')
    const inputErrorLoanTerm = useError('')
    const inputErrorRateValue = useError('')

    const [paymentOrderList, setPaymentOrderList] = useState<IDropDownList[]>([])
    const [paymentPeriodList, setPaymentPeriodList] = useState<IDropDownList[]>([])
    const [accountList, setAccountList] = useState<IDropDownList[]>([])
    const [bankList, setBankList] = useState<IDropDownList[]>([])

    const selectedPaymentOrder = paymentOrderList.find((item) => item.content === order)
    const selectedPaymentPeriod = paymentPeriodList.find((item) => item.content === period)
    const selectedBank = bankList.find((item) => item.content === bank)
    const selectAccount = accountList.find((item) => item.content === account)

    const handlePaymentOrder = (value: string) => {
        setOrder(value)
        if(value.length > 0){
            selectErrorPaymentOrder.setError('')
        }
    }

    const handlePaymentPeriod = (value: string) => {
        setPeriod(value)
        if(value.length > 0){
            selectErrorPaymentPeriod.setError('')
        }
    }

    const handleChangeBank = (value: string) => {
        setBank(value)
        if(value.length > 0){
            selectedErrorBank.setError('')
        }
    }

    const handleChangeAccount = (value: string) => {
        setAccount(value)
        if(value.length > 0) {
            selectErrorAccount.setError('')
        }
    }

    useEffect(() => {
        const newOrderList: IDropDownList[] = []
        const newPaymentsPeriod: IDropDownList[] = []
        const newAccountList: IDropDownList[] = []

        let id = 0;

        paymentsOrder.map((order) => {
            id++
            newOrderList.push({id: id, content: order.content})
        })

        paymentsPeriod.map((period) => {
            id++
            newPaymentsPeriod.push({id: id, content: period.content})
        })

        store.card_list?.map((card) => {
            newAccountList.push({ id: card.id, content: card.name })
        })

        setPaymentOrderList(newOrderList)
        setPaymentPeriodList(newPaymentsPeriod)
        setBankList(getBankList)
        setAccountList(newAccountList)
    }, [])

    return (
        <>
            <Select
                selected={selectAccount || null}
                options={accountList}
                classNameContainer={`dropdown__container ${selectedErrorBank.error ? 'error' : ''}`}
                classNameSelect='dropdown__select'
                classNameList='dropdown__list'
                placeholder='Счет списания'
                mode='rows'
                errorMessage={selectedErrorBank.error}
                onChange={handleChangeAccount}
            />
            <Select
                selected={selectedBank || null}
                options={bankList}
                classNameContainer={`dropdown__container ${selectedErrorBank.error ? 'error' : ''}`}
                classNameSelect='dropdown__select'
                classNameList='dropdown__list'
                placeholder='Банк'
                mode='rows'
                errorMessage={selectedErrorBank.error}
                onChange={handleChangeBank}
            />
            <InputSum
                value={downPaymentValue}
                type='text'
                currency='₽'
                placeholder="Первый взнос"
                classNameCurrency='price__sum-currency'
                setValue={setDownPaymentValue}
                setError={inputErrorDownPayment.setError}
            />
            <InputSum
                value={loanTermValue}
                type='text'
                currency='мес.'
                placeholder='Срок кредитования'
                classNameCurrency='price__sum-currency'
                setValue={setLoanTermValue}
                setError={inputErrorLoanTerm.setError}
            />

            <InputSum
                value={rateValue}
                type='text'
                currency='%'
                placeholder='Процентная ставка'
                classNameCurrency='price__sum-currency'
                setValue={setRateValue}
                setError={inputErrorRateValue.setError}
            />

            <Select
                selected={selectedPaymentOrder || null}
                options={paymentOrderList}
                classNameContainer={`dropdown__container ${selectErrorPaymentOrder.error ? 'error' : ''}`}
                classNameSelect='dropdown__select'
                classNameList='dropdown__list'
                placeholder='Порядок выплаты'
                mode='rows'
                errorMessage={selectErrorPaymentOrder.error}
                onChange={handlePaymentOrder}
            />

            <Select
                selected={selectedPaymentPeriod || null}
                options={paymentPeriodList}
                classNameContainer={`dropdown__container ${selectErrorPaymentPeriod.error ? 'error' : ''}`}
                classNameSelect='dropdown__select'
                classNameList='dropdown__list'
                placeholder='Периодичность выплаты'
                mode='rows'
                onChange={handlePaymentPeriod}
                errorMessage={selectErrorPaymentPeriod.error}
            />
        </>
    )
})