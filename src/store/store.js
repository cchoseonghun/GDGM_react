import { configureStore } from "@reduxjs/toolkit";
import user from './userSlice'
import nav from './navSlice'
import raid from './raidSlice'
import modal from './modalSlice'

export default configureStore({
    reducer: {
        user: user.reducer, 
        nav: nav.reducer, 
        raid: raid.reducer, 
        modal: modal.reducer, 
    }
})