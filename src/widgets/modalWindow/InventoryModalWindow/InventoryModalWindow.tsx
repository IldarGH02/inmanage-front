// import React, { useContext, useEffect, useState } from "react";
// import { usePropertyInventory } from "../../../features/hooks/liabilities/property/propertyInventoryHooks";
// import { ModalContext } from "../../../features/context/modalProperty/ModalContext";
// import "./inventoryModalWindow.css"

// interface IInventoryModalWindow {
//     id: number
// }

// export function InventoryModalWindow({id}: IInventoryModalWindow) {
//     const {hide} = useContext(ModalContext)
//     const {inventoryArr, addInventory, removeInventory, getInventory, count, generalPrice} = usePropertyInventory()
//     const [newItemVisible, setNewItemVisible] = useState(false)
//     const [valueName, setValueName] = useState('')
//     const [valuePrice, setValuePrice] = useState<string>('')

//     useEffect(()=>{
//         getInventory(id)
//     },[])

//     function discharge(str:string): string {
//         return str.replace(/[^0-9.]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, " ")
//     }

//     const changeName = (event: React.FormEvent<HTMLInputElement>) => {
//         const maxLength = 50
//         let length = event.currentTarget.value.replace(/ /g,'').length   
//         if(length<=maxLength) {
//             setValueName(event.currentTarget.value)
//         }  
//     }

//     const changePrice = (event: React.FormEvent<HTMLInputElement>) => {
//         const maxLength = 12
//         let length = event.currentTarget.value.replace(/ /g,'').length   
//         if(length<=maxLength) {
//             setValuePrice(event.currentTarget.value)
//         }       
//     }

//     const addNewItem = () => {
//         if(valueName!='' && Number(valuePrice.replace(/ /g,''))>0) {
//             let price = Number(valuePrice.replace(/ /g,''))
//             let itemTmp = {
//                 property_id: id,
//                 name: valueName,
//                 price: price
//             }
//             addInventory(itemTmp, id)
//             // setArrInventory(prev=>[itemTmp, ...prev])
//             setNewItemVisible(false);
//             setValuePrice('')
//             setValueName('')
//             // setCount(count+1)
//             // setGeneralPrice(generalPrice+price)
//         }
//     }

//     const removeItem = (id: number) => {        
//         removeInventory(id)
//     }

//     return (
//         <div className="inventory-modal">
//             <div className="inventory-modal__title">
//                 <h1>Инвентаризация</h1>
//                 <button className="inventory-modal__close-btn" onClick={hide}>x</button>
//             </div>
//             <div className="inventory-modal__content">
//                 <div className="inventory-modal__add-btn" onClick={()=>setNewItemVisible(true)}>+</div>
//                 <div className="inventory-modal__list">
//                     {newItemVisible && 
//                         <div className="inventory-modal__new-item">
//                             <div className="inventory-modal__new-item-info">
//                                 <input type="text" className="inventory-modal__new-item-name" placeholder="Введите название" value={valueName} onChange={changeName}></input>
//                                 <span><input type="text" className="inventory-modal__new-item-price" value={valuePrice} placeholder="Введите цену" onChange={changePrice} onKeyUp={()=>setValuePrice(discharge(valuePrice))}></input> <b> ₽</b></span>
//                             </div>
//                             <div className="inventory-modal__new-item-add-btn" onClick={addNewItem}>+</div>
//                         </div>
//                     }
//                     {inventoryArr.map((item) => {
//                         return (
//                             <div className="inventory-modal__item" key={item.id}>
//                                 <div className="inventory-modal__item-info">
//                                     <div className="inventory-modal__item-name">{item.name}</div>
//                                     <div className="inventory-modal__item-price">{item.price.toLocaleString()} ₽</div>
//                                 </div>
//                                 <div className="inventory-modal__item-remove-btn" onClick={()=>removeItem(1)}>x</div>
//                             </div>
//                         )
//                     })}
//                     {/* <div className="inventory-modal__item">
//                         <div className="inventory-modal__item-info">
//                             <div className="inventory-modal__item-name">Название</div>
//                             <div className="inventory-modal__item-price">25000 ₽</div>
//                         </div>
//                         <div className="inventory-modal__item-remove-btn">x</div>
//                     </div> */}
//                 </div>
//                 <div className="inventory-modal__details">
//                     <div className="inventory-modal__general-count">
//                         Количество:  <b>{count} шт.</b>
//                     </div>
//                     <div className="inventory-modal__general-price">
//                         Общая сумма:  <b>{generalPrice.toLocaleString()} ₽</b>
//                     </div>
//                 </div>
//             </div>
//             <div className="inventory-modal__footer">
//                 <button className="inventory-modal__confirm-btn">Подтвердить</button>
//                 <button className="inventory-modal__cancel-btn" onClick={hide}>Отменить</button>   
//             </div>
//         </div>
//     )
// }