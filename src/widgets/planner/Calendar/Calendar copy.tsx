import React, { useEffect, useState } from "react"
import './calendar.css'

interface IDate {
    month: number,
    day: number,
    year: number
}

const monthName: string[] = [
    'Январь', 'Февраль', 'Март', 'Апрель',
    'Май', 'Июнь', 'Июль', 'Август',
    'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
]
const dayName:string[] = [
        'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'
]

interface ICalendar {
    changeDate: (date: IDate)=>void
}

export function Calendar({changeDate}: ICalendar) {
    const [dateSelected, setDateSelected] = useState<IDate>();
    const [monthVisible, setMonthVisible] = useState(4)
    const [yearVisible, setYearVisible] = useState(2023)
    const [newFinalData, setNewFinalData] = useState<Number[][]>([])
    const [monthPanelVisible, setMonthPanelVisible] = useState(false)
    const [yearPanelVisible, setYearPanelVisible] = useState(false)

    useEffect(()=>{
        let dateTmp: IDate = {
            month: Number(new Date().getMonth())+1,
            day: new Date().getDate(),
            year: new Date().getFullYear()
        }
        setDateSelected(dateTmp)
        drawCalendar(dateTmp.month, dateTmp.year)
    },[])

    const yearArr:number[] = []
    for(let i = new Date().getFullYear()-4; i<=new Date().getFullYear()+4; i++ ) {
        yearArr.push(i)
    }

    const drawCalendar = (month: number, year: number) => {
        setYearVisible(year)
        setMonthVisible(month)
        let monthTmp = month
        let yearTmp = year
        // Количество дней в месяце
        var total_days = 32 - new Date(yearTmp, (monthTmp-1), 32).getDate();
        // Начальный день месяца
        var start_day = new Date(yearTmp, (monthTmp-1), 1).getDay();
        if (start_day==0) { start_day=7; }
        start_day--;
        // Количество ячеек в таблице
        var final_index=Math.ceil((total_days+start_day)/7)*7;
        var dayTmp=1;
        var index=0;
        let arrTmp:number[][] = []
        let lenght = final_index/7
        for(let i = 0; i<lenght; i++) {
            arrTmp[i] = new Array()
        }
        for(let i = 0; i<lenght; i++) {
            for(let j = 0; j<7; j++) {
                // Пустые ячейки до начала месяца или после окончания
                if ((index<start_day) || (index>=(total_days+start_day))) {
                    arrTmp[i][j] = 0
                }
                else {
                    arrTmp[i][j] = dayTmp
                    dayTmp++;
                    
                }
                index++;
            }
        }
        setNewFinalData(arrTmp)
    }

    const changeDataSelector = (day:number) => {
        let dateTmp: IDate = {
            month: monthVisible,
            day: day,
            year: yearVisible
        }
        setDateSelected(dateTmp)
        changeDate(dateTmp)
    }

    const nextMonth = () => {
        let month = (monthVisible>1?(monthVisible-1):12)
        let year = (monthVisible>1?yearVisible:(yearVisible-1))
        setYearVisible(year)
        setMonthVisible(month)
        drawCalendar(month, year)
    }

    const earlierMonth = () => {
        let month = monthVisible<12?(monthVisible+1):1
        let year = monthVisible<12?yearVisible:(yearVisible+1)
        setYearVisible(year)
        setMonthVisible(month)
        drawCalendar(month, year)
    }

    const changeMonth = (i: number) => {
        setMonthVisible(i+1)
        drawCalendar(i+1, yearVisible)
        setMonthPanelVisible(false)
    }

    const changeYear = (year: number) => {
        setYearVisible(year)
        drawCalendar(monthVisible, year)
        setYearPanelVisible(false)
    }

    

    return (
        <div className="calendar-table">
            <table cellSpacing="0" cellPadding="0">
                <tbody>
                    <tr>
                        <td className="calendar-table__navigation calendar-table__navigation-earlier-btn" onClick={nextMonth}>&#9668;</td>
                        <td colSpan={5} className="calendar-table__navigation calendar-table__navigation-date">
                            <div className="navigation-date__container">
                                <span>
                                    <b onClick={()=>setMonthPanelVisible(!monthPanelVisible)}>{monthName[monthVisible-1]}</b>
                                    {monthPanelVisible && 
                                        <div>
                                        {monthName.map((el, i)=>{
                                            let className = (el === monthName[monthVisible-1] ? 'navigation-date__cell--active' : 'navigation-date__cell')
                                            return (
                                                <p className={className} onClick={()=>changeMonth(i)} key={i}>{el}</p>
                                            )
                                        })}
                                    </div>
                                    }
                                </span>
                                {' — '}
                                <span>
                                    <b onClick={()=>setYearPanelVisible(!yearPanelVisible)}>{String(yearVisible)}</b>
                                    {yearPanelVisible && 
                                        <div>
                                            {yearArr.map((el, i)=>{
                                                let className = (el === yearVisible ? 'navigation-date__cell--active' : 'navigation-date__cell')
                                                return(
                                                    <p className={className} onClick={()=>changeYear(el)} key={i}>{el}</p>
                                                )
                                            })}
                                        </div>
                                    }
                                </span>
                            </div>
                            
                            
                        </td>
                        <td className="calendar-table__navigation calendar-table__navigation-next-btn" onClick={earlierMonth}>&#9658;</td>
                    </tr>
                    <tr>
                        {dayName.map((el,i:number)=>{
                            return (
                                i>4?<th className="holiday" key={i}>{el}</th>:<th key={i}>{el}</th>
                            )
                        })}
                    </tr>
                        {newFinalData.map((el,i)=>{
                            return (
                                <tr key={i}>
                                    {el.map((innerEl, j)=>{
                                        // пустые
                                        if(innerEl==0) {
                                            return (
                                                <td className="grayed" key={j}> </td>
                                            )
                                        }
                                        let className = ''
                                        if (innerEl===dateSelected!.day && monthVisible===dateSelected!.month && yearVisible===dateSelected!.year) {
                                            className = 'selected'
                                        }
                                        else if (j>4) {
                                            className='holiday'
                                        }
                                        return (
                                            <td className={className} key={j} onClick={()=>changeDataSelector(Number(innerEl))}>{String(innerEl)}</td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                </tbody>
            </table>
        </div>
    )
}