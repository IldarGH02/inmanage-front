import React, { useState } from "react";
import "./addSecuritiesForm.css";
import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { DropDownListForm } from "../../../elements/DropDownListForm/DropDownListForm";
import { IDropDownList } from "../../../../../app/types/elements/IDropDownList";
import { Link, useNavigate } from "react-router-dom";
import { InputSumForm } from "../../../elements/InputSumForm/InputSumForm";
import { HistoryOperationList } from "../../../elements/HistoryOperationList/HistoryOperationList";
import { useDispatch } from "react-redux";
import { IAssetsSecurities } from "../../../../../app/types/assets/securities/ISecurities";
import { addSecurities } from "../../../../../app/store/actions/assets/assetsActions";
import { actionTypes } from "../../../../../app/store/types/types";

const nameList: IDropDownList[] = [
    {
        id: 1,
        content: 'TCS Group'
    },
    {
        id: 2,
        content: 'Сбер Банк'
    }
]

const brokerList: IDropDownList[] = [
    {
        id: 1,
        content: 'Тинькофф'
    },
    {
        id: 2,
        content: 'Альфабанк'
    }
]

const deposit = [
    {
        id: 1,
        title: 'title 1',
        date: new Date(2023, 10, 1, 11, 53),
        // sum: 5000
    },
    {
        id: 2,
        title: 'title 2',
        date: new Date(2023, 10, 1, 11, 53),
        sum: 5000
    },
    {
        id: 3,
        title: 'title 3',
        date: new Date(2023, 10, 1, 11, 53),
        sum: -5000
    },
    {
        id: 4,
        title: 'title 2',
        date: new Date(2023, 10, 1, 11, 53),
        sum: 5000
    },
    {
        id: 5,
        title: 'title 3',
        date: new Date(2023, 10, 1, 11, 53),
        sum: -5000
    },
    {
        id: 6,
        title: 'title 2',
        date: new Date(2023, 10, 1, 11, 53),
        sum: 5000
    },
    {
        id: 7,
        title: 'title 3',
        date: new Date(2023, 10, 1, 11, 53),
        sum: -5000
    },
    {
        id: 8,
        title: 'title 2',
        date: new Date(2023, 10, 1, 11, 53),
        sum: 5000
    },
    {
        id: 9,
        title: 'title 3',
        date: new Date(2023, 10, 1, 11, 53),
        sum: -5000
    },
]

