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

var API_URL = 'http://localhost:8080/api/questions';

var QuestionService =
/*#__PURE__*/
function () {
  function QuestionService() {
    _classCallCheck(this, QuestionService);
  }

  _createClass(QuestionService, [{
    key: "getAllQuestions",
    value: function getAllQuestions() {
      return _axios["default"].get(API_URL, {
        headers: (0, _authHeader["default"])()
      });
    }
  }, {
    key: "getQuestionById",
    value: function getQuestionById(id) {
      return _axios["default"].get("".concat(API_URL, "/").concat(id), {
        headers: (0, _authHeader["default"])()
      });
    }
  }, {
    key: "uploadQuestions",
    value: function uploadQuestions(level, questions) {
      return (0, _axios["default"])({
        method: 'post',
        url: "".concat(API_URL, "/saveall/").concat(level),
        headers: (0, _authHeader["default"])(),
        data: questions
      });
    }
  }, {
    key: "createNewQuestion",
    value: function createNewQuestion(email, password) {
      return (0, _axios["default"])({
        method: 'post',
        url: "".concat(API_URL),
        headers: (0, _authHeader["default"])(),
        data: {
          email: email,
          password: password
        }
      });
    }
  }, {
    key: "updateQuestionById",
    value: function updateQuestionById(id, old_password, new_password) {
      return (0, _axios["default"])({
        method: 'put',
        url: "".concat(API_URL, "/").concat(id),
        headers: (0, _authHeader["default"])(),
        data: {
          old_password: old_password,
          new_password: new_password
        }
      });
    }
  }, {
    key: "deleteQuestionById",
    value: function deleteQuestionById(id) {
      return (0, _axios["default"])({
        method: 'delete',
        url: "".concat(API_URL, "/").concat(id),
        headers: (0, _authHeader["default"])()
      });
    }
  }]);

  return QuestionService;
}();

var _default = new QuestionService();

exports["default"] = _default;