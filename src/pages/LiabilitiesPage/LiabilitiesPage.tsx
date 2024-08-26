import { useContext, useEffect } from "react";
import "./liabilitiesPage.scss"
import { General } from "../../widgets/assets/General/GeneralBalance/General";
import { CategoriesCard } from "../../entities/ui/CategoriesCards/CategoriesCard";
import { Link } from "react-router-dom";
import { SpinnerLoader } from "../../widgets/elements/SpinnerLoader/SpinnerLoader";

import propertyImg from "../../shared/assets/img/assets/cards/property.png"
import transportImg from "../../shared/assets/img/assets/cards/transport.png"
import loansImg from "../../shared/assets/img/assets/cards/loans.png"
import loanIcon from "../../shared/assets/img/liabilities/loanIcon.png"
import { observer } from "mobx-react-lite";
import { Context } from "../../main";

export const LiabilitiesPage = observer(() => {
    const store = useContext(Context).liabilitiesStore

    useEffect(()=>{
            const response = store.fetchLiabilities()
            store.setLoading(true)
            response.then(res => {
                if(res.status >= 200 && res.status < 300) {
                    store.setLoading(false)
                    store.setLiabilities(res.data)
                    console.log(res.data)
                }
            })
            .catch((error) => {
                store.setError(error)
            })        
    },[])

    return (
        <>
            {/* <AlertState>
                <ModalState>
                    
                </ModalState>
            </AlertState> */}
            <SpinnerLoader loading={store.loading} />
            <section className="liabilities__page">
                <div className="container" >
                    <div className="liabilities__page-balance">
                        <General sum={store.liabilities ? store.liabilities?.total_funds : 0}/>
                    </div>
                    <div className="liabilities__page-cards">
                        <Link to="property">
                        <CategoriesCard data={{
                            name: 'Недвижимость',
                            count:  store.liabilities ? (store.liabilities!.properties !== null ? store.liabilities?.properties.properties.length : 0 ) : 0,
                            sum: store.liabilities ? (store.liabilities!.properties !== null ? store.liabilities?.properties.total_funds : 0 ) : 0,
                            expenses: store.liabilities ? (store.liabilities!.properties !== null ? store.liabilities?.properties.total_expenses : 0 ) : 0,
                            img: propertyImg
                        }}/>
                        </Link>
                        <Link to="transport">
                        <CategoriesCard data={{
                            name: 'Транспорт',
                            count:  store.liabilities ? (store.liabilities!.transports !== null ? store.liabilities?.transports.transport.length : 0 ) : 0,
                            sum: store.liabilities ? (store.liabilities!.transports !== null ? store.liabilities?.transports.total_funds : 0 ) : 0,
                            expenses: store.liabilities ? (store.liabilities!.transports !== null ? store.liabilities?.transports.total_expenses : 0 ) : 0,
                            img: transportImg
                        }}/>
                        </Link>
                        
                        <Link to="loan">
                        <CategoriesCard data={{
                            name: 'Кредит',
                            count:  store.liabilities ? (store.liabilities!.loans !== null ? store.liabilities?.loans.loans.length : 0 ) : 0,
                            sum: store.liabilities ? (store.liabilities!.loans !== null ? store.liabilities?.loans.total_funds : 0 ) : 0,
                            expenses: store.liabilities ? (store.liabilities!.loans !== null ? store.liabilities?.loans.total_expenses : 0 ) : 0,
                            img: loansImg
                        }}/>
                        </Link>

                        <Link to="borrow">
                        <CategoriesCard data={{
                            name: 'Займ',
                            count:  store.liabilities ? (store.liabilities!.loans !== null ? store.liabilities?.loans.loans.length : 0 ) : 0,
                            sum: store.liabilities ? (store.liabilities!.loans !== null ? store.liabilities?.loans.total_funds : 0 ) : 0,
                            expenses: store.liabilities ? (store.liabilities!.loans !== null ? store.liabilities?.loans.total_expenses : 0 ) : 0,
                            img: loanIcon
                        }}/>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    )
})