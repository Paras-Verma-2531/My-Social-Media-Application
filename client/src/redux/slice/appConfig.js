import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../Utils/axiosClient";
export const getMyProfile = createAsyncThunk(
  "user/getMyProfile",
  async (body, thunkAPI) => {
    try {
      //loading bar
      thunkAPI.dispatch(setLoading(true));
      const result= await axiosClient.get("/user/getMyProfile");
      return result.response;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);
const appConfigSlice = createSlice({
  name: "appConfigSlice",
  initialState: {
    isLoading: false,// for the loading bar
    myProfile:{}
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  },
  extraReducers:(builder)=>
  {
    builder.addCase(getMyProfile.fulfilled,(state,action)=>
    {
      state.myProfile=action.payload?.currUser;
    })
  }
});
export default appConfigSlice.reducer;
export const { setLoading } = appConfigSlice.actions;
