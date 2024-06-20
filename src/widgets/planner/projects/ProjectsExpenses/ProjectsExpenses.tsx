import React from "react"
import "./projectsExpenses.css"

interface IProjectsExpenses {
    sum: number
}

export function ProjectsExpenses({sum}: IProjectsExpenses) {
    return (
        <div className="project-expenses">
            <div className="project-expenses__title">Расходы:</div>
            <div className="project-expenses__sum">{sum.toLocaleString()} ₽</div>
        </div>
    )
}