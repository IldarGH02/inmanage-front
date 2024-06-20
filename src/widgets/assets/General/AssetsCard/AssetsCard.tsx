import React from "react"
import "./assetsCard.css"
import { IAssetsCardDTO } from "../../../../app/types/dto/assets/cards/IAssetsCard"

interface IAssetsCard {
    data: IAssetsCardDTO
}

export function AssetsCard({data}: IAssetsCard) {

    return (
        <div className="assets-card" style={{background: `url(${data.img}) center center no-repeat`, backgroundSize: '103%', backgroundPositionY: '25%'}}>
            <div className="assets-card__title">
                {data.name}
            </div>
            <div className="assets-card__content">
                <div className="assets-card__item">
                    <div className="assets-card__item-text">Кол-во: <b>{data.count.toLocaleString()}</b></div>
                    {/* <p>{data.count}</p> */}
                </div>
                <div className="assets-card__item">
                    <div className="assets-card__item-text">Стоимость: <b>{data.sum.toLocaleString()} ₽</b></div>
                    {/* <p>{data.sum.toLocaleString()} ₽</p> */}
                </div>
                <div className="assets-card__item">
                {data.income !== undefined && 
                    <div className="assets-card__item-text">Доход: <b>{data.income.toLocaleString()} ₽</b></div>
                }
                    {/* <p>{data.income.toLocaleString()} ₽</p> */}
                </div>
                <div className="assets-card__item">
                    <div className="assets-card__item-text">Расход: <b>{data.expenses} ₽</b></div>
                    {/* <p>{data.expense.toLocaleString()} ₽</p> */}
                </div>
            </div>
        </div>
    )
}