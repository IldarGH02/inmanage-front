import React from "react";
import "./general.css"

interface IGeneral {
    sum: number,
}

export function General({sum}: IGeneral) {

    return (
        <div className="assets-general">
            <span>Общий баланс</span>
            <b>{sum.toLocaleString()} ₽</b>
        </div>
    )
}