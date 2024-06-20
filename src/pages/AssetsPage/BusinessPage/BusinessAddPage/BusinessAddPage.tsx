import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"

import { IStep, Status } from "../../../../app/types/steps"
import { IAssetsBusiness } from "../../../../app/types/assets/IAssets"
import { addBusiness, getAssets, showLoader } from "../../../../app/store/actions/assets/assetsActions"
import { actionTypes } from "../../../../app/store/types/types"

import { BusinessStep1 } from "../../../../widgets/assets/Business/AddBusiness/content/Step1/BusinessStep1"
import { BusinessStep2 } from "../../../../widgets/assets/Business/AddBusiness/content/Step2/BusinessStep2"
import { BusinessStep3 } from "../../../../widgets/assets/Business/AddBusiness/content/Step3/BusinessStep3"
import { BackBtn } from "../../../../widgets/elements/buttons/BackBtn/BackBtn"
import Steps from "../../../../widgets/modalWindow/steps/StepsTest"

import { useTypedSelector } from "../../../../features/hooks/useTypedSelector" 



import "./businessAddPage.css"

let steps: IStep[] = [
    {
        header: "Заголовок бизнеса",
        id: 1,
        status: Status.done
    },
    {
        header: "Характеристика бизнеса",
        id: 2,
        status: Status.active
    },
    {
        header: "Стартовые инвестиции",
        id: 3,
        status: Status.inactive
    },
]

export function BusinessAddPage() {
    const state = useTypedSelector(state => state.assetsReducer)
    const dispatch = useDispatch()
    const [nextBtnVisible, setNextBtnVisible] = useState(false)
    const [stepsArr, setStepsArr] = useState(steps)
    const [contentArrIndex, setContentArrIndex] = useState(0)

    useEffect(()=>{
        if(state.assets === null) {
            dispatch(showLoader(actionTypes.SHOW_LOADER))
            const res = getAssets(actionTypes.GET_ASSETS)
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

    const [business, setBusiness] = useState<IAssetsBusiness | any>({
        address:'',
        name: '',
        direction: '',
        month_income: 0,
        month_expense: 0,
        total_income: 0,
        total_expense: 0,
        average_profit: 0,
        initial_payment: 0,
        revenue: 0,
        // own_funds: 0,
        third_party_tools: 0,
        third_party_tools_percentage: 0,
        creditor: '',
        loan_term: 0,
        percentage: 0,
        month_payment: 0,
        // type: false,
        income: [],
        expenses: [],
        investment_type: {
            loan_credit: false,
            own_funds: false,
            third_party_tools: false
        }
    })

    const changeBtnVisible = (flag: boolean)=> {
        setNextBtnVisible(flag)
    }

    const changeValues = (obj: IAssetsBusiness)=> {
        setBusiness(obj)
    }

    const contentArr = [<BusinessStep1 onChangeBtnVisible={changeBtnVisible} onChangeValues={changeValues} data={business}/>,
    <BusinessStep2 onChangeBtnVisible={changeBtnVisible} onChangeValues={changeValues} data={business}/>,
    <BusinessStep3 onChangeBtnVisible={changeBtnVisible} onChangeValues={changeValues} data={business}/>]

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

    const onAddBusiness = () => {
        const res = addBusiness(actionTypes.ADD_BUSINESS, business)
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
                    <Link className="property-add-page__back-btn" to="/assets/business">
                        <BackBtn/>
                    </Link>
                    <div className="property-add-page__title">Добавление бизнеса</div>
                    <Steps stepsArr={stepsArr}/>
                    <div className="property-add-page__container">
                        <div className="property-add-page__content">
                            <div className="property-add-page__content-title">{steps[contentArrIndex].header}</div>
                            {contentArr[contentArrIndex]}
                            {/* {contentArr[0]} */}
                            {/* <PropertyStep1 onChangeBtnVisible={changeBtnVisible}/> */}
                        </div>
                        <div className="property-add-page__actions-btn">
                            {stepsArr[contentArrIndex].id!==stepsArr[0].id && 
                            <button className="blue-btn property-add-page__next-btn--active" onClick={earlierStep}>Назад</button>
                            }
                            {(stepsArr[stepsArr.length-1].status===Status.inactive || stepsArr[stepsArr.length-1].status===Status.active) &&
                            <button className={`property-add-page__next-btn${nextBtnVisible ? '--active' : ''}`} onClick={nextStep}>Далее</button>
                            }
                            {stepsArr[stepsArr.length-1].status===Status.done && 
                            <Link onClick={(events)=>{
                                if(!nextBtnVisible) {
                                    events.preventDefault()
                                }
                                else {
                                    onAddBusiness()
                                }
                            }
                            } className={`property-add-page__add-btn${nextBtnVisible ? '--active' : ''}`} to="/assets/business">Добавить</Link>
                            }
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        
    )
}