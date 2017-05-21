
          window.__NEXT_REGISTER_PAGE('/', function() {
            var comp = module.exports =
webpackJsonp([5],{

/***/ 559:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__resourceQuery) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = __webpack_require__(44);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(18);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(19);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(46);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(45);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(561);

var _createStore = __webpack_require__(592);

var _createStore2 = _interopRequireDefault(_createStore);

var _nextReduxWrapper = __webpack_require__(586);

var _nextReduxWrapper2 = _interopRequireDefault(_nextReduxWrapper);

var _Page = __webpack_require__(588);

var _Page2 = _interopRequireDefault(_Page);

var _actions = __webpack_require__(609);

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

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/home/cjk/proj/smart-home-app/pages/index.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/home/cjk/proj/smart-home-app/pages/index.js"); } } })();
    (function (Component, route) {
      if (false) return
      if (false) return

      var qs = __webpack_require__(83)
      var params = qs.parse(__resourceQuery.slice(1))
      if (params.entry == null) return

      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(module.exports.default || module.exports, "/")
  
/* WEBPACK VAR INJECTION */}.call(exports, "?entry"))

/***/ }),

/***/ 560:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(559);


/***/ }),

/***/ 588:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(568);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/home/cjk/proj/smart-home-app/components/Page.js';
// import Link from 'next/link';
exports.default = (0, _reactRedux.connect)(function (state) {
  return state;
})(function (_ref) {
  var title = _ref.title;

  return _react2.default.createElement('div', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    }
  }, _react2.default.createElement('h1', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    }
  }, title), _react2.default.createElement('div', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }, 'Welcome to your NG smarthome-control!'));
});

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/home/cjk/proj/smart-home-app/components/Page.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/home/cjk/proj/smart-home-app/components/Page.js"); } } })();

/***/ }),

/***/ 589:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = exports.actionTypes = undefined;

var _assign = __webpack_require__(92);

var _assign2 = _interopRequireDefault(_assign);

var _stringify = __webpack_require__(564);

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var actionTypes = exports.actionTypes = {
  DO: 'DO'
};

var reducer = exports.reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case actionTypes.DO:
      console.log('reducing state: ' + (0, _stringify2.default)(state));
      return (0, _assign2.default)({}, state, {
        lastUpdate: action.ts
      });
    default:
      return state;
  }
};

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/home/cjk/proj/smart-home-app/lib/app/reducers.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/home/cjk/proj/smart-home-app/lib/app/reducers.js"); } } })();

/***/ }),

/***/ 590:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = __webpack_require__(95);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _stringify = __webpack_require__(564);

var _stringify2 = _interopRequireDefault(_stringify);

var _objectWithoutProperties2 = __webpack_require__(574);

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _redux = __webpack_require__(561);

var _reduxLogger = __webpack_require__(602);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Redux logger for Node.js.
// TODO: Pull request for https://github.com/evgenyrodionov/redux-logger.
var nodeLogger = function nodeLogger() {
  return function (next) {
    return function (action) {
      var type = action.type,
          props = (0, _objectWithoutProperties3.default)(action, ['type']);

      var propsAsShortString = (0, _stringify2.default)(props).slice(0, 60);
      // eslint-disable-next-line
      console.log('action ' + type + ', ' + propsAsShortString + '...');
      return next(action);
    };
  };
};

var createMiddleware = function createMiddleware(platformMiddlewares) {
  var middleware = [].concat((0, _toConsumableArray3.default)(platformMiddlewares));

  // Logger must be the last middleware in chain.
  if (true) {
    // $FlowFixMe
    var isServer = !process.browser;
    var logger = isServer ? nodeLogger : (0, _reduxLogger.createLogger)({ collapsed: true });
    middleware.push(logger);
  }

  var appliedMiddleware = _redux.applyMiddleware.apply(undefined, (0, _toConsumableArray3.default)(middleware));

  if (process.browser && window.__REDUX_DEVTOOLS_EXTENSION__) {
    return (0, _redux.compose)(appliedMiddleware, window.__REDUX_DEVTOOLS_EXTENSION__());
  }
  return appliedMiddleware;
};

