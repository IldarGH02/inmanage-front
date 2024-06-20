import { createContext } from "react";
import { IAssetsBusiness } from "../../../../../app/types/assets/business/IBusiness";
import { IAssetsProperty } from "../../../../../app/types/assets/property/IProperty";
import { IAssetsTransport } from "../../../../../app/types/assets/transport/ITransport";
import { ILiabilitiesProperty } from "../../../../../app/types/liabilities/property/IProperty";
import { ILiabilitiesTransport } from "../../../../../app/types/liabilities/transport/ITransport";
import { IStep } from "../../../../../app/types/steps";

interface IContext {
    stepsArr: IStep[],
    dataArr: IAssetsProperty|IAssetsTransport|IAssetsBusiness|ILiabilitiesProperty|ILiabilitiesTransport,
    nextStep: () => void,
    earlierStep: () => void, 
    clearSteps: ()=> void
}

export const AddModalContext = createContext<IContext|null>(null)  
