import { useContext, useEffect } from "react"
import { Context } from "../../../../main"
import { useNavigate, useParams } from "react-router-dom"
import { observer } from "mobx-react-lite"
import img from "../../../../shared/assets/img/assets/home.png"
import "./JewerlyDetailPage.scss"
import { Button } from "../../../../shared/ui/Buttons/Button"
import { OverlayModal } from "../../../../shared/ui/Overlay/OverlayModal"
import { ChangeJewerlyForm } from "../../../../widgets/forms/actives/jewerlys/ChangeJewerlyForm"
import { DeletePopup } from "../../../../widgets/Modals/JewerlyModal/DeletePopup"
import { Spinner } from "react-bootstrap"

export const JewerlyDetailPage = observer(() => {
    const { id } = useParams()
    const { activesStore, jewerlyStore } = useContext(Context)
    const navigate = useNavigate()

    useEffect(() => {
        jewerlyStore.setCurrentJewerly(Number(id))
    }, [jewerlyStore, activesStore])

    const handleRemoveJewerly = () => {
        const response = jewerlyStore.removeJewerly(`${id}`)
        response.then(res => {
            if(res.status >= 200 && res.status < 300) {
                const response = activesStore.fetchActives()
                activesStore.setLoading(true)
                response.then(res => {
                    if(res.status >= 200 && res.status < 300) {
                        activesStore.setActives(res.data)
                        activesStore.setLoading(false)
                    }
                })
                jewerlyStore.setIsActive(false)
                navigate('/assets/jewerly')
            }
        })
    }

    if(activesStore.loading) {
        return <div style={{
            width: '100%',
            height: '350px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Spinner 
                style={{
                    width: '10rem',
                    height: '10rem',
                }}
                variant="primary"
            />
        </div>
    }

    return (
        <>
            <section className="jewerly__detail-page">
                <div className="container">
                    <div className="jewerly__detail-content">
                        <div className="jewerly__detail-left">
                            <div className="jewerly__detail-image">
                                <img src={img}/>
                            </div>
                            <h2 className="jewerly__detail-title">
                                {jewerlyStore.current_jewerly?.name}
                            </h2>
                        </div>
                        <div className="jewerly__detail-description">
                            <span onMouseOver={jewerlyStore.handleMouseOver} className="jewerly__detail-ellipses">...</span>
                            <DeletePopup 
                                onMouseOut={jewerlyStore.handleMouseOut} 
                                onMouseOver={jewerlyStore.handleMouseOver} 
                                over={jewerlyStore.isActive}
                                handleRemove={handleRemoveJewerly}    
                            />
                            <div className="jewerly__main-price">
                                <div className="jewerly__price">
                                    <p className="jewerly__info">
                                        Стоимость покупки:
                                    </p>
                                    <span>{jewerlyStore.current_jewerly?.purchase_cost}</span>
                                </div>
                                <div className="jewerly__price">
                                    <p className="jewerly__info">
                                        Оценочная стоимость:
                                    </p>
                                    <span>{jewerlyStore.current_jewerly?.estimated_cost}</span>
                                </div>
                            </div>
                            <div className="jewerly__result-price">
                                <div className="jewerly__price">
                                    <p className="jewerly__info">
                                        Прирост стоимости:
                                    </p>
                                    <span>{jewerlyStore.current_jewerly?.grow}</span>
                                </div>
                                <div className="jewerly__price">
                                    <p className="jewerly__info">
                                        Прибыль / месяц:
                                    </p>
                                    <span>{jewerlyStore.current_jewerly?.month_income}</span>
                                </div>
                            </div>
                            <Button
                                onClick={jewerlyStore.handleClickShow}
                                className="jewerly__detail-button"
                                textButton="Переоценка"
                                name="button"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <OverlayModal showModalClass={jewerlyStore.show_modal ? 'modal--active' : ''}>
                <ChangeJewerlyForm/>
            </OverlayModal>
        </>
    )
})