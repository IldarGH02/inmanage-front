import {FC, FormEvent, useContext, useEffect, useState} from "react";
import { observer } from "mobx-react-lite";

import { IDropDownList } from "../../../app/types/elements/IDropDownList";
import { RequestBodyTransport } from "../../../app/types/actives/ActivesTypes.ts";
import { Button } from "../../../shared/ui/Buttons/Button.tsx";
import { getCarsBrand, getModelList, ICarList } from "../../../features/func/parsData.ts";
import { Select } from "../../Custom/Select.tsx";
import { owners } from "../../../features/constants/owners.ts";
import { paymentTypes } from "../../../features/constants/payments.ts";
import { InputSum } from "../../Custom/Inputs/InputSum.tsx";
import { Form } from "../../Custom/Forms/Form.tsx";
import { useError } from "../../../features/hooks/useError/useError.tsx";
import { SpinnerLoader } from "../../elements/SpinnerLoader/SpinnerLoader.tsx";
import { Context } from "../../../main.tsx";
import { Credit } from "../../../entities/ui/Actives/Credit.tsx";
import { steeringWheel, traponsportBodyTypes } from "../../../features/constants/transportDrop.ts";

interface ITransportForm {
    handleClose: React.MouseEventHandler<HTMLButtonElement>
    setShow: (show: boolean) => void
}

