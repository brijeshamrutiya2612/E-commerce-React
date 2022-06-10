import {createSlice,createAsyncThunk}  from '@reduxjs/toolkit'
import axios from 'axios';

export const baseURL = "http://localhost:3333/user";


const initialState = {
    loginUser : []
}

export const login = createAsyncThunk("user/login", async(user)=>{
    try{
        const response = await axios.get(baseURL, user);
        return response.data
    }catch(error){
        console.log(error)
    }
})

const loginSlice = createSlice({
    name: "loginUser",
    initialState,
    reducers:{},
    extraReducers:{
        [login.pending]: (state, action)=>
        {
            return{
                ...state
            }
        },
        [login.fulfilled]: (state, action)=>
        {
            return{
                ...state,
                loginUser: action.payload
            }
        },
        [login.rejected]: (state, action)=>
        {
            
            return{
                ...state
            }
        },
    },
});

export default (loginSlice).reducer

