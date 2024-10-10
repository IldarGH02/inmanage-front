import ReactDOM from 'react-dom/client';
import { createContext } from 'react';
import { App } from './app/app';
import { BrowserRouter } from 'react-router-dom';
import { RootStore } from './app/store/rootStore.ts';

interface State {
    rootStore: RootStore
}

const rootStore = new RootStore()
export const Context = createContext<State>({
    rootStore
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <Context.Provider value={{
        rootStore
    }}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Context.Provider>
);

