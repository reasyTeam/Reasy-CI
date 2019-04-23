// 组件库操作
import * as types from '../types'
import $http from '@/plugins/axios.js'

export default {
    namespaced: true,
    state: {
        components: []
    },
    getters: {},
    mutations: {
        [types.SET_COMPONENTS](state, data) {
            state.components = data;
        }
    },
    actions: {
        getComponents({ commit }, querydata) {
            $http.getData("getComponents", querydata).then(data => {
                commit(types.SET_COMPONENTS, data);
            });
        },
        delComponents({ dispatch }, data) {
            $http.setData("delComponents", data).then(() => {
                dispatch('getComponents');
            });
        },
        updateComponents({ dispatch }, data) {
            $http.setData("updateComponents", data).then(() => {
                dispatch('getComponents');
            });
        },
        createComponents({ dispatch }, data) {
            $http.setData("createComponents", data).then(() => {
                dispatch('getComponents');
            });
        }
    }
}