import { useContext, useEffect, useState } from "react";
// import { InputFileImages } from "../../../../../shared/ui/input/InputFileImages/InputFileImages.tsx"; 
import { IImage } from "../../../../../app/types/elements/IImage.ts";
import { observer } from "mobx-react-lite";
import { Context } from "../../../../../main.tsx";
import { ImmovablesParams } from "../../../../../entities/Actives/CreateFormElements/ImmovablesParams.tsx";
import { PurchasePriceParams } from "../../../../../entities/Actives/CreateFormElements/PurchasePriceParams.tsx";
import { CreditParams } from "../../../../../entities/Actives/CreateFormElements/CreditParams.tsx";
import { Button } from "../../../../../shared/ui/Buttons/Button.tsx";
import { Form } from "../../../../Custom/Forms/Form.tsx";

import "./CreateImmovablesForm.scss";
import { immovablesRequest } from "../../../../../shared/store/immovables/immovablesRequest.ts";

export interface IFormValues {
    sum: string
    name: string,
    city: string,
    street: string
}


export const CreateFormImmovables = observer(() => {
    const { activesStore, immovablesStore, balanceStore, immovablesValidation } = useContext(Context).rootStore
    const [images, setImages] = useState<IImage[]>([])

    useEffect(() => {
        const r = balanceStore.fetchBalance()
        balanceStore.setLoading(true)
        r.then(res => {
            if(res.status >= 200 && res.status < 300) {
                immovablesStore.prepareWriteoffAccount(res.data.card_list)
            }
        })
    }, [])

    useEffect(() => {
        // immovablesValidation.handleChangeImmovablesName(immovablesStore.immovables_name);
        // immovablesValidation.handleChangeCity(immovablesStore.city);
        // immovablesValidation.handleChangeStreet(immovablesStore.street);
        // immovablesValidation.handleChangeHome(immovablesStore.home);
        // immovablesValidation.handleChangeRooms(immovablesStore.rooms);
        // immovablesValidation.handleChangeFloors(immovablesStore.floors);
        // immovablesValidation.handleChangeFacing(immovablesStore.facing);
        // immovablesValidation.handleChangeConstruction(immovablesStore.construction);
        // immovablesValidation.handleChangeBalcony(immovablesStore.balcony)
        // immovablesValidation.handleChangeBalconyValue(immovablesStore.balcony_value)
        // immovablesValidation.handleChangeInitialPayment(immovablesStore.initial_payment)
        // immovablesValidation.handleChangeDate(immovablesStore.first_payment_date);
        // immovablesValidation.handleChangeLoanTerm(immovablesStore.loan_term)
        // immovablesValidation.handleChangeLoan(immovablesStore.loan);
        // immovablesValidation.handleChangeInterestRate(immovablesStore.interest_rate);
        // immovablesValidation.handleChangePaymentOrder(immovablesStore.payment_order);
        // immovablesValidation.handleChangePaymentPeriod(immovablesStore.payment_period);
        // immovablesValidation.handleChangeWriteoffAccount(immovablesStore.writeoff_account);
        immovablesStore.checkToDisabledButton()
    }, [immovablesStore, immovablesValidation])
    // const onSetImages = (img: IImage[]|[]) => {
    //     // let newImg: IImage[] = []
    //     // if(img.length!==0) {
    //     //     let maxId = 0
    //     //     for(let i=0; i<images.length; i++) {
    //     //         if(images[i].id>maxId) {
    //     //             maxId=images[i].id
    //     //         }
    //     //     }
    //     //     newImg = img.map(el=>{
    //     //         el.id = maxId++
    //     //         return el
    //     //     })
    //     //     setImages(prev=>[...prev, ...newImg])
    //     // }
    //     if(img.length!==0) {
    //         setImages(img)
    //     }
    // }

    const openFileInput = ()=> {
        (document.querySelector('#input-file') as HTMLInputElement).click();
    }

    const handleSubmitForm = () => {
        const r = immovablesStore.createImmovables(immovablesRequest(
            immovablesStore.bought_price,
            immovablesStore.home,
            immovablesStore.city,
            immovablesStore.street,
            immovablesStore.immovables_name,

            immovablesStore.rooms,
            immovablesStore.floors,
            immovablesStore.facing,
            immovablesStore.construction,
            immovablesStore.balcony,

            immovablesStore.loan,
            immovablesStore.loan_term,
            immovablesStore.interest_rate,
            immovablesStore.initial_payment,
            immovablesStore.writeoff_account,
            immovablesStore.first_payment_date,
            immovablesStore.payment_order,
            immovablesStore.payment_period
        )) 
        
        r.then(res => {
            if(res.status >= 200 && res.status < 300){
                immovablesStore.handleCloseForm()
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
         
    }

    useEffect(() => {
        switch(immovablesStore.payment_type) {
            case 'Кредит/Ипотека' :
                immovablesStore.setLoan(true)
                break
            
            case 'Наличные средства':
                immovablesStore.setLoan(false)
                break

            default:
                break
        }
    }, [immovablesStore])

    return (
        <Form className="immovables__create-form" handleSubmit={handleSubmitForm}>
            <div className="immovables__form-content">
                <div className="immovables__form-container">
                    <div className={`immovables__form-characteristics ${immovablesStore.loan ? 'active' : ''}`}>
                        <ImmovablesParams error_name={immovablesValidation.immovables_error ? immovablesValidation.immovables_error : ''}/>
                        <PurchasePriceParams/>
                        <Button
                            onClick={openFileInput}
                            className="immovables__form-add_photo"
                            textButton='Добавить фото'
                            type="button"
                            name="button"
                        />
                        {/* <InputFileImages setImages={onSetImages}/> */}
                        <div className="add-property-form__images">
                            {images.map(el=>{
                                return (
                                    <div className="add-property-form-image" key={el.id}>
                                        <button type="button" className="add-property-form-image__remove-btn" onClick={()=>setImages(images.filter( img => el.id !== img.id ))}>&times;</button>
                                        <img className="add-property-form-image__img" src={el.img} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className={`immovables__form-loan ${immovablesStore.loan ? '' : 'disabled'}`}>
                        <CreditParams/>
                    </div>
                </div>
                <div className="immovables__form-actions">
                    <Button
                        onClick={immovablesStore.handleCloseForm}
                        type="button"
                        textButton='Отменить'
                        className="immovables__form-cancel"
                        name="cancel"
                    />
                    <Button
                        onClick={immovablesValidation.immovablesValidation}
                        type="submit"
                        textButton='Подтвердить'
                        className={`immovables__form-submit ${immovablesStore.disabled ? 'disabled' : ''}`}
                        name="submit"
                        disabled={immovablesStore.disabled}
                    />
                </div>
            </div>
        </Form>
    )
})
