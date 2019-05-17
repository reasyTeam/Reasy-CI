import Vue from 'vue'
import Vuex from 'vuex'
import $http from '@/plugins/axios.js'
import * as types from './types'
import components from './modules/components.js'
import framework from './modules/framework.js'
// import projects from './modules/projects.js'
import modules from './modules/modules.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        framework,
        components,
        // projects,
        modules
    },
    state: {
        currentGroup: '',
        projectId: -1,
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
            }, {
                path: "/modules",
                text: "模板管理",
                icon: "menu"
            },
            {
                path: "/code/add",
                text: "代码生成器",
                icon: "setting"
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