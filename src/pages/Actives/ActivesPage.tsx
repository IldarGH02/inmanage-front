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
    const { activesStore } = useContext(Context).rootStore;

    useEffect(() => {
        const response = activesStore.fetchActives()
        activesStore.setLoading(true)
        response.then(res => {
            if(res.status >= 200 && res.status < 300) {
                activesStore.setLoading(false)
                activesStore.setActives(res.data)
            }
        }).catch(e => {
            activesStore.setError(e)
        })
    }, [activesStore]);

    return (
        <>
            <SpinnerLoader loading={activesStore.loading}/>
            <div className="assets-page" >
                <div className="container">
                    <div className="actives__page-content">
                        <div className="assets-page__general-balance">
                             <General sum={activesStore.actives ? activesStore.actives.total_funds : 0}/>
                        </div>
                        <div className="assets-page__cards-container">
                            <Link to="property">
                                <CategoriesCard data={{
                                    name: 'Недвижимость',
                                    count: activesStore.actives ? (activesStore.actives.properties !== null ? activesStore.actives.properties.properties.length : 0) : 0,
                                    sum: activesStore.actives ? (activesStore.actives.properties !== null ? activesStore.actives.properties.total_funds : 0) : 0,
                                    income: activesStore.actives ? (activesStore.actives.properties !== null ? activesStore.actives.properties.total_income : 0) : 0,
                                    expenses: activesStore.actives ? (activesStore.actives.properties !== null ? activesStore.actives.properties.total_expenses : 0) : 0,
                                    img: propertyImg
                                }}/>
                            </Link>
                            <Link to="transport">
                                <CategoriesCard data={{
                                    name: 'Транспорт',
                                    count: activesStore.actives ? (activesStore.actives.transports !== null ? activesStore.actives.transports.transport.length : 0) : 0,
                                    sum: activesStore.actives ? (activesStore.actives.transports !== null ? activesStore.actives.transports.total_funds : 0) : 0,
                                    income: activesStore.actives ? (activesStore.actives.transports !== null ? activesStore.actives.transports.total_income : 0) : 0,
                                    expenses: activesStore.actives ? (activesStore.actives.transports !== null ? activesStore.actives.transports.total_expenses : 0) : 0,
                                    img: transportImg
                                }}/>
                            </Link>
                            <Link to="business">
                                <CategoriesCard data={{
                                    name: 'Бизнес',
                                    count: activesStore.actives ? (activesStore.actives.businesses !== null ? activesStore.actives.businesses.businesses.length : 0) : 0,
                                    sum: activesStore.actives ? (activesStore.actives.businesses !== null ? activesStore.actives.businesses.total_funds : 0) : 0,
                                    income: activesStore.actives ? (activesStore.actives.businesses !== null ? activesStore.actives.businesses.total_income: 0) : 0,
                                    expenses: activesStore.actives ? (activesStore.actives.businesses !== null ? activesStore.actives.businesses.total_expenses : 0) : 0,
                                    img: businessImg
                                }}/>
                            </Link>
                            <Link to="securities">
                                <CategoriesCard data={{
                                    name: 'Ценные бумаги',
                                    count: activesStore.actives ? (activesStore.actives.securities !== null ? activesStore.actives.securities.securities.length : 0) : 0,
                                    sum: activesStore.actives ? (activesStore.actives.securities !== null ? activesStore.actives.securities.total_funds : 0) : 0,
                                    income: 0,
                                    expenses: 0,
                                    img: securitiesImg
                                }}/>
                            </Link>
                            <Link to="jewelry">
                                <CategoriesCard data={{
                                    name: 'Драгоценности',
                                    count: activesStore.actives ? (activesStore.actives.jewelries !== null ? activesStore.actives.jewelries.jewelries.length : 0) : 0,
                                    sum: activesStore.actives ? (activesStore.actives.jewelries !== null ? activesStore.actives.jewelries.total_funds : 0) : 0,
                                    income: 0,
                                    expenses: 0,
                                    img: valuableImg
                                }}/>
                            </Link>
                            <Link to="loan">
                                <CategoriesCard data={{
                                    name: 'Вклады и займы',
                                    count: activesStore.actives ? (activesStore.actives.loans !== null ? activesStore.actives.loans.loans.length : 0) : 0,
                                    sum: activesStore.actives ? (activesStore.actives.loans !== null ? activesStore.actives.loans.total_funds : 0) : 0,
                                    income: activesStore.actives ? (activesStore.actives.loans !== null ? activesStore.actives.loans.total_income: 0) : 0,
                                    expenses: activesStore.actives ? (activesStore.actives.loans !== null ? activesStore.actives.loans.total_expenses : 0) : 0,
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
