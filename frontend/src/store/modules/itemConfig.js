// 组件库操作
import Vue from 'vue'
import * as types from '../types'

export default {
    namespaced: true,
    state: {
        dialogVisible: false,
        itemConfig: {}
    },
    getters: {
        currentCfg(state, getters, rootState) {
            return rootState.components.cfgList[rootState.components.selected];
        },
        currentOption(state, getters, rootState) {
            return rootState.components.attrList[getters.currentCfg.name];
        },
        itemOption(state, getters) {
            return this.getters.currentOption.itemCfg;
        }
    },
    mutations: {
        [types.SET_DIALOG_VISIBLE](state, data) {
            state.dialogVisible = data;
        },
        [types.SET_ITEM_CONFIG](state, data) {
            state.itemConfig[data.attr] = data.value;
        }
    }
}