import { FC, useContext, useEffect, useState } from "react"
import "./editTransportPage.css"

import { Background } from "../../../../widgets/elements/Background/Background";
import { SpinnerLoader } from "../../../../widgets/elements/SpinnerLoader/SpinnerLoader";
import { useParams } from "react-router-dom";
import { EditTransportForm } from "../../../../widgets/forms/actives/transport/EditTransportForm/EditTransportForm";

import assetsBckg from '../../../../shared/assets/img/assets/assetsBckg.png'
import { TransportDto } from "../../../../app/types/dto/DtoTypes"; 
import { Context } from "../../../../main";
import { observer } from "mobx-react-lite";

interface IPropsEdit {
    handleClose: () => void
    setShow: (bool: boolean) => void
}

export const EditTransportPage: FC<IPropsEdit> = observer((
    {
        handleClose,
        setShow
    }) => {
    const store = useContext(Context).activesStore
    const [transport, setTransport] = useState<TransportDto | null | undefined>(null)
    const { id } = useParams()

    useEffect(()=>{
        const transportTmp = store.actives?.transports.transport.find((item) => item.id === Number(id))
        setTransport(transportTmp)
    },[])

    return (
        <>
        <Background imgBckg={assetsBckg}/>
        <SpinnerLoader loading={store.loading} />
        <div className="edit-transport-page">
            <div className="edit-transport-page__container" >
                <div className="edit-transport-page__header">
                    <div className="edit-transport-page__title">Редактирование транспорта</div>
                </div>
                <div className="edit-transport-page__content">
                    {transport && 
                        <EditTransportForm transport={transport} handleClose={handleClose} setShow={setShow}/>
                    }
                </div>
            </div>
        </div>
        </>
    )
})
