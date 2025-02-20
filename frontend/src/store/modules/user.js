// manage user-related states
import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils";

const userStore = createSlice({
    name: "user",
    // initial state
    initialState: {
        token: ''
    },
    // update data
    reducers: {
        setToken(state, action) {
            state.token = action.payload
        }
    }
})

// Destructure the actionCreater
const { setToken } = userStore.actions

// get reducer method
const userReducer = userStore.reducer

// asynchronous login 
const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        // send asynchronous request
        const res = await request.post('login', loginForm)
        console.log(res);
        // submit synchronous action to save token
        dispatch(setToken(res.data.token))
    }
}

export { setToken, fetchLogin }

export default userReducer