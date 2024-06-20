import { createAsyncThunk } from "@reduxjs/toolkit"
import { FETCH_ASSETS } from "../../constants"
import { fetchAssetsData } from "../../../shared/http/assets"

export const fetchAssets = createAsyncThunk(
    FETCH_ASSETS,
    async(_, {rejectWithValue}) => {
        try {
            const response = await fetchAssetsData()
            const data = response.data
            console.log(data)
            return response
        } catch(error: unknown) {
            console.log(error)
            rejectWithValue(error)
        }
    }
)

export default fetchAssets
