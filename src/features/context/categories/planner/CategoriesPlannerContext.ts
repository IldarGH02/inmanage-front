import { createContext } from "react";

interface IContext {
    category: number,
    setCategory: (i:number)=> void
}

export const CategoriesPlannerContext = createContext<IContext|null>(null)  
