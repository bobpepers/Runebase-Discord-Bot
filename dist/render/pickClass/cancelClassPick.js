"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderCancelClassPicked = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _canvas = require("canvas");

var _lodash = _interopRequireDefault(require("lodash"));

var _discord = require("discord.js");

var renderCancelClassPicked = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(user) {
    var canvas, ctx, finalImage;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            canvas = (0, _canvas.createCanvas)(500, 100);
            ctx = canvas.getContext('2d');
            ctx.font = 'bold 30px "HeartWarming"';
            ctx.fillStyle = "#ccc";
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 3;
            ctx.textAlign = "center";
            ctx.strokeText("".concat(user.username, " canceled class selection"), 250, 60, 500);
            ctx.fillText("".concat(user.username, " canceled class selection"), 250, 60, 500);
            _context.next = 11;
            return canvas.toBuffer();

          case 11:
            finalImage = _context.sent;
            return _context.abrupt("return", finalImage);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function renderCancelClassPicked(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.renderCancelClassPicked = renderCancelClassPicked;