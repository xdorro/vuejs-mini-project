"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleResponse = handleResponse;

var _authService = require("../services/authService");

function handleResponse(response) {
  return response.text().then(function (text) {
    var data = text && JSON.parse(text);

    if (!response.ok) {
      if ([401, 403].indexOf(response.status) !== -1) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        _authService.authService.logout();

        location.reload(true);
      }

      var error = data && data.message || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}