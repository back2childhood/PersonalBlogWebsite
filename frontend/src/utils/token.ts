// package 3 methods for saving, getting and deleting token
// we can use them in other files to operate the token

// in the future, i'll update these functions to use useLocalStorage from 'ahooks' instead of localStorage directly

const TOKENKEY = 'token_key'

function setToken(token: string) {
    return localStorage.setItem(TOKENKEY, token)
}

function getToken() {
    return localStorage.getItem(TOKENKEY)
}

function removeToken() {
    return localStorage.removeItem(TOKENKEY)
}

export {
    setToken,
    getToken,
    removeToken
}