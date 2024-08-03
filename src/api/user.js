import request from '@/utils/request'

export function wxlogin(data) {
    return request({
        url: 'https://restore.ai-age.cn/auth/wxmini',
        //url: 'vue-element-admin/user/wxlogin',//本地mock登录使用
        //https://localhost/#/login?code=admin
        method: 'post',
        headers: {
            'appId': 21
        },
        data
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