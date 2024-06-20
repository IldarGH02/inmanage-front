import { AuthForm } from '../../shared/ui/Auth/AuthForm'
import { AuthRegister } from '../../entities/Auth/AuthRegister' 
import { LOGIN_PATH } from '../../features/constants/path-route'
import { ChooseAuth } from '../../entities/Auth/ChooseAuth/ChooseAuth'
import { observer } from 'mobx-react-lite'

export const RegistrationPage = observer(() => {
    return (
        <section className="auth__registration">
            <div className="container">
                <div className="registration__content">
                    <AuthForm className='registration__form' id='registration__form'>
                        <AuthRegister/>                    
                    </AuthForm>
                    <ChooseAuth
                        classNameElement="registration__choose"
                        classNameLink="registration__choose-link"
                        textLink="Войти" 
                        classNameText='registration__choose-text' 
                        text='Зарегистрированы?' 
                        path={LOGIN_PATH}
                    />
                </div>
            </div>
        </section>
    )
})
