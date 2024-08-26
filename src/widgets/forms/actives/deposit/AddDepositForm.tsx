// import { useState } from "react";
// import "./addDepositForm.css";
// import { Formik, Form, ErrorMessage } from 'formik';
// import * as yup from 'yup';
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { IDropDownList } from "../../../../app/types/elements/IDropDownList";
// import { InputTextForm } from "../../elements/InputTextForm/InputTextForm";
// import { InputSumForm } from "../../elements/InputSumForm/InputSumForm";
// import { DropDownListForm } from "../../elements/DropDownListForm/DropDownListForm";
// import { InputPercentForm } from "../../elements/InputPercentForm/InputPercentForm";
// import { InputDateForm } from "../../elements/InputDateForm/InputDateForm";
// import { IAssetsDeposit } from "../../../../app/types/actives/deposit/IDeposit";
// // import { addDeposit, hideLoader } from "../../../../app/store/actions/assets/assetsActions";
// import { actionTypes } from "../../../../app/store/types/types";

// const contributionTypeList: IDropDownList[] = [
//     {
//         id: 1,
//         content: 'Тинькофф'
//     },
//     {
//         id: 2,
//         content: 'Сбербанк'
//     }
// ]

// export function AddDepositForm() {
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     const [activeCategoryLoan, setActiveCategoryLoan] = useState(false)
//     const [wasCheckError, setWasCheckError] = useState(false)
//     const [contributionType, setContributionType] = useState('')
//     const [contributionError, setContributionError] = useState('')

//     const validationSchema = () => {
//         if(!activeCategoryLoan) {
//             return yup.object().shape({
//                 nameContribution: yup.string().required('Обязательное поле для заполнения').max(30, `Допустимая длина превышает 30 символов`),
//                 sumContribution: yup.string().required('Обязательное поле для заполнения').max(15, 'Допустимая длина превышена').lengthNumbersValidator('Не равно 0'),
//             }) 
//         } else {
//             return yup.object().shape({
//                 nameLoan: yup.string().required('Обязательное поле для заполнения').max(30, `Допустимая длина превышает 30 символов`),
//                 sumLoan: yup.string().required('Обязательное поле для заполнения').max(15, 'Допустимая длина превышена').lengthNumbersValidator('Не равно 0'),
//                 propertyValue: yup.string().required('Обязательное поле для заполнения').max(12, 'Допустимая длина превышена').lengthNumbersValidator('Не равно 0'),
//                 monthPaymentLoan: yup.string().required('Обязательное поле для заполнения').lengthMonthsValidator(500, 'Максимальное количество 500'),
//                 termLoan: yup.string().required('Обязательное поле для заполнения').lengthMonthsValidator(500, 'Максимальное количество 500'),
//                 dateLoan: yup.date().required('Обязательное поле для заполнения').min(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()), 'Дата должна быть не позднее сегодняшнего дня'),
//                 percentageLoan: yup.string().required('Обязательное поле для заполнения'),
//             }) 
//         }            
//     }

//     const checkError = () => {
//         setWasCheckError(true)
//         if(contributionType!=='') {
//             setContributionError('')
//         } else {
//             setContributionError('Обязательное поле для заполнения')
//         }
       
//     }

//     return (
//         <Formik
//             validationSchema = {validationSchema}
//             initialValues={
//                 {
//                     //contribution
//                     nameContribution: '',
//                     sumContribution: '',
//                     percentageContribution: '0.0',
//                     incomeContribution: '0.0',

//                     nameLoan: '',
//                     sumLoan: '',
//                     monthPaymentLoan: '',
//                     termLoan: '',
//                     dateLoan: new Date(),
//                     percentageLoan: '0.0',
//                 } 
//             }
//             onSubmit={values => {
//                 if(contributionError==='') {
//                     let deposit: IAssetsDeposit = {
//                         incomes: [],
//                         percentage: 0,
//                         period: '',
//                         sum: 0,
//                         type: '',
//                     }
//                     if(!activeCategoryLoan) {
//                         deposit.percentage= Number(values.percentageContribution)
//                         deposit.sum = Number(values.sumContribution.replace(/ /g, ''))
//                     } else {
//                         deposit.percentage= Number(values.percentageLoan)
//                         deposit.sum = Number(values.sumLoan.replace(/ /g, ''))
//                     }
//                     // const res = addDeposit(actionTypes.ADD_DEPOSIT, deposit)
//                     res.then(e => {
//                         dispatch(e!);
//                         navigate("/assets/deposits")
//                     })
//                     .catch((e) => {
//                         dispatch(hideLoader(actionTypes.HIDE_LOADER))
//                         console.log(e)
//                     })
//                 }
                
//             }}
//         >
//             {({ errors, touched, values }) => ( 
//             <Form className="add-deposit-form">
//                 <div className="add-deposit-form__categories">
//                     <div className="add-deposit-form__category">
//                         <div className={`add-deposit-form__category-title${!activeCategoryLoan?'--active':''}`} onClick={()=>setActiveCategoryLoan(false)}>Вклад</div>
//                     </div>
//                     <div className="add-deposit-form__category">
//                         <div className={`add-deposit-form__category-title${activeCategoryLoan?'--active':''}`} onClick={()=>setActiveCategoryLoan(true)}>Займ</div>
//                     </div>
//                 </div>
//                 <div className="add-deposit-form__content">
                    
