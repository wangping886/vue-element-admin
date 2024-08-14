import { getHeaders } from '@/utils/auth'
import request from '@/utils/request'
export function getHost() {
    return 'https://restore.ai-age.cn'
}
export function wxlogin(data) {
    return request({
        url: getHost() + '/auth/wxmini',
        //url: 'vue-element-admin/user/wxlogin',//本地mock登录使用
        //https://localhost/#/login?code=admin
        method: 'post',
        headers: {
            'appId': 21
        },
        data
    })
}

export function restoreImg(data) {
    console.log('getHeaders', getHeaders())
    return request({
        url: getHost() + '/restore/balance',
        //url: 'vue-element-admin/user/wxlogin',//本地mock登录使用
        //https://localhost/#/login?code=admin
        method: 'post',
        headers: getHeaders(),
        timeout: 65000,
        data
    })
}

export function apiSetting(data) {
    let headers = getHeaders()
    headers['GoodsType'] = data
    console.log('Headers', headers)
    return request({
        url: getHost() + '/restore/settings',
        //url: 'vue-element-admin/user/wxlogin',//本地mock登录使用
        //https://localhost/#/login?code=admin
        method: 'get',
        headers: headers,
        timeout: 9000,
    })
}


export function payGoods(data) {
    console.log('getHeaders', getHeaders())
    let headers = getHeaders()
    headers['AppId'] = 22
    console.log('headers', headers, 'data', data)
    return request({
        url: getHost() + '/order/prepay',
        method: 'post',
        headers: headers,
        timeout: 9000,
        data
    })
}

export function getUserInfo(token) {
    console.log('getHeaders', getHeaders())
    return request({
        url: getHost() + '/member/info',
        //url: 'vue-element-admin/user/wxlogin',//本地mock登录使用
        //https://localhost/#/login?code=admin
        method: 'get',
        headers: getHeaders(),
        timeout: 9000,
    })
}

export function login(data) {
    return request({
        url: '/vue-element-admin/user/login',
        method: 'post',
        data
    })
}

export function getInfo(token) {
    return request({
        url: '/vue-element-admin/user/info',
        method: 'get',
        params: { token }
    })
}


export function logout() {
    return request({
        url: '/vue-element-admin/user/logout',
        method: 'post'
    })
}