import { useContext } from "react"
import { Context } from "../../../main"
import { SpinnerLoader } from "../../elements/SpinnerLoader/SpinnerLoader"
import { CreateJewerlyForm } from "../../forms/actives/jewerlys/CreateJewerlyForm";
import "./JewerlyModal.scss";
import { observer } from "mobx-react-lite";

export const JewerlyModal = observer(() => {
    const store = useContext(Context).activesStore

    return (
        <>
            <SpinnerLoader loading={store.loading} />
            <div className="jewerly__modal">
                <h2 className="jewerly__modal-title">Драгоценности</h2>
                <CreateJewerlyForm/>
            </div>
        </>
    )
})