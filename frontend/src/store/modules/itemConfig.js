// 组件库操作
import Vue from 'vue'
import * as types from '../types'

export default {
    namespaced: true,
    state: {
        dialogVisible: false,
        cfgAttr: 'columns',
        cfgIndex: -1,
    },
    getters: {
        currentConfig(state, getters, rootState, rootGetter) {
            let comState = rootState.components;
            if (comState.selected === -1) {
                return {};
            }
            return rootState['components'].formConfig.cfgList[comState.selected] || {};
        },
        itemConfigs(state, getters) {
            if (state.cfgIndex === -1 || state.cfgAttr === '') {
                return [];
            }
            return getters.currentConfig.attrs[state.cfgAttr] || [];
        },
        itemOption(state, getters, rootState) {
            if (!getters.currentConfig.name) {
                return {};
            }
            let cur = rootState.components.attrList[getters.currentConfig.name],
                data = cur[state.cfgAttr] ? cur[state.cfgAttr].itemCfg : {}
            return data;
        }
    },
    mutations: {
        [types.SET_DIALOG_VISIBLE](state, data) {
            state.dialogVisible = data;
            if (data === false) {
                state.cfgIndex = -1;
            }
        },
        [types.SET_CFG_ATTR](state, data) {
            state.cfgAttr = data;
        },
        [types.SET_ITEM_INDEX](state, data) {
            state.cfgIndex = data;
        }
    }
}