export function AddSecuritiesForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [visibleHistory, setVisibleHistory] = useState(true)
    const [broker, setBroker] = useState('')
    const [name, setName] = useState('')
    const [errorDropList, setErrorDropList] = useState({
        errorBroker: '',
        errorName: ''
    }) 
    const [wasCheckError, setWasCheckError] = useState(false)

    const validationSchema = () => {
        return yup.object().shape({
            // name: yup.string().required('Обязательное поле для заполнения').max(30, `Допустимая длина превышает 30 символов`),
            purchasePrice: yup.string().required('Обязательное поле для заполнения').max(12, 'Допустимая длина превышена').lengthNumbersValidator('Не равно 0'),
            marketPrice: yup.string().required('Обязательное поле для заполнения').max(12, 'Допустимая длина превышена').lengthNumbersValidator('Не равно 0'),
            amount: yup.string().required('Обязательное поле для заполнения').max(10, 'Допустимая длина превышена').lengthNumbersValidator('Не равно 0'),
        })            
    }

    const checkError = () => {
        setWasCheckError(true)
        let newErrorList = {
            errorBroker: '',
            errorName: ''
        }
        if(broker!=='') {
            newErrorList.errorBroker = ''
        } else {
            newErrorList.errorBroker = 'Обязательное поле для заполнения'
        }
        if(name!=='') {
            newErrorList.errorName = ''
        } else {
            newErrorList.errorName = 'Обязательное поле для заполнения'
        }
        setErrorDropList(newErrorList)
    }

    return (
        <Formik
            validationSchema = {validationSchema}
            initialValues={
                {
                    // name: '',
                    purchasePrice: '',
                    marketPrice: '',
                    amount: ''
                    
                } //as Step1Form
            }
            onSubmit={values => {
                if(errorDropList.errorName==='' && errorDropList.errorBroker==='') {
                    const securitiesForDB: IAssetsSecurities = {
                        name: name,
                        broker: broker,
                        cost: Number(values.purchasePrice.replace(/ /g,'')),
                        market_price: Number(values.marketPrice.replace(/ /g,'')),
                        count: Number(values.amount.replace(/ /g,'')),
                    }
                    const res = addSecurities(actionTypes.ADD_SECURITIES, securitiesForDB)
                    res.then(e => {
                        dispatch(e!);
                        navigate("/assets/securities")
                    })
                    .catch((e) => {
                        console.log(e)
                    })
                }
                
            }}
        >
            {({ errors, touched, values }) => ( 
            <Form className="add-securities-form">
                <div className="add-securities-form__content">
                    <div className="add-securities-form__characteristic-block" style={{width: `${visibleHistory?'':'100%'}`}}>
                        <div className="add-securities-form__characteristic-title">Ценные бумаги</div>
                        <div className="add-securities-form__characteristic-block-wrapper">
                            <div className="add-securities-form__characteristic-block-content">                              
                                {/* <div className="add-securities-form__item">
                                    <InputTextForm
                                        value={values.name}
                                        error={errors.name}
                                        touched={touched.name}
                                        placeHolder="Наименование"
                                        name="name"
                                    />
                                    <ErrorMessage name="name" render={msg => <div className="add-securities-form__warning">{msg}</div>} />
                                </div> */}
                                <div className="add-securities-form__item">
                                    <DropDownListForm
                                        idContent='dropDownTypeName'
                                        idTitle='dropDownTitleTypeName'
                                        placeholder="Нименование"
                                        title={name}
                                        checkError={wasCheckError}
                                        searchInput={true}
                                        data= {nameList}
                                        onChange={setName}
                                    />
                                </div>
                                <div className="add-securities-form__item">
                                    <DropDownListForm
                                        idContent='dropDownTypeOfBroker'
                                        idTitle='dropDownTitleTypeOfBroker'
                                        placeholder="Брокер"
                                        title={broker}
                                        checkError={wasCheckError}
                                        searchInput={true}
                                        data= {brokerList}
                                        onChange={setBroker}
                                    />
                                </div>
                                <div className="add-securities-form__item">
                                    <InputSumForm
                                        valuta="₽" 
                                        value={values.purchasePrice} 
                                        error={errors.purchasePrice}
                                        touched={touched.purchasePrice}
                                        name="purchasePrice"
                                        placeHolder="Цена покупки"
                                        background="rgb(241, 242, 246)"    
                                    />
                                    <ErrorMessage name="purchasePrice" render={msg => <div className="add-securities-form__warning">{msg}</div>} />
                                </div>
                                <div className="add-securities-form__item">
                                    <InputSumForm
                                        valuta="₽" 
                                        value={values.marketPrice} 
                                        error={errors.marketPrice}
                                        touched={touched.marketPrice}
                                        name="marketPrice"
                                        placeHolder="Цена на рынке"
                                        background="rgb(241, 242, 246)"    
                                    />
                                    <ErrorMessage name="marketPrice" render={msg => <div className="add-securities-form__warning">{msg}</div>} />
                                </div>
                                <div className="add-securities-form__item">
                                    <InputSumForm
                                        valuta="" 
                                        value={values.amount} 
                                        error={errors.amount}
                                        touched={touched.amount}
                                        name="amount"
                                        placeHolder="Количество (шт.)"
                                        background="rgb(241, 242, 246)"    
                                    />
                                    <ErrorMessage name="amount" render={msg => <div className="add-securities-form__warning">{msg}</div>} />
                                </div>
                                <button type="button" className="add-securities-form__hide-history-btn" onClick={()=>setVisibleHistory(!visibleHistory)}>{`${visibleHistory?'Cкрыть':'Показать'}`} историю</button>
                            </div>
                        </div>
                    </div>
                    {visibleHistory && 
                        <div className="add-securities-form__history-block">
                            <div className="add-securities-form__history-title">История операций</div>
                            <div className="add-securities-form__history-block-wrapper">
                                <div className="add-securities-form__history-block-content">
                                    <HistoryOperationList data={deposit}/>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className="add-securities-form__btns">
                    <Link to="/assets/securities" className="cancel-btn add-securities-form__cancel-btn">Отменить</Link>
                    <button className="add-securities-form__add-btn" type="submit" onClick={()=>{
                        // console.log(values)
                        checkError()
                    }}>Подтвердить</button>
                </div>
            </Form>
       )}
        </Formik>
    )
}
