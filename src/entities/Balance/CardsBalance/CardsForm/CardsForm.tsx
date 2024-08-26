import { useContext, useState, useEffect, FC, FormEvent } from "react";
import "./addCardForm.css";
import { IDropDownList } from "../../../../app/types/elements/IDropDownList.ts";
import { RequestCard } from "../../../../app/types/balance/IBalance.ts";
import { observer } from "mobx-react-lite";
import {Context} from "../../../../main.tsx";
import {Select} from "../../../../widgets/Custom/Select.tsx";
import {Button} from "../../../../shared/ui/Buttons/Button.tsx";
import {getBankList} from "../../../../features/func/parsData.ts";
import {useError} from "../../../../features/hooks/useError/useError.tsx";
import {InputSum} from "../../../../widgets/Custom/Inputs/InputSum.tsx";
import {accountTypes, cardTypes} from "../../../../features/constants/payments.ts";
import { InputText } from "../../../../shared/ui/input/InputText.tsx"; 

interface CardsFormProps {
    handleClose: () => void
}

export const CardsForm: FC<CardsFormProps> = observer(({handleClose}) => {
    const store = useContext(Context).balanceStore
    const [name, setName] = useState<string>('')
    const [debitValue, setDebitValue] = useState<string>('')
    const [creditLimitValue, setCreditLimitValue] = useState<string>('')
    const [currentBalanceValue, setCurrentBalanceValue] = useState<string>('')
    const [interestFreeValue, setInterestFreeValue] = useState<string>('')
    const [interestFreeStartValue, setInterestFreeStartValue] = useState<string>('')
    const [percentOutValue, setPercentOutValue] = useState<string>('')

    const [bank, setBank] = useState('')
    const [accountType, setAccountType] = useState('')
    const [cardType, setCardType] = useState('')

    const [bankList, setBankList] = useState<IDropDownList[]>([])
    const [accountTypesList, setAccountTypesList] = useState<IDropDownList[]>([])
    const [cardTypesList, setCardTypesList] = useState<IDropDownList[]>([])

    const selectedErrorBank = useError('')
    const accountTypeError = useError('')
    const cardTypeError = useError('')
    const debitError = useError('')
    const creditLimitError = useError('')
    const currentBalanceError = useError('')
    const interestFreeError = useError('')
    const interestFreeStartError = useError('')
    const percentOutError = useError('')

    useEffect(()=>{
        setCardType('Дебетовая')
        setBankList(getBankList)
        setAccountTypesList(accountTypes)
        setCardTypesList(cardTypes)
    }, [])

    const selectedBank = bankList.find((item) => item.content === bank)
    const selectedAccountType = accountTypesList.find((item) => item.content === accountType)
    const selectedCardType = cardTypesList.find((item) => item.content === cardType)

    const checkError = () => {
        if(bank !== '') {
            selectedErrorBank.setError('')
        } else {
            selectedErrorBank.setIsError(true)
            selectedErrorBank.setError('Обязательное поле')
        }
    }

    const handleChangeAccountType = (value: string) => {
        setAccountType(value)
        if(value.length > 0){
            accountTypeError.setError('')
        }
    }

    const handleChangeBank = (value: string) => {
        setBank(value)
        if(value.length > 0){
            selectedErrorBank.setError('')
        }
    }

    const handleChangeCardType = (value: string) => {
        setCardType(value)
        if(value.length > 0){
            cardTypeError.setError('')
        }
    }

    // const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    //     const value = e.target.value;
    //     setName(value)
    // }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if(accountType === 'Карта' ||  accountType !== 'Карта') {
            const card: RequestCard = {
                name: name,
                bank: accountType === 'Карта', // Флаг, где true - банковская карта, false - наличный счет
                bank_name: accountType === 'Карта' ? bank : '', // Название банка
                currency: null, // Только если валютный счет, null = "RUB"
                remainder: Number(debitValue.replace(/ /g,'')),
                credit: {
                    limit: (cardType==='Кредитная' && accountType==='Карта') ? Number(creditLimitValue.replace(/ /g,'')) : 0, // Лимит кредитно карты
                    interest_free: (cardType==='Кредитная' && accountType==='Карта') ? Number(interestFreeValue.replace(/ /g,'')) : 0, // Беспроцентный период
                    interest_free_day: (cardType==='Кредитная' && accountType==='Карта') ? Number(interestFreeStartValue.replace(/ /g,'')) : 0, // День обнуления БП
                    percentage_for_delay: (cardType==='Кредитная' && accountType==='Карта') ? Number(percentOutValue.replace(/ /g,'')) : 0, // Процент за просрочку
                    usage_payment: 0, // плата за обслуживание (в рамках кредитной карты)
                },
            }

            const response = store.createNewCard(card)
            store.setLoading(true)
            response.then(res => {
                if(res.status >= 200 && res.status < 300) {
                    store.setLoading(false)
                    handleClose()
                    setName('')
                    setDebitValue('')
                    setCardType('')
                    setInterestFreeValue('')
                    setCreditLimitValue('')
                    setCurrentBalanceValue('')
                    setInterestFreeStartValue('')
                    setPercentOutValue('')
                }
            }).catch(e => store.setError(e))
        }
    }

    return (
        <form className="cards__form" onSubmit={handleSubmit}>
            <div className="cards__form-content">
                <div className="cards__form-title">Добавить новый счёт</div>
                <div className="cards__form-params">
                    <Select
                        selected={selectedAccountType || null}
                        options={accountTypesList}
                        classNameContainer={`dropdown__container ${accountTypeError.error ? 'error' : ''}`}
                        classNameSelect='dropdown__select'
                        classNameList='dropdown__list'
                        placeholder='Тип счёта'
                        mode='rows'
                        onChange={handleChangeAccountType}
                        errorMessage={accountTypeError.error}
                    />
                    {accountType==='Карта' &&
                        <>
                            <Select
                                selected={selectedBank || null}
                                options={bankList}
                                classNameContainer={`dropdown__container ${selectedErrorBank.error ? 'error' : ''}`}
                                classNameSelect='dropdown__select'
                                classNameList='dropdown__list'
                                placeholder='Банк'
                                onChange={handleChangeBank}
                                mode='rows'
                                errorMessage={selectedErrorBank.error}
                            />
                            <Select
                                selected={selectedCardType || null}
                                options={cardTypesList}
                                classNameContainer={`dropdown__container ${cardTypeError.error ? 'error' : ''}`}
                                classNameSelect='dropdown__select'
                                classNameList='dropdown__list'
                                placeholder='Тип карты'
                                mode='rows'
                                onChange={handleChangeCardType}
                                errorMessage={cardTypeError.error}
                            />
                        </>
                    }

                    <InputText
                        placeholder='Наименование'
                        type='text'
                        value={name}
                        onChange={() => {}}
                    />

                    {cardType === "Дебетовая" &&
                        <InputSum
                            value={debitValue}
                            type='text'
                            currency='₽'
                            placeholder='Баланс'
                            classNameCurrency='price__sum-currency'
                            setValue={setDebitValue}
                            setError={debitError.setError}
                        />
                    }
                    {cardType === "Кредитная" && accountType!=='Наличные средства' &&
                        <>
                            <InputSum
                                value={creditLimitValue}
                                type='text'
                                currency='₽'
                                placeholder='Сумма кредитного лимита'
                                classNameCurrency='price__sum-currency'
                                setValue={setCreditLimitValue}
                                setError={creditLimitError.setError}
                            />
                            <InputSum
                                value={currentBalanceValue}
                                type='text'
                                currency='₽'
                                placeholder='Текущее количество средств'
                                classNameCurrency='price__sum-currency'
                                setValue={setCurrentBalanceValue}
                                setError={currentBalanceError.setError}
                            />
                            <InputSum
                                value={interestFreeValue}
                                type='text'
                                currency='дней'
                                placeholder='Беспроцентный период'
                                classNameCurrency='price__sum-currency'
                                setValue={setInterestFreeValue}
                                setError={interestFreeError.setError}
                            />
                            <InputSum
                                value={interestFreeStartValue}
                                type='text'
                                currency='дней'
                                placeholder='Число начала беспроцентного периода'
                                classNameCurrency='price__sum-currency'
                                setValue={setInterestFreeStartValue}
                                setError={interestFreeStartError.setError}
                            />
                            <InputSum
                                value={percentOutValue}
                                type='text'
                                currency='%'
                                placeholder='Процент за просрочку'
                                classNameCurrency='price__sum-currency'
                                setValue={setPercentOutValue}
                                setError={percentOutError.setError}
                            />
                        </>
                    }
                </div>
            </div>
            <div className="cards__form-actions">
                <Button
                    className='cards__form-close close-button'
                    textButton='Отменить'
                    name='close'
                    onClick={handleClose}
                />
                <Button
                    className='add-card-form__add-btn'
                    type='submit'
                    textButton='Подтвердить'
                    name='submit'
                    onClick={checkError}
                />
            </div>
        </form>
    )
})
