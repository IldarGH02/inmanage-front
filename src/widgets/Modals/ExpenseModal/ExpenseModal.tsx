// import { useEffect, useState } from "react"
// import "./addExpensePage.css"
// import { ExpenseCategories } from "../../../entities/Balance/ExpenseBalance/ExpenseCategories/ExpenseCategories"

// import { ExpenseSliderFinance } from "../../../entities/Balance/ExpenseBalance/ExpenseSlider/ExpenseSliderFinance/ExpenseSliderFinance"
// import {Balance, Card, IExpenseBalance, IExpenseSliderCategory} from "../../../app/types/balance/IBalance"
// import { ExpenseDropDownList } from "../../../entities/Balance/ExpenseBalance/ExpenseDropDownList/ExpenseDropDownList"
// import "../../../widgets/elements/buttons/CancelBtn/cancelBtn.css";
// import { Background } from "../../../widgets/elements/Background/Background"
// import { Link, useNavigate } from "react-router-dom"
// import { addExpenseAssetsLiabilities, addFavoriteCard, addPersonalExpense, getBalance, getPersonalExpenseCategories, hideLoader, showLoader } from "../../../app/store/actions/balance/balanceActions"
// import { actionTypesBalance } from "../../../app/store/types/balanceTypes"
// import { ExpenseCategoriesList } from "../../../entities/Balance/ExpenseBalance/ExpenseSlider/ExpenseCategoriesList/ExpenseCategoriesList"
// import { Modal } from "../../elements/Modal/Modal.tsx"
// import { SelectCardModal } from "../../elements/Modal/balance/SelectCardModal/SelectCardModal.tsx"
// import { actionTypes } from "../../../app/store/types/types"
// import { updateAssetsExpense } from "../../../app/store/actions/assets/assetsActions"
// import { IAssetsBusiness, IAssetsProperty, IAssetsTransport } from "../../../app/types/actives/ActivesTypes.ts"
// import { updateLiabilitiesExpense } from "../../../app/store/actions/liabilities/liabilitiesActions"
// import { actionTypesLiabilities } from "../../../app/store/types/liabilitiesTypes"
// import { PersonalExpensesBlock } from "../../../entities/Balance/ExpenseBalance/PersonalExpensesBlock/PersonalExpensesBlock"
// import { PersonalExpensesBlockBig } from "../../../entities/Balance/ExpenseBalance/PersonalExpensesBlock/PersonalExpensesBlockBig"
// import { Substrate } from "../../elements/Modal/balance/Substrate/Substrate.tsx"
// import { loadIconsData } from "../../../entities/Balance/ExpenseBalance/PersonalExpensesBlock/iconData"
// import { SpinnerLoader } from "../../elements/SpinnerLoader/SpinnerLoader.tsx"

// import walletBckg from '../../../shared/assets/img/balance/walletBckg.png'
// import {observer} from "mobx-react-lite";
// import BalanceStore from "../../../app/store/balanse/balanceStore.ts";
// import { categories } from "../../../features/constants/categories.ts";
// import {ActivesStore} from "../../../app/store/activesStore.ts";

// interface IIconBalance {
//     id: number,
//     src: string
// }

// export const ExpenseModal = observer(() => {
//     const [storeBalance] = useState(
//         () => new BalanceStore()
//     )

//     const [storeAssets] = useState(
//         () => new ActivesStore()
//     )

//     // const [listBlock, setListBlock] = useState<IExpenseListBlock[]>(arrBlock)
//     const [category, setCategory] = useState(0)
//     const [valueDDListAssets, setValueDDListAssets] = useState('')
//     const [valueDDListLiabilities, setValueDDListLiabilities] = useState('')
//     const [nextBtnVisible, setNextBtnVisible] = useState(false)
//     const [valueSum, setValueSum] = useState('')
//     const [alertSum, setAlertSum] = useState('')

