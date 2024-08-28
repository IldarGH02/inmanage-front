import { useContext } from "react"
import { Context } from "../../../../main"
import { Button } from "../../../../shared/ui/Buttons/Button"
import { observer } from "mobx-react-lite"

export const LoanSwitcher = observer(() => {
    const { loansStore } = useContext(Context)

    return (
        <div className="loans__switcher">
            <Button
                onClick={loansStore.handleChangeSwitchParam}
                textButton='Вклады'
                type="button"
                name="deposit"
                className=""
            />
            <Button
                onClick={loansStore.handleChangeSwitchParam}
                textButton='Займы'
                type="button"
                name="loan"
                className=""
            />
        </div>
    )
})