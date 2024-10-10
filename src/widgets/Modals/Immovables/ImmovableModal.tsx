import { useContext } from "react"
import "./ImmovablesModal.scss"
import { CreateFormImmovables } from "../../forms/actives/immovables/CreateFormImmovables/CreateFormImmovables.tsx";
import { SpinnerLoader } from "../../elements/SpinnerLoader/SpinnerLoader.tsx";
import { Context } from "../../../main.tsx";
import { observer } from "mobx-react-lite";

export const ImmovablesModal = observer(() => {
    const { activesStore } = useContext(Context)

    return (
        <>
            <SpinnerLoader loading={activesStore.loading} />
            <div className="immovables__modal">
                <CreateFormImmovables/>
            </div>
        </>
    )
})