export const TransportForm: FC<ITransportForm> = observer((
    {
        handleClose,
        setShow
    }) => {

    const store = useContext(Context).activesStore

    const selectErrorBrand = useError('')
    const selectErrorModel = useError('')
    const selectErrorYear = useError('')
    const selectErrorOwnerCount = useError('')
    const selectErrorPayment = useError('')
    const selectTransportBodyError = useError('')
    const selectSteeringWheelError = useError('')

    const inputError = useError('')
    const inputErrorDownPayment = useError('')
    const inputErrorLoanTerm = useError('')
    const inputErrorRateValue = useError('')
    const inputHorsesPowerErrorValue = useError('')

    const [brandList] = useState<ICarList[]>(getCarsBrand()) //setBrandList
    const [modelList, setModelList] = useState<ICarList[]>([])
    const [yearList, setYearList] = useState<IDropDownList[]>([])
    const [ownerCountList, setOwnerCountList] = useState<IDropDownList[]>([])
    const [paymentTypeList, setPaymentTypeList] = useState<IDropDownList[]>([])
    const [transportBodyTypesList, setTransportBodyTypesList] = useState<IDropDownList[]>([])
    const [steeringWheelList, setSteeringWheelList] = useState<IDropDownList[]>([])
    const [value, setValue] = useState('')

    const [downPaymentValue, setDownPaymentValue] = useState('')
    const [loanTermValue, setLoanTermValue] = useState('')
    const [rateValue, setRateValue] = useState('')

    const [brand, setBrandValue] = useState('');
    const [model, setModelValue] = useState('');
    const [year, setYearValue] = useState('');
    const [transportBodyType, setTransportBodyType] = useState('')
    const [steeringWheelValue, setSteeringWheelValue] = useState('')
    const [ownerCountValue, setOwnerCountValue] = useState('');
    const [paymentTypeValue, setPaymentTypeValue] = useState('');
    const [horsesPowerValue, setHorsesPowerValue] = useState('');

    const [bank, setBank] = useState('')
    const [order, setOrder] = useState('')
    const [period, setPeriod] = useState('')
    const [account, setAccount] = useState('')

    const selectedBrand = brandList.find((item) => item.content === brand);
    const selectedModel = modelList.find((item) => item.content === model);
    const selectedYear = yearList.find((item) => item.content === year);
    const selectedOwnerCount = ownerCountList.find((item) => item.content === ownerCountValue);
    const selectedPaymentType = paymentTypeList.find((item) => item.content === paymentTypeValue)
    const selectedTransportBodyType = transportBodyTypesList.find((item) => item.content === transportBodyType)
    const selectedSteeringWheel = steeringWheelList.find((item) => item.content === steeringWheelValue)


    const handleBrandSelect = (value: string) => {
        setBrandValue(value);
        if(value.length > 0){
            selectErrorBrand.setError('')
        }
    };

    const handleModelSelect = (value: string) => {
        setModelValue(value)
        if(value.length > 0){
            selectErrorModel.setError('')
        }
    }

    const handleYearSelect = (value: string) => {
        setYearValue(value)
        if(value.length > 0){
            selectErrorYear.setError('')
        }
    }

    const handleOwnerCountSelect = (value: string) => {
        setOwnerCountValue(value)
        if(value.length > 0){
            selectErrorOwnerCount.setError('')
        }
    }

    const handleChangePaymentType = (value: string) => {
        setPaymentTypeValue(value)
        if(value.length > 0){
            selectErrorPayment.setError('')
        }
    }

    const handleChangeTransportBody = (value: string) => {
        setTransportBodyType(value)
        if(value.length > 0) {
            selectTransportBodyError.setError('')
        }
    }

    const handleChangeSteeringWheel = (value: string) => {
        setSteeringWheelValue(value)
        if(value.length > 0) {
            selectSteeringWheelError.setError('')
        }
    }

    useEffect(() => {
        const list = getModelList(brand)
        if(list) {
            setModelList(list)
        }
    }, [brand]) // Generate model_list auto

    useEffect(()=>{
        const newYearList: IDropDownList[] = []
        let id = 1
        for(let i= new Date().getFullYear(); i>=1900; i--) {
            newYearList.push({id: id, content: String(i)})
            id++
        }
        setYearList(newYearList)
    }, [brand]) // Generate date_list then made auto

    useEffect(() => {
        const newOwnerList: IDropDownList[] = []
        const newPaymentTypeList: IDropDownList[] = []
        const newTransportBodyTypes: IDropDownList[] = []
        const newSteeringWheel: IDropDownList[] = []

        let id = 0;

        owners.map((owner) => {
            id++
            newOwnerList.push({id: id, content: owner.content})
        })

        paymentTypes.map((owner) => {
            id++
            newPaymentTypeList.push({id: id, content: owner.content})
        })

        traponsportBodyTypes.map((body) => {
            id++
            newTransportBodyTypes.push({id: id, content: body.content})
        })

        steeringWheel.map((wheel) => {
            id++
            newSteeringWheel.push({id: id, content: wheel.content})
        })

        setOwnerCountList(newOwnerList)
        setPaymentTypeList(newPaymentTypeList)
        setTransportBodyTypesList(newTransportBodyTypes)
        setSteeringWheelList(newSteeringWheel)
    }, [])

    const openFileInput = ()=> {
        (document.querySelector('#input-file') as HTMLInputElement).click();
    }

    const checkValidation = () => {
        if(brand !== '') {
            selectErrorBrand.setIsError(false)
        } else {
            selectErrorBrand.setIsError(true)
            selectErrorBrand.setError('Обязательное поле')
        }

        if(model !== '') {
            selectErrorModel.setIsError(false)
        } else {
            selectErrorModel.setIsError(true)
            selectErrorModel.setError('Обязательное поле')
        }

        if(year !== '') {
            selectErrorYear.setIsError(false)
        } else {
            selectErrorYear.setIsError(true)
            selectErrorYear.setError('Обязательное поле')
        }

        if(ownerCountValue !== '') {
            selectErrorOwnerCount.setIsError(false)
        } else {
            selectErrorOwnerCount.setIsError(true)
            selectErrorOwnerCount.setError('Обязательное поле')
        }

        if(paymentTypeValue) {
            selectErrorPayment.setIsError(false)
        } else {
            selectErrorPayment.setIsError(true)
            selectErrorPayment.setError('Обязательное поле')
        }

        if(downPaymentValue.length > 0) {
            inputErrorDownPayment.setIsError(false)
        } else {
            inputErrorDownPayment.setIsError(true)
            inputErrorDownPayment.setError('Обязательное поле')
        }

        if(loanTermValue.length > 0) {
            inputErrorLoanTerm.setIsError(false)
        } else {
            inputErrorLoanTerm.setIsError(true)
            inputErrorLoanTerm.setError('Обязательное поле')
        }

        if(rateValue.length > 0) {
            inputErrorRateValue.setIsError(false)
        } else {
            inputErrorRateValue.setIsError(true)
            inputErrorRateValue.setError('Обязательное поле')
        }

    }

    const handleSubmitForm = (e: FormEvent) => {
        e.preventDefault()

        if(paymentTypeValue === 'Кредит') {
            if(
                !inputErrorDownPayment.isError &&
                !inputErrorLoanTerm.isError &&
                !inputErrorRateValue.isError &&
                !inputHorsesPowerErrorValue.isError
            ){
                if(
                    !selectErrorBrand.isError &&
                    !selectErrorModel.isError &&
                    !selectErrorYear.isError &&
                    !selectErrorPayment.isError &&
                    !selectErrorModel.isError &&
                    !selectErrorPayment.isError &&
                    !selectTransportBodyError.isError &&
                    !selectSteeringWheelError.isError
                ) {
                    const transport: RequestBodyTransport = {
                        mark: brand,
                        model: model,
                        owner_type: '',
                        owner_count: ownerCountValue,
                        bought_price: Number(value.replace(/ /g, '')),
                        loan: paymentTypeValue === 'Кредит',
                        initial_payment: paymentTypeValue === 'Кредит' ? Number(downPaymentValue.replace(/ /g, '')) : 0,
                        loan_term: paymentTypeValue === 'Кредит' ? Number(loanTermValue.replace(/ /g, '')) : 0,
                        percentage: paymentTypeValue === 'Кредит' ? Number(rateValue.replace(/ /g, '')) : 0, // optional
                        writeoff_account: 1,
                        payment_order: order,
                        payment_period: period,
                        first_payment_date: '',
                        year: year,
                        body_type: transportBodyType,
                        horse_power: horsesPowerValue,
                        steering_wheel: steeringWheelValue,
                    }

                    const response = store.createTransport(transport)
                    store.setLoading(true)
                    response.then(response => {
                        if (response.status >= 200 && response.status < 300) {
                            setBrandValue('')
                            setModelValue('')
                            setYearValue('')
                            setOwnerCountValue('')
                            setPaymentTypeValue('')
                            setShow(false)
                            store.setLoading(false)
                            return store.fetchActives()
                        }
                    }).catch((e) => {
                        store.setError(e)
                    })
                }
            }
        } else {
            if(
                !selectErrorBrand.isError &&
                !selectErrorModel.isError &&
                !selectErrorYear.isError &&
                !selectErrorPayment.isError &&
                !selectErrorModel.isError &&
                !selectErrorPayment.isError
            ) {
                const transport: RequestBodyTransport = {
                    mark: brand,
                    model: model,
                    owner_type: '',
                    owner_count: '',
                    bought_price: Number(value.replace(/ /g, '')),
                    loan: paymentTypeValue === 'Кредит' ? true : false,
                    initial_payment: paymentTypeValue === 'Кредит' ? Number(downPaymentValue.replace(/ /g, '')) : 0,
                    loan_term: paymentTypeValue === 'Кредит' ? Number(loanTermValue.replace(/ /g, '')) : 0,
                    percentage: 1.0, // optional
                    writeoff_account: 1,
                    payment_order: '',
                    payment_period: '',
                    first_payment_date: '',
                    year: year,
                    body_type: transportBodyType,
                    horse_power: horsesPowerValue,
                    steering_wheel: steeringWheelValue,
                }

                const response = store.createTransport(transport)
                store.setLoading(true)
                response.then(response => {
                    if (response.status >= 200 && response.status < 300) {
                        setBrandValue('')
                        setModelValue('')
                        setYearValue('')
                        setOwnerCountValue('')
                        setPaymentTypeValue('')
                        setShow(false)
                        store.setLoading(false)
                        return store.fetchActives()
                    }
                }).catch((e) => {
                    store.setError(e)
                })
            }
        }
    }

    return (
       <>
           <SpinnerLoader loading={store.loading}/>
           <Form className="transport__modal-form" handleSubmit={handleSubmitForm}>
               <div className="transport__form-content">
                   <div className="transport__form-auto">
                       <div className='transport__form-auto_brand'>
                           <Select
                               selected={selectedBrand || null}
                               options={brandList}
                               placeholder='Выберите марку'
                               mode='rows'
                               classNameContainer={`dropdown__container ${selectErrorBrand.error ? 'error' : ''}`}
                               classNameSelect='dropdown__select'
                               classNameList='dropdown__list'
                               onChange={handleBrandSelect}
                               errorMessage={selectErrorBrand.error}
                           />
                           <Select
                               selected={selectedModel || null}
                               options={modelList}
                               placeholder='Выберите модель'
                               mode='rows'
                               classNameContainer={`dropdown__container ${selectErrorModel.error ? 'error' : ''}`}
                               classNameSelect='dropdown__select'
                               classNameList='dropdown__list'
                               onChange={handleModelSelect}
                               errorMessage={selectErrorModel.error}
                           />
                       </div>
                       <div className='transport__form-auto_info'>
                           <h3 className="auto__info-title">Информация о транспорте</h3>
                           <Select
                               selected={selectedYear || null}
                               options={yearList}
                               placeholder='Год выпуска'
                               mode='rows'
                               classNameContainer={`dropdown__container ${selectErrorYear.error ? 'error' : ''}`}
                               classNameSelect='dropdown__select'
                               classNameList='dropdown__list'
                               onChange={handleYearSelect}
                               errorMessage={selectErrorYear.error}
                           />
                           <Select
                               selected={selectedOwnerCount || null}
                               options={ownerCountList}
                               placeholder='Количество владельцев'
                               mode='rows'
                               classNameContainer={`dropdown__container ${selectErrorOwnerCount.error ? 'error' : ''}`}
                               classNameSelect='dropdown__select'
                               classNameList='dropdown__list'
                               onChange={handleOwnerCountSelect}
                               errorMessage={selectErrorOwnerCount.error}
                           />
                           <Select
                                selected={selectedTransportBodyType || null}
                                options={transportBodyTypesList}
                                placeholder='Тип кузова'
                                mode='rows'
                                classNameContainer={`dropdown__container ${selectTransportBodyError.error ? 'error' : ''}`}
                                classNameSelect='dropdown__select'
                                classNameList='dropdown__list'
                                onChange={handleChangeTransportBody}
                                errorMessage={selectTransportBodyError.error}
                           />
                           <Select
                                selected={selectedSteeringWheel || null}
                                options={steeringWheelList}
                                placeholder='Расположение руля'
                                mode='rows'
                                classNameContainer={`dropdown__container ${selectSteeringWheelError.error ? 'error' : ''}`}
                                classNameSelect='dropdown__select'
                                classNameList='dropdown__list'
                                onChange={handleChangeSteeringWheel}
                                errorMessage={selectSteeringWheelError.error}
                           />
                           <InputSum
                                value={horsesPowerValue}
                                type='text'
                                currency=''
                                placeholder='Количество лошадиных сил'
                                classNameCurrency='price__sum-currency'
                                setValue={setHorsesPowerValue}
                                setError={inputHorsesPowerErrorValue.setError}
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
                           value={value}
                           type='text'
                           currency='₽'
                           placeholder='Цена транспорта'
                           classNameCurrency='price__sum-currency'
                           setValue={setValue}
                           setError={inputError.setError}
                       />
                       { inputError.isError && <div>{inputError.error}</div> }
                       <Select
                           selected={selectedPaymentType || null}
                           options={paymentTypeList}
                           classNameContainer={`dropdown__container ${selectErrorPayment.error ? 'error' : ''}`}
                           classNameSelect='dropdown__select'
                           classNameList='dropdown__list'
                           placeholder='Тип денежных средств'
                           mode='rows'
                           onChange={handleChangePaymentType}
                           errorMessage={selectErrorPayment.error}
                       />

                       <div
                           className={`price__credit-container ${paymentTypeValue === "Кредит" ? 'active-credit' : ''}`}
                       >
                           <Credit
                               setOrder={setOrder}
                               setPeriod={setPeriod}
                               setBank={setBank}
                               bank={bank}
                               order={order}
                               period={period}
                               loanTermValue={loanTermValue}
                               setRateValue={setRateValue}
                               setDownPaymentValue={setDownPaymentValue}
                               setLoanTermValue={setLoanTermValue}
                               rateValue={rateValue}
                               downPaymentValue={downPaymentValue}
                               account={account}
                               setAccount={setAccount}
                           />
                       </div>
                   </div>
               </div>
               <div className="transport__form-actions">
                   <Button
                       className="transport__form-actions_cancel"
                       name='cancel'
                       textButton='Отменить'
                       onClick={handleClose}
                       type='button'
                   />
                   <Button
                       className={`transport__form-actions_submit`}
                       type="submit"
                       textButton='Подтвердить'
                       name='sumbit'
                       onClick={checkValidation}
                   />
               </div>
           </Form>
       </>
    )
})
