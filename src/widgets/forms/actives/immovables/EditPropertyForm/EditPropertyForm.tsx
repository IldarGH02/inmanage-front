// import React, { useState } from "react";
// import "./editPropertyForm.css";
// import { Formik, Form, ErrorMessage } from 'formik';
// import * as yup from 'yup';
// import { DropDownListForm } from "../../../elements/DropDownListForm/DropDownListForm.tsx";
// import { IDropDownList } from "../../../../../app/types/elements/IDropDownList.ts";
// import { InputTextForm } from "../../../elements/InputTextForm/InputTextForm.tsx";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { InputSumForm } from "../../../elements/InputSumForm/InputSumForm.tsx";
// import { InputDateForm } from "../../../elements/InputDateForm/InputDateForm.tsx";
// import { IAssetsProperty } from "../../../../../app/types/actives/ActivesTypes.ts";
// import { useDispatch } from "react-redux";
// import { editProperty, hideLoader } from "../../../../../app/store/actions/assets/assetsActions.ts";
// import { actionTypes } from "../../../../../app/store/types/types.ts";
// import { InputPercentForm } from "../../../elements/InputPercentForm/InputPercentForm.tsx";
// import { InputFileImages } from "../../../../../shared/ui/input/InputFileImages/InputFileImages.tsx"; 
// import { IImage } from "../../../../../app/types/elements/IImage.ts";

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

// interface IEditPropertyForm {
//     property: IAssetsProperty
// }

// export function EditPropertyForm({property}: IEditPropertyForm) {
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     const [paymentType, setPaymentType] = useState(property.loan?'Ипотека / кредит':'Наличный расчет')
//     const [rentType, setRentType] = useState(property.rent_type)
//     const [creditBlockVisible, setCreditBlockVisible] = useState(false)
//     const [images, setImages] = useState<IImage[]>([])
//     const {id} = useParams()
    
//     const onSetImages = (img: IImage[]|[]) => {
//         // let newImg: IImage[] = []
//         // if(img.length!==0) {
//         //     let maxId = 0
//         //     for(let i=0; i<images.length; i++) {
//         //         if(images[i].id>maxId) {
//         //             maxId=images[i].id
//         //         }
//         //     }
//         //     newImg = img.map(el=>{
//         //         el.id = maxId++
//         //         return el
//         //     })
//         //     setImages(prev=>[...prev, ...newImg])
//         // }
//         if(img.length!==0) {
//             setImages(img)
//         }
//     }

//     const openFileInput = ()=> {
//         (document.querySelector('#input-file') as HTMLInputElement).click();
//     }

//     const validationSchema = () => {
//         if(paymentType==='Наличный расчет') {
//             return yup.object().shape({
//                 address: yup.string().required('Обязательное поле для заполнения').max(30, `Допустимая длина превышает 30 символов`),
//                 owner: yup.string().required('Обязательное поле для заполнения').max(50, `Допустимая длина превышает 50 символов`),
//                 name: yup.string().required('Обязательное поле для заполнения').max(30, `Допустимая длина превышает 30 символов`),
//                 propertyValue: yup.string().required('Обязательное поле для заполнения').max(12, 'Допустимая длина превышена').lengthNumbersValidator('Не равно 0'),
//                 rentSum: yup.string().required('Обязательное поле для заполнения').max(12, 'Допустимая длина превышена').lengthNumbersValidator('Не равно 0')
//             }) 
//         } else {
//             return yup.object().shape({
//                 address: yup.string().required('Обязательное поле для заполнения').max(30, `Допустимая длина превышает 30 символов`),
//                 owner: yup.string().required('Обязательное поле для заполнения').max(30, `Допустимая длина превышает 30 символов`),
//                 name: yup.string().required('Обязательное поле для заполнения').max(30, `Допустимая длина превышает 30 символов`),
//                 propertyValue: yup.string().required('Обязательное поле для заполнения').max(12, 'Допустимая длина превышена').lengthNumbersValidator('Не равно 0'),
//                 downPayment: yup.string().required('Обязательное поле для заполнения').max(12, 'Допустимая длина превышена'),
//                 monthlyPayment: yup.string().required('Обязательное поле для заполнения').max(12, 'Допустимая длина превышена').lengthNumbersValidator('Не равно 0'),
//                 date: yup.date().required('Обязательное поле для заполнения').min(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()), 'Дата должна быть не позднее сегодняшнего дня'),
//                 loanTerms: yup.string().required('Обязательное поле для заполнения').lengthMonthsValidator(500, 'Максимальное количество 500'),
//                 percent: yup.string().required('Обязательное поле для заполнения'),
//                 rentSum: yup.string().required('Обязательное поле для заполнения').max(12, 'Допустимая длина превышена'),
//             }) 
//         }            
//     }

//     const getPercent = (num: number) => {
//         if(Number.isInteger(num)) {
//             return num+'.0'
//         }
//         if(num===null) {
//             return '0.0'
//         }
//         return String(num)
//     }

