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
        modules
    },
    state: {
        currentGroup: -1,
        groupTemplate: '',
        dependence: -1,
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
            state.groups.some(item => {
                if (item.id === currentGroup) {
                    state.dependence = item.fileType;
                    state.groupTemplate = item.template;
                    return true;
                }
            });
        },
        [types.SET_DEPENDENCE](state, dependence) {
            state.dependence = dependence;
        },
        [types.SET_GROUPS](state, data) {
            state.groups = data;
        },
        [types.SET_TITLE](state, title) {
            state.title = title;
        },
        [types.SET_TEMPLATE](state, template) {
            state.groupTemplate = template;
        }
    },
    actions: {
        getGroups({ commit, state }) {
            $http.getData("getGroups").then(data => {
                commit(types.SET_GROUPS, data);

                if (state.currentGroup === -1 || !data.some(item => item.id === state.currentGroup)) {
                    commit(types.SET_CUR_GROUP, data.length > 0 ? data[0]['id'] : '');
                } else {
                    commit(types.SET_DEPENDENCE, data.length > 0 ? data[0]['fileType'] : '');
                }
            });
        },
        getModuleTemplate({ commit }, data) {
            $http.getData("getGroups", data).then(data => {
                commit(types.SET_TEMPLATE, data[0].template);
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