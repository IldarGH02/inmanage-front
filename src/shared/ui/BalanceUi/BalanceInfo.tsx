import { FC } from "react"

interface IBalanceInfo {
    balanceText: string;

    classNameElement: string
    classNameTitle: string
    classNameContainer: string
    classNameSum: string
    classNameValuta: string
    className: string

    sum: number;
    handleShow: React.MouseEventHandler<HTMLDivElement>
}

export const BalanceInfo: FC<IBalanceInfo> = (
    {
        sum, 
        balanceText, 
        classNameElement,
        classNameTitle,
        classNameContainer,
        classNameSum,
        className,
        classNameValuta,
        handleShow
    }) => {

    return (
        <div className={className} onClick={handleShow}>
            <div className={classNameElement}>
                <h3 className={classNameTitle}>{balanceText}</h3>
                <div className={classNameContainer}>                
                    <div className={classNameSum}>{sum.toLocaleString(undefined, {minimumFractionDigits: 1})} </div>
                    <div className={classNameValuta}>₽</div>
                </div>
            </div>
        </div>
    )
}