// 组件库操作
import Vue from 'vue'
import * as types from '../types'
import $http from '@/plugins/axios.js'
import { deepClone } from "@/assets/lib.js";

export default {
    namespaced: true,
    state: {
        projects: []
    },
    getters: {},
    mutations: {},
    actions: {
        getProjectList({ commit }) {
            $http.getData("getProjectList", querydata).then(data => {
                commit(types.SET_PROJECT_LIST, data);
            });
        },
        getProject({ commit }, querydata) {
            if (!querydata || querydata.id === '' || querydata.id === undefined) {
                return;
            }

            $http.getData("getProject", querydata).then(data => {
                commit(types.SET_PROJECT, data);
            });
        },
        addProject({}, data) {

        },
        editProject({}, data) {

        }
    }
}