// manage user-related states
import { createSlice } from "@reduxjs/toolkit";
import { getToken, request, setToken as _setToken } from "@/utils";

const userStore = createSlice({
    name: "user",
    // initial state
    initialState: {
        // if localstorage haven't saved the token, then initiate it as a null string
        token: getToken() || '',
        UserInfo: {}
    },
    // update data
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            // save token into localStorage
            _setToken(action.payload)
            console.log("token: " + action.payload)
        },
        setUserInfo(state, action) {
            state.UserInfo = action.payload
            console.log(action.payload.username)
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
        dispatch(setToken(res.token))
    }
}

// asynchronous get user info 
const fetchUserInfo = () => {
    return async (dispatch) => {
        // we have set token in request header (in request.js), so the server can tell which user is asking
        const res = await request.get('/profile')
        // if(res.)
        dispatch(setUserInfo(res.data))
    }
}

export { fetchLogin, fetchUserInfo, setToken }

export default userReducer