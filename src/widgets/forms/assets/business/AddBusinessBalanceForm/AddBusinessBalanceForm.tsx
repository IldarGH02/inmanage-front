import React, { useState } from "react";
import "./addBusinessBalanceForm.css";
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { InputSumForm } from "../../../elements/InputSumForm/InputSumForm";
import { DawIncomeBalance } from "../../../../elements/Daw/DawIncomeBalance/DawIncomeBalance";
import { InventoryTable } from "../../../elements/InventoryTable/InventoryTable";
import { IInventoryTable, IInventoryTableInput } from "../../../../../app/types/assets/IAssets";
import { ConfirmModal } from "../../../../elements/Modal/ConfirmModal/ConfirmModal";
import { Modal } from "../../../../elements/Modal/Modal";

let list: IInventoryTable[] = [
    {
        id: 1,
        text: "asasdasd",
        amount: 4,
        price: 4545,
        flag: false,
        added: false,
        delete: false
    }
] 

interface IAddBalanceForm {
    onClose: ()=>void,
}

interface IInitialValues {
    generalPriceAssets: string,
    generalPriceConsumables: string,
    assets: IInventoryTableInput[],
    consumables: IInventoryTableInput[]
}

export function AddBusinessBalanceForm({onClose}: IAddBalanceForm) {
    const [assetsList] = useState(list) // setAssetsList
    const [consumablesList] = useState(list) // setConsumablesList
    const [modalVisible, setModalVisible] = useState(false)
    // const [modalVisible, setModalVisible] = useState(false)

    const validationSchema = yup.object().shape({
        assets: yup.array().of(
            yup.object().shape({
                id: yup.number(),
                flag: yup.boolean(),
                text: yup.string().required('Обязательное поле для заполнения').max(30, `Допустимая длина превышает 30 символов`),
                amount: yup.string().required('Обязательное поле для заполнения').max(15, 'Допустимая длина превышена').lengthNumbersValidator('Не равно 0'),
                price: yup.string().required('Обязательное поле для заполнения').max(15, 'Допустимая длина превышена'),
            })
        ),
        consumables: yup.array().of(
            yup.object().shape({
                id: yup.number(),
                flag: yup.boolean(),
                text: yup.string().required('Обязательное поле для заполнения').max(30, `Допустимая длина превышает 30 символов`),
                amount: yup.string().required('Обязательное поле для заполнения').max(15, 'Допустимая длина превышена').lengthNumbersValidator('Не равно 0'),
                price: yup.string().required('Обязательное поле для заполнения').max(15, 'Допустимая длина превышена'),
            })
        ),
        generalPriceConsumables: yup.string(),
        generalPriceAssets: yup.string()
    })

    const checkError = () => {
       
    }

    function onEmptyList() {

    }

    function getPrice(list: IInventoryTableInput[]) {
        let price = 0
        price = list.reduce((accumulator, currentValue)=>accumulator+Number(currentValue.amount.replace(/ /g,''))*Number(currentValue.price.replace(/ /g,'')), 0)
        return String(price)
    }

    // const onCloseModal = (flag: boolean) => {
    //     if(flag) {

    //     }
    // }

    return ( 
        <Formik
            validationSchema = {validationSchema}
            initialValues={
                {
                    generalPriceAssets: '0',
                    generalPriceConsumables: '0',
                    assets: assetsList.map(el=>{
                        let newEl = {
                            ...el,
                            amount: String(el.amount),
                            price: String(el.price),
                        }
                        return newEl
                    }),
                    consumables: consumablesList.map(el=>{
                        let newEl = {
                            ...el,
                            amount: String(el.amount),
                            price: String(el.price),
                        }
                        return newEl
                    })
                } as IInitialValues
            }
            onSubmit={values => {
                console.log(values)
            }}
        >
            {({ errors, touched, values, setFieldValue }) => (
            <>
            {modalVisible && 
                <Modal onClose={()=>setModalVisible(false)}>
                    <ConfirmModal title="Удаление" text="Вы действительно хотите очистить список?" onClose={(flag: boolean)=>{
                        if(flag) {
                            setFieldValue("assets", [])
                            setFieldValue("consumables", [])
                        }
                        setModalVisible(false)
                    }}/>
                </Modal>
            } 
            <Form className="add-business-balance-form">
                <div className="add-business-balance-form__content">
                    <div className="add-business-balance-form__characteristic-block-wrapper">
                        <div className="add-business-balance-form__empty-indicator">
                            <div className="add-business-balance-form__empty-indicator-daw" onClick={()=>setModalVisible(true)}>
                                <DawIncomeBalance color="rgb(200, 200, 200)" onChangeDaw={onEmptyList} dawActive={(values.assets.length===0 && values.consumables.length===0)?true:false}/>
                            </div>
                            <div className="add-business-balance-form__empty-indicator-title">На балансе нет активов и расходников</div>
                        </div>
                        
                        <div className="add-business-balance-form__characteristic-block"> 
                            <div className="add-business-balance-form__block-title">Активы</div>
                            <div className="add-business-balance-form__inventory-table">
                                <InventoryTable
                                            name="assets"
                                            data={values.assets}
                                            error={errors.assets}
                                            touched={touched.assets}
                                            clearList={() => {
                                                setFieldValue("assets", []);
                                            } } onRemoveItem={function(): void {
                                                throw new Error("Function not implemented.");
                                            } }                                />
                                <div className="add-business-balance-form__item">
                                    <InputSumForm
                                        valuta="₽" 
                                        value={String(getPrice(values.assets))} 
                                        error={''}
                                        touched={false}
                                        name="generalPriceAssets"
                                        placeHolder="Общий баланс активов"
                                        background="rgb(241, 242, 246)"
                                        inputDisable={true}    
                                    />
                                </div>
                            </div>                             
                            
                        </div>
                    </div>
                    <div className="add-business-balance-form__about-card-block-wrapper">
                        <div className="add-business-balance-form__block-title" style={{marginTop: "70px"}}>Расходники</div>
                        <div className="add-business-balance-form__about-card-block">
                            <div className="add-business-balance-form__inventory-table">
                                <InventoryTable
                                            name="consumables"
                                            data={values.consumables}
                                            error={errors.consumables}
                                            touched={touched.consumables}
                                            clearList={() => {
                                                setFieldValue("consumables", []);
                                            } } onRemoveItem={function (): void {
                                                throw new Error("Function not implemented.");
                                            } }                                />
                                <div className="add-business-balance-form__item">
                                    <InputSumForm
                                        valuta="₽" 
                                        value={getPrice(values.consumables)} 
                                        error={''}
                                        touched={false}
                                        name="generalPriceConsumables"
                                        placeHolder="Общий баланс расходников"
                                        background="rgb(241, 242, 246)"
                                        inputDisable={true}    
                                    />
                                </div>
                            </div>       
                        </div>
                    </div>
                </div>
                
                <div className="add-business-balance-form__btns">
                    <button className="cancel-btn add-business-balance-form__cancel-btn" type="button" onClick={onClose}>Отменить</button>
                    <button className="add-business-balance-form__add-btn" type="submit" onClick={()=>{
                        // console.log(values)
                        checkError()
                    }}>Подтвердить</button>
                </div>
            </Form>
            </>
        )}
        </Formik>
    )
}
