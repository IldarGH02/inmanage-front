import {useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { observer } from 'mobx-react-lite'

import { General } from "../../widgets/assets/General/GeneralBalance/General";
import { CategoriesCard } from "../../entities/ui/CategoriesCards/CategoriesCard.tsx";

import loansImg from "../../shared/assets/img/assets/cards/loans.png"
import propertyImg from "../../shared/assets/img/assets/cards/property.png"
import businessImg from "../../shared/assets/img/assets/cards/business.png"
import transportImg from "../../shared/assets/img/assets/cards/transport.png"
import securitiesImg from "../../shared/assets/img/assets/cards/securities.png"
import valuableImg from "../../shared/assets/img/assets/cards/valuable.png"

import "./assetsPage.css"
import { SpinnerLoader } from "../../widgets/elements/SpinnerLoader/SpinnerLoader.tsx";
import { Context } from "../../main.tsx";

export const ActivesPage = observer(() => {
    const store = useContext(Context).activesStore;

    useEffect(() => {
        const response = store.fetchActives()
        store.setLoading(true)
        response.then(res => {
            if(res.status >= 200 && res.status < 300) {
                store.setLoading(false)
                store.setActives(res.data)
                console.log(res.data)
            }
        }).catch(e => {
            store.setError(e)
        })
    }, [store]);

    return (
        <>
            <SpinnerLoader loading={store.loading}/>
            <div className="assets-page" >
                <div className="container">
                    <div className="actives__page-content">
                        <div className="assets-page__general-balance">
                             <General sum={store.actives ? store.actives.total_funds : 0}/>
                        </div>
                        <div className="assets-page__cards-container">
                            <Link to="property">
                                <CategoriesCard data={{
                                    name: 'Недвижимость',
                                    count: store.actives ? (store.actives.properties !== null ? store.actives.properties.properties.length : 0) : 0,
                                    sum: store.actives ? (store.actives!.properties !== null ? store.actives?.properties.total_funds : 0) : 0,
                                    income: store.actives ? (store.actives!.properties !== null ? store.actives?.properties.total_income : 0) : 0,
                                    expenses: store.actives ? (store.actives!.properties !== null ? store.actives?.properties.total_expenses : 0) : 0,
                                    img: propertyImg
                                }}/>
                            </Link>
                            <Link to="transport">
                                <CategoriesCard data={{
                                    name: 'Транспорт',
                                    count: store.actives ? (store.actives!.transports !== null ? store.actives?.transports.transport.length : 0) : 0,
                                    sum: store.actives ? (store.actives!.transports !== null ? store.actives?.transports.total_funds : 0) : 0,
                                    income: store.actives ? (store.actives!.transports !== null ? store.actives?.transports.total_income : 0) : 0,
                                    expenses: store.actives ? (store.actives!.transports !== null ? store.actives?.transports.total_expenses : 0) : 0,
                                    img: transportImg
                                }}/>
                            </Link>
                            <Link to="business">
                                <CategoriesCard data={{
                                    name: 'Бизнес',
                                    count: store.actives ? (store.actives!.businesses !== null ? store.actives?.businesses.businesses.length : 0) : 0,
                                    sum: store.actives ? (store.actives!.businesses !== null ? store.actives?.businesses.total_funds : 0) : 0,
                                    income: store.actives ? (store.actives!.businesses !== null ? store.actives?.businesses.total_income: 0) : 0,
                                    expenses: store.actives ? (store.actives!.businesses !== null ? store.actives?.businesses.total_expenses : 0) : 0,
                                    img: businessImg
                                }}/>
                            </Link>
                            <Link to="securities">
                                <CategoriesCard data={{
                                    name: 'Ценные бумаги',
                                    count: store.actives ? (store.actives!.securities !== null ? store.actives?.securities.securities.length : 0) : 0,
                                    sum: store.actives ? (store.actives!.securities !== null ? store.actives?.securities.total_funds : 0) : 0,
                                    income: 0,
                                    expenses: 0,
                                    img: securitiesImg
                                }}/>
                            </Link>
                            <Link to="jewerly">
                                <CategoriesCard data={{
                                    name: 'Драгоценности',
                                    count: store.actives ? (store.actives!.jewelries !== null ? store.actives?.jewelries.jewelries.length : 0) : 0,
                                    sum: store.actives ? (store.actives!.jewelries !== null ? store.actives?.jewelries.total_funds : 0) : 0,
                                    income: 0,
                                    expenses: 0,
                                    img: valuableImg
                                }}/>
                            </Link>
                            <Link to="deposits">
                                <CategoriesCard data={{
                                    name: 'Вклады и займы',
                                    count: 5,
                                    sum: 89980300,
                                    income: 454400,
                                    expenses: 75000,
                                    img: loansImg
                                }}/>
                            </Link>
                        </div>
                     </div>
                </div>
            </div>
        </>
    )
})
