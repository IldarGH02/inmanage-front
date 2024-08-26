
import "./historyOperationList.css";
import { IHistoryList } from "../../../../app/types/elements/IHistoryList";

interface IHistoryListProps {
    data: IHistoryList[]
}

export function HistoryOperationList({data}: IHistoryListProps) {

    const getDateString = (date: Date) => {
        const day = date.getDate()>9?date.getDate():'0'+date.getDate()
        const month = date.getMonth()>9?date.getMonth():'0'+date.getMonth()
        return day+'.'+month+'.'+date.getFullYear()+' '+date.getHours()+':'+date.getMinutes()
    }

    return (
        <div className="history-operation-list">
            {data.map(el=>{
                return (
                    <div className="history-operation-item" key={el.id}>
                        <div className="history-operation-item__date">{getDateString(el.date)}</div>
                        <div className="history-operation-item__container">
                            <div className="history-operation-item__title">– {el.title}</div>
                            {el.sum && el.sum>0 &&
                                <div className="history-operation-item__sum-plus">+ {el.sum.toLocaleString()} <b className="deposit-history-item__valuta"> ₽</b></div>
                            }
                            {el.sum && el.sum<0 &&
                                <div className="history-operation-item__sum-minus">- {(-el.sum).toLocaleString()} <b className="deposit-history-item__valuta"> ₽</b></div>
                            }
                        </div>
                    </div>
                )
            })}
        </div>
        
    )
}