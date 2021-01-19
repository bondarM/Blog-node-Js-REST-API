import Vue from 'vue'
import Router from 'vue-router'
import Blog from './components/Blog'
Vue.use(Router)

export default new Router({
    mode:"history",
    routes: [{
        path:'/',
        component:Blog
        },
        {
            path:'/post/:id',
            name:'postexpand',
            component: ()=> import('./components/Post.vue'),
            props: true
        }
    ]
})