// 组件库操作
import * as types from '../types'
import $http from '@/plugins/axios.js'

export default {
    namespaced: true,
    state: {
        modules: [],
        template: ''
    },
    getters: {},
    mutations: {
        [types.SET_MODULES](state, modules) {
            state.modules = modules;
        },
        [types.SET_TEMPLATE](state, template) {
            state.template = template;
        },
        [types.RESET_TEMPLATE](state) {
            state.template = '';
        }
    },
    actions: {
        getModules({ commit }, data) {
            $http.getData("getModules", data).then(data => {
                commit(types.SET_MODULES, data);
            });
        },
        delModules({ dispatch, rootState }, data) {
            $http.setData("delModule", data).then(() => {
                dispatch('getModules', {
                    group_id: rootState.currentGroup
                });
            });
        },
        updateModules({ dispatch, rootState }, data) {
            $http.setData("updateModule", data).then(() => {
                dispatch('getModules', {
                    group_id: rootState.currentGroup
                });
            });
        },
        createModules({ dispatch, rootState }, data) {
            $http.setData("createModule", data).then(() => {
                dispatch('getModules', {
                    group_id: rootState.currentGroup
                });
            });
        },
        getTemplate({ commit }, data) {
            $http.getData("getModules", data).then(data => {
                commit(types.SET_TEMPLATE, data[0].template);
            });
        }
    }
}