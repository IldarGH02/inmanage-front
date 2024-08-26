import { FC } from "react"
// import { IPayment } from "../../../app/types/balance/IPayment"
import { IPaymentMock } from "../../../features/mocks"
import { PaymentItem } from "./PaymentsItem/PaymentItem"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { PaymentItem } from "./PaymentsItem/PaymentItem"

interface IPaymentsItems {
    // items: IPayment[]
    items: IPaymentMock[]
}

export const PaymentsItems: FC<IPaymentsItems> = ({items}) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
    
    };

    return (
        <Slider
            className="payments__items"
            {...settings}
            >
                { items.map((item: IPaymentMock) => {
                    return <PaymentItem item={item} key={item.id}/>
                })}
        </Slider>
    )
}