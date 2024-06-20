import ReactDOM from 'react-dom/client';
import { createContext } from 'react';
import { App } from './app/app';
import { BrowserRouter } from 'react-router-dom';
import AuthStore from './app/store/authStore';

interface State {
    authStore: AuthStore
}

const authStore = new AuthStore()
export const Context = createContext<State>({
    authStore
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <Context.Provider value={{
        authStore
    }}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Context.Provider>
);

