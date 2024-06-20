export interface ITransportDTO {
    id: number, 
    // name: string,
    // brand: string,
    owner: string,
    vin: string,
    use: string,
    owner_type: boolean
}

export interface ILoansDTO {
    id: number,
    name: string
}

export interface IPropertyDTO {
    id: number, 
    name: string, 
    address: string | undefined,
    owner: string
}


export interface IBusinessDTO {
    id: number, 
    name: string,
    address: string | undefined,
    direction: string,
    type: boolean,
}

export interface IInventoryDto {
    name: string,
    price: number,
    done: boolean
}