import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../reducers/reducer'


export const store = configureStore({
    reducer:{
        auth: authReducer
    }
})