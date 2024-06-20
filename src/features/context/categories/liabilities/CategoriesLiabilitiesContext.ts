import { createContext } from "react";

interface IContext {
    category: number,
    setCategory: (i:number)=> void
}

export const CategoriesLiabilitiesContext = createContext<IContext|null>(null)  
