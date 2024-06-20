import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../../app/store/reducers/rootReducer"; 

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