//     const [modalVisible, setModalVisible] = useState(false)
//     const [idCard, setIdCard] = useState<number|null>(null)
//     const [idDDListAssets, setIdDDListAssets] = useState<number|null>(null)
//     const [idDDListLiabilities, setIdDDListLiabilities] = useState<number|null>(null)
//     const [activeCategoryAssets, setActiveCategoryAssets] = useState<number|null>(null)
//     const [activeCategoryLiabilities, setActiveCategoryLiabilities] = useState<number|null>(null)

//     const [cardList, setCardList] = useState<Card[] | null>([])
//     // const [iconsList, setIconsList] = useState<IExpensePersonalIcons[]>([])

//     const navigate = useNavigate()

//     const [positionOfCategoryAssets, setPositionOfCategoryAssets] = useState<IExpenseSliderCategory[]>([])
//     const [positionOfCategoryLiabilities, setPositionOfCategoryLiabilities] = useState<IExpenseSliderCategory[]>([])
//     const [substrateVisible, setSubstrateVisible] = useState(false)

//     const [allIcons] = useState<IIconBalance[]>(loadIconsData())
//     const [idActiveIcon, setIdActiveIcon] = useState<number|null>(null)
//     const [titleActiveIcon, setTitleActiveIcon] = useState('')

//     useEffect(()=>{
//         if(storeBalance.balance === null) {
//             storeBalance.fetchBalance()
//                 const cardListTmp: Card[] = [];
//                 const favoriteCardsId = (storeBalance.favourite_cards as number[]);
//                 (storeBalance.card_list as Card[]).forEach(el=>{
//                     if(favoriteCardsId.includes(el.id)) {
//                         cardListTmp.push(el)
//                     }
//                 })
//                 setCardList(cardListTmp)
//         } else {
//             const cardListTmp: Card[] = [];
//             const favoriteCardsId = (storeBalance.favourite_cards as number[]);
//             (storeBalance.card_list as Card[]).forEach(el=>{
//                 if(favoriteCardsId.includes(el.id)) {
//                     cardListTmp.push(el)
//                 }
//             })
//             setCardList(cardListTmp)
//         }
//     }, [storeBalance])

//     useEffect(()=>{
//         if(state.personalCategories===null) {
//             dispatch(showLoader(actionTypesBalance.SHOW_LOADER))
//             const res = getPersonalExpenseCategories(actionTypesBalance.GET_PERSONAL_EXPENSE_CATEGORIES)
//             res.then(e => {
//                 // setIconsList(e!.payload.icons)
//                 dispatch(e!)
//             })
//                 .catch((e) => {
//                     dispatch(hideLoader(actionTypes.HIDE_LOADER))
//                     console.log(e)
//                 })
//         }
//     }, [])

//     useEffect(()=>{
//         setValueDDListAssets('')
//         setIdDDListAssets(null)
//     }, [positionOfCategoryAssets, activeCategoryAssets])

//     useEffect(()=>{
//         setIdDDListLiabilities(null)
//         setValueDDListLiabilities('')
//     }, [positionOfCategoryLiabilities, activeCategoryLiabilities])

//     const closeSelectCardModal = (id?: number) => {
//         if(id) {
//             const newFavoriteCards = [...storeBalance.favourite_cards as number[], id]
//             storeBalance.createNewFavouriteCard(newFavoriteCards)
//             const newCard: Card[] | null = storeBalance.card_list
//             setCardList(newCard)
//         } else {
//             setModalVisible(false)
//         }
//     }

//     useEffect(()=>{
//         let flag = false
//         if(category===0 && alertSum==='' && idCard && valueSum!==''&&valueSum!=='0'&&idActiveIcon!==-1) { //личные
//             flag = true
//         }
//         if(category===1 && activeCategoryAssets && idDDListAssets && idCard&&valueSum!==''&&valueSum!=='0' && alertSum==='') { //активы
//             flag = true
//         }
//         if(category===2 && activeCategoryLiabilities && idDDListLiabilities && idCard&&valueSum!==''&&valueSum!=='0' && alertSum==='') { //пассивы
//             flag = true
//         }
//         setNextBtnVisible(flag)

