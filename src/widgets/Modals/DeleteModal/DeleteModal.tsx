import {FC, useContext, useEffect, useState} from "react";
// import "./removeAssetsLiabilitiesModal.css"
import { RemoveAssetsLiabilities } from "../../forms/RemoveAssetsLiabilities/RemoveAssetsLiabilities.tsx";
import { SpinnerLoader } from "../../elements/SpinnerLoader/SpinnerLoader.tsx";
import { SelectCardModal } from "../../elements/Modal/balance/SelectCardModal/SelectCardModal.tsx";
import { Card } from "../../../app/types/dto/DtoTypes.ts"; 
import {observer} from "mobx-react-lite";
import { Context } from "../../../main.tsx";

interface IDeleteModal {
    active: string
    handleClose: () => void
    setShow: (bool: boolean) => void
    removeItem: (sum?: number, card?: Card)=>void,
    show: boolean
}

export const DeleteModal: FC<IDeleteModal> = observer((
    {
        setShow,
        // handleClose,
        // active,
        show,
        removeItem
    }) => {
    const store = useContext(Context).balanceStore

    const [cardSelected, setCardSelected] = useState<Card | null>(null)

    useEffect(() => {
        if(store.balance===null) {
            store.fetchBalance()
        }
    }, [store])

    const closeSelectCardModal = (id?: number) => {
        if(id) {
            if(store.balance) {
                const card = store.balance.card_list.find((el) => el.id === id)
                if(card) {
                    setCardSelected(card)
                }
                setShow(false)
            }
        } else {
            setShow(false)
        }
    }

    const onRemove = (sum?: number) => {
        if(sum) {
            removeItem(sum, cardSelected!)
        } else {
            removeItem()
        }
    }

    return (
        <>
            {store.balance &&
                <div className='remove-assets-liabilities-modal__modal'>
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

            <div className={`remove-assets-liabilities-modal ${show ? "--active" : ""}`}>
                <h3 className="remove-assets-liabilities-modal__title">Вы действительно хотите удалить?</h3>
                <div className="remove-assets-liabilities-modal__form">
                    <RemoveAssetsLiabilities onOpenModal={() => {}} onRemove={onRemove} cardSelected={cardSelected} setShow={setShow}/>
                </div>
            </div>
        </>
    )
})