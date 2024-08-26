import {Sliders} from "../../../widgets/Sliders/Sliders.tsx";
import {ButtonAdd} from "../../../shared/ui/ButtonAdd/ButtonAdd.tsx";
import {ExpenseList} from "../../../app/types/balance/IBalance.ts";
import {FC} from "react";

interface IJobSliderContainer {
    items: ExpenseList
    handleClick: (id?: number|null)=>void,
}

export const JobSliderContainer: FC<IJobSliderContainer> = (
    {
        items,
        handleClick
    }) => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        swap: true,
        arrows: false
    }

    return (
        <div className="job__slider-container">
            <Sliders
                classNameSlider="job__slider"
                items={items}
                settings={settings}
            />
            <ButtonAdd
                classNameContainer="job__slider-button_container"
                classNameTitle="slider__button-title"
                classNameButton="slider__button"
                handleClickItem={handleClick}
            />
        </div>
    )
}