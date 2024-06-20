import { createContext } from "react";

interface IContext {
    category: number,
    setCategory: (i:number)=> void
}

export const CategoriesAssetsContext = createContext<IContext|null>(null)  
