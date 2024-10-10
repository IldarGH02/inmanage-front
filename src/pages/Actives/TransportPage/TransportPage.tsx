import {useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FinanceTable } from "../../../widgets/elements/FinanceTable/FinanceTable";
import { SpinnerLoader } from "../../../widgets/elements/SpinnerLoader/SpinnerLoader";
import { ItemAssets } from "../../../widgets/assets/ItemAssets/ItemAssets";
import transportImg from '../../../shared/assets/img/assets/transportItem.png'
import {observer} from "mobx-react-lite";
import {OverlayModal} from "../../../shared/ui/Overlay/OverlayModal.tsx";
import {TransportModal} from "../../../widgets/Modals/TransportModal/TransportModal.tsx";
import {Context} from "../../../main.tsx";

export const TransportPage = observer(() => {
    const { activesStore, transportStore } = useContext(Context).rootStore


    useEffect(() => {
        const r = activesStore.fetchActives()
        activesStore.setLoading(true)
        r.then(res => {
            if(res.status >= 200 && res.status < 300) {
                activesStore.setLoading(false)
                activesStore.setActives(res.data)
            }
        })
    }, [])

    return (
        <>
            <SpinnerLoader loading={activesStore.loading} />
            <div className="transport-page">
                <div className="container">
                    <h2 className="transport-page__title" style={{margin: '0px'}}>Транспорт</h2>
                    <div className="transport-page__finances">
                        <FinanceTable
                            setShow={transportStore.setShow}
                            income={activesStore.actives?.transports.total_income ? activesStore.actives?.transports.total_income : 0}
                            expenses={activesStore.actives?.transports.total_expenses ? activesStore.actives?.transports.total_expenses : 0}
                            profit={activesStore.actives?.transports.total_funds ? activesStore.actives?.transports.total_funds : 0} 
                            common_title={""} 
                            income_title={""} 
                            expenses_title={""}                        
                        />
                    </div>
                    <div className="transport-page__list-container">
                        {activesStore.actives?.transports.transport.length === 0 &&
                            <div className="transport-page__list-empty">
                                Транспорта нет
                            </div>
                        }
                        <div className="transport-page__list">
                            { activesStore.actives && activesStore.actives?.transports.transport.map((transport)=>{
                                return (
                                    <Link className="transport-page__item" to={`${transport.id}`} key={transport.id}>
                                        <ItemAssets
                                            title={transport.mark + ' ' + transport.model}
                                            img={transportImg}
                                            actualPrice={transport.average_market_price}
                                            income={transport.total_income}
                                            profit={transport.average_profit}
                                        />
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <OverlayModal showModalClass={transportStore.show  ? 'modal--active' : ''}>
                <TransportModal
                    active={transportStore.show ? 'active' : ''}
                />
            </OverlayModal>
        </>
    )
})
