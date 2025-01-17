import { ValuableRequest } from "../../../app/types/request/requestTypes"

export const prepareJewelryRequest = (
    name: string,
    purchase_price: string,
    estimated_value: string,
    comment: string,
    photo: string,
) => {
    const jewelry_full: ValuableRequest = {
        name: name,
        purchase_cost: Number(purchase_price.replace(/\s/g, '')),
        estimated_cost: Number(estimated_value.replace(/\s/g, '')),
        comment: comment,
        images: photo
    }

    

    const jewelry_partial: ValuableRequest = {
        name: name,
        purchase_cost: Number(purchase_price.replace(/\s/g, '')),
        estimated_cost: Number(estimated_value.replace(/\s/g, '')),
        comment: comment
    }


    const jewelry_request = photo ? jewelry_full : jewelry_partial

    return jewelry_request
}