//     }, [valueSum, activeCategoryAssets, idActiveIcon, idDDListAssets, idDDListLiabilities, idCard, activeCategoryLiabilities, category])

//     const onAddExpense = () => {
//         if(nextBtnVisible) {

//             if(category===0) { //личные
//                 const objExpense: IExpenseBalance = {
//                     funds: Number(valueSum.replace(/ /g,'')),
//                     comment: null,
//                     writeoff_account: idCard!,
//                     category: {
//                         icon_id: idActiveIcon,
//                         title: titleActiveIcon
//                     }
//                 }

//                 storeBalance.createPersonalExpense(idCard!, objExpense)
//             }
//             const objExpense: IExpenseBalance = {
//                 funds: Number(valueSum.replace(/ /g,'')),
//                 comment: null,
//                 writeoff_account: idCard!
//             }
//             if(category===1) { //активы
//                 type typeAssets = 'properties' | 'transport' | 'business'
//                 let typeAssets: typeAssets = 'properties'


//                 switch (activeCategoryAssets as number) {

//                     case 1: {
//                         typeAssets = 'properties'
//                         try {
//                             storeAssets.updateAssetsExpense(typeAssets, idDDListAssets!, [objExpense])
//                         } catch (e) {
//                             storeAssets.setError(e)
//                         }
//                         break;
//                     }
//                     case 2: {
//                         typeAssets = 'transport'

//                         try {
//                             storeAssets.updateAssetsExpense(typeAssets, idDDListAssets!, [objExpense])
//                         } catch (e) {
//                             storeAssets.setError(e)
//                         }
//                         break;
//                     }

//                     case 3: {
//                         typeAssets = 'business'
//                         try {
//                             storeAssets.updateAssetsExpense(typeAssets, idDDListAssets!, [objExpense])
//                         } catch (e) {
//                             storeAssets.setError(e)
//                         }
//                         break;
//                     }

//                     default:
//                         break;
//                 }
//             }
//             if(category===2) { //пассивы
//                 type typeLiabilities = 'properties' | 'transport'
//                 let typeAssets: typeLiabilities = 'properties'
//                 switch (activeCategoryLiabilities as number) {

//                     case 1: {
//                         typeAssets = 'properties'
//                         storeAssets.updateLiabilitiesExpense(typeAssets, idDDListLiabilities!, [objExpense])
//                         break;
//                     }
//                     case 2: {
//                         typeAssets = 'transport'
//                         storeAssets.updateLiabilitiesExpense(typeAssets, idDDListLiabilities!, [objExpense])
//                         break;
//                     }

//                     default:
//                         break;
//                 }
//             }

//         }
//     }

//     return (
//         <>
//             <Background imgBckg={walletBckg}/>
//             {modalVisible && storeBalance.balance &&
//                 <Modal onClose={()=>setModalVisible(false)}>
//                     <SelectCardModal data={storeBalance.card_list} onClose={closeSelectCardModal}/>
//                 </Modal>
//             }
//             {substrateVisible &&
//                 <Substrate onClose={()=>setSubstrateVisible(false)}/>
//             }

