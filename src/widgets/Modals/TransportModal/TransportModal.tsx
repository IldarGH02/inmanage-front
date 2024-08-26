import {FC, useContext} from "react";
import {observer} from "mobx-react-lite";

import { TransportForm } from "../../Actives/Transport/TransportForm.tsx";
import { SpinnerLoader } from "../../elements/SpinnerLoader/SpinnerLoader.tsx";

import "./addTransportPage.css"
import {Context} from "../../../main.tsx";


interface TransportModalProps {
    active: string
    handleClose: () => void
    setShow: (bool: boolean) => void
}

export const TransportModal: FC<TransportModalProps> = observer((
    {
        active,
        handleClose,
        setShow
    }) => {

    const store = useContext(Context).activesStore

    return (
        <>
            <SpinnerLoader loading={store.loading} />
            <div className={`transport__page-modal ${active}`}>
                <h2 className="transport__modal-title">Транспорт</h2>
                <TransportForm handleClose={handleClose} setShow={setShow} />
            </div>
        </>
    )
})
