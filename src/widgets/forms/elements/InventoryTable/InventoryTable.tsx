import React, { useEffect, useRef, useState } from "react";
import "./inventoryTable.css";
import { IInventoryTableInput } from "../../../../app/types/assets/IAssets";
import { FieldArray, FormikErrors, FormikTouched } from "formik";
import { InventoryTableItem } from "./InventoryTableItem/InventoryTableItem";

interface IInventoryTableProps {
    data: IInventoryTableInput[],
    name: string,
    error: string | string[] | FormikErrors<IInventoryTableInput>[] | undefined,
    touched:  FormikTouched<IInventoryTableInput>[] | undefined,
    clearList: ()=>void,
    onRemoveItem: (id: number) => void 
}

export function InventoryTable({data, onRemoveItem, clearList, name, error, touched}: IInventoryTableProps) {
    const amountRef = useRef<HTMLInputElement>(null)
    const [amountVal, setAmountVal] = useState('')
    const [priceVal, setPriceVal] = useState('')

    useEffect(()=>{
        (amountRef.current as HTMLInputElement).style.width = (((amountRef.current?.value.length??0 + 1) * 9) + 'px') as string
    }, [amountVal])

    // useEffect(()=>{
    //     console.log("data", data)
    // }, [data])

    function discharge(str:string): string {
        return str.replace(/[^0-9.]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }

    const changeInputPrice = (event: React.FormEvent<HTMLInputElement>) => {
        setPriceVal(event.currentTarget.value)
    }

    const changeInputAmount = (event: React.FormEvent<HTMLInputElement>) => {
        setAmountVal(event.currentTarget.value)
    }

    return (
        <FieldArray name={name}>
            {({push}) => (
                <div className="inventory-table">
                    <div className="inventory-table__head">
                        <div className="inventory-table__head-item">наименование</div>
                        <div className="inventory-table__head-item">количество</div>
                        <div className="inventory-table__head-item">стоимость</div>
                    </div>
                    <div className="inventory-table__body">
                        {data.map((el, i)=>{
                            if(!el.delete) {
                                return (
                                    <InventoryTableItem 
                                        name={`${name}[${i}]`}
                                        priceVal={el.price}
                                        amountVal={el.amount} 
                                        error={error ? error[i] : ''}
                                        touched={Array.isArray(touched) ? touched[i] : false}
                                        onRemove={()=>{
                                            // remove(i)
                                            onRemoveItem(el.id)
                                        }}
                                        key={el.id}
                                    />
                                )
                            }
                        })}
                    </div>
                    <div className="inventory-table-item inventory-table-item__add-panel">
                        <button className="inventory-table-item__add-btn" type="button" onClick={()=>{
                            let maxId = 0
                            data.forEach(el=>{
                                if(el.id > maxId) {
                                    maxId = el.id
                                }
                            })
                            const obj = {
                                id: maxId+1,
                                text: "",
                                price: priceVal.replace(/ /g,''),
                                amount: amountVal.replace(/ /g,''),
                                added: true,
                                delete: false
                            }
                            push(obj)
                        }}>Добавить</button>
                        <div className="inventory-table-item__input-wrapper">
                            <div className="inventory-table-input-container inventory-table-item__amount">
                                <input ref={amountRef} className="inventory-table-item__input inventory-table-item__input-amount" type="text" value={amountVal} onChange={changeInputAmount} onKeyUp={()=>{setAmountVal(discharge(amountVal))}} placeholder="0"/>
                                <p className="inventory-table-item__unit">шт.</p>
                            </div>
                        </div>
                        <div className="inventory-table-item__input-wrapper">
                            <div className="inventory-table-input-container inventory-table-item__price">
                                <input className="inventory-table-item__input" type="text" placeholder="0" value={priceVal} onChange={changeInputPrice} onKeyUp={()=>{setPriceVal(discharge(priceVal))}} />
                                <p className="inventory-table-item__unit">₽</p>
                            </div>
                        </div>
                    </div>
                    <div className="inventory-table__clear-btn-wrapper">
                        <button className="inventory-table__clear-btn" type="button" onClick={clearList}>Очистить все</button>
                    </div>
                </div>
            )}
        </FieldArray>
    )
}