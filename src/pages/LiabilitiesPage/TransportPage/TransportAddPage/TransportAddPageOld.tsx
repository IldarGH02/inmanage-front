// import React, { useEffect, useState } from "react"
// import "./transportAddPage.css"
// import { Link } from "react-router-dom"
// import { BackBtn } from "../../../../widgets/elements/buttons/BackBtn/BackBtn"
// import Steps from "../../../../widgets/modalWindow/steps/StepsTest"
// import { IStep, Status } from "../../../../app/types/steps"
// import { TransportStep2 } from "../../../../widgets/liabilities/Transport/AddTransport/content/Step2/TransportStep2"
// import { TransportStep3 } from "../../../../widgets/liabilities/Transport/AddTransport/content/Step3/TransportStep3"
// import { TransportStep1 } from "../../../../widgets/liabilities/Transport/AddTransport/content/Step1/TransportStep1"
// import { useDispatch } from "react-redux"
// import { useTypedSelector } from "../../../../features/hooks/useTypedSelector"
// import { addTransport, getLiabilities, showLoader } from "../../../../app/store/actions/liabilities/liabilitiesActions"
// import { actionTypes } from "../../../../app/store/types/types"
// import { ILiabilitiesTransport } from "../../../../app/types/liabilities/LiabilitiesType"

// let steps: IStep[] = [
//     {
//         header: "Информация о транспорте",
//         id: 1,
//         status: Status.done
//     },
//     {
//         header: "Информация о владельце",
//         id: 2,
//         status: Status.active
//     },
//     {
//         header: "Цена покупки",
//         id: 3,
//         status: Status.inactive
//     },
// ]

// export function TransportAddPage() {
//     const state = useTypedSelector(state => state.liabilitiesReducer)
//     const dispatch = useDispatch()
//     const [nextBtnVisible, setNextBtnVisible] = useState(false)
//     const [stepsArr, setStepsArr] = useState(steps)
//     const [contentArrIndex, setContentArrIndex] = useState(2)

//     useEffect(()=>{
//         if(state.liabilities === null) {
//             dispatch(showLoader(actionTypes.SHOW_LOADER))
//             const res = getLiabilities(actionTypes.GET_ASSETS) // Найти/сделать нужный тип, так как это заглушка
//             res.then(e => {
//                 // console.log(e)
//                 dispatch(e!);
//                 }
//             )
//             .catch((e) => {
//                 console.log(e)
//             })
//         }
//         clearSteps()
//     },[])

//     const [transport, setTransport] = useState<ILiabilitiesTransport | any>({
//         mark: '',
//         model: '',
//         bought_price: 0, //цена покупки
//         // revenue: 0,//доход
//         // month_income: 0,
//         month_expense: 0,
//         average_consumption: 0,
//         owner_type: false,//физическое лицо

//         loan: false,//мое
        
//         average_market_price: 0,
//         min_market_price: 0,
//         max_market_price: 0,
//         images: [],
//         expenses: [],
//         total_expense: 0,
//         initial_payment: 0,//первый взнос
//         loan_term: 0, // срок кредитования
//         percentage: 0, //процентная ставка
//         month_payment: 0, // ежемесячный платеж
//         use: '', // назначение
//         vin: '',
//         owner: '',
//     })

//     const changeBtnVisible = (flag: boolean)=> {
//         setNextBtnVisible(flag)
//     }

//     const changeValues = (obj: ILiabilitiesTransport)=> {
//         setTransport(obj)
//     }

//     const contentArr = [<TransportStep1 onChangeBtnVisible={changeBtnVisible} onChangeValues={changeValues} data={transport}/>,
//                         <TransportStep2 onChangeBtnVisible={changeBtnVisible} onChangeValues={changeValues} data={transport}/>,
//                         <TransportStep3 onChangeBtnVisible={changeBtnVisible} onChangeValues={changeValues} data={transport}/>]

//     const nextStep = ()=> {
//         if(nextBtnVisible) {
//             let resTmp = stepsArr
//             let index: number = -1;
//             let steps: IStep[] = resTmp.map((el:IStep, i: number)=>{
//                 if(el.status === Status.active) {
//                     el.status = Status.done
//                     index = i
//                 }
//                 return el
//             })
//             if(index!==-1 && index<resTmp.length-1) {
//                 steps[index+1].status = Status.active
//             }
//             setContentArrIndex(contentArrIndex+1)
//             setStepsArr(steps)
//         }
        
//     }

//     const earlierStep = ()=> {
//         let resTmp = stepsArr
//         let index: number = -1;
//         var flag = false
//         let steps: IStep[] = resTmp.map((el:IStep, i: number)=>{
//             if(el.status === Status.active && !flag) {
//                 flag = true
//                 if(i===1) {
//                     index = 0
//                 }
//                 else {
//                     el.status = Status.inactive
//                     index = i-1
//                 }
//             }
//             return el
//         })
//         if(index>0) {
//             steps[index].status = Status.active
//         }
//         else if(index===-1){
//             steps[steps.length-1].status = Status.active
//         }
//         setContentArrIndex(contentArrIndex-1)
//         setStepsArr(steps)
        
//     }

//     const clearSteps = ()=> {
//         for(let i = 0; i<stepsArr.length; i++) {
//             if(i === 1) {
//                 stepsArr[i].status = Status.active
//             }
//             else if(i>1) {
//                 stepsArr[i].status = Status.inactive
//             }
//         }
//         setStepsArr(stepsArr)
//     }

//     const onAddTransport = () => {
//         const res = addTransport(actionTypes.ADD_TRANSPORT, transport)
//         res.then(e => {
//             console.log(e)
//             dispatch(e!);
//             }
//         )
//         .catch((e) => {
//             console.log(e)
//         })
//     }

//     return (
//         <div id="assets-wrapper" className="wrapper">
//             <div className="container" >
//                 <div className="property-add-page">
//                     <Link className="property-add-page__back-btn" to="/liabilities/transport">
//                         <BackBtn/>
//                     </Link>
//                     <div className="property-add-page__title">Добавление транспорта</div>
//                     <Steps stepsArr={stepsArr}/>
//                     <div className="property-add-page__container">
//                         <div className="property-add-page__content">
//                             <div className="property-add-page__content-title">{steps[contentArrIndex].header}</div>
//                             {contentArr[contentArrIndex]}
//                             {/* {contentArr[0]} */}
//                             {/* <PropertyStep1 onChangeBtnVisible={changeBtnVisible}/> */}
//                         </div>
//                         <div className="property-add-page__actions-btn">
//                             {stepsArr[contentArrIndex].id!==stepsArr[0].id && 
//                             <button className="blue-btn property-add-page__next-btn--active" onClick={earlierStep}>Назад</button>
//                             }
//                             {(stepsArr[stepsArr.length-1].status===Status.inactive || stepsArr[stepsArr.length-1].status===Status.active) &&
//                             <button className={`property-add-page__next-btn${nextBtnVisible ? '--active' : ''}`} onClick={nextStep}>Далее</button>
//                             }
//                             {stepsArr[stepsArr.length-1].status===Status.done && 
//                             <Link onClick={(events)=>{
//                                 if(!nextBtnVisible) {
//                                     events.preventDefault()
//                                 }
//                                 else {
//                                     onAddTransport()
//                                 }
//                             }
//                             } className={`property-add-page__add-btn${nextBtnVisible ? '--active' : ''}`} to="/liabilities/transport">Добавить</Link>
//                             }
//                         </div>
//                     </div>
                    
//                 </div>
//             </div>
//         </div>
        
//     )
// }