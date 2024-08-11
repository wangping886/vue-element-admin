import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

export function getHeaders() {
    let header = {
        'AppId': 21,
        'MemberId': getToken() !== undefined ? getToken() : ''
    }
    return header
}