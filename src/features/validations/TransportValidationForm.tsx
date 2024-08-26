import {useEffect, useState} from "react";

export const useTransportValidationForm= (
        initialValue: string,
        brand: string,
        model: string,
        year: string,
        ownerCount: string,
        paymentType: string
    ) => {

    const [sumValue, setSumValue] = useState<string>(initialValue)
    const [brandValue, setBrandValue] = useState<string>(brand)
    const [modelValue, setModelValue] = useState<string>(model)
    const [yearValue, setYearValue] = useState<string>(year)
    const [ownerCountValue, setOwnerCountValue] = useState<string>(ownerCount)
    const [paymentTypeValue, setPaymentTypeValue] = useState<string>(paymentType)
    const [errorLength, setErrorLength] = useState<string>('')
    const [errorRequire, setErrorRequire] = useState<string>('')
    const [valid, setValid] = useState<boolean>(false)


    useEffect(() => {
        const maxLength = 12;

        const requireError = 'Обязательное для заполнения поле'
        const maxLengthError = 'Не более 12 символов'

        if(sumValue) {
            if(sumValue.length > maxLength) {
                setErrorLength(maxLengthError)
                setValid(false)
            } else {
                setErrorLength('')
            }

            if(sumValue.length <= 0) {
                setErrorRequire(requireError)
                setValid(false)
            } else {
                setErrorRequire('')
            }

            if(!errorRequire && !errorLength) {
                setValid(true)
            }
        }


        if(brandValue && modelValue && yearValue && ownerCountValue && paymentTypeValue) {
            setValid(true)
        } else {
            setErrorRequire(requireError)
            setValid(false)
        }

        if(!errorRequire && !errorLength) {
            setValid(true)
        }


    }, [brandValue, errorLength, errorRequire, modelValue, ownerCountValue, paymentTypeValue, sumValue, yearValue]);


    return {
        setSumValue,
        setBrandValue,
        setModelValue,
        setYearValue,
        setOwnerCountValue,
        setPaymentTypeValue,
        errorRequire,
        errorLength,
        valid
    }
}