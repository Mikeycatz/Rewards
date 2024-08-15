import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.userInfo)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; //1day
      // const expirationTime = new Date().getTime() + 60 * 1000; //1 min test
      localStorage.setItem("expirationTime", expirationTime);
    },
    // setUser: (state, action) => {
    //   state.userInfo = action.payload;
    // },
    updatePoints: (state, action) => {
      state.userInfo = { ...state.userInfo, points: action.payload };
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, updatePoints, setUser, logout } =
  authSlice.actions;
export default authSlice.reducer;
