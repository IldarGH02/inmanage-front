import {FC, useState} from "react";
import "./removeAssetsLiabilities.css";
import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { ExpenseCategories } from "../../../entities/Balance/ExpenseBalance/ExpenseCategories/ExpenseCategories";
import { InputSumForm } from "../elements/InputSumForm/InputSumForm";
import { Card } from "../../../app/types/dto/DtoTypes.ts"; 
import {observer} from "mobx-react-lite";
import {Button} from "../../../shared/ui/Buttons/Button.tsx";

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

    const validationSchema = () => {
        if(category===0) {
            return yup.object().shape({
                sum: yup.string().required('Обязательное поле для заполнения').max(12, 'Допустимая длина превышена').lengthNumbersValidator('Не равно 0'),
            }) 
        } else {
            return yup.object().shape({
                // sum: yup.string().required('Обязательное поле для заполнения').max(12, 'Допустимая длина превышена').lengthNumbersValidator('Не равно 0'),
            })
        }
    }

    return (
        <Formik
            validationSchema = {validationSchema}
            initialValues={
                {
                    sum: '',                   
                } //as Step1Form
            }
            onSubmit={values => {
                if(category===0 && cardSelected) {
                    onRemove(Number(values.sum.replace(/ /g, '')))
                } 
                if(category===1){
                    onRemove()
                }
            }}
        >
            {({ errors, touched, values }) => ( 
            <>               
                <Form className="remove-assets-liabilities-form">
                    <div className="remove-assets-liabilities-form__title">Причина удаления</div>
                    <div className="remove-assets-liabilities-form__categories">
                        <ExpenseCategories categories={categories} onChangeCategory={setCategory} categoryActive={category}></ExpenseCategories>
                    </div>
                    {category===0 &&
                        <div className="remove-assets-liabilities-form__content">
                            <div className="remove-assets-liabilities-form__item">
                                <InputSumForm
                                    valuta="₽" 
                                    value={values.sum} 
                                    error={errors.sum}
                                    touched={touched.sum}
                                    name="sum"
                                    placeHolder="Цена продажи"
                                    background="rgb(241, 242, 246)"    
                                />
                                <ErrorMessage name="sum" render={msg => <div className="remove-assets-liabilities-form__warning">{msg}</div>} />
                            </div>
                            <div className="remove-assets-liabilities-form__item-list">
                                <div className={`drop-down-list-form__container${(false)?'--error':''}`} onClick={onOpenModal}>
                                    <div className="drop-down-list-form__label">Выбор счёта</div>
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
       )}
        </Formik>
    )
})
