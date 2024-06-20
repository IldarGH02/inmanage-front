import React, { useState } from "react";
import "./addPropertyForm.css";
import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { DropDownListForm } from "../../../elements/DropDownListForm/DropDownListForm";
import { IDropDownList } from "../../../../../app/types/elements/IDropDownList";
import { InputTextForm } from "../../../elements/InputTextForm/InputTextForm";
import { Link, useNavigate } from "react-router-dom";
import { InputSumForm } from "../../../elements/InputSumForm/InputSumForm";
import { InputDateForm } from "../../../elements/InputDateForm/InputDateForm";
import { IAssetsProperty } from "../../../../../app/types/assets/IAssets";
import { useDispatch } from "react-redux";
import { addProperty, hideLoader } from "../../../../../app/store/actions/assets/assetsActions";
import { actionTypes } from "../../../../../app/store/types/types";
import { InputPercentForm } from "../../../elements/InputPercentForm/InputPercentForm";
import { InputFileImages } from "../../../../../shared/ui/input/InputFileImages/InputFileImages"; 
import { IImage } from "../../../../../app/types/elements/IImage";

const paymentTypeList: IDropDownList[] = [
    {
        id: 1,
        content: 'Наличный расчет'
    },
    {
        id: 2,
        content: 'Ипотека / кредит'
    }
]

const rentTypeList: IDropDownList[] = [
    {
        id: 1,
        content: 'Долгосрочная'
    },
    {
        id: 2,
        content: 'Посуточная'
    }
]

