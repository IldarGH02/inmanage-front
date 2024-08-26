import { FC } from "react"
import { Card } from "../../../app/types/dto/DtoTypes.ts"
import { CardItems } from "../../../widgets/Balance/CardItems/CardItems"
import { Button } from "../../../shared/ui/Buttons/Button.tsx";
import { observer } from "mobx-react-lite";

interface CardsBalanceProps {
    sum: number,
    cards: Card[],
    handleShow: () => void
}

export const CardsBalance: FC<CardsBalanceProps> = observer((
    {
        sum,
        cards,
        handleShow
    }) => {

    return (
        <div className="card">
            <Button
                className="card__action"
                onClick={handleShow}
                textButton='Карты и наличные'
                type='button'
                name='show_cards'
            />
            <div className="card__balance">
                <p className="card__balance-sum">{sum.toLocaleString(undefined, {minimumFractionDigits: 1})}</p>
                <p className="card__balance-valuta">₽</p>
            </div>
            <CardItems items={cards}/>
        </div>

    )
})