"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Home = _interopRequireDefault(require("../views/Home.vue"));

var _authService = require("../services/authService");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_vue["default"].use(_vueRouter["default"]);

var routes = [{
  path: "/",
  name: "home",
  component: _Home["default"]
}, {
  path: "/login",
  name: "login",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/views/Login.vue"));
    });
  }
}, {
  path: "/dashboard",
  name: "dashboard",
  meta: {
    authorize: ["ROLE_ADMIN"]
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/views/dashboard/Admin.vue"));
    });
  }
}, {
  path: "/dashboard/user",
  name: "dashboard.user",
  meta: {
    authorize: ["ROLE_ADMIN"]
  },
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/views/dashboard/user/index.vue"));
    });
  }
}, // otherwise redirect to home
{
  path: "*",
  redirect: "/"
}];
var router = new _vueRouter["default"]({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes
});
router.beforeEach(function (to, from, next) {
  // redirect to login page if not logged in and trying to access a restricted page
  var authorize = to.meta.authorize;

  var currentUser = _authService.authService.currentUser();

  if (authorize) {
    if (!_authService.authService.isAuthenticated()) {
      // not logged in so redirect to login page with the return url
      return next({
        path: "/login",
        query: {
          returnUrl: to.path
        }
      });
    } // check if route is restricted by role


    if (authorize.length && !authorize.every(function (val) {
      return currentUser.roles.indexOf(val) !== -1;
    })) {
      // role not authorised so redirect to home page
      return next({
        path: "/"
      });
    }
  }

  next();
});
var _default = router;
exports["default"] = _default;