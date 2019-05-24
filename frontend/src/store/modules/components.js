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
        idGlobal: 1,
        // 存储预设的校验规则
        validates: [],
        // 存储不同的组件包含的配置项
        attrList: {},
        // 用于存储fileid:{id:cfg}键值对存储组件的自定义配置
        formConfig: { cfgList: {}, sortArray: [] },
        requireAttrs: {}
    },
    getters: {
        components: state => {
            let res = {
                default: {
                    text: '默认组件',
                    list: []
                },
                container: {
                    text: '容器组件',
                    list: []
                },
                basic: {
                    text: '基础组件',
                    list: []
                }
            };

            let attrList = {},
                requireAttrs = {};
            state.components.forEach(component => {
                if (component.isDefault) {
                    res.default.list.push(component);
                } else if (component.isContainer) {
                    res.container.list.push(component);
                } else {
                    res.basic.list.push(component);
                }
                requireAttrs[component.name] = [];
                attrList[component.name] = component.attrs;
                for (let key in component.attrs) {
                    let item = component.attrs[key];
                    if (item.required) {
                        requireAttrs[component.name].push(key);
                    }
                }
            });

            state.requireAttrs = requireAttrs;
            state.attrList = attrList;
            return res;
        }
    },
    mutations: {
        [types.SET_COMPONENTS](state, data) {
            state.components = data;
        },
        // 设置选中的组件
        [types.SET_SELECTED](state, data) {
            state.selected = data;
        },
        // 重置
        [types.RESET_CFG_LIST](state) {
            let data = {
                cfgList: {},
                sortArray: []
            };

            state.formConfig = data;
            state.selected = -1;
        },
        // 添加组件
        [types.ADD_CFG](state, data) {
            state.idGlobal++;
            data.attrs = {};
            let attrs = deepClone(state.attrList[data.name]);
            for (let key in attrs) {
                data.attrs[key] = attrs[key]['defaultValue'];
            }

            state.formConfig.cfgList[data.id] = data;
            Vue.set(state.formConfig.cfgList, data.id, data);
        },
        // 移除组件
        [types.REMOVE_CFG](state, id) {
            let cfgList = state.formConfig.cfgList,
                data = cfgList[id];

            // 同时删除所有内部的组件
            if (data.isContainer) {
                data.attr[data.showOption.formConfig].forEach(item => {
                    delete cfgList[item];
                });
            }
            delete cfgList[id];
        },
        [types.SET_VALIDATES](state, data) {
            state.validates = data;
        },
        // 更新组件配置属性
        [types.UPDATE_CFG_ATTR](state, option) {
            let id = option.id !== undefined ? option.id : state.selected,
                cfgList = state.formConfig.cfgList;

            cfgList[id]['attrs'][option.attr] = option.value;
        },
        // 设置排序后的组件
        [types.SET_SORT_LIST](state, data) {
            state.formConfig.sortArray = data;
        },
        // 设置选中的文件id
        [types.SET_FILE_ID](state, data) {
            state.fileId = data;
        },
        [types.SET_CUR_MODULE](state, data) {
            state.formConfig = data;
        },
        [types.RESET_DEFAULT_MODULE](state) {
            state.formConfig = { cfgList: {}, sortArray: [] }
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
        getModuleConfig({ commit }, data) {
            let cb = data.success;
            delete data.success;
            $http.getData("getModuleConfig", data).then(data => {
                if (data.cfgList) {
                    commit(types.SET_CUR_MODULE, data);
                } else {
                    commit(types.RESET_DEFAULT_MODULE);
                }
                cb && cb();
            });
        },
        updateModuleConfig({ state }, data) {
            data.config = state.formConfig;

            $http.getData("updateModuleConfig", data)
                .then((data) => {
                    Vue.myMess({
                        type: "success",
                        message: "保存成功!"
                    })
                });
        },
        generate({ state, rootState }, data) {
            data.groupId = rootState.currentGroup;
            data.config = state.formConfig;

            $http.setData('generate', data, 'post', 'blob');
        }
    }
}

// // 数据结构
// let data = {
//     selected: 1,
//     fileId: 2,
//     formConfig: {
//         fileId: {
//             cfgList: {
//                 id: cfg
//             },
//             sortArray: []
//         }
//     },
//     // 目录结构
//     directory: [{
//         id: '',
//         label: '',
//         children: []
//     }, {
//         id: '',
//         label: '',
//         modulepage_id: '' // 对应单个页面的配置文件
//     }]
// }