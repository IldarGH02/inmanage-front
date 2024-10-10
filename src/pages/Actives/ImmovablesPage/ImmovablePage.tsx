import { useContext } from "react";
import { FinanceTable } from "../../../widgets/elements/FinanceTable/FinanceTable";
import { SpinnerLoader } from "../../../widgets/elements/SpinnerLoader/SpinnerLoader";

import {OverlayModal} from "../../../shared/ui/Overlay/OverlayModal.tsx";
import {observer} from "mobx-react-lite";
import { Context } from "../../../main.tsx";

import "./immovablesPage.scss"
import { ImmovableItems } from "../../../widgets/Actives/Immovables/ImmovalbeItems.tsx";
import { CreateFormImmovables } from "../../../widgets/forms/actives/immovables/CreateFormImmovables/CreateFormImmovables.tsx";

export const ImmovablePage = observer(() => {
    const { activesStore, immovablesStore } = useContext(Context).rootStore

    return (
        <>
            <SpinnerLoader loading={activesStore.loading}/>
            <section className="immovables__page">
                    <div className="container">
                        <div className="immovables__page-content">
                            <h1 className="immovables__page-title">Недвижимость</h1>
                            <FinanceTable
                                income={activesStore.actives && activesStore.actives.properties ? activesStore.actives.properties.total_income : 0}
                                expenses={activesStore.actives && activesStore.actives.properties ? activesStore.actives.properties.total_expenses : 0}
                                profit={activesStore.actives && activesStore.actives.properties ? activesStore.actives.properties.total_funds : 0}
                                setShow={immovablesStore.setShow} 
                                common_title={""} 
                                income_title={""} 
                                expenses_title={""}                            
                            />
                            {activesStore.actives?.properties!.properties.length === 0 &&
                                <p className="immovables__page-empty">
                                    Недвижимости нет
                                </p>
                            }
                            <ImmovableItems items={activesStore.actives?.properties.properties}/>
                        </div>
                    </div>
            </section>
            <OverlayModal showModalClass={immovablesStore.show ? 'modal--active' : ''}>
                <CreateFormImmovables/>
            </OverlayModal>
        </>
    )
})