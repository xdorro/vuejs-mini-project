import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import { authService } from "../services/authService";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/Login.vue"),
    },
    {
        path: "/dashboard",
        name: "dashboard",
        meta: { authorize: ["ROLE_ADMIN"] },
        component: () => import("@/views/dashboard/Admin.vue"),
    },
    {
        path: "/dashboard/user",
        name: "dashboard.user",
        meta: { authorize: ["ROLE_ADMIN"] },
        component: () => import("@/views/dashboard/user/index.vue"),
    },
    // otherwise redirect to home
    { path: "*", redirect: "/" },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const { authorize } = to.meta;
    const currentUser = authService.currentUser();

    if (authorize) {
        if (!authService.isAuthenticated()) {
            // not logged in so redirect to login page with the return url
            return next({ path: "/login", query: { returnUrl: to.path } });
        }

        // check if route is restricted by role
        if (
            authorize.length &&
            !authorize.every(function(val) {
                return currentUser.roles.indexOf(val) !== -1;
            })
        ) {
            // role not authorised so redirect to home page
            return next({ path: "/" });
        }
    }

    next();
});

export default router;
