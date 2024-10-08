import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent

        if (store.getters.token) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers['X-Token'] = getToken()
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data

        // if the custom code is not 20000, it is judged as an error.
        if (!((res.code == 20000) || (res.code == 0))) {
            Message({
                message: res.message || res.error || 'Error',
                type: 'error',
                duration: 5 * 1000
            })

            // if (res.code === 50004) {
            //     MessageBox.confirm(res.error, {
            //         confirmButtonText: '点击去获取',
            //         showCancelButton: false,
            //         type: 'warning'
            //     }).then(() => {
            //         // store.dispatch('user/resetToken').then(() => {
            //         //     location.reload()
            //         // })
            //         location.reload()
            //     })
            // }
            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                // to re-login
                // MessageBox.confirm('登录即可使用', {
                //     confirmButtonText: '去登录',
                //     cancelButtonText: '取消',
                //     type: 'warning'
                // }).then(() => {
                setTimeout(function() {
                    store.dispatch('user/resetToken').then(() => {
                        location.href = '/#/login'
                    })
                }, 1500);

                // })


            }
            return res
        } else {

            return res
        }
    },
    error => {
        console.log('err expection ' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service