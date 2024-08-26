import { createContext } from "react";
// import { IAssetsBusiness } from "../../../../../app/types/actives/business/BusinessTypes.ts";
import { IAssetsProperty } from "../../../../../app/types/actives/realty/RealtyTypes.ts";
// import { IAssetsTransport } from "../../../../../app/types/actives/transport/TransportTypes.ts";
// import { ILiabilitiesProperty } from "../../../../../app/types/liabilities/property/IProperty";
// import { ILiabilitiesTransport } from "../../../../../app/types/liabilities/transport/ITransport";
import { IStep } from "../../../../../app/types/steps";

interface IContext {
    stepsArr: IStep[],
    dataArr: IAssetsProperty | any,
    nextStep: () => void,
    earlierStep: () => void, 
    clearSteps: ()=> void
}

export const AddModalContext = createContext<IContext|null>(null)  
