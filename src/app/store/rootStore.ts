import { makeAutoObservable } from "mobx";
import { ImmovablesStore } from "../../shared/store/immovables/immovablesStore";
import { JewelryStore } from "../../shared/store/jewelry/jewelryStore";
import { TransportStore } from "../../shared/store/transport/transportStore";
import { ActivesStore } from "./activesStore";
import { AuthStore } from "./authStore";
import BalanceStore from "./balanse/balanceStore";
import PaymentsStore from "./paymentsStore";
import { LiabilitiesStore } from "./liabilities/liabilitiesStore";
import { BusinessCreate } from "../../shared/store/business/BusinessCreate";
import { SecuritiesStore } from "../../shared/store/securitites/securitiesStore";
import { LoansStore } from "../../shared/store/loans/loansStore";
import { ImmovablesValidation } from "../../shared/validation/immovablesValidation";
import { Switcher } from "../../shared/store/Switcher/Switcher";

export class RootStore {
    authStore: AuthStore = new AuthStore()
    activesStore: ActivesStore = new ActivesStore()
    balanceStore: BalanceStore = new BalanceStore()
    transportStore: TransportStore = new TransportStore()
    immovablesStore: ImmovablesStore = new ImmovablesStore()
    immovablesValidation: ImmovablesValidation = new ImmovablesValidation()
    jewelryStore: JewelryStore = new JewelryStore()
    paymentsStore: PaymentsStore = new PaymentsStore()
    liabilitiesStore: LiabilitiesStore = new LiabilitiesStore()
    businessCreateStore: BusinessCreate = new BusinessCreate()
    securitiesStore: SecuritiesStore = new SecuritiesStore()
    loansStore: LoansStore = new LoansStore()
    switcherStore: Switcher = new Switcher()
    
    constructor(){
        makeAutoObservable(this)
    }
}