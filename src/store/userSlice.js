import { createSlice } from "@reduxjs/toolkit";
const initialState={
   user:{},
}
const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user=action.payload;
            console.log(state);
        },
        clearUser:()=>{
            return initialState;
        }
    }
})
export const {setUser,clearUser} = userSlice.actions;
export default userSlice.reducer;
