import { useEffect, useState } from "react"

import { ExpenseCategories } from "../../../entities/Balance/ExpenseBalance/ExpenseCategories/ExpenseCategories";
import { AddCardForm } from "../../../widgets/forms/balance/CardsForm/AddCardForm/AddCardForm";
import { CardItemBalance } from "../../../entities/Balance/CardsBalance/CardItemBalance/CardItemBalance";
import { EditCardForm } from "../../../widgets/forms/balance/CardsForm/EditCardForm/EditCardForm";
// import { useDispatch } from "react-redux";
// import { removeCard, showLoader } from "../../../app/store/actions/balance/balanceActions";
// import { actionTypesBalance } from "../../../app/store/types/balanceTypes";
import { ICard } from "../../../app/types/balance/IBalance";
import { Modal } from "../../../widgets/elements/Modal/Modal";
import { ConfirmModal } from "../../../widgets/elements/Modal/ConfirmModal/ConfirmModal";

import cashImg from '../../../shared/assets/img/balance/addExpense/cashB.png'
import BalanceStore from "../../../app/store/balanceStore";
import { observer } from "mobx-react-lite";

export const CardsPage = observer(() => {
    const [store] = useState(
        () => new BalanceStore()
    )

    const [modalVisible, setModalVisible] = useState(false) 
    const [cardList, setCardList] = useState<ICard[]|null>([])
    const categories = ['Общие', 'Дебет', 'Кредит']
    const [category, setCategory] = useState(0)
    const [editVisible, setEditVisible] = useState(false)
    const [editCardId, setEditCardId] = useState(-1)

    // const [positionOfCategoryAssets, setPositionOfCategoryAssets] = useState<number|null>(null)

    useEffect(()=>{       
        if(store.balance !== null) {
            switch(category) {
                case 0: {
                    setCardList(store.card_list)
                    break
                }
                case 1: {
                    setCardList(store.card_list!.filter((el: ICard)=>!el.loan))
                    break
                }
                case 2: {
                    setCardList(store.card_list!.filter((el: ICard)=>el.loan))
                    break
                }
                default: {
                    break
                }  
            }
        }
        
    }, [category])

    useEffect(()=>{   
        if(store.balance === null) {
            store.fetchBalance()
        }
    }, [])

    useEffect(()=>{   
        setCardList(store.card_list)
    }, [store.card_list])

    // const clickItemCategoryAssets = (id: number) => {
    //     setPositionOfCategoryAssets(id)
    // }

    const onEditCard = (id: number) => {
        setEditVisible(true) 
        setEditCardId(id)
    }

    const onRemoveCard = (id: number) => {
        setModalVisible(true)
        setEditCardId(id)
        store.removeChooseCard(id)
    }

    return (
        <>
            {modalVisible && 
                <Modal onClose={()=>setModalVisible(false)}>
                    <ConfirmModal title="Удаление" text={`Вы действительно хотите удалить карту: ${cardList!.find(el=>el.id===editCardId)?.name}?`} onClose={(flag: boolean)=>{
                        if(flag) {
                            store.removeChooseCard(editCardId)
                        }
                        setModalVisible(false)
                    }}/>
                </Modal>
            }
            <section className="cards__page">
                <div className="container">
                <h2 className="cards__page-title">Карты и наличные</h2>
                    <div className="cards__page-content">
                        <div className="cards__page-finance">
                            <div className="card-page__categories">
                                <ExpenseCategories categories={categories} onChangeCategory={setCategory} categoryActive={category}/>
                            </div>
                            <div className="card-page__card-list">
                                {cardList?.length===0 && 
                                    <div className="card-page__list-empty">Список пуст...</div>
                                }
                                {cardList && cardList.map((el: ICard)=>{
                                    return (
                                        <CardItemBalance id={el.id!} onRemoveCard={onRemoveCard} onEdit={onEditCard} img={cashImg} name={el.name} sum={el.remainder} key={el.id}/>
                                    )
                                })}
                            </div>
                        </div>
                        {!editVisible && 
                            <AddCardForm/>                      
                        }
                        {editVisible && 
                            <EditCardForm data={cardList?.find(el=>el.id===editCardId)!} onClose={()=>setEditVisible(false)}/>
                        }
                    </div>
                </div>
            </section>
        </>
    )
})
