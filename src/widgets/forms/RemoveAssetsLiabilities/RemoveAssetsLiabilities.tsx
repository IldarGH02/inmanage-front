import {FC, useState} from "react";
import "./removeAssetsLiabilities.css";
import { ExpenseCategories } from "../../../entities/Balance/ExpenseBalance/ExpenseCategories/ExpenseCategories";
import { InputSumForm } from "../elements/InputSumForm/InputSumForm";
import { Card } from "../../../app/types/dto/DtoTypes.ts"; 
import {observer} from "mobx-react-lite";
import {Button} from "../../../shared/ui/Buttons/Button.tsx";
import { Form } from "../../Custom/Forms/Form.tsx";
import { InputSum } from "../../Custom/Inputs/InputSum.tsx";

interface IRemoveAssetsLiabilities {
    onOpenModal: () => void,
    cardSelected: Card | null,
    onRemove: (sum?: number) => void,
    setShow: (bool: boolean) => void,
}

export const RemoveAssetsLiabilities: FC<IRemoveAssetsLiabilities> = observer((
    {
        onOpenModal,
        cardSelected,
        onRemove,
        setShow
    }) => {

    const [category, setCategory] = useState(0)
    const categories = ['Продажа', 'Удаление']

    return (
            <>               
                <Form className="remove-assets-liabilities-form" handleSubmit={() => {}}>
                    <h3 className="remove-assets-liabilities-form__title">Причина удаления</h3>
                    <div className="remove-assets-liabilities-form__categories">
                        <ExpenseCategories 
                            categories={categories} 
                            onChangeCategory={setCategory} 
                            categoryActive={category}
                        />
                    </div>
                    {category===0 &&
                        <div className="remove-assets-liabilities-form__content">
                            <div className="remove-assets-liabilities-form__item">
                                <InputSum
                                    onChange={() => {}}
                                    value=""
                                    currency=""
                                    classNameCurrency=""
                                    type="text"
                                    placeholder="Цена продажи"
                                />
                            </div>
                            <div className="remove-assets-liabilities-form__item-list">
                                <div className={`drop-down-list-form__container${(false)?'--error':''}`} onClick={onOpenModal}>
                                    <h4 className="drop-down-list-form__label">Выбор счёта</h4>
                                    <div className="drop-down-list-form__title">{`${cardSelected?cardSelected.name:'Не выбрано'}`}</div>
                                </div>
                            </div>
                        </div>
                    }
                    
                    <div className="remove-assets-liabilities-form__btns">
                        <Button
                            className='remove-assets-liabilities-form__cancel-btn'
                            textButton='Отменить'
                            name='Cancel'
                            type='button'
                            onClick={() => setShow(false)}
                        />
                        <Button
                            className='remove-assets-liabilities-form__add-btn'
                            textButton='Подтвердить'
                            name='Submit'
                            type='submit'
                            onClick={()=>{}}
                        />
                    </div>
                </Form>                
            </>
       )
})
