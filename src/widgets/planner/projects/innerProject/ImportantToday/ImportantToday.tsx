
import { IToDo } from "../../../../../app/types/planner/IPlanner"
import "./importantToday.css"
import { ImportantTodayItem } from "./ImportantTodayItem"

// const arr: IImportantToday[] = [
//     {
//         id: 1,
//         user_id: 1,
//         date: '13.04.2023',
//         title: 'Task 1',
//         endTime: '12:00',
//         expense: 120000000,
//         description: 'Description 1', 
//         done: false
//     },
//     {
//         id: 2,
//         user_id: 1,
//         date: '13.04.2023',
//         title: 'Task 2',
//         endTime: '13:00',
//         expense: 15000,
//         description: 'Description 2', 
//         done: false
//     },
//     {
//         id: 3,
//         user_id: 1,
//         date: '13.04.2023',
//         title: 'Task 3',
//         endTime: '14:00',
//         expense: 11000,
//         description: 'Description 3', 
//         done: false
//     }
// ] 

interface IImportantToday {
    data: IToDo[],
    onEditImportantToday:(id:number) => void,
    onRemoveImportantToday: (id:number) => void
}

export function ImportantToday({data, onEditImportantToday, onRemoveImportantToday}:IImportantToday) {
    // const [importantToday, setImportantToday] = useState(arr)

    // const removeTodo = (id: number) => {
    //     let newTodo = importantToday.filter(el => el.id !== id)
    //     setImportantToday(newTodo)
    // }

    return (
        <div className="important-today">
            <div className="important-today__header">
                <h3>Траты по проекту на сегодня: </h3>
            </div>
            <div className="important-today__items">
                {data.length === 0 && 
                    <div className="important-today__msg">Траты отсутствуют</div>
                }
                {data.map(el=>{
                    return (
                        <ImportantTodayItem data = {el} onRemove={onRemoveImportantToday} onEdit={onEditImportantToday} key={el.id}/>
                    )
                })}
            </div>
        </div>
    )
}