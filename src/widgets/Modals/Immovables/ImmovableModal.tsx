import { FC, useContext } from "react"
import "./ImmovablesModal.scss"
// import { CreateFormImmovables } from "../../forms/actives/immovables/CreateFormImmovables/CreateFormImmovables.tsx";
import { SpinnerLoader } from "../../elements/SpinnerLoader/SpinnerLoader.tsx";
import { Context } from "../../../main.tsx";
import { observer } from "mobx-react-lite";

interface ImmovablesModal {
    setShow: (bool: boolean) => void
}

export const ImmovableModal: FC<ImmovablesModal> = observer((
    {
        // setShow
    }) => {
    const store = useContext(Context).activesStore

    return (
        <>
            <SpinnerLoader loading={store.loading} />
            <div className="immovables__modal">
                {/* <CreateFormImmovables setShow={setShow}/> */}
            </div>
        </>
    )
})
