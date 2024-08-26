import ReactDOM from 'react-dom/client';
import { createContext } from 'react';
import { App } from './app/app';
import { BrowserRouter } from 'react-router-dom';
import AuthStore from './app/store/authStore';
import BalanceStore from "./app/store/balanse/balanceStore.ts";
import { ActivesStore } from "./app/store/activesStore.ts";
import PaymentsStore from "./app/store/paymentsStore.ts";
import { LiabilitiesStore } from './app/store/liabilities/liabilitiesStore.ts';
import { BusinessCreate } from './shared/store/business/BusinessCreate.ts';
import { SecuritiesStore } from './shared/store/securitites/securitiesStore.ts';
import { JewerlyStore } from './shared/store/jewerly/jewerlyStore.ts';

interface State {
    authStore: AuthStore,
    balanceStore: BalanceStore,
    activesStore: ActivesStore,
    paymentsStore: PaymentsStore,
    liabilitiesStore: LiabilitiesStore,
    businessCreateStore: BusinessCreate,
    securitiesStore: SecuritiesStore
    jewerlyStore: JewerlyStore
}

const authStore = new AuthStore()
const balanceStore = new BalanceStore()
const activesStore = new ActivesStore()
const paymentsStore = new PaymentsStore()
const liabilitiesStore = new LiabilitiesStore()
const businessCreateStore = new BusinessCreate()
const securitiesStore = new SecuritiesStore()
const jewerlyStore = new JewerlyStore()

export const Context = createContext<State>({
    authStore,
    balanceStore,
    activesStore,
    paymentsStore,
    liabilitiesStore,
    businessCreateStore,
    securitiesStore,
    jewerlyStore
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <Context.Provider value={{
        authStore,
        balanceStore,
        activesStore,
        paymentsStore,
        liabilitiesStore,
        businessCreateStore,
        securitiesStore,
        jewerlyStore
    }}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Context.Provider>
);

