import React, { useContext, useEffect, useState } from "react";
import { Overlay } from "../../shared/ui/Overlay/Overlay";
import { validationName } from "../../features/func/validation";
import { FirstStepAuth } from "./Registration/FirstStepAuth";
import { SecondStepAuth } from "./Registration/SecondStepAuth";
import { observer } from "mobx-react-lite";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";


export const AuthRegister = observer(() => {
    const { authStore } = useContext(Context)

    const [inputName, setInputName] = useState<string>('');
    const [inputBirthDate, setInputBirthDate] = useState<string>('');
    const [inputPhone, setInputPhone] = useState<string>('');
    const [inputPassword, setInputPassword] = useState<string>('');
    const [inputPasswordRepeat, setInputPasswordRepeat] = useState<string>('');
    const [code, setCode] = useState<string>('');

    const [errorPassword, setErrorPassword] = useState<string | undefined>('');
    const [errorName, setErrorName] = useState<string | undefined>('');
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate()


    const handleChangeInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const error = validationName(value);

        setInputName(value);
        setErrorName(error.validName);
    };

    const handleChangeInputBirthDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputBirthDate(value)        
    };

    const handleChangeInputPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        let el = e.currentTarget, 
            clearVal = el.dataset.phoneClear, 
            pattern = el.dataset.phonePattern, 
            matrix_def = "+7(___) ___-__-__", 
            matrix = pattern ? pattern : matrix_def, 
            i = 0, 
            def = matrix.replace(/\D/g, ""), 
            val = e.currentTarget.value.replace(/\D/g, "");

        if (e.currentTarget.selectionStart! < 2) {
            e.preventDefault();
        }
        if (clearVal !== 'false' && e.type === 'blur') {
            if (matrix.match(/([\\d])/g) !== null && val.length < matrix.match(/([\\d])/g)!.length) {
                e.currentTarget.value = '';
                return;
            }
        }

        if (def.length >= val.length) {
            val = def;
        }

        e.currentTarget.value = matrix.replace(/./g, function (a: string) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
        });

        setInputPhone(`+${val}`);
    };

    const handleChangeInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputPassword(value);
    };

    const handleChangeInputPasswordRepeat = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputPasswordRepeat(value);
    };

    const handleChangeInputCode = (e: React.ChangeEvent<HTMLInputElement>) => {
        return e.target.value = code;
    };

    const handleClickRegisterConfirm = () => {
        const temp_token = authStore.temp_token;
        const password = inputPassword;
        const name = inputName;
        const birthdate = inputBirthDate;

        authStore.registrationConfirm(temp_token, code, password, name, birthdate, inputPhone);
        navigate('/balance')
    };

    const handleClickGetCode = () => {
        const code = '1111';
        setLoading(true);
        setTimeout(() => {
            setCode(code);
            setLoading(false);
        }, 2000);
        authStore.registration(inputPhone)
    };

    useEffect(() => {
        if (inputPassword.length === inputPasswordRepeat.length) {
            if (inputPassword !== inputPasswordRepeat) {
                setErrorPassword('Пароли не совпадают');
            } else {
                setErrorPassword('');
            }
        }

        if (inputPassword.length !== inputPasswordRepeat.length) {
            if (inputPassword !== inputPasswordRepeat) {
                setErrorPassword('Пароли не совпадают');
            } else {
                setErrorPassword('');
            }
        }
        
        }, [
                inputPassword, 
                inputPasswordRepeat, 
                inputName, 
                inputBirthDate, 
                inputBirthDate,
                authStore
            ]
    );

    return (
            <>
                <div className="registration__form-content">
                    { !authStore.temp_token ? 
                        <FirstStepAuth
                            handleChangePhone={handleChangeInputPhone}
                            handleChangeInputCode={handleChangeInputCode}
                            code={code}
                            value={inputPhone}
                            onClick={handleClickGetCode}
                        /> :
                        <SecondStepAuth
                            handleChangeInputBirthDate={handleChangeInputBirthDate}
                            handleChangeInputName={handleChangeInputName}
                            handleClickRegisterConfirm={handleClickRegisterConfirm}
                            handleChangeInputPassword={handleChangeInputPassword}
                            handleChangeInputPasswordRepeat={handleChangeInputPasswordRepeat}
                            inputPassword={inputPassword}
                            inputPasswordRepeat={inputPasswordRepeat}
                            error={errorPassword}
                            inputBirthDate={inputBirthDate}
                            inputName={inputName}
                            errorName={errorName}
                        />
                    }
                 </div>
                {loading &&
                    <Overlay active="overlay--active" />
                }
            </>
    );
});
