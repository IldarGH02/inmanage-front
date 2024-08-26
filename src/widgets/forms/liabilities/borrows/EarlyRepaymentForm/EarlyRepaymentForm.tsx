// import React, { useState } from "react";
// import "./earlyRepaymentForm.css";
// import { Formik, Form, ErrorMessage } from 'formik';
// import * as yup from 'yup';
// import { DropDownListForm } from "../../../elements/DropDownListForm/DropDownListForm";
// import { IDropDownList } from "../../../../../app/types/elements/IDropDownList";
// import { useNavigate } from "react-router-dom";
// import { InputSumForm } from "../../../elements/InputSumForm/InputSumForm";
// import { InputDateForm } from "../../../elements/InputDateForm/InputDateForm";
// import { useDispatch } from "react-redux";
// import { hideLoader } from "../../../../../app/store/actions/assets/assetsActions";
// import { actionTypesLiabilities } from "../../../../../app/store/types/liabilitiesTypes";
// import { addLoan } from "../../../../../app/store/actions/liabilities/liabilitiesActions";
// import { ILiabilitiesLoans } from "../../../../../app/types/liabilities/loans/ILoans";

// const paymentProcedureList: IDropDownList[] = [
//     {
//         id: 1,
//         content: 'Аннуитетный'
//     },
//     {
//         id: 2,
//         content: 'Диффиренцированный'
//     }
// ]

// interface IEarlyRepaymentForm {
//     onClose: () => void
// }

// export function EarlyRepaymentForm({onClose}: IEarlyRepaymentForm) {
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     const [paymentProcedureType, setPaymentProcedureType] = useState('Аннуитетный')
//     // const [creditBlockVisible, setCreditBlockVisible] = useState(false)

//     const validationSchema = () => {
//         return yup.object().shape({
//             date: yup.date(),
//             name: yup.string().required('Обязательное поле для заполнения').max(30, `Допустимая длина превышает 30 символов`),
//             sum: yup.string().required('Обязательное поле для заполнения').max(12, 'Допустимая длина превышена').lengthNumbersValidator('Не равно 0'),            
//             oneTimePayment: yup.string().required('Обязательное поле для заполнения').lengthNumbersValidator('Не равно 0'),
//             monthlyPayment: yup.string().required('Обязательное поле для заполнения').lengthNumbersValidator('Не равно 0'),
//             loanTerms: yup.string().required('Обязательное поле для заполнения').lengthMonthsValidator(500, 'Максимальное количество 500'),
//         }) 
//     }

//     return (
//         <Formik
//             validationSchema = {validationSchema}
//             initialValues={
//                 {
//                     name: '',
//                     sum: '',
//                     monthlyPayment: '',

//                     oneTimePayment: '',
                    
//                     date: new Date(''),
//                     loanTerms: '',
//                     percent: '0.0',
//                 } 
//             }
//             onSubmit={values => {
//                 let loan: ILiabilitiesLoans = {
//                     name: values.name,
//                     date: values.date,
//                     insurance: false, // страховка
//                     insurance_sum: 0, // стоимость страховки
//                     remainder: 0, // остаток
                
//                     // insurance_val: boolean, //наличие страховки (МОЕ) 
                
//                     sum: Number(values.sum.replace(/ /g,'')),//сумма кредита
//                     loan_term: Number(values.loanTerms.replace(/ /g,'')), // срок кредитования
//                     percentage: Number(values.percent.replace(/ /g,'')), //процентная ставка
//                     month_payment: Number(values.monthlyPayment.replace(/ /g,'')), // ежемесячный платеж
//                     maintenance_cost: 0, // стоимость обслуживания
//                     expenses: [],
//                 }
//                 const res = addLoan(actionTypesLiabilities.ADD_LOAN_LIABILITIES, loan)
//                 res.then(e => {
//                     dispatch(e!);
//                     navigate("/liabilities/loan")
//                 })
//                 .catch((e) => {
//                     dispatch(hideLoader(actionTypesLiabilities.HIDE_LOADER_LIABILITIES))
//                     console.log(e)
//                 })
//             }}
//         >
//             {({ errors, touched, values }) => ( 
//             <Form className="early-repayment-form">
//                 <div className="early-repayment-form__about-card-block-wrapper">
//                     <div className="add-business-form__about-card-block">
//                         <div className="early-repayment-form__block-title">Досрочное погашение</div>
//                         <div className="early-repayment-form__item">
//                             <InputDateForm
//                                 value={values.date} 
//                                 error={errors.date}
//                                 touched={touched.date}
//                                 name="date"
//                                 placeHolder="Дата первого платежа"  
//                             />
//                             {errors.date && touched.date && <div className="add-borrows-form__warning">Обязательное поле для заполнения</div>}
//                             {/* <ErrorMessage name="date" render={msg => <div className="early-repayment-form__warning">{msg}</div>} /> */}
//                         </div>
//                         <div className="early-repayment-form__block-title">Частичное погашение</div>
//                         <div className="early-repayment-form__item">
//                             <InputDateForm
//                                 value={values.date} 
//                                 error={errors.date}
//                                 touched={touched.date}
//                                 name="date"
//                                 placeHolder="Дата частичного погашения"  
//                             />
//                             {errors.date && touched.date && <div className="add-borrows-form__warning">Обязательное поле для заполнения</div>}
//                             {/* <ErrorMessage name="date" render={msg => <div className="early-repayment-form__warning">{msg}</div>} /> */}
//                         </div>
//                         <div className="early-repayment-form__item">
//                             <InputSumForm
//                                 valuta="₽" 
//                                 value={values.oneTimePayment} 
//                                 error={errors.oneTimePayment}
//                                 touched={touched.oneTimePayment}
//                                 name="oneTimePayment"
//                                 placeHolder="Сумма частичного погашения"
//                                 background="rgb(241, 242, 246)"    
//                             />
//                             <ErrorMessage name="oneTimePayment" render={msg => <div className="early-repayment-form__warning">{msg}</div>} />
//                         </div>
//                         <div className="early-repayment-form__item">
//                             <DropDownListForm
//                                 idContent='dropDownPaymentPeriod'
//                                 idTitle='dropDownTitlePaymentPeriod'
//                                 placeholder="Порядок частичного погашения"
//                                 title={paymentProcedureType}
//                                 data= {paymentProcedureList}
//                                 onChange={setPaymentProcedureType}
//                             />
//                         </div>
//                     </div>               
//                 </div>
                
//                 <div className="loan-item-page__btns">
//                     <button className="cancel-btn early-repayment-form__cancel-btn" type="button" onClick={onClose}>Отменить</button>
//                     <button className="loan-item-page__add-btn" type="submit">Подтвердить</button>
//                 </div>
//             </Form>
//        )}
//         </Formik>
//     )
// }
