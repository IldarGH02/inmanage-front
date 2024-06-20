import "./cardItemBalance.css";

interface ICardItemBalance {
    id: number,
    img: string,
    name: string,
    sum: number,
    onEdit: (id: number)=>void,
    onRemoveCard: (id: number) => void
}

export function CardItemBalance({id, img, name, sum, onEdit, onRemoveCard}: ICardItemBalance) {

    function calculateFontSize(length: number):string {
        if(length>11 && length<35) {
            return '25px'
        } 
        return '35px'
    }

    return (
        <div className="card-item-balance">
            <img className="card-item-balance__img" src={img} />
            <div className="card-item-balance__container">
                <div className="card-item-balance__name" style={{fontSize: `${calculateFontSize(sum.toLocaleString().length)}` }}>{name}</div>
                <div className="card-item-balance__sum-wrapper" style={{fontSize: `${calculateFontSize(sum.toLocaleString().length)}` }}>
                    <div className="card-item-balance__sum">{sum.toLocaleString()}</div>
                    <b className="card-item-balance__valuta"> ₽</b>
                </div>
            </div>
            {/* <div className="card-item-balance__actions-wrapper"> */}
                <div className="card-item-balance__actions">
                    <b className="card-item-balance__actions-title">...</b>
                    <div className="card-item-balance__actions-list">
                        <div className="card-item-balance__action-item" onClick={()=>onEdit(id)}>Редактировать</div>
                        <div className="card-item-balance__action-item" onClick={()=>onRemoveCard(id)}>Удалить</div>
                    </div>
                </div>
            {/* </div> */}
        </div>
    )
}