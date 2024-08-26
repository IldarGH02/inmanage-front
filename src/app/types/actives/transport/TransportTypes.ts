import {TransportDto} from "../../dto/DtoTypes.ts";

export interface ITransports {
    id: string;
    total_expenses: number;
    total_funds: number;
    total_income: number;
    transport: TransportDto[]

}


export interface ITransportImages {
    id: number,
    transport: number,
    image: string
}

// export interface IInventoryProperty {
//     id: number, 
//     name: string,
//     price: number,
//     property_id: number
// }