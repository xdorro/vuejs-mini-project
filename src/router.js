import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes: [
    { path: '*', name: 'redirect', redirect: '/' },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/login',
      component: () => import('@/views/Auth/Login.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/Auth/Profile.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/Dashboard/Dashboard.vue')
    },
    {
      path: '/dashboard/users',
      name: 'dashboard.user',
      component: () => import('@/views/Dashboard/User.vue')
    },
    {
      path: '/dashboard/questions',
      name: 'dashboard.question',
      component: () => import('@/views/Dashboard/Question.vue')
    },
    {
      path: '/dashboard/tests',
      name: 'dashboard.tests',
      component: () => import('@/views/Dashboard/Test.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) next('/login');
  else next();
});