//             <div className="add-expense-page">
//                 <div className="add-expense-page__container" >
//                     <div className="add-expense-page__header">
//                         <div className="add-expense-page__title">Новая операция</div>
//                     </div>
//                     <div className="add-expense-page__content">
//                         <div className="add-expense-page__finance-block-wrapper">
//                             <div className="add-expense-page__finance-block">
//                                 <div className="add-expense-page__categories">
//                                     <ExpenseCategories categories={categories} onChangeCategory={setCategory} categoryActive={category}/>
//                                 </div>
//                                 <div className="add-expense-page__sum">
//                                     {/*<InputExpenseSum length={10} value={valueSum} setValue={setValueSum} setAlert={setAlertSum}/>*/}
//                                 </div>
//                                 <div className="add-expense-page__block-title">Откуда потратили?</div>
//                                 {/*<ExpenseSliderFinance onClickItem={setIdCard} favoriteCards={cardList} showAddCardModal={()=>setModalVisible(true)}/>*/}
//                             </div>
//                         </div>
//                         {substrateVisible ?
//                             <div className="add-expense-page__personal-expenses-block">
//                                 {/*<PersonalExpensesBlockBig allIconsData={allIcons} iconsData={state.personalCategories?state.personalCategories:[]} idActiveIcon={idActiveIcon} setIdActiveIcon={setIdActiveIcon}/>*/}
//                             </div>
//                             :
//                             <div className="add-expense-page__spend-block-wrapper">
//                                 <div className="add-expense-page__spend-block">
//                                     {category === 1 &&
//                                         <>
//                                             <div className="add-expense-page__block-title">Категория актива:</div>
//                                             <ExpenseCategoriesList activeCategory={activeCategoryAssets} assets={true} onClickItem={setPositionOfCategoryAssets} onSetActiveCategory={setActiveCategoryAssets}/>
//                                             {activeCategoryAssets &&
//                                                 <div className="add-expense-page__position">
//                                                     <div className="add-expense-page__block-title">Выберите позицию:</div>
//                                                     <div className="add-expense-page__ddlist">
//                                                         <ExpenseDropDownList idContent="addExpense-addIncome-DDL-content" idTitle="addExpense-addIncome-DDL-title" data={positionOfCategoryAssets} setValue={(val: string, id: number)=>{
//                                                             setValueDDListAssets(val)
//                                                             setIdDDListAssets(id)
//                                                         }} value={valueDDListAssets} placeholder={'Выберите актив'}/>
//                                                     </div>

//                                                 </div>
//                                             }
//                                         </>
//                                     }
//                                     {category === 2 &&
//                                         <>
//                                             <div className="add-expense-page__block-title">Категория пассива:</div>
//                                             <ExpenseCategoriesList activeCategory={activeCategoryLiabilities} onClickItem={setPositionOfCategoryLiabilities} onSetActiveCategory={setActiveCategoryLiabilities}/>
//                                             {activeCategoryLiabilities &&
//                                                 <div className="add-expense-page__position">
//                                                     <div className="add-expense-page__block-title">Выберите позицию:</div>
//                                                     <div className="add-expense-page__ddlist">
//                                                         <ExpenseDropDownList idContent="addExpense-addIncome-DDL-content" idTitle="addExpense-addIncome-DDL-title" data={positionOfCategoryLiabilities} setValue={(val: string, id: number)=>{
//                                                             setValueDDListLiabilities(val)
//                                                             setIdDDListLiabilities(id)
//                                                         }} value={valueDDListLiabilities} placeholder={'Выберите пассив'}/>
//                                                     </div>

//                                                 </div>
//                                             }
//                                         </>
//                                     }


//                                     {category === 0 &&
//                                         <>
//                                             <div className="add-expense-page__block-title">На что потратили?</div>
//                                             {/*<PersonalExpensesBlock allIconsData={allIcons} iconsData={state.personalCategories} onBigBlockVisible={()=>setSubstrateVisible(true)} idActiveIcon={idActiveIcon} setIdActiveIcon={(id, title)=>{*/}
//                                             {/*    setIdActiveIcon(id)*/}
//                                             {/*    setTitleActiveIcon(title)*/}
//                                             {/*}}/>*/}
//                                         </>
//                                     }

//                                 </div>
//                             </div>

//                         }
//                     </div>
//                     <div className="add-expense-page__btns">
//                         <Link to="/balance" className="cancel-btn add-expense-page__cancel-btn">Отменить</Link>
//                         <div className={`add-expense-page__add-btn${nextBtnVisible?'--active':''}`} onClick={onAddExpense}>Подтвердить</div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// })
