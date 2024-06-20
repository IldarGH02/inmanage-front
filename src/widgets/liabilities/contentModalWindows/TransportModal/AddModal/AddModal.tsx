import React, { useContext, useEffect, useState } from "react";
import { ILiabilitiesTransport } from "../../../../../app/types/liabilities/transport/ITransport";
import { IStep, Status } from "../../../../../app/types/steps";
import { AlertContext } from "../../../../../features/context/alert/AlertContext";
import { AddModalContext } from "../../../../../features/context/assets/property/addModal/AddModalContext";
import { ModalContext } from "../../../../../features/context/modalProperty/ModalContext";
import { steps } from "../../../../modalWindow/steps/data/assetsTransportData";
import Steps from "../../../../modalWindow/steps/Steps";
import "./addModal.css"
import { LiabilitiesAutoInfo } from "./AssetsInfoModalTransport/AssetsAutoInfo/LiabilitiesAutoInfo";
import { LiabilitiesOwnerInfo } from "./AssetsInfoModalTransport/AssetsOwnerInfo/LiabilitiesOwnerInfo";
import { LiabilitiesPriceInfo } from "./AssetsInfoModalTransport/LiabilitiesPriceInfo/LiabilitiesPriceInfo";

interface IContext {
    stepsArr: IStep[],
    dataArr: ILiabilitiesTransport,
    nextStep: () => void,
    earlierStep: () => void, 
    clearSteps: () => void
}

interface IAddModal {
    onAddPropertyItem: (newItem:ILiabilitiesTransport)=>void
}

// const arr = [
//     {id: 1, content:'HTML'},
//     {id: 2, content:'CSS'},
//     {id: 3, content:'JS'},
//     {id: 4, content:'TS'},
//     {id: 5, content:'SQL'},
//     {id: 6, content:'HTML'},
//     {id: 7, content:'CSS'},
//     {id: 8, content:'JS'},
//     {id: 9, content:'TS'},
//     {id: 10, content:'SQL'},
//     {id: 11, content:'HTML'},
//     {id: 12, content:'CSS'},
//     {id: 13, content:'JS'},
//     {id: 14, content:'TS'},
//     {id: 15, content:'SQL'}, 
// ]

