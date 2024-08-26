import { useContext, useState } from "react";
import "./removeAssetsLiabilitiesModal.css"
import { RemoveAssetsLiabilities } from "../../../forms/RemoveAssetsLiabilities/RemoveAssetsLiabilities";
import { SpinnerLoader } from "../../SpinnerLoader/SpinnerLoader";
import { SelectCardModal } from "../balance/SelectCardModal/SelectCardModal";
import { Card } from "../../../../app/types/dto/DtoTypes.ts"; 
import { Context } from "../../../../main.tsx";

interface IDeleteModal {
    onClose: ()=>void,
    onRemoveItem: (sum?: number, card?: Card)=>void,
}

export function RemoveAssetsLiabilitiesModal({onRemoveItem}: IDeleteModal) {
    const store = useContext(Context).balanceStore

    const [modalVisible, setModalVisible] = useState(false)
    const [cardSelected, setCardSelected] = useState<Card>()


    const closeSelectCardModal = (id?: number) => {
        if(id) {
            if(store.balance) {
                const card = store.balance.card_list.find((el:Card) => el.id === id)
                if(card) {
                    setCardSelected(card)
                    closeModal()
                }
            }
        } else {
            closeModal()
        }
    }

    const openModal = () => {
        setModalVisible(true);
        (document.querySelector('.remove-actives-liabilities-modal') as HTMLElement).style.visibility = 'hidden'
    }
    
    const closeModal = () => {
        setModalVisible(false);
        (document.querySelector('.remove-actives-liabilities-modal') as HTMLElement).style.visibility = 'visible'
    }

    const onRemove = (sum?: number) => {
        if(sum) {
            onRemoveItem(sum, cardSelected!)
        } else {
            onRemoveItem()
        }
    }

    return (
        <>
        {modalVisible && store.balance &&
            <div className='remove-assets-liabilities-modal__modal' onClick={closeModal}>
            <div className="remove-assets-liabilities-modal__modal-wrapper">
                <div className='remove-assets-liabilities-modal__modal-content' onClick={e=>{
                    e.stopPropagation()
                }}>
                    <SelectCardModal data={store.balance.card_list} onClose={closeSelectCardModal}/>
                </div>
            
            </div>
        </div>  
        }
        <SpinnerLoader loading={store.loading} />

        <div className="remove-assets-liabilities-modal">
            <b className="remove-assets-liabilities-modal__title">Вы действительно хотите удалить?</b>
            <div className="remove-assets-liabilities-modal__form">
                <RemoveAssetsLiabilities
                    onOpenModal={openModal}
                    onRemove={onRemove}
                    // cardSelected={cardSelected}
                    cardSelected={null}
                    setShow={() => {}}
                />
            </div>
        </div>
        </>
    )
}