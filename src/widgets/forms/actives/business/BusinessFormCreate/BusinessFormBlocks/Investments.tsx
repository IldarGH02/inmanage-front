import { useContext } from "react"
import { CheckboxCustom } from "../../../../../Custom/Inputs/CheckboxCustom"
import { Select } from "../../../../../Custom/Select"
import { InputSum } from "../../../../../Custom/Inputs/InputSum"
import { InputText } from "../../../../../../shared/ui/input/InputText"
import { InputDate } from "../../../../../../shared/ui/input/InputDate"
import { InputPercent } from "../../../../../Custom/Inputs/InputPercent"
import { Context } from "../../../../../../main"
import { observer } from "mobx-react-lite"
import { Button } from "../../../../../../shared/ui/Buttons/Button"

export const Investments = observer(() => {
    const { businessCreateStore } = useContext(Context)

     // Выпадающие списки (выбор значения)
     const selectWriteoffAccount = businessCreateStore.cardsList.find((item) => 
            item.content === businessCreateStore.writeoffAccount)
     const selectPaymentsPeriod = businessCreateStore.paymentsPeriodList.find((item) => 
            item.content === businessCreateStore.paymentsPeriod)
     const selectPaymentsOrder = businessCreateStore.paymentsOrderList.find((item) => 
            item.content === businessCreateStore.paymentsOrder)
     const selectCreditPeriod = businessCreateStore.creditPaymentPeriodList.find((item) => 
            item.content === businessCreateStore.creditPeriod)


    return (
        <div className="business__form-invest">
                <h3 className="business__form-invest_title">Стартовые инвестиции</h3>
                <div className="business__form-start_invest">
                    <CheckboxCustom
                        checkboxName="Собственные средства"
                        setChecked={businessCreateStore.handleChangeOwnFundCheckbox}
                    /> 
                    {
                        businessCreateStore.ownFundsCheckbox &&
                        <div className="own-invest__block">
                            <div className={`own-invest__block-transform ${businessCreateStore.ownFundsCheckbox ? 'open' : ''}`}>
                                <Select
                                    selected={selectWriteoffAccount || null}
                                    options={businessCreateStore.cardsList}
                                    classNameContainer={`dropdown__container`}
                                    classNameSelect='dropdown__select'
                                    classNameList='dropdown__list'
                                    errorMessage=""
                                    placeholder="Счёт списания"
                                    mode="rows"
                                    onChange={businessCreateStore.handleChangeWriteoffAccount}
                                />
                                <InputSum
                                    setValue={businessCreateStore.handleChangeOwnFund}
                                    setError={() => {}}
                                    value={businessCreateStore.ownFunds}
                                    placeholder="Собственные средства"
                                    classNameCurrency=""
                                    currency="₽"
                                    type="text"
                                />
                            </div>
                        </div>
                    }

                    <CheckboxCustom
                        checkboxName="Сторонние и инвестиционные средства"
                        setChecked={businessCreateStore.handleChangeInvestmentCheckbox}
                    />
                    {
                        businessCreateStore.investmentCheckbox &&
                            <div className="investment__block">
                                <div className={`investment__block-transform ${businessCreateStore.investmentCheckbox ? 'open' : ''}`}>
                                    <InputSum
                                        setValue={businessCreateStore.handleChangeCreditSum}
                                        setError={() => {}}
                                        value={businessCreateStore.creditSum}
                                        placeholder="Сумма займа"
                                        classNameCurrency=""
                                        currency="₽"
                                        type="text"
                                    />
                                    <InputText
                                        onChange={businessCreateStore.handleChangeLoanTerm}
                                        value={businessCreateStore.loanTerm}
                                        type="text"
                                        placeholder="Срок займа"
                                    />
                                    <InputDate
                                        onChange={businessCreateStore.handleChangeLoanDate}
                                        value={businessCreateStore.loanDate}
                                        placeholder="Дата займа"
                                    />
                                    <InputPercent
                                        setPercentValue={businessCreateStore.handleChangePercent} 
                                        value={businessCreateStore.percent} 
                                        type="text" 
                                        currency="%" 
                                        placeholder="Процентная ставка"
                                        classNameCurrency="input__percent-currency"
                                        setPercentError={() => {}}                                    
                                    />
                                    <Select
                                        selected={selectPaymentsPeriod || null}
                                        options={businessCreateStore.paymentsPeriodList}
                                        onChange={businessCreateStore.handleChangePaymentsPeriod}
                                        placeholder="Периодичность выплаты"
                                        classNameContainer={`dropdown__container`}
                                        classNameSelect='dropdown__select'
                                        classNameList='dropdown__list'
                                        errorMessage=""
                                    />
                                </div>
                            </div>
                    }
                    <CheckboxCustom
                        checkboxName="Инвестиции в кредит"
                        setChecked={businessCreateStore.handleChangeCreditCheckbox}
                    />
                    {
                        businessCreateStore.creditCheckbox &&
                        <div className="business__credit-invest">
                            <div className="credit__invest-transform">
                                <InputSum
                                    setValue={businessCreateStore.handleChangeLoanAmount}
                                    setError={() => {}}
                                    value={businessCreateStore.loanAmount}
                                    placeholder="Сумма кредитования"
                                    classNameCurrency=""
                                    currency="₽"
                                    type="text"
                                />
                                <InputSum
                                    setValue={businessCreateStore.handleChangeLoanTerms}
                                    setError={() => {}}
                                    value={businessCreateStore.loanTerms}
                                    placeholder="Срок кредитования"
                                    classNameCurrency=""
                                    currency=".мес"
                                    type="text"
                                />
                                <InputDate
                                    value={businessCreateStore.creditDate}
                                    onChange={businessCreateStore.handleChangeCreditDate}
                                    placeholder="Дата кредита"
                                />
                                <InputPercent
                                    setPercentValue={businessCreateStore.handleChangeInterestRate} 
                                    value={businessCreateStore.interestRate} 
                                    type="text" 
                                    currency="%" 
                                    placeholder="Процентная ставка"
                                    classNameCurrency={""}
                                    setPercentError={() => {}}                                    
                                />
                                <Select
                                    selected={selectPaymentsOrder || null}
                                    options={businessCreateStore.paymentsOrderList}
                                    onChange={businessCreateStore.handleChangePaymentsOrder}
                                    placeholder="Перядок выплаты"
                                    classNameContainer={`dropdown__container`}
                                    classNameSelect='dropdown__select'
                                    classNameList='dropdown__list'
                                    errorMessage=""
                                />
                                <Select
                                    selected={selectCreditPeriod|| null}
                                    options={businessCreateStore.creditPaymentPeriodList}
                                    onChange={businessCreateStore.handleChangeCreditPeriod}
                                    placeholder="Периодичность выплаты"
                                    classNameContainer={`dropdown__container`}
                                    classNameSelect='dropdown__select'
                                    classNameList='dropdown__list'
                                    errorMessage=""
                                />
                            </div>
                        </div>
                    }
                    {/* <button type="button" className="add-business-form__balance-btn" onClick={onBalanceClick}>Баланс</button>          */}
                    <Button
                        type="button"
                        className=""
                        onClick={() => {}}
                        textButton="Баланс"
                        name='balance'
                    />
                </div>
        </div>
    )
})