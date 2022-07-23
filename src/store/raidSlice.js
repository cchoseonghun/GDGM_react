import { configureStore, createSlice } from "@reduxjs/toolkit";

let raid = createSlice({
    name: 'raid', 
    initialState: {
        _id: '', 
        name: '' 
    }, 
    reducers: {
        setRaid(state, action){
            state._id = action.payload._id;
            state.name = action.payload.name;
        }
    }
})
export let { setRaid } = raid.actions

export default raid