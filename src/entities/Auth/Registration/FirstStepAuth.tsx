import React, { FC } from 'react'
import { AuthInput } from '../../../shared/ui/Auth/AuthInput'
import { AuthButton } from '../../../shared/ui/Auth/AuthButton'
import { observer } from 'mobx-react-lite'

interface IFirstStepAuth {
    handleChangePhone: (e: React.ChangeEvent<HTMLInputElement>) => void
    value: string,
    handleChangeInputCode: (e: React.ChangeEvent<HTMLInputElement>) => void
    code: string
    onClick: () => void
}

export const FirstStepAuth: FC<IFirstStepAuth> = observer((
    {
        handleChangePhone, 
        value, 
        handleChangeInputCode, 
        code, 
        onClick
    }) => {
    return (
        <div className="registration__firstStep">
            <div className="registration__firstStep-content">
                <label className="registration__label">
                    Введите телефон
                    <AuthInput
                        className="registration__input-phone registration-input"
                        handleChange={handleChangePhone}
                        type=":tel"
                        value={value}
                        placeholder="Телефон"
                    />
                </label>
                {code && 
                    <label className="registration__label">
                        <AuthInput
                            className="registration__input-code registration-input"
                            handleChange={handleChangeInputCode}
                            type="text"
                            value={code}
                            placeholder="Введите СМС-код"
                        />
                    </label>
                }
                </div>
            <div className="registration__action">
                <AuthButton
                    className="registration__button-code"
                    text="Получить СМС-код"
                    onClick={onClick}
                />
            </div>
        </div>
    )
})