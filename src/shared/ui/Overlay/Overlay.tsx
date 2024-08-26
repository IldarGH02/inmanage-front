import { Spinner } from 'react-bootstrap'

interface IOverlay {
    active: string
}

export const Overlay: React.FC<IOverlay> = ({active}) => {
    return (
        <div className={`overlay ${active}`}>
            <div className="container">
                <div className="overlay__content">
                    <Spinner animation="border" variant="light"/>
                </div>
            </div>
        </div>
    )
}