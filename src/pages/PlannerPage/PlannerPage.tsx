import { useContext } from "react";
import "./plannerPage.css"
import { Background } from "../../widgets/elements/Background/Background";
import { CategoriesPlannerContext } from "../../features/context/categories/planner/CategoriesPlannerContext";
import { Projects } from "../../widgets/planner/projects/Projects";
import { Diary } from "../../widgets/planner/diary/Diary";
import { ExpenseCategories } from "../../entities/Balance/ExpenseBalance/ExpenseCategories/ExpenseCategories";

import plannerBckg from '../../shared/assets/img/planner/plannerBckg.png'

interface IContext {
    category: number,
    setCategory: (i:number)=> void
}

export function PlannerPage() {
    const {setCategory, category} = useContext(CategoriesPlannerContext) as IContext
    const categories = ['Ежедневник', 'Проекты']
    const contentArr = [<Diary/>, <Projects/>]

    return (
        <>
        <Background imgBckg={plannerBckg}/>
        <div className="planner-page">
            <div className="planner-page__categories">
                <ExpenseCategories categories={categories} onChangeCategory={setCategory} categoryActive={category}></ExpenseCategories>
            </div>
            <div className="planner-page__content">
                {contentArr[category]}
            </div>        
        </div>
        </>
    )
}