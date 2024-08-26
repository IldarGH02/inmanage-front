import React, { FC, useEffect } from "react"
import "./inputSum.css"
import {Input} from "../../../../shared/ui/input/Input.tsx";
// import {useInput} from "../../../../features/hooks/input/useInput.tsx";
import {useError} from "../../../../features/hooks/useError/useError.tsx";

// interface IInputSum {
//     length: number,
//     value: string,
//     alertSignal?: string,
//     setAlert: (str: string)=>void,
//     setValue: (str: string)=>void
// }

type InputSum = {
    value: string,
    length: number,
    setValue: (str: string)=>void,
    setErrorInput: (str: string) => void,
}

// export function InputExpenseSum({length, value, setValue, setAlert, alertSignal=''}:IInputSum) {
//     const [textAlert, setTextAlert] = useState('')
//     const [attentionVisible, setAttentionVisible] = useState(false)
//
//     function discharge(str:string): string {
//         return str.replace(/[^0-9.]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, " ")
//     }
//
//     useEffect(()=>{
//         setAttentionVisible(true)
//         setTextAlert(alertSignal)
//     },[alertSignal])
//     useEffect(()=>{
//         setAttentionVisible(false)
//     },[])
//
//     // function rtl()
//     // {
//     //     let element = document.getElementById('expense-input-sum') as HTMLInputElement
//     //     if(element && element.setSelectionRange){
//     //         element.setSelectionRange(0,0);
//     //         setValue(Number(value.replace(/ /g,'')).toLocaleString())
//     //         // element.setSelectionRange(0,0);
//     //     }
//     // }
//
//     const changeValue = (event: React.FormEvent<HTMLInputElement>) => {
//         const maxLength = length
//         const lengthCurrent = event.currentTarget.value.replace(/ /g,'').length
//         if(value == '0' && event.currentTarget.value[1]) {
//             setValue(event.currentTarget.value[1])
//         }
//         else {
//             setValue(event.currentTarget.value)
//         }
//         // setValue(event.currentTarget.value)
//         if(lengthCurrent<=maxLength) {
//             setTextAlert('')
//             setAlert('')
//         }
//         else {
//             setTextAlert(`кол-во символов превышено на ${lengthCurrent - maxLength}`)
//             setAlert(`кол-во символов превышено на ${lengthCurrent - maxLength}`)
//             // setValue('')
//         }
//     }
//
//     const blurInput = ()=> {
//         if(textAlert!==''||value==='') {
//             setAttentionVisible(true)
//         }
//         else {
//             setAttentionVisible(false)
//         }
//     }
//
//     return (
//         <>
//             <div
//                 className="expense-input-sum">
//                     <input
//                         id='expense-input-sum'
//                         placeholder="Введите сумму"
//                         type='text'
//                         value={value}
//                         onChange={changeValue}
//                         onBlur={blurInput}
//                         onKeyUp={()=>{setValue(discharge(value))}}>
//
//                     </input><b> ₽</b><b className="expense-input-sum__attention">{attentionVisible ? '!':' '}</b></div>
//             {textAlert!=='' && <UseError text={textAlert} type={'warning'}/>}
//         </>
//
//     )
// }

export const InputSum: FC<InputSum> = ({length, value, setValue, setErrorInput}) => {
    const error = useError('')

    useEffect(() => {
        if(error.error) {
            setErrorInput(error.error)
        }
    }, []);

    const  discharge = (str:string): string => {
        return str.replace(/[^0-9.]/g,'').replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }

    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const maxLength = length;
        const lengthCurrent = e.target.value.replace(/ /g, '').length;
        const currentValue = e.target.value;
        if(value == '0' && currentValue[1]) {
            setValue(currentValue[1])
        }
        else {
            setValue(e.currentTarget.value)
        }
        setValue(e.currentTarget.value)
        if(lengthCurrent<=maxLength) {
            error.setError('')
        }
        else {
            error.setError(`кол-во символов превышено на ${lengthCurrent - maxLength}`)
        }
    }

    return (
        <div className="categories__input-container">
            <Input
                value={value}
                onChange={handleChangeValue}
                onKeyUp={() => setValue(discharge(value))}
                placeholder='Введите сумму'
                type='text'
                className='categories__input-sum'
            />
            <span>₽</span>
        </div>
    )
}