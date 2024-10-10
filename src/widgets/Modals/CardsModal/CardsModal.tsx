import {FC, useContext, useEffect, useState} from "react";
import { Context } from "../../../main.tsx";
import { CardsForm } from "../../../entities/Balance/CardsBalance/CardsForm/CardsForm.tsx";
import { Card } from "../../../app/types/dto/DtoTypes.ts";
import {ExpenseCategories} from "../../../entities/Balance/ExpenseBalance/ExpenseCategories/ExpenseCategories.tsx";
import {CardItemBalance} from "../../../entities/Balance/CardsBalance/CardItemBalance/CardItemBalance.tsx";
import cashImg from "../../../shared/assets/img/balance/addExpense/cashB.png";
// import {EditCardForm} from "../../forms/balance/CardsForm/EditCardForm/EditCardForm.tsx";
import {Modal} from "../../elements/Modal/Modal.tsx";
import {ConfirmModal} from "../../elements/Modal/ConfirmModal/ConfirmModal.tsx";
import {observer} from "mobx-react-lite";

interface CardsModalProps {
    active: string
    handleClose: () => void
}

export const CardsModal: FC<CardsModalProps> = observer((
    {
        active,
        handleClose
    }) => {
    const { balanceStore } = useContext(Context).rootStore

    const [modalVisible, setModalVisible] = useState(false)
    const [cardList, setCardList] = useState<Card[] | null>([])
    const categories = ['Общие', 'Дебет', 'Кредит']
    const [category, setCategory] = useState(0)
    const [editVisible, setEditVisible] = useState(false)
    const [editCardId, setEditCardId] = useState(-1)

    useEffect(()=>{
        if(balanceStore.balance) {
            switch(category) {
                case 0: {
                    setCardList(balanceStore.card_list)
                    break
                }
                case 1: {
                    setCardList(balanceStore.card_list!.filter((el: Card)=>!el.loan))
                    break
                }
                case 2: {
                    setCardList(balanceStore.card_list!.filter((el: Card)=>el.loan))
                    break
                }
                default: {
                    break
                }
            }
        }

    }, [category, balanceStore.balance, balanceStore.card_list])

    useEffect(()=>{
        if(balanceStore.balance) {
            setCardList(balanceStore.card_list)
        }
    }, [balanceStore.balance, balanceStore.card_list])


    const onEditCard = (id: number) => {
        setEditVisible(true)
        setEditCardId(id)
    }

    const onRemoveCard = (id: number) => {
        const response = balanceStore.removeChooseCard(id)
        balanceStore.setLoading(true)
        response.then(res => {
            if(res.status >= 200 && res.status < 300) {
                balanceStore.setLoading(false)
                setModalVisible(false)
                setEditCardId(id)
                handleClose()
            }
        })
    }

    return (
        <>
            {modalVisible &&
                <Modal onClose={()=>setModalVisible(false)}>
                    <ConfirmModal title="Удаление" text={`Вы действительно хотите удалить карту: ${cardList!.find(el=>el.id===editCardId)?.name}?`} onClose={(flag: boolean)=>{
                        if(flag) {
                            return balanceStore.removeChooseCard(editCardId)
                        }
                        setModalVisible(false)
                    }}/>
                </Modal>
            }
            <div className={`cards__modal ${active}`}>
                <h2 className="cards__modal-title">Карты и наличные</h2>
                <div className="cards__modal-content">
                    <div className="cards__modal-finance">
                        <div className="car__finance-categories">
                            <ExpenseCategories
                                categories={categories}
                                onChangeCategory={setCategory}
                                categoryActive={category}
                            />
                        </div>
                        <div className="card-page__card-list">
                            {cardList?.length === 0 &&
                                <div className="card-page__list-empty">Список пуст...</div>
                            }
                            {cardList && cardList.map((el: Card) => {
                                return (
                                    <CardItemBalance
                                        id={el.id!}
                                        onRemoveCard={onRemoveCard}
                                        onEdit={onEditCard}
                                        img={cashImg}
                                        name={el.name}
                                        sum={el.remainder}
                                        key={el.id}
                                    />
                                )
                            })}
                        </div>
                    </div>
                    {!editVisible &&
                        <CardsForm handleClose={handleClose}/>
                    }
                    {/* {editVisible && cardList &&
                        <EditCardForm data={cardList.find(el => el.id === editCardId)!}
                                      onClose={() => setEditVisible(false)}/>
                    } */}
                </div>
            </div>
        </>
    )
})