export function AddModal({onAddPropertyItem}:IAddModal) {
    const [indexContentArr, setIndexContentArr] = useState(0)
    const {showAlert, hideAlert} = useContext(AlertContext)
    const {hide} = useContext(ModalContext)
    const [visibleBtnAdd, setVisibleBtnAdd] = useState(false)
    const { dataArr, stepsArr, nextStep, earlierStep, clearSteps } = useContext(AddModalContext) as IContext
    const contentArr = [<LiabilitiesAutoInfo/>, <LiabilitiesOwnerInfo/>, <LiabilitiesPriceInfo/>]
    
    useEffect(()=>{
        clearSteps()
        hideAlert()
    },[])

    const addItem = () => {
        let flag = false
        if(dataArr.bought_price !== 0) {
            flag = true
        } // !dataArr.credit_indicator && 
        else if(dataArr.bought_price !== 0 && dataArr.initial_payment !== 0 && dataArr.loan_term !== 0 && dataArr.percentage !== -1 ) {
                flag = true
        }
        else {
            showAlert('Не все поля заполнены корректно! Пожалуйста, заполните их.', 'Error')
        }
        if(flag) {
            let newData: ILiabilitiesTransport = {
                // id: Number(new Date),
                user_id: dataArr.user_id,
                owner: dataArr.owner,
                vin: dataArr.vin,
                use: dataArr.use,
                month_expense: 0,
                // credit_indicator: dataArr.credit_indicator,
                // initial_payment: dataArr.credit_indicator === false ? 0 : dataArr.initial_payment,
                // loan_term: dataArr.credit_indicator === false ? 0 : dataArr.loan_term,
                // percentage: dataArr.credit_indicator === false ? 0 : dataArr.percentage,
                // month_payment: dataArr.credit_indicator === false ? 0 : dataArr.month_payment,
                // loan_term: dataArr.loan_term,
                // month_payment: dataArr.month_payment,
                // brand: dataArr.brand,
                bought_price: dataArr.bought_price,
                // name: 'dataArr.name',
                owner_type: dataArr.owner_type,
                average_consumption: 0,
                mark: "",
                model: "",
                loan: false,
                average_market_price: 0,
                min_market_price: 0,
                max_market_price: 0,
                images: [],
                expenses: [],
                total_expense: 0,
                initial_payment: 0,
                loan_term: 0,
                percentage: 0,
                month_payment: 0
            }
            onAddPropertyItem(newData)
            hide()
            // dataArr.brand = ''
            // dataArr.credit_indicator = false 
            // dataArr.name = ''
            // dataArr.brand = ''
            dataArr.vin = ''
            dataArr.owner = ''
            dataArr.bought_price = 0
            dataArr.loan_term = 0
            dataArr.month_payment = 0
            dataArr.use = ''
            dataArr.owner_type = false
            dataArr.initial_payment = 0
            stepsArr[1].status = Status.active
            for(let i=2; i<steps.length; i++) {
                stepsArr[i].status = Status.inactive
            }
            hideAlert()
        }
        
    } 

    const nextSt = (index:number) => {
        var flag = false
        switch (index) {
            case 0: {
                if(dataArr.vin !== '' && dataArr.use !== '' ) {
                    flag = true
                } //&& dataArr.name !== '' && dataArr.brand !== ''
                else {
                    showAlert('Не все поля заполнены корректно! Пожалуйста, заполните их.', 'Error')
                }
                break
            }
            case 1: {
                if(dataArr.owner!=='') {
                    flag = true
                }
                else {
                    showAlert('Не все поля заполнены корректно! Пожалуйста, заполните их.', 'Error')
                }
                break
            }
            case 2: {
                if(dataArr.bought_price !== 0) {
                    flag = true
                } //!dataArr.credit_indicator && 
                else if(dataArr.bought_price !== 0 && dataArr.loan_term !== 0 && dataArr.month_payment !== 0) {
                    flag = true
                }
                else {
                    showAlert('Не все поля заполнены корректно! Пожалуйста, заполните их.', 'Error')
                }
                break
            }       
            default:
                break;
        }
        
        if(flag) {
            hideAlert()
            stepsArr.forEach((el:IStep, i)=>{
                if(el.status===Status.active) {
                    if(i===stepsArr.length-1) {
                        setIndexContentArr(i)
                    }
                    else {
                        setIndexContentArr(i)
                    }
                }
            })
            nextStep()
            if(stepsArr[stepsArr.length-1].status === Status.active) {
                setVisibleBtnAdd(true)
            }
        }
        else {
            console.log('Error!')
        }
        
        
    }

    return (
        // <AddModalState dataSteps={steps} dataArr={initialDataArr}>
            <div className="add-modal">
                <div className="add-modal__title">
                    <h1>Добавление нового транспорта</h1>
                    {/* <button className="add-modal__close-btn">x</button> */}
                    <button className="add-modal__close-btn" onClick={hide}>x</button>
                </div>
                <div className="add-modal__content">
                    <Steps></Steps>
                    {/* <AssetsAutoInfo/> */}
                    {/* <AssetsPriceInfo/>
                    <AssetsOwnerInfo/> */}
                    {contentArr[indexContentArr]}
                </div>
                <div className="add-modal__footer">
                    
                    {/* <button className="add-modal__cancel-btn" onClick={hide}>Отменить</button> */}
                    <button className="add-modal__back-btn" onClick={()=>{
                        if(stepsArr[stepsArr.length-1].status === Status.done) {
                            setVisibleBtnAdd(false)
                        }
                        earlierStep()
                        stepsArr.forEach((el:IStep, i)=>{
                            if(el.status===Status.done && i!==0) {
                                hideAlert()
                                setIndexContentArr(i-1)  
                            }
                        })
                    }}>Шаг назад</button>
                    {visibleBtnAdd === true ? <button className="add-modal__add-btn" onClick={addItem}>Добавить</button>: <button className="add-modal__next-btn" onClick={()=>
                    {   
                        for(let i:number=stepsArr.length-1; i>=0; i--) {
                            if(stepsArr[i].status === Status.active) {
                                nextSt(i-1)
                                break
                            }
                                
                        }
                        
                    }}
                    >Далее</button>}
                </div>
            </div>
        // </AddModalState>
    )
}