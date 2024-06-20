import { monthNameWho } from "../../../../widgets/planner/dataForCalendar/data";
import { PlannerExpenses } from "../../../../widgets/planner/PlannerExpenses/PlannerExpenses"; 
import { CalendarPayments } from "../CalendarPayments/CalendarPayments";
import { useState } from "react";
import PaymentsStore from "../../../../app/store/paymentsStore";
import { observer } from "mobx-react-lite";

import "./calendarPaymentsBlock.css";

interface IDate {
    month: number,
    day: number,
    year: number
}

export const CalendarPaymentsBlock = observer(() => {
    const [store] = useState(
        () => new PaymentsStore()
    )
    // const state = useTypedSelector(state => state.paymentsReducer)
    const [month, setMonth] = useState(store.date.getMonth())
    const [day, setDay] = useState(store.date.getDate())
    const [year, setYear] = useState(store.date.getFullYear())

    const onChangeDate = (date: IDate) => {
        console.log(date)
        setMonth(date.month-1)
        setDay(date.day)
        setYear(date.year)
    }

    console.log(day)

    return (
        <div className="calendar-payments-block">
            <h2 className="calendar-payments-block__title">{monthNameWho[month]} {year} г.</h2>
            <div className="calendar-payments-block__content">
                <div className="calendar-payments-block__calendar"><CalendarPayments changeDate={onChangeDate}/></div>
                <div className="calendar-payments-block__expenses">
                    <PlannerExpenses title="платежи" sumPlanned={114120} sumСonfirmed={78800}/>
                </div>
            </div>
        </div>
    )
})