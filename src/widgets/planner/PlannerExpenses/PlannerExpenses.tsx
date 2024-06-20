import React from "react"
import "./plannerExpenses.css"

interface IPlannerExpenses {
    sumPlanned: number,
    sumСonfirmed: number,
    title: string
}

export function PlannerExpenses({title, sumPlanned, sumСonfirmed}: IPlannerExpenses) {
    return (
        <div className="planner-expenses">
            <div className="planner-expenses__planned">
                <div className="planner-expenses__planned-title">Запланированные {title}:</div>
                <div className="planner-expenses__planned-sum">{sumPlanned.toLocaleString()} ₽</div>
            </div>
            <div className="planner-expenses__confirmed">
                <div className="planner-expenses__confirmed-title">Подтвержденные {title}:</div>
                <div className="planner-expenses__confirmed-sum">{sumСonfirmed.toLocaleString()} ₽</div>
            </div>
        </div>
    )
}