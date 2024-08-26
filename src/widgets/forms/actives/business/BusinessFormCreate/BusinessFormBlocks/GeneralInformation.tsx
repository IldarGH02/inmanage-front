import { useContext } from "react"
import { InputText } from "../../../../../../shared/ui/input/InputText"
import { InputPercent } from "../../../../../Custom/Inputs/InputPercent"
import { Context } from "../../../../../../main"
import { observer } from "mobx-react-lite"

export const GeneralInformation = observer(() => {
    const store = useContext(Context).businessCreateStore

    return (
        <div className="business__form-general_information"> 
            <InputText
                value={store.name}
                placeholder="Название бизнеса"
                type="text"
                onChange={store.handleChangeName}
            />
            <InputText
                value={store.address}
                placeholder="Адрес"
                type="text"
                onChange={store.handleChangeAddress}
            />
            <InputPercent
                setPercentValue={store.handleChangeEquityPercentage} 
                value={store.equityPercentage} 
                type="text"
                currency="%"
                placeholder="Процент долевого участия"
                classNameCurrency="input__percent-currency"
                setPercentError={() => {}}                                   
            />
        </div>
    )
})