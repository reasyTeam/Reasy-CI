import Vue from 'vue'
import Vuex from 'vuex'
import $http from '@/plugins/axios.js'
import * as types from './types'
import components from './modules/components.js'
import framework from './modules/framework.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        framework,
        components
    },
    state: {
        currentGroup: '',
        groups: [],
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
        groupNames: state => {
            return state.groups.map((item) => {
                return {
                    value: item.id,
                    name: item.name
                }
            });
        }
    },
    mutations: {
        [types.SET_CUR_GROUP](state, currentGroup) {
            state.currentGroup = currentGroup;
        },
        [types.SET_GROUPS](state, data) {
            state.groups = data;
        },
        [types.SET_TITLE](state, title) {
            state.title = title;
        }
    },
    actions: {
        getGroups({ commit, state }) {
            $http.getData("getGroups").then(data => {
                commit(types.SET_GROUPS, data);

                if (state.currentGroup === '' || !data.some(item => item.id === state.currentGroup)) {
                    commit(types.SET_CUR_GROUP, data.length > 0 ? data[0]['id'] : '');
                }
            });
        },
        delGroups({ dispatch }, data) {
            $http.setData("delGroups", data).then(() => {
                dispatch('getGroups');
            });
        },
        updateGroups({ dispatch }, data) {
            $http.setData("updateGroups", data).then(() => {
                dispatch('getGroups');
            });
        },
        createGroups({ dispatch }, data) {
            $http.setData("createGroups", data).then(() => {
                dispatch('getGroups');
            });
        }
    }
})