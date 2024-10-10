import { useContext } from "react"
import { Context } from "../../../../../main"
import { InputSum } from "../../../../Custom/Inputs/InputSum"
import { Select } from "../../../../Custom/Select"

import "./SaleBlock.scss"
import { FormActions } from "../../../../../shared/ui/FormActions/FormActions"

export const SaleBlock = () => {
    const { switcherStore, transportStore } = useContext(Context).rootStore

    const selectedWriteoffAccount = transportStore.writeoff_account_list.find((item) => 
        item.content === transportStore.writeoff_account)
    return (
        <div className="sale__block">
            <InputSum
                onChange={switcherStore.handleChangeSaleSum}
                value={switcherStore.sum}
                currency="P"
                classNameCurrency=""
                type="text"
                placeholder="Цена продажи"
            />

            <h4>Выберите счёт зачисления средств</h4>
            <Select
                selected={selectedWriteoffAccount || null}
                options={transportStore.writeoff_account_list}
                onChange={transportStore.handleChangeWriteoffAccount}
                classNameContainer={`dropdown__container`}
                classNameSelect='dropdown__select'
                classNameList='dropdown__list'
                placeholder="Выбор счёта"
                errorMessage=""
            />

            <FormActions
                onCancel={() => transportStore.setShowDelete(false)}
                onSubmit={() => {}}
            />
        </div>
    )
}