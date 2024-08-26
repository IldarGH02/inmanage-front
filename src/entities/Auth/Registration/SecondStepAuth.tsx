import React, { FC } from 'react'
import { AuthInput } from '../../../shared/ui/Auth/AuthInput'
import { AuthButton } from '../../../shared/ui/Auth/AuthButton'
import { observer } from 'mobx-react-lite'

interface ISecondStepAuth {
    handleChangeInputName: (e: React.ChangeEvent<HTMLInputElement>) => void
    errorName: string | undefined
    inputName: string

    inputBirthDate: string
    handleChangeInputBirthDate: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleClickRegisterConfirm: () => void

    inputPassword: string
    error: string | undefined
    handleChangeInputPassword: (e: React.ChangeEvent<HTMLInputElement>) => void

    inputPasswordRepeat: string
    handleChangeInputPasswordRepeat: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const SecondStepAuth: FC<ISecondStepAuth> = observer((
    {
        handleChangeInputName, 
        errorName, 
        inputName,

        inputBirthDate,
        handleChangeInputBirthDate,
        handleClickRegisterConfirm,

        inputPassword,
        error,
        handleChangeInputPassword,

        inputPasswordRepeat,
        handleChangeInputPasswordRepeat
    }) => {


    return (
        <div className="registration__secondStep">
            <div className="registration__secondStep-content">
                <label className="registration__label">
                    Введите имя
                    <AuthInput
                        className={`registration__input-name registration-input ${errorName && 'error'}`}
                        handleChange={handleChangeInputName}
                        type="text"
                        value={inputName}
                        placeholder="Имя"
                    />
                    {errorName && <span className="registration__name-error error-validation">{errorName}</span>}
                </label>
                <label className="registration__label">
                    Дата рождения
                    <AuthInput
                        className={`registration__input-date registration-input`}
                        handleChange={handleChangeInputBirthDate}
                        type="date"
                        value={inputBirthDate}
                        placeholder="example: 2000-01-01"
                    />
                </label>
                <label className="registration__label">
                    Задайте пароль
                    <AuthInput
                        className="registration__input-password registration-input"
                        handleChange={handleChangeInputPassword}
                        type="password"
                        value={inputPassword}
                        placeholder="От 3 до 20 символов"
                    />
                    <AuthInput
                        className={`registration__input-password_repeat registration-input ${error && 'error'}`}
                        handleChange={handleChangeInputPasswordRepeat}
                        type="password"
                        value={inputPasswordRepeat}
                        placeholder="Повторите пароль"
                    />
                    {error && <span className="registration__password-error">{error}</span>}
                </label>
            </div>

            <div className="registration__action">
                <AuthButton
                    className="registration__button-submit"
                    text="Зарегистрироваться"
                    onClick={handleClickRegisterConfirm}
                /> 
            </div>
        </div>
    )
})