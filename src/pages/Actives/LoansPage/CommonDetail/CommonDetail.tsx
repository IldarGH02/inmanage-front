import { useContext } from "react"
import { Context } from "../../../../main"
import { observer } from "mobx-react-lite"
import { LoansDetailPage } from "./LoansDetail/LoansDetailPage"
import { DepositDetailPage } from "./DepositDetail/DepositDetailPage"

export const CommonDetail = observer(() => {
    const { loansStore } = useContext(Context)

    return loansStore.loan ? <LoansDetailPage/> : <DepositDetailPage/>
})