exports.default = createMiddleware;

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/home/cjk/proj/smart-home-app/lib/create-middleware.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/home/cjk/proj/smart-home-app/lib/create-middleware.js"); } } })();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(56)))

/***/ }),

/***/ 591:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(94);

var _extends3 = _interopRequireDefault(_extends2);

var _redux = __webpack_require__(561);

var _reducers = __webpack_require__(589);

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (platformReducers) {
  return (0, _redux.combineReducers)((0, _extends3.default)({}, platformReducers, {
    app: _reducers2.default
  }));
};

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/home/cjk/proj/smart-home-app/lib/create-reducers.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/home/cjk/proj/smart-home-app/lib/create-reducers.js"); } } })();

/***/ }),

/***/ 592:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createMiddleware = __webpack_require__(590);

var _createMiddleware2 = _interopRequireDefault(_createMiddleware);

var _createReducers = __webpack_require__(591);

var _createReducers2 = _interopRequireDefault(_createReducers);

var _redux = __webpack_require__(561);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Exact object type prevents typos.
// https://flow.org/en/docs/types/objects/#toc-exact-object-types


var createReduxStore = function createReduxStore() {
    var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var options = arguments[1];

    var _ref = options || {},
        _ref$platformMiddlewa = _ref.platformMiddlewares,
        platformMiddlewares = _ref$platformMiddlewa === undefined ? [] : _ref$platformMiddlewa,
        _ref$platformReducers = _ref.platformReducers,
        platformReducers = _ref$platformReducers === undefined ? {} : _ref$platformReducers;

    var reducers = (0, _createReducers2.default)(platformReducers);
    var middleware = (0, _createMiddleware2.default)(platformMiddlewares);
    return (0, _redux.createStore)(reducers, initialState, middleware);
};

exports.default = createReduxStore;

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/home/cjk/proj/smart-home-app/lib/create-store.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/home/cjk/proj/smart-home-app/lib/create-store.js"); } } })();

/***/ }),

/***/ 609:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var actionTypes = exports.actionTypes = {
  DO: 'DO'
};

// ACTIONS

// export const serverRenderClock = isServer => dispatch => {
//   return dispatch({ type: actionTypes.TICK, light: !isServer, ts: Date.now() });
// };

var doAction = exports.doAction = function doAction() {
  return function (dispatch) {
    console.log('dispatching action doAction');
    return setInterval(function () {
      return dispatch({ type: 'DO', ts: Date.now() });
    }, 800);
  };
};

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "/home/cjk/proj/smart-home-app/lib/app/actions.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "/home/cjk/proj/smart-home-app/lib/app/actions.js"); } } })();

