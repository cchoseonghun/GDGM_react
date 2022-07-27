import { configureStore, createSlice } from "@reduxjs/toolkit";

let raid = createSlice({
    name: 'raid', 
    initialState: {
        members: {}, 
    }, 
    reducers: {
        setRaidMember(state, action){
            state.members = action.payload;
        }
    }
})
export let { setRaidMember } = raid.actions

export default raid