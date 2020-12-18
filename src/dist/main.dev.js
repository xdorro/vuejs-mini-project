"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("@/App.vue"));

var _router = _interopRequireDefault(require("@/router"));

var _store = _interopRequireDefault(require("@/store"));

var _vuelidate = _interopRequireDefault(require("vuelidate"));

require("bootstrap/dist/js/bootstrap.bundle");

require("bootstrap/dist/css/bootstrap.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Vue Validation
_vue["default"].use(_vuelidate["default"]); // jQuery


global.jQuery = require("jquery");
var $ = global.jQuery;
window.$ = $; // Boostrap

_vue["default"].config.productionTip = false;
new _vue["default"]({
  router: _router["default"],
  store: _store["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount("#app");