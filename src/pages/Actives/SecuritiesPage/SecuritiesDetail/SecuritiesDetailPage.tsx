import { useContext, useState } from "react"
import "./securitiesItemPage.css"
import { Link } from "react-router-dom"
import { Modal } from "../../../../widgets/elements/Modal/Modal"
import { IncomeModal } from "../../../../widgets/elements/Modal/IncomeModal/IncomeModal"
import { ConfirmModal } from "../../../../widgets/elements/Modal/ConfirmModal/ConfirmModal"
import { SpinnerLoader } from "../../../../widgets/elements/SpinnerLoader/SpinnerLoader"
import { Context } from "../../../../main"
import { observer } from "mobx-react-lite"

export const SecuritiesDetailPage = observer(() => {
    const { activesStore } = useContext(Context)

    // const { id } = useParams()
    const [incomeModalVisible, setIncomeModalVisible] = useState(false)
    const [removeModalVisible, setRemoveModalVisible] = useState(false)

    return (
        <>
        {incomeModalVisible && 
            <Modal onClose={()=>setIncomeModalVisible(false)}>
                <IncomeModal onClose={()=>setIncomeModalVisible(false)}/>
            </Modal>
        }
        {removeModalVisible && 
            <Modal onClose={()=>setRemoveModalVisible(false)}>
                {/* <DeleteModal link="/actives/transport" onClose={()=>setRemoveModalVisible(false)} onRemove={removeItem}/> */}
                <ConfirmModal title="Удаление транспорта" text="Вы действительно хотите удалить транспорт?" onClose={() => {}}/>
            </Modal>
        }
        {/* {editModalVisible && transport!==null && 
            <Modal onClose={()=>setEditModalVisible(false)}>
                <EditModal data={transport} onClose={() => setEditModalVisible(false)} onEdit={editItem}/>
            </Modal>
        } */}
        <SpinnerLoader loading={activesStore.loading} />
        <div className="transport-item-page">
            <div className="container" >
                <h1 className="transport-item-page__title">Ценные бумаги</h1>
                <div className="transport-item-page__content">
                    <div className="transport-item-page__about-block">
                        <picture className="transport-item-page__img-wrapper">
                            {/* <img className="transport-item-page__img" src={transportImg} alt="transportImg"/> */}
                        </picture>
                        {/* <b className="transport-item-page__name">{transport && transport.mark +' '+ transport.model}</b> */}
                        {/* <div className="transport-item-page__address">{transport && ((!transport.address || transport.address==='')?'--':transport.address)}</div> */}
                    </div>

                </div>
                <div className="transport-item-page__btns">
                    <Link to="/assets/transport" className="cancel-btn transport-item-page__cancel-btn">Отменить</Link>
                    <button className="transport-item-page__add-btn" type="submit">Подтвердить</button>
                </div>
            </div>
        </div>
    </>
    )
})