import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
    name: 'user', 
    initialState: { isLogined: 0 }, 
    reducers: {
        setUser(state, action){
            state.isLogined = parseInt(action.payload);
        }, 
    }
})
export let { setUser } = user.actions

export default user