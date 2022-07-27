import { configureStore, createSlice } from "@reduxjs/toolkit";

let raid = createSlice({
    name: 'raid', 
    initialState: {
        data: {}
    }, 
    reducers: {
        setRaid(state, action){
            state.data = action.payload;
        }
    }
})
export let { setRaid } = raid.actions

export default raid