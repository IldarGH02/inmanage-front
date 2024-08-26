import { FC, useState } from "react"
import { BusinessFormCreate } from "../../forms/actives/business/BusinessFormCreate/BussinesFormCreate"
import { AddBusinessBalanceForm } from "../../forms/actives/business/AddBusinessBalanceForm/AddBusinessBalanceForm"
import "./BusinessModal.scss"
import { observer } from "mobx-react-lite"

interface IBusinessModal {
    setShow: (bool: boolean) => void
}

export const BusinessModal: FC<IBusinessModal> = observer(({setShow}) => {
    const [balanceVisible, setBalanceVisible] = useState(false)

    return (
        <div className="business__modal">
            { 
                !balanceVisible ? 
                    <BusinessFormCreate onBalanceClick={()=>setBalanceVisible(true)} setShow={setShow}/>
                : 
                    <AddBusinessBalanceForm onClose={()=>setBalanceVisible(false)}/>
            }
        </div>
    )
})