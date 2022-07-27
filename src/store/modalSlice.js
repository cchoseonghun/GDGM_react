import { configureStore, createSlice } from "@reduxjs/toolkit";

let modal = createSlice({
    name: 'modal', 
    initialState: {
        modalName: '', 
        show: false, 
        raid_id: '', 
    }, 
    reducers: {
        setModalName(state, action){
            state.modalName = action.payload;
        }, 
        setShow(state, action){
            state.show = action.payload;
        }, 
        setRaid_id(state, action){
            state.raid_id = action.payload;
        }, 
    }
})
export let { setModalName, setShow, setRaid_id } = modal.actions

export default modal