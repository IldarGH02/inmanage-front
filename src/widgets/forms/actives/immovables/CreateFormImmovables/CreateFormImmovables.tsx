// import { FC, FormEvent, useContext, useEffect, useState } from "react";
// import "./CreateImmovablesForm.scss";
// import { IDropDownList } from "../../../../../app/types/elements/IDropDownList.ts";
// import { ImmovableRequest } from "../../../../../app/types/actives/ActivesTypes.ts";
// // import { InputFileImages } from "../../../../../shared/ui/input/InputFileImages/InputFileImages.tsx"; 
// import { IImage } from "../../../../../app/types/elements/IImage.ts";
// import { observer } from "mobx-react-lite";
// import { Context } from "../../../../../main.tsx";
// import { immovablesTypes, rentTypeList } from "../../../../../features/constants/payments.ts";
// import { ImmovablesParams } from "../../../../../entities/Actives/CreateFormElements/ImmovablesParams.tsx";
// import { PurchasePriceParams } from "../../../../../entities/Actives/CreateFormElements/PurchasePriceParams.tsx";
// import { CreditParams } from "../../../../../entities/Actives/CreateFormElements/CreditParams.tsx";
// // import dayjs, { Dayjs } from "dayjs";
// import { DateTime } from "luxon";

// interface CreateFormImmovables {
//     setShow: (bool: boolean) => void
// }

// export const CreateFormImmovables: FC<CreateFormImmovables> = observer((
//     {
//         setShow
//     }) => {
//     // const store = useContext(Context).activesStore
//     const [creditVisible, setCreditVisible] = useState(false)
//     const [images, setImages] = useState<IImage[]>([])

//     const [paymentsType, setPaymentsType] = useState<IDropDownList[]>([])
//     // const [rentType, setRentType] = useState<IDropDownList[]>([])

//     const [immovablesName, setImmovablesName] = useState('')
//     const [cityValue, setCityValue] = useState('')
//     const [streetValue, setStreetValue] = useState('')
//     const [homeValue, setHomeValue] = useState('')
//     const [ownerValue, setOwnerValue] = useState('')

//     const [priceValue, setPriceValue] = useState('')
//     // const [errorPrice, setErrorPrice] = useState('')
//     const [downPaymentValue, setDownPaymentValue] = useState('')
//     // const [downPaymentError, setDownPaymentError] = useState('')
//     const [monthlyPaymentValue, setMonthlyPaymentValue] = useState('')
//     // const [monthlyPaymentError, setMonthlyPaymentError] = useState('')
//     const [dateValue, setDateValue] = useState<DateTime | null>(null)
//     // const [dateError, setDateError] = useState('')
//     const [loanTermsValue, setLoanTermsValue] = useState('')
//     // const [loanTermsError, setLoanTermsError] = useState('')
//     const [percentValue, setPercentValue] = useState('')
//     // const [percentError, setPercentError] = useState('')

//     const [paymentValue, setPaymentValue] = useState('')
//     // const [paymentError, setPaymentError] = useState('')
    

//     const onSetImages = (img: IImage[]|[]) => {
//         // let newImg: IImage[] = []
//         // if(img.length!==0) {
//         //     let maxId = 0
//         //     for(let i=0; i<images.length; i++) {
//         //         if(images[i].id>maxId) {
//         //             maxId=images[i].id
//         //         }
//         //     }
//         //     newImg = img.map(el=>{
//         //         el.id = maxId++
//         //         return el
//         //     })
//         //     setImages(prev=>[...prev, ...newImg])
//         // }
//         if(img.length!==0) {
//             setImages(img)
//         }
//     }


//     useEffect(() => {
//         const newImmovablesTypes: IDropDownList[] = []
//         const newRentTypeList: IDropDownList[] = []
//         let id = 0;

//         immovablesTypes.map((item) => {
//             id++
//             newImmovablesTypes.push({content: item.content, id: id})
//         })

//         rentTypeList.map((item) => {
//             id++
//             newRentTypeList.push({content: item.content, id: id})
//         })

//         setPaymentsType(newImmovablesTypes)
//         // setRentType(newRentTypeList)
//     }, [])

//     const openFileInput = ()=> {
//         (document.querySelector('#input-file') as HTMLInputElement).click();
//     }

//     const handleSubmit = (e: FormEvent) => {
//         e.preventDefault()

//         const immovables: ImmovableRequest = {
//             bought_price: Number(priceValue),
//             writeoff_account: 0,
//             building_number: homeValue,
//             city: cityValue,
//             street: streetValue,
//             name: immovablesName,
//             loan: false,
//             loan_term: null,
//             percentage: null,
//             initial_payment: null,
//             month_payment: null,
//             first_payment_date: "",
//             payment_order: "",
//             payment_period: ""
//         }

//         // if() {
//         //     const response = store.createImmovable(immovables)
//         // }
//     }

//     useEffect(() => {
//         switch(paymentValue) {
//             case 'Кредит/Ипотека' :
//                 setCreditVisible(true)
//                 break
//             case 'Наличные средства' :
//                 setCreditVisible(false)
//             default:
//                 break
//         }
//     }, [paymentValue])


