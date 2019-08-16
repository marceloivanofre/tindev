import Vue from 'vue';
import Router from 'vue-router';

import Login from './pages/Login.vue';
import Main from './pages/Main.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login
        },

        {
            path: '/dev/:id',
            name: 'main',
            component: Main
        },
    ]
});