import "./background.css";

interface IBackground {
    imgBckg: string
}

export function Background({imgBckg}: IBackground) {
    return (
        <div className="background">
            <div className="background-wrapper1">
                <img id="imgBckg1" src={imgBckg} alt="imgBckg" />
                <img id="imgBckg2" src={imgBckg} alt="imgBckg" />
            </div>
            <div className="background-wrapper2">
                <img id="imgBckg3" src={imgBckg} alt="imgBckg" />
                <img id="imgBckg4" src={imgBckg} alt="imgBckg" />
            </div>
        </div>
    )
}