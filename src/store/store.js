import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import user from './userSlice'
import raid from './raidSlice'
import modal from './modalSlice'
import group from './groupSlice'
import alert from './alertSlice'

// export default configureStore({
//     reducer: {
//         user: user.reducer, 
//         nav: nav.reducer, 
//         raid: raid.reducer, 
//         modal: modal.reducer, 
//         group: group.reducer, 
//     }
// })

const reducers = combineReducers({
    user: user.reducer, 
    raid: raid.reducer, 
    modal: modal.reducer, 
    group: group.reducer, 
    alert: alert.reducer, 
});

const persistConfig = {
    key: 'root', 
    storage: storage, 
    blacklist: [ 
        'alert', 
        'modal'
        // 'raid', 
    ], //유지시키지 않을 리스트
    // whitelist: [ 'group' ], 
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer, 
    // devTools: 
    middleware: [thunk], 
});

export default store;