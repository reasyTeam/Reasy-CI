import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        frameWorks: [{
            value: 1,
            text: 'Vue'
        }, {
            value: 2,
            text: 'React'
        }, {
            value: 13,
            text: 'Jquery'
        }],
        currentFWork: 1,
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
        }
    },
    mutations: {
        setFWorks(state, frameWorks) {
            state.frameWorks = frameWorks;
        },
        setFWork(state, currentFWork) {
            state.currentFWork = currentFWork;
        },
        setTitle(state, title) {
            state.title = title;
        }
    },
    actions: {
        getFrameWorks() {
            // 发送请求获取框架列表
        }
    }
})