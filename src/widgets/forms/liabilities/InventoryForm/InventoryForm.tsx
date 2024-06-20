import React, { useState } from "react";
import "./inventoryForm.css";
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { IInventoryTable, IInventoryTableInput } from "../../../../app/types/assets/IAssets";
import { ConfirmModal } from "../../../elements/Modal/ConfirmModal/ConfirmModal";
import { DawIncomeBalance } from "../../../elements/Daw/DawIncomeBalance/DawIncomeBalance";
import { InventoryTable } from "../../elements/InventoryTable/InventoryTable";
import { InputSumForm } from "../../elements/InputSumForm/InputSumForm";
import { Link, useParams } from "react-router-dom";
import { Modal } from "../../../elements/Modal/Modal";

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

interface IInitialValues {
    generalPriceAssets: string,
    generalPriceConsumables: string,
    assets: IInventoryTableInput[],
    consumables: IInventoryTableInput[]
}

export function InventoryForm() {
    const {id} = useParams()
    const [assetsList] = useState(list) //setAssetsList
    const [modalVisible, setModalVisible] = useState(false)

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

    return ( 
        <Formik
            validationSchema = {validationSchema}
            initialValues={
                {
                    generalPriceAssets: '0',
                    assets: assetsList.map(el => {
                        let newEl = {
                            ...el,
                            amount: String(el.amount),
                            price: String(el.price),
                        };
                        return newEl;
                    }),
                } as unknown as IInitialValues
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
                        }
                        setModalVisible(false)
                    }}/>
                </Modal>
            } 
            <Form className="inventory-form">
                <div className="inventory-form__content">
                    <div className="inventory-form__characteristic-block-wrapper">
                        <div className="inventory-form__empty-indicator">
                            <div className="inventory-form__empty-indicator-daw" onClick={()=>setModalVisible(true)}>
                                <DawIncomeBalance color="rgb(200, 200, 200)" onChangeDaw={onEmptyList} dawActive={values.assets.length===0?true:false}/>
                            </div>
                            <div className="inventory-form__empty-indicator-title">Инвентарь отсутствует</div>
                        </div>
                        
                        <div className="inventory-form__characteristic-block"> 
                            <div className="inventory-form__inventory-table">
                                <InventoryTable
                                            name="assets"
                                            data={values.assets}
                                            error={errors.assets}
                                            touched={touched.assets}
                                            clearList={() => {
                                                setFieldValue("assets", []);
                                            } } onRemoveItem={function (): void {
                                                throw new Error("Function not implemented.");
                                            } }                                />
                            </div>                             
                        </div>
                    </div>
                    <div className="inventory-form__about-card-block-wrapper">
                        <div className="inventory-form__about-card-block">
                            <div className="inventory-form__item">
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
                
                <div className="inventory-form__btns">
                    <Link to={`/liabilities/property/${id}`} className="cancel-btn inventory-form__cancel-btn">Отменить</Link>
                    <button className="inventory-form__add-btn" type="submit" onClick={()=>{
                        checkError()
                    }}>Подтвердить</button>
                </div>
            </Form>
            </>
        )}
        </Formik>
    )
}
