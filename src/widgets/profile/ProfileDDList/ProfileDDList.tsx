import "./profileDDList.css";
import { IProfileDDList } from "../../../app/types/profile/IProfile";

interface IProfileDDListProps {
    data: IProfileDDList[],
    name: string,
    id: string,
    onSetValue: (val: string)=>void,
    placeholder: string
}

export function ProfileDDList({data, id, name, onSetValue, placeholder}:IProfileDDListProps) {

    const setItem = ()=> {
        (document.getElementById(id) as HTMLInputElement).checked = false
    }

    return (
        <div className="profile-drop-down-list">
            <input className="profile-drop-down-list-input" type="checkbox" name="accord" id={id} onClick={()=>console.log(data)}></input>
            <div className="profile-drop-down-list__container">
                <div className="profile-drop-down-list__name">{name+':'}</div>
                <label className="profile-drop-down-list__title" htmlFor={id}>
                    {placeholder} 
                </label> 
            </div>
            <div className="profile-drop-down-list__content">
                <ul>
                {data.map((el)=>{
                    if(!el.active) {
                        return (
                            <li key={el.id} onClick={()=>{
                                onSetValue(el.name)
                                setItem()
                            }}><p>{el.name}</p></li>
                        )
                    }
                })}
                </ul>
            </div>      
        </div>
    )
}