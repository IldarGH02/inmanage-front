import { FC } from "react"
import Slider from "react-slick";
import { ExpenseList } from "../../app/types/balance/IBalance.ts";
// import { Slide } from "./Slide.tsx";

export type SliderType = {
    dots: boolean,
    infinite: boolean,
    speed: number,
    slidesToShow: number,
    slidesToScroll: number,
    swap: boolean,
    arrows?: boolean
}

interface ISlider {
    classNameSlider: string;
    items: ExpenseList
    settings: SliderType
}

export const Sliders: FC<ISlider> = (
    {
        // items,
        classNameSlider,
        settings,
    }) => {

    return (
        <Slider
            className={classNameSlider}
            {...settings}
            >
                {/* {items.map((item) => (
                    <Slide item={item}/>
                ))} */}
        </Slider>
    )
}