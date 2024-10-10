import { observer } from "mobx-react-lite"
import { Form } from "../../../../Custom/Forms/Form"
import { Switcher } from "../../../../../shared/ui/Switcher/Switcher"
import { useContext } from "react"
import { Context } from "../../../../../main"
import "./SaleAndRemoveForm.scss"
import { SaleBlock } from "./SaleBlock"
import { RemoveBlock } from "./RemoveBlock"

export const SaleAndRemoveForm = observer(() => {
    const { switcherStore } = useContext(Context).rootStore

    return (
        <Form className="sale_and_remove__form" handleSubmit={() => {}}>
            <h3 className="sale_and_remove__form-title">Выберите действие:</h3>
            <Switcher/>
            {switcherStore.category === "Продажа" ?
                <SaleBlock/> : <RemoveBlock/>
            }
        </Form> 
    )
})