//                     <div className="add-deposit-form__contribution-block-wrapper">
//                         {activeCategoryLoan && <div className="add-deposit-form__inactive-block"></div>}
//                         <div className="add-deposit-form__contribution-block">                              
//                             <div className="add-deposit-form__item">
//                                 <InputTextForm
//                                     value={values.nameContribution}
//                                     error={errors.nameContribution}
//                                     touched={touched.nameContribution}
//                                     placeHolder="Наименование"
//                                     name="nameContribution"
//                                 />
//                                 <ErrorMessage name="nameContribution" render={msg => <div className="add-deposit-form__warning">{msg}</div>} />
//                             </div>
//                             <div className="add-deposit-form__item">
//                                 <InputSumForm
//                                     valuta="₽" 
//                                     value={values.sumContribution} 
//                                     error={errors.sumContribution}
//                                     touched={touched.sumContribution}
//                                     name="sumContribution"
//                                     placeHolder="Сумма вклад"
//                                     background="rgb(241, 242, 246)"    
//                                 />
//                                 <ErrorMessage name="sumContribution" render={msg => <div className="add-deposit-form__warning">{msg}</div>} />
//                             </div>
//                             <div className="add-deposit-form__item">
//                                 <DropDownListForm
//                                     idContent='dropDownContributionType'
//                                     idTitle='dropDownTitleContributionType'
//                                     placeholder="Тип вклада"
//                                     title={contributionType}
//                                     searchInput={true}
//                                     checkError={wasCheckError}
//                                     data= {contributionTypeList}
//                                     onChange={setContributionType}
//                                 />
//                             </div>
//                             <div className="add-deposit-form__item">
//                                 <InputPercentForm
//                                     value={values.percentageContribution} 
//                                     error={errors.percentageContribution}
//                                     touched={touched.percentageContribution}
//                                     name="percentageContribution"
//                                     placeHolder="Процентная ставка"
//                                     background="rgb(241, 242, 246)"    
//                                 />
//                                 <ErrorMessage name="percentageContribution" render={msg => <div className="add-deposit-form__warning">{msg}</div>} />
//                             </div>
//                             <div className="add-deposit-form__item">
//                                 <InputPercentForm
//                                     value={values.incomeContribution} 
//                                     error={errors.incomeContribution}
//                                     touched={touched.incomeContribution}
//                                     name="incomeContribution"
//                                     placeHolder="Доходность"
//                                     background="rgb(241, 242, 246)"    
//                                 />
//                                 <ErrorMessage name="incomeContribution" render={msg => <div className="add-deposit-form__warning">{msg}</div>} />
//                             </div>
//                         </div>
//                     </div>
                    
                    

//                     <div className="add-deposit-form__loan-block-wrapper">
//                         {!activeCategoryLoan && <div className="add-deposit-form__inactive-block"></div>}
//                         <div className="add-deposit-form__loan-block">
//                             <div className="add-deposit-form__item">
//                                 <InputTextForm
//                                     value={values.nameLoan}
//                                     error={errors.nameLoan}
//                                     touched={touched.nameLoan}
//                                     placeHolder="Наименование"
//                                     name="nameLoan"
//                                 />
//                                 <ErrorMessage name="nameLoan" render={msg => <div className="add-deposit-form__warning">{msg}</div>} />
//                             </div>
//                             <div className="add-deposit-form__item">
//                                 <InputSumForm
//                                     valuta="₽" 
//                                     value={values.sumLoan} 
//                                     error={errors.sumLoan}
//                                     touched={touched.sumLoan}
//                                     name="sumLoan"
//                                     placeHolder="Сумма займа"
//                                     background="rgb(241, 242, 246)"    
//                                 />
//                                 <ErrorMessage name="sumLoan" render={msg => <div className="add-deposit-form__warning">{msg}</div>} />
//                             </div>
//                             <div className="add-deposit-form__item">
//                                 <InputSumForm
//                                     valuta="₽" 
//                                     value={values.monthPaymentLoan} 
//                                     error={errors.monthPaymentLoan}
//                                     touched={touched.monthPaymentLoan}
//                                     name="monthPaymentLoan"
//                                     placeHolder="Ежемесячный платёж"
//                                     background="rgb(241, 242, 246)"    
//                                 />
//                                 <ErrorMessage name="monthPaymentLoan" render={msg => <div className="add-deposit-form__warning">{msg}</div>} />
//                             </div>
//                             <div className="add-card-form-cash__item">
//                                 <InputSumForm
//                                     valuta="мес." 
//                                     value={values.termLoan} 
//                                     error={errors.termLoan}
//                                     touched={touched.termLoan}
//                                     name="termLoan"
//                                     placeHolder="Срок займа"
//                                     background="rgb(241, 242, 246)"    
//                                 />
//                                 <ErrorMessage name="termLoan" render={msg => <div className="add-card-form-cash__warning">{msg}</div>} />
//                             </div>
//                             <div className="add-card-form-cash__item">
//                                     <InputDateForm
//                                         value={values.dateLoan} 
//                                         error={errors.dateLoan}
//                                         touched={touched.dateLoan}
//                                         name="date"
//                                         placeHolder="Дата первого платежа"  
//                                     />
//                                     <ErrorMessage name="dateLoan" render={msg => <div className="add-card-form-cash__warning">{msg}</div>} />
//                                 </div>
//                             <div className="add-business-form__item">
//                                 <InputPercentForm
//                                     value={values.percentageLoan} 
//                                     error={errors.percentageLoan}
//                                     touched={touched.percentageLoan}
//                                     name="percentageLoan"
//                                     placeHolder="Процентная ставка"
//                                     background="rgb(241, 242, 246)"    
//                                 />
//                                 <ErrorMessage name="percentageLoan" render={msg => <div className="add-business-form__warning">{msg}</div>} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
                
//                 <div className="add-deposit-form__btns">
//                     <Link to="/assets/deposits" className="cancel-btn add-deposit-form__cancel-btn">Отменить</Link>
//                     <button className="add-deposit-form__add-btn" type="submit" onClick={checkError}>Подтвердить</button>
//                 </div>
//             </Form>
//        )}
//         </Formik>
//     )
// }
