import { useEffect, useState } from "react"
import './calendar.css'
import { useDispatch } from "react-redux"
import { getTasksByDate, setDate, setTasks } from "../../../app/store/actions/diaryActions"
import { actionTypes } from "../../../app/store/types/types"

interface IDate {
    month: number,
    day: number,
    year: number
}

// const monthName: string[] = [
//     'Январь', 'Февраль', 'Март', 'Апрель',
//     'Май', 'Июнь', 'Июль', 'Август',
//     'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
// ]
const dayName:string[] = [
        'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'
]

interface ICalendar {
    changeDate: (date: IDate)=>void, 
    addTaskFlag: boolean
}

export function Calendar({changeDate, addTaskFlag}: ICalendar) {
    // const state = useTypedSelector(state => state.diaryReducer)
    const dispatch = useDispatch()
    const [dateSelected, setDateSelected] = useState<IDate>();
    const [monthVisible, setMonthVisible] = useState(4)
    const [yearVisible, setYearVisible] = useState(2023)
    const [newFinalData, setNewFinalData] = useState<Number[][]>([])
    // const [monthPanelVisible, setMonthPanelVisible] = useState(false)
    // const [yearPanelVisible, setYearPanelVisible] = useState(false)

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
        var final_index=Math.ceil((total_days+start_day)/7)*7;
        var dayTmp=1;
        var index=0;
        let arrTmp:number[][] = []
        let length = final_index/7
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
        const firstDateInMonth = '01'+'.'+month+'.'+year
        const lastDateInMonth = lastDayInMonth+'.'+month+'.'+year
        const res = setTasks(actionTypes.SET_TASKS_DIARY, firstDateInMonth, lastDateInMonth)
            res.then(e => {
                // console.log(e)
                dispatch(e!);
            })
            .catch((e) => {
                console.log(e)
            })
        // console.log(lastDayInMonth+'.'+month+'.'+year)
        setNewFinalData(arrTmp)
    }

    const changeDataSelector = (day:number) => {
        if(!addTaskFlag) {
            let dateTmp: IDate = {
                month: monthVisible,
                day: day,
                year: yearVisible
            }
            setDateSelected(dateTmp)
            // console.log(new Date(yearVisible, monthVisible-1, day))
            dispatch(setDate(actionTypes.SET_DATE_DIARY, new Date(yearVisible, monthVisible-1, day)))
            dispatch(getTasksByDate(actionTypes.GET_TASKS_BY_DATE, new Date(yearVisible, monthVisible-1, day)))
            // changeDate(dateTmp)
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

    // const changeMonth = (i: number) => {
    //     setMonthVisible(i+1)
    //     drawCalendar(i+1, yearVisible)
    //     // setMonthPanelVisible(false)
    // }

    // const changeYear = (year: number) => {
    //     setYearVisible(year)
    //     drawCalendar(monthVisible, year)
    //     // setYearPanelVisible(false)
    // }

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
                        {/* <td colSpan={5} className="calendar-table__navigation calendar-table__navigation-date">
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
                        </td> */}
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
}
