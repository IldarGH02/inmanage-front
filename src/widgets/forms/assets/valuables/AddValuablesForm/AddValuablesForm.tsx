import React, { useState } from "react";
import "./addValuablesForm.css";
import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { InputTextForm } from "../../../elements/InputTextForm/InputTextForm";
import { Link, useNavigate } from "react-router-dom";
import { InputSumForm } from "../../../elements/InputSumForm/InputSumForm";
import { InputTextareaForm } from "../../../elements/InputTextareaForm/InputTextareaForm";
import { InputFileImages } from "../../../../../shared/ui/input/InputFileImages/InputFileImages"; 
import { IImage } from "../../../../../app/types/elements/IImage";
import { useDispatch } from "react-redux";
import { addValuable } from "../../../../../app/store/actions/assets/assetsActions";
import { actionTypes } from "../../../../../app/store/types/types";
import { IAssetsJewelries } from "../../../../../app/types/assets/valuable/IValuable";

// const listTypeOfCommerce: IDropDownList[] = [
//     {
//         id: 1,
//         content: 'Оффлайн'
//     },
//     {
//         id: 2,
//         content: 'Онлайн'
//     }
// ]

export function AddValuablesForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [images, setImages] = useState<IImage[]>([])
    // const [imageError, setImageError] = useState(false)

    const onSetImages = (img: IImage[]|[]) => {
        // let newImg: IImage[] = []
        // if(img.length!==0) {
        //     let maxId = 0
        //     for(let i=0; i<images.length; i++) {
        //         if(images[i].id>maxId) {
        //             maxId=images[i].id
        //         }
        //     }
        //     newImg = img.map(el=>{
        //         el.id = maxId++
        //         return el
        //     })
        //     setImages(prev=>[...prev, ...newImg])
        // }
        if(img.length!==0) {
            setImages(img)
        }
    }

    const openFileInput = ()=> {
        (document.querySelector('#input-file') as HTMLInputElement).click();
    }

    const validationSchema = () => {
        return yup.object().shape({
            name: yup.string().required('Обязательное поле для заполнения').max(30, `Допустимая длина превышает 30 символов`),
            purchasePrice: yup.string().required('Обязательное поле для заполнения').max(12, 'Допустимая длина превышена').lengthNumbersValidator('Не равно 0'),
            assessedValue: yup.string().required('Обязательное поле для заполнения').max(12, 'Допустимая длина превышена').lengthNumbersValidator('Не равно 0'),
            comment: yup.string().required('Обязательное поле для заполнения').max(200, `Допустимая длина превышает 200 символов`),
        }) 
    }

    return (
        <Formik
            validationSchema = {validationSchema}
            initialValues={
                {
                    name: '',
                    purchasePrice: '',
                    assessedValue: '',
                    comment: ''
                    
                } //as Step1Form
            }
            onSubmit={values => {
                const valuableForDB: IAssetsJewelries = {
                    name: values.name,
                    purchase_cost: Number(values.purchasePrice.replace(/ /g,'')),
                    estimated_cost: Number(values.assessedValue.replace(/ /g,'')),
                    comment: values.comment,
                    photo: images.length!==0 ? images[0].img : null
                }
                const res = addValuable(actionTypes.ADD_VALUABLE, valuableForDB)
                res.then(e => {
                    dispatch(e!);
                    navigate("/assets/valuables")
                })
                .catch((e) => {
                    console.log(e)
                })
            }}
        >
            {({ errors, touched, values }) => ( 
            <Form className="add-valuables-form">
                <div className="add-valuables-form__content">
                    <div className="add-valuables-form__characteristic-block-wrapper">
                        <div className="add-valuables-form__characteristic-block">                              
                            <div className="add-valuables-form__item">
                                <InputTextForm
                                    value={values.name}
                                    error={errors.name}
                                    touched={touched.name}
                                    placeHolder="Наименование"
                                    name="name"
                                />
                                <ErrorMessage name="name" render={msg => <div className="add-valuables-form__warning">{msg}</div>} />
                            </div>
                            <div className="add-valuables-form__item">
                                <InputSumForm
                                    valuta="₽" 
                                    value={values.purchasePrice} 
                                    error={errors.purchasePrice}
                                    touched={touched.purchasePrice}
                                    name="purchasePrice"
                                    placeHolder="Стоимость покупки"
                                    background="rgb(241, 242, 246)"    
                                />
                                <ErrorMessage name="purchasePrice" render={msg => <div className="add-valuables-form__warning">{msg}</div>} />
                            </div>
                            <div className="add-valuables-form__item">
                                <InputSumForm
                                    valuta="₽" 
                                    value={values.assessedValue} 
                                    error={errors.assessedValue}
                                    touched={touched.assessedValue}
                                    name="assessedValue"
                                    placeHolder="Оценочная стоимость"
                                    background="rgb(241, 242, 246)"    
                                />
                                <ErrorMessage name="assessedValue" render={msg => <div className="add-valuables-form__warning">{msg}</div>} />
                            </div>
                            <button type="button" className="add-valuables-form__add-img-btn" onClick={openFileInput}>Добавить фото</button>
                            <InputFileImages setImages={onSetImages}/>
                            <div className="add-valuables-form__images">
                                {images.map(el=>{
                                    return (
                                        <div className="add-valuables-form-image" key={el.id}>
                                            <button type="button" className="add-valuables-form-image__remove-btn" onClick={()=>setImages(images.filter( img => el.id !== img.id ))}>&times;</button>
                                            <img className="add-valuables-form-image__img" src={el.img} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="add-valuables-form__about-card-block-wrapper">
                        <div className="add-valuables-form__block-title">Стартовые инвестиции</div>
                        <div className="add-valuables-form__about-card-block">
                            <div className="add-valuables-form__item-comment">
                                <InputTextareaForm
                                    value={values.comment} 
                                    error={errors.comment}
                                    touched={touched.comment}
                                    placeHolder="Добавить комментарий"
                                    length={200}
                                    name="comment"
                                />
                                <ErrorMessage name="comment" render={msg => <div className="add-valuables-form__warning">{msg}</div>} />
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="add-valuables-form__btns">
                    <Link to="/assets/valuables" className="cancel-btn add-valuables-form__cancel-btn">Отменить</Link>
                    <button className="add-valuables-form__add-btn" type="submit" onClick={()=>{
                    }}>Подтвердить</button>
                </div>
            </Form>
       )}
        </Formik>
    )
}
