"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestOptions = void 0;

var _authService = require("../services/authService");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var requestOptions = {
  get: function get() {
    return _objectSpread({
      method: "GET"
    }, headers());
  },
  post: function post(body) {
    return _objectSpread({
      method: "POST"
    }, headers(), {
      body: JSON.stringify(body)
    });
  },
  patch: function patch(body) {
    return _objectSpread({
      method: "PATCH"
    }, headers(), {
      body: JSON.stringify(body)
    });
  },
  put: function put(body) {
    return _objectSpread({
      method: "PUT"
    }, headers(), {
      body: JSON.stringify(body)
    });
  },
  "delete": function _delete() {
    return _objectSpread({
      method: "DELETE"
    }, headers());
  }
};
exports.requestOptions = requestOptions;

function headers() {
  var currentUser = _authService.authService.currentUserValue || {};
  var authHeader = currentUser.token ? {
    Authorization: "Bearer " + currentUser.token
  } : {};
  return {
    headers: _objectSpread({}, authHeader, {
      "Content-Type": "application/json"
    })
  };
}