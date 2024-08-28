import { FormEvent, useContext } from "react"
import { Form } from "../../../Custom/Forms/Form"
import { InputSum } from "../../../Custom/Inputs/InputSum"
import { Context } from "../../../../main"
import { observer } from "mobx-react-lite"
import { Button } from "../../../../shared/ui/Buttons/Button"
import "./ChangeJewerlyForm.scss";
import { prepareJewelryRequest } from "../../../../shared/store/jewelry/prepareRequest"

export const ChangeJewelryForm = observer(() => {
    const { jewelryStore, activesStore } = useContext(Context)

    const handleSubmitChangeForm = (e: FormEvent) => {
        e.preventDefault()

        const r = jewelryStore.changeJewelry(prepareJewelryRequest(
            jewelryStore.current_jewelry!.name!,
            String(jewelryStore.current_jewelry!.purchase_cost!),
            jewelryStore.estimated_value,
            jewelryStore.current_jewelry!.comment!,
            jewelryStore.photo
        ), `${jewelryStore.current_jewelry?.id}`)
        r.then(res => {
            if(res.status >= 200 && res.status < 300) {
                const response = activesStore.fetchActives()
                activesStore.setLoading(true)
                response.then(res => {
                    if(res.status >= 200 && res.status < 300) {
                        activesStore.setActives(res.data)
                        activesStore.setLoading(false)
                        if(res.data.jewelries) {
                            jewelryStore.setJewelryList(res.data.jewelries.jewelries)
                            jewelryStore.setCurrentJewelry(Number(jewelryStore.current_jewelry?.id))
                        }
                    }
                })
            }
        })

        jewelryStore.handleCloseChangeForm()
    }

    return (
        <Form className="jewerly__change-form" handleSubmit={handleSubmitChangeForm}>
            <div className="jewerly__change-content">
                <h3 className="jewerly__change-title">
                    Переоценка
                </h3>
                <InputSum
                    setValue={jewelryStore.handleChangeEstimatedValue}
                    setError={() => {}}
                    classNameCurrency=""
                    currency="₽"
                    placeholder="Оценочная стоимость"
                    value={jewelryStore.estimated_value}
                    type="text"
                />
            </div>
            <div className="jewerly__change-actions">
                <Button
                    onClick={jewelryStore.handleCloseChangeForm}
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