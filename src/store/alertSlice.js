import { configureStore, createSlice } from "@reduxjs/toolkit";

let alert = createSlice({
    name: 'alert', 
    initialState: {
        switch: false, 
        variant: 'primary', 
        message: '', 
    }, 
    reducers: {
        setAlert(state, action){
            state.switch = action.payload.switch;
            state.variant = action.payload.variant;
            state.message = action.payload.message;
        }
    }
})
export let { setAlert } = alert.actions
export default alert