import { useContext } from "react"
import { Button } from "../Buttons/Button"
import { Context } from "../../../main"
import { observer } from "mobx-react-lite"

import "./Switcher.scss"

export const Switcher = observer(() => {
    const { switcherStore } = useContext(Context).rootStore

    return (
        <div className="switcher__actions">
            <Button
                onClick={switcherStore.handleChangeButtonValue}
                textButton="Продажа"
                type="button"
                className={`switcher__actions-sale ${switcherStore.category === "Продажа" ? "active--sale" : ""}`}
                name="sale"
            />
            <Button
                onClick={switcherStore.handleChangeButtonValue}
                textButton="Удаление"
                type="button"
                className={`switcher__actions-remove ${switcherStore.category === "Удаление" ? "active--remove" : ""}`}
                name="remove"
            />
        </div>
    )
})