import {useContext, useState} from "react";
import { FinanceTable } from "../../../widgets/elements/FinanceTable/FinanceTable";
import { SpinnerLoader } from "../../../widgets/elements/SpinnerLoader/SpinnerLoader";

import {OverlayModal} from "../../../shared/ui/Overlay/OverlayModal.tsx";
import {ImmovableModal} from "../../../widgets/Modals/Immovables/ImmovableModal.tsx";
import {observer} from "mobx-react-lite";
import { Context } from "../../../main.tsx";

import "./immovablesPage.scss"
import { ImmovableItems } from "../../../widgets/Actives/Immovable/ImmovalbeItems.tsx";

export const ImmovablePage = observer(() => {
    const store = useContext(Context).activesStore

    const [show, setShow] = useState<boolean>(false)

    const handleShow = () => {
        setShow(true)
    }

    return (
        <>
            <SpinnerLoader loading={store.loading} />
            <section className="immovables__page">
                    <div className="container">
                        <div className="immovables__page-content">
                            <h1 className="immovables__page-title">Недвижимость</h1>
                            <FinanceTable
                                income={store.actives && store.actives.properties ? store.actives.properties.total_income : 0}
                                expenses={store.actives && store.actives.properties ? store.actives.properties.total_expenses : 0}
                                profit={store.actives && store.actives.properties ? store.actives.properties.total_funds : 0}
                                setShow={handleShow} 
                                common_title={""} 
                                income_title={""} 
                                expenses_title={""}                            
                            />
                            {store.actives?.properties!.properties.length === 0 &&
                                <p className="immovables__page-empty">
                                    Транспорта нет
                                </p>
                            }
                            <ImmovableItems items={store.actives?.properties.properties}/>
                        </div>
                    </div>
            </section>
            <OverlayModal showModalClass={show ? 'modal--active' : ''}>
                <ImmovableModal setShow={setShow}/>
            </OverlayModal>
        </>
    )
})