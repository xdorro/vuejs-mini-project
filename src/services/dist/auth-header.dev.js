"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = authHeader;

function authHeader() {
  var user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    return {
      Authorization: 'Bearer ' + user.accessToken,
      'Content-Type': 'application/json'
    }; // for Spring Boot back-end
    // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
  } else {
    return {};
  }
}