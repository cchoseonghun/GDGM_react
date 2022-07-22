import { configureStore, createSlice } from "@reduxjs/toolkit";

let nav = createSlice({
    name: 'nav', 
    initialState: { type: 'default' }, 
    reducers: {
        setType(state, action){
            state.type = action.payload;
        }, 
    }
})
export let { setType } = nav.actions

export default nav