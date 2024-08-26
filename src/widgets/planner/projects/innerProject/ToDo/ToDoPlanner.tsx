import { IToDo } from "../../../../../app/types/planner/IPlanner"
import { ImportantTodayItem } from "../ImportantToday/ImportantTodayItem"
import { ToDoItem } from "./ToDoItem"

interface IToDoPlanner {
    data: IToDo[],
    remTodo: (id: number) => void,
    day: number,
    month: string,
    year: number, 
    onEditListItem: (id: number, idInner?: number)=>void
}

export function ToDoPlanner({day, month, year, data, remTodo, onEditListItem}:IToDoPlanner) {

    const onRemTodo = (id: number) => {
        remTodo(id)
    }

    const editListItem = (id: number, idInner?: number) => {
        if(idInner) {
            onEditListItem(id, idInner)
        }
        else {
            onEditListItem(id)
        }
    }

    return (
        <div className="to-do">
            <div className="to-do__header">
                <h2>{day} {month} {year}</h2>
            </div>
            <div className="to-do__list">
                {data.length === 0 &&
                    <div className="to-do__msg">Событий на эту дату не запланированно</div>
                }
                {data.map((el: IToDo) => {
                    if(el.expense===0) {
                        return (
                            <ToDoItem data = {el} remTodo={onRemTodo} onEditListItem={editListItem} key={el.id}></ToDoItem>
                         )
                    }
                    else {
                        return (
                            <ImportantTodayItem onRemove={onRemTodo} onEdit={editListItem} data={el} key={el.id}/>
                        )
                    }
                })}
                
            </div>
        </div>
    )
}