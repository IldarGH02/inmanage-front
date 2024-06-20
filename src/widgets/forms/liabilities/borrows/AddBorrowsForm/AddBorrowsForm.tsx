import React from "react";
import "./addBorrowsForm.css";
import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
// import { IDropDownList } from "../../../../../app/types/elements/IDropDownList";
import { InputTextForm } from "../../../elements/InputTextForm/InputTextForm";
import { Link, useNavigate } from "react-router-dom";
import { InputSumForm } from "../../../elements/InputSumForm/InputSumForm";
import { InputDateForm } from "../../../elements/InputDateForm/InputDateForm";
import { useDispatch } from "react-redux";
import { hideLoader } from "../../../../../app/store/actions/assets/assetsActions";
import { InputPercentForm } from "../../../elements/InputPercentForm/InputPercentForm";
import { ILiabilitiesBorrows } from "../../../../../app/types/liabilities/borrows/IBorrows";
import { actionTypesLiabilities } from "../../../../../app/store/types/liabilitiesTypes";
import { addBorrow } from "../../../../../app/store/actions/liabilities/liabilitiesActions";

// const paymentTypeList: IDropDownList[] = [
//     {
//         id: 1,
//         content: 'Наличный расчет'
//     },
//     {
//         id: 2,
//         content: 'Ипотека / кредит'
//     }
// ]

// const rentTypeList: IDropDownList[] = [
//     {
//         id: 1,
//         content: 'Долгосрочная'
//     },
//     {
//         id: 2,
//         content: 'Посуточная'
//     }
// ]

export function AddBorrowsForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const validationSchema = () => {
        return yup.object().shape({
            date: yup.date(),
            name: yup.string().required('Обязательное поле для заполнения').max(30, `Допустимая длина превышает 30 символов`),
            sum: yup.string().required('Обязательное поле для заполнения').max(12, 'Допустимая длина превышена').lengthNumbersValidator('Не равно 0'),            
            // oneTimePayment: yup.string().required('Обязательное поле для заполнения').lengthNumbersValidator('Не равно 0'),
            monthlyPayment: yup.string().required('Обязательное поле для заполнения').lengthNumbersValidator('Не равно 0'),
            loanTerms: yup.string().required('Обязательное поле для заполнения').lengthMonthsValidator(500, 'Максимальное количество 500'),
        }) 
    }

    return (
        <Formik
            validationSchema = {validationSchema}
            initialValues={
                {
                    name: '',
                    sum: '',
                    monthlyPayment: '',

                    loanTerms: '',
                    date: new Date(''),
                    percent: '0.0',
                } 
            }
            onSubmit={values => {
                let borrow: ILiabilitiesBorrows = {
                    name: values.name,
                    date: values.date,
                    insurance: false,
                    insurance_sum: 0,
                    remainder: 0,
                    sum: Number(values.sum.replace(/ /g, '')),
                    loan_term: Number(values.loanTerms.replace(/ /g, '')),
                    percentage: Number(values.percent.replace(/ /g, '')),
                    month_payment: Number(values.monthlyPayment.replace(/ /g, '')),
                    maintenance_cost: 0,
                    expenses: [],
                    total_expense: 0
                }
                const res = addBorrow(actionTypesLiabilities.ADD_LOAN_LIABILITIES, borrow)
                res.then(e => {
                    dispatch(e!);
                    navigate("/liabilities/borrow")
                })
                .catch((e) => {
                    dispatch(hideLoader(actionTypesLiabilities.HIDE_LOADER_LIABILITIES))
                    console.log(e)
                })
            }}
        >
            {({ errors, touched, values }) => ( 
            <Form className="add-borrows-form">
                <div className="add-borrows-form__content">
                    <div className="add-borrows-form__characteristic-block-wrapper">
                        <div className="add-borrows-form__characteristic-block">                              
                            <div className="add-borrows-form__item">
                                <InputTextForm
                                    value={values.name}
                                    error={errors.name}
                                    touched={touched.name}
                                    placeHolder="Наименование"
                                    name="name"
                                />
                                <ErrorMessage name="name" render={msg => <div className="add-borrows-form__warning">{msg}</div>} />
                            </div>
                            <div className="add-borrows-form__item">
                                <InputSumForm
                                    valuta="₽" 
                                    value={values.sum} 
                                    error={errors.sum}
                                    touched={touched.sum}
                                    name="sum"
                                    placeHolder="Сумма займа"
                                    background="rgb(241, 242, 246)"    
                                />
                                <ErrorMessage name="rentSum" render={msg => <div className="add-borrows-form__warning">{msg}</div>} />
                            </div>
                            <div className="add-borrows-form__item">
                                <InputSumForm
                                    valuta="₽" 
                                    value={values.monthlyPayment} 
                                    error={errors.monthlyPayment}
                                    touched={touched.monthlyPayment}
                                    name="monthlyPayment"
                                    placeHolder="Ежемесячный платеж"
                                    background="rgb(241, 242, 246)"    
                                />
                                <ErrorMessage name="monthlyPayment" render={msg => <div className="add-borrows-form__warning">{msg}</div>} />
                            </div>
                        </div>
                    </div>

                    <div className="add-borrows-form__about-card-block-wrapper">
                        <div className="add-business-form__about-card-block">
                            <div className="add-borrows-form__item">
                                <InputSumForm
                                    valuta="мес." 
                                    value={values.loanTerms} 
                                    error={errors.loanTerms}
                                    touched={touched.loanTerms}
                                    name="loanTerms"
                                    placeHolder="Срок займа"
                                    background="rgb(241, 242, 246)"    
                                />
                                <ErrorMessage name="loanTerms" render={msg => <div className="add-borrows-form__warning">{msg}</div>} />
                            </div>
                            <div className="add-borrows-form__item">
                                <InputDateForm
                                    value={values.date} 
                                    error={errors.date}
                                    touched={touched.date}
                                    name="date"
                                    placeHolder="Дата займа"  
                                />
                                {errors.date && touched.date && <div className="add-borrows-form__warning">Обязательное поле для заполнения</div>}
                                {/* <ErrorMessage name="date" render={msg => <div className="add-borrows-form__warning">{msg}</div>} /> */}
                            </div>
                            <div className="add-borrows-form__item">
                                <InputPercentForm
                                    value={values.percent} 
                                    error={errors.percent}
                                    touched={touched.percent}
                                    name="percent"
                                    placeHolder="Процентная ставка"
                                    background="rgb(255, 255, 255)"    
                                />
                                <ErrorMessage name="percent" render={msg => <div className="add-business-form__warning">{msg}</div>} />
                            </div>                         
                        </div>
                    </div>
                </div>
                
                <div className="add-borrows-form__btns">
                    <Link to="/liabilities/borrow" className="cancel-btn add-borrows-form__cancel-btn">Отменить</Link>
                    <button className="add-borrows-form__add-btn" type="submit" onClick={()=>console.log(values)}>Подтвердить</button>
                </div>
            </Form>
       )}
        </Formik>
    )
}
