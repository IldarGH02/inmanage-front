import { useEffect, useState } from "react"
import PaymentsStore from "../../../../app/store/paymentsStore"
import { observer } from "mobx-react-lite"
import './calendarPayments.css'

interface IDate {
    month: number,
    day: number,
    year: number
}

const dayName:string[] = [
    'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'
]

interface ICalendar {
    changeDate: (date: IDate)=>void, 
    addTaskFlag?: boolean
}

export const CalendarPayments = observer(({changeDate, addTaskFlag=false}: ICalendar) => {
    const [store] = useState(
        () => new PaymentsStore()
    )

    const [dateSelected, setDateSelected] = useState<IDate>();
    const [monthVisible, setMonthVisible] = useState(4)
    const [yearVisible, setYearVisible] = useState(2023)
    const [newFinalData, setNewFinalData] = useState<number[][]>([])

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
        //@ts-ignore
        let lastDayInMonth = 28

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
        var final_index = Math.ceil((total_days+start_day)/7)*7;
        var dayTmp = 1;
        var index = 0;
        let arrTmp: number[][] = []
        let length = final_index / 7

        for(let i = 0; i<length; i++) {
            arrTmp[i] = new Array()
        }
        for(let i = 0; i<length; i++) {
            for(let j = 0; j<7; j++) {
                // Пустые ячейки до начала месяца или после окончания
                if ((index<start_day) || (index>=(total_days+start_day))) {
                    arrTmp[i][j] = 0
                }
                else {
                    if(i==length-1) {
                        lastDayInMonth = dayTmp
                    }
                    arrTmp[i][j] = dayTmp
                    dayTmp++;
                    
                }
                index++;
            }
        }
        
        setNewFinalData(arrTmp)
        if(newFinalData.length===0) {
            store.createDays(arrTmp)
        }
    }

    const changeDataSelector = (day:number) => {
        if(!addTaskFlag) {
            let dateTmp: IDate = {
                month: monthVisible,
                day: day,
                year: yearVisible
            }
            setDateSelected(dateTmp)
            store.createDays(newFinalData)
            store.createDate(new Date(yearVisible, monthVisible-1, day))
        }
    }

    const earlierMonth = () => {
        if(!addTaskFlag) {
            let month = (monthVisible>1?(monthVisible-1):12)
            let year = (monthVisible>1?yearVisible:(yearVisible-1))
            setYearVisible(year)
            setMonthVisible(month)
            drawCalendar(month, year)
            let dateTmp: IDate = {
                month: month,
                day: 1,
                year: year
            }
            changeDate(dateTmp)
        }
    }

    const nextMonth = () => {
        if(!addTaskFlag) {
            let month = monthVisible<12?(monthVisible+1):1
            let year = monthVisible<12?yearVisible:(yearVisible+1)
            setYearVisible(year)
            setMonthVisible(month)
            drawCalendar(month, year)
            let dateTmp: IDate = {
                month: month,
                day: 1,
                year: year
            }
            changeDate(dateTmp)
        }
    }

    return (
        <div className="calendar-table">
            <table cellSpacing="0" cellPadding="0">
                <tbody>
                    <tr className="calendar-table__header">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="calendar-table__navigation-earlier-btn"><button className="calendar-table-btn calendar-table__next-btn" onClick={earlierMonth}></button></td>
                        <td className="calendar-table__navigation-next-btn"><button className="calendar-table-btn calendar-table__early-btn" onClick={nextMonth}></button></td>
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
})
