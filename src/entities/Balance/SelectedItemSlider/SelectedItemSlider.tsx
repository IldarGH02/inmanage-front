import "./selectedItemSlider.css";

interface ISelectedItemSlider {
    img: string,
    title: string, 
    subtitle?: string,
    onClickItem: () => void
}

export function SelectedItemSlider({img, title, subtitle, onClickItem}: ISelectedItemSlider) {
    return (
        <div className="selected-item-slider" onClick={onClickItem}>
            <img className="selected-item-slider__img" src={img} alt="img" />
            <div className="selected-item-slider__info">
                <div className="selected-item-slider__title">{title}</div>
                {subtitle && <div className="selected-item-slider__subtitle">{subtitle}</div>}
            </div>
        </div>
    )
}