"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _authHeader = _interopRequireDefault(require("./auth-header"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var API_URL = "http://localhost:8080/api/tests";

var TestService =
/*#__PURE__*/
function () {
  function TestService() {
    _classCallCheck(this, TestService);
  }

  _createClass(TestService, [{
    key: "getAllTests",
    value: function getAllTests() {
      return _axios["default"].get(API_URL, {
        headers: (0, _authHeader["default"])()
      });
    }
  }, {
    key: "getTestById",
    value: function getTestById(id) {
      return _axios["default"].get("".concat(API_URL, "/").concat(id), {
        headers: (0, _authHeader["default"])()
      });
    }
  }, {
    key: "createNewTest",
    value: function createNewTest(test) {
      return (0, _axios["default"])({
        method: 'post',
        url: "".concat(API_URL),
        headers: (0, _authHeader["default"])(),
        data: test
      });
    }
  }, {
    key: "updateTestById",
    value: function updateTestById(id, test) {
      return (0, _axios["default"])({
        method: 'put',
        url: "".concat(API_URL, "/").concat(id),
        headers: (0, _authHeader["default"])(),
        data: test
      });
    }
  }, {
    key: "deleteTestById",
    value: function deleteTestById(id) {
      return (0, _axios["default"])({
        method: 'delete',
        url: "".concat(API_URL, "/").concat(id),
        headers: (0, _authHeader["default"])()
      });
    }
  }]);

  return TestService;
}();

var _default = new TestService();

exports["default"] = _default;