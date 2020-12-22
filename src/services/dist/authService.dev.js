"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var API_URL = 'http://localhost:8080/api/auth/';

var AuthService =
/*#__PURE__*/
function () {
  function AuthService() {
    _classCallCheck(this, AuthService);
  }

  _createClass(AuthService, [{
    key: "login",
    value: function login(user) {
      return _axios["default"].post(API_URL + 'login', {
        email: user.email,
        password: user.password
      }).then(function (response) {
        if (response.data.result.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data.result));
        }

        return response.data;
      });
    }
  }, {
    key: "logout",
    value: function logout() {
      localStorage.removeItem('user');
    }
  }, {
    key: "register",
    value: function register(user) {
      return _axios["default"].post(API_URL + 'register', {
        email: user.email,
        password: user.password
      });
    }
  }]);

  return AuthService;
}();

var _default = new AuthService();

exports["default"] = _default;