import { combineReducers } from "redux";
import { assetsReducer } from "./assets/assetsReducer";
import { liabilitiesReducer } from "./liabilities/liabilitiesReducer";
import { authReducer } from "./auth/authReducer";
import { diaryReducer } from "./diaryReducer";
import { plannerReducer } from "./plannerReducer";
import { paymentsReducer } from "./paymentsReducer";
import { balanceReducer } from "./balance/balanceReducer";

export const rootReducer = combineReducers({
    authReducer: authReducer,
    assetsReducer: assetsReducer,
    balanceReducer: balanceReducer,
    liabilitiesReducer: liabilitiesReducer,
    diaryReducer: diaryReducer,
    paymentsReducer: paymentsReducer,
    plannerReducer: plannerReducer
});

export type RootState = ReturnType<typeof rootReducer>;