export function AddPropertyForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [paymentType, setPaymentType] = useState('Наличный расчет')
    const [rentType, setRentType] = useState('Долгосрочная')
    const [creditBlockVisible, setCreditBlockVisible] = useState(false)
    const [images, setImages] = useState<IImage[]>([])

    const onSetImages = (img: IImage[]|[]) => {
        // let newImg: IImage[] = []
        // if(img.length!==0) {
        //     let maxId = 0
        //     for(let i=0; i<images.length; i++) {
        //         if(images[i].id>maxId) {
        //             maxId=images[i].id
        //         }
        //     }
        //     newImg = img.map(el=>{
        //         el.id = maxId++
        //         return el
        //     })
        //     setImages(prev=>[...prev, ...newImg])
        // }
        if(img.length!==0) {
            setImages(img)
        }
    }

    const openFileInput = ()=> {
        (document.querySelector('#input-file') as HTMLInputElement).click();
    }

    const validationSchema = () => {
        if(paymentType==='Наличный расчет') {
            return yup.object().shape({
                address: yup.string().required('Обязательное поле для заполнения').max(30, `Допустимая длина превышает 30 символов`),
                owner: yup.string().required('Обязательное поле для заполнения').max(50, `Допустимая длина превышает 50 символов`),
                name: yup.string().required('Обязательное поле для заполнения').max(30, `Допустимая длина превышает 30 символов`),
                propertyValue: yup.string().required('Обязательное поле для заполнения').max(12, 'Допустимая длина превышена').lengthNumbersValidator('Не равно 0'),
                rentSum: yup.string().required('Обязательное поле для заполнения').max(12, 'Допустимая длина превышена').lengthNumbersValidator('Не равно 0')
            }) 
        } else {
            return yup.object().shape({
                address: yup.string().required('Обязательное поле для заполнения').max(30, `Допустимая длина превышает 30 символов`),
                owner: yup.string().required('Обязательное поле для заполнения').max(30, `Допустимая длина превышает 30 символов`),
                name: yup.string().required('Обязательное поле для заполнения').max(30, `Допустимая длина превышает 30 символов`),
                propertyValue: yup.string().required('Обязательное поле для заполнения').max(12, 'Допустимая длина превышена').lengthNumbersValidator('Не равно 0'),
                downPayment: yup.string().required('Обязательное поле для заполнения').max(12, 'Допустимая длина превышена'),
                monthlyPayment: yup.string().required('Обязательное поле для заполнения').max(12, 'Допустимая длина превышена').lengthNumbersValidator('Не равно 0'),
                date: yup.date().required('Обязательное поле для заполнения').min(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()), 'Дата должна быть не позднее сегодняшнего дня'),
                loanTerms: yup.string().required('Обязательное поле для заполнения').lengthMonthsValidator(500, 'Максимальное количество 500'),
                percent: yup.string().required('Обязательное поле для заполнения'),
                rentSum: yup.string().required('Обязательное поле для заполнения').max(12, 'Допустимая длина превышена'),
            }) 
        }            
    }

    return (
        <Formik
            validationSchema = {validationSchema}
            initialValues={
                {
                    name: '',
                    address: '',
                    owner: '',

                    propertyValue: '',

                    downPayment: '',
                    monthlyPayment: '',
                    date: new Date(),
                    loanTerms: '',
                    percent: '0.0',

                    rentSum: ''
                } 
            }
            onSubmit={values => {
                let property: IAssetsProperty = {
                    name: values.name,
                    // address: '',
                    bought_price: Number(values.propertyValue.replace(/ /g, '')),
                    actual_price: 0,
                    revenue: 0,
                    equipment_price: 0,
                    month_income: 0,
                    month_expense: 0,
                    average_profit: 0,
                    rent_type: rentType,
                    rent_price: Number(values.rentSum.replace(/ /g, '')),
                    loan: false,
                    // equipment: [],
                    income: [],
                    expenses: [],
                    total_income: 0,
                    total_expense: 0,
                    initial_payment: null,
                    loan_term: null,
                    percentage: 0,
                    month_payment: null,
                    owner: values.owner
                }
                if(paymentType==='Ипотека / кредит') {
                    property.percentage = Number(values.percent.replace(/ /g,''))
                    property.loan = true
                    property.month_payment = Number(values.monthlyPayment.replace(/ /g,''))
                    property.loan_term = Number(values.loanTerms.replace(/ /g,''))
                    property.initial_payment = Number(values.downPayment.replace(/ /g,''))
                }
                const res = addProperty(actionTypes.ADD_PROPERTY, property)
                res.then(e => {
                    dispatch(e!);
                    navigate("/assets/property")
                })
                .catch((e) => {
                    dispatch(hideLoader(actionTypes.HIDE_LOADER))
                    console.log(e)
                })
            }}
        >
            {({ errors, touched, values }) => ( 
            <Form className="add-property-form">
                <div className="add-property-form__content">
                    <div className="add-property-form__characteristic-block-wrapper">
                        <div className="add-property-form__characteristic-block">                              
                            <div className="add-property-form__item">
                                <InputTextForm
                                    value={values.name}
                                    error={errors.name}
                                    touched={touched.name}
                                    placeHolder="Название недвижимости"
                                    name="name"
                                />
                                <ErrorMessage name="name" render={msg => <div className="add-property-form__warning">{msg}</div>} />
                            </div>
                            <div className="add-property-form__item">
                                <InputTextForm
                                    value={values.address}
                                    error={errors.address}
                                    touched={touched.address}
                                    placeHolder="Адрес"
                                    name="address"
                                />
                                <ErrorMessage name="address" render={msg => <div className="add-property-form__warning">{msg}</div>} />
                            </div>
                            <div className="add-property-form__item">
                                <InputTextForm
                                    value={values.owner}
                                    error={errors.owner}
                                    touched={touched.owner}
                                    placeHolder="Владелец"
                                    name="owner"
                                />
                                <ErrorMessage name="owner" render={msg => <div className="add-property-form__warning">{msg}</div>} />
                            </div>
                            <div className="add-property-form__block-title">Цена покупки</div>
                            <div className="add-property-form__item">
                                <InputSumForm
                                    valuta="₽" 
                                    value={values.propertyValue} 
                                    error={errors.propertyValue}
                                    touched={touched.propertyValue}
                                    name="propertyValue"
                                    placeHolder="Стоимость недвижимости"
                                    background="rgb(241, 242, 246)"    
                                />
                                <ErrorMessage name="propertyValue" render={msg => <div className="add-property-form__warning">{msg}</div>} />
                            </div>
                            <div className="add-property-form__item">
                                <DropDownListForm
                                    idContent='dropDownPaymentType'
                                    idTitle='dropDownTitlePaymentType'
                                    placeholder="Тип выплаты"
                                    title={paymentType}
                                    // error={errorDropList.typeOfCommerce===''&&typeOfCommerce===''?true:false}
                                    data= {paymentTypeList}
                                    onChange={(title: string)=>{
                                        setPaymentType(title)
                                        if(title==="Наличный расчет") {
                                            setCreditBlockVisible(false)
                                        } else {
                                            setCreditBlockVisible(true)
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="add-property-form__about-card-block-wrapper">
                        <div className="add-business-form__about-card-block">
                            {creditBlockVisible && 
                            <>
                                <div className="add-property-form__item">
                                    <InputSumForm
                                        valuta="₽" 
                                        value={values.downPayment} 
                                        error={errors.downPayment}
                                        touched={touched.downPayment}
                                        name="downPayment"
                                        placeHolder="Первый взнос"
                                        background="rgb(241, 242, 246)"    
                                    />
                                    <ErrorMessage name="downPayment" render={msg => <div className="add-property-form__warning">{msg}</div>} />
                                </div>
                                <div className="add-property-form__item">
                                    <InputSumForm
                                        valuta="₽" 
                                        value={values.monthlyPayment} 
                                        error={errors.monthlyPayment}
                                        touched={touched.monthlyPayment}
                                        name="monthlyPayment"
                                        placeHolder="Ежемесячный платеж"
                                        background="rgb(241, 242, 246)"    
                                    />
                                    <ErrorMessage name="monthlyPayment" render={msg => <div className="add-property-form__warning">{msg}</div>} />
                                </div>
                                <div className="add-card-form-cash__item">
                                    <InputDateForm
                                        value={values.date} 
                                        error={errors.date}
                                        touched={touched.date}
                                        name="date"
                                        placeHolder="Дата первого платежа"  
                                    />
                                    <ErrorMessage name="date" render={msg => <div className="add-card-form-cash__warning">{msg}</div>} />
                                </div>
                                <div className="add-card-form-cash__item">
                                    <InputSumForm
                                        valuta="мес." 
                                        value={values.loanTerms} 
                                        error={errors.loanTerms}
                                        touched={touched.loanTerms}
                                        name="loanTerms"
                                        placeHolder="Срок кредитования"
                                        background="rgb(255, 255, 255)"    
                                    />
                                    <ErrorMessage name="loanTerms" render={msg => <div className="add-card-form-cash__warning">{msg}</div>} />
                                </div>
                                <div className="add-card-form-cash__item">
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
                            </>
                            } 
                            <div className="add-property-form__block-title">Аренда</div>
                            <div className="add-property-form__item">
                                <DropDownListForm
                                    idContent='dropDownRentType'
                                    idTitle='dropDownTitleRentType'
                                    placeholder="Тип выплаты"
                                    title={rentType}
                                    // error={errorDropList.typeOfCommerce===''&&typeOfCommerce===''?true:false}
                                    data= {rentTypeList}
                                    onChange={setRentType}
                                />
                            </div>
                            <div className="add-card-form-cash__item">
                                <InputSumForm
                                    valuta="₽" 
                                    value={values.rentSum} 
                                    error={errors.rentSum}
                                    touched={touched.rentSum}
                                    name="rentSum"
                                    placeHolder="Стоимость аренды"
                                    background="rgb(241, 242, 246)"    
                                />
                                <ErrorMessage name="rentSum" render={msg => <div className="add-card-form-cash__warning">{msg}</div>} />
                            </div>
                            <button type="button" className="add-property-form__add-img-btn" onClick={openFileInput}>Добавить фото</button>
                            <InputFileImages setImages={onSetImages}/>
                            <div className="add-property-form__images">
                                {images.map(el=>{
                                    return (
                                        <div className="add-property-form-image" key={el.id}>
                                            <button type="button" className="add-property-form-image__remove-btn" onClick={()=>setImages(images.filter( img => el.id !== img.id ))}>&times;</button>
                                            <img className="add-property-form-image__img" src={el.img} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="add-property-form__btns">
                    <Link to="/assets/property" className="cancel-btn add-property-form__cancel-btn">Отменить</Link>
                    <button className="add-property-form__add-btn" type="submit" onClick={()=>console.log(values)}>Подтвердить</button>
                </div>
            </Form>
       )}
        </Formik>
    )
}
