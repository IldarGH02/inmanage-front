import { useContext, useEffect } from "react"
import { Context } from "../../../../main"
import { Form } from "../../Form"
import { Select } from "../../../Custom/Select"
import { InputSum } from "../../../Custom/Inputs/InputSum"
import { InputText } from "../../../../shared/ui/input/InputText"
import { Card } from "../../../../app/types/dto/DtoTypes"
import { observer } from "mobx-react-lite"
import "./CreateSecuritiesForm.scss";
import { Button } from "../../../../shared/ui/Buttons/Button"

export const CreateSecuritiesForm = observer(() => {
    const { securitiesStore, balanceStore } = useContext(Context)
    const selectWriteoffAccount = securitiesStore.cards.find((item) => item.content === securitiesStore.writeoff_account)
    const selectName = securitiesStore.local_securities.find((item) => item.content === securitiesStore.name)

    useEffect(() => {
        const response = balanceStore.fetchBalance()
        let card_list: Card[] = []
        balanceStore.setLoading(true)
        response.then(res => {
            if(res.status >= 200 && res.status < 300) {
                balanceStore.setBalance(res.data)
                card_list = res.data.card_list
                securitiesStore.setCardList(card_list)
                balanceStore.setLoading(false)
            }
        })
        securitiesStore.createNewLists()
    }, [balanceStore, securitiesStore])

    useEffect(() => {
        if(selectName) {
            securitiesStore.getCurrentPrice(`${selectName.id}`)
        }
    }, [securitiesStore.getCurrentPrice, securitiesStore.current_securities, selectName])

    return (
        <Form onSubmit={securitiesStore.handleSubmitForm} className="securities__form">
            <div className="securities__form-content">
                <Select
                    onChange={securitiesStore.handleChangeName}
                    options={securitiesStore.local_securities}
                    selected={selectName || null}
                    classNameContainer={`dropdown__container`}
                    classNameSelect='dropdown__select'
                    classNameList='dropdown__list'
                    errorMessage=""
                    placeholder="Наименование"
                />
                <Select
                    onChange={securitiesStore.handleChangeWriteoffAccount}
                    options={securitiesStore.cards}
                    selected={selectWriteoffAccount || null}
                    classNameContainer={`dropdown__container`}
                    classNameSelect='dropdown__select'
                    classNameList='dropdown__list'
                    errorMessage=""
                    placeholder="Счёт списания"
                />
                <div className="securities__price">
                    <h3 className="securities__price-title">Цена на рынке:</h3>
                    <p className="securities__price-info">{securitiesStore.price}</p>
                </div>
                <InputSum
                    setValue={securitiesStore.handleChangeMarketPrice}
                    setError={() => {}}
                    currency="₽"
                    classNameCurrency=""
                    placeholder="Цена покупки"
                    value={securitiesStore.market_price}
                    type="text"
                />
                <InputText
                    onChange={securitiesStore.handleChangeCount}
                    value={securitiesStore.count}
                    placeholder="Количество (шт.)"
                    type="text"
                />
            </div>
            <div className="securities__form-actions">
                <Button
                    className="securities__action-cancel button"
                    onClick={securitiesStore.handleCloseForm}
                    textButton="Отмена"
                    type="button"
                    name="cancel"
                />
                <Button
                    className="securities__action-submit button"
                    onClick={securitiesStore.handleClickSubmit}
                    textButton="Подтвердить"
                    type="submit"
                    name="submit"
                />
            </div>
        </Form>
    )
})