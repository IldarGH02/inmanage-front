import { useContext, useEffect } from "react";
import "./valuablePage.css"
import { FinanceTable } from "../../../widgets/elements/FinanceTable/FinanceTable.tsx";
import { Context } from "../../../main.tsx";
import { JewerlyItems } from "../../../widgets/Actives/Jewerly/JewerlyItems.tsx";
import { OverlayModal } from "../../../shared/ui/Overlay/OverlayModal.tsx";
import { JewerlyModal } from "../../../widgets/Modals/JewerlyModal/JewerlyModal.tsx";
import { observer } from "mobx-react-lite";

export const JewerlyPage = observer(() => {
    const { activesStore, jewerlyStore } = useContext(Context)

    useEffect(() => {
        const response = activesStore.fetchActives()
        activesStore.setLoading(true)
        response.then(res => {
            if(res.status >= 200 && res.status < 300) {
                activesStore.setActives(res.data)
                activesStore.setLoading(false)
                if(res.data.jewelries) {
                    jewerlyStore.setJewerlyList(res.data.jewelries?.jewelries)
                }
            }
        })
    }, [])

    return (
        <>
            <section className="jewerly-page">
                <div className="container" >
                    <h1 className="jewerly-page__title">Драгоценности</h1>
                        <FinanceTable 
                            setShow={jewerlyStore.setShow}
                            price={activesStore.actives?.jewelries?.total_funds}
                            expenses={activesStore.actives?.jewelries?.total_expenses!}
                            profit={activesStore.actives?.jewelries?.total_income} 
                            income_title="Стоимость" 
                            expenses_title="Расходы"                   
                        />
                        {
                            activesStore.actives?.jewelries && 
                            <JewerlyItems items={activesStore.actives?.jewelries?.jewelries} loading={activesStore.loading}/> 
                        }
                </div>
            </section>
            <OverlayModal showModalClass={jewerlyStore.show ? 'modal--active' : ''}>
                <JewerlyModal/>
            </OverlayModal>
        </>
    )
})