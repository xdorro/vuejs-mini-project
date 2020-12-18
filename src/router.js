import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/login',
      component: () => import('./views/Auth/Login.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./views/Auth/Profile.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('./views/Dashboard/Dashboard.vue')
    },
    {
      path: '/dashboard/user',
      name: 'dashboard.user',
      component: () => import('./views/Dashboard/User.vue')
    },
    {
      path: '/dashboard/question',
      name: 'dashboard.question',
      component: () => import('./views/Dashboard/Question.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});
