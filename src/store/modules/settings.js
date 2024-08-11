import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'
import { apiSetting } from '@/api/user'

const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

const state = {
    theme: variables.theme,
    showSettings: showSettings,
    tagsView: tagsView,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo,
    apiSetting: {},
}

const mutations = {
    CHANGE_SETTING: (state, { key, value }) => {
        // eslint-disable-next-line no-prototype-builtins
        if (state.hasOwnProperty(key)) {
            state[key] = value
        }
    }
}

const actions = {
    changeSetting({ commit }, data) {
        commit('CHANGE_SETTING', data)
    },
    apiSetting({ commit }, data) {
        return new Promise((resolve, reject) => {
            console.log('apiSetting', data)
            apiSetting(data).then(response => {
                const { data } = response
                console.log('setting res', response, 'data', data)
                let res_data = { key: 'apiSetting', value: data }
                commit('CHANGE_SETTING', res_data)
                resolve()
            }).catch(error => {
                console.log('apiSetting err', error)
                reject(error)
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}