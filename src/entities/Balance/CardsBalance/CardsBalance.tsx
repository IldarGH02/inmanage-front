import React, { useEffect } from "react"
import { ICard } from "../../../app/types/balance/IBalance"
import { CardItems } from "../../../widgets/Balance/CardItems/CardItems"



interface ICardsBalance {
    sum: number,
    cards: ICard[]
}

export function CardsBalance({sum, cards}: ICardsBalance) {

    useEffect(()=>{
        console.log(cards)
    }, [cards])

    return (
        <div className="card">
            <h2 className="card__title">
                Карты и наличные
            </h2>
            <div className="card__balance">
                <p className="card__balance-sum">{sum.toLocaleString(undefined, {minimumFractionDigits: 1})}</p>
                <p className="card__balance-valuta">₽</p>
            </div>
            <CardItems items={cards}/>
        </div>

    )
} 