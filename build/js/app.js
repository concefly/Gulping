(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/Lluvio/Public/gulping/app/js/app.js":[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _helloJs = require('./hello.js');

var _helloJs2 = _interopRequireDefault(_helloJs);

var hello2 = 'ok7';
console.log(_helloJs2['default']);

},{"./hello.js":"/Users/Lluvio/Public/gulping/app/js/hello.js"}],"/Users/Lluvio/Public/gulping/app/js/hello.js":[function(require,module,exports){
'use strict';

var hello2 = ' module hello2';

module.exports = hello2;

},{}]},{},["/Users/Lluvio/Public/gulping/app/js/app.js"]);
