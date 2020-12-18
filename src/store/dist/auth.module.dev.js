"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = void 0;

var _authService = _interopRequireDefault(require("../services/authService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var user = JSON.parse(localStorage.getItem('user'));
var initialState = user ? {
  status: {
    loggedIn: true
  },
  user: user
} : {
  status: {
    loggedIn: false
  },
  user: null
};
var auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login: function login(_ref, user) {
      var commit = _ref.commit;
      return _authService["default"].login(user).then(function (user) {
        commit('loginSuccess', user);
        return Promise.resolve(user);
      }, function (error) {
        commit('loginFailure');
        return Promise.reject(error);
      });
    },
    logout: function logout(_ref2) {
      var commit = _ref2.commit;

      _authService["default"].logout();

      commit('logout');
    },
    register: function register(_ref3, user) {
      var commit = _ref3.commit;
      return _authService["default"].register(user).then(function (response) {
        commit('registerSuccess');
        return Promise.resolve(response.data);
      }, function (error) {
        commit('registerFailure');
        return Promise.reject(error);
      });
    }
  },
  mutations: {
    loginSuccess: function loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure: function loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout: function logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess: function registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure: function registerFailure(state) {
      state.status.loggedIn = false;
    }
  }
};
exports.auth = auth;