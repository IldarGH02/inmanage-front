import React, { useEffect, useState } from "react"
import "./businessStep3.css"
import { Daw } from "../../../../../elements/Daw/daw"
import { InputSum } from "../../../../../../shared/ui/input/InputSum/InputSumTest"
import { InputTimeCredit } from "../../../../../../shared/ui/input/inputTimeCredit/InputTimeCredit"
import { InputPercent } from "../../../../../../shared/ui/input/inputPercent/InputPercent"
import { InputText } from "../../../../../../shared/ui/input/InputText/InputTextTest"
import { IAssetsBusiness } from "../../../../../../app/types/assets/IAssets"

interface IBusinessStep3 {
    onChangeBtnVisible: (flag: boolean) => void, 
    onChangeValues: (obj: IAssetsBusiness)=>void, 
    data: IAssetsBusiness
}

export function BusinessStep3({onChangeValues, onChangeBtnVisible, data}: IBusinessStep3) {
    const [valueCreditor, setValueCreditor] = useState<string>('')
    const [valueThirdPartyTools, setValueThirdPartyTools] = useState<string>('')
    const [valueThirdPartyToolsPercent, setValueThirdPartyToolsPercent] = useState<string>('')

    const [valueOwnFunds, setValueOwnFunds] = useState(discharge(String(data.own_funds)))
    const [valueLoanSum, setValueLoanSum] = useState<string>('')
    const [valueTimeCredit, setValueTimeCredit] = useState<string>('0')
    const [valuePercentCredit, setValuePercentCredit] = useState<string>(Number.isInteger(data.percentage)?String(data.percentage)+'.00':String(data.percentage))
    const [visibleValPrice, setVisibleValPrice] = useState(false)
    const [visibleValCredit, setVisibleValCredit] = useState(false)
    const [visibleValInvest, setVisibleValInvest] = useState(false)

    const [textAlertCreditor, setTextAlertCreditor] = useState('')
    const [textAlertThirdPartyTools, setTextAlertThirdPartyTools] = useState('')
    const [textAlertOwnFunds, setTextAlertOwnFunds] = useState('')
    const [textAlertLoanSum, setTextAlertLoanSum] = useState('')
    const [textAlertTimeCredit, setTextAlertTimeCredit] = useState('')


    ////////////
    function discharge(str:string): string {
        return str.replace(/[^0-9.]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }
    ////////////

    useEffect(()=>{
        if(Number.isInteger(data.percentage)) {
            setValuePercentCredit(String(data.percentage)+'.00')
        }
        else {
            setValuePercentCredit(String(data.percentage))
        }
        if(Number.isInteger(data.third_party_tools_percentage)) {
            setValueThirdPartyToolsPercent(String(data.third_party_tools_percentage)+'.00')
        }
        else {
            setValueThirdPartyToolsPercent(String(data.third_party_tools_percentage))
        }
        setValueThirdPartyTools(discharge(String(data.third_party_tools)))
        setValueOwnFunds(discharge(String(data.own_funds)))
        setValueLoanSum(discharge(String(data.initial_payment)))
        setValueTimeCredit(discharge(String(data.loan_term)))
        setValueCreditor(data.creditor)
        // setVisibleValPrice(data.investment_type!.own_funds)
        // setVisibleValCredit(data.investment_type!.loan_credit)
        // setVisibleValInvest(data.investment_type!.third_party_tools)
        console.log(textAlertCreditor)
        console.log(textAlertThirdPartyTools)
        console.log(textAlertLoanSum)
        console.log(textAlertTimeCredit)
    },[])

    useEffect(()=>{
        let dataTmp = data
        dataTmp.creditor = valueCreditor
        dataTmp.loan_term = Number(valueTimeCredit.replace(/ /g,''))
        dataTmp.third_party_tools = valueThirdPartyTools ? dataTmp.third_party_tools : 0
        dataTmp.third_party_tools_percentage = valueThirdPartyToolsPercent ? dataTmp.third_party_tools_percentage : 0
        dataTmp.initial_payment = Number(valueLoanSum.replace(/ /g,''))
        // dataTmp.own_funds = !visibleValPrice ? 0 : Number(valueOwnFunds.replace(/ /g,'')),
        // dataTmp.percentage = Number(valuePercentCredit)
        // dataTmp.investment_type!.loan_credit = visibleValCredit
        // dataTmp.investment_type!.own_funds = visibleValPrice
        // dataTmp.investment_type!.third_party_tools = visibleValInvest
        onChangeValues(dataTmp)
        var flag = true
        if(visibleValPrice && (valueOwnFunds === '0' || textAlertOwnFunds!=='')) {
            flag = false
        }
        // if(dataTmp.investment_type!.loan_credit && (dataTmp.loan_term === 0 || dataTmp.initial_payment === 0 || textAlertLoanSum!=='' || textAlertTimeCredit!=='')) {
        //     flag = false
        // }
        // if(dataTmp.investment_type!.third_party_tools && (textAlertThirdPartyTools!=='' || valueCreditor === '' || valueThirdPartyTools === '0' || textAlertCreditor!=='')) {
        //     flag = false
        // }
        // if(!dataTmp.investment_type!.loan_credit && !dataTmp.investment_type!.own_funds && !dataTmp.investment_type!.third_party_tools) {
        //     flag = false
        // }
        if(flag) {
            onChangeBtnVisible(true)
        }
        else {
            onChangeBtnVisible(false)
        }

    },[visibleValPrice, visibleValCredit, visibleValInvest, valueCreditor,valueTimeCredit,valuePercentCredit,valueThirdPartyTools, valueLoanSum, valueThirdPartyToolsPercent, valueOwnFunds])

    const changeDawPrice = ()=> {
        setVisibleValPrice(!visibleValPrice)
    }

    const changeDawInvest = ()=> {
        setVisibleValInvest(!visibleValInvest)
    }

    const changeDawCredit = ()=> {
        setVisibleValCredit(!visibleValCredit)
    }

    return (
        <div className="property-add">
            <div className="property-add__item-daw">
                <div className="inventory__item-daw">
                    <Daw onChangeDaw={changeDawPrice} dawActive={visibleValPrice}/>
                </div>
                <div className="property-add__label-daw">Собственные средства</div>
            </div>
            {visibleValPrice && 
            <div className="property-add__extra-item">
                <div className="property-add__item">
                    <div className="property-add__name">Собственные cредства<b>*</b></div>
                    <InputSum length={10} value={valueOwnFunds!} setValue={setValueOwnFunds} setAlert={setTextAlertOwnFunds}/>
                </div>
            </div>
            }
            <div className="property-add__item-daw">
                <div className="inventory__item-daw">
                    <Daw onChangeDaw={changeDawInvest} dawActive={visibleValInvest}/>
                </div>
                <div className="property-add__label-daw">Сторонние и инвестиционные средства</div>
            </div>
            {visibleValInvest && 
                <div className="property-add__extra-item">
                    <div className="credit-block__item-container">
                        <div className="property-add__item" style={{width:'50%'}}>
                            <div className="property-add__name">Сумма кредита<b>*</b></div>
                            <InputSum length={10} value={valueThirdPartyTools!} setValue={setValueThirdPartyTools} setAlert={setTextAlertThirdPartyTools}/>
                        </div>
                        <div className="credit-block__item">
                            <div className="credit-block__label">Процент<b>*</b></div> 
                            <InputPercent value={valueThirdPartyToolsPercent} setValue={setValueThirdPartyToolsPercent}/>
                        </div>
                    </div>
                    <div className="property-add__item">
                        <div className="property-add__name">Кредитор<b>*</b></div>
                        <InputText length={30} value={valueCreditor} attentionFlag={true} setValue={setValueCreditor} setAlert={setTextAlertCreditor}/>
                    </div>
                </div>
            }
            <div className="property-add__item-daw">
                <div className="inventory__item-daw">
                    <Daw onChangeDaw={changeDawCredit} dawActive={visibleValCredit}/>
                </div>
                <div className="property-add__label-daw">Ивестиции в кредит</div>
            </div>
            {visibleValCredit &&
                <div className="property-add__extra-item">
                    <div className="property-add__credit-block" style={{margin: '0px'}}>
                        <div className="credit-block">
                            <div className="credit-block__item">
                                <div className="credit-block__label">Сумма кредитования<b>*</b></div> 
                                <InputSum length={10} value={valueLoanSum!} setValue={setValueLoanSum} setAlert={setTextAlertLoanSum}/>
                            </div>
                            <div className="credit-block__item-container">
                                <div className="credit-block__item">
                                    <div className="credit-block__label">Срок кредитования<b>*</b></div> 
                                    {/* <input type="text" value={valueTimeCredit} onChange={changeTimeCredit}  onKeyUp={()=>setValueTimeCredit(discharge(valueTimeCredit))}></input> <b>мес.</b> */}
                                    <InputTimeCredit value={valueTimeCredit} setValue={setValueTimeCredit} setAlert={setTextAlertTimeCredit}/>
                                </div>
                                <div className="credit-block__item">
                                    <div className="credit-block__label">Процентная ставка<b>*</b></div> 
                                    <InputPercent value={valuePercentCredit} setValue={setValuePercentCredit}/>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
