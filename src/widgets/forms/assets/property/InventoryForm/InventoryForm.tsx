import React, { useEffect, useState } from "react";
import "./inventoryForm.css";
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { IInventory, IInventoryTable, IInventoryTableInput } from "../../../../../app/types/assets/IAssets";
import { ConfirmModal } from "../../../../elements/Modal/ConfirmModal/ConfirmModal";
import { DawIncomeBalance } from "../../../../elements/Daw/DawIncomeBalance/DawIncomeBalance";
import { InventoryTable } from "../../../elements/InventoryTable/InventoryTable";
import { InputSumForm } from "../../../elements/InputSumForm/InputSumForm";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Modal } from "../../../../elements/Modal/Modal";
import { useTypedSelector } from "../../../../../features/hooks/useTypedSelector";
import { actionTypes } from "../../../../../app/store/types/types";
import { addPropertyInventory, hideLoader } from "../../../../../app/store/actions/assets/assetsActions";
import { useDispatch } from "react-redux";

// let list: IInventoryTable[] = [
//     {
//         id: 1,
//         text: "asasdasd",
//         amount: 4,
//         price: 4545,
//         flag: false,
//     }
// ] 

interface IInitialValues {
    generalPriceAssets: string,
    generalPriceConsumables: string,
    assets: IInventoryTableInput[],
    consumables: IInventoryTableInput[]
}

export function InventoryForm() {
    const state = useTypedSelector(state => state.assetsReducer)
    const {id} = useParams()
    // const [assetsList, setAssetsList] = useState<IInventoryTable[]>([])
    const [modalVisible, setModalVisible] = useState(false)
    const [idInventoryObj, setIdInventoryObj] = useState(-1)
    // const [inventoryList, setInventoryList] = useState<IInventoryTable[]>([])
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getInventory = () => {
        if(state.assets!==null) {
            console.log(state.assets)
            const inventoryObj = state.assets?.properties?.properties.find(el=>el.id===Number(id))?.equipment!
            const inventoryListTmp: IInventoryTable[] = inventoryObj!.assets.map(el=>{
                return {
                    id: el.id!,
                    text: el.text,
                    price: el.price,
                    amount: el.count, //!!!
                    added: el.added,
                    delete: el.delete,
                    flag: false // нужно корректировать тип
                }
            })
            setIdInventoryObj(inventoryObj.id)
            return inventoryListTmp!
        } 
        return []
    }

    const [assetsList] = useState<IInventoryTable[]>(()=>getInventory()) //setAssetsList

    useEffect(()=>{
        if(state.assets===null) {
            navigate(`/assets/property/${id}`)
        }
    }, [state.assets])

    const validationSchema = yup.object().shape({
        assets: yup.array().of(
            yup.object().shape({
                id: yup.number(),
                // flag: yup.boolean(),
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
                    generalPriceAssets: assetsList.length !== 0 ? String(assetsList.reduce((s, el) => Number(el) + s, 0)) : '0',
                    assets: assetsList.map(el => {
                        let newEl = {
                            ...el,
                            delete: false,
                            amount: String(el.amount),
                            price: String(el.price),
                        };
                        return newEl;
                    }),
                } as unknown as IInitialValues
            }
            onSubmit={values => {
                console.log(values)
                const inventory: IInventory[] = values.assets.map(el=>{
                    return (
                        {
                            text: el.text,
                            price: Number(el.price.replace(/ /g,'')),
                            count: Number(el.amount.replace(/ /g,'')), 
                            // flag: el.flag
                            added: el.added,
                            delete: el.delete 
                        }
                    )
                })
                // let property = state.assets?.properties?.properties.find(el=>el.id===Number(id))
                // property!.equipment!.assets = inventory
                // property!.equipment!.total_actives_cost = Number(values.generalPriceAssets.replace(/ /g,''))
                const res = addPropertyInventory(actionTypes.ADD_PROPERTY_INVENTORY, inventory, idInventoryObj, Number(id))
                res.then(e => {
                    dispatch(e!);
                    navigate(`/assets/property/${id}`)
                })
                .catch((e) => {
                    dispatch(hideLoader(actionTypes.HIDE_LOADER))
                    console.log(e)
                })
                
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
                                    onRemoveItem={(id: number)=>{
                                        setFieldValue("assets", values.assets.map(el=>{
                                            if(el.id===id) {
                                                el.delete = true
                                            }
                                            return el
                                        }))
                                    }}
                                    clearList={()=>{
                                        // setFieldValue("assets", [])
                                        setFieldValue("assets", values.assets.map(el=>{
                                            el.delete = true
                                            return el
                                        }))
                                    }}
                                />
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
                    <Link to={`/assets/property/${id}`} className="cancel-btn inventory-form__cancel-btn">Отменить</Link>
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
