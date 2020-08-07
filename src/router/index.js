import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: "/login",
    },
    {
        path: "/login",
        name: "login",
        component: () => import("../views/Login.vue"),
        meta: {
            title: "登录",
        },
    },
    {
        path: "/home",
        name: "home",
        component: () => import("../views/Home.vue"),
        meta: {
            title: "首页",
        },
        children: [
            {
                path: "personal",
                name: "personal",
                component: () => import("../views/Personal.vue"),
                meta: {
                    title: "个人信息",
                },
            },
            {
                path: "write_article",
                name: "WriteArticle",
                component: () => import("../views/WriteArticle.vue"),
                meta: {
                    title: "写文章",
                },
            },
        ],
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});
router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    store.commit("changeLoadStatus", false);
    // const userInfo = sessionStorage.getItem('userInfo') || null
    // if (!userInfo && to.meta.auth) {
    //   next('/login')
    // } else {
    next();
    // }
});

export default router;
