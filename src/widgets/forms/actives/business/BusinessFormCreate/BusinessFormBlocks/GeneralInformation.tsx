import { useContext } from "react"
import { InputText } from "../../../../../../shared/ui/input/InputText"
import { InputPercent } from "../../../../../Custom/Inputs/InputPercent"
import { Context } from "../../../../../../main"
import { observer } from "mobx-react-lite"

export const GeneralInformation = observer(() => {
    const {businessCreateStore} = useContext(Context).rootStore

    return (
        <div className="business__form-general_information"> 
            <InputText
                value={businessCreateStore.name}
                placeholder="Название бизнеса"
                type="text"
                onChange={businessCreateStore.handleChangeName}
            />
            <InputText
                value={businessCreateStore.address}
                placeholder="Адрес"
                type="text"
                onChange={businessCreateStore.handleChangeAddress}
            />
            <InputPercent
                setPercentValue={businessCreateStore.handleChangeEquityPercentage} 
                value={businessCreateStore.equityPercentage} 
                type="text"
                currency="%"
                placeholder="Процент долевого участия"
                classNameCurrency="input__percent-currency"
                setPercentError={() => {}}                                   
            />
        </div>
    )
})