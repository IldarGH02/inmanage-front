import { useState } from "react";
import { Link } from "react-router-dom";
import { observer } from 'mobx-react-lite'

import { General } from "../../widgets/assets/General/GeneralBalance/General";
import { AssetsCard } from "../../widgets/assets/General/AssetsCard/AssetsCard";
import { Background } from "../../widgets/elements/Background/Background";
import ActivesStore from "../../app/store/activesStore";
// import { AddTaskPanel } from "../../widgets/planner/TasksBlock/AddTaskBlock/AddTaskPanel/AddTaskPanel";

import loansImg from "../../shared/assets/img/assets/cards/loans.png"
import assetsBckg from "../../shared/assets/img/assets/assetsBckg.png"
// import propertyImg from "../../shared/assets/img/assets/cards/property.png" 
// import businessImg from "../../shared/assets/img/assets/cards/business.png"
// import transportImg from "../../shared/assets/img/assets/cards/transport.png"
// import securitiesImg from "../../shared/assets/img/assets/cards/securities.png"
// import valuableImg from "../../shared/assets/img/assets/cards/valuable.png"

// const propertyImg = require("../../assets/img/assets/cards/property.png")
// const businessImg = require("../../assets/img/assets/cards/business.png")
// const transportImg = require("../../assets/img/assets/cards/transport.png")
// const securitiesImg = require("../../assets/img/assets/cards/securities.png")
// const valuableImg = require("../../assets/img/assets/cards/valuable.png")
// const loansImg = require("../../assets/img/assets/cards/loans.png")
// const assetsBckg = require('../../assets/img/assets/assetsBckg.png')

import "./assetsPage.css"

function AssetsPage() {
    const [store] = useState(
        () => new ActivesStore()
    )

    return (
        <>
        <Background imgBckg={assetsBckg}/>
        
        <div className="assets-page" >
            <div className="assets-page__container">
                {/* <AddTaskPanel
                    data={}
                    onClose={}
                /> */}
                <div className="assets-page__general-balance">
                    <General sum={store.actives ? store.actives.total_funds : 0}/>
                </div>
                <div className="assets-page__cards-container">
                    <Link to="property">
                    <AssetsCard data={{
                        name: 'Недвижимость',
                        count:  store.actives ? (store.actives.properties !== null ? store.actives.properties.properties.length : 0 ) : 0,
                        sum: store.actives ? (store.actives.properties !== null ? store.actives.properties.total_funds : 0 ) : 0,
                        income: store.actives ? (store.actives.properties !== null ? store.actives.properties.total_income : 0 ) : 0,
                        expenses: store.actives ? (store.actives.properties !== null ? store.actives.properties.total_expenses : 0 ) : 0,
                        img: 'propertyImg'
                    }}/>
                    </Link>
                    <Link to="transport">
                    <AssetsCard data={{
                        name: 'Транспорт',
                        count:  store.actives ? (store.actives!.transports !== null ? store.actives?.transports.transport.length : 0 ) : 0,
                        sum: store.actives ? (store.actives!.transports !== null ? store.actives?.transports.total_funds : 0 ) : 0,
                        income: store.actives ? (store.actives!.transports !== null ? store.actives?.transports.total_income : 0 ) : 0,
                        expenses: store.actives ? (store.actives!.transports !== null ? store.actives?.transports.total_expenses : 0 ) : 0,
                        img: 'transportImg'
                    }}/>
                    </Link>
                    <Link to="business">
                    <AssetsCard data={{
                        name: 'Бизнес',
                        count:  store.actives ? (store.actives!.businesses !== null ? store.actives?.businesses.businesses.length : 0 ) : 0,
                        sum: store.actives ? (store.actives!.businesses !== null ? store.actives?.businesses.total_funds : 0 ) : 0,
                        income: store.actives ? (store.actives!.businesses !== null ? store.actives?.businesses.total_income : 0 ) : 0,
                        expenses: store.actives ? (store.actives!.businesses !== null ? store.actives?.businesses.total_expenses : 0 ) : 0,
                        img: 'businessImg'
                    }}/>
                    </Link>
                    <Link to="securities">
                    <AssetsCard data={{
                        name: 'Ценные бумаги',
                        count: store.actives ? (store.actives!.securities !== null ? store.actives?.securities.securities.length : 0 ) : 0,
                        sum: store.actives ? (store.actives!.securities !== null ? store.actives?.securities.total_funds : 0 ) : 0,
                        income: 0,
                        expenses: 0,
                        img: 'securitiesImg'
                    }}/>
                    </Link>
                    <Link to="valuables">
                    <AssetsCard data={{
                        name: 'Драгоценности',
                        count: store.actives ? (store.actives!.jewelries !== null ? store.actives?.jewelries.jewelries.length : 0 ) : 0,
                        sum: store.actives ? (store.actives!.jewelries !== null ? store.actives?.jewelries.total_funds : 0 ) : 0,
                        income: 0,
                        expenses: 0,
                        img: 'valuableImg'
                    }}/>
                    </Link>
                    <Link to="deposits">
                    <AssetsCard data={{
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
        </>
    )
}

export default observer(AssetsPage)
