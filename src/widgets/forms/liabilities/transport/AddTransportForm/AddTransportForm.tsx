import { useEffect, useState } from "react";
import "./addTransportForm.css";
import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { DropDownListForm } from "../../../elements/DropDownListForm/DropDownListForm";
import { IDropDownList } from "../../../../../app/types/elements/IDropDownList";
import { InputTextForm } from "../../../elements/InputTextForm/InputTextForm";
import { Link, useNavigate } from "react-router-dom";
import { InputSumForm } from "../../../elements/InputSumForm/InputSumForm";
import { useDispatch } from "react-redux";
import { InputPercentForm } from "../../../elements/InputPercentForm/InputPercentForm";
import { InputFileImages } from "../../../../../shared/ui/input/InputFileImages/InputFileImages"; 
import { IImage } from "../../../../../app/types/elements/IImage";
import { actionTypesLiabilities } from "../../../../../app/store/types/liabilitiesTypes";
import { ILiabilitiesTransport } from "../../../../../app/types/liabilities/ILiabilities";
import { addTransport } from "../../../../../app/store/actions/liabilities/liabilitiesActions";

const paymentTypeList: IDropDownList[] = [
    {
        id: 1,
        content: 'Наличные средства'
    },
    {
        id: 2,
        content: 'Кредит'
    }
]

const personList: IDropDownList[] = [ 
    {
        id: 1,
        content: 'Физическое лицо'
    },
    {
        id: 2,
        content: 'Юредическое лицо'
    }
]

const ownerCountList: IDropDownList[] = [ 
    {
        id: 1,
        content: 'Новый'
    },
    {
        id: 2,
        content: '1-3'
    },
    {
        id: 3,
        content: '4-6'
    },
    {
        id: 4,
        content: '7-9'
    },
    {
        id: 5,
        content: '10-12'
    },
    {
        id: 6,
        content: '13-15'
    },
    {
        id: 7,
        content: '16-18'
    },
    {
        id: 8,
        content: '19-21'
    }
]

import dataAuto from "../../../data/transport/transports.json"

