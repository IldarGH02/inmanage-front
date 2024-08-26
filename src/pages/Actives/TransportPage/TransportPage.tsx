import {useContext, useState} from "react";
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
    const store = useContext(Context)
    const [show, setShow] = useState<boolean>(false)

    const handleShow = () => {
        setShow(true)
    }

    return (
        <>
            <SpinnerLoader loading={store.activesStore.loading} />
            <div className="transport-page">
                <div className="container">
                    <h2 className="transport-page__title" style={{margin: '0px'}}>Транспорт</h2>
                    <div className="transport-page__finances">
                        <FinanceTable
                            setShow={handleShow}
                            income={store.activesStore.actives?.transports.total_income ? store.activesStore.actives?.transports.total_income : 0}
                            expenses={store.activesStore.actives?.transports.total_expenses ? store.activesStore.actives?.transports.total_expenses : 0}
                            profit={store.activesStore.actives?.transports.total_funds ? store.activesStore.actives?.transports.total_funds : 0} 
                            common_title={""} 
                            income_title={""} 
                            expenses_title={""}                        
                        />
                    </div>
                    <div className="transport-page__list-container">
                        {store.activesStore.actives?.transports.transport.length === 0 &&
                            <div className="transport-page__list-empty">
                                Транспорта нет
                            </div>
                        }
                        <div className="transport-page__list">
                            { store.activesStore.actives && store.activesStore.actives?.transports.transport.map((transport)=>{
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
            <OverlayModal showModalClass={show ? 'modal--active' : ''}>
                <TransportModal
                    active={show ? 'active' : ''}
                    handleClose={()=>setShow(false)}
                    setShow={setShow}
                />
            </OverlayModal>
        </>
    )
})
