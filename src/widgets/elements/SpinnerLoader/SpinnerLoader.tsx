import React from "react";
import "./spinnerLoader.css";
import { RotatingLines } from "react-loader-spinner";

interface ISpinnerLoader {
    loading: boolean,
}

export function SpinnerLoader({loading}: ISpinnerLoader) {

    if(loading) {
        return (
            <div className="spinner-loader">
                <div className="spinner-loader__container">
                    <RotatingLines
                        visible={true}
                        width="96"
                        strokeColor="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                    />
                </div>
            </div>
        )
    } else {
        return null
    }
}
