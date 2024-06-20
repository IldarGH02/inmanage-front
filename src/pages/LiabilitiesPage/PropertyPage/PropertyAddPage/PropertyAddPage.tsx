import React, { useEffect, useState } from "react"
import "./propertyAddPage.css"
import { Link } from "react-router-dom"
import { BackBtn } from "../../../../widgets/elements/buttons/BackBtn/BackBtn"
import Steps from "../../../../widgets/modalWindow/steps/StepsTest"
import { IStep, Status } from "../../../../app/types/steps"
import { PropertyStep1 } from "../../../../widgets/liabilities/Property/AddProperty/content/Step1/PropertyStep1"
import { PropertyStep2 } from "../../../../widgets/liabilities/Property/AddProperty/content/Step2/PropertyStep2"
import { PropertyStep3 } from "../../../../widgets/liabilities/Property/AddProperty/content/Step3/PropertyStep3"
import { ILiabilitiesProperty } from "../../../../app/types/liabilities/ILiabilities"
import { useTypedSelector } from "../../../../features/hooks/useTypedSelector"
import { useDispatch } from "react-redux"
import { addProperty, getLiabilities, showLoader } from "../../../../app/store/actions/liabilities/liabilitiesActions"
import { actionTypes } from "../../../../app/store/types/types"
import { actionTypesLiabilities } from "../../../../app/store/types/liabilitiesTypes"

let steps: IStep[] = [
    {
        header: "Шаг 1",
        id: 1,
        status: Status.done
    },
    {
        header: "Шаг 2",
        id: 2,
        status: Status.active
    },
    {
        header: "Шаг 3",
        id: 3,
        status: Status.inactive
    },
]

export function PropertyAddPage() {
    const state = useTypedSelector(state => state.liabilitiesReducer)
    const dispatch = useDispatch()
    const [nextBtnVisible, setNextBtnVisible] = useState(false)
    const [stepsArr, setStepsArr] = useState(steps)
    const [contentArrIndex, setContentArrIndex] = useState(0)

    useEffect(()=>{
        if(state.liabilities === null) {
            dispatch(showLoader(actionTypesLiabilities.SHOW_LOADER_LIABILITIES))
            const res = getLiabilities(actionTypesLiabilities.GET_LIABILITIES)
            res.then(e => {
                // console.log(e)
                dispatch(e!);
                }
            )
            .catch((e) => {
                console.log(e)
            })
        }
        clearSteps()
    },[])

    const [property, setProperty] = useState<ILiabilitiesProperty | any>({
        name: '',
        address: '',
        bought_price: 0, //цена покупки
        actual_price: 0,
        equipment_price: 0,//цена оборудования
        month_expense: 0,
        // average_consumption: 0,
        rent_type: false,//long_rent

        loan: false,
        
        expenses: [],
        total_expense: 0,
        initial_payment: 0,//первый взнос
        loan_term: 0, // срок кредитования
        percentage: 0, //процентная ставка
        month_payment: 0, // ежемесячный платеж
        owner: ''
    })

    const changeBtnVisible = (flag: boolean)=> {
        setNextBtnVisible(flag)
    }

    const changeValues = (obj: ILiabilitiesProperty)=> {
        setProperty(obj)
    }

    const contentArr = [<PropertyStep1 onChangeBtnVisible={changeBtnVisible} onChangeValues={changeValues} data={property}/>,
    <PropertyStep2 onChangeBtnVisible={changeBtnVisible} onChangeValues={changeValues} data={property}/>,
    <PropertyStep3 onChangeValues={changeValues} data={property}/>]

    const nextStep = ()=> {
        if(nextBtnVisible) {
            let resTmp = stepsArr
            let index: number = -1;
            let steps: IStep[] = resTmp.map((el:IStep, i: number)=>{
                if(el.status === Status.active) {
                    el.status = Status.done
                    index = i
                }
                return el
            })
            if(index!==-1 && index<resTmp.length-1) {
                steps[index+1].status = Status.active
            }
            setContentArrIndex(contentArrIndex+1)
            setStepsArr(steps)
        }
        
    }

    const earlierStep = ()=> {
        let resTmp = stepsArr
        let index: number = -1;
        var flag = false
        let steps: IStep[] = resTmp.map((el:IStep, i: number)=>{
            if(el.status === Status.active && !flag) {
                flag = true
                if(i===1) {
                    index = 0
                }
                else {
                    el.status = Status.inactive
                    index = i-1
                }
            }
            return el
        })
        if(index>0) {
            steps[index].status = Status.active
        }
        else if(index===-1){
            steps[steps.length-1].status = Status.active
        }
        setContentArrIndex(contentArrIndex-1)
        setStepsArr(steps)
        
    }

    const clearSteps = ()=> {
        for(let i = 0; i<stepsArr.length; i++) {
            if(i === 1) {
                stepsArr[i].status = Status.active
            }
            else if(i>1) {
                stepsArr[i].status = Status.inactive
            }
        }
        setStepsArr(stepsArr)
    }

    const onAddProperty = () => {
        if(!property.loan) {
            // property.initial_payment = 0,
            // property.loan_term = 0,
            // property.percentage = 0
        }
        const res = addProperty(actionTypes.ADD_PROPERTY, property)
        res.then(e => {
            // console.log(e)
            dispatch(e!);
            }
        )
        .catch((e) => {
            console.log(e)
        })
    }

    return (
        <div id="assets-wrapper" className="wrapper">
            <div className="container" >
                <div className="property-add-page">
                    <Link className="property-add-page__back-btn" to="/liabilities/property">
                        <BackBtn/>
                    </Link>
                    <div className="property-add-page__title">Добавление недвижимости</div>
                    <Steps stepsArr={stepsArr}/>
                    <div className="property-add-page__container">
                        <div className="property-add-page__content">
                            <div className="property-add-page__content-title">Шаг {contentArrIndex+1}</div>
                            {contentArr[contentArrIndex]}
                        </div>
                        <div className="property-add-page__actions-btn">
                            {stepsArr[contentArrIndex].id!==stepsArr[0].id && 
                            <button className="blue-btn property-add-page__next-btn--active" onClick={earlierStep}>Назад</button>
                            }
                            {(stepsArr[stepsArr.length-1].status===Status.inactive || stepsArr[stepsArr.length-1].status===Status.active) &&
                            <button className={`property-add-page__next-btn${nextBtnVisible ? '--active' : ''}`} onClick={nextStep}>Далее</button>
                            }
                            {stepsArr[stepsArr.length-1].status===Status.done && 
                            <Link className="property-add-page__add-btn--active" to="/liabilities/property" onClick={onAddProperty}>Добавить</Link>
                            }
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        
    )
}
