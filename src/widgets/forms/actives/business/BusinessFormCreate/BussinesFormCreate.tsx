import { FormEvent, useContext, useEffect, useState } from "react";
import "./businessFormCreate.scss"
import { Form } from "../../../Form.tsx";
import { BusinessRequest } from "../../../../../app/types/actives/business/BusinessTypes.ts";
import { Context } from "../../../../../main.tsx";
import { Button } from "../../../../../shared/ui/Buttons/Button.tsx";
import { GeneralInformation } from "./BusinessFormBlocks/GeneralInformation.tsx";
import { Investments } from "./BusinessFormBlocks/Investments.tsx";
import { preparedRequest, prepareToNumber } from "../../../../../shared/store/business/prepareRequest.ts";
import { observer } from "mobx-react-lite";

interface IAddBalanceForm {
    onBalanceClick: ()=>void,
    setShow: (bool: boolean) => void
}

export const BusinessFormCreate = observer(({setShow}: IAddBalanceForm) => {
    const { activesStore, businessCreateStore, balanceStore} = useContext(Context)
    const [disabled, setDisabled] = useState<boolean>(false)

    // const [ownFundsVisible, setOwnFundsVisible] = useState(false)
    // const [investmentFundsVisible, setInvestmentFundsVisible] = useState(false)
    // const [creditFundsVisible, setCreditFundsVisible] = useState(false)
    // const [error, setError] = useState(false)

    useEffect(() => {
        if(balanceStore.balance === null) {
            const response = balanceStore.fetchBalance()
            response.then(res => {
                if(res.status >= 200 && res.status < 300) {
                    balanceStore.setBalance(res.data)
                    businessCreateStore.setCardList(res.data.card_list)
                    businessCreateStore.createNewLists()
                }
            })
        }
    }, [balanceStore.balance, businessCreateStore])

    /** Валидация формы */


    // useEffect(()=>{
    //     if(!ownFundsVisible && !investmentFundsVisible && !creditFundsVisible) {
    //         setError(true)
    //     } else {
    //         setError(false)
    //     }
    // }, [ownFundsVisible, investmentFundsVisible, creditFundsVisible])


    const handleSubmitForm = (e: FormEvent) => {
        e.preventDefault()

        if(
            businessCreateStore.name.length !== 0 && 
            businessCreateStore.address.length !== 0 && 
            businessCreateStore.equityPercentage.length !== 0 
        ) 
        {
            const business: BusinessRequest = {
                name: businessCreateStore.name,
                address: businessCreateStore.address,
                participation_percent: prepareToNumber(businessCreateStore.equityPercentage),

                own_funds: businessCreateStore.ownFundsCheckbox,
                own_funds_amount: prepareToNumber(businessCreateStore.ownFunds),
                own_funds_writeoff_account: prepareToNumber(businessCreateStore.writeoffAccount),

                third_party_tools: preparedRequest(
                                        businessCreateStore.creditSum,
                                        businessCreateStore.loanTerm,
                                        businessCreateStore.percent,
                                        businessCreateStore.loanDate,
                                        businessCreateStore.paymentsOrder,
                                        businessCreateStore.paymentsPeriod,
                                        businessCreateStore.investmentCheckbox
                                   ),

                loan: preparedRequest(
                            businessCreateStore.loanAmount,
                            businessCreateStore.loanTerms,
                            businessCreateStore.interestRate,
                            businessCreateStore.creditDate,
                            businessCreateStore.paymentsOrder,
                            businessCreateStore.creditPeriod,
                            businessCreateStore.creditCheckbox
                      )
            }
    
            const response = activesStore.createBusiness(business)
            activesStore.setLoading(true)
            response.then(res => {
                if(res.status >= 200 && res.status < 300) {
                    activesStore.setLoading(false)
                    setShow(false)
                    console.log(res.data)
                }
                if(res.data) {
                    const response = activesStore.fetchActives()
                    activesStore.setLoading(true)
                    response.then(res => {
                        if(res.status >= 200 && res.status < 300) {
                            console.log(res.data)
                            activesStore.setActives(res.data)
                            activesStore.setLoading(false)
                        }
                    })
                }
            }).catch(error => activesStore.setError(error))         
        } else {
            setDisabled(true)
        }
    }

    return (
        <Form className="business__form-create" onSubmit={handleSubmitForm}>
            <div className="business__form-content">
                <GeneralInformation/>
                <Investments/>
            </div>
            
            <div className="business__form-actions">
                <Button
                    className="business__form-cancel"
                    textButton="Отменить"
                    type="button"
                    onClick={() => setShow(false)}
                    name="cancel"
                />
                <Button
                    className={`business__form-submit ${disabled ? 'disabled' : ''}`}
                    textButton="Подтвердить"
                    type="submit"
                    name="submit"
                    disabled={disabled}
                />
            </div>
        </Form>
    )
})
