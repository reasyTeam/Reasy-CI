// 组件库操作
import * as types from '../types'
import $http from '@/plugins/axios.js'

export default {
    namespaced: true,
    state: {
        frameWorks: []
    },
    getters: {
        frames: state => {
            return state.frameWorks.map((item) => {
                return {
                    value: item.id,
                    name: item.name
                }
            });
        }
    },
    mutations: {
        [types.SET_FRAMEWORKS](state, frameWorks) {
            state.frameWorks = frameWorks;
        },
    },
    actions: {
        getFrameWorks({ commit }) {
            $http.getData("getDependences").then(data => {
                commit(types.SET_FRAMEWORKS, data);
            });
        },
        delFrameWorks({ dispatch }, data) {
            $http.setData("delDependences", data).then(() => {
                dispatch('getFrameWorks');
            });
        },
        updateFrameWorks({ dispatch }, data) {
            $http.setData("updateDependences", data).then(() => {
                dispatch('getFrameWorks');
            });
        },
        createFrameWorks({ dispatch }, data) {
            $http.setData("createDependences", data).then(() => {
                dispatch('getFrameWorks');
            });
        }
    }
}