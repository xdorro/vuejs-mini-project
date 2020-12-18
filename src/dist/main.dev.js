"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _router = require("./router");

var _store = _interopRequireDefault(require("./store"));

var _vuex = _interopRequireDefault(require("vuex"));

var _jquery = _interopRequireDefault(require("jquery"));

require("bootstrap");

require("bootstrap/dist/css/bootstrap.min.css");

var _veeValidate = require("vee-validate");

var rules = _interopRequireWildcard(require("vee-validate/dist/rules"));

var _vi = _interopRequireDefault(require("vee-validate/dist/locale/vi.json"));

var _fontawesomeSvgCore = require("@fortawesome/fontawesome-svg-core");

var _vueFontawesome = require("@fortawesome/vue-fontawesome");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

require("sweetalert2/src/sweetalert2.scss");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// jQuery
global.jQuery = _jquery["default"];
window.$ = _jquery["default"]; // Boostrap

Object.keys(rules).forEach(function (rule) {
  (0, _veeValidate.extend)(rule, rules[rule]);
});
(0, _veeValidate.localize)('vi', _vi["default"]);
(0, _veeValidate.configure)({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
});

_vue["default"].component('ValidationObserver', _veeValidate.ValidationObserver);

_vue["default"].component('ValidationProvider', _veeValidate.ValidationProvider); // FontAwesome


_fontawesomeSvgCore.library.add(_freeSolidSvgIcons.faHome, _freeSolidSvgIcons.faUser, _freeSolidSvgIcons.faUserPlus, _freeSolidSvgIcons.faSignInAlt, _freeSolidSvgIcons.faSignOutAlt);

_vue["default"].component('font-awesome-icon', _vueFontawesome.FontAwesomeIcon); //


_vue["default"].config.productionTip = false;

_vue["default"].use(_vuex["default"]);

new _vue["default"]({
  router: _router.router,
  store: _store["default"],
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount('#app');