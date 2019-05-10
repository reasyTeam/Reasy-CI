// 组件库操作
import * as types from '../types'
import $http from '@/plugins/axios.js'

export default {
    namespaced: true,
    state: {
        modules: []
    },
    getters: {},
    mutations: {
        [types.SET_MODULES](state, modules) {
            state.modules = modules;
        },
    },
    actions: {
        getModules({ commit }) {
            $http.getData("getModules").then(data => {
                commit(types.SET_MODULES, data);
            });
        },
        delModules({ dispatch }, data) {
            $http.setData("delModule", data).then(() => {
                dispatch('getModules');
            });
        },
        updateModules({ dispatch }, data) {
            $http.setData("updateModule", data).then(() => {
                dispatch('getModules');
            });
        },
        createModules({ dispatch }, data) {
            $http.setData("createModule", data).then(() => {
                dispatch('getModules');
            });
        }
    }
}