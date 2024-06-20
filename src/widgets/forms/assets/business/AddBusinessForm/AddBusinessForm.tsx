import React, { useEffect, useState } from "react";
import "./addBusinessForm.css";
import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { DropDownListForm } from "../../../elements/DropDownListForm/DropDownListForm";
import { IDropDownList } from "../../../../../app/types/elements/IDropDownList";
import { InputTextForm } from "../../../elements/InputTextForm/InputTextForm";
import { Link, useNavigate } from "react-router-dom";
import { InputSumForm } from "../../../elements/InputSumForm/InputSumForm";
import { InputPercentForm } from "../../../elements/InputPercentForm/InputPercentForm";
import { DawIncomeBalance } from "../../../../elements/Daw/DawIncomeBalance/DawIncomeBalance";
import { IAssetsBusiness } from "../../../../../app/types/assets/IAssets";
import { addBusiness, hideLoader } from "../../../../../app/store/actions/assets/assetsActions";
import { actionTypes } from "../../../../../app/store/types/types";
import { useDispatch } from "react-redux";

const listTypeOfCommerce: IDropDownList[] = [
    {
        id: 1,
        content: 'Оффлайн'
    },
    {
        id: 2,
        content: 'Онлайн'
    }
]

interface IAddBalanceForm {
    onBalanceClick: ()=>void,
}

