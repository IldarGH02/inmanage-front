import { IAssetsCardDTO } from "../../../app/types/dto/assets/cards/IAssetsCard";
import { observer } from "mobx-react-lite";
import "./CategoriesCard.scss";

interface IAssetsCard {
    data: IAssetsCardDTO
}

export const CategoriesCard = observer(({data}: IAssetsCard) => {

    return (
        <div className="categories__card" style={{background: `url(${data.img}) center center no-repeat`, backgroundSize: '103%', backgroundPositionY: '25%'}}>
            <h3 className="categories__card-title">
                {data.name}
            </h3>
            <div className="categories__card-content">
                <p className="categories__card-text">Кол-во: <b>{data.count.toLocaleString()}</b></p>
                <p className="categories__card-text">Стоимость: <b>{data.sum.toLocaleString()} ₽</b></p>
                
                {data.income !== undefined && 
                    <p className="categories__card-text">Доход: <b>{data.income.toLocaleString()} ₽</b></p>
                }

                <p className="categories__card-text">Расход: <b>{data.expenses} ₽</b></p>
            </div>
        </div>
    )
})