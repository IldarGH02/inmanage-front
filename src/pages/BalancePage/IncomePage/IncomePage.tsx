import { useEffect, useState } from "react"
import "./addIncomePage.css"
import { ExpenseCategories } from "../../../entities/Balance/ExpenseBalance/ExpenseCategories/ExpenseCategories"
import { InputExpenseSum } from "../../../entities/Balance/ExpenseBalance/InputSum/InputSum"
import { ExpenseSliderFinance } from "../../../entities/Balance/ExpenseBalance/ExpenseSlider/ExpenseSliderFinance/ExpenseSliderFinance"
import { Card, ExpenseItem, ExpenseList, IExpenseSliderCategory, IIncome, IIncomeBalance } from "../../../app/types/balance/IBalance"
import { ExpenseDropDownList } from "../../../entities/Balance/ExpenseBalance/ExpenseDropDownList/ExpenseDropDownList"
import "../../../widgets/elements/buttons/CancelBtn/cancelBtn.css";
import { Link } from "react-router-dom"
import { IncomeAssets } from "../../../entities/Balance/IncomeBalance/IncomeAssets/IncomeAssets"


import { SelectCardModal } from "../../../widgets/elements/Modal/balance/SelectCardModal/SelectCardModal"
import { Modal } from "../../../widgets/elements/Modal/Modal"
// import { updateAssetsIncome } from "../../../app/store/actions/assets/assetsActions"
// import { actionTypes } from "../../../app/store/types/types"
// import { IAssetsBusiness, IAssetsProperty, IAssetsTransport } from "../../../app/types/assets/IAssets"


import { observer } from "mobx-react-lite"
import {IncomeStore} from "../../../app/store/balanse/incomeStore.ts";
import BalanceStore from "../../../app/store/balanse/balanceStore.ts";
import {IncomeCategories} from "../../../widgets/Balance/Income/IncomeCategories/IncomeCategories.tsx";

export const IncomePage = observer(() => {
    const [storeIncome] = useState(
        () => new IncomeStore()
    )
    const [storeBalance] = useState(
        () => new BalanceStore()
    )

    const categories = ['Работа', 'Активы', 'Самозанятость']
    const [category, setCategory] = useState(0)
    const [valueCategory, setValueCategory] = useState('')
    const [comment, setComment] = useState<string>('')
    const [modalVisible, setModalVisible] = useState(false)
    const [chacked, setChecked] = useState<boolean>(false)
    const [checkedElement, setCheckedElement] = useState<string>('')

    const [jobList, setJobList] = useState<ExpenseList>([])
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
        if(storeBalance) {
            const cardList: Card[] = [];
            const favouriteCardsId = storeBalance.favourite_cards as number[];
            storeBalance.card_list?.forEach(card => {
                if(favouriteCardsId?.includes(card.id)) {
                    cardList.push(card)
                }
            })
            setCardList(cardList)
            console.log(cardList)
        }
    }, [storeBalance]);

    useEffect(() => {
        storeIncome.fetchJobList()
        if(storeIncome.jobList) {
            const jobItem = storeIncome.jobList.map((item) => {
                const obj: ExpenseItem = {
                    id: item.id,
                    name: item.name,
                    active: false
                }
                return obj
            })
            setJobList(jobItem)
            console.log(storeIncome.jobList)
        }
    }, [storeIncome])

    useEffect(()=>{
        let flag = false
        if(category === 0) { //работа
            const activeID = jobList.find(el=>el.active)
            if(alertSum === '' && 
               activeID &&
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
        
    }, [valueSum, activeCategory, idDDList, idCard, category])

    useEffect(()=>{
        setValueDDList('')
        setIdDDList(null)
    }, [positionOfCategoryAssets, activeCategory])

    const clickItemCategoryAssets = (data: IExpenseSliderCategory[]) => {
        setPositionOfCategoryAssets(data)
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
        if(id && storeBalance.balance) {
            const newFavoriteCards: number[] = Array.from(new Set([...storeBalance.balance.favourite_cards, id]))
            storeBalance.createNewFavouriteCard(newFavoriteCards)
            setModalVisible(false)
        } else {
            setModalVisible(false)
        }
    }

    const handleChangeValueJob = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setValueCategory(value)
    }

    const handleChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setComment(value)
    }

    const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.checked;
        const id = e.target.id;
        if(value) {
            setChecked(value)
            setCheckedElement(id)
        }
    }

    const handleCreate = () => {
        storeIncome.createNewWork(valueCategory, null, Number(valueSum), comment)
    }

    const handleClickCreateIncome = () => {
        if(nextBtnVisible) {
            if(category===0) { //работа
                const activeID = jobList.find(el=>el.active)
                const objWork: IIncome = {
                    project: null,
                    work: activeID!.id,
                    funds: Number(valueSum.replace(/ /g,'')),
                    writeoff_account: idCard!,
                    comment: comment
                }

                storeIncome.createNewIncome(objWork)
            }
            if(category===1) { //активы
                // type typeAssets = 'properties' | 'transport' | 'business'
                const objIncome: IIncomeBalance = {
                    funds: Number(valueSum.replace(/ /g,'')),
                    comment: null,
                    writeoff_account: idCard!
                }
                
                switch (activeCategory as number) {
                    case 1: {
                        storeIncome.updateActivesIncome('properties', idDDList, [objIncome])
                        break;
                    }
                    case 2: {
                        storeIncome.updateActivesIncome('transport', idDDList, [objIncome])
                        break;
                    }
        
                    case 3: {
                        storeIncome.updateActivesIncome('business', idDDList, [objIncome])
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

    const handleChooseItem = () => {
        jobList.map((item) => {
            if(item.id === Number(checkedElement)) {

            }
        })
    }

    return (
        <>
        {modalVisible && storeBalance.balance &&
            <Modal onClose={()=>setModalVisible(false)}>
                <SelectCardModal data={storeBalance.balance.card_list} onClose={closeSelectCarModal}/>
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
                                showAddCardModal={() => setModalVisible(true)}
                            />
                        </div>
                        <div className="income__page-categories">
                            {category === 0 &&
                                <IncomeCategories
                                    data={jobList}
                                    fromTitle={`С какой работы?`}
                                    valueCategory={valueCategory}
                                    valueComment={comment}
                                    classNameCategory={`income__job-categories`}
                                    classNameTitle={`С какой работы?`}
                                    placeholder={'Добавить новое место работы'}
                                    handleCreate={handleCreate}
                                    handleChangeValue={handleChangeValueJob}
                                    handleChangeComment={handleChangeComment}
                                    handleChangeCheckbox={handleChangeCheckbox}
                                    handleChooseItem={handleChooseItem}
                                />
                            }
                            {category === 2 &&
                                <IncomeCategories
                                    data={jobList}
                                    fromTitle={`С какого проекта?`}
                                    valueCategory={valueCategory}
                                    valueComment={comment}
                                    classNameCategory={`income__job-categories`}
                                    classNameTitle={`С какой работы?`}
                                    placeholder={'Добавить новый проект'}
                                    handleCreate={handleCreate}
                                    handleChangeValue={handleChangeValueJob}
                                    handleChangeComment={handleChangeComment}
                                    handleChangeCheckbox={handleChangeCheckbox}
                                    handleChooseItem={handleChooseItem}
                                />
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
                            <div className="income__page-actions">
                                <Link to="/balance" className="cancel-btn income-page__cancel">Отменить</Link>
                                <button
                                    className={`income__page-submit${nextBtnVisible ? '--active' : ''}`}
                                    onClick={handleClickCreateIncome}>
                                    Подтвердить
                                </button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
        </>
    )
})
