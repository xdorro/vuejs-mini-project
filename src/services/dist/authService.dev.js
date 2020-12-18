"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authService = void 0;

var _rxjs = require("rxjs");

var _config = _interopRequireDefault(require("@/config"));

var _request = require("@/helpers/request");

var _response = require("@/helpers/response");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var currentUserSubject = new _rxjs.BehaviorSubject(JSON.parse(localStorage.getItem("currentUser")));
var authService = {
  login: login,
  logout: logout,
  currentUser: currentUser,
  isAuthenticated: isAuthenticated,
  isAuthorized: isAuthorized
};
exports.authService = authService;

function currentUser() {
  return currentUserSubject.value;
}

function isAuthenticated() {
  return this.currentUser() !== null;
}

function isAuthorized(role) {
  return this.isAuthenticated() && this.currentUser().roles.indexOf(role) >= 0;
}

function login(email, password) {
  return fetch("".concat(_config["default"].baseApi, "/auth/login"), _request.requestOptions.post({
    email: email,
    password: password
  })).then(_response.handleResponse).then(function (user) {
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem("currentUser", JSON.stringify(user.result));
    currentUserSubject.next(user);
    return user;
  });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("currentUser");
  currentUserSubject.next(null);
}