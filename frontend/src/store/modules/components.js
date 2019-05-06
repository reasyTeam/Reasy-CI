// 组件库操作
import Vue from 'vue'
import * as types from '../types'
import $http from '@/plugins/axios.js'
import itemConfig from './itemConfig.js';
import { deepClone } from "@/assets/lib.js";

export default {
    namespaced: true,
    modules: {
        itemConfig
    },
    state: {
        // 提供的组件列表
        components: [],
        // 当前处于active状态的组件
        selected: -1,
        idGlobal: 0,
        // 存储预设的校验规则
        validates: [],
        // 存储不同的组件包含的配置项
        attrList: {},
        // 用于存储id:cfg键值对存储组件的自定义配置
        cfgList: {},
        // 暂时没有用到，不知道以后会不会用到
        cfgSortList: [],
        // 记录是否点击重制按钮，重置时需要同时将formList清空，在configList.vue中定义，用来存储已排序的组件
        hasReset: false
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
        [types.SET_SELECTED](state, data) {
            state.selected = data;
        },
        [types.RESET_CFG_LIST](state) {
            state.cfgList = {};
            state.hasReset = true;
            state.selected = -1;
        },
        [types.ADD_CFG](state, data) {
            state.idGlobal++;
            data.attrs = {};
            let attrs = deepClone(state.attrList[data.name]);
            for (let key in attrs) {
                data.attrs[key] = attrs[key]['defaultValue'];
            }

            state.cfgList[data.id] = data;
            Vue.set(state.cfgList, data.id, data);
        },
        [types.REMOVE_CFG](state, id) {
            delete state.cfgList[id];
        },
        [types.SET_VALIDATES](state, data) {
            state.validates = data;
        },
        [types.UPDATE_CFG_ATTR](state, option) {
            state.cfgList[state.selected]['attrs'][option.attr] = option.value;
            // if (typeof option.value === 'object') {
            //     Vue.set(state.cfgList[state.selected]['attrs'], option.attr, option.value);
            // }
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
        },
        getValidates({ commit }, querydata) {
            if (!querydata || querydata.id === '' || querydata.id === undefined) {
                return;
            }

            $http.getData("getValidates", querydata).then(data => {
                commit(types.SET_VALIDATES, data);
            });
        },
    }
}