/***/ })

},[560]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlcy9wYWdlcy9pbmRleC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3BhZ2VzP2RiZDM4MTciLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9QYWdlLmpzP2RiZDM4MTciLCJ3ZWJwYWNrOi8vLy4vbGliL2FwcC9yZWR1Y2Vycy5qcz9kYmQzODE3Iiwid2VicGFjazovLy8uL2xpYi9jcmVhdGUtbWlkZGxld2FyZS5qcz9kYmQzODE3Iiwid2VicGFjazovLy8uL2xpYi9jcmVhdGUtcmVkdWNlcnMuanM/ZGJkMzgxNyIsIndlYnBhY2s6Ly8vLi9saWIvY3JlYXRlLXN0b3JlLmpzP2RiZDM4MTciLCJ3ZWJwYWNrOi8vLy4vbGliL2FwcC9hY3Rpb25zLmpzP2RiZDM4MTciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGJpbmRBY3Rpb25DcmVhdG9ycyB9IGZyb20gJ3JlZHV4JztcbmltcG9ydCBjcmVhdGVTdG9yZSBmcm9tICcuLi9saWIvY3JlYXRlLXN0b3JlJztcbmltcG9ydCB3aXRoUmVkdXggZnJvbSAnbmV4dC1yZWR1eC13cmFwcGVyJztcbmltcG9ydCBQYWdlIGZyb20gJy4uL2NvbXBvbmVudHMvUGFnZSc7XG5pbXBvcnQgeyBkb0FjdGlvbiB9IGZyb20gJy4uL2xpYi9hcHAvYWN0aW9ucyc7XG5cbmNsYXNzIFNtYXJ0SG9tZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBnZXRJbml0aWFsUHJvcHMoeyBzdG9yZSwgaXNTZXJ2ZXIgfSkge1xuICAgIHN0b3JlLmRpc3BhdGNoKGRvQWN0aW9uKGlzU2VydmVyKSk7XG5cbiAgICByZXR1cm4geyBpc1NlcnZlciB9O1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiA8UGFnZSB0aXRsZT1cIkluZGV4IFBhZ2VcIiAvPjtcbiAgfVxufVxuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XG4gIHJldHVybiB7XG4gICAgZG9BY3Rpb246IGJpbmRBY3Rpb25DcmVhdG9ycyhkb0FjdGlvbiwgZGlzcGF0Y2gpLFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aFJlZHV4KGNyZWF0ZVN0b3JlLCBudWxsLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFNtYXJ0SG9tZSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYWdlcz9lbnRyeSIsIi8vIGltcG9ydCBMaW5rIGZyb20gJ25leHQvbGluayc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KHN0YXRlID0+IHN0YXRlKSgoeyB0aXRsZSB9KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIDxoMT57dGl0bGV9PC9oMT5cbiAgICAgIDxkaXY+V2VsY29tZSB0byB5b3VyIE5HIHNtYXJ0aG9tZS1jb250cm9sITwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9jb21wb25lbnRzL1BhZ2UuanMiLCJleHBvcnQgY29uc3QgYWN0aW9uVHlwZXMgPSB7XG4gIERPOiAnRE8nLFxufTtcblxuZXhwb3J0IGNvbnN0IHJlZHVjZXIgPSAoc3RhdGUgPSB7fSwgYWN0aW9uKSA9PiB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIGFjdGlvblR5cGVzLkRPOlxuICAgICAgY29uc29sZS5sb2coYHJlZHVjaW5nIHN0YXRlOiAke0pTT04uc3RyaW5naWZ5KHN0YXRlKX1gKTtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBsYXN0VXBkYXRlOiBhY3Rpb24udHMsXG4gICAgICB9KTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICB9XG59O1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL2FwcC9yZWR1Y2Vycy5qcyIsIi8vIEBmbG93XG5pbXBvcnQgdHlwZSB7IE1pZGRsZXdhcmVzIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgYXBwbHlNaWRkbGV3YXJlLCBjb21wb3NlIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgY3JlYXRlTG9nZ2VyIH0gZnJvbSAncmVkdXgtbG9nZ2VyJztcblxuLy8gUmVkdXggbG9nZ2VyIGZvciBOb2RlLmpzLlxuLy8gVE9ETzogUHVsbCByZXF1ZXN0IGZvciBodHRwczovL2dpdGh1Yi5jb20vZXZnZW55cm9kaW9ub3YvcmVkdXgtbG9nZ2VyLlxuY29uc3Qgbm9kZUxvZ2dlciA9ICgpID0+IG5leHQgPT4gYWN0aW9uID0+IHtcbiAgY29uc3QgeyB0eXBlLCAuLi5wcm9wcyB9ID0gYWN0aW9uO1xuICBjb25zdCBwcm9wc0FzU2hvcnRTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShwcm9wcykuc2xpY2UoMCwgNjApO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgY29uc29sZS5sb2coYGFjdGlvbiAke3R5cGV9LCAke3Byb3BzQXNTaG9ydFN0cmluZ30uLi5gKTtcbiAgcmV0dXJuIG5leHQoYWN0aW9uKTtcbn07XG5cbmNvbnN0IGNyZWF0ZU1pZGRsZXdhcmUgPSAocGxhdGZvcm1NaWRkbGV3YXJlczogTWlkZGxld2FyZXMpID0+IHtcbiAgY29uc3QgbWlkZGxld2FyZSA9IFsuLi5wbGF0Zm9ybU1pZGRsZXdhcmVzXTtcblxuICAvLyBMb2dnZXIgbXVzdCBiZSB0aGUgbGFzdCBtaWRkbGV3YXJlIGluIGNoYWluLlxuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIC8vICRGbG93Rml4TWVcbiAgICBjb25zdCBpc1NlcnZlciA9ICFwcm9jZXNzLmJyb3dzZXI7XG4gICAgY29uc3QgbG9nZ2VyID0gaXNTZXJ2ZXIgPyBub2RlTG9nZ2VyIDogY3JlYXRlTG9nZ2VyKHsgY29sbGFwc2VkOiB0cnVlIH0pO1xuICAgIG1pZGRsZXdhcmUucHVzaChsb2dnZXIpO1xuICB9XG5cbiAgY29uc3QgYXBwbGllZE1pZGRsZXdhcmUgPSBhcHBseU1pZGRsZXdhcmUoLi4ubWlkZGxld2FyZSk7XG5cbiAgaWYgKHByb2Nlc3MuYnJvd3NlciAmJiB3aW5kb3cuX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fXykge1xuICAgIHJldHVybiBjb21wb3NlKGFwcGxpZWRNaWRkbGV3YXJlLCB3aW5kb3cuX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fXygpKTtcbiAgfVxuICByZXR1cm4gYXBwbGllZE1pZGRsZXdhcmU7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVNaWRkbGV3YXJlO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL2NyZWF0ZS1taWRkbGV3YXJlLmpzIiwiLy8gQGZsb3dcbmltcG9ydCB0eXBlIHsgUmVkdWNlcnMgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBjb21iaW5lUmVkdWNlcnMgfSBmcm9tICdyZWR1eCc7XG5cbmltcG9ydCBhcHAgZnJvbSAnLi9hcHAvcmVkdWNlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCAocGxhdGZvcm1SZWR1Y2VyczogUmVkdWNlcnMpID0+XG4gIGNvbWJpbmVSZWR1Y2Vycyh7XG4gICAgLi4ucGxhdGZvcm1SZWR1Y2VycyxcbiAgICBhcHAsXG4gIH0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL2NyZWF0ZS1yZWR1Y2Vycy5qcyIsIi8vIEBmbG93XG5pbXBvcnQgdHlwZSB7IE1pZGRsZXdhcmVzLCBSZWR1Y2VycyB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCBjcmVhdGVNaWRkbGV3YXJlIGZyb20gJy4vY3JlYXRlLW1pZGRsZXdhcmUnO1xuaW1wb3J0IGNyZWF0ZVJlZHVjZXIgZnJvbSAnLi9jcmVhdGUtcmVkdWNlcnMnO1xuaW1wb3J0IHsgY3JlYXRlU3RvcmUgfSBmcm9tICdyZWR1eCc7XG5cbi8vIEV4YWN0IG9iamVjdCB0eXBlIHByZXZlbnRzIHR5cG9zLlxuLy8gaHR0cHM6Ly9mbG93Lm9yZy9lbi9kb2NzL3R5cGVzL29iamVjdHMvI3RvYy1leGFjdC1vYmplY3QtdHlwZXNcbnR5cGUgT3B0aW9ucyA9IHt8XG4gICAgICAgICAgICAgICAgcGxhdGZvcm1SZWR1Y2Vycz86IFJlZHVjZXJzLFxuICAgICAgICAgICAgICAgIHBsYXRmb3JtTWlkZGxld2FyZXM/OiBNaWRkbGV3YXJlcyxcbiAgICAgICAgICAgICAgIHx9O1xuXG5jb25zdCBjcmVhdGVSZWR1eFN0b3JlID0gKGluaXRpYWxTdGF0ZTogT2JqZWN0ID0ge30sIG9wdGlvbnM/OiBPcHRpb25zKSA9PiB7XG4gIGNvbnN0IHsgcGxhdGZvcm1NaWRkbGV3YXJlcyA9IFtdLCBwbGF0Zm9ybVJlZHVjZXJzID0ge30gfSA9IG9wdGlvbnMgfHwge307XG4gIGNvbnN0IHJlZHVjZXJzID0gY3JlYXRlUmVkdWNlcihwbGF0Zm9ybVJlZHVjZXJzKTtcbiAgY29uc3QgbWlkZGxld2FyZSA9IGNyZWF0ZU1pZGRsZXdhcmUocGxhdGZvcm1NaWRkbGV3YXJlcyk7XG4gIHJldHVybiBjcmVhdGVTdG9yZShyZWR1Y2VycywgaW5pdGlhbFN0YXRlLCBtaWRkbGV3YXJlKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVJlZHV4U3RvcmU7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvY3JlYXRlLXN0b3JlLmpzIiwiZXhwb3J0IGNvbnN0IGFjdGlvblR5cGVzID0ge1xuICBETzogJ0RPJyxcbn07XG5cbi8vIEFDVElPTlNcblxuLy8gZXhwb3J0IGNvbnN0IHNlcnZlclJlbmRlckNsb2NrID0gaXNTZXJ2ZXIgPT4gZGlzcGF0Y2ggPT4ge1xuLy8gICByZXR1cm4gZGlzcGF0Y2goeyB0eXBlOiBhY3Rpb25UeXBlcy5USUNLLCBsaWdodDogIWlzU2VydmVyLCB0czogRGF0ZS5ub3coKSB9KTtcbi8vIH07XG5cbmV4cG9ydCBjb25zdCBkb0FjdGlvbiA9ICgpID0+IGRpc3BhdGNoID0+IHtcbiAgY29uc29sZS5sb2coJ2Rpc3BhdGNoaW5nIGFjdGlvbiBkb0FjdGlvbicpO1xuICByZXR1cm4gc2V0SW50ZXJ2YWwoXG4gICAgKCkgPT4gZGlzcGF0Y2goeyB0eXBlOiAnRE8nLCB0czogRGF0ZS5ub3coKSB9KSxcbiAgICA4MDBcbiAgKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvYXBwL2FjdGlvbnMuanMiXSwibWFwcGluZ3MiOiI7QTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBO0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7Ozs7O0FBQ0E7Ozs7Ozs7Ozs7O0FBUUE7QUFBQTtBQUFBO0FBQ0E7QUFEQTtBQUFBOzs7O0FBUEE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7Ozs7O0FBSkE7QUFDQTtBQVdBOztBQUVBO0FBQUE7QUFJQTtBQUNBO0FBREE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkJBO0FBQ0E7Ozs7QUFKQTtBQUdBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTs7QUFBQTtBQUNBO0FBREE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTs7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUpBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSkE7QUFDQTs7Ozs7QUFEQTtBQUlBO0FBSEE7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBR0E7QUFFQTs7QUFWQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNIQTtBQUNBO0FBQUE7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBRUE7QUFBQTtBQUNBO0FBTEE7QUFBQTtBQUFBO0FBQ0E7QUFPQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBREE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQURBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakNBO0FBQ0E7QUFHQTtBQUNBOzs7OztBQURBO0FBRUE7QUFEQTtBQUVBO0FBSEE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDTEE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFEQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3JCQTtBQUNBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQURBO0FBQUE7QUFDQTtBQUVBO0FBQUE7QUFEQTtBQUZBO0FBQUE7QUFDQTs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==
            return { page: comp.default }
          })
        