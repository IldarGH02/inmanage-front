import { createSlice } from "@reduxjs/toolkit"
import { FETCH_ASSETS } from "../constants"
import { IAssets } from "../../app/types/assets/IAssets"
import fetchAssets from "../actions/assets/assetsActions"

interface IInitialStateAssets {
    data: IAssets[] | undefined | any
    isLoading: boolean
    error: unknown
}

const initialState: IInitialStateAssets = {
    data: [],
    isLoading: false,
    error: ''
}

const assetsSlice = createSlice({
    name: FETCH_ASSETS,
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
             .addCase(fetchAssets.pending, (state) => {
                state.isLoading = true;
             })
             .addCase(fetchAssets.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
             })
             .addCase(fetchAssets.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
             })
             
     }
  })
  
  export default assetsSlice.reducer