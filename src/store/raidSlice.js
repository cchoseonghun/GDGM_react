import { configureStore, createSlice } from "@reduxjs/toolkit";

let raid = createSlice({
    name: 'raid', 
    initialState: {
        _id: '', 
        title: '' 
    }, 
    reducers: {
        setRaid(state, action){
            state._id = action.payload._id;
            state.title = action.payload.title;
        }
    }
})
export let { setRaid } = raid.actions

export default raid