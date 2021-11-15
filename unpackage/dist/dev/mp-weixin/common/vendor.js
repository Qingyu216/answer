(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse || !wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"answer","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 10:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 19:
/*!*********************************************!*\
  !*** D:/uni-app/answer/static/assets/1.png ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXIAAAKlCAIAAABZlfBUAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAgAElEQVR4nOy923Nd13Wn+xtzzrWvuJEAQVIX0rQt24pl9+nuavGcqrTlqLqiyoO6n6jkNSW/xXX+gagcx+W8n+ryebMqb6fOER55qlJyqhhLSaobOp12YtGhrIslQrwBxHXf91prjnEe5toLGxcSF24CewPjKxa5sbFuALE+jDnmWGOSiEBRFGVA1Ot1c9zXoCjKSUO1oijKgFGtKIoyYFQriqIMGNWKoigDRrWiKMqAUa0oijJgVCuKogwY1YqiKANGtaIoyoBRrSiKMmBUK4qiDBjViqIoA0a1oijKgFGtKIoyYFQriqIMGNWKoigDRrWiKMqAUa0oijJgVCuKogwY1YqiKAPGHfcFKIoyCJZ/jOW/HMyhKt/HzF+g8v1DH4B0QQ9FGXlav8TCHwz4mDN/gZkfH2I/XdBDUU4Eg4pTBoRqRVGU3Wi9d+hdVSuKMrIs/xgfET4itH45+IO3fpkdfOEPDnp8za0oygjyNJIpj+db+xWF5lYUZTTJkykzf4GZv3gqp9g2H7T84/3vqlpRlBEkjEoq38fMjzHz4wNMBh/IQTM/xqW/y3Y5SFZYtaIoI0vllYNtH+aMn1J004dqRVFODaEO5VDVKAdCq2wV5aSzMzy59Hdo/RKt9/Y1xXPwmWbViqKMIJXvo/VLLP/l3lmVXYtlK9/Pdnz8jFLrl9mfsMu+Ua0oyghSeSW72/ecZg7q2VUKezpl4ZdbzrhvNLeiKCPIgTKvu9azHajy5YDPB2m0oiijST6vHEZDj6f1y+0By55Zlcr3swjl4ClerbJVlNFnz/r6S3+3i1YeH61Uvo9Lf3eIa9EqW0U5Eewz8bH840M84HMIdBCkKKeDvM/Twi83BziP4Qmq5nQQpCgngo9owAfcOW7aHzoIUhRlNx41J70/VCuKciIY7JM+T3Y0HQQpyklhUOOgw84BBer1+hCmbJfmr8/j5devnu9/572FTnhduvS9/k/t2PmD6+/dxuO3GfjZlz64/t7tTv5h6fIrr788i8X56+8vdLZvu42+A350Y+6T6iuvX53tP2zj69deffFwX4ly6pj5i8E0tX3iwGfItPLRjbkPV4DSpb73lj6YXzr/yrWXZxHutPev45HWuHXzdgcoHcPZp1/afv+fv/r6tasAsDh//f1mnx6W5q+/13zh2qvf2nqEb7360r25+Q+uvP5yJpaVRqc0Nn3Ir0U5hYS6tSc0y5Mt5REYotzK0gfX5+5dvPa9S9usMPvy6/mdNvvy1UulztLtpV2PcOvGzZVS6XBSefKzPzkvfvuVq71zYXH+05XS7OXZx+6hKFt5wnYqh13EYxtDFK3Mvvz6NQCL84fc/6MbN1emX/pe9dP3D3PbP8nZVxp7jXUey60bczdXtr03PT290gEW3p9b2HxvR0CkKDs5dMwyIKdgqLSyLz66udApXdrld/itGx+uTH/n2ouY//QYzo4nGa28+Oq1F3Hrxtz9i7k2Fuevv7+Se2Tpg+vzuJoHTYqyB+FxoeW/PEBB7eCcghHTyuL89Q9XMP3SjtTG0vz1myvTL137FrC46555QJClSA+TDX302WtNdFbem7sNII8p+hO9AHBzbu5m/04fzs19iHBF/Wna7HJ/s1C9fAmLtSVgFlhpdKrPqFOUg1D5Pi71erI8Ri6h3HbQ/eJGRivZbMtuA4GlD+YXcOmVRzvi1o2bzcsh7XrrxtzcHACULn3vAE55zNmB2V5uFsFfczdw7dUXN99cnL/+Aa5uuuMRKVus9NRTuvS9a6+eX5q/Pv/5ImbP37q/Uqp+e/8Xqyg9crkAW/wS8i9PVvP2GEZDKyHYmP7OzlsRvdmfhff6shAL788t9EUBL756rSeDvpeDOfs2Xnz1O/fnPrx/Cy9unmat2UF1j/0Wa81MWkvz10N+Z/bKebz3m1tXbn+6Mv31Vw85X64ovcZul76fPWcY+vU/TUZAK0sfXL+58phyla2mWJy//v7S7OHrVg569n0codZE9eIeY5i1ZqdUnQaAlWanevE8AMy+/PXpuZvvrRwssFKUY2eIJpgfwdLni53S5au7FqHNzd24dfxnX1raTOjcuvHhSunyS5saWJyfv41L397DC0u1Zun8le3qWaw1AaA6oaGKMlKMQLQCoHO7lxANlC698vrVR2591GefXfnN3Hvv9z4ZSmwDH92Y+3Bl+jvX9oh0Fufnb2P2e7NArpLNkdfV2vX35ubu72sIpig72DVf2//mU0iv6DNBT42Pbsx9iN1yvNtTtrduzN1/5tqrCDW+KF2+VL29sLJlhujWjbmbK1q3ohyUvMfKYxjo1DKAer2uWlGUk8s+Hz7c97Lt+0H7rSjKyWX/tXAHWbZ9P6hWFOWE8vR71j4K1YqinFz2mY4ddNZWcyuKogwSza0oijJ4VCuKogwY1YqiKANGtaIoyoBRrSiKMmBUK4qiDBjViqIoA0a1oijKgFGtKIoyYFQrijKi3Hz7jbc3+64/fPetN96+CSz9zVtv/Pzmzq177998+42d5MdZevfP33j7148+y/4YjTZOiqI8Eb9++4d/feVH77wE4M133nnzAHu+dPUPf/J//83rP/2jA6z9oFpRlNHj5s/f+MkvAODdN9597U/f/Pyv3/4YAF7LPv2Ln7zxCwD4xp/+7Kd/NLv0N2/98K+v/OidN186yBnefuMn725++MM3/jq8+Mab/+dPXzu3x876qKGijCg3335j/moui4fvvvVnd/7knTdn/+atH979k3d+0HPIr99+44Or7/zgJTx8963/A//7X732qKgjVxUA4LUfhUP9w3/82V+9Nould//8h3//+z/bT8xSr9c1WlGUE81333znuwBuvv1nb19562e/+vM33v5kt81eePNnf/XOO//l3bf+7O0rb73z5ndvvv3GG+8CwMc/fOPtbJtPfvjGX+O1t95587t7nFO1oigjzPzP35jHa+/+IoxXtg2C8gHL0rt//pPP//RnP/3uLL77zmube2+Nd4Cl//H3HwMf/zQI5bUfvfPmS1h6989/eOePM5Xc/Pkb+1mlXLWiKCPJzZ//5F3gtZffefO7ePMHb4ZBUPa5P/zR5iColyX5xu/vecilX/0DvvECrvzxO29efPetP3v7J2/0sis/fWMzz/L5u69/95EjqYBq5TDkCSmi/bUgVpSBcvPnb8y//KPXfjF/da/xyM2f/wRvvfOzu2/9172OufQ3//Xvf/9P/uM//OQOgHOv/fSd1/ZMxzwK1creiIgAFF6IEBEzp8zO2J5ViCgzjIpGOQJe+sE7L+Hm28DWKZvtM0EhY/ImsHR372Mu3b3yJz+YvfsPfW/dv/PxJ+9u5lawr8QKVCt7IoCIeBZD8MzdJImc68bpWq05PVl11sRJCqBSKhmTqUXNohwhL2V1KI8cBO37QD/Y5p+ld/+fd8MUdfh4n4kVqFb2RFjacbq8XitEkXO0XtuIbGGtmdxZXP3OlfMweLi6MT05wcIiXC1XIudUK8oJ4ObPf/j2J6/96K/yAdDS3c+/8dx/2de+qpU9SJkf1pq/WVhO0vT5cxPdbqPdiReWuo1W58JkYaPdqbU71ppOt1VwNnKRtVYfiFCeNlmNyQtvvn6ovTfHTX/4o10rbm/+/I2f4EfvvPMSsPTun/8wm5P+wx+9s1chXEDL4R6HAO04+W+/vfe3//yZJPHFqcrFqUKcxJ/dbRas/V+/ObNUayQiz56dKDiMVyrPnjs3OTEROZW1cnrRcri9MUREtN70SL1IM7K+EpFnESsiLIAIWJgZhOyPopxyNGB/HAQYolLBuciwSOol5RDeiQAgUPgDEGCJrDGaWFEU1coeEFG54MpFByJkDhGBADBEJjMLEWDIEOn3U1FUK3tBgLMmMoYAQyDaTEUZIoIhMT2thHc0WlFOO6qVvSFQyLAYgjXIRzkGZAgCEUAAFoQXinLKUa3sQTAFmRCMwJEhIiEQBa2QgEWEAS8swioWRVGt7IVInCTsPUGsMcaSIPyBMTDGAMReRMR774VVKoqiWnkcIpKy1NtxJ04JcBbOGBYwCwEG5AxBkDIDSNmnqRdmLQVSTjmqlcchQDdJ1xvtpJsQSeTIGmIGs0BgiBwZQFLPLEg9d5OE1SnKqUe18jhEpNbuLG800zQ1hgqRc8awF+8FAhCMgQBx6oNW2p1umnqNVpRTjmrlkYiIZ16ptZY2mgI4Q6XIWAMWTj0LIATnDEHixLOH99zqtOM0EfWKcrpRrTwSL9xN07srtVqzQ0SlyFYL1gApS8pZka0zxhB1kzTxzMLtbrfd7YZKXDWLcmpRreyOQFLPa4327cVap5taomrBlZ0FkHr2nPV1ssYYY5LUd5PYMyfe11utJE2P+/IV5ThRrewOs7S6yUdfLj9YrXvmyGCi5JwlBropPCMkV5w1kTUs0kl8ymBGo9lqtlpe54OUU4xqZRdEJEn9/dXGbxaW650uwJWiqZaNNRCRJPHeB2WQI1MwFoRu4juJ94x2t7tWq3W6XT6UWaTHwL8oRTkyVCu7IMBGs/3bhaUvl9aT1EfWnB2LykVDBszSjb33AiGCWELRGQLFqW+0u3Hq4yTdqNdX1tbiJD3cZLM6RRl1VCvbST03O/Fv7y7/9s5KN/aWaLLspqtRZAgCz2jHzBAhEYI1VIysMcSCZpxudDqx9504Xl5bXa2td5P4EHW32lpBGXW0jdMWPHO7G//uwdq/fPbgYa0FQrVkz00Uq0VriFgQp9yOszBEADJUcq5gKWUkLPVOHFljCdSRh6urRObs5GTBOWPMPlWhTlFOAKqVjNCbKU793eWNf/zw9hcPNrreFyM6P1k6O1aInAGQet+Kk3Y3FQ69V8SAis6WC66VegjiVDZaXUtiqFBrNJiZgLNTkwWK1BfK6UG1gpDNSD23OvHnS2v/9Mnd20vrAE9V7LmJwrnxQsESAAE8S70Zd2MvMBSGQcTOUqVQWG/HXgSgbiJrzQSCailqttqLS0vCfGZyslQobC4mpCgnmlOtFRHxwp45jv1qvf3p/dV/vb14b6Um8NNjbnq8OFmJImeMobBaUDfm1Xrc9WzBSZJ0k7QUGUNmrFgoWBv7FAQWdBJebcYpo1pAmjYTz0mSzpw5UywWrLVGzaKcdE6jVsL8rYh4z9003Wh1Fh6s3fpy+dN7a7Vms1o0F86UZsaKlULBGgJBIAR45tVG52Gtm6RpEnce3KvfPosrz52rVsvVYlQu2FY29UPM0u5yHHcaLi5arNdbnTiJk+Tc2bPVStlZS32LIR7vt0JRnganTisiEidJo93daHZX6u37a7W7K42l9eZ6vdVstpbvLJi40Tk31bkwc/bM1PhEtVCw1hoGas34y6WNlYcr9dWV7trKatpe+eyjr12++MLXLj3/3IUI5CBdBnufxEm71alv1Grr642N2tRE9eX/8JJAmp3O1OT4ZHWsVCyG8lxDZLSrtnLiOF1aEZGUeXFl/X98+MkXS7WNDrdS7npJWZI4Xl98sPj553Gz8eALOzE1PjNzZnZ2enb27NTUpIuiz++t/u7jL5fvLXZq69ztgn27Vlt6uPbbT+9cev7CM89ecNWxtueNWm19dX19dX1jbb3ZbKZxMjFenZisTExW09TXW63FaLXkCmAQ5NmLs1OTE7YvflGUE8AIaGVQ5WECMHO9E/9uae0X8zc//fgL66Ly2Hh5YqJYLqfdeOXLL1vrG2mSdFrSqDcX7y1+ViqcOXNmema6Ojb25f3lhw+W260WMRsAIGY0WnGzvXJvaW3ykzsTUxNsZH19vdVoJd1EOBtsrfn6Jx/ffv65i7Pnzna7ydpq7eHiSqPRuHj+7H/+oz8olUulYtEYg/CUUe9qqe+yD/aOKko5boZdKyzivU89AyDQTsHs/1FhEYlT/5svFn/xL198suHXa21pPHCGolK5WC5bY+KNRtmVKCoZY6x1zjpjLcdRbTlub9Sj1F2cnJUJMb0rEYIQSGAAIZIYAI/ZyfLYGJe99+x96jlh4fWV5q/+6aNKpbiyvLG6Vms2WlNnqtMzZ27fXUqFZs9NF6NCLoPsuYCeNbJmulslsus7BnDWOGtFzaIcK8OuFWFuNNuf3VtqtjtJkopkne7zm06Avjux/0V+V1JvQ2LGl0vrS3ce+EanVJoyqYnIFgulsisVo2J08dmCdda6kPewxlmyztmCc85ahBb8+c1MeRBFEBGQkLAwM7N4FmFm7z2zTzkVSSXh5koi3UoB8JGrlMeWV5v/7Z8+/spq6+z0mjUU+vYTha8h/JvZI3yNlJ8uW6goW7QIABFZ68bKxSvPzE5PjptwAEU5JoZeKwIWWdvY+OfffnLnwWKz3fGeIWAJgyPZNMljIZA1UWTLlkrUMc+YSZk448bJGVNwUcG5UlQoRZEzNiRSkS1UCGeNc9aY7B4mQV/MlDlLKLvr+5b0CHPSHL4ECLP41HvPnPgk4RjGp0lSW5X/WfuyIx93kmbKXREfhjE9M4ZDhQcsePO1CMAgQ2QMwRqqlMsXZ2a++82vPTd7FiLqFOV4GXatWGsmxyr/9ptfmxor/eqj6MOPPr6/vmzIrdbqceoFbASGSIgEElYHk3BjERBeiBCRRTRWmJkqnSm78YjdOCAWRHDGOGsLzpScK1rrrDFksmWBAEOwlowx+aJiRAKS4BFCzzE9CfSNY8L7hDA9LRYUFVyY2w5PKIsHd9Ok0Yk7XdNob6y1F1PuPP67IejJFLDWTk2MEcn5mZkXv/LMv/+9F7/y7MXJ8TGdWlKOnWHXChFZayfHq9+6cvmZ2Znfu3Ll1qefNVrdf/znf35YqzGLi2ypWDChzEzCOIJYEF6IhBb5BlwsyVmXThEiAxOcYQ2iyJYKthDZUiEqRZGz1lgyYd1TY4JjjCEDkhAb9IKILCToDcpIqLc4s4iEdG0YCbEIhLPRG2dWYRYYESZbECqLTNhZqTYT2H45Uc8jhgxEGMIszXbbeyGiiUrx5Ze+OXNm6oUrV7767HNT42PFKHLWqVOUY2fYtQKAiCLnnLWVUunM+MSlCxe/+PKOl/Q3n39eazTLxSKVKYWfKFbjpJuyL5fK3bgrQKlQaMddZ4yzUbsJ0yhSx1kqRM5SRJZMIbKlUlQpu1Lkis5FzoBAlJkBCGpIvYcP6Yzshu3L5/Q+zpZ4D4ulErKAx7jwYW97EgEzs2fPnCRexMQWBSslFDE+YSvFRrtRjArW2na3UyoUWKSbJGOFctcniU+qplDfKCaJPzMx+e2vfuXffONrX7v8/PTZs8VC0drwNKM6RTl+RkArASIyxpSKhempiTSeefaZV//9gweff3nn/srq57V7nW7Lli0TxSzVcpQiEYgpRYxErCFnfeyNs8VSdaJaLUYGHIukhhJCp9tJ4nYC9syeLMdJnHS73ideUmZmH/KvnsUje3BZ+pPG4RWRMWQN2RDeWGONsdbayEVRVAwpYGdLkStGUTFyJecK1kWuWDSFVJq206l3C7AllyYcFcg5mzCXioDAk1DZcpKmKSqV0teeef7C2ekXLn/l2dlZcDo5PlaMohCqbV6NohwrI6MV9AoyjKHIuakzU2enJi6cPfPJl1/WP2121mJnrXUu8uKMiZwRgbMmsjbMuUaRFCIhX2+3lrvoJkm70WoYkmqlUKs1292EWcjQM89O1+vd5YdNLwQyICOwIBJYiAOZzcoQIuplcEJ+1kAIDKQQBpjA1ki56M7NVDc2GnHXG1CpWJicGvdxKjDOFYuFslDkqWgids4WLEWu4CLnrImsc9aKwFm21hbYGopmz5z5d1/75tcvXZ4+M2VgGvWaIUvUn0xRpyjHzyhpJUBExlAhiopUmKxWz0+fKdx2SZIkPo3TJPZp4tM4SQRI06ibxJ4tiOK0K/EDbjwoGlcslOKEFh92C1GxOjW11i6u1SHkoshdLJ1NYt5AV8iQMdZZ66wJ08pElGvFkDG9B5JDohggERIGsQinIiJgksqYTFyI6tSO6yk4pRK5Sbf+cK3Z6laK8ZliWq/VY9/tFowtGuNdnMY2JUgUp0mSOhaJkySJ4jhJvPhSsXhhZnpqbLxSKrP3Rm2iDCWjp5UQ64tIuK2dtSVXKBdKxSjyzNbbYhQlvgCRUhR1fcFZW3CFpJC68URMOlF8AelECtNNOuQiE03FphsTYA05gquYItmqkCHnzPiYOTdFjkgELixp6MEsxlIUgSDMEJA1hizEgz2RQcqy0qBm4oikUPHRGEVtOGuFOSqjdEaKnKZVmhjn89NpqfbwzvI/r7UezNrZgi2VCoViFEXGlaJCyRVYJGUuRo7BzCZyLpunEgrZYl1JXhlCRkwrLNLudB+srNc6CcjUa7WV2kazGcdd7hgfx5x47oKTrgDoQpKOiAUcpzGqlWpprBh1xtNWGUbEMIw1ZKxzhaIxkS2WTLFUrMJNTBoQRQ4zU1Lp1muL7bQrE5NRecKsLsedltgIZ85Faepra6kwVSejsXG3se7bTS5XzPj5crUyFjcNSKwDEUAGsERMJDACY8haMqlxrjQ2OWXON9Zi7xF3fdKFEREraReJwIv4WGKSJAUz6vVk8WHNJ7ZUqbP3nVbjwqwpFMvGWg1XlOFhxLQiLCvr9ff/561mp5OyJEnaTbqrjSZ3o3rbM5PANdupZwug1krZO0+IDQu7Ziy2bIgiY6wx0qumpcjZYsnZgiuVqBDZRFyx4iCIHEqF1G+krbU4bvsIvuhscz1u1cVFVCkiSXztYSxC5DkCN1eTZt37cVuZKthxMgZAmJ3JHzDIi18AMkIGBmSslaJNK0lKG60UHCVt4yHEhVYrzElFjbYXIYL74ou19Ye/KhdL1jmBlAr2P/1v/25ifKKA6Hj+PxRlN0ZJK6Hidr3euvnpl/eWV9OwrAZlNWYAADIh25FVneXVagQgcjYZw/gEG0PGiLPkjDGGnENBjC2Qc2QsyIIsIDAkxsrZ86WxkkljGRunSpUqY4VOB87a8TPGe5ma9iKojNlKlSbOFNotFMtUmCp0EyEyEIIYCnPVCNX2eQ0+BMQC9tysJysr3VRYwOExo7BNVqKbfRlCRCQt4GHIXINwdnLsf/nWC/4Sa6iiDBWjpJWAQLyIl15L+979mn02uweRPRUjfXecECSrLDEgSxTK9K2BIRiizaNkRxIIdbqm0XBpLMYZ60yzHbdbYh1c2fiUmi2wCCxZaxtNajUlYVMpE5PJYhTKJoryqwdEQo43K9KnUC6XLQ60LbLpHQK0+QySZFkVZEV2ml5RhozR00pWjJbFIrTLHMgj7zIjkilHDOAA64VSGBbr2ZIYSpF6IiERCBN7w4jElGCdUImlKFQSAyEHlJhSmIqQiCmxFEFlMRAURSLDacxEAniShIyHCDEJMZghElRCzBAfHhzKy3elF88wes8HASHq6j2FiOyJgM2CX0UZKkZLK303UNa1mjafVe690fcx9f4mEAlZT7YjKSjuRizjcVrwdZv6KliMWJNaWWHbgekWCBBv/LrxxWlbniYRMU66Bm4KVRYisANEKhcgAmMptuKmqeJhDDpMjXXTKUGExGEpMU2HuGgghhzWUrTJxtZ0Seqp6Ui7SyLOkfdhmIds6LYZneTPZmePMm+TKUHyAmAdDilDwGhoJTwD7JnTNPXhMRtgM/7PbjND5ECW4EA2FLgIWcCSIRhChLYzd9ImbIvLnp9LE8v3IqRniYlAEMI9BhN8ORuddETWm0R9suorZe1/OChrxSCS3eSpgS9BQF1Cswt2YEMEikGtLtgSF01LZLVOwj6OvJ2eQMriIV4khXiAmVhEGJKSsAhDvMBTb9wTzh1moL33RCGvpF2clONnNLTiPa/V6gv3H7Q73U++vF9vNbpxzAxkowMiE0XROFGFqAiKgOwJ5OwZYgNYgeUU3BRP5MV6iTwbYRLY7DAMxOGWtJlEUsDzYS5Yek2WPOBDDGUBIQ+kQT0WCdBJs+s3hSIcxJN4Em/EE5jAgDDEg1PxiU9bSVIjztPT0u527y0t//bz8li5VC4Wnzk3XSoVrWpFOW5GRSv+i7sP/q//928frm2st1oP1zaSmMMDfhCAjCuYQvmMoXGIBbA5gmAReAETBYVAxIsAYCLJ2rsBBCaQ9B4LfPIbc5cDSGjWEqKbLNpiAbGBN2BiD/YAZ54BGTEEIQKMg4hPu2jXH4J9GCiBJE2Td//x//vv//JhqVi4cuniH//hH5wvRNboArjKMTMCWhGAhRut9u/uLT5YWYtTzz5f2JggIBO6ElgBsU+SpC2cMieePbNnSQVsDBWr5crUWFg2zIAKUUSWQGLCvRue7TmgUDana/axGQSAgYTyXGIv3dRzSuIp7abNjVoax2AiWANnyJKxRM65qFAsExFgU+/BaUjyAkjZf3b3viEqFFwi0u7Guiy8MgyMgFYAQOA9x0kaJ4nnrUnaPMlBJOJb7ZWV5c+SuOM56T127EXEWHtm5mJx7AWKnAU5E52fmKqUisYIGcAwDIUWtXmhS952Lm/3tv2dHS+yD3qNIfMPkXWLIxGCJ/HCKRrt7v32OqfCqcSteOnL2+1GTRiGyMAQWbLGWFeuTl545hsuiqiXpt78rogkqQcgkDj2ng+8jLyiPA1GRCtAdq/viCZEQqxBEBJO4259ff2OT7u9cYaEYY6xURrH4iFMEOvInSmenaxUXESwIMewvcwv5ZO8/VUsu17QI+KULTFM1kQh04onScAJfFds0lz0TSQeiXCMtNONW01h3jwKCZFJku652SvW2UddhPS60eV9fTW5ohwvI6SVR/4m7kX+RFnRGOfN23ozzEQCMIkneIMUSC0lFrFjMeQAFrKCMByisPvm7DSI8rK6rSFIn0Dya8jL9bOSEtnUIRM8IQXFQjGQOEkjSg1SRuqEsXUE05vm4q0H2fFd2fwEPfp7pChHyMhohYgsGUeWDGOz51oYs4SmKgQYa23knEFWYtmlfnUAACAASURBVBY2ICIi66x14iw7w2LTiDpOYMUZGIIVWIERsQKyRGFs1WunAvQNZoBdDZcVyfbd/rKj25MQPCEmxIJYEFuTOsPGiLdiI+sKzvb81YuEiArORsZYAxhy1giZ/PR5Va4NTTd1blkZDkZDK0RUdG6mOk6piIAMjEHW/YQAGBdVx6oF8WbMjRUx631K0vdLHCAy4xNnzk6WbMFZJ+VCoQIUmU0qBkAvwyJGQDAU5oWy5YD6r2R7TjcvwOvJJ4yeNkvqqS8pEyKmlNiDRcYtZsvFtOC9564rR/FMtxMJc7+HAFMoVS9MlVwhSn2p4KdE0l6TOiBMQIs4YybLFUeGBjCLpShPyghoJXRiO1MZ+7eXvtruJsYaG5lCZK2zZEGGQ4mKMUUwPBdTf46ZKduvl9SFWFuwUSFEOpZs5DqWYoIg9NFGvqYYSAxTr3B1e560D8n7KOVraOQyE8oe/AGF5QBISAiWJGIpggVnxvHM2ZIgtNMup+kYcyphtggAce8w1hULICsiSXdSyANZR24R4RQ+YfYyO3O2UigYtYoyBIyAVgLMvttuN+otEFxEUWRtZEzvKUEgZECCJHolLcgengkFsKG/G0gIZmsxap6aQZ5h7Tsz5ZnQ3gBom2mkb5Md2Ze+D0nyZw6z8ZH0SnORL3vUf1hBbzCWn3wzlgkN/X3KaSIQw5Pj0NllZTgYEa0I2Pt2s1XfqJOBs2QLxkUUltroJWc3b8tscihMvpBIr+pVevd+/12fv9Mbr5BsXZa1r2B/89k+6X/wj4RkUzqCnotA6K1L1p+n2TzuXrFFTxSyeQG9RwUyrXifpmLIJml3HwU0inIUjIZWiFAoFKenz0WFKoGcM64I56wNS21tZm+3ZDg2ZdIrc5NeciQf4mw9TRh09GVnZccGfckLgfQWN5X+Y4alD/uzHKZ3cumFPSS92aUDj1ooD8tY2KeSpgLB2akz1lqdW1aGgRHQSkgixN14Y6OxUWsRkXPGRWKtyVfwCxmRLESQzXtfNlc3zOKI/oRJPgUtO8IWIB89beZjZatwckPlb2bu6AUVedcm6gU3fZoi2jkhvKXgpd8QW3q2UB4DiTBLmjKAsbFyWEZWUY6dYdeKiDBzHKeNZmdpaa1Wb5IhZ8k6ZOsih+FO764jySOKMIsTZn1DpJClKGhrHEI96+RjpTAP1MuXwGRGIOmNY8Idz7Spp80JoJ6u+rQiuT/6tYLeeKn3ma1Ty1u/Db0BWD7gy6TDIuyFQJVyKUlSZoZozKIcM8OrlbCqqPfc6cT37609uFcfq04VihVjjLNkXLaMYEhwbL0RiTbN0ase6VWU5QOPPgUICfWamuRPAmYjja2lK7snRTe1spmTzVaHD92WwhF5yx6y9QDhny3lOP3zSjte9M4jxCwQMaa0sdGZmU6jyOWpHEU5FoZRKyFCSVLfbHfWN+rLD2sP7m80Wp3LX71gLFlnyJreklt5orS3L5AlNwD05nuySRZBtvQ70D/ekCxM6bMNtty/ksU7YbJ6e+a13wNbqloePS+z/RO7bPiYwYzp30BAYfVVgvni9mKpbJ995lypWNT13ZVjZIi0EuIKZk6StN3prm/Ul1bW6/Vmp516Ssen3QQVjA2LcITFkrflRjZfbSk6od4Nnk02b5nYQf8b/deSHw7oiyH6syFbEiG7aSCPXHZ+tq+gDZuzS1unvCVP30Col6QR6deKhFYPIszsJfHxFwv3bcFcnD1XLPRWsFeUI2eItMIiSZLUm+21jcbq2kaj0Yy9h8AVjCtHZIhMr4w0E8q24pAtH+x2Q+2sSdkd2tw4eyOfPN51+10bVfff0rK11mXTJ1lj/c2vZfNL6oU/PUsaCIQ4n//O8jvh7CxgEY8U6Zf37kfOnps+W4oKW75JinJUDItWmLnb7dbqjVqj1e4mURRNTY2HehBQ73EXA0Kvaz22RR3bYhD0TexsZka2qiF/f9s2227EvctLesOonYOb3uCqF3RsVvJv5oNCyiWPQXY93WYN77avN/9HhEM6igitVqtdrhQmIkPqFeUYGBatEJGzbnJ8vFqt5knWXA3b8gS7FZTsqhVsvUV3DH+2b9B/WNmZRnk0j1LPllM8YqNHvH1QG4RxU4jHDEVmWP5nlVPIsPzwEVEUuSiKeiUju291pNc0OGSr0p72l9HLzGB0v2PKSDMsWgH650RP2s1wxF/P5hSZohwHQ6SVk43e5crpQbu0K4oyYFQriqIMGNWKoigDRrWiKMqAUa0oijJgVCuKogwY1YqiKANGtaIoyoBRrSiKMmBUK4qiDBjViqIoA0a1oijKgFGtKIoyYFQriqIMGNWKoigDRrWiKMqAUa0oijJgRqA7nIj0rSK2BV1iS1GGkOPXCjMnSRLHMXO2migRWWuJKI5jAEmSEFGxWIzj2HsPIIqiJEmstdVqNd+RmZ11pXIpiiLVjaIcI0OhlVardevWLWZO09RZB2ByarJSqTx8+JCZmZmIxsfHrbVpmkZR5Jx78ODB2bNnJyYm1tfXvfftdpuZx8bGnn/++TNnzqhWFOUYOX6tAAjxRalUarfb1lljjPe+1Wp1Op3wfpqmGxsblXIljuNisQhgamqKmRv1RhCKMaZULFUrVRWKohw7tDNhccSEIKXb7YpInkYhIiJK0xSAMSYELMYY5EsE0ubuYS8iiqLIWuucU7koynFRr9ePXyvbCNeT+2Wfu+QyeopXpijKPqjX60M3wRziDmPCusv7It/4aK7wo48+OpoTKcqIMnRaURRl1FGtKIoyYFQriqIMGNWKoigDRrWiKMqAUa0cGGvtcV+Cogw1qpWDESr0wt+KouyKauVgLCwsAHBuKB56UJThRLVyAO7fv5+m6blz5477QhRlqDmZv3XTNB1sQFGv15eXl7vdbqVSmZqaGuCRFeXkcdK0cufOnVarBaBUKoUXg8I5V6lULl26NMBjKsqJ5ERpZWFhodVqFYvFZ599tlAoDOqwA499FOVkc3LulrW1tU6nMzU1deHChcEeWZ2iKAfi5KRsV1dXrbUDd4qiKAfl5GglTdPLly8f91UoinKCtCIiOlpRlGHg5GhFUZQhYSR/vT9q5aD8w/yz2oZSUY6eEYtWcnH0vwjkrx+1paIoR8MoRSsh+ug3yK7RSn/H7HwXDVsU5cgYJa3k7BqeAAjLG/Z7RG2iKEfPyGglmCJfF1X6QC9OCUupbmvKLyLhb1WMohwNQ7dO0E7CFQan5CphZu99o9Fot9tJkoQGKM65KIrK5fLY2Ji1tn9VkGAWaPyiKE+ZYVx+bBt5lJE7JQilVqttbGzkq8FvwxgzOTk5MTHRL5ewKKKGLYryVKnX68M+CMpztACCU5h5eXm52Ww+Zi9mXltbi+M49EYJZtFoRVGOhqHWys5ZZO/9nk7JCZvNzMz0O0XloihPm6GuW8lv/jxOqdVq+3RKoNls1mq1sO+2YjlFUZ4SQ60V9MUXIVTZ2Ng46BE2Nja894dYMV5RlMMx1FqRrTQajUflaB8DMzcajW2HehpXqyhKYKi1gr7CWRFpt9uHO0i73d5W4aIoytNj2LXST5IkR7yjoiiHYDS0EkKMQy/6FXbUOEVRjobR0IqiKCPEaGglTN8cuvlb2FHngBTlaBgNrQSiKDriHRVFOQTDrpW8vwERlcvlwx2kXC6HI0BjFkV5+gy1VmgrY2Nj4XHBA2GMGRsb23aop3G1iqIEhlor2NrqzVo7OTl50CNMTk5aa/v7xQ3+KhVF6WOotdL/FI8xxhgzMTFRrVb3f4RqtToxMRH27X/CaPDXqihKj6F+gnlbA/0QsIReB/t54LBarZ47d66/mRM0t6IoT5+h1gq2rt2Rt2KamZkpFAr7aePUH6foKh+KcjSMQK5Bm04qyggxAk0nc/ZskX379u2vfOUr2NEiG4C2yFaUI2MEmk7mhEmc/k76O59IttaipxX0+UWdoihHychopZ/+2eJ+X+RVLZqdVZRjZJS0QltXKQwv+qOV/iClv3mt+kVRjpJR0gr6ApCdL3a+1hytohwLI6aVwK5O2fNDRVGOhqGusj0QIV+rKMqxc0K0kqapiMRxfNwXoijKSdFKaNR09+7d474QRVFOilYAVCqVbrf74MGD474QRTntnBytPPfcc5VKpVarffbZZ4dupj1anJIvUxk5RqZ4f5+sra2trq6GVMtxX8vTxVobvsZKpfLcc88d9+UoSsYoPROk7CSO47t373a73UqlcunSpeO+HEUBgHq9fnIGQaeQQqFw5cqVqampTqeztrZ23JejKBmqlZHnwoUL1trV1dXjvhBFyVCtnAQuX76s6VtleFCtnAScc5ojU4YH1YqiKANGtaIoyoAZySeYTzn9bcO3vR9eaDNw5XjRaGWUyMXR/6K//+auGxz5ZSqnHY1WRoa8Mx622qR/A2xdVqm/md6xXLNyOlGtjB67hicAwrIE/R5RmyjHgmplNNhzPRMA3nvsWM8kX6hAFaMcGfpM0LCjq68po4U+ajjs5FFG7pQglFqttp+1YvvlElY70bBFedqM0vJjp5M8RwsgOIWZl5eXH7+yPTOvra3FcXzu3DkAwSwarShHhmpleNk5i+y939MpOWGzmZmZbasmQeWiPGW0bmV4yW/+PE6p1Wr7dEqg2WzWarWw77ZiOUV5eqhWhpr+QhXv/cbGxkGPsLGx4b3fVtKiKE8V1crwIltpNBqPytE+BmZuNBrbDvU0rlZRclQrQ01/2Vu73T7cQdrt9rYKF0V5qqhWRoYkSY54R0U5HKqVESCEGIfu/xZ21DhFOTJUK4qiDBjVyggQpm/CgrCHIOyoc0DKkaFaGRmiKDriHRXlcKhWhpq8vwERlcvlwx2kXC6HI0BjFuVI0OL94aVfBEQ0Nja2vr5+0NIVY8zY2Fh/t4Sncq1HxNL89Xm8/PrV8/3vvLfQCa9Ll77X/6lt3Loxd//itVdfPOqz37oxd3MlbHH5lddfngWAxfnr7/f2eyR9B/zoxtwn1Vdevzqbn/iD6+81vv5EX83TRLUy1PS3d7PWTk5OHnT1wsnJSWvttn5xT+dinzIf3Zj7cAUo9S8Ku/TB/NL5V669PItwp71/Hbvd20sfXH/vdgeYvnjkZ7914/7Fa9deRVDJezcmrr36LeD81devXUX2ZrNPD0vz199rvnDt1W9tPfu3Xn3p3tz8B1cyKwErjU5pbPrQX83TRgdBw0v/UzzGGGPMxMREtVrd/xGq1erExETYt/8Jo8Ff61Nm6YPrc/cuXvvepdLW92dffj2/02Zfvnqp1Fm6vbRt31s35uZx9dp3Dn8TPsnZX3y1p4zzV2ZLaNa2b7BPXvz2K1d758Li/KcrpdnLs4/d4zjRaGV42dZAPwQsodfBfh44rFar586d62/mhJHNrcy+/Po1AIvzh9j3xVevvQjgo+M5+xOyOYLaZHp6eqUDLLw/t7D53ktDNSBSrQw10rd2R96KaWZmplAo7KeNU3+ccvJX+fjo5kKndOm4fofvefaPbi50pl96+WCX9+Kr117clhVanL/+/krukaUPrs/j6usHPOzTRrUy1ORPMBtjgkSCJqampsbHx7Xp5CaL89c/XMH0S49O2T6KPCDIUqSHyYY+5ux5drZ06ZVrIefan+gFgJtzczf7d/lwbu5DhCvqT9Nml/ubherlS1isLQGzwEqjU31muJwC1crwk0cZwSyhqW1QRghJwmdv37793HPPYUeLbAAnvkV2lpE91EDg1o2bzcsh7XrrxtzcHACULn3vAMfZ4+z92dm5OVx+5fWXZ3tvAYvz1z/A1U13PCJli5WeekqXvnft1fNL89fnP1/E7Plb91dK1W8f6Cs+ClQro0EIW/o76e98Itlai55W0OeXk+2UEGxMf2fnrbgvsszLtpdP4+znr77+nebchzdvvdynn7VmB3vl4BdrzUxaS/PXQ35n9sp5vPebW1duf7oy/fVXDxygPXVUK6PHo2aLQ2yCrQUvJ5ulD67fXHl8ucqQnb1U7Z+RWqo1Ub24xxhmrdnJ9lppdqoXzwPA7Mtfn567+d7KwQKrI0MnmEcG2rquWJ6O3RaebEvTnuhQZenzxU7p8tVdC1Xm5m7cOvazL85f37yKWzc+XCmdv7IpkcX5+du49O09vLBUa27ZK9u31gSA6sTwhSrQaGW0yAWx88XO1yc8R9ujc/u9udt9H5cuvfL61WE5+/mrV29fzxOym1W2yOrrpr9zbY9IZ3F+/jZmvxdqc4NKNkdeV2vX35ubu3/YAeDTQ9cJOiF88sknL7zwwnFfhbI/Prox9yF2y/FuT9neujF3/5lrryLU+KJ0+VL19sLKlhmiWzfmbq4MU92KLj92QkjT9PPPP79y5cqhmycoyqCo1+uaWzkJLCws4AkasijKYFGtjDz3799P0zQU9SvKMKC/346BNE0HElnU6/Xl5eVut1upVKampp78gIoyEFQrR8qdO3darRaAUqkUXjwhzrlqtfr8888/+aEUZVCoVo6OhYWFVqtVLBafffbZQqHwhEcbVMijKANHfy6PiLW1tU6nMzU1deHChYEcUJ2iDC2asj0iVldXrbWDcoqiDDOqlSMiTdPLly8f91UoylGgWjkiRESHLcopQbWiKMqAUa0oijJgVCuKogyYUzTa7283vesGJ7+JtKIcCadCK9v612M3s2x7X+Wi7IfQ/JOFDZEhA/2RAXAatJIvDIjsh0B2jVb6G6/1ryV41JerDA39y789ehu047jW7pypVooRkXoFwKnKrUgfvIPw5qOko5w2WCT13E1SfuwPBIusNdufPViOfXp0Fzf0nPBoJUQcYYWd3Brb2tZv61Ofr6pz4tfBUB4Ds9TanUane35yvBgRHvFjIJDUcytJWX8b9XFitZIro98mzOy933PVrv7leE5JR1hlGyx8f6N+d7U2WS0XIveY/36BCIQBgQ6BMk6mVvIoI3dKEEqtVtu5xmiapmmattvt9fX1sKBXkEvYPbzQsOW0IYCIsOwdhQhh9zVrTzEnUyt5jhbhh4OZmZeXlx+/Ijozr62txXEcOq2FZTE0WjnF0J7/7wIINErZzgnUSr9QAt77PZ2SEzabmZnpd4rK5bRBIAN6ZE5FeSwncCYov/nzOKVWq+3TKYFms1mr1fIZom2HVU4HAhJr9o5ESEACaMjSxwnUCvriixCqbGxsHPQIGxsb3vv8IE/ulLBAsjIqhF8mm0tGPnK77NeOOqWfE6gV2Uqj0diWo90PzNxoNLYd6tCXFKacwt/KqCCZVvbeUHoaUgInUCvo/QoJLmi324c7SLvd3lbhcmh0HZ/RQ0ACS/sonBUyvXGQEjiZWuknSZIj3nEbuo7PKCIAQx4frQhEJHssSEQDlk1O8u/PEGIceugRdnySOEXX8RldBMLyOFeEwpaUfex910vM7FnIaGofONlaeXK++OKLJzyCc65SqVy6dGkQl6McFYLwXPKjxCIiXqSbpgtrjV89qN1e704sbbw4SzNjZbOfcpeTzknWSvjPdc4dLmBxzj333HOh4jZ/XGj/u+s6PqNIGNSkzBudeKWV1DtpvZtG1hac7S9caMfxeqvzxWrzf95Z/teHrYZHq3W31er+3oWpmfFqueCsMafZLSf/5z6KosNpJYqiJzmvOmXkCEKJU24n6Yd3V//7nVqz2x0rPvzus9OT5WLknCECgZkfbtTf/9fb//Tl6sN22kqIxX1q/NrS2iezpf/03a9/9fxMufiky8uNNCfzRz/vlkJE5XL5cJNB5XI5j1BO82+eU0LIlaw1mh8vrf56sfa7jWS5y2nq//azpXvr9d87P/H18zPj5ZI1hkW+vLP4q998/HnbJL7ovWFKOuAGdVaXNy6NR8+eGVetnDT6RUBEY2Nj6+vrBy1dMcaMjY31d0t4KteqDA8iLHL7wdKNX3/82wb56oS3EQNfrNcWF+/97nd4/T+89OLl5wqFKAUqY9VCtWJSD0/CLEAKFmJvUS4W3akvfTyZE8z9rd6stZOTkwc9wuTkpLW2v1/c4K9SGT46rfbDtVotTlOy5KyJbEK00up8+uW9xeW1epxspLKWwp6d+crvffOrX70wUbUQT8IQITLVSvXM1JR7suHzCeAERiv9T/GEtgYTExNxHO//saBqtToxMWGMMX2JN+2NcLIJPy3nZqZnzp5dbOPMmWq5XC4YoFNepVgiWaTCB0t1OwYUigmKE89eulIo1O4+WOMuUzGUzREZQ0ZbT55ArWzrhh0CllCNth+zVKvVc+fObZv9UaGcBghwUVQqFS6US1eenx2rlCMyJu1ulHy3PYVy8e7GWpmo6ooEY52LrDXwJJ4oq8oNhfzKCdQKdrTaDzHLzMxMoVDY2cYpxxgT2jj1xym6yscpovc/Pl4unKmUquWSIaqQ+frk85EkaZIs3F3qdNsWQkaIxYoY2YxMJMxPQ58QOqFaybMhoYMkej2ZpqamxsfH92w6ua2pLTRaOTUwC4sYQ86QJTJEzppK5MoG3U5acNQBcWYVsAgLIBR+RCQfL2d/y6kdDZ1MraAvytjWm5aIQkgSPnv79u3nnnsOO1pkA9AW2acQgXgWIRIQg0TIC1iYmQEy1oIMgwQSZGIAUPaHKDwbtHms02qVk6uVQAhb+jvp73wiOXRC6U+jBNQppw8RQIgMmXwlMYF4L55YGNY4Z8hl8Yo44ixGoZ5atPkKgBOvlX76Z4v7fRFik/4NjuXylGFARAiwZCyRJRAEoccgmAUwRCbog5gpYeIQkoTulGRE6NTnVYDToBXaukpheNEfrfQHKf3Na9Uvpw3JekcSkfEgDyKAGSk4gWcvQgRDnI97iEBbmmSzBDGd9vrJk68V9AUgO1/sfK052tMMswgkCz4gBoDAM6fsRcQAzpAlIQo9EASbCdqsRUv26hQnVnBKtBLY1Sl7fqicEoIdmIUZZMhAws+BiKSpWO/zzIsXAOTFJCAP9E0x69xyxinSiqI8HgFSES9sAQ/yQgBIkKbepgkABoTC5I+QsGHJ1jSUbOEPYsmHUqcZ1Yqi9Aitm/KIlYQEJMLep3ECIiIb5UsokBjikNOlkE8RkAYsAFQripIhACAsEIkMRUYcOKRe2XOSeiKCi4yxQgYwDOOpV68futrSplJOd2pFtaIomwggQsQwXqwRIyBDjqOyYYixHBXZlQADIhGCZHPLAIEByprLabyiWlGUQG9ahwjGSDamAVsr5UkqjiMUYFsbohIhthAjQSsiIJGs+e1pl4pqRVE26eVfHZGDuDCoIcBEBBJhIyCQiPSiE/QmlLNxUB6onOYREFQritKPZ2HJU68kBA4JWYDEeCAzhoBFvIS4RSQMhzLPnHanQLWiKDkCeGbP4gWpgISAXsXbliBEAHD/Wh8CoSzWIR0DqVYUpR9mL+xNb7XCvISWIERCQpRX0ZK34DxIyYdDClQritKHMIsIDIwVseL7S9sY/S2NKU2p68nnHcHCQOixCyGeHlQrirJJCDi8SOKBrbmSzaZMAoDEk3D+PFAovIV/osV1Tw6qFUXZhEChUZP3YjOPiOSPJwO9QhUhFtMrUwnbbX806BRnblUrirKJgIiMBTkRx2yImDh7pj1MEAkH94gIPHqtsYNF8hzvaUe1oigZIvAQgKwQPLj3yDJnUzwmb6wvEE4l8eQlq5rLIpm8HO4woYps9lnIunUP4Is6FlQrirKJ98wiLOS9gCTr0JS1fAvpWUF4XlkEwtl0cu8J5tAE6hA6EJFUfJxywgIgIlN01ppRbQelWlEUIO/DxF6YwWCBZQGJCZ0nIQSY3j0uAohYCGWFKr1PbEuy7PPUIiK83u7+bq3x5UZdGOfHyv/m4sxYIbKqFUUZbURS7wGOSBzEAuCQRcmW/0mz6SAjoNRz4rcMeESItzR12uc5JWWuxfHN1dpvlxsLq/X1Wvub5ya/PjNVidyILuasWlGUDAG8MAs8U5oAnKVhs6kg2ZI0EYawSK9uRSTrQXnQM6YijST57Vr9k7XWesK2WBTX7aTseYSnqlUrirKJF2GhlA17YgmLAVFeuQIIkZjwJnsjfuvaMJub7hdBN/Gfrzf/5eFGrSueUSzY89NjE4VCntEZRVQripIRUihEcBALsb32K71nDUMiRbIqOBYJc0VBJBQSLQdQAYt0U/9FrfmvK/V6V3xYBlFQctHUWNk6Q2YkEytQrSjKNghkRYQ9U9+DPr2i/F6NirCH99QrlQs7HqBohUViz/eb7Y9W6kvtJOXQtxLGkDPWGms0WlGUkUcAIWZAjPcmTskJUb4IkGTdbbOPhIQhPpTtU2/37Dh7FvCLSMqy0u7+emnjTqPT9SwGxhjnjAGBKfVgHuGni1QripIhkNRnqdJMFQIiMZJ/GNIqYQPvqDfoIaKQd9nHqEVEvPDDdvfmyvqdZscTuSgK+V7vxTOEkRTEZ5mdkUS1MnrkKy4+6rdi/tkRLaY6LkQk8V5YrLARNr1RUKiiZbCEmloCID7lJBHhfFxEvRxLr35ut+99eI6xHqe/qzW/bMUxGSEjAubQnJvC6Rjwkg+4Rg/VyijRL5RHmWXb+yqXfRKGHKlnFnhPPhEYljypIkEdQC9Ly56yVnIANvO2e58nFr7XjhdacT2R1JP3zFkDS+oV64oIUvAeRxpiVCsjQ76SNLK6TNk1Wsk9sm3x6aO+3JEkOITEw3sfHiqULXlYyavzCULkCZvjHgIMTP7pR5yA4hR363G9C88mezqAJD9L76lGEa+5FeUIyYWyq1n6PaI2ORgCkmym2LIYwwQjxKDs2RwChAQCA2IRm2U/ehbpLe/xWBuIZ250knY3ZYE11hj2nn0ovctDIox270rVymgQTMHMAJhZ+kBe/9lTSY4xRkTC36qYg8AkQiygsMyhACbEImGehwXeS5qGXvu98SZICL1nDx85IBIgZU49YmZjxFmyzhoB+/AfCwAivSHQ69MUUAAAIABJREFUaCZXVCvDTq6Mfpsws/e+0Wi02+0kSdI0BeCci6KoXC6PjY1Za40xzBx2DGbB4OKXtbW11dXVNLuxDs+3vvWtgVzPABGmNEEsYggCzutUQuqDKDOHF0m98FZhC/KFPR59fCAVYYKAPIuIGCJjyFpjLdgLszCQjvAYSLUy3OQ/tLlTglBqtdrGxkYIXnLSNE3TtN1ur6+vT05OTkxMBLmE3cOLgYQtCwsLnU7HWvu1r33NuRP1IyRMEGIvKYklDpkWICRZmIiytC1ly6oC6I2Aet/XvWQgApHegQgI9bpeDJMxZCysJWN65XcjGKpAtTLk5DlaAMEpzLy8vNxsNh+zFzOvra3FcXzu3DkAxpj8OE/ulDt37rRarampqQsXLjzhoYaNMPuLMCUTJnuzdEfmYhNKYYkAeGKTNakkbPuuPtos4YgMAL3j91IzzMLMxsBZY50d3cp9qFaGmX6hBLz3ezolJ2w2MzPT75Qnl0ur1SoWiyfPKUBYUcwDsISIYCg8W0ig0GYpZFJIiAASFvEiwn1SoV5e5fFngc96yPGWaIQIAmFhAktfT/8RRLUyvPRPJ4c4pVar7dMpgWazWSgUpqam0ItZ8GROCUmcZ5999tBHGGZYJGVhhveIBRQ6YIexCoWYIpsFJhJh5rS3PCohny3aI8cqYBFm2X2EQwQiY03qfepZcyujirVD3Sgnn/0JocrGxsZBj7CxsTE+Pp7XyIUMy6FxzhFRoVB4koMMJyGAYBZheC+psJEsjYJQsN+Xmc3qbjkfxvRqVbZ0idvtLHnsiax8t29LIYK1RiBpyp5HuMz2iX7IRp0wkRHH8XFfyO7IVhqNxrYc7X5g5kajse1Qh76kOI6H+Tv2xMjmXE4Y8IAMYEksiYFYEktsCY7IEayRzQa32PLvY2CgV/G/XRjGwFryqXiW1I/ws4anWithFuPu3bvHfSGPpL/srd1uH+4g7XZ7W4XLoQnfqxMZreRYQsFQ0VLRmqJBRDAQA7FgEjbhoUAW9sJe8P+z9y4xlmXXeea/1j7n3Fc888HKZCWzzCalIimrKRVBi2wbtkTBHFkjUT0RCaPZaFEaaNJowKAGPWzChhoQ0BBI2UNSE7c0MLp7QsMEbdhNEWzRKtN8lMgiWVWZlZmVmfG6cR/nnL3X34N97o0br4zIqMiMuBH7q6qsGxHnnHtuZNw/1l57rX9Zs7CETnMsR7Yvg4zjQXYdqSqZ01A31Ss2+ct/Ri/zmXLZF0Hdbnd7e/v+/fvnPwdZ1/VzPnEPb7/9dlVVV69ePZWrnUOaEIVitfgAE8auP4tv76Y/uYlogqGuYQBVOKk/nJj1H6oFBEJM2U66oZv/BM5JCBZ83HmaGDLMJ5ddVm7duvXmm2/GVOhLL710Pqsw4q+tmC49AfHEd7n2uXv3blVVRVFcu3btxNc55xjpzYLB+6gV0ze2TCrzMZEMaazh4hdVRHXHTOEJkBbr3WZrXgDnBIAPxqb/WZ7aa/s8cR7fRc+Z27dvx5rR119//V2uEc4tP//5z0987jSrffXq1QusKQCD0QzR/aBp/pOpJ1xj6SSN6cq0gUhEBNrEF5yWyB32HNOYCJNgBVAnohJ8mNlygn9XSbAzJskKAKyurq6urp71XexlT6n+nTt3ThawZFl269atWHE7bRd6qivEOOUET32GTNwMmhrZI1/xNGGCHe/ImYXIZGkTy1ZECDPdufiOHJBHWeY3YcokEFI4RWOPgJ1d6uS8n3ge5Hl+MlnJ8/xdPvV8aUr8NW9kIHwIJIvM5ZOynSedaCTNieTCTCz6NUlTS0uZ1MiKNq3M6qhK0UZWpKl0wZPzrLGCd1o455yQsLBrTTTdjZrP/eUkK+ebqcuBiHQ6nZNtBnU6nWmEclH7mGNjMYlgVoawXVYb4+rhoHy0PRLwY+97z3uXetlRr32y+SI6tXubVMMaGyuWyR80o/c0KkRFY7e4SNPu/IT7jD2EzfChzKmQvqmonb29OQ5VkGTlPDMrBCKysLCwsbHxtKUrqrqwsDDrlvBM7vVMMbIONqzDVlk9Ho4fDIb3NoZvbw3f6Y8GdX1zqfeB6ys3FrpHVFNMEibBUNbMhBrnic2WpJCYplRJC7tsneLi6cl6YKDRCBOhKJwT723/rg/BMM/KkmTlXMMZezfn3PLy8vr6+lNdYXl52Tm3xy/u2dzs2UCgNntnVP50Y3BnY/tOf/BgMBqMfRXMB8K54MTzWA6OzfvYYEaD7Z3PMc2xxi3mZjOHVFIbR7cY3exU9O+9VcadIJIiVKcWoont3kNJhPkVlSQr55npTkA0ZAKwtLRUVdXx24J6vd7S0pKq6kxm4eIpSxX4883R9x4NB5V5ba8stJd6RkJEMqfXunm7VRznBcdshsQ2QkznoE5q82fe5xLXXNZM9qE2ceDxngUQcU6NFqaJ2T0t0BQLc+u7n2TlPLPHDTsGLNHr4DjK0uv1rl+/vmf354IJCgCA3rhd2bC2mgKIKhSqIlnmVBBDtePsBMWSkibWaBpyJt+xmSkfcbUkNEizeQNxMZbZiVEOerq4fDKBOhXS6piwmbVe2X0/c6srSVbONVNNiQ9izHLt2rWiKPbbOE1R1WjjNBun7BGpi4QBdWDTDCgiKk4FAqMFT3PZ8UpAGMzMgorLM7hJFKGxdhYm8fEkPWxk5gzaWMZNPK755HI4QgDJnIxLjxgZSTTc33sWp/o2hyRZOddMvRGigyQm/gYrKyuLi4tHmk7uMbXFhYxWKM0bXSAQdeqcmpmvrVnRNLMKj24HNnLSN6xAox+xLC2mUQRhGlkY4Ws0vk4zSdfpeNWDbhWTBsNYVNesrvYfTyDwCIU6zyRZOe/MehrMetOKSAxJMMnCTKOSWTUBcOEtsgkGoTjJVADxPppNT1zXSN9MY3+iEQphtGDwAXVJv7Oama1L2/kmRpfs6GYQS3B5ZKehgGAdjBCXKUOjYgfcltAfWVZ3jkmyMh/EsGXWSf+wjuTZNErkYmtKXC6IkzyX0jN4ayKXxidFiDhyR46IVQCLFioGC0HgmvOnTUAAMJ1fKkZMTPnjIgiY1MvZoXERCdTeqjoYoaoS62tpu8VIdmKe+ayHS7Iyfxy5W3xxs7MH0iROgeg2MO3iad6RTVXr0b/5J29kkrS4uzNd3Ez+P5MDaSrwGme4GA2RfPJONieb0z6QCKqSZUJo8JxkyuIr0FiJO6fxSpKVuUF2TymMDw6LVqbLooseqjQFr6Oxr2sTEZeJUnZGn8QakONch5OZhhCh6Mz27q7vXzOCOSZxp+VybNwNJqp2SGgkJIJNnOji3lNN58SpOFWSwRgFJRjn13Uyyco8MRWI/Q/2H3lhc7T7MNIb6kDARFVVndNo/xuXFzbpOXwSEyN8J5KruIl4TBaTlJitiYb4lNrgMkgNTGKZSVFu82T7v+9s3Fsa4zlOPuu9CeicOudEGAIFiDOITu+b9FxJsjJ/HKkpx/nqRSKQsSbVAIS4mqBzkuWOpOq0AuSJiQoihAASFAY1jds9nLT9xUZEEIQYIEbW42hnu/Pmn4Y8T3iegzKxYgQ9fQiZkyJmnietzPNIkpXE3BOIZmN4Mh2MhPdmFrSZuXOs69QhmBkDKrPY5iOEzmiRTTeaIWyWMWBcMwkgjSMlD10E7exU79GLye8A+mAhMM8Uyh0H7nkjyUpijmGzMTytFdmpcRWZbgdxYjb9xA1m0JuZkcZgcXeamIxYZ9NJ2PQaclK8j0Z+Ym2vTmz6D2PapiiNOB10kNHKKjz2o9IvG4t51JUkK4m5xxjL0pqcRnyPOxVVIeBrKys7shqOgAVrtoxtMhisSVDtuKg0e0uTvsFY1Du1XIFK9JY7pHg/9hCyGQ5yyP14C5vb2xtVOXrpPaHbhps/H/skK4n5hoCnBZoQqlARpypCGr03IzKntdnRuyqETQvmd3KvzZcou91QYpBEilIajwOFiRqe0CAY8zNhWrW7v8GQZmaPN7cebGxdbeWVn3YozVm8kmQlMe80bnCqEOfUqQUGT1pT9mpxV+VYeQoBoAKnE3UQkYl9k8RJzCKxBVkB5ygizTR2B4Q4RVWa3MlBTxX9VprnmsnJEgQtWNjYHt5b3yp9VWcuhHnNriRZScw3cbM2yzQnPFlXvtm/BQDG1YgdY0slrmtEJculIMVi62JUJiMQW6xipCFOIFkZnEJjx7QIoE0785NTOGC0sNy9IUQaw+ZwePfxxrCsEQMiOca++LkkyUpiniFA+EAfUFchCJtM6MRpQCZtQZNStydciSEEGoNH7TExhguI7cViIQiaat1oyVJXZc2CohAFtcneNs9xSDkRITbTGzntTyS4MRjdfbw5KCsjVUCKtydvVZ9fkqwk5ptYkBoXJnFSsuwYUDcrmJrHGJNE+GBFzsVVu+G8Y+yAYLOpNDUwiB8J61DdfbD5sBqIXIECqlA3sU459LnYDDObtYVioA3Go/vrm8NRFYLFLahAerM5bTdMspKYb+KqQp1mucbkBxgrjKOzLDUTk6NNJwnUIaws4pXb+NDViowO2aaKST9hVBSQcJmMy/F/+k/3fvr6NnATqlCNJv3TnO8hm8f0NErswgCERhuOR28/Wt8eln7HQIeBoflwDsOVJCuJuYYAa7PKhyoEgNPW5elsIJnUyx9JCKGV2cqCgWsbj8dFkW1tDbvdYjSq86zlQ13k2ulla49Gt25fWepl7dxrdGBxAoHFMGZnIXTAzTY1dDt7TByMR3cfb6wPx6Fxipt+ZcaRbt5IspKYY2I5XB3MW/SfxTSzMm0xVnJc4sgtZoIhUEWc8MHbD773N/evv7Dy+k/uvffFq48ebS0tLo3Ho4Ve94Wbvb/9waNer1hYWBIJ0iR2JTYL7bLqP+xpmrGJseytur++tTUc+xBmFYRNFoZzqixJVhLzDYGoKdPSVSJ6rxlpdQiDUYUxyhevgK0nhBHxT4UoZPXqyod/KStaeW+htbjUee+tK0Weh1C3W63eQt7rda9e65IW0yQi0swoa24HT1AWm/QnkVbW1dvr62vbg9obiT0F/WbwFpdx89eDnmQlMfdw53082VgRC8GGo+H9ja2q9uViZ+SDge7w3/wEKKKKdqHvu3bt5ntXQ20+iDhREacS86equH0bLtPhsIQ1XQIUAUmBaazAPVQGAhEgFFS+frC+/nBzK9hkU2hyH7FMxhjqWLgyZ5ICJFlJzAUkA60ybzAVcaKZZI1hNSd9xrH/jwj0g3K83h+u9wdj7zPVyodgRyRYYkZEARXkmfhR+PnP3/nxaxuEvnBj8cUXlx48WH9wf9Dttj/6Ky+uXunIZJeoqZHb2V4+tDA/tkKbsfLVO5sbj7cGPjT7QvuOFUwteFM5XCJx6kRvgmEofzK43/fbubqVrHer856OKwRqZLMIAskwqsr17eFafzAsKx9IQIU0o1k0LZBD3qPTrEgsdBkORq/+55/+P//mJ1nR/pVXbt3+O0v37j189bsPrqyu3Ly5vLzUnjlhJlV72NUnz2G0OtSPtjbWtrZrH3ZmjUQbKAKgCURU1XGn8mbOSLKSONc0cQr9g3L92+s/2vCbKq6r3VdW3v/fdG+sZIue8GYhsLJ6fav/cH1rUHnaZOhg03dMo1WhNobC5dp4MYHTBAkQzGoLBIVUg6/C9na1tl5eu94u6/J733tzYaHwdb3dH/u6poXJds40nGhCi8Yr8iATJ4LewqAcjkdVkTmnbrYiLh41CYJ0McucU04zRUdPOjpHJFlJnF8CbeDHbwzfeVBu9MNgm+soHge6vnX/emvw1vj++9svtmTh0XjwsD94tDnqj8Z1CGHvgB16hgfl2vrmvZr1Lyy870ZrtXCZmW3Ug7vjR0OrVBQVtqpBoAdj645ZCKAtr7TrOrzx0/UP/OL1pZW2r5rB7jBr6vCje4IQQpnWrezOsxIwWm1hazR6sL69NfJVMDY5mF1Ls5h2FujYOKqq2vxmPRibX8haHVeo6FxEL0lWEueR2Oy77cdvjh781caP1uutIEPJtjqtLcJouWd2zx7d769J6L295e6ty3DMQKFARXb2mAUugxWjH4x+ksm6uDoMyo77yFVZGlv9Wv+tV7d/1rexU7S89CtrSUzQGC0ILctl9Wp7uz96/HB842a9eqW7uW6AwAia7JTJEKAotJAxqm0bt63IxTXVeYRnGPjx/dHa3cH2xmg4iNb7O3b9u1963K8265ejR/Xa/fGjd8rBRxZu/ULvvW1XzMWuUJKVxHkkkAM//s+bP/3e9k8f1+tF1m+3NnNXZ+oBIPNGqTy3xkXgls+LzlJb8lao20Cm0+IVWlZgcdH3VofbxePFYq1QvuNbj8oXFl3ncd3/yejBvXrDo+roAMXYX3ELW9dVzKLzikivmy8s5j/58fpwEDbWxu//4FIINUiYwUwmLtkQEzDvcGkl/3nrrdZm+av6wRv5SqYZgEB77Ld/Mrz7g62fvL2NjdA2Zmys5mY7iCarJxIiBj6o3/mb4Q/XONwau1xws7VaaK5HDyY5e5KsJM4jwcLj8eb3t9946DdFy257M3djFTZNwhBCgiHLtxey8WJLlhd7G/0rmxtWjlrjfu6NFGSF73TL9sq4s9BvtTadG4uI2cbW8M7DUf2aX3tQPjKWRTZq5/1Ca3cty9vllivr4MyoIi+8sAiEzY2yDlxfL/8O3ZWruao0dXgCdVClEc6xu1ivXCvZe3jfHv7g8XoZrvcsV5Gh8se6/pa87YvHWa/TWblSlAtVJRZ00hu0SynUsbtQLS9VfnFrU9dUQxvFurV+Nrreda02ChcNvHF+8y1JVhLnFFXXy9o9a6tj1+WZwokaLZe8pZ2RlS6vqmwr0wBIngc4da16uN2rx91yoFB2euXq9e3lhf5Ct9/KR6oBlODWHw6/H7befsv5UV4X+fZiq59nlQpVMObwb7lx1VCZaSbvu32lPxgNB96MW1vj0TC8cGMhV9BoQrfoei/4cmk0dHWRh063bHeHRWeDwrfKstzafGmYtwwbLf94ZaPqbUDrTre+/kLmWth4XAy2WiG4ndxys1vNVofXbpbLy1vdpYfmqkxDS8pB/eDHw17PZdfzlSXtOGhjSQedjlxt9pV2jDebzzz/v7skK4nzSKbuhdbyb1795c16u++3B3i75WwxW9y2rZZ2rmc3tsL6T8sfPgx3TQCwlfsri5stlw2sp90w9hCxhaxezqqV1qCTDSFGAIraqi0MKrot51vFOC+GrawUMQHECdvbWyF8X/rLcO2ee49rvfXdtXIUaDIe+vXHo1/+5SudNoFQZlXxkfYHPmzL5b27j/K8HToL286FTEG1UV6u5/1r7MDLO51yUGxJNhag0xoBm1QtWq3tRb+90R5uZ94rSBHkhbVaobtULfTGC51xkddOvQicGt3mhr32HzbvvNff+AW7tlR0s6xQzVRzVRV1Tp2IE3UqUXFUxWVZW9U9/3RMkpXEeUQhhebXi5Ur+VJgIN4nAhVnDCqqcCvuPW307oVrD/wdIRfdlUrD0vLthYUXuOzqcVWN+55973LWuYWe0Veu3i7KPvAITrqVtgcLxVA0aGzxA0DL3Fhd9Qj9Kmv1ruTjh7K5WZlBVSjY3Bg4SrtwpVQPdH2zN8zFr3Q28+KNIAIXuq2xc14k5MWg6Jhsa2BWdgfm6pjfdQjtfLjaYzvvtNu97kK9+ai99bgItcvb4cqN0erycKEz7HRGndYgk+AoSlFqQQ/ZRjb2Yw7HlvtVjW3TaIIVEW3CHVGIqLhWsbC6+j5Vff4BS5KVxHlERJyIsgAAEOjOfA0ACraLVvuqvfelsC5gS7sAWujlaOuiMvjAuqqH43J7VG3WfhBCNQrl277/UDYlH7RbI3G1SqykByf7uoBB6BlC5lavdNfW6ivLbX2fM4MIVpdyZ86bPbS1n7tH48yLWMvVeb4eRyi6KFKAwDIJoqwLz/Y4c2bUaJ2dOd+TYSHIQ2uRbnWpGozFl8xaVbdTdXvDlc5WoTXg8zpbKHMAgPZGreBIyZbrosgczRt0YoK3+1sjgIhzxUL32lltGyVZSZxfZtMEe8gkc9pra3clu4rGsokCbQrKoh5xOViow7istsvxYKvqr5ePWwhOxy1XChxBozFuKgOAKOBMC8t76C62e8u33fWrK7VveqPz3HUX3OPh4F57YzMbBQDQDKTWmVcXnEFMRCh5cL2ynbOgcy3pkTmMpVQUOmaEdKzXtV5uRdZy+QuCqjTU2+Rw1F4skUtd5r5dt5aHRW7O1Dm2xOWSuSxvO8lFZpqld9XHxFSydNqLne6iqpNjDkk6VeR4ThSJxDmlsS7Z91O8q47WzCxUVvb98EG1XtVroV63MK61qrSuxQtoYC0s6NpW9PxCt+pktYoh1tPGS6qKKJjbdj7YKvp1RiLkXmoJrdp1xwWEwUElL9AqQlGwgLoy96YkMNYxhIXlAsmsyEKuVKHACAugmcBUM6EIKRQ2pv7QODREEfO0Mk3HYpKaxaRzQCBwrlheek+rtehc/vxlpd/vJ1lJXHziTB+jeQu11cHq4EdVPfBWmUyqRwgKVNTBKbOMbuIGJ9P0RbQpMGHQEMSgzVuWgMbZHtTJbow0u+GYeGAKAixeSiGgRqu55nxOh8M3OzvkdIUTnzwej8a1blI1JxM7cBE0dlJxYJHmTvMjHbufBUlWEpeLyU87SZI7RpSTuWUxL9LY0U4SFQddR0CgsaOcPYoCgBI7g2TSjhhNdgFo88V4eQFoTbn+zvi0ae+hCZsboRiiGIGT4lwDVJvegXhiLPkVAk2kc0Ztiv1+P+VWEuedaX/N/l+BT5uSnDleZlYH08vOXO3gh/uyGTPv3KmRmzTekdIUu81eiLve7KLamHs3+jArBLrT2gw3+2wCIH6GM86aE0OGyWfOslIuyUrijDGzuq7Lspyqhog45wDUdQ2i9rWItFqtqqq896qa53lVVc65Xq9XVZWZiUgIIXNZp9vJ8/yo59wjR0/xDnzCoXLgRwft1cz+Xw45cPqJQy6w52q7rnLm7YhJVhJnjJkNh8Mf/OAHAKqqiqKwtLTU7XYfPnwYB4iq6sLCgnPOe5/neZZlDx48WF1dXV5e3tjYCCEMh0OSvV7v9u3bqyurE+eDxNmQZCVx9uR5rqpFUZhZlmWqGrWmLEsRabfb3vt+v99ut6uqKooCwPLSspn1+/3RaBRCiKf3uj00udckK2dJStkmzpi4CIprGUwKRUWEZAgBgKrG9MrepYtIXPvEn2FVzSbMhXvARSXtBCXOEbO5lXf5Y5lk5Qzp9/tnUIGXSBzINE6ZfXwynul9/uhHP3qm178AJFlJJBKnTJKVRCJxyiRZSSQSp0ySlUQiccokWUkkEqdMkpVEInHKJFlJJBKnTJKVRCJxyiRZSSQSp0ySlUQiccokWUkkEqdMkpVEInHKJFlJJBKnTJKVROLpiIaYiSeQZCWReAq89ySrqjrrGznXJFlJJJ6CLMsA3L1796xv5FyTZCWReDq63W5Zlvfv3z/rGzm/JFlJJJ6OW7dudbvdra2t119/3Xt/giuc7Kw5InnZJhInYX19fW1tLaZanupE51w8pdvt3rp169nc3VmSLLITiTOgqqq7d++WZdntdm/fvn3Wt3PKJIvsROIMKIri/e9//8rKyng8Xl9fP+vbOX2SrCQSZ8ONGzecc2tra2d9I6dPkpVE4sx46aWXLmT6NslKInFmZFl2IZObSVYSicQpk2QlkUicMklWEonEKZNkJZFInDJJVhKJxCmTZCWRSJwySVYSicQpk2QlkUicMklWEonEKZNkJZFInDJJVhKJxCmTnfUNJBLnFJIiEh8ceMD0q/FBYkqSlURiL7OCcpiy7Pl8EpdZkqwkEruIAhH1ghMOOwxAPHj65/O+3XNJkpVE4mCmgnKgsszqSFKTPSRZSSR2iEphZgDMjDNgsuSZSskUVSUZ/0wSgyQriURkKhmzamJmIYTt7e3RaFTXdXRyy7Isz/NOp7OwsOCcU1UziydGZcGlj1+SrCQSO4mSqaZEQdna2trc3IzByxTvvfd+NBptbGwsLy8vLS1FcYmnxweXPGxJspJIYJqjBRA1xcwePXo0GAyecJaZra+vV1V1/fp1AKo6vc5l1hQkWUkkZgUlEkI4UlOmxMOuXbs2qymXXFxSlW3isjN980/jlK2trWNqSmQwGGxtbcVzpyJ1aTUFSVYSCczEFzFU2dzcfNorbG5uhhCmFzm+pjjnnva5zj9JVhKXHe5me3t7T472OJjZ9vb2nksdeVbcWrp4o4KSrCQSmC17G41GJ7vIaDTaU+FyJG+++SaALLtoKc4kK4nELuq6fj4n3rt3z3sfd5EuGBdNJhPzjvf+rH57xxDjxEuSeOJx4pR+v//o0aOyLLvd7srKysme7jwjx4zWEolnzZ07d4bDIYB2ux0fXGCyLCuK4vbt22d9I6dPv99P0UriXPDmm28Oh8NWq/Xiiy8WRfE8n3pPqf6dO3dOFrBkWXbr1q1YcTttF9p/2BmGY8+NC/7yEnPB+vr6eDxeWVm5cePGWd8L8jw/mazkeX6cwy68piClbBPngbW1NefcGWrKbFNyp9M52UU6nc40QrnMtXBIspI4D3jvX3rppbN6dtnNwsJCbBd8KlR1YWFhz6Wexd3OBUlWEmcPybNdGswaMjnnlpeXn/YKy8vLzrlZv7jTv8v5IclK4rIz28Wjqqq6tLTU6/WOf4Ver7e0tBTPne0wOv17nRMufvYokXgye9ywY8ASq9SO03DY6/WuX7++Z/fnMq+AkGQlkcA+q/2YW7l27VpRFPttnKaoarRxmo1T0pQPJFlJJDCTDYkOkph4Mq2srCwuLh5pOrnH1BYpWjnrG0gkzgXTKGOPN62IxJAET7TIBpAssqckWUkkdohhy6yT/mEdybNplEjSlClJVhKJg5ndLT5znMXWAAAgAElEQVRQL1J29jCSrCQSu5DdUwrjg8OilVnz2qQvU5KsJBJ7mQrE/gf7j0w52v0kWUk8V3jIsPQ9ztLn4Zf/kZpynK9eTlKVbeI5MTs3Y/pgNid64AHP/TYTp0CKVhLPg2m2ArvVZPYA7C51nU1wnMk9J05MkpXEc+XA8ARALEKb1ZGkJvNLkpXEMycqRRSO2cHpsyUhIQTsqzGbFo8kiZkvkqwkniHTXZJZNTGzOpR/fe9rf7v2b+9tv7pZ3gWwfO/Fmwsf/cUr//hjNz+bu9aeUte02zJfXHZjiMSzYxplTDUlmsV+686ffeONLw3qxwee1cuvfuqlL37y1hdm221idXwKW+aCfr+fZCXxDJkuc2zC//nD3//u/a8deeIrNz77Ox/+ik5I2ZY5IjnvJ54V+3eRQwh/8aM/OI6mAIiHfeZDX95TyYokLvNAqltJPBNmTdJinPKtO392TE2JfPf+175158/iuXuK5RLnnCQriWfFbKFKHcpvvPGlp73CN974Uh3KPSUtifNPkpXEM4G7+e69Pz8sR/sEBvXj79778z2XehZ3mzhdkqwknhWzZW+vrX39ZBd5be3reypcEuefJCuJ58G97Vef84mJMyTJSuIIHlTVuzk9hhix5u0ExBNTnDJfpLqVxKH8k+997z9ubgL41YWFb25snNVtjD7xCVWNw72mVo+Jc0uqW0kcym+++uo3Nzb+brf7r3/pl17udp/29NlS/RDCv/jWR9bHb57gNlbbt4EfJCmZL9IiKHEAf3Lnznf6/c/fuPHqxz9+Ak3Zz82Fjz7nExNnSJKVxAH86d27K879q5dffjcXmTWmf/nKp092kZevfDqNCpw7kqwkDuBn4/G3P/axd3MF2c0rN3+3l1992ov08quv3PzdPZd6N3eVeD4kWUkcQCBvFsW7vMisIVPuWp966YtPe4VPvfTF3LVm/eLe5S0lng9JVhLPhNkuntiF/MlbX3jlxmePf4VXbnz2k7e+MNvBjLTTPCeknaDEM2GPgb6IOOd+58NfwaQ7+clMjRFm1z5pBTQvpGgl8azgZHwXZmKWz3zoy7/1wT9+Qp6ll1/9rQ/+8Wc+9OU9TitpETRHpL+qxAHIN7/JX//1d3+dpzCdbO01ndxjaosUrcwJyR0ucTCnJSuR41hkz0Yls0aTySJ77khVtonnQVy/zDrpH9aRPLtomi58kqbMHUlWEs+V2d3iA/UiZWcvAElWEs8D2T2lMD44LFqZNa9N+jKPJFlJPCemArH/wf4jU452rkmykniuHKkpx/lq4pyT6lYSicQpk2QlkUicMklWEonEKZNkJZFInDJJVhKJxCmTZCWRSJwySVYSicQpk2QlcQArWSpoSpycJCuJvTyoKgKvDYdnfSOJeSXJSmIvLxQFgP/++98/6xtJzCtJVhIH8A+Wl//rcPg/vfbaWd9IYi5JNk6Jg/nNV1/9Tr+/kmXffuWVd+/Cf855UFUvXPTX+NxI7nCJJ/End+786d27PxuPw4X+IVnJsvjy/sHy8v/9y798xncz/yRZSSQA4LXh8He+//3vD4e/vrLy7z6axrO+K/r9fsqtJBJ4udv9Lx//+Odv3PhOv/8nd+6c9e3MPSlaSSR2uP1Xf9US+fGv/dpZ38gck6KVRGIX337llZ+Nx2d9F3NPKqZMXF6mXrnTmP1GnocZk909sxkTxyRFK4nLyFQ4Zh/MTho58IDnfpvzSopWEpeO6QwA7FaT2QOwe4D07NiAM7nn+SLJSuLycmB4AiAOYJzVkaQmT0WSlcTl4jiTW0MI2De5dTqSMUnMkaQN5sRl4bA586Gstr/6F+Ov/4f61R+EO/cBuFs38o9+pP3pf7jwuc+4VpHmzD8Vqco2cVmYRhlTTTGzEEL/K1/d+t/+D3u0fuBZem116Y/+cPH3P+ecm4pLnDmfwpbDSLKSuERMlzk24dHv/bPhV//yyBO7n/vta//yn+uElG15MqkcLnEp2JOaJRlCOKamABh+9S8f/d4/CyEctgmd2EOSlcTFZxpZTEOV/le+ekxNiQy/+pf9r3w1nrunWC6xn7QISlwWoiKEEPy4fPsD/91h+ZTD0Gur7339/83aLefcNMOS2E9aBCUuBdzN4Kt/+bSaAsAerQ+++pd7LvUs7vYCkGQlcSmYTYiMvv7vT3aR0df//Z4Kl8SBJFlJXDrqV3/wnE+8bCRZSVwimiLaO/dPdno8McUpR5JkJZFInDJJVo4LSUuJujknbgm7WzdOdno8Me0rH0mSlUOZ1jhEQSmrqq7rpCkXgPyjH3nOJ142kqwcCoHK+9r7GKHUdR0bW5F+Wc0h04p7Eel8+h+d7CKdT/+jeAWkmOWJJFk5FJK1rytfT2oqkRpX5xTZTe9zv63XVp/2Inpttfe5395zqWdxtxeAJCuHE3Vk7+cSc8msIZNrFUt/9IdPe4WlP/pD1ypm/eJO/y4vCklWDiUqCAGy+bf58EzvKnECZrt4Yhfy4u9/rvu53z7+Fbqf++3F3//cbAcz0k7z4SRZORwChBkC6UlPCZT0gzSPzCZEIs65a//ynx9TWaIxQmwF2nOpZ3vfc0uK5Q6GgA/h0dZw6INl2XbAwHO1yN+3mLed5pp+oOaMZOP03Eg2Todi5KAO/9+DjTvb5ZVud73WkrKU6YdW8vf1soVMXVKWeSOZTj4fkqwcSm18MCz//G8fbJT+o+9Z3fRFTThgNed/u5rfXig6uQhE04/WvMGjLLK73/726BOfwD6LbADJIvs49Pv95Lx/MHWwt/vl6+vjhcIJREWUILFZ4YcbIaB+aTHvOEj6pTVvxE2cWSf9/R3JzjkclJFJmnJMkqwcQFwBvbY+eGdYdzIFoAInYoABa7W9tlVBcLuXdzNkSVnmltnd4tm/xalFU6p8OxlJVvZCMpCPxtUPNoZbdQiAACoiKnEfyFMeV/yvG5UDbvdylwHpJ2+ukN1TCuOD2WhlNkiZZlJSqHJ80gbzXgiMffjJ5vj1zarirh8jgcTSB9JtVfrjLX9vWNfBLKWn5o2pQMw+OHDzeP+DxJGkaGUvRq6N/Y/WRu+Mg838ChMCUYaFEHFgbXxY1ldbupRsTeeTwyTjyR8mjiTJyi4IeOLuoPrJ5rgMEIgCAjjSBABU2FJmakaWhvVKtgMXwFTWn0hMSbKyCyNLH97aHveruuOokEKlUFLYQhOx1MS2R6AopKLWkFjRn3QlkYgkWdkFySrY46F3TlfbrpfJ7YViuaVbniOPKqCCBoKgEBAYJBBJUhKJWZKs7EE88XDkH41CaSGHQuhpEAnU2jTMtDWLyMFtzonE5SbJyl5IVBbKYAEgZG0ctipU1ELh1IZBagIUidtCqac5kdhHkpW9EDCBinSd1sbtOpCoTMbQXK2XoQqoAowQoSDWO6TUSiKxQ5KVXRAARCEtJy0n22UI1gQjgbCgpBUKJ6wMKhDADJOQJSnLRWAlS2+Kd0squNgP2yIrhZTeRoEhao00652SGHoIuJCho3QEKElQLgx3y5LAg6o66xuZb5Ks7EJAAZdb2s0w8sEYi+BiS2FTgekhQ9OSUjjXziBqTNmVYzMtMOQh7DnsOfMbf/M3DnihKM7k2S8MSVZ2QcIJFnLnqSLqdG8cIhCIEFKbVCa5su2YYpXjsF8yjtSU5ywu//SHP7xXVV/6wAee55NeSNIychciUEErUydZkQGhdgIFRBALVcBGiVWYCQhUJilpeyTT1j7MqMlhh2FfN+Axn+VBVZ0s0Pg3jx79rz/72fcGg3+4svJ7N2+e4AqJWZKs7IYwigLX27rtMai0UFERIVRIghAVZMJOJhk4DhgFGFJ65bjM+pvsV5ZZHXmqTpx/8r3v/cfNTQC/urDwzY2Np7qlmDV7T1H8xurqv/voR5/q3MSBJFnZjQgBb1gs9D0d9whsO80ECtqkVsUpCyWIEVFA7DlH6nPIkYZs2O1FMGvveBxDtt989dVvbmz83W73X//SL73c7T7t7d0ty+t5XqR+0dMjycpeRJrsyfVObibd3GUCR1IhlLZS1CpjMBFRxndF0pVDOMw+tg7lX9/72t+u/dt7269ulncBLLdevLnw0V+88o8/dvOzuWupqpnFE59sH/snd+58Z2vr8zdu/KuXXz7ZTb7Yar2Ll5g4gORluwtvXBvX33hr42f9sZGBuNLKXr7S2zJHuEJAcGQIhAJOpK14sasvLxe9LFlm74WHmN1/686ffeONLw3qxwee1cuvfuqlL37y1heOaXb/C9/+dmn25ic/+axfTuKYJC/bvQgggiJDK3Njbz0n19radlKLEuYNpTkjBFRQYy4gFcMdgsyM/ouaYmZ/8aM/+O79rz3hrEH9+P/6yf9yd/tvfufDXwEQleUJ0crPxuO3kqacM5Ks7CKqQ+G0kzuBthSr7Xwx1+DRr6UibLITJHGreSf1mIRlF/t3kUMIR2rKlHjYZz705T22j9gnLoG8mcpMzhlJVgBMB6EyGD3ZyfSFdua6bqnllltqcXNZ4AjACAGgEGms4lJq5QBmt5NjnPKtO392TE2JfPf+115c+JW/f/sPMIlZkIza5oRLnf2O85W9sQyh78Oj0r81Kt8aloQst/Pr3Xy17QonFcVTWg4dh1yhApUmWonJ3SQrBzKrLHUov/HGl572Ct9440t1KKcXOVBTUgvPOeRS/5WQ9Mat2q9V4eGo3irrUTAALafdXJ1SYx0cxZsKmKmpsgwMBsRK/5hbSbqyjz2Vb9+99+eH5WifwKB+/N17f/5rtz6/fys6Mm3hSeX254rLKysEPLleVv9lbfjG1njoQy7SzrJO7nIFJ1rBWOomCBQfnEgolFDxBiOVBkqIOZcUnu9mVlleW/v6yS7y2trX/96L/8NhFbe/8eqrqYXnHHJ5ZUWiyX4dHo/qsgoBzJxiknclo5NK/CP+LNMgwdQJC0UrgwUqgkKILKVrn8y97VdP/cR/+sMf3ivL//2DHzzpTSWeFZc7t0KMvA3qkDksFtpymonEvMn0ABAEpx1BBAKlNNQmmaLt4ISCi18Rd2KvgBizxJq3ExBP3FNd9W8ePfrod77z1QcPPra4mFp4ziGXN1ohYIQPHPjgjddaWVsUFDepXpn8Lxb0xx0fEUTXJqlNIJI5KRzcWb+WZ8q7abeZ8j+/ixvo/NVfzX6YWnjOP5dXVgBQ4InaUJoNvS21s0LVwGmWhCB32gib2EUmC55o4WQUO5vbfx6cuN1mtlQ/hPAvvvXi+vjNE9zAcuvF0Sc+MVtx+3ZVpRaec86l/rshUZl5YzDUgTXRymSh0FxjnZsYYU2eBTH92NhSwjKxwhHAKNAT00MuEn9y5853+v3P37jx6sc/foIWvlluLpwwrNh/4outVtKUc86l/ushWAfzxkAJQG00Si/LFvMsUwFgjP/SyOgBR0DAQthxBqIKUgdnFDS+lBeKP717d8W5E7fwzTYlv3zl0ye7yMtXPj07GvlkF0k8Zy65rMAbaqNnrK+1QALSybKF3OUCiTE84QlPBkKJXOFEyiCVidEZxC5o6crPxuNvf+xjJztXdvPKzd/t5Vef9iK9/OorN393z6VOdj+J58nllhXCG4PRrIlKAhgIB3Rd1nWqsaIfjJUpIswdQIwMYyI63RKwSfH/BeNdttvMGjLlrvWpl774tFf41EtfzF1r1i/uxDeTeJ5cYlkhjayMgTQgxH8Jb2akEl3nOpmKgEaaZQiF0BNDjypcxFTKqTKVgGhroKqfvPWFV2589vhXeOXGZz956wvx3GmQkpRlLri8O0Fxg7k28yQRvKm35sPK6JypSMuJUYbCXGHk0KMiVMQBOrtDNEnZXrz0yomJQjAbsDjnotfBcRoOX7nx2d/58Femuz8ptzJfXOJoBTCyDvTGuBQKZsGsNtakN3pSIR3nuk5FOAgyCuKb3K2wKe9vNogAXMBV0LsjaspUEWLc8ZkPffm3PvjHT8iz9PKrv/XBP/7Mh748G6fE66RQZV64vNEKYjmcWSBIBEMweGNtVpt5k1wAp04kMIx9CHAWC1caC0SFME52T94IBzIVguggiYm/wd+//Qd/78XPH2k6ucfUFilamR8ut6yAlTEYIUoTMzFDIEIsV4FURjMbVb4cVZ5CdXCOVFAnqRUB4sFINk77mS6F9njTFtL+xK3/8dde/DyeaJEN4DgW2YnzxuWVlWluxYyiJIQQa+Z1CCFjMxXAEIwhsPKhNI9MWnkmRZ5n2bQAt2nVvXCZldOyMolhy6yT/qzRwZ4j9+hL0pR55PLKCgAjQyCjKy3ghG0X07RWBqggU8AkTA6ugpW1Dco6dH1nsSPISEJ0J265QDwjK5PZ3eID9SJlZy8Al1hWCCMCKUBLsdTiSluKHKUhgBlDpgIqgBA7DYWAGWmGqrZxNVaXZXkLUFBw4Samnq6VieyeUhgfHBatzJrXJn2ZRy6vrDSV+CJLha52smvdLMu0NLH4064CNnbYRkaLSRVRgaqCfGd9q8vwwpVrncwZFLxQxfvPwspkKhD7H+w/MuVo55rLKysAnGC17TJtFZmjuCpIJoASAhqoQlJIIxtNgThB22kZwvZg/HhzzUGWui0zNVyQzOKznkZ8pKYc56uJc84llhVBpnK1m3ugMjDQqVBBIwBqDGdMISZx5DudsJMBynEdhlUYb22/aXevryz5zgrPzRRm+eY3T35usjJJnAaXWFaAitw2iooC3kASFh0m4wAPQqDY8VxxKi3FpllN1t5q7x88XLtz9/7t5a5ZcU50hb/+6yc+N00jTpwKl/cHiERt2CptqzIjcwchAi3QvLE21k1zMwxNtFKoqGoVxKBGBmNZ1W/cvbexuRWCvwBdzMnKJHEqXN6foei8Xwbbrm2jCj5YIXBAYPCgJ30s4Q9GoxKZSJHJ2GgUoUDgfVBgfau/tr7u63ruRSWROCUu9SIokJWxMgiFsJCj50QgBgaamBBCgSMFyFxW08YhTDtza2PPOdCquqp8SONSE4nI5ZUVgp4cG2sTCChkHQJlMcucwAgPmgECJUQlFxlViG1BAohqIKHSKYqq9nXto/FtEpZE4jLLCryhDKwMIqAYKWYIZiuFFo41WdMByCAtJz4EHwxsqt9UJNACudTtjGtfBX/WLyiROC9cSFmZZjmeFDqQMKMPqAnAECAKUYwCWdlCJp1MDAAN0AwyCvSkTGa5i8BIBbqtvArBW0qtJBIN8y0rnA6O2PvpqCgiInrguoTRcbJxQpBmRrvCBKRNfBJ6uWUKR6NpFWg2a3qmjDNSIXUdjDsO2onEJWeOZSW+iysfSh+ajthmEruJkGCRuVaWH+aqbGAN8zCjGWNbj7ERGJLRhpJXCxSiIwu1IRA20TBVVc2cMs798MEmfrZJVxKXnTmWFQCgVT70x3VgDFxEVcyCCihYoBTu4BZACkgGozUhT+w5FFFK4xlEZ2IepZkoqqC1IRhtUp0iqq08y8VKb3mRW6yZSyQScy8rQCCjab7ADCKE0WJXsdmTbKwNCAQpgBA0kUAKKWZOoEDLmJMhWJ+xNE49pXHbJ0SknecI5aCuF7XNtAJKJCbMtayQZCCDWaABNBKqnnSEijRz2Q89GWHqFikSB3eIhUylMPaUbZK0kdE3BrcIUEpm4gARlVYrr/ojrT0EoRlPlnQlkZhvWQEE1ryfISIKOBWaUyhEwhMtlRmjlUZXKEBGtmGLxgUyM9aAmZnRG+umoh+GSlwhWa4qeZFte+9UVTXYAe4hicTlZM5lJZo9iihEJSZKGMxMINBAecLahEQwi3KgtIzWZuiBLTEKasDA2PgT4thDMpj5QPrgzBa6xQCoAvJA1UNSOInEpWSeZYXTelcxM4K10Yka4CaJ2MnMjQPe9AQDSZhYUPOtUBekOAkTiwNKM2NMVDJoBpC0HCKaZ9rL9b73NRkoRoFoqrBNJCLzLCuIPtcAohCIU3EibGpVONGWQxMeuXBRaAhOrMg1F82cZqpO4GJtnMAAowgUzQYyVdjOtHCaO0dRD5Z1uEjWcInEu2S+ZYWgj/kPMEYLAjqV2JctcmjKVgAFljN9f68Ye0dCqKBwYmVkFJgYZjaTRBRQkVaGXDH21ml3ssyZsGbQpCuJxIQ5lpU4kaOZ1GMEGAiKhkAVKCCTspRD3/CUrjoIxoGki7MKp5tDkDgFtRl1IzBV7WTiFCNvY0OeZ0WReQvVpP42bQUlEph3vxWCJIVQUadOJQYNsRQFFlO2h2CUcWDfW55pJ9M402NmSKEBsea2sZx0ou1Ms0xHHpXBQNJauYOIN1Z1rJV7ji8+kTivzHG0AsSJHObNgkDFOVWN2iAkdypi98NYvE9WZkbpOtcBxp4Bsy2DMvlPVKRwVOV27esmKpEA5HkutQk01u/nLsUricQ8RyuxXN8Y6/YlELWFENMkAqdw8sQqWzKYUVATo2AuQyuHCprtnwkKZIJOhsxxHEK901OImhB1mTpRHXsfLEUriQQw17ICwCbjZEAh4QlvVlvwZpMhP81KafaspgAuBjQCCitwEIJz6BTimtOEEuMUdDLkDiPPOkgzD0iEQDAxoMidqIyDhSeJWCJxiZhnWWnKUmLtCkToABW42LMsMYnKGRGZmCiQJD0Z0Hi9EfTE0ExUui2XZQIxCNWxVYg6DILVbHItzSonNivSWi0nKoPK+yf3ICUSl4b5zq0AcNFPheKUgDgRAymMidbDU7bSlLxIU9pCsDaQoZNpN8fQg2Anl0w48vTNoI9pxRspMEGgdYu2AWMfGmuEtB2UuPTMq6zENsJYXG+UYCYUbwaVQFLgBJ5mPNRhlsQuNwOCQk8OvPXybDHLSAo49KGOy6GmxA5AM3CZKp6aZ5kBNRGezytPJM498yorESONEk2Y4oZwfN87SCauMbM+GBpoiD4HAACBoKlcqUPoFlKobJbBU2yyUJqqk5ACQqWGQFwgPXc1LqaAJXGZmWNZIUCLagJGBxRSRUVEYkq16fo5GANtoiOQpjJfIArkTgJt6JE5dWYGOWCPh1B1hAbChLWZN3uWLzeRmBvmWFZA2KSZUAAVSONRYCGYiIRm+/mA2CFW6DY1ujL5lECBtnNOZbv2wdjKsk5L4Vn7ZtklwmgjJ4BzmueaOfHQABpt5nKJxOVlnmUllthCnEhMvzaWTkZiYpF/mHE1EThN2QKACJxIW12mGPrgASqC+RyunYkKyhDzNGyyvELnJMu0YlBxBkkbzIlEZH5lpSlYyZyADIGQaD0JQ/RgAZ5YaBsXQTFgiZ2HHSdOOAzmyZhHMYA0gXQyhaC02CrA2DDkMs3zrCYKFSNrS0M9EglgnmWlqbL1FmIdvcZYQgjo5O0d10B745Vpz4+BFBNCRTouU8XA+zpaKcSiN8DA0igi7UydYRRHkBEUyTOXZ25Q1QITSuVTbiWRAOZcVhjYrGM0tu4IROAAA5xyshF0YAzRVP0DUEU700wwDMEj+truiJBACI4ZLFjbSSfH2CMAIHLnVLFd1SpQBQjZ/VTcuciuzxydfWHT9XisgxOJc8bcykqMQkScqALRvFYB17gZIBNRnVqvHIDRAGQirUycyjAED1KE3Em4TBADKxqD9pwTZ6NAD+ROnOrQ163MiYrR9o9Bs2mH0aR8Zlqmu1ftdna6m8PjIz1kzlEicW6ZW1lpVkAWExoGA8SMEBrECKgGQzh8h5mACLtOoRiZ98C0ZZn7LOUEYkBlEFpbXc9xECx3GkhvKIOV3tvucIWAmY2rKkyaBlSasjrd0ZDJzjjIaF2pEzMHoYG5y1p5npQlMV/MsawAaEb8TJwnA6EiBjGKQeP+8sFLIABAR9Wr9YMPMXM7LafbdaBMjhcAVSzwd24pzx7VYRQCwCrU47p2sqenkWY2HFdj7wmamVNHUiEiEqxJCptZtMoMZoBkWRZCEBERGK3baudZM0jgdL9xicSzY15lhZMSWqdKUie186RMvtp4XB+2F5SJFHDm6xyazYQDBEXiSkXISVshdmIYoYTAlmpH0XGy0smdc3nucndAVEERQgkDJdbeGZo9JmkSN2oxGhIBJTS9j/EOXCwfpksZlsQ8Ma+yAgCEGUE6EUII4+4MLYEAs5mCuNkvec9xSdYum3j4y0SCVJo2xVj/Eoe9TyMREhQZGcRwrVu0HEVcr12EJuHDGVtb0mgWxy4SZiQlFgfTYpdRMFNVFQlGwNQ0GAUUaIgzkJKiJOaNOZYVAzxgaCaeqkgQsCnE56QfUCk6zZSIiCEaGuDRdvWzR6N+TagGIyBZpsGTRO7EzEIIgGVZZmTlTQhVVae+qtmYJIy2B5vD8UjBsN26v9D+hdWl3d9RURFVxJvKRAnGLiSaIn5BRURizwFJB43jSERVaftXZYnE+WeeZaUxT4HFvVhSRR1ozXplmhVtNmun2ztxg6Y0HVs2JoXSRCJ0IS6bRCigCmkQRwHjvHdVODEXl0NCuooyDibkMNg47G0VkGYuosX0LVXMLFbEmMVZaaCZiDiFDwGEZMFbAKDIQvBmLpXuJuaOeZWVnQVJ9N+X2B9EFaroZB1ipLLZbBHO2EkS8MYQy3ElmlPGyjkjQLiYCUZ0c5oU1UV1ip+PaReBkTWJELI6+F1ltgSaLiVHAirxn6bCJmZlCYMqICoOCkJVVBxJVVHn0hZQYh6ZV1mJVpIzhSJx6gYMFKGq5grQIJx8Zc/ZCGQz78OM1uxPN1GOMTZHizSOCxrrcZUq4lRoAkTRyMRlJILLR2TYPe3MSE/zwQgEH+BibEKIBGMs4QtGhTiREAJIkSyYkQgi3kKwDABi71PK2ybmhLmVldmVDjV+HDeBSJoFhYqoioCN/hhpgBONYYdA89zlgQpG/9rMqQUDRJ3SlDAIndOYbiWcqDgVE4lPaI3ZZUzv1GZVDHGMrLwvfeXNvAXQRAQxrSyYujAIlDE3BCqiZ79EZwYTxOuOQ/VosJU57RWtdlZE018ut3cAAAvwSURBVIcz+W4nEsdnrmVlz+NJ8w9pQABJc4ZAqw2Devyw7I+8v9ZeXCl6RudD8LVngKlYsxEtDNFbWxhIMwgpjWltFKNYtzZ9WhGqAKrOORMNRm+h9v7u5uPHw76KLhbREEqcE6fKpvsZoqIQAEEYaKSHQDWuk1xcznmEh/2NsS+d0+sLy+9ffU8ryzU2KSQS55h5lZXYK0hAIRYL2UzintC0+D0Q3qwyP6jGf/3o9VfX3xzU9Uvd679y9f3Xule9sFVkYoRKrKuPqxtSncuikXY0VSHIYISIqDgUWdQV8/TjKs81C2Y0X9VVvx7VHPdHo5+vPRjWFSFLxWihaDt1LVcs5B2hxHZIT4sFtSNfrY36ZT1u5UWn1VnMOwU0WBjVtjbur5X9KtQqOqzLXl5c7y11ilZaDSXOOXMrK80kD9W4lyxisYJNJLocqIAQL/X96p03/Os/5dtVe1TD/XRUPby3eb19fTB4oaxaBgehkQKhUzOLiV2SNBMCmSPMQpP3daa+Ds0eDrzSFDR1wendev0b975vrDt0hTlQILpZDbfqkYN08za67LhcoQAqq8dVbeSorjbH/Rp+O4yyalC2FjquGPl6UI/LUNX0RpI2qqvXHt/dHvdvrbxnsd2LG9Jn/ZeQSBzM3MjKbDtvk1VhcMJMEAAFTWH/f3v38xtHdtwB/FtV73X3cDhDccXI9kYx4ngP8TFH///HICcbi8DxQWvDXkoUf80Mp3+9qvKheyiusA4QeLwex/U5kBgNKRIC+qt+/epV+XyaWaeFCunW73/b/vpb+2ZPAzfepNS1493YPey6amyS/DhRBvvUVCWJTE9hRBhm7kwOSQLAxAAQETNnJoM7qHjhMSOJqLF0t7bbbozZz6X+saxecVNRhXnZRN2gT6TLZpGFHBjG4WbfFYe5qxeQGWxUveuUIO5eoO4GQMgBqOtDux/KOBh99VoWVZ049onCifr7iBV3VzNzExYmgqOY9ap9URM2gxDUXN0F7uz349P9uFMfHvn6Pf2xpdbZBcRSUnYdrXTZVctYhJPD3ZWdFORmgBF47r5NRNMwIbV5K0bcplOFTg4TmGAgVvBg3I00VJV2yW/l7lwu/okuV9YIZKqtXfG+QZudjHzFvk+2UxBxzZQJTNiNNrhOI0nETQkNY8EYYduRRuV2LL/f3BbTf3/zdlk3UdMfTtPfQay4YyjlenN/325fLVerejGqftg97odCnBdVIy7MUlxbHdR0p/vfPP3hd+0H47FaPOVFCznU3MKYnJKnphvbYR4/5krmBJp2jA770f58oMihBmUiYgIDacs0uNXkjLoX2xMp5yJ5OFv2zVlJYgz64J3Z9he+fmPnmRrnzCRSiIiEfAU0GYOASIVoqgQuCeY2tU4oTgokRgW/HtDpPFhNCPKi+W4IJ+jUY8Xdi2o7Du93D+/3j98+PdaSpkcS6s4sifOqOr86u2hL/+Hp9kn3t2XzTXdzrztiXeZ+6cp2WC3Mnww0SO65ViIDCEpCCSxwI0CE3A3JiYxyX/hWdQOuhS9desP/gPfsa+rflP6OeA+A2HKj9WLMyZjczDvYB3hNvgQuzSosgJrAgBMjAQmoX9Tb4NPBA8dc6etgAuFHTbVuKkVmTonli7NVptGdzTNP++UhnJKTjpWpn8DdfvvH7f1Nu92XAYfLjqYzeAVCvVupEvaluxsf/9B9vLWHnbdOxgQimDFc8al5ksMJriY7zzfwxkoDq8wbpvkOxWxqBmUue03vlK4ttwwpvBQR4w/Eg/u2HzvjgaW4E0RTVSTNJwfMyY1U7Rvtu/HpZ0Y/zWmBnIlBRDa3dOK5B9x01NExl/aCCM4+1bEYY4myJGe2qgILMe289MWblNbgmjmSJZyWk44VONT9427zfns/6CjMDKpYhGU/9KPrVDPWavtu8/Sk44fyeF0+oukb1qLEAk5QY/tuP7b5EpZvvflInvp+YeWqtn/JdDbNegcY7u5FeTPgzqwDjEgLRiEQlAGnkpqH81qLWtclGMvUnxIwgxq5kSt15g86/K5sv9D+q+ry53l1gURE/J0Glc/tF5wAZ3cmME03IjQXzCgZYIlEmGtJK5GKKM/jpkM4JacdKwATvT5fG0GYQTCzJmWAfnt3/djt4SjQ98PuY3nsoQP1mrsqFWbnNBewqQqe63EBTOWu7sAAjAQq1Btb1nyOVxUnBhGYCEZlT08PPo5mTg53djW4YOocaST7RCTZJBVXyslhZIA6mZIZm7IaKbxj29hw297djMMvF1eX8vk/+6fYI3cGBDStgJ4zg0CcWc6q6oJlSZwJQsRRwxJO0EnHChEJ8+vl+tVyNZWsEWDum77NLFODlNH1tjzd6A6knLSujHkeSgZyM54eVPh3blXI4DTNancyc6J2ma//o2mv0qLK5ywZcIVdu/xXm68L6XRXwOTmNtfHgtmYnIkkOyUXBxn1LmZsSmrsSmpTqzoM7qMONfYbH9ckMt+agPzTREWQOzuYMS2CptWQE3FOeZnry1ytRWqiNP3u0YslnKbTihX3acDPd7o3MhGDiA//bbtVks5TvUudA6q2kNwgC1dJvNjewDp1uCWi56vWn6eMPZ9WpmmPp3Y5Z/kqV/+8WFzW6+X6y7Q4B7HD31jPj6v/vP/N7bCr3C7ce9edlWlO0NTwjcgXLmcub6w+9/qd93emo9nCuNa8Uc4wAOz8s2r5r9XFTxaXmTMTuZvDYM7u5A6Yk1nCvNNDUwkx5+q8ar5IeUlSCwmRAIcnRYRoRhlOEL28gP/azGwcx2EY7DCumIhEBMA4jtNHIqrrehgGLUpMOedhGERkuVxO3+jug5ansS+MXFVt6bfWtTZkSb0O/735/cfhcTTNLNuyH7xn9rNULbgeTN09gVsfRyvnVC296lR/Xl/8W335Op2tU312tq6XV5xqEAMorptxf93e3rYPedg32t6V9lvfG1vDvEO3R9eQ/JRWP+LzlawqbvawOx+7sW3UFp57ScLMauy4yOfrxcXy/FKkYjDc5jPUU0Uv3PFc5GvuCgJLLemMpSIWoqmr5Ys+mCGcnu12+4PGSillu91+/fXX7l5KSSkBuLi4ODs7u7m5mToeEdFqtUqSxjLmnFNK79+/v7y8XK/XDw8PptZ2rZktzs7evn376vIVCFOHA4A6HW667W2/KW6VyK/u373bXdciv3j19ieLy74Uc08sH/vNZty/rVdXXpvq1WJ1sVhXaUHEkjJLRc8tqQlmpqZmCu3LsOv7Xe/FRRLn7bjZj7vM8jqvF/m8yivhCkRKpqVHKQTmlA4HDCCcOWVKCcQEJsBxmFj23NHyOTCm50HEU8A5+TQOjWLMczht2+32h14E5ZyZOefc7lsRYeZSytPTU9d1RNQ0japuNpvFYjEMQ1VVAC4uLtx9t9t1XWdmzNzUzXK5FBGZejVOu7QE4aZJ1ZfLS3e465fN5eO4F+arallxmnZWzF3dzC0TT1WqzCzEc8OEufPA4bp1EFHi5CxIOdfLxfIK87NVemXFpzoXSsxzuRqAREBezn8DvXjsOp89PoQDiHAYY0SffZ4ftvinP39+JzIlnLofehFUSun7floE0aFTGoDDFAuablh46vM679ji+a3DCUNKKaWU5NA/zV9cgVNxrMOLqc4zxlhovgGZOlUafNrAxZwR0/X9v64v6NBm2+cXzw1f+NMhx8PXxiOP8I/qh14EfeaIP/plrExTwKZrH3P92/TG3M32ebeZPjW4tRe3C38+Eeh7Psx7OJ99YcRK+Ef1N1gEvXTEa48+e/HZa/r+L3zhz85U/T/+7BDCX3I5hRDC94lYCSEcWcRKCOHIIlZCCEcWsRJCOLKIlRDCkUWshBCOLGIlhHBkESshhCOLWAkhHFnESgjhyCJWQghHFrESQjiyiJUQwpFFrIQQjixiJYRwZBErIYQji1gJIRxZxEoI4cgiVkIIRxaxEkI4soiVEMKRRayEEI4sYiWEcGQRKyGEI4tYCSEcWcRKCOHIIlZCCEcWsRJCOLKIlRDCkUWshBCOLGIlhHBkESshhCOLWAkhHFnESgjhyNJ2u/1b/w4hhP9X/gRsITkTbG0EVgAAAABJRU5ErkJggg=="

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    // NOTE 此处将 != 修改为 !==。涉及地方太多恐怕测试不到，如果出现数据对比问题，将其修改回来。
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"answer","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"answer","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"answer","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"answer","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!************************************!*\
  !*** D:/uni-app/answer/pages.json ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map