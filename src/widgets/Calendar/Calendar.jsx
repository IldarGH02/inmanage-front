import React, { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
// require('react-datepicker/dist/react-datepicker.css');
// import type { DatePickerProps } from 'antd';
// import { DatePicker, Space } from 'antd';
// import ruRU from 'antd/lib/locale-provider';
import ru from 'date-fns/locale/ru';
import "./calendar.css"

export default function Calendar({onCickCalendar, initialDate=''}) {
    const [date, setDate] = useState(new Date());
    useEffect(()=>{
        let month  = (date.getMonth()+1)
        let str = date.getDate() + '.' + (month > 10 ? month: '0'+month) + '.' + date.getFullYear()
        onCickCalendar(str)
        // setDate(str)
    },[date])

    useEffect(()=>{
        let dt = initialDate.split('.')
        initialDate === '' ? setDate(new Date()) : setDate(new Date(dt[2], Number(dt[1])-1, dt[0]))
    },[])

    // const onChangeDate = (date) => {
    //     setDate(date)
    // } 

    const customStyles = {
        backgroundColor: "red"
    };
    return (
        <DatePicker
            selected={date} 
            value={date}
            onChange={(date) => setDate(date)}
            // onChange={(e) => e.preventDefault()}
            className = "calendar__input"
            popperPlacement = "right"
            wrapperClassName = "calendar__main"
            locale={ru}
            dateFormat="dd.MM.yyyy"
            // style={customStyles}
        />
    )
}

