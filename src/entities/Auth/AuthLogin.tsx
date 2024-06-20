import React, { useContext, useEffect, useState } from "react"
import { AuthInput } from "../../shared/ui/Auth/AuthInput"
import { AuthButton } from "../../shared/ui/Auth/AuthButton"
import { Context } from "../../main"
import { observer } from 'mobx-react-lite'
import { useNavigate } from "react-router-dom"

export const AuthLogin = observer(() => {
    const [phone, setPhone] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [disabled, setDisabled] = useState<boolean>(true)
    const navigate = useNavigate()

    const { authStore } = useContext(Context)

    const handleChangeInputPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        let el = e.currentTarget,
            clearVal = el.dataset.phoneClear,
            pattern = el.dataset.phonePattern,
            matrix_def = "+7(___) ___-__-__",
            matrix = pattern ? pattern : matrix_def,
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = e.currentTarget.value.replace(/\D/g, "");

        if(e.currentTarget.selectionStart! < 2) {
            e.preventDefault();
        }
        if (clearVal !== 'false' && e.type === 'blur') {
            if (matrix.match(/([\\d])/g)!==null && val.length < matrix.match(/([\\d])/g)!.length) {
                e.currentTarget.value = '';
                return;
            }
        }

        if (def.length >= val.length) {
                val = def;
        }

        e.currentTarget.value = matrix.replace(/./g, function (a: string) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
        });

        setPhone(`+${val}`)
    }

    const handleChangeInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setPassword(value)
    }

    const handleClickForgot = () => {

    }

    const handleLogin = () => {
        authStore.login(phone, password)
        navigate('/balance')
    }

    useEffect(() => {
        return password.length > 3 && password.length < 20 ? setDisabled(false) : setDisabled(true)
    }, [password.length])

    return (
        <div className="login__form-content">
            <label className="login__label phone-label">
                Телефон
                <AuthInput 
                    className="login__input phone-login"
                    placeholder="Телефон"
                    handleChange={handleChangeInputPhone}
                    value={phone}
                    type="tel"
                    required
                />
            </label>
            <label className="login__label password-label">
                Пароль
                <AuthInput
                    className="login__input password-input"
                    placeholder="Введите пароль"
                    handleChange={handleChangeInputPassword}
                    value={password}
                    type="password"
                    required
                />
            </label>
            <div className="login__actions">
                <AuthButton 
                    className="login__forgot-button"
                    text="Забыли пароль?"
                    onClick={handleClickForgot}
                />
                <AuthButton
                    className={`${disabled ? 'login__button-disabled' : 'login__button'}`}
                    type="submit"
                    onClick={handleLogin}
                    text="Войти"
                />  
            </div>            
        </div>
    )
})