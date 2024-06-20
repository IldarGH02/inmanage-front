import React from "react";
import "./inputAddress.css"
import "./input_validation.js"


export function InputAddress() {
    return (
        <>
            <div className="input-address"></div>
            <div className="input-address__header">
                <input type="text" id="suggest" placeholder="Введите адрес"/>
                <button type="submit" id="input-address__access-btn">Подтвердить</button>
            </div>
            <p id="notice">Адрес не найден</p>
            <div id="map"></div>
        </>
    )
}