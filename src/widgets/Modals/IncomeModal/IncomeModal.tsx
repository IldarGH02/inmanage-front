// import { FC, useEffect, useState } from "react"
// import { Link } from "react-router-dom"
// import { observer } from "mobx-react-lite"

// import { IncomeStore } from "../../../app/store/balanse/incomeStore.ts";
// import BalanceStore from "../../../app/store/balanse/balanceStore.ts";

// import { ExpenseItem, ExpenseList, IExpenseSliderCategory, IIncome, IIncomeBalance } from "../../../app/types/balance/IBalance"
// import { Card } from "../../../app/types/dto/DtoTypes.ts";
// import { ExpenseDropDownList } from "../../../entities/Balance/ExpenseBalance/ExpenseDropDownList/ExpenseDropDownList"
// // import { IncomeAssets } from "../../../entities/Balance/IncomeBalance/IncomeAssets/IncomeAssets"
// import { SelectCardModal } from "../../elements/Modal/balance/SelectCardModal/SelectCardModal.tsx"
// import { Modal } from "../../elements/Modal/Modal.tsx"
// import { Categories } from "../../../entities/models/Categories.tsx";
// import { IncomeSubCategories } from "../../Balance/Income/IncomeCategories/IncomeCategories.tsx";
// import { categories, otherCategories } from "../../../features/constants/categories.ts";
// import { Button } from "../../../shared/ui/Buttons/Button.tsx"

// interface IIncomeModal {
//     handleCloseModal: React.MouseEventHandler<HTMLButtonElement>
//     classNameActive: string
// }

// export const IncomeModal: FC<IIncomeModal> = observer(({handleCloseModal, classNameActive}) => {
//     const [storeIncome] = useState(
//         () => new IncomeStore()
//     )
//     const [storeBalance] = useState(
//         () => new BalanceStore()
//     )

//     const [activeJob, setActiveJob] = useState(true)
//     const [activeOther, setActiveOther] = useState(false)

//     const [valueCategory, setValueCategory] = useState('')
//     const [comment, setComment] = useState<string>('')
//     const [modalVisible, setModalVisible] = useState(false)
//     const [chacked, setChecked] = useState<boolean>(false)
//     const [checkedElement, setCheckedElement] = useState<string>('')

//     const [category, setCategory] = useState(0)
//     const [activeCategory, setActiveCategory] = useState<number|null>(null)

//     const [jobList, setJobList] = useState<ExpenseList>([])
//     const [valueDDList, setValueDDList] = useState('')
//     const [idDDList, setIdDDList] = useState<number | null>(null)
//     const [idCard, setIdCard] = useState<number|null>(null)
//     const [nextBtnVisible, setNextBtnVisible] = useState(false)

//     const [valueSum, setValueSum] = useState('')
//     const [cardList, setCardList] = useState<Card[]>([])
//     const [errorInput, setErrorInput] = useState<string>('')

//     const [positionOfCategoryAssets, setPositionOfCategoryAssets] = useState<IExpenseSliderCategory[]>([])

//     useEffect(() => {
//         if(storeBalance) {
//             const cardList: Card[] = [];
//             const favouriteCardsId = storeBalance.favourite_cards as number[];
//             storeBalance.card_list?.forEach(card => {
//                 if(favouriteCardsId?.includes(card.id)) {
//                     cardList.push(card)
//                 }
//             })
//             setCardList(cardList)
//             console.log(cardList)
//         }
//     }, [storeBalance]);

//     useEffect(() => {
//         storeIncome.fetchJobList()
//         if(storeIncome.jobList) {
//             const jobItem = storeIncome.jobList.map((item) => {
//                 const obj: ExpenseItem = {
//                     id: item.id,
//                     name: item.name,
//                     active: false
//                 }
//                 return obj
//             })
//             setJobList(jobItem)
//             console.log(storeIncome.jobList)
//         }
//     }, [storeIncome])

//     useEffect(()=>{
//         let flag = false
//         if(category === 0) { //работа
//             const activeID = jobList.find(el=>el.active)
//             if(errorInput === '' &&
//                activeID &&
//                valueSum !=='' && 
//                valueSum !== '0' &&
//                idCard) {
//                 flag = true
//             }
//         }
//         if(category===1 && activeCategory && idDDList && idCard&&valueSum!==''&&valueSum!=='0') { //активы
//             flag = true
//         }
//         if(category===2) { //проект
//             flag = true
//         }
//         setNextBtnVisible(flag)
        
//     }, [valueSum, activeCategory, idDDList, idCard, category, jobList, errorInput])

//     useEffect(() => {
//         setValueDDList('')
//         setIdDDList(null)
//     }, [positionOfCategoryAssets, activeCategory])

//     const clickItemCategoryAssets = (data: IExpenseSliderCategory[]) => {
//         setPositionOfCategoryAssets(data)
//     }

//     // const removePosition = (id: number) => {
//     //     const newList = listJobBlock.filter(el=>{
//     //         if(el.id!==id) {
//     //             return el
//     //         }
//     //     })
//     //     setListJobBlock(newList)
//     // }

//     const closeSelectCarModal = (id?: number) => {
//         if(id && storeBalance.balance) {
//             const newFavoriteCards: number[] = Array.from(new Set([...storeBalance.balance.favourite_cards, id]))
//             storeBalance.createNewFavouriteCard(newFavoriteCards)
//             setModalVisible(false)
//         } else {
//             setModalVisible(false)
//         }
//     }

//     const handleChangeValueJob = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.value;
//         setValueCategory(value)
//     }

//     const handleChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.value;
//         setComment(value)
//     }

