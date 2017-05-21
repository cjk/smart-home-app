'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _createStore = require('../lib/create-store');

var _createStore2 = _interopRequireDefault(_createStore);

var _nextReduxWrapper = require('next-redux-wrapper');

var _nextReduxWrapper2 = _interopRequireDefault(_nextReduxWrapper);

var _Page = require('../components/Page');

var _Page2 = _interopRequireDefault(_Page);

var _actions = require('../lib/app/actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/home/cjk/proj/smart-home-app/pages/index.js?entry';


var SmartHome = function (_React$Component) {
  (0, _inherits3.default)(SmartHome, _React$Component);

  function SmartHome() {
    (0, _classCallCheck3.default)(this, SmartHome);

    return (0, _possibleConstructorReturn3.default)(this, (SmartHome.__proto__ || (0, _getPrototypeOf2.default)(SmartHome)).apply(this, arguments));
  }

  (0, _createClass3.default)(SmartHome, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_Page2.default, { title: 'Index Page', __source: {
          fileName: _jsxFileName,
          lineNumber: 16
        }
      });
    }
  }], [{
    key: 'getInitialProps',
    value: function getInitialProps(_ref) {
      var store = _ref.store,
          isServer = _ref.isServer;

      store.dispatch((0, _actions.doAction)(isServer));

      return { isServer: isServer };
    }
  }]);

  return SmartHome;
}(_react2.default.Component);

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    doAction: (0, _redux.bindActionCreators)(_actions.doAction, dispatch)
  };
};

exports.default = (0, _nextReduxWrapper2.default)(_createStore2.default, null, mapDispatchToProps)(SmartHome);