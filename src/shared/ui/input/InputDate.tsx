import { FC, useEffect, useState } from "react"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { ruRU } from "@mui/x-date-pickers/locales"
import "./InputDate.scss"
import { DateTime } from "luxon";

interface InputDate {
    onChange: (value: DateTime) => void
    value: DateTime | null
    placeholder: string
}

export const InputDate: FC<InputDate> = (
    {
        onChange
    }) => {

    const [date, setDate] = useState<DateTime | null>(null)

    useEffect(() => {
        if(date !== null) {
            console.log(date.toISODate())
            onChange(date)
        }
    }, [date])
    
    return (
            <LocalizationProvider 
                dateAdapter={AdapterLuxon} 
                adapterLocale="ru"
                localeText={ruRU.components.MuiLocalizationProvider.defaultProps.localeText}
            >
                <DemoContainer components={['DatePicker']}>
                    <DatePicker
                        label='Дата первого платежа'
                        // defaultValue={DateTime.fromISO(new Date().toLocaleDateString())}
                        onChange={(newDate) => setDate(newDate)}
                        value={date}
                        className="input__date-container"
                        name="Дата первого платежа"
                    />
                </DemoContainer>
            </LocalizationProvider>         
    )
}