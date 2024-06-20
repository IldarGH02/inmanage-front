import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { IAssets } from "../../../app/types/assets/IAssets"

const API_URL = process.env.REACT_APP_PUBLIC_URL

export const fetchAssetsData = (): Promise<AxiosResponse<IAssets>> => {
    const options: AxiosRequestConfig = {
        method: "GET",
        baseURL: `${API_URL}/actives/`,
        headers: {
            "Content-Type":"application/json"
        }
    }
    return axios.request(options)
}