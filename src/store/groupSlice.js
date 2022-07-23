import { configureStore, createSlice } from "@reduxjs/toolkit";

let group = createSlice({
    name: 'group', 
    initialState: {
        _id: '', 
        name: '' 
    }, 
    reducers: {
        setGroup(state, action){
            state._id = action.payload._id;
            state.name = action.payload.name;
        }
    }
})
export let { setGroup } = group.actions

export default group