import { useEffect, useState } from "react";
import "./addCardForm.css";
import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { DropDownListForm } from "../../../elements/DropDownListForm/DropDownListForm";
import { IDropDownList } from "../../../../../app/types/elements/IDropDownList";
import { InputTextForm } from "../../../elements/InputTextForm/InputTextForm";
import { Link } from "react-router-dom";
import { InputSumForm } from "../../../elements/InputSumForm/InputSumForm";
import { InputPercentForm } from "../../../elements/InputPercentForm/InputPercentForm";
import { ICard } from "../../../../../app/types/balance/IBalance";
import BalanceStore from "../../../../../app/store/balanceStore";
import { observer } from "mobx-react-lite";

const listAccountType: IDropDownList[] = [
    {
        id: 1,
        content: 'Наличные средства'
    },
    {
        id: 2,
        content: 'Карта'
    }
]

const listBank: IDropDownList[] = [
    {
        id: 1,
        content: 'Наличные средства'
    },
    {
        id: 2,
        content: 'Карта'
    }
]

const listCardType: IDropDownList[] = [
    {
        id: 1,
        content: 'Дебетовая'
    },
    {
        id: 2,
        content: 'Кредитная'
    }
]

export const AddCardForm = observer(() => {
    const [store] = useState(
        () => new BalanceStore()
    )
    const [cardType, setCardType] = useState('Дебетовая')
    const [accountType, setAccountType] = useState('Наличные средства')
    const [bank, setBank] = useState('')
    const [errorDropList, setErrorDropList] = useState({
        cardType: '',
        accountType: '',
        bank: ''
    })

    useEffect(()=>{
        setCardType('Дебетовая')
    }, [accountType])

    const validationSchema = () => {
        if(cardType==='Кредитная' && accountType==='Карта') {
            return yup.object().shape({
                name: yup.string().required('Обязательное поле для заполнения').max(30, `Допустимая длина превышает 30 символов`),
                sum: yup.string().required('Обязательное поле для заполнения').max(12, 'Допустимая длина превышена'),
                percent: yup.string().required('Обязательное поле для заполнения'),
                sumCreditLimit: yup.string().required('Обязательное поле для заполнения').max(12, 'Допустимая длина превышена'),
                currentSumForCredit: yup.string().required('Обязательное поле для заполнения').max(12, 'Допустимая длина превышена'),
                days: yup.string().required('Обязательное поле для заполнения').lengthDaysValidator(1000, 'Максимальное количество 1000'),
            }) 
        }
        if(accountType==='Наличные средства') {
            return yup.object().shape({
                name: yup.string().required('Обязательное поле для заполнения').max(30, `Допустимая длина превышает 30 символов`),
                sum: yup.string().required('Обязательное поле для заполнения').max(12, 'Допустимая длина превышена'),
            }) 
        }
        if(accountType==='Карта'&&cardType==='Дебетовая') {
            return yup.object().shape({
                name: yup.string().required('Обязательное поле для заполнения').max(30, `Допустимая длина превышает 30 символов`),
                sum: yup.string().required('Обязательное поле для заполнения').max(12, 'Допустимая длина превышена'),
            }) 
        }
            
    }

    const checkError = () => {
        let newErrorList = {
            cardType: '',
            accountType: '',
            bank: ''
        }
        if(cardType!=='') {
            newErrorList.cardType = ''
        } else {
            newErrorList.cardType = 'Обязательное поле для заполнения'
        }
        if(accountType!=='') {
            newErrorList.accountType = ''
        } else {
            newErrorList.accountType = 'Обязательное поле для заполнения'
        }
        if(bank!=='') {
            newErrorList.bank = ''
        } else {
            newErrorList.bank = 'Обязательное поле для заполнения'
        }
        setErrorDropList(newErrorList)
    }

    return (
        <Formik
            validationSchema = {validationSchema}
            initialValues={
                {
                    name: '',
                    sum: '',
                    percent: '0.0',
                    sumCreditLimit: '',
                    currentSumForCredit: '',
                    days: '', 
                } //as Step1Form
            }
            onSubmit={values => {
                if((accountType==='Карта' && errorDropList.bank!=='')||accountType!=='Карта') {
                    const card: ICard = {
                        name: values.name,
                        bank: accountType === "Карта" ? true : false,
                        bank_name: accountType === "Карта" ? bank : null,
                        card_num: null,
                        loan: (cardType === 'Кредитная' && accountType === 'Карта') ? true : false,
                        interest_free: (cardType === 'Кредитная' && accountType === 'Карта') ? Number(values.days.replace(/ /g, '')) : null,
                        percentage: (cardType === 'Кредитная' && accountType === 'Карта') ? Number(values.percent.replace(/ /g, '')) : null,
                        remainder: (cardType === 'Кредитная' && accountType === 'Карта') ? Number(values.currentSumForCredit.replace(/ /g, '')) : Number(values.sum.replace(/ /g, '')),
                        limit: (cardType === 'Кредитная' && accountType === 'Карта') ? Number(values.sumCreditLimit.replace(/ /g, '')) : null,
                        flag: false,
                        income: [], // optional
                        expenses: [], // optional
                        total_expense: null,
                        total_income: null,
                        currency: 0,
                        is_business: false,
                        is_deletable: false,
                        is_editable: false
                    }
                    store.createNewCard(card)
                }
                
            }}
        >
            {({ errors, touched, values }) => ( 
            <Form className="add-card-form">
                <div className="add-card-form__about-card-block-wrapper">
                    <div className="add-card-form__about-card-block">
                        <div className="add-card-form__block-title">Добавить новый счёт</div>
                        <div className="add-card-form-cash">
                            <div className="add-card-form-cash__item">
                                <DropDownListForm
                                    idContent='dropDownContentAccountType'
                                    idTitle='dropDownTitleAccountType'
                                    placeholder="Тип счёта"
                                    title={accountType}
                                    // error={errorDropList.accountType===''&&accountType===''?true:false}
                                    data= {listAccountType}
                                    onChange={setAccountType}
                                />
                            </div>
                            {accountType==='Карта' &&
                            <>
                            <div className="add-card-form-cash__item">
                                <DropDownListForm
                                    idContent='dropDownContentCardType'
                                    idTitle='dropDownTitleCardType'
                                    placeholder="Тип карты"
                                    title={cardType}
                                    // error={errorDropList.cardType===''&&cardType===''?true:false}
                                    data= {listCardType}
                                    onChange={setCardType}
                                />
                            </div>
                            <div className="add-card-form-cash__item">
                                <DropDownListForm
                                    searchInput={true}
                                    idContent='dropDownContentBank'
                                    idTitle='dropDownTitleBank'
                                    placeholder="Банк"
                                    title={bank}
                                    // error={(errorDropList.bank!==''&&bank==='')?true:false}
                                    data= {listBank}
                                    onChange={setBank}
                                />
                            </div>
                            </>
                            }
                            
                            <div className="add-card-form-cash__item">
                                <InputTextForm
                                    value={values.name}
                                    error={errors.name}
                                    touched={touched.name}
                                    placeHolder="Наименование"
                                    name="name"
                                />
                                <ErrorMessage name="name" render={msg => <div className="add-card-form-cash__warning">{msg}</div>} />
                            </div>
                            {cardType!=="Кредитная" &&  
                                <div className="add-card-form-cash__item">
                                    <InputSumForm 
                                        valuta="₽" 
                                        value={values.sum} 
                                        error={errors.sum}
                                        touched={touched.sum}
                                        name="sum"
                                        placeHolder="Баланс"
                                        background="rgb(241, 242, 246)"    
                                    />
                                    <ErrorMessage name="sum" render={msg => <div className="add-card-form-cash__warning">{msg}</div>} />
                                </div>
                            }
                            {cardType==="Кредитная" && accountType!=='Наличные средства' &&
                            <>
                                <div className="add-card-form-cash__item">
                                    <InputSumForm 
                                        valuta="₽" 
                                        value={values.sumCreditLimit} 
                                        error={errors.sumCreditLimit}
                                        touched={touched.sumCreditLimit}
                                        name="sumCreditLimit"
                                        placeHolder="Сумма кредитного лимита"
                                        background="rgb(241, 242, 246)"    
                                    />
                                    <ErrorMessage name="sumCreditLimit" render={msg => <div className="add-card-form-cash__warning">{msg}</div>} />
                                </div>
                                <div className="add-card-form-cash__item">
                                    <InputSumForm
                                        valuta="₽" 
                                        value={values.currentSumForCredit} 
                                        error={errors.currentSumForCredit}
                                        touched={touched.currentSumForCredit}
                                        name="currentSumForCredit"
                                        placeHolder="Текущее количество средств"
                                        background="rgb(241, 242, 246)"    
                                    />
                                    <ErrorMessage name="currentSumForCredit" render={msg => <div className="add-card-form-cash__warning">{msg}</div>} />
                                </div>
                                <div className="add-card-form-cash__item">
                                    <InputSumForm
                                        valuta="дней" 
                                        value={values.days} 
                                        error={errors.days}
                                        touched={touched.days}
                                        name="days"
                                        placeHolder="Беспроцентный период"
                                        background="rgb(241, 242, 246)"    
                                    />
                                    <ErrorMessage name="days" render={msg => <div className="add-card-form-cash__warning">{msg}</div>} />
                                </div>
                                <div className="add-card-form-cash__item">
                                    <InputPercentForm
                                        value={values.percent} 
                                        error={errors.percent}
                                        touched={touched.percent}
                                        name="percent"
                                        placeHolder="Процент за просрочку"
                                        background="rgb(241, 242, 246)"    
                                    />
                                    <ErrorMessage name="percent" render={msg => <div className="add-card-form-cash__warning">{msg}</div>} />
                                </div>
                            </>
                            }
                        </div>
                    </div>
                </div>
                <div className="add-card-form__btns">
                    <Link to="/balance" className="cancel-btn add-card-form__cancel-btn">Отменить</Link>
                    <button className="add-card-form__add-btn" type="submit" onClick={()=>{
                        // console.log(values)
                        checkError()
                    }}>Подтвердить</button>
                </div>
            </Form>
       )}
        </Formik>
    )
})