//     const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value = e.target.checked;
//         const id = e.target.id;
//         if(value) {
//             setChecked(value)
//             setCheckedElement(id)
//         }
//     }

//     const handleOpenModal = () => {
//         // storeIncome.createNewWork(valueCategory, null, Number(valueSum), comment)

//     }

//     const handleClickCreateIncome = () => {
//         if(nextBtnVisible) {
//             if(category===0) { //работа
//                 const activeID = jobList.find(el=>el.active)
//                 const objWork: IIncome = {
//                     project: null,
//                     work: activeID!.id,
//                     funds: Number(valueSum.replace(/ /g,'')),
//                     writeoff_account: idCard!,
//                     comment: comment
//                 }

//                 storeIncome.createNewIncome(objWork)
//             }
//             if(category===1) { //активы
//                 // type typeAssets = 'properties' | 'transport' | 'business'
//                 const objIncome: IIncomeBalance = {
//                     funds: Number(valueSum.replace(/ /g,'')),
//                     comment: null,
//                     writeoff_account: idCard!
//                 }
                
//                 switch (activeCategory as number) {
//                     case 1: {
//                         storeIncome.updateActivesIncome('properties', idDDList, [objIncome])
//                         break;
//                     }
//                     case 2: {
//                         storeIncome.updateActivesIncome('transport', idDDList, [objIncome])
//                         break;
//                     }
        
//                     case 3: {
//                         storeIncome.updateActivesIncome('business', idDDList, [objIncome])
//                         break;
//                     }
                        
//                     default:
//                         break;
//                 }
//             }
//             if(category===2) { //проект
                
//             }
            
//         }
//     }

//     const handleChooseItem = () => {
//         jobList.map((item) => {
//             if(item.id === Number(checkedElement)) {
//                     ''
//             }
//         })
//     }

//     const handleChangeWindow = (e: React.MouseEvent<HTMLElement>) => {
//         // const elemValue = e.currentTarget;
//         // console.log(elemValue)
//     }

//     const handleChooseOther = (e: React.MouseEvent<HTMLButtonElement>) => {
//         const value = e.currentTarget.name;

//         if(value === 'Работа') {
//             setActiveJob(true)
//         } else {
//             setActiveJob(false)
//         }

//         if(value === 'Другое') {
//             setActiveOther(true)
//         } else {
//             setActiveOther(false)
//         }
//     }

//     return (
//         <>
//             {modalVisible && storeBalance.balance &&
//                 <Modal onClose={()=>setModalVisible(false)}>
//                     <SelectCardModal data={storeBalance.balance.card_list} onClose={closeSelectCarModal}/>
//                 </Modal>
//             }
//             <div className={`balance__income-modal ${classNameActive}`}>
//                 <h2 className="income__modal-title">Новая операция</h2>
//                 <div className="income__modal-content">
//                         <Categories
//                             onChangeCategory={setCategory}
//                             chooseCategory={category}
//                             categories={categories}
//                             value={valueSum}
//                             length={10}
//                             setValue={setValueSum}
//                             setErrorInput={setErrorInput}
//                             showAddCardModal={() => setModalVisible(true)}
//                             favoriteCards={cardList}
//                             onClickItem={setIdCard}
//                             otherCategories={otherCategories}
//                             choose={handleChooseOther}
//                             activeJob={activeJob}
//                             activeOther={activeOther}
//                             onClick={handleChangeWindow}
//                         />
//                         <div className="income__modal-categories">
//                             {category === 0 &&
//                                 <IncomeSubCategories
//                                     data={jobList}
//                                     fromTitle={`С какой работы?`}
//                                     classNameCategory={`income__job-categories`}
//                                     classNameTitle={`С какой работы?`}
//                                     handleClick={() => {}}
//                                 />
//                             }

                            
//                             {category === 2 &&
//                                 <IncomeSubCategories
//                                     data={jobList}
//                                     fromTitle={`С какого проекта?`}
//                                     classNameCategory={`income__job-categories`}
//                                     classNameTitle={`С какой работы?`}
//                                     handleClick={handleChooseItem}
//                                 />
//                             }
//                             {category === 1 &&
//                                 <>
//                                     <div className="income__category-title active-title">Категория актива:</div>
//                                     <IncomeAssets
//                                         activeCategory={activeCategory}
//                                         onClickItem={clickItemCategoryAssets}
//                                         onSetActiveCategory={setActiveCategory}
//                                     />

//                                     {positionOfCategoryAssets && activeCategory &&
//                                         <div className="income__modal-position">
//                                             <div className="income__position-title">Выберите позицию:</div>
//                                             <div className="income__position-ddlist">
//                                                 <ExpenseDropDownList
//                                                     idContent="addExpense-addIncome-DDL-content"
//                                                     idTitle="addExpense-addIncome-DDL-title"
//                                                     data={positionOfCategoryAssets}
//                                                     setValue={(val: string, id: number) => {
//                                                         setValueDDList(val)
//                                                         setIdDDList(id)
//                                                     }}
//                                                     value={valueDDList}
//                                                     placeholder={'Выберите актив'}
//                                                 />
//                                             </div>
//                                         </div>
//                                     }
//                                 </>
//                             }
//                             <div className="income__modal-actions">
//                                 <Link to="/balance" className="cancel-btn income-modal__cancel">Отменить</Link>
//                                 <button
//                                     className={`income__modal-submit${nextBtnVisible ? '--active' : ''}`}
//                                     onClick={handleClickCreateIncome}>
//                                     Подтвердить
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 <Button
//                     className="income__modal-close"
//                     onClick={handleCloseModal}
//                     textButton="X"
//                     type="button"
//                     name="open-modal"
//                 />
//             </div>
//         </>
//     )
// })