//     return (
//         <form className="immovables__create-form">
//             <div className="add-property-form__content">
//                 <div className="add-property-form__characteristic-block-wrapper">
//                     <div className="add-property-form__characteristic-block">
//                         <ImmovablesParams
//                             setImmovablesName={setImmovablesName}
//                             setCity={setCityValue}
//                             setStreet={setStreetValue}
//                             setHome={setHomeValue}
//                             setOwner={setOwnerValue}
//                             immovablesName={immovablesName}
//                             city={cityValue}
//                             street={streetValue}
//                             home={homeValue}
//                             owner={ownerValue}
//                         />
//                         <PurchasePriceParams
//                             setPaymentValue={setPaymentValue}
//                             paymentsType={paymentsType}
//                             paymentValue={paymentValue}
//                             setErrorPrice={setErrorPrice}
//                             setPriceValue={setPriceValue}
//                             priceValue={priceValue}
//                         />
//                     </div>
//                 </div>

//                 <div className="add-property-form__about-card-block-wrapper">
//                     <div className="add-business-form__about-card-block">
//                         {creditVisible &&
//                             <>
//                             <CreditParams
//                                 setDownPaymentError={setDownPaymentError}
//                                 setDownPaymentsValue={setDownPaymentValue}
//                                 downPaymentsValue={downPaymentValue}

//                                 setMothlyPaymentValue={setMonthlyPaymentValue}
//                                 setMothlyPaymentError={setMonthlyPaymentError}
//                                 monthlyPaymentValue={monthlyPaymentValue}

//                                 setDateValue={setDateValue}
//                                 dateValue={dateValue}

//                                 setLoanTermsValue={setLoanTermsValue}
//                                 setLoanTermsError={setLoanTermsError}
//                                 loanTermsValue={loanTermsValue}

//                                 setPercentValue={setPercentValue}
//                                 setPercentError={setPercentError}
//                                 percentValue={percentValue}
//                             />
//                             {/* <div className="add-property-form__item">
//                                 <InputSumForm
//                                         valuta="₽"
//                                         value={values.downPayment}
//                                         error={errors.downPayment}
//                                         touched={touched.downPayment}
//                                     name="downPayment"
//                                     placeHolder="Первый взнос"
//                                     background="rgb(241, 242, 246)"    
//                                 />
//                             </div> */}
//                             {/* <div className="add-property-form__item">
//                                 <InputSumForm
//                                     valuta="₽" 
//                                     value={values.monthlyPayment} 
//                                     error={errors.monthlyPayment}
//                                     touched={touched.monthlyPayment}
//                                     name="monthlyPayment"
//                                     placeHolder="Ежемесячный платеж"
//                                     background="rgb(241, 242, 246)"    
//                                 />
//                             </div> */}
//                             {/* <div className="add-card-form-cash__item">
//                                 <InputDateForm
//                                     value={values.date} 
//                                     error={errors.date}
//                                     touched={touched.date}
//                                     name="date"
//                                     placeHolder="Дата первого платежа"  
//                                 />
//                             </div> */}
//                             {/* <div className="add-card-form-cash__item">
//                                 <InputSumForm
//                                     valuta="мес." 
//                                     value={values.loanTerms} 
//                                     error={errors.loanTerms}
//                                     touched={touched.loanTerms}
//                                     name="loanTerms"
//                                     placeHolder="Срок кредитования"
//                                     background="rgb(255, 255, 255)"    
//                                 />
//                             </div>
//                             <div className="add-card-form-cash__item">
//                                 <InputPercentForm
//                                     value={values.percent} 
//                                     error={errors.percent}
//                                     touched={touched.percent}
//                                     name="percent"
//                                     placeHolder="Процентная ставка"
//                                     background="rgb(255, 255, 255)"    
//                                 />
//                             </div> */}
//                         </>
//                         } 
//                         <div className="add-property-form__block-title">Аренда</div>
//                         {/* <div className="add-property-form__item">
//                             <DropDownListForm
//                                 idContent='dropDownRentType'
//                                 idTitle='dropDownTitleRentType'
//                                 placeholder="Тип выплаты"
//                                 title={rentType}
//                                 data= {rentTypeList}
//                                 onChange={setRentType}
//                             />
//                         </div> */}
//                         {/* <div className="add-card-form-cash__item">
//                             <InputSumForm
//                                 valuta="₽" 
//                                 value={values.rentSum} 
//                                 error={errors.rentSum}
//                                 touched={touched.rentSum}
//                                 name="rentSum"
//                                 placeHolder="Стоимость аренды"
//                                 background="rgb(241, 242, 246)"    
//                             />
//                         </div> */}
//                         <button type="button" className="add-property-form__add-img-btn" onClick={openFileInput}>Добавить фото</button>
//                         <InputFileImages setImages={onSetImages}/>
//                         <div className="add-property-form__images">
//                             {images.map(el=>{
//                                 return (
//                                     <div className="add-property-form-image" key={el.id}>
//                                         <button type="button" className="add-property-form-image__remove-btn" onClick={()=>setImages(images.filter( img => el.id !== img.id ))}>&times;</button>
//                                         <img className="add-property-form-image__img" src={el.img} />
//                                     </div>
//                                 )
//                             })}
//                         </div>
//                     </div>
//                 </div>
//             </div>
            
//             <div className="add-property-form__btns">
//                 <button className="cancel-btn add-property-form__cancel-btn" onClick={() => setShow(false)}>Отменить</button>
//                 <button 
//                     className="add-property-form__add-btn" 
//                     type="submit" 
//                     // onClick={()=>console.log(values)}
//                     >
//                         Подтвердить</button>
//             </div>
//         </form>
//     )
// })
