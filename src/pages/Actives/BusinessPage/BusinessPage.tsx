import { useContext, useEffect, useState } from "react";
import "./businessPage.css"
import { FinanceTable } from "../../../widgets/elements/FinanceTable/FinanceTable";
import { Context } from "../../../main.tsx";
import { OverlayModal } from "../../../shared/ui/Overlay/OverlayModal.tsx";
import { BusinessModal } from "../../../widgets/Modals/BusinessModal/BusinessModal.tsx";
import { Link } from "react-router-dom";
import { ItemAssets } from "../../../widgets/assets/ItemAssets/ItemAssets.tsx";
import homeImg from "../../../shared/assets/img/assets/business.jpg"
import { SpinnerLoader } from "../../../widgets/elements/SpinnerLoader/SpinnerLoader.tsx";
import { observer } from "mobx-react-lite";
import { Card } from "../../../app/types/dto/DtoTypes.ts";

export const BusinessPage = observer(() => {
    const { activesStore, balanceStore, businessCreateStore } = useContext(Context).rootStore
    let card_list: Card[] = []

    const [show, setShow] = useState<boolean>(false)

    useEffect(() => {
        const response = activesStore.fetchActives()
        activesStore.setLoading(true)
        response.then(res => {
            if(res.status >= 200 && res.status < 300) {
                activesStore.setActives(res.data)
                activesStore.setLoading(false)

                const response = balanceStore.fetchBalance()
                response.then(res => {
                    card_list = res.data.card_list
                    businessCreateStore.setCardList(card_list)
                })
            }
        }).catch(error => activesStore.setError(error))


    }, [activesStore])

    return (
        <>
            <SpinnerLoader loading={activesStore.loading} />
            <div className="business-page">
                <div className="container" >
                    <div className="business-page__title">Бизнес</div>
                    <div className="business-page__finances">
                        <FinanceTable 
                            setShow={setShow}
                            income={activesStore.actives && activesStore.actives.businesses ? activesStore.actives.businesses.total_income : 0}
                            expenses={activesStore.actives && activesStore.actives.businesses ? activesStore.actives.businesses.total_expenses : 0}
                            profit={activesStore.actives && activesStore.actives.businesses ? activesStore.actives.businesses.total_funds : 0} 
                            common_title={""} 
                            income_title={""} 
                            expenses_title={""}                        
                        />
                    </div>
                    <div className="business-page__list-container">
                        {activesStore.actives?.businesses!.businesses.length === 0 &&
                            <div className="business-page__list-empty">
                                Безнеса нет
                            </div>
                        }
                        <div className="business-page__list">
                            {activesStore.actives?.businesses!.businesses.map((el)=>{
                                return (
                                    <Link className="business-page__item" to={`${el.id}`} key={el.id}>
                                        <ItemAssets 
                                            title={el.name} 
                                            img={homeImg}
                                            actualPrice={0}
                                            income={el.total_income}
                                            profit={el.average_profit} 
                                        />
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <OverlayModal showModalClass={show ? 'modal--active' : ''}>
                <BusinessModal setShow={setShow}/>
            </OverlayModal>
        </>
    )
})
