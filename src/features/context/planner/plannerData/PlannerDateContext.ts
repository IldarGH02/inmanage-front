import { createContext } from "react";

interface IContext {
    date: Date,
    getDate: ()=> void,
    setDate: (date: Date)=> void, 
}

export const PlannerDateContext = createContext<IContext|null>(null)  
