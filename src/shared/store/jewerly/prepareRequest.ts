import { ValuableRequest } from "../../../app/types/request/requestTypes"

export const prepareJewerlyRequest = (
    name: string,
    purchase_price: string,
    estimated_value: string,
    comment: string,
    photo: string,
) => {
    const jewerly_full: ValuableRequest = {
        name: name,
        purchase_cost: Number(purchase_price.replace(/\s/g, '')),
        estimated_cost: Number(estimated_value.replace(/\s/g, '')),
        comment: comment,
        images: photo
    }

    

    const jewerly_partial: ValuableRequest = {
        name: name,
        purchase_cost: Number(purchase_price.replace(/\s/g, '')),
        estimated_cost: Number(estimated_value.replace(/\s/g, '')),
        comment: comment
    }

    console.log(jewerly_partial)

    const jewerlt_request = photo ? jewerly_full : jewerly_partial

    return jewerlt_request
}