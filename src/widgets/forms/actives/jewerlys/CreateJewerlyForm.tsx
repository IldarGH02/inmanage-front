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
import { prepareJewerlyRequest } from "../../../../shared/store/jewerly/prepareRequest"

export const CreateJewerlyForm = observer(() => {
    const { jewerlyStore, activesStore } = useContext(Context)

    const handleSubmitForm = (e: FormEvent) => {
        e.preventDefault()

        jewerlyStore.createValuable(prepareJewerlyRequest(
            jewerlyStore.name,
            jewerlyStore.purchase_price,
            jewerlyStore.estimated_value,
            jewerlyStore.comment,
            jewerlyStore.photo
        ))

        const response = activesStore.fetchActives()
        activesStore.setLoading(true)
        response.then(res => {
            if(res.status >= 200 && res.status < 300) {
                activesStore.setActives(res.data)
                activesStore.setLoading(false)
            }
        })
        jewerlyStore.handleCloseForm()
    }

    return (
        <Form handleSubmit={handleSubmitForm} className="jewerly__form">
            <div className="jewerly__form-content">
                <div className="jewerly__form-left">
                    <InputText
                        onChange={jewerlyStore.handleChangeName}
                        placeholder="Наименование"
                        value={jewerlyStore.name}
                        type="text"
                    />
                    <InputSum
                        setValue={jewerlyStore.handleChangePurchasePrice}
                        setError={() => {}}
                        classNameCurrency=""
                        currency="₽"
                        placeholder="Стоимость покупки"
                        value={jewerlyStore.purchase_price}
                        type="text"
                    />
                    <InputSum
                        setValue={jewerlyStore.handleChangeEstimatedValue}
                        setError={() => {}}
                        classNameCurrency=""
                        currency="₽"
                        placeholder="Оценочная стоимость"
                        value={jewerlyStore.estimated_value}
                        type="text"
                    />
                    <InputFile
                        onChange={jewerlyStore.handleChangePhoto}
                        value={jewerlyStore.photo}
                    />
                </div>
                <div className="jewerly__form-right">
                    <InputComment
                        onChange={jewerlyStore.handleChangeComment}
                        placeholder="Добавить комментарий"
                        value={jewerlyStore.comment}
                    />
                </div>
            </div>
            <div className="jewerly__form-actions">
                <Button
                    onClick={jewerlyStore.handleCloseForm}
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