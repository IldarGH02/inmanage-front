import { useContext, useEffect } from "react";
import { FinanceTable } from "../../../widgets/elements/FinanceTable/FinanceTable";
import { Context } from "../../../main.tsx";
import { SecuritiesItems } from "../../../widgets/Actives/Securities/SecuritiesItems.tsx";
import { observer } from "mobx-react-lite";
import "./SecuritiesPage.scss";
import { OverlayModal } from "../../../shared/ui/Overlay/OverlayModal.tsx";
import { SecuritiesModal } from "../../../widgets/Modals/SecurititesModal/SecurititesModal.tsx";

export const SecuritiesPage = observer(() => {
    const { activesStore, securitiesStore } = useContext(Context)

    useEffect(() => {
        const response = activesStore.fetchActives()
        activesStore.setLoading(true)
        response.then(res => {
            if(res.status >= 200 && res.status < 300) {
                activesStore.setLoading(false)
                activesStore.setActives(res.data)

                if(!localStorage.getItem('securities')) {
                    const response = securitiesStore.fetchSecurities()
                    activesStore.setLoading(true)
                    response.then(res => {
                        if(res.status >= 200 && res.status < 300) {
                            console.log(res.data)
                            activesStore.setLoading(false)
                            localStorage.setItem('securities', JSON.stringify(res.data))
                            // securitiesStore.setSecuritiesList(res.data)
                        }
                    })
                }
            }
        }).catch(error => activesStore.setError(error))
    }, [activesStore, securitiesStore, localStorage])

    useEffect(() => {
        if(securitiesStore.loading) {
            const response = activesStore.fetchActives()
            activesStore.setLoading(securitiesStore.loading)
            response.then(res => {
                if(res.status >= 200 && res.status < 300) {
                    activesStore.setActives(res.data)
                    activesStore.setLoading(securitiesStore.loading)
                }
            })
            activesStore.setLoading(securitiesStore.loading)
        }
    }, [])

    return (
        <>
            <div className="securities__page">
                <div className="container" >
                    <div className="securities__page-title">Ценные бумаги</div>
                    <FinanceTable 
                        setShow={securitiesStore.setShow}
                        profit={activesStore.actives && activesStore.actives.securities ? activesStore.actives.securities.total_funds : 0}
                        income={activesStore.actives && activesStore.actives.securities ? activesStore.actives.securities.total_income : 0}
                        expenses={activesStore.actives && activesStore.actives.securities ? activesStore.actives.securities.total_expenses : 0}
                        income_title="Прибыль"
                        expenses_title="Убыток"
                        common_title="Стоимость"
                    />
                    <SecuritiesItems items={activesStore.actives?.securities.securities} loading={activesStore.loading}/>
                </div>
            </div>
            <OverlayModal showModalClass={securitiesStore.show ? 'modal--active' : ''}>
                <SecuritiesModal/>
            </OverlayModal>
        </>
    )
})