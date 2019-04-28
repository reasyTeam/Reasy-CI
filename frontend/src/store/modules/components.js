// 组件库操作
import * as types from '../types'
import $http from '@/plugins/axios.js'

export default {
    namespaced: true,
    state: {
        components: [],
        selected: -1,
        validates: [],
        attrList: {},
        // 用于存储id:cfg键值对
        cfgList: {},
        cfgSortList: []
    },
    getters: {
        components: state => {
            let res = {
                container: {
                    text: '容器组件',
                    list: []
                },
                basic: {
                    text: '基础组件',
                    list: []
                }
            };

            let attrList = {};
            state.components.forEach(component => {
                if (component.isContainer) {
                    res.container.list.push(component);
                } else {
                    res.basic.list.push(component);
                }
                attrList[component.name] = component.attrs;
            });

            state.attrList = attrList;
            return res;
        }
    },
    mutations: {
        [types.SET_COMPONENTS](state, data) {
            state.components = data;
        },
        [types.SET_ACTIVE_KEY](state, data) {
            state.selected = data;
        }
    },
    actions: {
        getComponents({ commit }, querydata) {
            if (!querydata || querydata.id === '' || querydata.id === undefined) {
                return;
            }

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