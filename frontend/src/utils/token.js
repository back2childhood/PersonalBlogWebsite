// package 3 methods for saving, getting and deleting token
// we can use them in other files to operate the token

const TOKENKEY = 'token_key'

function setToken(token) {
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