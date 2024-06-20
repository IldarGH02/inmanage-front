import { FC } from "react"
import { Link } from "react-router-dom"

interface IBalanceInfo {
    balanceText: string;
    path: string;

    classNameElement: string
    classNameTitle: string
    classNameContainer: string
    classNameSum: string
    classNameValuta: string
    classNameLink: string

    sum: number;
}

export const BalanceInfo: FC<IBalanceInfo> = (
    {
        sum, 
        balanceText, 
        path, 
        classNameElement,
        classNameTitle,
        classNameContainer,
        classNameSum,
        classNameLink,
        classNameValuta
    }) => {

    return (
        <Link to={path} className={classNameLink}>
            <div className={classNameElement}>
                <h3 className={classNameTitle}>{balanceText}</h3>
                <div className={classNameContainer}>                
                    <div className={classNameSum}>{sum.toLocaleString(undefined, {minimumFractionDigits: 1})} </div>
                    <div className={classNameValuta}>₽</div>
                </div>
            </div>
        </Link>
    )
}