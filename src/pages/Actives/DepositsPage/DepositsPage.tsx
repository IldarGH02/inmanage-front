import { useContext, useState } from "react";
import "./depositsPage.css"
import { Link } from "react-router-dom";
import { ItemAssets } from "../../../widgets/assets/ItemAssets/ItemAssets";
import loanImg from '../../../shared/assets/img/assets/loanItem.png'
import {FinanceTable} from "../../../widgets/elements/FinanceTable/FinanceTable.tsx";
import { Context } from "../../../main.tsx";
import { IAssetsDeposit } from "../../../app/types/actives/deposit/IDeposit.ts";
import { OverlayModal } from "../../../shared/ui/Overlay/OverlayModal.tsx";

export function DepositsPage() {
    const store = useContext(Context).activesStore
    const [show, setShow] = useState(false)

    return (
        <>
            <div className="deposit-page">
                <div className="container" >
                    <div className="deposit-page__title">Вклады / займы</div>
                    <div className="deposit-page__finances">
                        <FinanceTable 
                            setShow={setShow}
                            income={store.actives && store.actives.deposits ? store.actives.properties.total_income : 0}
                            expenses={store.actives && store.actives.deposits ? store.actives.deposits.total_expenses : 0}
                            profit={store.actives && store.actives.deposits ? store.actives.deposits.total_funds : 0} 
                            common_title={""} 
                            income_title={""} 
                            expenses_title={""}                        
                        />
                    </div>
                    <div className="deposit-page__list">
                        {store.actives?.deposits!.deposits.length === 0 &&
                            <div className="deposit-page__list-empty">
                                Вкладов / займов нет...
                            </div>
                        }
                        <div className="deposit-page__list-container">
                            {store.actives?.deposits!.deposits.map((el: IAssetsDeposit)=>{
                                return (
                                    <Link className="property-page__item" to={`${el.id}`} key={el.id}>
                                        <ItemAssets 
                                            title={'Вклад'} 
                                            img={loanImg}
                                            actualPrice={el.sum}
                                            income={0}
                                            profit={0} 
                                        />
                                    </Link> 
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <OverlayModal showModalClass={show ? 'modal--active' : ''} children={undefined}>
                            
            </OverlayModal>
        </>
    )
}