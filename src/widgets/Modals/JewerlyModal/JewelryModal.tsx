import { useContext } from "react"
import { Context } from "../../../main"
import { SpinnerLoader } from "../../elements/SpinnerLoader/SpinnerLoader"
import { CreateJewelryForm } from "../../forms/actives/jewerlys/CreateJewelryForm";
import "./JewelryModal.scss";
import { observer } from "mobx-react-lite";

export const JewelryModal = observer(() => {
    const store = useContext(Context).activesStore

    return (
        <>
            <SpinnerLoader loading={store.loading} />
            <div className="jewelry__modal">
                <h2 className="jewelry__modal-title">Драгоценности</h2>
                <CreateJewelryForm/>
            </div>
        </>
    )
})