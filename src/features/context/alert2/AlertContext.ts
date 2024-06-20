import { createContext } from "react";
import { IAlert } from "../../../app/types/alert/IAlert";

interface IContext {
    showAlert: (text:string, type: string)=>void, 
    hideAlert: ()=>void,
    alert: IAlert
}

export const AlertContext = createContext<IContext|null>(null)