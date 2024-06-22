import { useEffect, useState } from "react"
import "./addIncomePage.css"
import { ExpenseCategories } from "../../../entities/Balance/ExpenseBalance/ExpenseCategories/ExpenseCategories"
import { InputExpenseSum } from "../../../entities/Balance/ExpenseBalance/InputSum/InputSum"
import { ExpenseSliderFinance } from "../../../entities/Balance/ExpenseBalance/ExpenseSlider/ExpenseSliderFinance/ExpenseSliderFinance"
import { Card, ExpenseItem, ExpenseList, IExpenseListBlock, IExpenseSliderCategory, IIncome, IIncomeBalance, Work } from "../../../app/types/balance/IBalance"
import { ExpenseDropDownList } from "../../../entities/Balance/ExpenseBalance/ExpenseDropDownList/ExpenseDropDownList"
import "../../../widgets/elements/buttons/CancelBtn/cancelBtn.css";
import { Link } from "react-router-dom"
import { IncomeJob } from "../../../entities/Balance/IncomeBalance/IncomeJob/IncomeJob"
import { IncomeAssets } from "../../../entities/Balance/IncomeBalance/IncomeAssets/IncomeAssets"

// import { addIncome, addIncomeAssets, hideLoader, showLoader } from "../../../app/store/actions/balance/balanceActions"
// import { actionTypesBalance } from "../../../app/store/types/balanceTypes"
import { SelectCardModal } from "../../../widgets/elements/Modal/balance/SelectCardModal/SelectCardModal"
import { Modal } from "../../../widgets/elements/Modal/Modal"
// import { updateAssetsIncome } from "../../../app/store/actions/assets/assetsActions"
// import { actionTypes } from "../../../app/store/types/types"
// import { IAssetsBusiness, IAssetsProperty, IAssetsTransport } from "../../../app/types/assets/IAssets"


import { observer } from "mobx-react-lite"
import BalanceStore from "../../../app/store/balanceStore"

