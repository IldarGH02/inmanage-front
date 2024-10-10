import { useContext, useEffect } from "react";
import "./valuablePage.css"
import { FinanceTable } from "../../../widgets/elements/FinanceTable/FinanceTable.tsx";
import { Context } from "../../../main.tsx";
import { JewelryItems } from "../../../widgets/Actives/Jewelry/JewelryItems.tsx";
import { OverlayModal } from "../../../shared/ui/Overlay/OverlayModal.tsx";
import { JewelryModal } from "../../../widgets/Modals/JewerlyModal/JewelryModal.tsx";
import { observer } from "mobx-react-lite";

export const JewelryPage = observer(() => {
    const { activesStore, jewelryStore } = useContext(Context).rootStore

    useEffect(() => {
        const response = activesStore.fetchActives()
        activesStore.setLoading(true)
        response.then(res => {
            if(res.status >= 200 && res.status < 300) {
                activesStore.setActives(res.data)
                activesStore.setLoading(false)
                if(res.data.jewelries) {
                    jewelryStore.setJewelryList(res.data.jewelries?.jewelries)
                }
            }
        })
    }, [])

    return (
        <>
            <section className="jewelry-page">
                <div className="container" >
                    <h1 className="jewelry-page__title">Драгоценности</h1>
                        {
                            activesStore.actives?.jewelries &&
                            <FinanceTable 
                                setShow={jewelryStore.setShow}
                                price={activesStore.actives?.jewelries?.total_funds}
                                expenses={activesStore.actives?.jewelries?.total_expenses}
                                profit={activesStore.actives?.jewelries?.total_income} 
                                income_title="Стоимость" 
                                expenses_title="Расходы"                   
                            />
                        }
                        {
                            activesStore.actives?.jewelries && 
                            <JewelryItems items={activesStore.actives?.jewelries?.jewelries} loading={activesStore.loading}/> 
                        }
                </div>
            </section>
            <OverlayModal showModalClass={jewelryStore.show ? 'modal--active' : ''}>
                <JewelryModal/>
            </OverlayModal>
        </>
    )
})