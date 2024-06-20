import { useContext } from "react";
import { Categories } from "../../widgets/Categories/Categories";
import { CategoriesPlannerContext } from "../../features/context/categories/planner/CategoriesPlannerContext";
import { Diary } from "../../widgets/planner/diary/Diary";
import "./plannerPage.css"
import { Projects } from "../../widgets/planner/projects/Projects";

interface IContext {
    category: number,
    setCategory: (i:number)=> void
}

export function PlannerPage() {
    const {setCategory, category} = useContext(CategoriesPlannerContext) as IContext
    const categories = ['Ежедневник', 'Проекты']
    const contentArr = [<Diary/>, <Projects/>]

    return (
        
        <div id="assets-wrapper" className="wrapper">
            <div className="container" >
                {/* <Categories category={categories}></Categories> */}
                <div className="diary-page">
                    <div className="diary-page__categories">
                        <Categories categories={categories} onChangeCategory={setCategory} categoryActive={category}></Categories>
                    </div>
                    
                    {contentArr[category]}
                </div>
            </div>
        </div>
        // </PlannerDateState>
    )
}