export function AddBusinessForm({onBalanceClick}: IAddBalanceForm) {
    const [ownFundsVisible, setOwnFundsVisible] = useState(false)
    const [investmentFundsVisible, setInvestmentFundsVisible] = useState(false)
    const [creditFundsVisible, setCreditFundsVisible] = useState(false)
    const [typeOfCommerce, setTypeOfCommerce] = useState('Оффлайн')
    const [error, setError] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const validationSchema = () => {
        let obj = {
            name: yup.string().required('Обязательное поле для заполнения').max(30, `Допустимая длина превышает 30 символов`),
            address:  yup.string().required('Обязательное поле для заполнения').max(50, `Допустимая длина превышает 50 символов`),
            entity: yup.string().required('Обязательное поле для заполнения').max(50, `Допустимая длина превышает 50 символов`),
            percentShare: yup.string().required('Обязательное поле для заполнения'),
            lineOfBusiness: yup.string().required('Обязательное поле для заполнения').max(50, `Допустимая длина превышает 50 символов`),
        }
        if(ownFundsVisible && !investmentFundsVisible && !creditFundsVisible) {
            return yup.object().shape({
                ...obj,
                ownFunds: yup.string().required('Обязательное поле для заполнения').max(12, 'Допустимая длина превышена').lengthNumbersValidator('Не равно 0')
            }) 
        }
        if(!ownFundsVisible && investmentFundsVisible && !creditFundsVisible) {
            return yup.object().shape({
                ...obj,
                sumInvestment: yup.string().required('Обязательное поле для заполнения').max(12, 'Допустимая длина превышена').lengthNumbersValidator('Не равно 0'),
                percentInvestment: yup.string().required('Обязательное поле для заполнения'),
                creditor: yup.string().required('Обязательное поле для заполнения').max(30, `Допустимая длина превышает 30 символов`)
            }) 
        }
        if(!ownFundsVisible && !investmentFundsVisible && creditFundsVisible) {
            return yup.object().shape({
                ...obj,
                sumCredit: yup.string().required('Обязательное поле для заполнения').max(12, 'Допустимая длина превышена').lengthNumbersValidator('Не равно 0'),
                loanTerms: yup.string().required('Обязательное поле для заполнения').lengthMonthsValidator(500, 'Максимальное количество 500'),
                interestRate: yup.string().required('Обязательное поле для заполнения')
            }) 
        }
        if(!ownFundsVisible && investmentFundsVisible && creditFundsVisible) {
            return yup.object().shape({
                ...obj,
                sumInvestment: yup.string().required('Обязательное поле для заполнения').max(12, 'Допустимая длина превышена').lengthNumbersValidator('Не равно 0'),
                percentInvestment: yup.string().required('Обязательное поле для заполнения'),
                creditor: yup.string().required('Обязательное поле для заполнения').max(30, `Допустимая длина превышает 30 символов`),
                sumCredit: yup.string().required('Обязательное поле для заполнения').max(12, 'Допустимая длина превышена').lengthNumbersValidator('Не равно 0'),
                loanTerms: yup.string().required('Обязательное поле для заполнения').lengthMonthsValidator(500, 'Максимальное количество 500'),
                interestRate: yup.string().required('Обязательное поле для заполнения')
            }) 
        }
        if(ownFundsVisible && !investmentFundsVisible && creditFundsVisible) {
            return yup.object().shape({
                ...obj,
                ownFunds: yup.string().required('Обязательное поле для заполнения').max(12, 'Допустимая длина превышена').lengthNumbersValidator('Не равно 0'),
                sumCredit: yup.string().required('Обязательное поле для заполнения').max(12, 'Допустимая длина превышена').lengthNumbersValidator('Не равно 0'),
                loanTerms: yup.string().required('Обязательное поле для заполнения').lengthMonthsValidator(500, 'Максимальное количество 500'),
                interestRate: yup.string().required('Обязательное поле для заполнения')
            }) 
        }
        if(ownFundsVisible && investmentFundsVisible && !creditFundsVisible) {
            return yup.object().shape({
                ...obj,
                ownFunds: yup.string().required('Обязательное поле для заполнения').max(12, 'Допустимая длина превышена').lengthNumbersValidator('Не равно 0'),
                sumInvestment: yup.string().required('Обязательное поле для заполнения').max(12, 'Допустимая длина превышена').lengthNumbersValidator('Не равно 0'),
                percentInvestment: yup.string().required('Обязательное поле для заполнения'),
                creditor: yup.string().required('Обязательное поле для заполнения').max(30, `Допустимая длина превышает 30 символов`)
            }) 
        }
        if(!ownFundsVisible && !investmentFundsVisible && !creditFundsVisible) {
            return yup.object().shape({
                ...obj
            }) 
        }
    }

    useEffect(()=>{
        if(!ownFundsVisible && !investmentFundsVisible && !creditFundsVisible) {
            setError(true)
        } else {
            setError(false)
        }
    }, [ownFundsVisible, investmentFundsVisible, creditFundsVisible])

    return (
        <Formik
            validationSchema = {validationSchema}
            initialValues={
                {
                    name: '',
                    address: '',

                    entity: '', //юр. лицо 
                    percentShare: '50.0',

                    lineOfBusiness: '',

                    ownFunds: '',

                    sumInvestment: '',
                    percentInvestment: '0.0',
                    creditor: '',

                    sumCredit: '',
                    loanTerms: '',
                    interestRate: '0.0',
                }
            }
            onSubmit={values => {
                if(!error) {
                    let business: IAssetsBusiness = {
                        name: values.name,
                        bought_price: 0,
                        direction: values.lineOfBusiness,
                        month_income: 0,
                        month_expense: 0,
                        total_income: 0,
                        total_expense: 0,
                        average_profit: 0,
                        initial_payment: 0,
                        revenue: 0,
                        own_funds: ownFundsVisible,
                        own_funds_amount: ownFundsVisible ? Number(values.ownFunds.replace(/ /g, '')) : 0,
                        third_party_tools: investmentFundsVisible ? Number(values.sumInvestment.replace(/ /g, '')) : 0,
                        third_party_tools_percentage: investmentFundsVisible ? Number(values.percentInvestment.replace(/ /g, '')) : 0,
                        creditor: values.creditor,
                        loan_term: creditFundsVisible ? Number(values.loanTerms.replace(/ /g, '')) : 0,
                        percentage: creditFundsVisible ? Number(values.interestRate.replace(/ /g, '')) : 0,
                        month_payment: 0,
                        type: typeOfCommerce,
                        income: [],
                        expenses: [],
                        // equipment: [],
                        loan: creditFundsVisible,
                        total_worth: 0,
                        address: values.address
                    }
                    const res = addBusiness(actionTypes.ADD_BUSINESS, business)
                    res.then(e => {
                        dispatch(e!);
                        navigate("/assets/business")
                    })
                    .catch((e) => {
                        dispatch(hideLoader(actionTypes.HIDE_LOADER))
                        console.log(e)
                    })
                }
            }}
        >
            {({ errors, touched, values }) => ( 
            <Form className="add-business-form">
                <div className="add-business-form__content">
                    <div className="add-business-form__characteristic-block-wrapper">
                        <div className="add-business-form__characteristic-block">                              
                            <div className="add-business-form__item">
                                <InputTextForm
                                    value={values.name}
                                    error={errors.name}
                                    touched={touched.name}
                                    placeHolder="Название бизнеса"
                                    name="name"
                                />
                                <ErrorMessage name="name" render={msg => <div className="add-business-form__warning">{msg}</div>} />
                            </div>
                            <div className="add-business-form__item">
                                <InputTextForm
                                    value={values.address}
                                    error={errors.address}
                                    touched={touched.address}
                                    placeHolder="Адрес бизнеса"
                                    name="address"
                                />
                                <ErrorMessage name="address" render={msg => <div className="add-business-form__warning">{msg}</div>} />
                            </div>
                            <div className="add-business-form__item">
                                <InputTextForm
                                    value={values.entity}
                                    error={errors.entity}
                                    touched={touched.entity}
                                    placeHolder="Юр. лицо"
                                    name="entity"
                                />
                                <ErrorMessage name="entity" render={msg => <div className="add-business-form__warning">{msg}</div>} />
                            </div>
                            <div className="add-business-form__item">
                                <InputPercentForm
                                    value={values.percentShare} 
                                    error={errors.percentShare}
                                    touched={touched.percentShare}
                                    name="percentShare"
                                    placeHolder="Процент долевого участия"
                                    background="rgb(241, 242, 246)"    
                                />
                                <ErrorMessage name="percentShare" render={msg => <div className="add-business-form__warning">{msg}</div>} />
                            </div>
                            <div className="add-business-form__block-title">Характеристика бизнеса</div>
                            <div className="add-business-form__item">
                                <InputTextForm
                                    value={values.lineOfBusiness}
                                    error={errors.lineOfBusiness}
                                    touched={touched.lineOfBusiness}
                                    placeHolder="Направление бизнеса"
                                    name="lineOfBusiness"
                                />
                                <ErrorMessage name="lineOfBusiness" render={msg => <div className="add-business-form__warning">{msg}</div>} />
                            </div>
                            <div className="add-business-form__item">
                                <DropDownListForm
                                    idContent='dropDownTypeOfCommerce'
                                    idTitle='dropDownTitleTypeOfCommerce'
                                    placeholder="Тип коммерции"
                                    title={typeOfCommerce}
                                    // error={errorDropList.accountType===''&&typeOfCommerce===''?true:false}
                                    data= {listTypeOfCommerce}
                                    onChange={setTypeOfCommerce}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="add-business-form__about-card-block-wrapper">
                        <div className="add-business-form__block-title">Стартовые инвестиции</div>
                        <div className="add-business-form__about-card-block">
                            <div className="add-business-form__item">
                                <div className="add-business-form-variant">
                                    <div className="add-business-form-variant__title">Собственные средства</div>
                                    <div className="add-business-form-variant__daw">
                                        <DawIncomeBalance color="rgb(200, 200, 200)" onChangeDaw={()=>setOwnFundsVisible(!ownFundsVisible)} dawActive={ownFundsVisible}/>
                                    </div>
                                </div>
                            </div>
                            {ownFundsVisible && 
                                <div className="add-business-form__item">
                                    <InputSumForm
                                        valuta="₽" 
                                        value={values.ownFunds} 
                                        error={errors.ownFunds}
                                        touched={touched.ownFunds}
                                        name="ownFunds"
                                        placeHolder="Собственные средства"
                                        background="rgb(241, 242, 246)"    
                                    />
                                    <ErrorMessage name="ownFunds" render={msg => <div className="add-business-form__warning">{msg}</div>} />
                                </div>
                            }
                            <div className="add-business-form__item">
                                <div className="add-business-form-variant">
                                    <div className="add-business-form-variant__title">Сторонние и инвестиционные средства</div>
                                    <div className="add-business-form-variant__daw">
                                        <DawIncomeBalance color="rgb(200, 200, 200)" onChangeDaw={()=>setInvestmentFundsVisible(!investmentFundsVisible)} dawActive={investmentFundsVisible}/>
                                    </div>
                                </div>
                            </div>
                            {investmentFundsVisible && 
                            <>
                                <div className="add-business-form__item">
                                    <InputSumForm
                                        valuta="₽" 
                                        value={values.sumInvestment} 
                                        error={errors.sumInvestment}
                                        touched={touched.sumInvestment}
                                        name="sumInvestment"
                                        placeHolder="Сумма кредита"
                                        background="rgb(241, 242, 246)"    
                                    />
                                    <ErrorMessage name="sumInvestment" render={msg => <div className="add-business-form__warning">{msg}</div>} />
                                </div>
                                <div className="add-business-form__item">
                                    <InputPercentForm
                                        value={values.percentInvestment} 
                                        error={errors.percentInvestment}
                                        touched={touched.percentInvestment}
                                        name="percentInvestment"
                                        placeHolder="Процент"
                                        background="rgb(241, 242, 246)"    
                                    />
                                    <ErrorMessage name="percentInvestment" render={msg => <div className="add-business-form__warning">{msg}</div>} />
                                </div>
                                <div className="add-business-form__item">
                                    <InputTextForm
                                        value={values.creditor}
                                        error={errors.creditor}
                                        touched={touched.creditor}
                                        placeHolder="Кредитор"
                                        name="creditor"
                                    />
                                    <ErrorMessage name="creditor" render={msg => <div className="add-business-form__warning">{msg}</div>} />
                                </div>
                            </>
                            }
                            <div className="add-business-form__item">
                                <div className="add-business-form-variant">
                                    <div className="add-business-form-variant__title">Инвестиции в кредит</div>
                                    <div className="add-business-form-variant__daw">
                                        <DawIncomeBalance color="rgb(200, 200, 200)" onChangeDaw={()=>setCreditFundsVisible(!creditFundsVisible)} dawActive={creditFundsVisible}/>
                                    </div>
                                </div>
                            </div>
                            {creditFundsVisible && 
                            <>
                                <div className="add-business-form__item">
                                    <InputSumForm
                                        valuta="₽" 
                                        value={values.sumCredit} 
                                        error={errors.sumCredit}
                                        touched={touched.sumCredit}
                                        name="sumCredit"
                                        placeHolder="Сумма кредитования"
                                        background="rgb(241, 242, 246)"    
                                    />
                                    <ErrorMessage name="sumCredit" render={msg => <div className="add-business-form__warning">{msg}</div>} />
                                </div>
                                <div className="add-card-form-cash__item">
                                    <InputSumForm
                                        valuta="мес." 
                                        value={values.loanTerms} 
                                        error={errors.loanTerms}
                                        touched={touched.loanTerms}
                                        name="loanTerms"
                                        placeHolder="Срок кредитования"
                                        background="rgb(241, 242, 246)"    
                                    />
                                    <ErrorMessage name="loanTerms" render={msg => <div className="add-card-form-cash__warning">{msg}</div>} />
                                </div>
                                <div className="add-business-form__item">
                                    <InputPercentForm
                                        value={values.interestRate} 
                                        error={errors.interestRate}
                                        touched={touched.interestRate}
                                        name="interestRate"
                                        placeHolder="Процентная ставка"
                                        background="rgb(241, 242, 246)"    
                                    />
                                    <ErrorMessage name="interestRate" render={msg => <div className="add-business-form__warning">{msg}</div>} />
                                </div>
                            </>
                            }
                            <button type="button" className="add-business-form__balance-btn" onClick={onBalanceClick}>Баланс</button>         
                        </div>
                    </div>
                </div>
                
                <div className="add-business-form__btns">
                    <Link to="/assets/business" className="cancel-btn add-business-form__cancel-btn">Отменить</Link>
                    <button className="add-business-form__add-btn" type="submit">Подтвердить</button>
                </div>
            </Form>
       )}
        </Formik>
    )
}