export function AddTransportForm() {
    const [images, setImages] = useState<IImage[]>([])
    const loadBrandAuto = () => {
        let id = 0
        let brandListTmp: IDropDownList[] = []
        for(let el in dataAuto) {
            id++
            brandListTmp.push({id: id, content: dataAuto[`${el}`].name})
        }
        return brandListTmp
    }
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [brandList] = useState<IDropDownList[]>(loadBrandAuto()) //setBrandList
    const [modelList, setModelList] = useState<IDropDownList[]>([])
    const [yearList, setYearList] = useState<IDropDownList[]>([])
    const [brandType, setBrandType] = useState('')
    const [modelType, setModelType] = useState('')
    const [yearType, setYearType] = useState('')
    const [ownerType, setOwnerType] = useState('')
    const [personType, setPersonType] = useState('Физическое лицо')
    const [paymentType, setPaymentType] = useState('Наличные средства')
    const [errorDropList, setErrorDropList] = useState({
        brandType: '',
        modelType: '',
        yearType: '',
        ownerType: ''
    })
    const [wasCheckError, setWasCheckError] = useState(false)

    useEffect(()=>{
        let newYearList: IDropDownList[] = []
        let id = 1
        for(let i=new Date().getFullYear(); i>=1900; i--) {
            newYearList.push({id: id, content: String(i)})
            id++
        }
        console.log(newYearList)
        setYearList(newYearList)
    }, [])

    const validationSchema = () => {
        if(paymentType==='Наличные средства') {
            return yup.object().shape({
                // vin: yup.string().required('Обязательное поле для заполнения').min(17, `Длина vin-номера должна быть 17 знаков`).max(17, `Длина vin-номера должна быть 17 знаков`),
                use: yup.string().required('Обязательное поле для заполнения').max(30, `Допустимая длина превышает 30 символов`),
                // owner: yup.string().required('Обязательное поле для заполнения').max(30, `Допустимая длина превышает 30 символов`),
                sum: yup.string().required('Обязательное поле для заполнения').max(12, 'Допустимая длина превышена').lengthNumbersValidator('Не равно 0'),
            }) 
        } else {
            return yup.object().shape({
                // vin: yup.string().required('Обязательное поле для заполнения').min(17, `Длина vin-номера должна быть 17 знаков`).max(17, `Длина vin-номера должна быть 17 знаков`),
                use: yup.string().required('Обязательное поле для заполнения').max(30, `Допустимая длина превышает 30 символов`),
                // owner: yup.string().required('Обязательное поле для заполнения').max(30, `Допустимая длина превышает 30 символов`),
                sum: yup.string().required('Обязательное поле для заполнения').max(12, 'Допустимая длина превышена').lengthNumbersValidator('Не равно 0'),
                
                downPayment: yup.string().required('Обязательное поле для заполнения').max(12, 'Допустимая длина превышена'),
                loanTerms: yup.string().required('Обязательное поле для заполнения').lengthMonthsValidator(500, 'Максимальное количество 500'),
            }) 
        }            
    }

    const onSetImages = (img: IImage[]|[]) => {
        if(img.length!==0) {
            setImages(img)
        }
    }

    const openFileInput = ()=> {
        (document.querySelector('#input-file') as HTMLInputElement).click();
    }

    const checkError = () => {
        setWasCheckError(true)
        let newErrorList = {
            brandType: '',
            modelType: '',
            yearType: '',
            ownerType: ''
        }
        if(brandType!=='') {
            newErrorList.brandType = ''
        } else {
            newErrorList.brandType = 'Обязательное поле для заполнения'
        }
        if(modelType!=='') {
            newErrorList.modelType = ''
        } else {
            newErrorList.modelType = 'Обязательное поле для заполнения'
        }
        if(yearType!=='') {
            newErrorList.yearType = ''
        } else {
            newErrorList.yearType = 'Обязательное поле для заполнения'
        }
        if(ownerType!=='') {
            newErrorList.ownerType = ''
        } else {
            newErrorList.ownerType = 'Обязательное поле для заполнения'
        }
        setErrorDropList(newErrorList)
    }

    return (
        <Formik
            validationSchema = {validationSchema}
            initialValues={
                {
                    // vin: '',
                    use: '',

                    // owner: '',

                    sum: '',

                    downPayment: '',
                    loanTerms: '',
                    percent: '0.0',
                    
                } 
            }
            onSubmit={values => {
                if(errorDropList.brandType==='' && errorDropList.modelType==='') {
                    const transport: ILiabilitiesTransport = {
                        mark: brandType,
                        model: modelType,
                        bought_price: Number(values.sum.replace(/ /g, '')),
                        month_expense: 0,
                        owner_type: personType === 'Физическое лицо' ? true : false,

                        loan: paymentType === 'Кредит' ? true : false,

                        average_market_price: 0,
                        min_market_price: 0,
                        max_market_price: 0,
                        images: [],
                        expenses: [],
                        total_expense: 0,
                        initial_payment: paymentType === 'Кредит' ? Number(values.downPayment.replace(/ /g, '')) : 0,
                        loan_term: paymentType === 'Кредит' ? Number(values.loanTerms.replace(/ /g, '')) : 0,
                        percentage: paymentType === 'Кредит' ? Number(values.percent.replace(/ /g, '')) : 0,
                        month_payment: 0,
                        use: values.use,
                        year: yearType,
                        owner_count: ownerType,
                        // vin: values.vin,
                        // owner: values.owner,
                        average_consumption: 0,
                        owner: "",
                        vin: ""
                    }
                    const res = addTransport(actionTypesLiabilities.ADD_TRANSPORT_LIABILITIES, transport)
                    res.then(e => {
                        dispatch(e!);
                        navigate('/liabilities/transport')
                    })
                    .catch((e) => {
                        console.log(e)
                    })
                }
                
            }}
        >
            {({ errors, touched, values }) => ( 
            <Form className="add-transport-form">
                <div className="add-transport-form__content">
                    <div className="add-transport-form__characteristic-block-wrapper">
                        <div className="add-transport-form__characteristic-block"> 
                            <div className="add-transport-form__item">
                                <DropDownListForm
                                    idContent='dropDownBrandType'
                                    idTitle='dropDownTitleBrandType'
                                    placeholder="Марка транспорта"
                                    title={brandType}
                                    checkError={wasCheckError}
                                    data= {brandList}
                                    searchInput={true}
                                    onChange={(title: string)=>{
                                        setBrandType(title)
                                        setModelType('')
                                        let id = 0
                                        setModelList(dataAuto[`${title}`].models.map((el: any)=>{
                                            id++
                                            return {id: id, content: el}
                                        }))
                                    }}
                                />
                            </div>  
                            <div className="add-transport-form__item">
                                <DropDownListForm
                                    idContent='dropDownModelType'
                                    idTitle='dropDownTitleModelType'
                                    placeholder="Модель транспорта"
                                    title={modelType}
                                    searchInput={true}
                                    checkError={wasCheckError}
                                    data= {modelList}
                                    onChange={(title: string)=>{
                                        setModelType(title)
                                    }}
                                />
                            </div>
                            <div className="add-transport-form__block-title">Информация о транспорте</div>                           
                            {/* <div className="add-transport-form__item">
                                <InputTextForm
                                    value={values.vin}
                                    error={errors.vin}
                                    touched={touched.vin}
                                    placeHolder="VIN-номер"
                                    name="vin"
                                />
                                <ErrorMessage name="vin" render={msg => <div className="add-transport-form__warning">{msg}</div>} />
                            </div> */}
                            <div className="add-transport-form__item">
                                <DropDownListForm
                                    idContent='dropDownYearType'
                                    idTitle='dropDownTitleYearType'
                                    placeholder="Год выпуска"
                                    title={yearType}
                                    searchInput={true}
                                    checkError={wasCheckError}
                                    data= {yearList}
                                    onChange={(title: string)=>{
                                        setYearType(title)
                                    }}
                                />
                            </div>
                            <div className="add-transport-form__item">
                                <InputTextForm
                                    value={values.use}
                                    error={errors.use}
                                    touched={touched.use}
                                    placeHolder="Назначение"
                                    name="use"
                                />
                                <ErrorMessage name="use" render={msg => <div className="add-transport-form__warning">{msg}</div>} />
                            </div>
                            <button type="button" className="add-valuables-form__add-img-btn" onClick={openFileInput}>Добавить фото</button>
                            <InputFileImages setImages={onSetImages}/>
                            <div className="add-valuables-form__images">
                                {images.map(el=>{
                                    return (
                                        <div className="add-valuables-form-image" key={el.id}>
                                            <button type="button" className="add-valuables-form-image__remove-btn" onClick={()=>setImages(images.filter( img => el.id !== img.id ))}>&times;</button>
                                            <img className="add-valuables-form-image__img" src={el.img} />
                                        </div>
                                    )
                                })}
                            </div>                            
                        </div> 
                    </div>
                    <div className="add-transport-form__about-card-block-wrapper">
                        <div className="add-business-form__about-card-block">
                            <div className="add-transport-form__block-title">Информация о владельце</div>
                            {/* <div className="add-transport-form__item">
                                <InputTextForm
                                    value={values.owner}
                                    error={errors.owner}
                                    touched={touched.owner}
                                    placeHolder="Владелец по ПТС"
                                    name="owner"
                                />
                                <ErrorMessage name="owner" render={msg => <div className="add-transport-form__warning">{msg}</div>} />
                            </div> */}
                            <div className="add-transport-form__item">
                                <DropDownListForm
                                    idContent='dropDownOwnerType'
                                    idTitle='dropDownTitleOwnerType'
                                    placeholder="Количество владельцев"
                                    title={ownerType}
                                    checkError={wasCheckError}
                                    data= {ownerCountList}
                                    onChange={(title: string)=>{
                                        setOwnerType(title)
                                    }}
                                />
                            </div>
                            <div className="add-transport-form__item">
                                <DropDownListForm
                                    idContent='dropDownPersonType'
                                    idTitle='dropDownTitlePersonType'
                                    placeholder="Тип собственности"
                                    title={personType}
                                    // error={errorDropList.typeOfCommerce===''&&typeOfCommerce===''?true:false}
                                    data= {personList}
                                    onChange={(title: string)=>{
                                        setPersonType(title)
                                    }}
                                />
                            </div>
                            <div className="add-transport-form__block-title">Цена покупки</div>
                            <div className="add-transport-form__item">
                                <InputSumForm
                                    valuta="₽" 
                                    value={values.sum} 
                                    error={errors.sum}
                                    touched={touched.sum}
                                    name="sum"
                                    placeHolder="Цена транспорта"
                                    background="rgb(241, 242, 246)"    
                                />
                                <ErrorMessage name="sum" render={msg => <div className="add-transport-form__warning">{msg}</div>} />
                            </div>
                            <div className="add-transport-form__item">
                                <DropDownListForm
                                    idContent='dropDownPaymentType'
                                    idTitle='dropDownTitlePaymentType'
                                    placeholder="Тип выплаты"
                                    title={paymentType}
                                    // error={errorDropList.typeOfCommerce===''&&typeOfCommerce===''?true:false}
                                    data= {paymentTypeList}
                                    onChange={(title: string)=>{
                                        setPaymentType(title)
                                    }}
                                />
                            </div>
                            {paymentType==="Кредит" && 
                            <>
                                <div className="add-transport-form__item">
                                    <InputSumForm
                                        valuta="₽" 
                                        value={values.downPayment} 
                                        error={errors.downPayment}
                                        touched={touched.downPayment}
                                        name="downPayment"
                                        placeHolder="Первый взнос"
                                        background="rgb(241, 242, 246)"    
                                    />
                                    <ErrorMessage name="downPayment" render={msg => <div className="add-transport-form__warning">{msg}</div>} />
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
                                        value={values.percent} 
                                        error={errors.percent}
                                        touched={touched.percent}
                                        name="percent"
                                        placeHolder="Процентная ставка"
                                        background="rgb(241, 242, 246)"    
                                    />
                                    <ErrorMessage name="percent" render={msg => <div className="add-business-form__warning">{msg}</div>} />
                                </div>
                            </>
                            }
                        </div>
                    </div>
                </div>
                
                <div className="add-transport-form__btns">
                    <Link to="/assets/transport" className="cancel-btn add-transport-form__cancel-btn">Отменить</Link>
                    <button className="add-transport-form__add-btn" type="submit"onClick={checkError}>Подтвердить</button>
                </div>
            </Form>
       )}
        </Formik>
    )
}
