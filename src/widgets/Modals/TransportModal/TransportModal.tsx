import {FC, useContext} from "react";
import {observer} from "mobx-react-lite";

import { CreateTransportForm } from "../../forms/actives/transport/CreateTransportForm.tsx"; 
import { SpinnerLoader } from "../../elements/SpinnerLoader/SpinnerLoader.tsx";

import "./addTransportPage.css"
import {Context} from "../../../main.tsx";


interface TransportModalProps {
    active: string
}

export const TransportModal: FC<TransportModalProps> = observer((
    {
        active
    }) => {

    const { activesStore } = useContext(Context).rootStore

    return (
        <>
            <SpinnerLoader loading={activesStore.loading} />
            <div className={`transport__page-modal ${active}`}>
                <h2 className="transport__modal-title">Транспорт</h2>
                <CreateTransportForm/>
            </div>
        </>
    )
})
