// import React, { useState } from "react";
// import "./calendarBlock.css";
// import { PlannerExpenses } from "../PlannerExpenses/PlannerExpenses";
// import { Calendar } from "../Calendar/Calendar";
// import { monthNameWho } from "../dataForCalendar/data";
// import { useTypedSelector } from "../../../features/hooks/useTypedSelector";

// interface IDate {
//     month: number,
//     day: number,
//     year: number
// }

// interface ICalendarBlock {
//     addTaskFlag: boolean
// }

// export function CalendarBlock({addTaskFlag}: ICalendarBlock) {
//     const state = useTypedSelector(state => state.diaryReducer)
//     const [month, setMonth] = useState(state.date.getMonth())
//     const [day, setDay] = useState(state.date.getDate())
//     const [year, setYear] = useState(state.date.getFullYear())

//     const onChangeDate = (date: IDate) => {
//         //here if!
//         // console.log(date)
//         setMonth(date.month-1)
//         setDay(date.day)
//         setYear(date.year)
//         // getTodo(date.day+'.'+(date.month-1)+'.'+date.year)
//     }

//     console.log(day)

//     return (
//         <div className="calendar-block">
//             <div className="calendar-block__title">{monthNameWho[month]} {year} г.</div>
//             <div className="calendar-block__calendar"><Calendar addTaskFlag={addTaskFlag} changeDate={onChangeDate}/></div>
//             <div className="calendar-block__expenses">
//                 <PlannerExpenses title="расходы" sumPlanned={114120} sumСonfirmed={78800}/>
//             </div>
//         </div>
//     )
// }