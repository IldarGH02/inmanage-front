import React, { useEffect, useRef } from "react";
import { IInventoryTableInput } from "../../../../../app/types/assets/IAssets";
import { ErrorMessage, Field, FormikErrors, FormikTouched } from "formik";

interface IInventoryTableProps {
    name: string,
    error: string | FormikErrors<IInventoryTableInput> | undefined,
    // touchedText: boolean
    touched: FormikTouched<IInventoryTableInput> | false,
    priceVal: string,
    amountVal: string,
    onRemove: ()=>void
}

export function InventoryTableItem({onRemove, name, error, touched, priceVal, amountVal}: IInventoryTableProps) {
    const amountRef = useRef<HTMLInputElement>(null)

    useEffect(()=>{
        // console.log(touched)
    }, [name])

    useEffect(()=>{
        (amountRef.current as HTMLInputElement).style.width = (((amountRef.current?.value.length??0 + 1) * 9) + 'px') as string
    }, [amountVal])

    function discharge(str:string): string {
        return str.replace(/[^0-9.]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }

    const getClass = (key: 'text' | 'amount' | 'price') => {
        if(touched) {
            console.log(touched.text)
        }
        
        if(key === 'text') {           
            if(touched) {
                if((error as FormikErrors<IInventoryTableInput>)?.text && touched.text) {
                    return (error as FormikErrors<IInventoryTableInput>).text
                }
            }
            return undefined
        }
        if(key === 'amount') {
            if(touched) {
                if((error as FormikErrors<IInventoryTableInput>)?.amount && touched.amount) {
                    return (error as FormikErrors<IInventoryTableInput>).amount
                }
            }
            return undefined
        }
        if(key === 'price') {
            if(touched) {
                if((error as FormikErrors<IInventoryTableInput>)?.price && touched.price) {
                    return (error as FormikErrors<IInventoryTableInput>).price
                }
            }
            return undefined
        }
        // return undefined   
    }

    return (
        <div className="inventory-table-item">
            <button className="inventory-table-item__remove-btn" type="button" onClick={onRemove}>–</button>
            <div className="inventory-table-item__input-wrapper">
                <div className={`inventory-table-input-container inventory-table-item__title${getClass('text')?'--error':''}`} >
                    <Field placeholder="Введите текст" name={`${name}.text`} type="text" className="inventory-table-item__input inventory-table-item__input-title" />
                </div>
                <ErrorMessage name={`${name}.text`} render={msg => <div className="inventory-table-item__warning">{msg}</div>} />
            </div>
            <div className="inventory-table-item__input-wrapper">
                <div className={`inventory-table-input-container inventory-table-item__amount${getClass('amount')?'--error':''}`}>
                    <Field value={discharge(String(amountVal))} name={`${name}.amount`} innerRef={amountRef} className="inventory-table-item__input inventory-table-item__input-amount" placeholder="0" type="text"/>
                    <p className="inventory-table-item__unit">шт.</p>
                </div>
                <ErrorMessage name={`${name}.amount`} render={msg => <div className="inventory-table-item__warning">{msg}</div>} />
            </div>
            <div className="inventory-table-item__input-wrapper">
                <div className={`inventory-table-input-container inventory-table-item__price${getClass('price')?'--error':''}`}>
                    <Field value={discharge(String(priceVal))} name={`${name}.price`} className="inventory-table-item__input" placeholder="0" type="text" />
                    <p className="inventory-table-item__unit">₽</p>
                </div>
                <ErrorMessage name={`${name}.price`} render={msg => <div className="inventory-table-item__warning">{msg}</div>} />
            </div>
        </div>
    )
}
