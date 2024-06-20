import { AuthForm } from '../../shared/ui/Auth/AuthForm'
import { AuthLogin } from '../../entities/Auth/AuthLogin'
import { ChooseAuth } from '../../entities/Auth/ChooseAuth/ChooseAuth' 
import { REGISTER_PATH } from "../../features/constants/path-route"

import logo from "../../shared/assets/img/logo.png"
import { observer } from 'mobx-react-lite'
import { Overlay } from '../../shared/ui/Overlay/Overlay'
import { useAuth } from '../../features/hooks/auth/auth'

export const LoginPage = observer(() => {
    const auth = useAuth()

    if(auth.isLoading) {
        return <Overlay active='overlay--active'/>
    }

    return (
        <section className="auth__login">
            <div className="container">
                <div className="login__content">
                    <img src={logo} alt="logo" className="login__logo"/>
                    <AuthForm className='login__form' id='login__form'>
                        <AuthLogin/>                    
                    </AuthForm>
                    <ChooseAuth
                        classNameElement="login__choose"
                        classNameLink="login__choose-link"
                        textLink="Зарегистрироваться" 
                        classNameText='login__choose-text' 
                        text='Не зарегистрированы?' 
                        path={REGISTER_PATH}
                    />
                </div>                
            </div>
        </section>
    )
})