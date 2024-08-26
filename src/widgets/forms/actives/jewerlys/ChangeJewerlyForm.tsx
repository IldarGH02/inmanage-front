import { FormEvent, useContext, useEffect } from "react"
import { Form } from "../../../Custom/Forms/Form"
import { InputSum } from "../../../Custom/Inputs/InputSum"
import { Context } from "../../../../main"
import { observer } from "mobx-react-lite"
import { Button } from "../../../../shared/ui/Buttons/Button"
import "./ChangeJewerlyForm.scss";
import { prepareJewerlyRequest } from "../../../../shared/store/jewerly/prepareRequest"

export const ChangeJewerlyForm = observer(() => {
    const { jewerlyStore, activesStore } = useContext(Context)

    const handleSubmitChangeForm = (e: FormEvent) => {
        e.preventDefault()

        jewerlyStore.changeJewerly(prepareJewerlyRequest(
            jewerlyStore.current_jewerly?.name!,
            String(jewerlyStore.current_jewerly?.purchase_cost!),
            jewerlyStore.estimated_value,
            jewerlyStore.current_jewerly?.comment!,
            jewerlyStore.photo
        ), `${jewerlyStore.current_jewerly?.id}`)

        const response = activesStore.fetchActives()
        activesStore.setLoading(true)
        response.then(res => {
            if(res.status >= 200 && res.status < 300) {
                
                activesStore.setActives(res.data)
                activesStore.setLoading(false)
                if(res.data.jewelries) {
                    jewerlyStore.setJewerlyList(res.data.jewelries.jewelries)
                    jewerlyStore.setCurrentJewerly(Number(jewerlyStore.current_jewerly?.id))
                }
            }
        })

        jewerlyStore.handleCloseChangeForm()
    }

    return (
        <Form className="jewerly__change-form" handleSubmit={handleSubmitChangeForm}>
            <div className="jewerly__change-content">
                <h3 className="jewerly__change-title">
                    Переоценка
                </h3>
                <InputSum
                    setValue={jewerlyStore.handleChangeEstimatedValue}
                    setError={() => {}}
                    classNameCurrency=""
                    currency="₽"
                    placeholder="Оценочная стоимость"
                    value={jewerlyStore.estimated_value}
                    type="text"
                />
            </div>
            <div className="jewerly__change-actions">
                <Button
                    onClick={jewerlyStore.handleCloseChangeForm}
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