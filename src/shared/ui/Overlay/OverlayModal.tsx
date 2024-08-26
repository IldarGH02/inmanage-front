import { FC } from "react"

interface IOverlayModal {
    children: React.ReactNode
    showModalClass: string
}

export const OverlayModal: FC<IOverlayModal> = ({children, showModalClass} ) => {
    return (
        <div id="overlay__modal" className={`overlay__modal ${showModalClass}`}>
            {children}
        </div>
    )
}