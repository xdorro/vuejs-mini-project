"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_vue["default"].use(_vueRouter["default"]);

var router = new _vueRouter["default"]({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes: [{
    path: '/',
    name: 'home',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./views/Home.vue'));
      });
    }
  }, {
    path: '/login',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./views/Auth/Login.vue'));
      });
    }
  }, {
    path: '/profile',
    name: 'profile',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./views/Auth/Profile.vue'));
      });
    }
  }, {
    path: '/dashboard',
    name: 'dashboard',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./views/Dashboard/Dashboard.vue'));
      });
    }
  }, {
    path: '/dashboard/user',
    name: 'dashboard.user',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./views/Dashboard/User.vue'));
      });
    }
  }, {
    path: '/dashboard/question',
    name: 'dashboard.question',
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require('./views/Dashboard/Question.vue'));
      });
    }
  }]
});
exports.router = router;
router.beforeEach(function (to, from, next) {
  var publicPages = ['/login', '/'];
  var authRequired = !publicPages.includes(to.path);
  var loggedIn = localStorage.getItem('user'); // trying to access a restricted page + not logged in
  // redirect to login page

  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});