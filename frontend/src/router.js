import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Readme.vue'

Vue.use(Router)

let router = new Router({
    routes: [{
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/components',
            name: 'components',
            component: () => import( /* webpackChunkName: "components" */ './views/ComponentSet.vue')
        }, {
            path: '/code/:id',
            name: 'code',
            component: () => import( /* webpackChunkName: "code" */ './views/CodeGenerator.vue')
            // beforeEnter: (to, from, next) => {
            //     if (from.name === to.name && to.name === 'code' && to.params.id === "add") {
            //         next(false);
            //     } else {
            //         next();
            //     }
            // }
        }, {
            path: '/modules',
            name: 'modules',
            component: () => import( /* webpackChunkName: "modules" */ './views/Modules.vue')
        }, {
            path: '/others',
            name: 'others',
            component: () => import( /* webpackChunkName: "others" */ './views/Others.vue')
        }
    ]
});

export default router;