// manage user-related states
import { createSlice } from "@reduxjs/toolkit";
import { getToken, request, setToken as _setToken } from "@/utils";

const userStore = createSlice({
    name: "user",
    // initial state
    initialState: {
        // if localstorage haven't saved the token, then initiate it as a null string
        token: getToken() || ''
    },
    // update data
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            // save token into localStorage
            _setToken(action.payload)
        },
        setUserInfo(state, action) {
            state.UserInfo = action.payload
        }
    }
})

// Destructure the actionCreater
const { setToken, setUserInfo } = userStore.actions

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

// asynchronous get user info 
const fetchUserInfo = () => {
    return async (dispatch) => {
        // we have set token in request header (in request.js), so the server can tell which user is asking
        //     const res = await request.get('/user/profile')
        //     dispatch(setUserInfo(res.data))
    }
}

export { setToken, fetchLogin, fetchUserInfo }

export default userReducer