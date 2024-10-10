import { FormEvent, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";

import { Context } from "../../../../main.tsx";

import { Button } from "../../../../shared/ui/Buttons/Button.tsx";
import { Select } from "../../../Custom/Select.tsx";
import { InputSum } from "../../../Custom/Inputs/InputSum.tsx";
import { Form } from "../../../Custom/Forms/Form.tsx";
import { SpinnerLoader } from "../../../elements/SpinnerLoader/SpinnerLoader.tsx";
import { Credit } from "../../../../entities/ui/Actives/Credit.tsx";
import { transportRequest } from "../../../../shared/store/transport/transportRequest.ts";

export const CreateTransportForm = observer(() => {
    const { activesStore, transportStore, balanceStore } = useContext(Context).rootStore

    useEffect(() => {
        if(transportStore.brand) {
            transportStore.prepareModelList(transportStore.brand)
        }

        const response = balanceStore.fetchBalance()
        response.then(res => {
            if(res.status >= 200 && res.status < 300) {
                if(res.data.card_list) {
                    transportStore.setWriteOffAccountList(res.data.card_list)
                }
            }
        })
    }, [transportStore.brand, balanceStore])

    const selectedBrand = transportStore.brand_list.find((item) => item.content === transportStore.brand);
    const selectedModel = transportStore.model_list.find((item) => item.content === transportStore.model);
    const selectedYear = transportStore.year_list.find((item) => item.content === transportStore.year);
    const selectedOwnerCount = transportStore.owner_list.find((item) => item.content === transportStore.owner_count);
    const selectedPaymentType = transportStore.paymentType_list.find((item) => item.content === transportStore.payment_type)
    const selectedTransportBodyType = transportStore.transportBody_list.find((item) => item.content === transportStore.body_type)
    const selectedSteeringWheel = transportStore.wheel_list.find((item) => item.content === transportStore.wheel)
    
    const openFileInput = ()=> {
        (document.querySelector('#input-file') as HTMLInputElement).click();
    }

    const handleSubmitForm = (e: FormEvent) => {
        e.preventDefault()

        if(transportStore.payment_type === 'Кредит') {
            transportStore.setLoan(true)
            if(
                !transportStore.isDown_payment_error &&
                !transportStore.isLoan_term_error &&
                !transportStore.isInterest_rate_error
            ){
                if(
                    !transportStore.isError_brand &&
                    !transportStore.isError_model &&
                    !transportStore.isYear_error &&
                    !transportStore.isPayment_type_error
                ) {
                    const response = activesStore.createTransport(transportRequest(
                        transportStore.brand,
                        transportStore.model,
                        transportStore.owner_count,
                        transportStore.sum,
                        transportStore.loan,
                        transportStore.down_payment,
                        transportStore.loan_term,
                        transportStore.interest_rate, // optional
                        transportStore.payment_order,
                        transportStore.payment_period,
                        transportStore.year,
                        transportStore.body_type,
                        transportStore.horses_power,
                        transportStore.wheel,
                    ))
                    
                    activesStore.setLoading(true)
                    response.then(response => {
                        if (response.status >= 200 && response.status < 300) {
                            transportStore.setShow(false)
                            activesStore.setLoading(false)
                            return activesStore.fetchActives()
                        }
                    }).catch((e) => {
                        activesStore.setError(e)
                    })
                }
            }
        } else {
            transportStore.setLoan(false)
            if(
                !transportStore.isError_brand &&
                !transportStore.isError_model &&
                !transportStore.isYear_error &&
                !transportStore.isPayment_type_error
            ) {
                const response = activesStore.createTransport(transportRequest(
                    transportStore.brand,
                    transportStore.model,
                    transportStore.owner_count,
                    transportStore.sum,
                    transportStore.loan,
                    transportStore.down_payment,
                    transportStore.loan_term,
                    transportStore.interest_rate, // optional
                    transportStore.payment_order,
                    transportStore.payment_period,
                    transportStore.year,
                    transportStore.body_type,
                    transportStore.horses_power,
                    transportStore.wheel,
                ))

                activesStore.setLoading(true)
                response.then(response => {
                    if (response.status >= 200 && response.status < 300) {
                        transportStore.setShow(false)
                        activesStore.setLoading(false)
                        const r = activesStore.fetchActives()
                        activesStore.setLoading(true)
                        r.then(res => {
                            if(res.status >= 200 && res.status < 300) {
                                activesStore.setLoading(false)
                                activesStore.setActives(res.data)
                            }
                        })
                    }
                }).catch((e) => {
                    activesStore.setError(e)
                })
            }
        }
    }

    return (
       <>
           <SpinnerLoader loading={activesStore.loading}/>
           <Form className="transport__modal-form" handleSubmit={handleSubmitForm}>
               <div className="transport__form-content">
                   <div className="transport__form-auto">
                       <div className='transport__form-auto_brand'>
                           <Select
                               selected={selectedBrand || null}
                               options={transportStore.brand_list}
                               placeholder='Выберите марку'
                               mode='rows'
                               classNameContainer={`dropdown__container ${transportStore.isError_brand ? 'error' : ''}`}
                               classNameSelect='dropdown__select'
                               classNameList='dropdown__list'
                               onChange={transportStore.handleChangeBrand}
                               errorMessage={transportStore.brand_error}
                           />
                           <Select
                               selected={selectedModel || null}
                               options={transportStore.model_list}
                               placeholder='Выберите модель'
                               mode='rows'
                               classNameContainer={`dropdown__container ${transportStore.isError_model ? 'error' : ''}`}
                               classNameSelect='dropdown__select'
                               classNameList='dropdown__list'
                               onChange={transportStore.handleChangeModel}
                               errorMessage={transportStore.model_error}
                           />
                       </div>
                       <div className='transport__form-auto_info'>
                           <h3 className="auto__info-title">Информация о транспорте</h3>
                           <Select
                               selected={selectedYear || null}
                               options={transportStore.year_list}
                               placeholder='Год выпуска'
                               mode='rows'
                               classNameContainer={`dropdown__container ${transportStore.isYear_error ? 'error' : ''}`}
                               classNameSelect='dropdown__select'
                               classNameList='dropdown__list'
                               onChange={transportStore.handleChangeYear}
                               errorMessage={transportStore.year_error}
                           />
                           <Select
                               selected={selectedOwnerCount || null}
                               options={transportStore.owner_list}
                               placeholder='Количество владельцев'
                               mode='rows'
                               classNameContainer={`dropdown__container ${transportStore.isOwner_count_error ? 'error' : ''}`}
                               classNameSelect='dropdown__select'
                               classNameList='dropdown__list'
                               onChange={transportStore.handleChangeOwnerCount}
                               errorMessage={transportStore.owner_count_error}
                           />
                           <Select
                                selected={selectedTransportBodyType || null}
                                options={transportStore.transportBody_list}
                                placeholder='Тип кузова'
                                mode='rows'
                                classNameContainer={`dropdown__container ${transportStore.isBody_type_error ? 'error' : ''}`}
                                classNameSelect='dropdown__select'
                                classNameList='dropdown__list'
                                onChange={transportStore.handleChangeBodyType}
                                errorMessage={transportStore.body_type_error}
                           />
                           <Select
                                selected={selectedSteeringWheel || null}
                                options={transportStore.wheel_list}
                                placeholder='Расположение руля'
                                mode='rows'
                                classNameContainer={`dropdown__container ${transportStore.isSteering_wheel_error ? 'error' : ''}`}
                                classNameSelect='dropdown__select'
                                classNameList='dropdown__list'
                                onChange={transportStore.handleChangeWheel}
                                errorMessage={transportStore.steering_wheel_error}
                           />
                           <InputSum
                                value={transportStore.horses_power}
                                type='text'
                                currency=''
                                placeholder='Количество лошадиных сил'
                                classNameCurrency='price__sum-currency'
                                onChange={transportStore.handleChangeHorsesPower}
                            />
                           <button 
                                type="button" 
                                className="transport__form-auto_button add_image-button"
                                onClick={openFileInput}
                                >
                                    Добавить фото
                           </button>
                       </div>
                   </div>
                   <div className="transport__form-price">
                       <h3 className="price__title">Цена покупки</h3>
                       <InputSum
                           value={transportStore.sum}
                           type='text'
                           currency='₽'
                           placeholder='Цена транспорта'
                           classNameCurrency='price__sum-currency'
                           onChange={transportStore.handleChangeSum}
                       />
                       { transportStore.input_sum_error && <div>{transportStore.input_sum_error}</div> }

                       <Select
                           selected={selectedPaymentType || null}
                           options={transportStore.paymentType_list}
                           classNameContainer={`dropdown__container ${transportStore.isPayment_type_error ? 'error' : ''}`}
                           classNameSelect='dropdown__select'
                           classNameList='dropdown__list'
                           placeholder='Тип денежных средств'
                           mode='rows'
                           onChange={transportStore.handleChangePaymentType}
                           errorMessage={transportStore.payment_type_error}
                       />
                       <div
                           className={`price__credit-container ${transportStore.payment_type === "Кредит" ? 'active-credit' : ''}`}
                       >
                           <Credit/>
                       </div>
                   </div>
               </div>
               <div className="transport__form-actions">
                   <Button
                       className="transport__form-actions_cancel"
                       name='cancel'
                       textButton='Отменить'
                       onClick={transportStore.handleCloseModalForm}
                       type='button'
                   />
                   <Button
                       className={`transport__form-actions_submit`}
                       type="submit"
                       textButton='Подтвердить'
                       name='sumbit'
                       onClick={transportStore.checkValidation}
                   />
               </div>
           </Form>
       </>
    )
})