import Vue from 'vue'
import Vuex from 'vuex'
import $http from '@/plugins/axios.js'
import * as types from './types'
import group from './modules/group'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        group
    },
    state: {
        frameWorks: [],
        currentFWork: '',
        pathList: [{
                path: "/",
                text: "README",
                icon: "document"
            },
            {
                path: "/components",
                text: "组件管理",
                icon: "printer"
            },
            {
                path: "/code",
                text: "代码生成",
                icon: "setting"
            },
            {
                path: "/modules",
                text: "模板管理",
                icon: "menu"
            },
            {
                path: "/others",
                text: "其它功能",
                icon: "more"
            }
        ]
    },
    getters: {
        // path和title的键值对
        pathToTitle: state => {
            return state.pathList.reduce((val, item) => {
                val[item.path] = item.text;
                return val;
            }, {});
        },
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
        [types.SET_CUR_FRAMEWORK](state, currentFWork) {
            state.currentFWork = currentFWork;
        },
        [types.SET_TITLE](state, title) {
            state.title = title;
        }
    },
    actions: {
        getFrameWorks({ commit }) {
            $http.getData("getDependences").then(data => {
                commit(types.SET_FRAMEWORKS, data);
                commit(types.SET_CUR_FRAMEWORK, data.length > 0 ? data[0]['id'] : '');
            });
        },
        delFrameWorks({ dispatch }, data) {
            $http.setData("delDependences", data).then(data => {
                dispatch('getFrameWorks');
            });
        },
        updateFrameWorks({ dispatch }, data) {
            $http.setData("updateDependences", data).then(data => {
                dispatch('getFrameWorks');
            });
        },
        createFrameWorks({ dispatch }, data) {
            $http.setData("createDependences", data).then(data => {
                dispatch('getFrameWorks');
            });
        }
    }
})