//     return (
//         <Formik
//             validationSchema = {validationSchema}
//             initialValues={
//                 {
//                     name: property!==null ? property.name : '',
//                     address: "",
//                     owner: property!==null ? property.owner : '',//realty.owner,

//                     propertyValue: property!==null ? String(property.bought_price) : '',

//                     downPayment: property!==null && property.initial_payment!==null ? String(property.initial_payment) : '',
//                     monthlyPayment: property!==null && property.month_payment!==null ? String(property.month_payment) : '',
//                     date: new Date(),
//                     loanTerms: property!==null && property.loan_term!==null ? String(property.loan_term) : '',
//                     percent: property!==null ? getPercent(property.percentage) : '0.0',

//                     rentSum: property!==null ? String(property.rent_price) : ''
//                 } 
//             }
//             onSubmit={values => {
//                 let newProperty: IAssetsProperty = {
//                     id: property?.id,
//                     name: values.name,
//                     // address: '',
//                     bought_price: Number(values.propertyValue.replace(/ /g, '')),
//                     actual_price: property!.actual_price,
//                     revenue: property!.revenue,
//                     equipment_price: property!.equipment_price,
//                     month_income: property!.month_income,
//                     month_expense: property!.month_expense,
//                     average_profit: property!.average_profit,
//                     rent_type: rentType,
//                     rent_price: Number(values.rentSum.replace(/ /g, '')),
//                     loan: false,
//                     // equipment: [],
//                     initial_payment: property!.initial_payment,
//                     loan_term: property!.loan_term,
//                     percentage: property!.percentage,
//                     month_payment: property!.month_payment,
//                     owner: values.owner,
//                     income: property!.income,
//                     expenses: property!.expenses,
//                     total_income: property!.total_income,
//                     total_expense: property!.total_expense
//                 }
//                 if(paymentType==='Ипотека / кредит') {
//                     newProperty.percentage = Number(values.percent.replace(/ /g,''))
//                     newProperty.loan = true
//                     newProperty.month_payment = Number(values.monthlyPayment.replace(/ /g,''))
//                     newProperty.loan_term = Number(values.loanTerms.replace(/ /g,''))
//                     newProperty.initial_payment = Number(values.downPayment.replace(/ /g,''))
//                 }
//                 const res = editProperty(actionTypes.EDIT_PROPERTY, newProperty)
//                 res.then(e => {
//                     dispatch(e!);
//                     navigate(`/assets/property/${id}`)
//                 })
//                 .catch((e) => {
//                     dispatch(hideLoader(actionTypes.HIDE_LOADER))
//                     console.log(e)
//                 })
//             }}
//         >
//             {({ errors, touched, values }) => ( 
//             <Form className="edit-property-form">
//                 <div className="edit-property-form__content">
//                     <div className="edit-property-form__characteristic-block-wrapper">
//                         <div className="edit-property-form__characteristic-block">                              
//                             <div className="edit-property-form__item">
//                                 <InputTextForm
//                                     value={values.name}
//                                     error={errors.name}
//                                     touched={touched.name}
//                                     placeHolder="Название недвижимости"
//                                     name="name"
//                                 />
//                                 <ErrorMessage name="name" render={msg => <div className="edit-property-form__warning">{msg}</div>} />
//                             </div>
//                             <div className="edit-property-form__item">
//                                 <InputTextForm
//                                     value={values.address}
//                                     error={errors.address}
//                                     touched={touched.address}
//                                     placeHolder="Адрес"
//                                     name="address"
//                                 />
//                                 <ErrorMessage name="address" render={msg => <div className="edit-property-form__warning">{msg}</div>} />
//                             </div>
//                             <div className="edit-property-form__item">
//                                 <InputTextForm
//                                     value={values.owner}
//                                     error={errors.owner}
//                                     touched={touched.owner}
//                                     placeHolder="Владелец"
//                                     name="owner"
//                                 />
//                                 <ErrorMessage name="owner" render={msg => <div className="edit-property-form__warning">{msg}</div>} />
//                             </div>
//                             <div className="edit-property-form__block-title">Цена покупки</div>
//                             <div className="edit-property-form__item">
//                                 <InputSumForm
//                                     valuta="₽" 
//                                     value={values.propertyValue} 
//                                     error={errors.propertyValue}
//                                     touched={touched.propertyValue}
//                                     name="propertyValue"
//                                     placeHolder="Стоимость недвижимости"
//                                     background="rgb(241, 242, 246)"    
//                                 />
//                                 <ErrorMessage name="propertyValue" render={msg => <div className="edit-property-form__warning">{msg}</div>} />
//                             </div>
//                             <div className="edit-property-form__item">
//                                 <DropDownListForm
//                                     idContent='dropDownPaymentType'
//                                     idTitle='dropDownTitlePaymentType'
//                                     placeholder="Тип выплаты"
//                                     title={paymentType}
//                                     // error={errorDropList.typeOfCommerce===''&&typeOfCommerce===''?true:false}
//                                     data= {paymentTypeList}
//                                     onChange={(title: string)=>{
//                                         setPaymentType(title)
//                                         if(title==="Наличный расчет") {
//                                             setCreditBlockVisible(false)
//                                         } else {
//                                             setCreditBlockVisible(true)
//                                         }
//                                     }}
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     <div className="edit-property-form__about-card-block-wrapper">
//                         <div className="add-business-form__about-card-block">
//                             {creditBlockVisible && 
//                             <>
//                                 <div className="edit-property-form__item">
//                                     <InputSumForm
//                                         valuta="₽" 
//                                         value={values.downPayment} 
//                                         error={errors.downPayment}
//                                         touched={touched.downPayment}
//                                         name="downPayment"
//                                         placeHolder="Первый взнос"
//                                         background="rgb(241, 242, 246)"    
//                                     />
//                                     <ErrorMessage name="downPayment" render={msg => <div className="edit-property-form__warning">{msg}</div>} />
//                                 </div>
//                                 <div className="edit-property-form__item">
//                                     <InputSumForm
//                                         valuta="₽" 
//                                         value={values.monthlyPayment} 
//                                         error={errors.monthlyPayment}
//                                         touched={touched.monthlyPayment}
//                                         name="monthlyPayment"
//                                         placeHolder="Ежемесячный платеж"
//                                         background="rgb(241, 242, 246)"    
//                                     />
//                                     <ErrorMessage name="monthlyPayment" render={msg => <div className="edit-property-form__warning">{msg}</div>} />
//                                 </div>
//                                 <div className="add-card-form-cash__item">
//                                     <InputDateForm
//                                         value={values.date} 
//                                         error={errors.date}
//                                         touched={touched.date}
//                                         name="date"
//                                         placeHolder="Дата первого платежа"  
//                                     />
//                                     <ErrorMessage name="date" render={msg => <div className="add-card-form-cash__warning">{msg}</div>} />
//                                 </div>
//                                 <div className="add-card-form-cash__item">
//                                     <InputSumForm
//                                         valuta="мес." 
//                                         value={values.loanTerms} 
//                                         error={errors.loanTerms}
//                                         touched={touched.loanTerms}
//                                         name="loanTerms"
//                                         placeHolder="Срок кредитования"
//                                         background="rgb(255, 255, 255)"    
//                                     />
//                                     <ErrorMessage name="loanTerms" render={msg => <div className="add-card-form-cash__warning">{msg}</div>} />
//                                 </div>
//                                 <div className="add-card-form-cash__item">
//                                     <InputPercentForm
//                                         value={values.percent} 
//                                         error={errors.percent}
//                                         touched={touched.percent}
//                                         name="percent"
//                                         placeHolder="Процентная ставка"
//                                         background="rgb(255, 255, 255)"    
//                                     />
//                                     <ErrorMessage name="percent" render={msg => <div className="add-business-form__warning">{msg}</div>} />
//                                 </div>
//                             </>
//                             } 
//                             <div className="edit-property-form__block-title">Аренда</div>
//                             <div className="edit-property-form__item">
//                                 <DropDownListForm
//                                     idContent='dropDownRentType'
//                                     idTitle='dropDownTitleRentType'
//                                     placeholder="Тип выплаты"
//                                     title={rentType}
//                                     // error={errorDropList.typeOfCommerce===''&&typeOfCommerce===''?true:false}
//                                     data= {rentTypeList}
//                                     onChange={setRentType}
//                                 />
//                             </div>
//                             <div className="add-card-form-cash__item">
//                                 <InputSumForm
//                                     valuta="₽" 
//                                     value={values.rentSum} 
//                                     error={errors.rentSum}
//                                     touched={touched.rentSum}
//                                     name="rentSum"
//                                     placeHolder="Стоимость аренды"
//                                     background="rgb(241, 242, 246)"    
//                                 />
//                                 <ErrorMessage name="rentSum" render={msg => <div className="add-card-form-cash__warning">{msg}</div>} />
//                             </div>
//                             <button type="button" className="edit-property-form__add-img-btn" onClick={openFileInput}>Добавить фото</button>
//                             <InputFileImages setImages={onSetImages}/>
//                             <div className="edit-property-form__images">
//                                 {images.map(el=>{
//                                     return (
//                                         <div className="edit-property-form-image" key={el.id}>
//                                             <button type="button" className="edit-property-form-image__remove-btn" onClick={()=>setImages(images.filter( img => el.id !== img.id ))}>&times;</button>
//                                             <img className="edit-property-form-image__img" src={el.img} />
//                                         </div>
//                                     )
//                                 })}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
                
//                 <div className="edit-property-form__btns">
//                     <Link to={`/assets/property/${id}`} className="cancel-btn edit-property-form__cancel-btn">Отменить</Link>
//                     <button className="edit-property-form__add-btn" type="submit">Подтвердить</button>
//                 </div>
//             </Form>
//        )}
//         </Formik>
//     )
// }
