import { useState } from "react"
import "./cardAddPage.css"
import { Link } from "react-router-dom"
import { BackBtn } from "../../../../widgets/elements/buttons/BackBtn/BackBtn"
import { CashCard } from "../../../../entities/Balance/CardsBalance/AddCard/CashCard/CashCard"
import { BankAccountCard } from "../../../../entities/Balance/CardsBalance/AddCard/BankAccountCard/BankAccountCard"
import { observer } from "mobx-react-lite"

const data = [
    {
        id: 1,
        name: 'Наличные средства'
    },
    {
        id: 2,
        name: 'Банковский счет'
    }
]

function CardAddPage() {
    const [bankAccount, setBankAccount] = useState(false)
    const [nextBtnVisible] = useState(false)

    const setBrand = ()=> {
        (document.getElementById('accord1') as HTMLInputElement).checked = false
    }

    return (
        <div className="card-add-page">
            <div className="card-add-page__container" >
                <Link className="card-add-page__back-btn" to="/balance/cards">
                    <BackBtn/>
                </Link>
                <div className="card-add-page__box">
                    <div className="card-add-page__title">Новый счет/наличные</div>
                    <div className="card-add-page__wrapper">
                        <div className="card-add-page__content">
                        <div className="card-add">
                            <div className="property-add__accordion-container">
                                <div className="property-add__item">
                                    <div className="property-add__name">Тип<b>*</b></div>
                                    <div className="drop-down-list">
                                        <input className="drop-down-list-input" type="checkbox" name="accord" id={'accord1'}></input>
                                        <label className="drop-down-list__title" htmlFor={'accord1'}>
                                            <p>{bankAccount ? 'Банковский счет' : 'Наличные средства'}</p> 
                                        </label> 
                                        <div className="drop-down-list__content">
                                            {/* <input type="text" onKeyUp={searchBrand} value={searchSelector} onChange={changeBrandSelector}/>  */}
                                            <ul>
                                            {data.map((el)=>{
                                                return (
                                                    <li key={el.id} onClick={()=>{
                                                        // setBrandSelector(el.content)
                                                        setBankAccount(el.name==='Наличные средства'?false:true)
                                                        setBrand()
                                                    }}><p>{el.name}</p></li>
                                                )
                                            })}
                                            </ul>
                                        </div>          
                                    </div>
                                </div>
                            </div>
                            {!bankAccount &&
                            <>
                                <CashCard/>
                                {/* <CashCard onChangeBtnVisible={changeBtnVisible} onChangeValues={changeValues} data={transport}/> */}
                            </>
                            }

                            {bankAccount &&
                                <BankAccountCard/>
                            }
                            
                            
                        </div>
                        </div>
                        <div className="card-add-page__actions-btn">
                            <Link onClick={(events)=>{
                                if(!nextBtnVisible) {
                                    events.preventDefault()
                                }
                                else {
                                    // addTransport(transport)
                                }
                            }
                            } className={`property-add-page__add-btn${nextBtnVisible ? '--active' : ''}`} to="/balance/cards">Добавить</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(CardAddPage)