import React, { useEffect, useState } from "react";
import "./removeAssetsLiabilitiesModal.css"
import { RemoveAssetsLiabilities } from "../../../forms/RemoveAssetsLiabilities/RemoveAssetsLiabilities";
import { useTypedSelector } from "../../../../features/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { getBalance, hideLoader, showLoader } from "../../../../app/store/actions/balance/balanceActions";
import { actionTypesBalance } from "../../../../app/store/types/balanceTypes";
import { SpinnerLoader } from "../../SpinnerLoader/SpinnerLoader";
import { SelectCardModal } from "../balance/SelectCardModal/SelectCardModal";
import { ICard } from "../../../../app/types/balance/IBalance";

interface IDeleteModal {
    onClose: ()=>void,
    onRemoveItem: (sum?: number, card?: ICard)=>void,
}

export function RemoveAssetsLiabilitiesModal({onClose, onRemoveItem}: IDeleteModal) {
    const state = useTypedSelector(state => state.balanceReducer)
    const dispatch = useDispatch() 
    const [modalVisible, setModalVisible] = useState(false)
    const [cardSelected, setCardSelected] = useState(null)

    useEffect(()=>{
        if(state.balance===null) {
            dispatch(showLoader(actionTypesBalance.SHOW_LOADER))
            const res = getBalance(actionTypesBalance.GET_BALANCE)
            res.then(e => {
                dispatch(e!);
            })
            .catch((e) => {
                dispatch(hideLoader(actionTypesBalance.HIDE_LOADER))
                console.log(e)
            })
        }
    }, [])

    const closeSelectCardModal = (id?: number) => {
        if(id) {
            let card = state.balance.card_list.find((el:ICard)=>el.id===id)
            setCardSelected(card)
            closeModal()
        } else {
            closeModal()
        }
    }

    const openModal = () => {
        setModalVisible(true);
        (document.querySelector('.remove-assets-liabilities-modal') as HTMLElement).style.visibility = 'hidden'
    }
    
    const closeModal = () => {
        setModalVisible(false);
        (document.querySelector('.remove-assets-liabilities-modal') as HTMLElement).style.visibility = 'visible'
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
        {modalVisible && state.balance &&
            <div className='remove-assets-liabilities-modal__modal' onClick={closeModal}>
            <div className="remove-assets-liabilities-modal__modal-wrapper">
                <div className='remove-assets-liabilities-modal__modal-content' onClick={e=>{
                    e.stopPropagation()
                }}>
                    <SelectCardModal data={state.balance.card_list} onClose={closeSelectCardModal}/>
                </div>
            
            </div>
        </div>  
        }
        <SpinnerLoader loading={state.loading} />

        <div className="remove-assets-liabilities-modal">
            <b className="remove-assets-liabilities-modal__title">Вы действительно хотите удалить?</b>
            <div className="remove-assets-liabilities-modal__form">
                <RemoveAssetsLiabilities onOpenModal={openModal} onRemove={onRemove} cardSelected={cardSelected} onClose={onClose}/>
            </div>
        </div>
        </>
    )
}