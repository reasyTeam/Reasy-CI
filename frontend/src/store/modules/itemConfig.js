// 组件库操作
import Vue from 'vue'
import * as types from '../types'
import { deepClone } from "@/assets/lib.js";

export default {
    namespaced: true,
    state: {
        dialogVisible: false,
        cfgAttr: 'columns',
        cfgIndex: -1,
    },
    getters: {
        currentConfig(state, getters, rootState) {
            return rootState.components.cfgList[rootState.components.selected];
        },
        itemConfigs(state, getters) {
            if (state.cfgIndex === -1 || state.cfgAttr === '') {
                return {};
            }
            return getters.currentConfig.attrs[state.cfgAttr];
        },
        currentOption(state, getters, rootState) {
            return rootState.components.attrList[getters.currentConfig.name];
        },
        itemOption(state, getters) {
            return getters.currentOption.itemCfg;
        }
    },
    mutations: {
        [types.SET_DIALOG_VISIBLE](state, data) {
            state.dialogVisible = data;
        },
        [types.SET_CFG_ATTR](state, data) {
            state.cfgAttr = data;
        },
        [types.SET_ITEM_INDEX](state, data) {
            state.cfgIndex = data;
        }
    }
}