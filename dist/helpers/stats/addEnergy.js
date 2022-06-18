"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addEnergy = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var _models = _interopRequireDefault(require("../../models"));

var _logger = _interopRequireDefault(require("../logger"));

var _messages = require("../../messages");

var addEnergy = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(userId, discordChannel, io, queue) {
    var activity, cannotSpend, myUpdatedUser;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            activity = [];
            _context4.next = 3;
            return queue.add( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
              return _regenerator["default"].wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return _models["default"].sequelize.transaction({
                        isolationLevel: _sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
                      }, /*#__PURE__*/function () {
                        var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(t) {
                          var user, calc, addMana, updateEnergy, updateCondition, preActivity, finalActivity;
                          return _regenerator["default"].wrap(function _callee$(_context) {
                            while (1) {
                              switch (_context.prev = _context.next) {
                                case 0:
                                  _context.next = 2;
                                  return _models["default"].user.findOne({
                                    where: {
                                      id: userId
                                    },
                                    include: [{
                                      model: _models["default"]["class"],
                                      as: 'currentClass'
                                    }, {
                                      model: _models["default"].rank,
                                      as: 'ranks'
                                    }, {
                                      model: _models["default"].UserClass,
                                      as: 'UserClass',
                                      where: {
                                        classId: (0, _defineProperty2["default"])({}, _sequelize.Op.col, 'user.currentClassId')
                                      },
                                      include: [{
                                        model: _models["default"].stats,
                                        as: 'stats'
                                      }, {
                                        model: _models["default"].condition,
                                        as: 'condition'
                                      }]
                                    }],
                                    lock: t.LOCK.UPDATE,
                                    transaction: t
                                  });

                                case 2:
                                  user = _context.sent;
                                  calc = user.UserClass.stats.strength + user.UserClass.stats.dexterity + user.UserClass.stats.vitality + user.UserClass.stats.energy < user.ranks[0].id * 5;

                                  if (calc) {
                                    _context.next = 7;
                                    break;
                                  }

                                  cannotSpend = true;
                                  return _context.abrupt("return");

                                case 7:
                                  addMana = 0;
                                  console.log(user.currentClass.name);

                                  if (user.currentClass.name === 'Barbarian') {
                                    addMana = 1;
                                  } else if (user.currentClass.name === 'Druid' || user.currentClass.name === 'Necromancer' || user.currentClass.name === 'Sorceress') {
                                    addMana = 2;
                                  } else if (user.currentClass.name === 'Amazon' || user.currentClass.name === 'Paladin') {
                                    addMana = 1;

                                    if (user.UserClass.stats.energy % 2 === 0) {
                                      addMana = 2;
                                    }
                                  } else if (user.currentClass.name === 'Assasin') {
                                    addMana = 2;

                                    if (user.UserClass.stats.energy % 4 === 0) {
                                      addMana = 1;
                                    }
                                  }

                                  _context.next = 12;
                                  return user.UserClass.stats.update({
                                    energy: user.UserClass.stats.energy + 1,
                                    mana: user.UserClass.stats.mana + addMana
                                  }, {
                                    lock: t.LOCK.UPDATE,
                                    transaction: t
                                  });

                                case 12:
                                  updateEnergy = _context.sent;
                                  _context.next = 15;
                                  return user.UserClass.condition.update({
                                    mana: user.UserClass.condition.mana + addMana
                                  }, {
                                    lock: t.LOCK.UPDATE,
                                    transaction: t
                                  });

                                case 15:
                                  updateCondition = _context.sent;
                                  _context.next = 18;
                                  return _models["default"].activity.create({
                                    type: 'addEnergy_s',
                                    earnerId: userId
                                  }, {
                                    lock: t.LOCK.UPDATE,
                                    transaction: t
                                  });

                                case 18:
                                  preActivity = _context.sent;
                                  _context.next = 21;
                                  return _models["default"].activity.findOne({
                                    where: {
                                      id: preActivity.id
                                    },
                                    include: [{
                                      model: _models["default"].user,
                                      as: 'earner'
                                    }],
                                    lock: t.LOCK.UPDATE,
                                    transaction: t
                                  });

                                case 21:
                                  finalActivity = _context.sent;
                                  activity.unshift(finalActivity);

                                case 23:
                                case "end":
                                  return _context.stop();
                              }
                            }
                          }, _callee);
                        }));

                        return function (_x5) {
                          return _ref3.apply(this, arguments);
                        };
                      }())["catch"]( /*#__PURE__*/function () {
                        var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(err) {
                          return _regenerator["default"].wrap(function _callee2$(_context2) {
                            while (1) {
                              switch (_context2.prev = _context2.next) {
                                case 0:
                                  console.log(err);
                                  _context2.prev = 1;
                                  _context2.next = 4;
                                  return _models["default"].error.create({
                                    type: 'addEnergy',
                                    error: "".concat(err)
                                  });

                                case 4:
                                  _context2.next = 9;
                                  break;

                                case 6:
                                  _context2.prev = 6;
                                  _context2.t0 = _context2["catch"](1);

                                  _logger["default"].error("Error Discord: ".concat(_context2.t0));

                                case 9:
                                  if (!(err.code && err.code === 50007)) {
                                    _context2.next = 14;
                                    break;
                                  }

                                  _context2.next = 12;
                                  return discordChannel.send({
                                    embeds: [(0, _messages.cannotSendMessageUser)("addEnergy", message)]
                                  })["catch"](function (e) {
                                    console.log(e);
                                  });

                                case 12:
                                  _context2.next = 16;
                                  break;

                                case 14:
                                  _context2.next = 16;
                                  return discordChannel.send({
                                    embeds: [(0, _messages.discordErrorMessage)("addEnergy")]
                                  })["catch"](function (e) {
                                    console.log(e);
                                  });

                                case 16:
                                case "end":
                                  return _context2.stop();
                              }
                            }
                          }, _callee2, null, [[1, 6]]);
                        }));

                        return function (_x6) {
                          return _ref4.apply(this, arguments);
                        };
                      }());

                    case 2:
                      if (activity.length > 0) {
                        io.to('admin').emit('updateActivity', {
                          activity: activity
                        });
                      }

                    case 3:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3);
            })));

          case 3:
            _context4.next = 5;
            return _models["default"].UserClass.findOne({
              where: {
                classId: (0, _defineProperty2["default"])({}, _sequelize.Op.col, 'user.currentClassId')
              },
              include: [{
                model: _models["default"].user,
                as: 'user',
                where: {
                  id: userId
                },
                include: [{
                  model: _models["default"]["class"],
                  as: 'currentClass'
                }, {
                  model: _models["default"].rank,
                  as: 'ranks'
                }]
              }, {
                model: _models["default"].stats,
                as: 'stats'
              }, {
                model: _models["default"].condition,
                as: 'condition'
              }, {
                model: _models["default"].equipment,
                as: 'equipment'
              }]
            });

          case 5:
            myUpdatedUser = _context4.sent;
            return _context4.abrupt("return", [myUpdatedUser, cannotSpend]);

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function addEnergy(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.addEnergy = addEnergy;