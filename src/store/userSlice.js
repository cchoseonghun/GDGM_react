import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
    name: 'user', 
    initialState: {
        _id: '', 
        id: '', 
    }, 
    reducers: {
        setLogin(state, action){
            let data = action.payload;
            state._id = data._id;
            state.id = data.id;
        }, 
    }
})
export let { setLogin } = user.actions

export default user