export const IncomePage = observer(() => {
    const [store] = useState(
        () => new BalanceStore()
    )

    const categories = ['Работа', 'Активы', 'Самозанятость']
    const [category, setCategory] = useState(0)
    const [commentJob, setCommentJob] = useState('')



    const [modalVisible, setModalVisible] = useState(false)
    const [listJobBlock, setListJobBlock] = useState<ExpenseList>([])
    const [worksList, setWorksList] = useState<Work[]>([])
   
    const [valueDDList, setValueDDList] = useState('')
    const [idDDList, setIdDDList] = useState<number | null>(null)
    const [idCard, setIdCard] = useState<number|null>(null)
    const [nextBtnVisible, setNextBtnVisible] = useState(false)
    const [valueSum, setValueSum] = useState('')
    const [alertSum, setAlertSum] = useState('')

    const [cardList, setCardList] = useState<Card[]>([])

    const [positionOfCategoryAssets, setPositionOfCategoryAssets] = useState<IExpenseSliderCategory[]>([])
    const [activeCategory, setActiveCategory] = useState<number|null>(null) 


    useEffect(() => {
        store.fetchWorks()
        if(store.works) {
            setWorksList(store.works)
            const newWork = store.works.map((item) => {
                const obj: ExpenseItem = {
                    id: item.id,
                    name: item.name,
                    active: false
                }
                return obj
            })
            setListJobBlock(newWork)
        }
    }, [store])

    useEffect(()=>{
        let flag = false
        if(category === 0) { //работа
            let activeID = listJobBlock.find(el=>el.active)
            if(alertSum === '' && 
               activeID && 
               commentJob && 
               valueSum !=='' && 
               valueSum !== '0' &&
               idCard) {
                flag = true
            }
        }
        if(category===1 && activeCategory && idDDList && idCard&&valueSum!==''&&valueSum!=='0') { //активы
            flag = true
        }
        if(category===2) { //проект
            flag = true
        }
        setNextBtnVisible(flag)
        
    }, [valueSum, activeCategory, idDDList, commentJob, idCard, listJobBlock, category])

    useEffect(()=>{
        setValueDDList('')
        setIdDDList(null)
    }, [positionOfCategoryAssets, activeCategory])

    const clickItemCategoryAssets = (data: IExpenseSliderCategory[]) => {
        setPositionOfCategoryAssets(data)
    }

    const addPositionJob = (name: string) => {
        // store.createNewWork(name)
    }

    // const addPositionProject = (str: string) => {
    //     let newId = 1
    //     listProjectBlock.forEach(el=>{
    //         if(newId<=el.id) {
    //             newId = el.id + 1 
    //         }
    //     })
    //     let listBlockTmp = [...listProjectBlock]
    //     listBlockTmp.push({
    //         id: newId,
    //         name: str,
    //         active: false
    //     })
    //     setListProjectBlock(listBlockTmp)
    // }

    const clickPositionJob = (id: number) => {    
        let listBlockTmp = listJobBlock.map(el=>{
            if(id===el.id) {
                el.active = !el.active
            } else {
                el.active = false
            }
            return el
        })
        setListJobBlock(listBlockTmp)
    }

    const clickPositionProject = (id: number) => {    
        let listBlockTmp = listProjectBlock.map(el=>{
            if(id===el.id) {
                el.active = !el.active
            }
            return el
        })
        setListProjectBlock(listBlockTmp)
    }

    // const removePosition = (id: number) => {
    //     const newList = listJobBlock.filter(el=>{
    //         if(el.id!==id) {
    //             return el
    //         }
    //     })
    //     setListJobBlock(newList)
    // }

    const closeSelectCarModal = (id?: number) => {
        if(id && store.balance) {
            let newFavoriteCards: number[] = Array.from(new Set([...store.balance.favourite_cards, id]))
            store.createNewFavouriteCard(newFavoriteCards)
            setModalVisible(false)
        } else {
            setModalVisible(false)
        }
    }

    const handleClickCreateIncome = () => {
        if(nextBtnVisible) {
            if(category===0) { //работа
                let activeID = listJobBlock.find(el=>el.active)
                let objWork: IIncome = {
                    project: null,
                    work: activeID!.id,
                    funds: Number(valueSum.replace(/ /g,'')),
                    writeoff_account: idCard!,
                    comment: commentJob
                } 

                store.createNewIncome(objWork)
            }
            if(category===1) { //активы
                type typeAssets = 'properties' | 'transport' | 'business'
                let typeAssets: typeAssets = 'properties'
                const objIncome: IIncomeBalance = {
                    funds: Number(valueSum.replace(/ /g,'')),
                    comment: null,
                    writeoff_account: idCard!
                }
                
                switch (activeCategory as number) {
                    case 1: {
                        store.updateActivesIncome('properties', idDDList, [objIncome])
                        break;
                    }
                    case 2: {
                        store.updateActivesIncome('transport', idDDList, [objIncome])
                        break;
                    }
        
                    case 3: {
                        store.updateActivesIncome('business', idDDList, [objIncome])
                        break;
                    }
                        
                    default:
                        break;
                }
            }
            if(category===2) { //проект
                
            }
            
        }
    }

    return (
        <>
        {modalVisible && store.balance && 
            <Modal onClose={()=>setModalVisible(false)}>
                <SelectCardModal data={store.balance.card_list} onClose={closeSelectCarModal}/>
            </Modal>
        }
        <div className="income__page">
            <div className="container" >
                <h2 className="income__page-title">Новая операция</h2>
                <div className="income__page-content">
                    <div className="income__page-finance">
                        <div className="income__finance-categories">
                            <ExpenseCategories 
                                categories={categories} 
                                onChangeCategory={setCategory} 
                                categoryActive={category}
                            />
                        </div>
                        <div className="income__finance-sum">
                            <InputExpenseSum 
                                length={10} 
                                value={valueSum} 
                                setValue={setValueSum} 
                                setAlert={setAlertSum}
                            />
                        </div>
                        <h2 className="income__finance-title">Куда зачислить?</h2>
                        <ExpenseSliderFinance 
                            onClickItem={setIdCard} 
                            favoriteCards={cardList} 
                            showAddCardModal={()=>setModalVisible(true)}
                        />
                    </div>
                    <div className="income__page-categories">
                        {category === 0 && 
                            <>
                                <h3 className="income__category-title job-title">С какой работы?</h3>
                                <IncomeJob 
                                    setTextArea={setCommentJob} 
                                    data={listJobBlock} 
                                    onClickPosition={clickPositionJob} 
                                    // onAddPosition={addPositionJob}
                                />                                    
                            </>
                        }
                        {category === 2 && 
                            <>
                                <h3 className="income__category-title project-title">С какого проекта?</h3>
                                <IncomeJob 
                                    setTextArea={()=>null} 
                                    data={listProjectBlock} 
                                    onClickPosition={clickPositionProject} 
                                    // onAddPosition={addPositionProject}
                                />
                            </>
                        } 
                        {category === 1 && 
                            <>
                                <div className="income__category-title active-title">Категория актива:</div>
                                <IncomeAssets 
                                    activeCategory={activeCategory} 
                                    onClickItem={clickItemCategoryAssets} 
                                    onSetActiveCategory={setActiveCategory}
                                />

                                {positionOfCategoryAssets && activeCategory && 
                                    <div className="income__page-position">
                                        <div className="income__position-title">Выберите позицию:</div>
                                        <div className="income__position-ddlist">
                                            <ExpenseDropDownList 
                                                idContent="addExpense-addIncome-DDL-content" 
                                                idTitle="addExpense-addIncome-DDL-title" 
                                                data={positionOfCategoryAssets} 
                                                setValue={(val: string, id: number) => {
                                                    setValueDDList(val)
                                                    setIdDDList(id)
                                                }} 
                                                value={valueDDList} 
                                                placeholder={'Выберите актив'}
                                            />
                                        </div>
                                        
                                    </div> 
                                }
                            </>
                        } 
                    </div>
                </div>
                <div className="income__page-actions">
                    <Link to="/balance" className="cancel-btn income-page__cancel">Отменить</Link>
                    <button
                        className={`income__page-submit${nextBtnVisible?'--active':''}`} 
                        onClick={handleClickCreateIncome}>
                            Подтвердить
                    </button>
                </div>
            </div>
        </div>
        </>
    )
})
