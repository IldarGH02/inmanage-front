import { FormEvent, useContext } from "react"
import { Form } from "../../../Custom/Forms/Form"
import { Context } from "../../../../main"
import { InputText } from "../../../../shared/ui/input/InputText"
import { InputSum } from "../../../Custom/Inputs/InputSum"
import { observer } from "mobx-react-lite"
import { Button } from "../../../../shared/ui/Buttons/Button"
import "./CreateJewerlyForm.scss";
import { InputComment } from "../../../Custom/Inputs/InputComment"
import { InputFile } from "../../../Custom/Inputs/InputFile"
import { prepareJewelryRequest } from "../../../../shared/store/jewelry/prepareRequest"

export const CreateJewelryForm = observer(() => {
    const { jewelryStore, activesStore } = useContext(Context).rootStore

    const handleSubmitForm = (e: FormEvent) => {
        e.preventDefault()

        const r = jewelryStore.createValuable(prepareJewelryRequest(
            jewelryStore.name,
            jewelryStore.purchase_price,
            jewelryStore.estimated_value,
            jewelryStore.comment,
            jewelryStore.photo
        ))
        r.then(res => {
            if(res.status >= 200 && res.status < 300) {
                const response = activesStore.fetchActives()
                activesStore.setLoading(true)
                response.then(res => {
                    if(res.status >= 200 && res.status < 300) {
                        activesStore.setActives(res.data)
                        activesStore.setLoading(false)
                    }
                })
            }
        })
        
        jewelryStore.handleCloseForm()
    }

    return (
        <Form handleSubmit={handleSubmitForm} className="jewerly__form">
            <div className="jewerly__form-content">
                <div className="jewerly__form-left">
                    <InputText
                        onChange={jewelryStore.handleChangeName}
                        placeholder="Наименование"
                        value={jewelryStore.name}
                        type="text"
                    />
                    <InputSum
                        onChange={jewelryStore.handleChangePurchasePrice}
                        classNameCurrency=""
                        currency="₽"
                        placeholder="Стоимость покупки"
                        value={jewelryStore.purchase_price}
                        type="text"
                    />
                    <InputSum
                        onChange={jewelryStore.handleChangeEstimatedValue}
                        classNameCurrency=""
                        currency="₽"
                        placeholder="Оценочная стоимость"
                        value={jewelryStore.estimated_value}
                        type="text"
                    />
                    <InputFile
                        onChange={jewelryStore.handleChangePhoto}
                        value={jewelryStore.photo}
                    />
                </div>
                <div className="jewerly__form-right">
                    <InputComment
                        onChange={jewelryStore.handleChangeComment}
                        placeholder="Добавить комментарий"
                        value={jewelryStore.comment}
                    />
                </div>
            </div>
            <div className="jewerly__form-actions">
                <Button
                    onClick={jewelryStore.handleCloseForm}
                    className="jewerly__form-cancel"
                    textButton="Отменить"
                    type="button"
                    name="cancel"
                />
                <Button
                    className="jewerly__form-submit"
                    textButton="Подтвердить"
                    type="submit"
                    name="submit"
                />
            </div>
        </Form>
    )
})