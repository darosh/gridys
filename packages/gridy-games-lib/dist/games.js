(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('gridy')) :
    typeof define === 'function' && define.amd ? define(['exports', 'gridy'], factory) :
    (factory((global.Games = {}),global.Gridy));
}(this, (function (exports,gridy) { 'use strict';

    function getMovePlace(move) {
        var cursor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        if (Array.isArray(move)) {
            if (Array.isArray(move[cursor])) {
                return move[cursor][0];
            } else {
                return move[cursor];
            }
        } else if (!cursor) {
            return move;
        }
    }
    function initHighlight(game) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = game.grid.tiles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var tile = _step.value;

                tile.highlighted = false;
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
    function initActions(game, moves) {
        var cursorInput = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        var highlighted = [];
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = moves[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var move = _step2.value;

                var cursor = cursorInput;
                var tile = getMovePlace(move, cursor);
                if (!tile) {
                    cursor--;
                    tile = getMovePlace(move, cursor);
                }
                tile.actions = tile.actions || [];
                tile.actions.push({ move: move, cursor: cursor + 1 });
                if (!tile.highlighted) {
                    tile.highlighted = true;
                    highlighted.push(tile);
                }
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        game.actions = !cursorInput ? [] : game.actions;
        game.actions.push({ highlighted: highlighted });
    }
    function selectAction(game, tile) {
        if (tile.actions) {
            return getAction(game, tile.actions);
        } else {
            return false;
        }
    }
    function undoAction(game) {
        var h = void 0;
        // tslint:disable-next-line:no-conditional-assignment
        while (h = game.actions && game.actions.pop()) {
            if (h.highlighted) {
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = h.highlighted[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var i = _step3.value;

                        i.highlighted = false;
                        i.actions = undefined;
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }
            }
        }
    }
    function getAction(game, actions) {
        if (actions.length === 1) {
            var action = actions[0];
            var place = getMovePlace(action.move, action.cursor);
            if (!place) {
                return action.move;
            }
            undoAction(game);
            initActions(game, [action.move], action.cursor);
        } else {
            var moves = actions.map(function (a) {
                return a.move;
            });
            var _action = actions[0];
            undoAction(game);
            initActions(game, moves, _action.cursor);
        }
    }
    //# sourceMappingURL=actions.js.map

    var PASS = 'pass';
    function parseRecord(record) {
        var tokens = [];
        var records = record.replace(/[^0-9a-z]+/, '').replace(/([0-9])([a-z])/g, '$1,$2').split(',');
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = records[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var r = _step.value;

                tokens.push(parsePosition(r));
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return tokens;
    }
    function parsePosition(r) {
        if (r === PASS) {
            return null;
        } else {
            var t = r.replace(/([a-z])([0-9])/g, '$1,$2').split(',');
            t[0] = parseInt(t[0], 36) - 10;
            t[1] = parseInt(t[1], 10) - 1;
            return t;
        }
    }
    function parsePositions(r) {
        if (r === PASS) {
            return null;
        } else {
            var t = r.split('-');
            return t.map(parsePosition);
        }
    }
    function stringifyPosition(position) {
        return '' + String.fromCharCode(position.x + 97) + (position.y + 1);
    }
    function stringifyPositions(positions) {
        return positions.map(stringifyPosition).join('-');
    }
    function stringify(game) {
        return !game ? [] : game.moves.map(function (m) {
            return game.moveToString(m);
        });
    }
    function other(player) {
        // if (!player) {
        //   throw new Error('Undefined player!');
        // }
        return 3 - player;
    }
    function landscapeHex(grid) {
        gridy.rotate(grid, -1);
        grid.toPoint = gridy.HexagonalGrid.CUBE_TO_TWO_AXIS_YZ;
        grid.toTile = gridy.HexagonalGrid.TWO_AXIS_TO_CUBE_YZ;
        gridy.normalize(grid);
        return grid;
    }
    function reset(game) {
        while (game.moves.length) {
            game.undo();
        }
    }
    function update(game, record) {
        if (!record) {
            return;
        }
        // .replace(/([0-9])([a-z])/g, "$1,$2")
        var records = record.replace(/[^0-9a-z-,]+/g, '').split(',');
        while (records.length > game.moves.length) {
            game.move(game.stringToMove(records[game.moves.length]));
        }
    }
    function undoFor(game, player) {
        if (game.player === player && game.moves.length) {
            game.undo();
        }
        while (game.player !== player && game.moves.length) {
            game.undo();
        }
    }
    //# sourceMappingURL=utils.js.map

    var FIELDS = ['title', 'type', 'items', 'linkText', 'authors', 'aliases', 'rules', 'created', 'location', 'tiles', 'original', 'grid'];
    var GRIDS = new Map([[gridy.RectangularGrid, 'Rectangular'], [gridy.HexagonalGrid, 'Hexagonal'], [gridy.RadialGrid, 'Radial'], [gridy.TriangularGrid, 'Triangular']]);
    function copy(name) {
        return Object.assign({}, name);
    }
    function domain(link) {
        return (/[^.]*\.[^.]{2,3}(?:\.[^.]{2,3})?$/.exec(new URL(link).hostname)[0]
        );
    }
    function id(key) {
        return key.replace('Game', '');
    }
    var links = ['wiki', 'source'];
    function merge(a, b) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = Object.keys(a)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var k = _step.value;

                if (Array.isArray(a[k])) {
                    a[k + 'Array'] = a[k];
                    a[k] = a[k].join(', ');
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        a.originals = getOriginals(a, b);
        links.forEach(function (l) {
            if (a[l]) {
                a[l + 'Text'] = domain(a[l]);
            }
        });
        return a;
    }
    function getOriginals(a, b) {
        var originals = {};
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = Object.keys(b)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var k = _step2.value;

                if (a[k]) {
                    continue;
                }
                if (Array.isArray(b[k])) {
                    var n = k + 'Array';
                    b[n] = b[k];
                    b[k] = b[k].join(', ');
                    a[n] = b[n];
                }
                a[k] = b[k];
                originals[k] = true;
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        return originals;
    }
    function table(games) {
        var wip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var result = [];
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = Object.keys(games)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var key = _step3.value;

                var a = games[key];
                if (!wip && a.wip) {
                    continue;
                }
                var m = row(a, games, key);
                Object.freeze(m);
                result.push(m);
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }

        return result;
    }
    function row(a, games, key) {
        var originalId = a.original;
        var b = a.original ? games[a.original] : {};
        var m = merge(copy(a), copy(b));
        m.id = id(key);
        m.originalId = originalId ? id(originalId) : undefined;
        var instance = void 0;
        Object.defineProperty(m, 'instance', {
            // tslint:disable-next-line:no-reserved-keywords
            get: function get() {
                if (instance) {
                    return instance;
                }
                instance = new games[key]();
                initActions(instance, instance.possible());
                return Object.freeze(instance);
            }
        });
        Object.defineProperty(m, 'tiles', {
            // tslint:disable-next-line:no-reserved-keywords
            get: function get() {
                return m.instance.grid.tiles.length;
            }
        });
        Object.defineProperty(m, 'grid', {
            // tslint:disable-next-line:no-reserved-keywords
            get: function get() {
                return GRIDS.get(m.instance.grid.constructor);
            }
        });
        m.original = b.title || a.title;
        m.originals.original = !b.title;
        m.link = m.wiki || m.source;
        m.linkText = m.wikiText || m.sourceText;
        m.wip = a.wip;
        return m;
    }
    //# sourceMappingURL=table.js.map

    //# sourceMappingURL=index.js.map

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    var classCallCheck = function (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };

    var createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();

    var defineProperty = function (obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    };

    var inherits = function (subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }

      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    };

    var possibleConstructorReturn = function (self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    };

    var slicedToArray = function () {
      function sliceIterator(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = undefined;

        try {
          for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);

            if (i && _arr.length === i) break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"]) _i["return"]();
          } finally {
            if (_d) throw _e;
          }
        }

        return _arr;
      }

      return function (arr, i) {
        if (Array.isArray(arr)) {
          return arr;
        } else if (Symbol.iterator in Object(arr)) {
          return sliceIterator(arr, i);
        } else {
          throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }
      };
    }();

    var TimedProxy = function () {
        function TimedProxy(game) {
            var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            classCallCheck(this, TimedProxy);

            this.limit = 10000;
            this.countdown = 5;
            this.countdownSignal = 3;
            this.signalDelay = 100;
            this.counter = -1;
            this.counterSignal = -1;
            this.expired = false;
            this.pending = false;
            this.timer = null;
            this.timeoutWinner = null;
            this.game = game;
            this.constructor = game.constructor;
            Object.assign(this, opt);
            this.bind('winning');
            this.bind('links');
            this.bind('rulers');
            this.bind('dots');
        }

        createClass(TimedProxy, [{
            key: 'dispose',
            value: function dispose() {
                this.stop();
            }
        }, {
            key: 'possible',
            value: function possible() {
                return this.game.possible();
            }
        }, {
            key: 'undo',
            value: function undo() {
                this.game.undo();
            }
        }, {
            key: 'move',
            value: function move(m) {
                this.game.move(m);
                if (!this.game.winner && this.game.moves[this.game.moves.length - 1]) {
                    this.start();
                } else {
                    this.stop();
                    this.counter = -1;
                    this.counterSignal = -1;
                    this.expired = false;
                }
            }
        }, {
            key: 'evaluate',
            value: function evaluate() {
                return this.game.evaluate();
            }
        }, {
            key: 'moveToString',
            value: function moveToString(move) {
                return this.game.moveToString ? this.game.moveToString(move) : '';
            }
        }, {
            key: 'stringToMove',
            value: function stringToMove(move) {
                return this.game.stringToMove(move);
            }
        }, {
            key: 'start',
            value: function start() {
                var _this = this;

                this.stop(!!this.limit);
                this.counter = -1;
                this.counterSignal = -1;
                this.expired = false;
                this.timeoutWinner = null;
                if (!this.limit) {
                    return;
                }
                var counter = this.countdown;
                this.timer = setInterval(function () {
                    _this.stop(true);
                    _this.counter = counter;
                    _this.timer = setInterval(function () {
                        counter--;
                        if (counter <= _this.countdownSignal) {
                            _this.counterSignal = counter;
                        }
                        setTimeout(function () {
                            _this.counter = counter;
                            if (!counter) {
                                _this.stop();
                                _this.expired = true;
                                _this.timeoutWinner = other(_this.game.player);
                            }
                        }, _this.signalDelay);
                    }, 1000);
                }, this.limit - counter * 1000 - this.signalDelay);
            }
        }, {
            key: 'stop',
            value: function stop() {
                var pending = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

                this.pending = pending;
                if (this.timer) {
                    clearInterval(this.timer);
                    this.timer = null;
                }
            }
        }, {
            key: 'bind',
            value: function bind(prop) {
                if (this.game[prop]) {
                    this[prop] = this.game[prop].bind(this.game);
                }
            }
        }, {
            key: 'grid',
            get: function get$$1() {
                return this.game.grid;
            }
        }, {
            key: 'scale',
            get: function get$$1() {
                return this.game.scale;
            }
        }, {
            key: 'moves',
            get: function get$$1() {
                return this.game.moves;
            }
        }, {
            key: 'player',
            get: function get$$1() {
                return this.game.player;
            }
        }, {
            key: 'winner',
            get: function get$$1() {
                return this.timeoutWinner || this.game.winner;
            }
        }, {
            key: 'score',
            get: function get$$1() {
                return this.game.score;
            }
        }, {
            key: 'landscape',
            get: function get$$1() {
                return this.game.landscape;
            }
        }, {
            key: 'hull',
            get: function get$$1() {
                return this.game.hull;
            }
        }]);
        return TimedProxy;
    }();

    var _ThemeStones, _StoneNames;
    (function (Theme) {
        Theme[Theme["Checkers"] = 0] = "Checkers";
        Theme[Theme["CheckersHex"] = 1] = "CheckersHex";
        Theme[Theme["Gomoku"] = 2] = "Gomoku";
        Theme[Theme["Hex"] = 3] = "Hex";
        Theme[Theme["Mills"] = 4] = "Mills";
        Theme[Theme["Plastic"] = 5] = "Plastic";
        Theme[Theme["Qirkat"] = 6] = "Qirkat";
        Theme[Theme["Reversi"] = 7] = "Reversi";
        Theme[Theme["TacTickle"] = 8] = "TacTickle";
    })(exports.Theme || (exports.Theme = {}));
    (function (Stones) {
        Stones[Stones["BlackWhite"] = 0] = "BlackWhite";
        Stones[Stones["OrangeBlue"] = 1] = "OrangeBlue";
        Stones[Stones["RedYellow"] = 2] = "RedYellow";
    })(exports.Stones || (exports.Stones = {}));
    // tslint:disable-next-line:variable-name
    var ThemeStones = (_ThemeStones = {}, defineProperty(_ThemeStones, exports.Theme.Checkers, exports.Stones.BlackWhite), defineProperty(_ThemeStones, exports.Theme.CheckersHex, exports.Stones.BlackWhite), defineProperty(_ThemeStones, exports.Theme.Gomoku, exports.Stones.BlackWhite), defineProperty(_ThemeStones, exports.Theme.Hex, exports.Stones.OrangeBlue), defineProperty(_ThemeStones, exports.Theme.Mills, exports.Stones.BlackWhite), defineProperty(_ThemeStones, exports.Theme.Plastic, exports.Stones.RedYellow), defineProperty(_ThemeStones, exports.Theme.Qirkat, exports.Stones.BlackWhite), defineProperty(_ThemeStones, exports.Theme.Reversi, exports.Stones.BlackWhite), defineProperty(_ThemeStones, exports.Theme.TacTickle, exports.Stones.OrangeBlue), _ThemeStones);
    // tslint:disable-next-line:variable-name
    var StoneNames = (_StoneNames = {}, defineProperty(_StoneNames, exports.Stones.BlackWhite, ['Black', 'White']), defineProperty(_StoneNames, exports.Stones.OrangeBlue, ['Orange', 'Blue']), defineProperty(_StoneNames, exports.Stones.RedYellow, ['Red', 'Yellow']), _StoneNames);

    function connections(move, player, min) {
        var done = {};
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = move.links[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _ref = _step.value;

                var _ref2 = slicedToArray(_ref, 2);

                var n = _ref2[0];
                var m = _ref2[1];

                // const opposite = move.opposite ? move.opposite(n) : -n;
                var opposite = -n;
                if (!done[opposite]) {
                    done[opposite] = true;
                    var o = m;
                    var v = 1;
                    while (o && o.data === player) {
                        v++;
                        o = o.links.get(n);
                        o = o !== move ? o : false;
                    }
                    o = move.links.get(opposite);
                    while (o && o.data === player) {
                        v++;
                        o = o.links.get(opposite);
                        o = o !== move ? o : false;
                    }
                    if (v >= min) {
                        return true;
                    }
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }

    //# sourceMappingURL=evaluateLines.js.map

    function evaluateLinked(tiles, min, player) {
        var c = 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = tiles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var t = _step.value;

                var s = [];
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = t.links[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var u = _step2.value;

                        if (u[0] > 0) {
                            var to = u[1];
                            var fromTile = t.links.get(t.opposite ? t.opposite(u[0]) : -u[0]);
                            if ((!fromTile || fromTile.data !== player) && to.data === player) {
                                s.push(u[0]);
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                if (!s.length) {
                    var mp = 0;
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                        for (var _iterator3 = t.links.values()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var d = _step3.value;

                            if (!d.data) {
                                mp++;
                            }
                        }
                    } catch (err) {
                        _didIteratorError3 = true;
                        _iteratorError3 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                _iterator3.return();
                            }
                        } finally {
                            if (_didIteratorError3) {
                                throw _iteratorError3;
                            }
                        }
                    }

                    c += mp / 8;
                    continue;
                }
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = s[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var k = _step4.value;

                        c += evaluate$1(t, k, min, player);
                    }
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
                        }
                    } finally {
                        if (_didIteratorError4) {
                            throw _iteratorError4;
                        }
                    }
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return c;
    }
    function evaluate$1(t, k, min, player) {
        var l = [];
        var i = t;
        while (i) {
            l.push(i);
            i = i.links.get(k);
            if (!i || i.data !== player) {
                break;
            }
        }
        var f = 0;
        i = l[0].links.get(-k);
        if (i && !i.data) {
            f++;
        }
        i = l[l.length - 1].links.get(k);
        if (i && !i.data) {
            f++;
        }
        if (!f && l.length < min) {
            return 0;
        }
        return Math.pow(min, l.length + 1 + (l.length >= min ? 1 : 0)) - Math.pow(min, l.length) * (2 - f);
    }
    //# sourceMappingURL=evaluateLinked.js.map

    function winning(move, player, min) {
        var done = {};
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = move.links[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var n = _step.value;

                if (done[-n[0]]) {
                    continue;
                }
                var result = [move];
                done[-n[0]] = true;
                var v = getWinning(n, player, result, move);
                if (v >= min) {
                    return result;
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
    function getWinning(n, player, result, move) {
        var o = n[1];
        var v = 1;
        while (o && o.data === player) {
            result.push(o);
            v++;
            o = o.links.get(n[0]);
            o = o !== move ? o : false;
        }
        o = move.links.get(-n[0]);
        while (o && o.data === player) {
            result.unshift(o);
            v++;
            o = o.links.get(-n[0]);
            o = o !== move ? o : false;
        }
        return v;
    }
    //# sourceMappingURL=winning.js.map

    //# sourceMappingURL=index.js.map

    function moveToString(move) {
        if (!move) {
            return 'pass';
        }
        var p = this.grid.toPoint(move);
        return stringifyPosition(p);
    }
    function stringToMove(move) {
        var p = parsePosition(move);
        if (!p) {
            return p;
        }
        var t = this.grid.tile.apply(this.grid, p);
        return this.tileMap.get(t.key);
    }
    function movesToString(move) {
        if (!move) {
            return 'pass';
        }
        var p = (Array.isArray(move) ? move : [move]).map(this.grid.toPoint);
        return stringifyPositions(p);
    }
    function jumpsToString(move) {
        if (!move) {
            return 'pass';
        }
        var p = (Array.isArray(move) ? move : [move]).reduce(function (r, t) {
            var a = Array.isArray(t) ? t.slice() : [t];
            a.reverse();
            a.forEach(function (d) {
                return r.push(d);
            });
            return r;
        }, []).map(this.grid.toPoint);
        return stringifyPositions(p);
    }
    function stringsToJump(move) {
        var p = parsePositions(move);
        if (!p) {
            return p;
        }
        var m = [getTile.call(this, p.shift())];
        if (p.length === 1) {
            m.push(getTile.call(this, p.shift()));
        } else {
            while (p.length) {
                var b = getTile.call(this, p.shift());
                var a = getTile.call(this, p.shift());
                m.push([a, b]);
            }
        }
        return m;
    }
    function getTile(t) {
        return this.tileMap.get(this.grid.tile.apply(this.grid, t).key);
    }
    function stringsToMove(move) {
        var _this = this;

        var p = parsePositions(move);
        if (!p) {
            return p;
        }
        return p.map(function (pp) {
            var t = _this.grid.tile.apply(_this.grid, pp);
            return _this.tileMap.get(t.key);
        });
    }
    //# sourceMappingURL=index.js.map

    function undo() {
        var move = this.moves.pop();
        move.data = null;
        this.freeTileMap.set(move.key, move);
        this.player = other(this.player);
        this.finished = false;
        this.winner = 0;
        this.playerTiles[this.player].pop();
    }
    //# sourceMappingURL=undo.js.map

    //# sourceMappingURL=index.js.map

    var ConnectGameBase = function () {
        function ConnectGameBase(grid, min) {
            classCallCheck(this, ConnectGameBase);

            this.moves = [];
            this.player = 1;
            this.winner = 0;
            this.finished = false;
            this.playerTiles = {};
            this.moveToString = moveToString.bind(this);
            this.stringToMove = stringToMove.bind(this);
            this.undo = undo.bind(this);
            this.grid = grid;
            this.min = min;
            this.tileMap = gridy.toMap(this.grid.tiles);
            this.freeTileMap = gridy.toMap(this.grid.tiles);
            gridy.link(this.tileMap);
        }

        createClass(ConnectGameBase, [{
            key: 'init',
            value: function init(record) {
                var moves = parseRecord(record);
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = moves[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var move = _step.value;

                        this.move(this.tileMap.get(this.grid.tile(move[0], move[1]).key));
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        }, {
            key: 'possible',
            value: function possible() {
                if (this.finished) {
                    return [];
                }
                // const arr = toArray(this.freeTileMap) as any;
                // for (const t of arr) {
                //   t.sort = 0;
                //   for (const n of t.links.values()) {
                //     t.sort += n.data ? 1 : 0;
                //   }
                // }
                // arr.sort((a: any, b: any) => (a.sort - b.sort));
                // return arr;
                return gridy.toArray(this.freeTileMap);
            }
        }, {
            key: 'move',
            value: function move(m) {
                m.data = this.player;
                (this.playerTiles[this.player] || (this.playerTiles[this.player] = [])).push(m);
                this.player = other(this.player);
                this.moves.push(m);
                this.freeTileMap.delete(m.key);
                this.winner = this.getWinner();
                if (this.moves.length === this.grid.tiles.length || this.winner) {
                    this.finished = true;
                }
            }
        }, {
            key: 'evaluate',
            value: function evaluate() {
                var a = evaluateLinked(this.playerTiles[this.player] || [], this.min, this.player);
                var b = evaluateLinked(this.playerTiles[other(this.player)] || [], this.min, other(this.player));
                return a - b * this.min;
            }
        }, {
            key: 'getWinner',
            value: function getWinner() {
                var w = connections(this.moves[this.moves.length - 1], other(this.player), this.min);
                if (w) {
                    return other(this.player);
                }
                return this.moves.length === this.grid.tiles.length ? -1 : 0;
            }
        }, {
            key: 'winning',
            value: function winning$$1() {
                var m = this.moves[this.moves.length - 1];
                return winning(m, m.data, this.min);
            }
        }]);
        return ConnectGameBase;
    }();
    ConnectGameBase.theme = exports.Theme.Gomoku;

    var TicTacToeGame = function (_ConnectGameBase) {
        inherits(TicTacToeGame, _ConnectGameBase);

        function TicTacToeGame() {
            classCallCheck(this, TicTacToeGame);
            return possibleConstructorReturn(this, (TicTacToeGame.__proto__ || Object.getPrototypeOf(TicTacToeGame)).call(this, new gridy.RectangularGrid(1, false, gridy.Shape.Even, 3, 3, gridy.Rectangular8Tile), 3));
        }

        return TicTacToeGame;
    }(ConnectGameBase);
    TicTacToeGame.title = 'Tic Tac Toe';
    TicTacToeGame.theme = exports.Theme.Hex;
    TicTacToeGame.group = 'Connect';
    TicTacToeGame.aliases = ['Noughts and Crosses', 'Xs and Os', 'Exy-ozys'];
    TicTacToeGame.created = -1300;
    TicTacToeGame.location = 'Egypt';
    TicTacToeGame.wiki = 'https://en.wikipedia.org/wiki/Tic-tac-toe';
    TicTacToeGame.rules = ['Connect three pieces'];
    TicTacToeGame.sample = 'b2, b3, a3, c1, c3, a2, a1';

    var TicTacToeRoundGame = function (_ConnectGameBase) {
        inherits(TicTacToeRoundGame, _ConnectGameBase);

        function TicTacToeRoundGame() {
            classCallCheck(this, TicTacToeRoundGame);

            var grid = new gridy.RadialGrid(1, true, gridy.Shape.Even, 3, 4, gridy.Radial8Tile, 1);
            return possibleConstructorReturn(this, (TicTacToeRoundGame.__proto__ || Object.getPrototypeOf(TicTacToeRoundGame)).call(this, grid, 3));
        }

        return TicTacToeRoundGame;
    }(ConnectGameBase);
    TicTacToeRoundGame.title = 'Tic Tac Toe Round';
    TicTacToeRoundGame.theme = exports.Theme.Hex;
    TicTacToeRoundGame.group = 'Connect';
    TicTacToeRoundGame.original = 'TicTacToeGame';
    TicTacToeRoundGame.sample = 'c3, a4, b3, a3, a2, b4, c4';

    var TicTacToeTriGame = function (_ConnectGameBase) {
        inherits(TicTacToeTriGame, _ConnectGameBase);

        function TicTacToeTriGame() {
            classCallCheck(this, TicTacToeTriGame);

            var _this = possibleConstructorReturn(this, (TicTacToeTriGame.__proto__ || Object.getPrototypeOf(TicTacToeTriGame)).call(this, new gridy.TriangularGrid(1, false, gridy.Shape.Triangular, 3, 3), 3));

            _this.landscape = true;
            return _this;
        }

        return TicTacToeTriGame;
    }(ConnectGameBase);
    TicTacToeTriGame.title = 'Tic Tac Toe Tri';
    TicTacToeTriGame.theme = exports.Theme.Hex;
    TicTacToeTriGame.group = 'Connect';
    TicTacToeTriGame.original = 'TicTacToeGame';
    TicTacToeTriGame.sample = 'a2, b2, b1, a1, c1';

    var TacTickleGameBase = function () {
        function TacTickleGameBase(grid) {
            var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
            var directions = arguments[2];
            var lines = arguments[3];
            classCallCheck(this, TacTickleGameBase);

            this.moves = [];
            this.player = 1;
            this.winner = 0;
            this.playerTiles = { 1: [], 2: [] };
            this.moveToString = movesToString.bind(this);
            this.stringToMove = stringsToMove.bind(this);
            this.finished = false;
            this.grid = grid;
            this.tileMap = gridy.toMap(grid.tiles);
            gridy.link(this.tileMap);
            this.min = min;
            this.init(lines);
            this.directions = directions.map(function (_ref) {
                var _ref2 = slicedToArray(_ref, 1),
                    d = _ref2[0];

                return d;
            });
        }

        createClass(TacTickleGameBase, [{
            key: 'possible',
            value: function possible() {
                var _this = this;

                // throw new Error("Method not implemented.");
                if (this.finished) {
                    return [];
                }
                return this.grid.tiles.reduce(function (r, t) {
                    if (t.data !== _this.player) {
                        return r;
                    }
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = t.links[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var _ref3 = _step.value;

                            var _ref4 = slicedToArray(_ref3, 2);

                            var dir = _ref4[0];
                            var nei = _ref4[1];

                            if (!nei.data && _this.directions.indexOf(dir) > -1) {
                                r.push([t, nei]);
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }

                    return r;
                }, []);
            }
        }, {
            key: 'move',
            value: function move(m) {
                m[1].data = m[0].data;
                m[0].data = null;
                this.player = other(this.player);
                this.moves.push(m);
                var w = connections(m[1], m[1].data, this.min);
                if (w) {
                    this.finished = true;
                    this.winner = m[1].data;
                } else if (this.moves.length === this.grid.tiles.length * 2) {
                    this.finished = true;
                    this.winner = -1;
                }
            }
        }, {
            key: 'undo',
            value: function undo() {
                var move = this.moves.pop();
                move[0].data = move[1].data;
                move[1].data = null;
                this.player = other(this.player);
                this.finished = false;
                this.winner = 0;
            }
        }, {
            key: 'evaluate',
            value: function evaluate() {
                throw new Error('Method not implemented.');
            }
        }, {
            key: 'winning',
            value: function winning$$1() {
                var m = this.moves[this.moves.length - 1];
                return winning(m[1], m[1].data, this.min);
            }
        }, {
            key: 'init',
            value: function init() {
                var lines = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [[0, 0, 1], [0, this.grid.y - 1, 0]];
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = lines[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var _ref5 = _step2.value;

                        var _ref6 = slicedToArray(_ref5, 3);

                        var xx = _ref6[0];
                        var y = _ref6[1];
                        var skip = _ref6[2];

                        for (var x = xx; x < xx + 4; x++) {
                            var t = this.tileMap.get(this.grid.tile(x, y).key);
                            var p = (x + skip) % 2 + 1;
                            if (!t) {
                                continue;
                            }
                            t.data = p;
                            // this.playerTiles[p].push(t);
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            }
        }]);
        return TacTickleGameBase;
    }();
    TacTickleGameBase.theme = exports.Theme.TacTickle;
    TacTickleGameBase.move = true;

    var TacTickleGame = function (_TacTickleGameBase) {
        inherits(TacTickleGame, _TacTickleGameBase);

        function TacTickleGame() {
            classCallCheck(this, TacTickleGame);
            return possibleConstructorReturn(this, (TacTickleGame.__proto__ || Object.getPrototypeOf(TacTickleGame)).call(this, new gridy.RectangularGrid(1, undefined, gridy.Shape.Even, 4, 5, gridy.Rectangular8Tile), 3, gridy.RectangularTile.directions));
        }

        return TacTickleGame;
    }(TacTickleGameBase);
    TacTickleGame.title = 'Tac-tickle';
    TacTickleGame.group = 'Move to Connect';
    TacTickleGame.authors = ['NRICH'];
    TacTickleGame.source = 'https://nrich.maths.org/1240';
    TacTickleGame.created = '2000';
    TacTickleGame.rules = ['Move to connect three pieces'];
    TacTickleGame.sample = 'c5-c4, b5-b4, d1-d2, a1-a2, a5-b5, b4-a4, d2-d3';

    var TacTickle4Game = function (_TacTickleGameBase) {
        inherits(TacTickle4Game, _TacTickleGameBase);

        function TacTickle4Game() {
            classCallCheck(this, TacTickle4Game);
            return possibleConstructorReturn(this, (TacTickle4Game.__proto__ || Object.getPrototypeOf(TacTickle4Game)).call(this, new gridy.RectangularGrid(1, undefined, gridy.Shape.Even, 4, 4, gridy.Rectangular8Tile), 3, gridy.RectangularTile.directions));
        }

        return TacTickle4Game;
    }(TacTickleGameBase);
    TacTickle4Game.title = 'Tac-tickle 4x4';
    TacTickle4Game.group = 'Move to Connect';
    TacTickle4Game.aliases = ['Tic Tackle'];
    TacTickle4Game.original = 'TacTickleGame';
    TacTickle4Game.sample = 'c4-c3, a1-a2, d1-d2, d4-c4, c3-b3, c1-c2, d2-d1, c4-c3, b3-a3, c2-d2';

    var TacTickleHexGame = function (_TacTickleGameBase) {
        inherits(TacTickleHexGame, _TacTickleGameBase);

        function TacTickleHexGame() {
            classCallCheck(this, TacTickleHexGame);
            return possibleConstructorReturn(this, (TacTickleHexGame.__proto__ || Object.getPrototypeOf(TacTickleHexGame)).call(this, new gridy.HexagonalGrid(1, true, gridy.Shape.Even, 4, 5), 3, gridy.HexagonalTile.directions));
        }

        return TacTickleHexGame;
    }(TacTickleGameBase);
    TacTickleHexGame.title = 'Tac-tickle Hex';
    TacTickleHexGame.group = 'Move to Connect';
    TacTickleHexGame.original = 'TacTickleGame';
    TacTickleHexGame.sample = 'b1-c2, d5-d4, c5-c4, c1-d2, a5-b4, b5-a5, c4-b3';

    var TacTickleHex2Game = function (_TacTickleGameBase) {
        inherits(TacTickleHex2Game, _TacTickleGameBase);

        function TacTickleHex2Game() {
            classCallCheck(this, TacTickleHex2Game);

            var grid = new gridy.HexagonalGrid(1, true, gridy.Shape.Hexagonal, 4);
            gridy.normalize(grid);
            return possibleConstructorReturn(this, (TacTickleHex2Game.__proto__ || Object.getPrototypeOf(TacTickleHex2Game)).call(this, grid, 3, gridy.HexagonalTile.directions, [[3, 0, 0], [0, 6, 0]]));
        }

        return TacTickleHex2Game;
    }(TacTickleGameBase);
    TacTickleHex2Game.title = 'Tac-tickle Hex2';
    TacTickleHex2Game.group = 'Move to Connect';
    TacTickleHex2Game.original = 'TacTickleGame';
    // tslint:disable-next-line:max-line-length
    TacTickleHex2Game.sample = 'g1-f2, f1-e2, f2-f3, d7-d6, f3-e4, b7-b6, e4-d5, d6-c6, d5-c5, d1-d2, a7-b7, e2-d3, e1-f1, d3-c4, f1-e2, d2-d3, c5-b5, b6-c5';

    var TacTickleRoundGame = function (_TacTickleGameBase) {
        inherits(TacTickleRoundGame, _TacTickleGameBase);

        function TacTickleRoundGame() {
            classCallCheck(this, TacTickleRoundGame);
            return possibleConstructorReturn(this, (TacTickleRoundGame.__proto__ || Object.getPrototypeOf(TacTickleRoundGame)).call(this, new gridy.RadialGrid(1, false, gridy.Shape.Even, 4, 5, gridy.Radial8Tile, 1), 3, gridy.RadialTile.directions, [[0, 1, 1], [0, 4, 0]]));
        }

        return TacTickleRoundGame;
    }(TacTickleGameBase);
    TacTickleRoundGame.title = 'Tac-tickle Round';
    TacTickleRoundGame.group = 'Move to Connect';
    TacTickleRoundGame.original = 'TacTickleGame';
    TacTickleRoundGame.sample = 'c5-c4, c2-c3, b2-b3, b5-b4, b3-a3, d5-d4, c4-c5, a2-b2';

    var TacTickleTriGame = function (_TacTickleGameBase) {
        inherits(TacTickleTriGame, _TacTickleGameBase);

        function TacTickleTriGame() {
            classCallCheck(this, TacTickleTriGame);
            return possibleConstructorReturn(this, (TacTickleTriGame.__proto__ || Object.getPrototypeOf(TacTickleTriGame)).call(this, new gridy.TriangularGrid(1, true, gridy.Shape.Rhombus, 4, 4), 3, gridy.TriangularTile.directions1, [[2, 0, 1], [2, 3, 1]]));
        }

        return TacTickleTriGame;
    }(TacTickleGameBase);
    TacTickleTriGame.title = 'Tac-tickle Tri';
    TacTickleTriGame.group = 'Move to Connect';
    TacTickleTriGame.original = 'TacTickleGame';
    // tslint:disable-next-line:max-line-length
    TacTickleTriGame.sample = 'f1-e2, c4-d3, f4-g4, e4-f3, g4-h3, d3-e3, d4-c4, e1-f1, c4-d3, f3-g3, d3-c3, f1-g1, d1-c2, g3-h2, c2-d2';

    var ConnectFourGame = function (_ConnectGameBase) {
        inherits(ConnectFourGame, _ConnectGameBase);

        function ConnectFourGame() {
            classCallCheck(this, ConnectFourGame);

            var _this = possibleConstructorReturn(this, (ConnectFourGame.__proto__ || Object.getPrototypeOf(ConnectFourGame)).call(this, new gridy.RectangularGrid(1, false, gridy.Shape.Even, 7, 6, gridy.Rectangular8Tile), 4));

            _this.landscape = true;
            return _this;
        }

        createClass(ConnectFourGame, [{
            key: 'possible',
            value: function possible() {
                if (this.finished) {
                    return [];
                }
                var moves = [];
                for (var x = 0; x < this.grid.x; x++) {
                    for (var y = 0; y < this.grid.y; y++) {
                        var m = this.tileMap.get([x, y].toString());
                        if (!m.data) {
                            moves.push(m);
                            break;
                        }
                    }
                }
                return moves;
            }
        }]);
        return ConnectFourGame;
    }(ConnectGameBase);
    ConnectFourGame.title = 'Connect Four';
    ConnectFourGame.theme = exports.Theme.Plastic;
    ConnectFourGame.group = 'Connect';
    ConnectFourGame.authors = ['Howard Wexler', 'Ned Strongin'];
    ConnectFourGame.created = 1974;
    ConnectFourGame.wiki = 'https://en.wikipedia.org/wiki/Connect_Four';
    ConnectFourGame.aliases = ['Captain\'s Mistress', 'Four Up', 'Gravitrips'];
    ConnectFourGame.rules = ['Connect four pieces'];
    ConnectFourGame.sample = 'c1, d1, c2, e1, b1, f1, g1, d2, d3, c3, e2, e3, e4';

    function isDiagonalCenter(a, b) {
        return isDiagonal(a, b) && (isCenter(a) || isCenter(b));
    }
    function isDiagonal(a, b) {
        return a.x !== b.x && a.y !== b.y;
    }
    function isCenter(a) {
        return a.x % 2 && !(a.y % 2);
    }
    function quirkatSetup(tiles) {
        var i = 0;
        var mid = (tiles.length - 1) / 2;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = tiles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var t = _step.value;

                if (i < mid) {
                    t.data = 1;
                } else if (i > mid) {
                    t.data = 2;
                }
                i++;
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
    function jumpsPossible() {
        var _this = this;

        var o = other(this.player);
        return this.grid.tiles.reduce(function (r, t) {
            if (t.data !== _this.player) {
                return r;
            }
            var leaves = _this.multiJumps({ tile: t }, o);
            return r.concat(leaves);
        }, []);
    }
    function multiJumps(parent, o) {
        var leaves = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
        var depth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
        var removed = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];

        var t = parent.tile;
        parent.jumps = [];
        if (!removed.length) {
            removed.push(t);
        }
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = t.links[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _ref = _step2.value;

                var _ref2 = slicedToArray(_ref, 2);

                var n = _ref2[0];
                var m = _ref2[1];

                if (m.data === o && removed.indexOf(m) === -1) {
                    var d = m.links.get(n);
                    if (d && (!d.data || removed.indexOf(d) > -1)) {
                        var r = { tile: d, removed: m, depth: depth, parent: parent };
                        parent.jumps.push(r);
                        this.multiJumps(r, o, leaves, depth + 1, removed.concat([m]));
                    }
                }
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        if (!parent.jumps.length && depth) {
            leaves.push(parent);
        }
        return leaves;
    }
    function leavesToMoves(r) {
        return r.map(this.leaveToMove);
    }
    function leaveToMove(nodeInput) {
        var result = [];
        var node = nodeInput;
        while (node) {
            if (node.parent) {
                result.unshift([node.tile, node.removed]);
            } else {
                result.unshift(node.tile);
            }
            node = node.parent;
        }
        return result;
    }
    function expandJumps(leaves) {
        return leaves.reduce(function (r, t) {
            var node = t;
            while (node.parent) {
                r.push(node);
                node = node.parent;
            }
            return r;
        }, []);
    }

    var QuirkatBoard = function () {
        function QuirkatBoard(grid) {
            classCallCheck(this, QuirkatBoard);

            this.moves = [];
            this.player = 1;
            this.scale = 1;
            this.winner = 0;
            this.grid = grid;
            this.tileMap = gridy.toMap(this.grid.tiles);
            gridy.link(this.tileMap);
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.grid.tiles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var t = _step.value;
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = t.links[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var _ref = _step2.value;

                            var _ref2 = slicedToArray(_ref, 2);

                            var n = _ref2[0];
                            var m = _ref2[1];

                            if (isDiagonalCenter(m, t)) {
                                t.links.delete(n);
                                m.links.delete(-n);
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }

        createClass(QuirkatBoard, [{
            key: 'rulers',
            value: function rulers() {
                var m = new Map();
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = this.grid.tiles[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var t = _step3.value;
                        var _iteratorNormalCompletion4 = true;
                        var _didIteratorError4 = false;
                        var _iteratorError4 = undefined;

                        try {
                            for (var _iterator4 = t.links[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                var l = _step4.value;

                                var keys = [t.key, l[1].key];
                                keys.sort();
                                m.set(keys.toString(), [t, l[1]]);
                            }
                        } catch (err) {
                            _didIteratorError4 = true;
                            _iteratorError4 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                    _iterator4.return();
                                }
                            } finally {
                                if (_didIteratorError4) {
                                    throw _iteratorError4;
                                }
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }

                return Array.from(m.values());
            }
        }, {
            key: 'dots',
            value: function dots() {
                return this.grid.tiles;
            }
        }]);
        return QuirkatBoard;
    }();
    QuirkatBoard.theme = exports.Theme.Qirkat;
    QuirkatBoard.move = true;

    var QirkatGameBase = function (_QuirkatBoard) {
        inherits(QirkatGameBase, _QuirkatBoard);

        function QirkatGameBase(grid, maxMoves) {
            classCallCheck(this, QirkatGameBase);

            var _this = possibleConstructorReturn(this, (QirkatGameBase.__proto__ || Object.getPrototypeOf(QirkatGameBase)).call(this, grid));

            _this.moveToString = jumpsToString.bind(_this);
            _this.stringToMove = stringsToJump.bind(_this);
            _this.finished = false;
            _this.maxMoves = maxMoves;
            quirkatSetup(grid.tiles);
            var stones = (grid.tiles.length - 1) / 2;
            _this.score = { 1: stones, 2: stones };
            return _this;
        }

        createClass(QirkatGameBase, [{
            key: 'move',
            value: function move(m) {
                var first = m[0];
                var last$$1 = m[m.length - 1];
                last$$1 = Array.isArray(last$$1) ? last$$1[0] : last$$1;
                for (var i = 1; i < m.length; i++) {
                    if (Array.isArray(m[i])) {
                        this.score[m[i][1].data]--;
                        m[i][1].data = null;
                    }
                }
                last$$1.data = first.data;
                if (last$$1 !== first) {
                    first.data = null;
                }
                this.player = other(this.player);
                this.moves.push(m);
                this.winner = this.getWinner();
                if (this.winner) {
                    this.finished = true;
                }
            }
        }, {
            key: 'undo',
            value: function undo() {
                var m = this.moves.pop();
                var first = m[0];
                var last$$1 = m[m.length - 1];
                last$$1 = Array.isArray(last$$1) ? last$$1[0] : last$$1;
                var o = other(last$$1.data);
                for (var i = m.length - 1; i > 0; i--) {
                    var n = m[i];
                    if (Array.isArray(n)) {
                        this.score[o]++;
                        n[1].data = o;
                    }
                }
                first.data = last$$1.data;
                if (last$$1 !== first) {
                    last$$1.data = null;
                }
                this.winner = 0;
                this.finished = false;
                this.player = other(this.player);
            }
        }, {
            key: 'getWinner',
            value: function getWinner() {
                if (!this.score[1]) {
                    return 2;
                } else if (!this.score[2]) {
                    return 1;
                } else if (this.moves.length === this.maxMoves) {
                    return -1;
                } else {
                    return 0;
                }
            }
        }, {
            key: 'possible',
            value: function possible() {
                if (this.finished) {
                    return [];
                }
                var result = this.jumpsPossible();
                result = this.topJumps(result);
                result = this.leavesToMoves(result);
                if (!result.length) {
                    result = this.simplePossible();
                }
                return result;
            }
        }, {
            key: 'leavesToMoves',
            value: function leavesToMoves$$1(r) {
                return r.map(this.leaveToMove);
            }
        }, {
            key: 'leaveToMove',
            value: function leaveToMove$$1(nodeInput) {
                var result = [];
                var node = nodeInput;
                while (node) {
                    if (node.parent) {
                        result.unshift([node.tile, node.removed]);
                    } else {
                        result.unshift(node.tile);
                    }
                    node = node.parent;
                }
                return result;
            }
        }, {
            key: 'topJumps',
            value: function topJumps(r) {
                if (!r.length) {
                    return r;
                }
                r.sort(function (a, b) {
                    return b.depth - a.depth;
                });
                var d = r[0].depth;
                return r.filter(function (t) {
                    return t.depth === d;
                });
            }
        }, {
            key: 'jumpsPossible',
            value: function jumpsPossible$$1() {
                var _this2 = this;

                var o = other(this.player);
                return this.grid.tiles.reduce(function (r, t) {
                    if (t.data !== _this2.player) {
                        return r;
                    }
                    var leaves = _this2.multiJumps({ tile: t }, o);
                    return r.concat(leaves);
                }, []);
            }
        }, {
            key: 'multiJumps',
            value: function multiJumps$$1(parent, o) {
                var leaves = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
                var depth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
                var removed = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];

                var t = parent.tile;
                parent.jumps = [];
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = t.links[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var _ref = _step.value;

                        var _ref2 = slicedToArray(_ref, 2);

                        var n = _ref2[0];
                        var m = _ref2[1];

                        if (m.data === o && removed.indexOf(m) === -1) {
                            var d = m.links.get(n);
                            if (d && !d.data) {
                                var r = { tile: d, removed: m, depth: depth, parent: parent };
                                parent.jumps.push(r);
                                this.multiJumps(r, o, leaves, depth + 1, removed.concat([m]));
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                if (!parent.jumps.length && depth) {
                    leaves.push(parent);
                }
                return leaves;
            }
        }, {
            key: 'jumpPossible',
            value: function jumpPossible(t, p, o) {
                var result = [];
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = t.links[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var _ref3 = _step2.value;

                        var _ref4 = slicedToArray(_ref3, 2);

                        var n = _ref4[0];
                        var m = _ref4[1];

                        if (m.data === o) {
                            var d = m.links.get(n);
                            if (d && !d.data) {
                                result.push([t, [d, m]]);
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                return result;
            }
        }, {
            key: 'simplePossible',
            value: function simplePossible() {
                var _this3 = this;

                return this.grid.tiles.reduce(function (r, t) {
                    if (t.data !== _this3.player) {
                        return r;
                    }
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                        for (var _iterator3 = t.links[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var _ref5 = _step3.value;

                            var _ref6 = slicedToArray(_ref5, 2);

                            var n = _ref6[0];
                            var m = _ref6[1];

                            if (!m.data) {
                                r.push([t, m]);
                            }
                        }
                    } catch (err) {
                        _didIteratorError3 = true;
                        _iteratorError3 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                _iterator3.return();
                            }
                        } finally {
                            if (_didIteratorError3) {
                                throw _iteratorError3;
                            }
                        }
                    }

                    return r;
                }, []);
            }
        }]);
        return QirkatGameBase;
    }(QuirkatBoard);

    var SIZE = 5;
    var QirkatGame = function (_QirkatGameBase) {
        inherits(QirkatGame, _QirkatGameBase);

        function QirkatGame() {
            classCallCheck(this, QirkatGame);
            return possibleConstructorReturn(this, (QirkatGame.__proto__ || Object.getPrototypeOf(QirkatGame)).call(this, new gridy.RectangularGrid(1, false, gridy.Shape.Even, SIZE, SIZE, gridy.Rectangular8Tile), SIZE * SIZE * 3));
        }

        return QirkatGame;
    }(QirkatGameBase);
    QirkatGame.title = 'Qirkat';
    QirkatGame.group = 'Qirkat';
    QirkatGame.created = 950;
    QirkatGame.aliases = ['Alquerque'];
    QirkatGame.location = 'Middle East';
    QirkatGame.wiki = 'https://en.wikipedia.org/wiki/Alquerque';
    QirkatGame.rules = ['Capture all pieces'];
    // tslint:disable-next-line:max-line-length
    QirkatGame.sample = 'c2-c3, c4-c3-c2, c1-c2-c3, d2-c1, c3-c4, c5-c4-c3, b4-c3-d2, e1-d2-c3, b2-c2, e2-e1, c2-c3-c4, d4-c4-b4-b3-b2, a2-b2-c2, c1-c2-c3, b5-b4, d3-d4, b4-c3-d2, d1-d2-d3, a5-b5, d5-c5, b5-c5-d5, e5-d5-c5, a3-b2, d4-e5, b2-a2, e3-e2, a1-b2, c5-d4, b2-c2, e4-e3, a4-a5, e1-d2, a2-b2, e5-e4, b2-a3, d2-c2-b2, a3-b2-c1, d3-d2, a5-a4, d4-e5, c1-b2, e2-e1, b2-c1, e3-e2, c1-d2-e3, e1-d1, e3-e2-e1-d1-c1, e4-e3, c1-b2, e3-e2, b1-a1, e2-e3, b2-a3, e5-e4, a3-b2, e3-e2, b2-c3, e4-e5, a1-a2, e2-d2, c3-d2-e1, e5-d5, a4-a5, d5-e5, a2-a3, e5-e4, a5-b5, e4-e5, b5-c5, e5-e4, c5-d4, e4-d4-c4, a3-b3, c4-b4, b3-b4-b5';

    var SIZE$1 = 3;
    var Qirkat3Game = function (_QirkatGameBase) {
        inherits(Qirkat3Game, _QirkatGameBase);

        function Qirkat3Game() {
            classCallCheck(this, Qirkat3Game);
            return possibleConstructorReturn(this, (Qirkat3Game.__proto__ || Object.getPrototypeOf(Qirkat3Game)).call(this, new gridy.RectangularGrid(1, false, gridy.Shape.Even, SIZE$1, SIZE$1, gridy.Rectangular8Tile), SIZE$1 * SIZE$1 * 3));
        }

        return Qirkat3Game;
    }(QirkatGameBase);
    Qirkat3Game.title = 'Qirkat 3x3';
    Qirkat3Game.group = 'Qirkat';
    Qirkat3Game.original = 'QirkatGame';
    // tslint:disable-next-line:max-line-length
    Qirkat3Game.sample = 'b1-b2, b3-b2-b1, a2-b2, b1-b2-b3, a3-a2, c1-b2, a2-a3, b2-b1, a1-b1-c1, b3-b2, c1-b1, b2-c1, b1-a1, c1-b1, a1-b1-c1, c2-b2, c1-b1, b2-a2, a3-a2-a1, c3-b3, b1-c1, b3-c3, a1-a2, c3-b3, a2-b2, b3-b2-b1, c1-b1-a1';

    var SIZE$2 = 7;
    var Qirkat7Game = function (_QirkatGameBase) {
        inherits(Qirkat7Game, _QirkatGameBase);

        function Qirkat7Game() {
            classCallCheck(this, Qirkat7Game);
            return possibleConstructorReturn(this, (Qirkat7Game.__proto__ || Object.getPrototypeOf(Qirkat7Game)).call(this, new gridy.RectangularGrid(1, false, gridy.Shape.Even, SIZE$2, SIZE$2, gridy.Rectangular8Tile), SIZE$2 * SIZE$2 * 3));
        }

        return Qirkat7Game;
    }(QirkatGameBase);
    Qirkat7Game.title = 'Qirkat 7x7';
    Qirkat7Game.group = 'Qirkat';
    Qirkat7Game.original = 'QirkatGame';
    // tslint:disable-next-line:max-line-length
    Qirkat7Game.sample = 'c4-d4, e4-d4-c4, b4-c4-d4, d6-c5-b4, d4-d5-d6, e7-d6-c5, b6-c5-d4, b4-b5-b6-c6-d6, c7-d7-e7-d6-c5, f6-e7, d4-e5-f6-e6-d6, f5-e5, a3-b4, e5-d6-c7, b7-c7-d7, e7-d7-c7, b4-a3, g5-f6, c5-b6, f6-g5, b6-c5, f7-f6, c5-b6, f6-e5, c3-d4, e1-d2-c3, c2-c3-c4, e5-d4-c3-c4-c5, b6-c5-d4, e3-d3-c3-d4-e5, d1-e1, f1-e1-d1, c1-d1-e1-e2-e3, f4-e3-d2, a5-b5, c7-d7, b5-b6, g5-f4, b2-c2, d2-c2-b2-b3-b4, a4-b4-c4, g6-g5, b1-b2, e5-f5, b6-c6, g7-f6, c6-c7, d7-c7-b7, a7-b7-c7, f6-e5, b2-c2, f2-e2, a1-b1, f5-f6, a3-b4, e5-e4, b4-a5, g1-f1, a5-b6, g3-f2, c4-c3, g4-g3, a6-a5, f2-e3, b1-a1, e4-d4, c3-d4-e5-f6-g7, g5-f6, g7-f6-e5, f4-e5-d6, c7-d6-e5, g3-f2, a1-b1, g2-g3, e5-f6, e3-d3, f6-f5, f2-e3, a2-a1, d3-d2, b6-a6, d2-c2-b2, b1-b2-b3, e3-e4, a6-a7, e2-e1, a5-a6, e4-e3, f5-e5, g3-g4, a6-a5, g4-g3, e5-d6, e3-e4, b3-b4, e1-d2, d6-d7, d2-c1, b4-c5, f3-f2, c5-c4, f1-g1, d7-c7, e4-e3, a5-b6, f2-f3, c7-b7, g3-g4, b6-c6, e3-e4, c4-b4, c1-c2, b4-c5, g1-f1, c5-c4, g4-f4, a1-b1, c2-c3, c4-c3-c2, e4-d4, c6-d6, d4-e5, d6-c5, e5-d4, c5-d4-e3-f3-g3-f4-e5, f1-g1, e5-d6, g1-f2, b1-b2, f2-e2, c2-d2, e2-d2-c2-b2-a2, d6-c5, a2-a1, a7-a6, a1-b1, c5-c4, b1-a1, a6-a5, a1-b2, a5-a4, b2-c3, c4-c3-c2';

    var SIZE$3 = 5;
    var QirkatHexGame = function (_QirkatGameBase) {
        inherits(QirkatHexGame, _QirkatGameBase);

        function QirkatHexGame() {
            classCallCheck(this, QirkatHexGame);

            var grid = new gridy.HexagonalGrid(1, true, gridy.Shape.Rhombus, SIZE$3, SIZE$3);
            gridy.normalize(grid);

            var _this = possibleConstructorReturn(this, (QirkatHexGame.__proto__ || Object.getPrototypeOf(QirkatHexGame)).call(this, grid, SIZE$3 * SIZE$3 * SIZE$3 * 3));

            _this.hull = true;
            return _this;
        }

        return QirkatHexGame;
    }(QirkatGameBase);
    QirkatHexGame.title = 'Qirkat Hex';
    QirkatHexGame.group = 'Qirkat';
    QirkatHexGame.original = 'QirkatGame';
    // tslint:disable-next-line:max-line-length
    QirkatHexGame.sample = 'c2-c3, c4-c3-c2, c1-c2-c3, d1-c2, c3-c2-c1, d3-c3, b3-c3-d3-d2-d1, e3-d3, a3-b3, e2-e3, b3-a3, e1-e2, d1-c2, d3-d2, a4-b3, d4-d3, a5-a4, c5-b5-a5-b4-c3, c2-c3-c4, d3-c4-b5, b3-b4, b5-b4-b3, a3-b3-c3-d2-e1, d5-c5, e1-d1, e2-d3, d1-d2, d3-d2-d1, c1-d1-e1, e3-d3, e1-d1, c5-d5, b2-b3, d3-d2, d1-d2-d3, e4-e3, b3-c2, e3-d3-c3-c2-c1, b1-c1-d1, d5-d4, d1-c2, d4-d3, c2-c3, d3-c3-b3, a4-b3-c2, e5-d5, c2-c1, d5-e4, c1-b1, e4-e3, a2-a3, e3-d4, b1-b2, d4-e3, a3-a2, e3-d4, a2-a3, d4-e3, a3-a4, e3-d4, a4-a3, d4-e3, a3-a4, e3-e2, a1-a2, e2-e1, a2-a3, e1-d1, b2-c1, d1-c1-b1, a3-a2, b1-a1, a2-a3, a1-a2, a3-a2-a1';

    var SIZE$4 = 7;
    var QirkatHex7Game = function (_QirkatGameBase) {
        inherits(QirkatHex7Game, _QirkatGameBase);

        function QirkatHex7Game() {
            classCallCheck(this, QirkatHex7Game);

            var grid = new gridy.HexagonalGrid(1, true, gridy.Shape.Rhombus, SIZE$4, SIZE$4);
            gridy.normalize(grid);

            var _this = possibleConstructorReturn(this, (QirkatHex7Game.__proto__ || Object.getPrototypeOf(QirkatHex7Game)).call(this, grid, SIZE$4 * SIZE$4 * 3));

            _this.hull = true;
            return _this;
        }

        return QirkatHex7Game;
    }(QirkatGameBase);
    QirkatHex7Game.title = 'Qirkat Hex 7x7';
    QirkatHex7Game.group = 'Qirkat';
    QirkatHex7Game.original = 'QirkatGame';
    // tslint:disable-next-line:max-line-length
    QirkatHex7Game.sample = 'd3-d4, d5-d4-d3, d2-d3-d4, d6-d5, d4-d5-d6, d7-d6-d5, c3-d2, e1-d2-c3, b3-c3-d3, e3-d3-c3, b4-c3-d2, e2-e3, b5-b4, d5-c5-b5-c4-d3, d2-d3-d4, e3-d4-c5, b6-c5-d4, f1-e2, d4-d5, e5-d5-c5, c6-c5-c4, f2-f1, c4-c5, f3-f2, a7-b6, e4-e5, c5-b5, e5-d5, b4-c3, e6-d7, b7-c6, d5-c6-b7, c7-b7-a7, f2-e3, b5-c5, f5-e6, b2-b3, e3-d3, c3-d3-e3-e2-e1, g3-f3, b1-b2, d7-c7, b3-b4, f3-e4, c1-b1, g1-f2, e1-f1-g1-f2-e3-e4-e5-f4-g3-g2-g1, e6-f5, d1-e1, c7-b7, a7-b7-c7, f5-e5, e1-d2, e7-e6, c5-c4, e5-d5, c7-c6, d5-c6-b7-b6-b5-b4-b3-c2-d1-d2-d3-c4-b5, a6-b5-c4, e6-e5, c4-d3, f6-f5, a3-b3, e5-e6, d3-e2, e6-d7, a2-a3, f5-e5, b3-b4, e5-f4, b4-b3, f4-e5, a3-a2, d7-e6, b3-a3, e5-f4, g1-f2, g4-g3, e2-f1, f7-f6, f1-g1, f6-f7, a4-b3, g3-f3, b3-c3, f3-f2-f1, g1-f1-e1, e6-e5, c3-c4, g5-f5, c4-c3, f5-e6, e1-e2, f7-f6, c3-c2, f6-f7, e2-e3, f4-f5, c2-c1, f5-g4, a3-a4, e5-f5, a4-b3, e6-d7, e3-d4, f5-f6, d4-c5, f6-f5, a5-b5, f5-f4, b5-b6, f7-f6, a2-a3, g7-f7, b6-b7, f6-g5, c1-d1, g6-g7, c5-c6, g5-g6, b3-c3, f7-f6, b2-c1, f4-f3, c1-b2, g6-g5, d1-e1, f6-f7, c6-d5, d7-c7, b7-c7-d7, f7-f6, b1-a2, f3-f4, d5-e4, g7-f7, b2-b1, f7-e7, d7-e7-f7-f6-f5-f4-f3, g4-f5, c3-d3, f5-f4, f3-f4-f5, g5-f5-e5-e4-e3-d3-c3, a3-b3, c3-b3-a3, a2-a3-a4';

    var SIZE$5 = 5;
    var QirkatHex2Game = function (_QirkatGameBase) {
        inherits(QirkatHex2Game, _QirkatGameBase);

        function QirkatHex2Game() {
            classCallCheck(this, QirkatHex2Game);

            var grid = new gridy.HexagonalGrid(1, true, gridy.Shape.Hexagonal, SIZE$5, SIZE$5);
            gridy.normalize(grid);

            var _this = possibleConstructorReturn(this, (QirkatHex2Game.__proto__ || Object.getPrototypeOf(QirkatHex2Game)).call(this, grid, SIZE$5 * SIZE$5 * SIZE$5 * 3));

            _this.hull = true;
            return _this;
        }

        return QirkatHex2Game;
    }(QirkatGameBase);
    QirkatHex2Game.title = 'Qirkat Hex2';
    QirkatHex2Game.group = 'Qirkat';
    QirkatHex2Game.original = 'QirkatGame';
    // tslint:disable-next-line:max-line-length
    QirkatHex2Game.sample = 'e6-e5, e4-e5-e6, e7-e6-e5, f6-e7, e8-e7-e6, f7-e7, d8-e7-f6, g5-f6-e7, e6-e7-e8, f5-f6, e8-f7, g7-f7-e7, d7-e7-f7-f6-f5, g4-f5-e6-e5-e4, e9-f8-g7-g6-g5, h5-g5-f5, d5-e5, f5-e5-d5-d6-d7, c7-d7-e7, f4-f5, e7-e6, f5-e6-d7, c8-d7-e6, h6-h5, d4-d5, g3-g4, d9-d8, e3-d4, c5-d4-e3-f3-g3-g4-g5, h5-g5-f5-e6-d7-d8-d9, c9-d9-e9, e4-e3, d3-e3-f3, f2-f3-f4, c4-d3, e2-d3-c4, c3-c4-c5, e1-d2-c3, b4-c3-d2, i4-h5, a5-b4, h3-g4, d2-e1, g4-h3, d5-d6, f4-f5, b9-c9, h4-g5, c6-d5, f5-e5, d6-e5-f4, g2-f3, f4-f3-f2, f1-f2-f3, d5-d4, h3-g3, e1-e2, h5-g6, d4-d5, i3-h4, e9-e8, g6-f7, e8-f7-g6-g5-g4-g3-g2-f3-e4, h2-g3, d5-c6, g1-g2, e4-d5, g3-f3, b4-a5, f3-e3, e2-e3-e4, i2-h3, b5-b4, h3-i2, c5-b5, i1-h2, e4-f3, g2-f3-e4, d5-e4-f3, h4-i3, b4-c3, i2-h3, b5-c5, h1-g1, c6-d5, i5-h6, f3-e3, h2-i1, c9-d9, i1-h1, d5-d6, i3-h4, e3-f3, h6-i5, b8-c7, h4-h5, c7-c6, h1-i1, c5-b5, h5-h4, a9-b9, h3-i2, f3-g2, g1-g2-g3, a8-a9, i2-i3, c3-b4, g3-g2, c6-c5, i5-i4, b5-c4, g2-g3, d6-d5, i3-h3, c4-d3, i1-i2, c5-b5, h4-g5, d3-d4, g5-g6, b9-b8, h3-i3, d5-e4, g3-f3, e4-f3-g2, g6-h5, d9-d8, h5-g5, d4-e3, i3-h4, a7-a8, i2-i1, b7-c6, h4-h5, b8-c7, g5-g6, c7-b7, g6-g7, d8-e7, h5-g6, a9-b8, g7-f7, e7-f7-g7-g6-g5, i1-h1, g5-f5, h1-g2-f3-e3-d3, b7-a7, d3-e3, b8-b9, i4-i3, b9-b8, i3-i2, a8-b7, e3-f3, b6-c5, f3-e4, f5-f4, e4-e5, f4-e5-d6, i2-i1, b7-c7, i1-h2, b8-a9, h2-h1, a7-a8, h1-g1, d6-e5, g1-f2, c7-d6, f2-f1, d6-d7, f1-e1, d7-e6, e1-e2, a8-a7, e2-f1, c5-d4, f1-e1, c6-d5, e1-d2, b4-c3, d2-c3-b4-b5-b6, a7-b6-c5';

    var CatchTheHareGameBase = function (_QuirkatBoard) {
        inherits(CatchTheHareGameBase, _QuirkatBoard);

        function CatchTheHareGameBase(grid, maxMoves) {
            classCallCheck(this, CatchTheHareGameBase);

            var _this = possibleConstructorReturn(this, (CatchTheHareGameBase.__proto__ || Object.getPrototypeOf(CatchTheHareGameBase)).call(this, grid));

            _this.moveToString = jumpsToString.bind(_this);
            _this.stringToMove = stringsToJump.bind(_this);
            _this.jumpsPossible = jumpsPossible.bind(_this);
            _this.multiJumps = multiJumps.bind(_this);
            _this.leavesToMoves = leavesToMoves.bind(_this);
            _this.leaveToMove = leaveToMove.bind(_this);
            _this.expandJumps = expandJumps.bind(_this);
            _this.score = {};
            _this.finished = false;
            _this.maxMoves = maxMoves;
            return _this;
        }

        createClass(CatchTheHareGameBase, [{
            key: 'move',
            value: function move(m) {
                var first = m[0];
                var last$$1 = m[m.length - 1];
                last$$1 = Array.isArray(last$$1) ? last$$1[0] : last$$1;
                for (var i = 1; i < m.length; i++) {
                    if (Array.isArray(m[i])) {
                        this.score[m[i][1].data]--;
                        m[i][1].data = null;
                    }
                }
                last$$1.data = first.data;
                if (last$$1 !== first) {
                    first.data = null;
                }
                this.player = other(this.player);
                this.moves.push(m);
                this.winner = this.getWinner();
                if (this.winner) {
                    this.finished = true;
                }
            }
        }, {
            key: 'possible',
            value: function possible() {
                if (this.finished) {
                    return [];
                }
                if (this.player === 1) {
                    return this.possibleHunters(1);
                } else {
                    return this.possibleHunters(2).concat(this.possibleHare());
                }
            }
        }, {
            key: 'undo',
            value: function undo() {
                var m = this.moves.pop();
                var first = m[0];
                var last$$1 = m[m.length - 1];
                last$$1 = Array.isArray(last$$1) ? last$$1[0] : last$$1;
                var o = other(last$$1.data);
                for (var i = m.length - 1; i > 0; i--) {
                    var n = m[i];
                    if (Array.isArray(n)) {
                        this.score[o]++;
                        n[1].data = o;
                    }
                }
                first.data = last$$1.data;
                if (last$$1 !== first) {
                    last$$1.data = null;
                }
                this.winner = 0;
                this.finished = false;
                this.player = other(this.player);
            }
        }, {
            key: 'evaluate',
            value: function evaluate() {
                throw new Error('Method not implemented.');
            }
        }, {
            key: 'possibleHunters',
            value: function possibleHunters(value) {
                return this.grid.tiles.filter(function (t) {
                    return t.data === value;
                }).reduce(function (r, t) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = t.links[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var _ref = _step.value;

                            var _ref2 = slicedToArray(_ref, 2);

                            var n = _ref2[0];
                            var m = _ref2[1];

                            if (!m.data) {
                                r.push([t, m]);
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }

                    return r;
                }, []);
            }
        }, {
            key: 'possibleHare',
            value: function possibleHare() {
                var result = this.jumpsPossible();
                result = this.expandJumps(result);
                result = this.leavesToMoves(result);
                return result;
            }
        }, {
            key: 'getWinner',
            value: function getWinner() {
                if (this.possible().length === 0) {
                    return other(this.player);
                }
                if (this.score[1] <= 9) {
                    return 2;
                }
                if (this.moves.length === this.maxMoves) {
                    return -1;
                }
                return 0;
            }
        }]);
        return CatchTheHareGameBase;
    }(QuirkatBoard);
    CatchTheHareGameBase.title = 'Catch the Hare';
    CatchTheHareGameBase.group = 'Qirkat';
    CatchTheHareGameBase.wiki = 'https://en.wikipedia.org/wiki/Catch_the_Hare';
    CatchTheHareGameBase.location = 'Europe';
    CatchTheHareGameBase.created = 1283;

    var CatchTheHareGame = function (_CatchTheHareGameBase) {
        inherits(CatchTheHareGame, _CatchTheHareGameBase);

        function CatchTheHareGame() {
            classCallCheck(this, CatchTheHareGame);

            var _this = possibleConstructorReturn(this, (CatchTheHareGame.__proto__ || Object.getPrototypeOf(CatchTheHareGame)).call(this, new gridy.RectangularGrid(1, false, gridy.Shape.Even, 5, 5, gridy.Rectangular8Tile), 5 * 5 * 3));

            for (var i = 0; i < 10; i++) {
                _this.grid.tiles[i].data = 1;
            }
            _this.grid.tiles[10].data = 1;
            _this.grid.tiles[14].data = 1;
            _this.grid.tiles[12].data = 2;
            _this.score = { 1: 12, 2: 1 };
            return _this;
        }

        return CatchTheHareGame;
    }(CatchTheHareGameBase);
    CatchTheHareGame.title = 'Catch the Hare';
    CatchTheHareGame.group = 'Qirkat';
    CatchTheHareGame.wiki = 'https://en.wikipedia.org/wiki/Catch_the_Hare';
    CatchTheHareGame.location = 'Europe';
    CatchTheHareGame.created = 1283;
    CatchTheHareGame.rules = ['Black hunters block hare move', 'White hare captures hunters'];
    // tslint:disable-next-line:max-line-length
    CatchTheHareGame.sample = 'c5-c4, c3-d2, c4-c3, d2-e1, c3-d3, e1-d1, b2-c2, d1-e1, b3-c3, e1-d1, d3-d2, d1-e1, c3-d3, e1-d1, d3-e3, d1-e1, b4-c3, e1-d1, c3-d3, d1-e1, e3-e2, e1-d1, c2-c3, d1-e1, d3-e3, e1-d1, e2-e1, d1-d2-d3, c1-d2, d3-d4, c3-c4, d4-e5, e3-e4, e5-d4, c4-c5, d4-e5, c5-d5, e5-d4, b5-c5, d4-e5, d2-d3, e5-d4, d3-c3, d4-e5, e1-e2, e5-d4, e2-e3, d4-e5, c5-b5, e5-d4, b5-c5, d4-e5, a4-b4, e5-d4, b4-c4, d4-e5, c4-d4';

    var CatchTheHare10Game = function (_CatchTheHareGameBase) {
        inherits(CatchTheHare10Game, _CatchTheHareGameBase);

        function CatchTheHare10Game() {
            classCallCheck(this, CatchTheHare10Game);

            var _this = possibleConstructorReturn(this, (CatchTheHare10Game.__proto__ || Object.getPrototypeOf(CatchTheHare10Game)).call(this, new gridy.RectangularGrid(1, false, gridy.Shape.Even, 5, 5, gridy.Rectangular8Tile), 5 * 5 * 3));

            for (var i = 0; i < 10; i++) {
                _this.grid.tiles[i].data = 1;
            }
            _this.grid.tiles[12].data = 2;
            _this.score = { 1: 10, 2: 1 };
            return _this;
        }

        return CatchTheHare10Game;
    }(CatchTheHareGameBase);
    CatchTheHare10Game.title = 'Catch the Hare 10';
    CatchTheHare10Game.group = 'Qirkat';
    CatchTheHare10Game.original = 'CatchTheHareGame';
    // tslint:disable-next-line:max-line-length
    CatchTheHare10Game.sample = 'b4-c4, c3-c4-c5, a5-b4, c5-b5-a5-b4-c3, a3-b4, c3-b3-a3-a4-a5, b2-c2, a5-b4-c3-c2-c1, a1-b2, c1-b1-a1-a2-a3, b2-b3, a3-b3-c3';

    var MinimaxPlayer = function () {
        function MinimaxPlayer() {
            var depth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;
            classCallCheck(this, MinimaxPlayer);

            this.count = 0;
            this.depth = 0;
            this.depth = depth;
        }

        createClass(MinimaxPlayer, [{
            key: "select",
            value: function select(game) {
                return { move: this.move(game, this.depth), count: this.count };
            }
        }, {
            key: "move",
            value: function move(game, depth) {
                var isMaximisingPlayer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

                this.count = 0;
                var newGameMoves = game.possible();
                var bestMove = -Infinity;
                var bestMoveFound = void 0;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = newGameMoves[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var newGameMove = _step.value;

                        game.move(newGameMove);
                        var value = this.minimax(depth - 1, game, !isMaximisingPlayer);
                        game.undo();
                        if (value > bestMove) {
                            bestMove = value;
                            bestMoveFound = newGameMove;
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                return bestMoveFound;
            }
        }, {
            key: "minimax",
            value: function minimax(depth, game, isMaximisingPlayer) {
                this.count++;
                if (depth === 0) {
                    return game.evaluate();
                }
                var newGameMoves = game.possible();
                if (isMaximisingPlayer) {
                    var bestMove = -Infinity;
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = newGameMoves[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var newGameMove = _step2.value;

                            game.move(newGameMove);
                            bestMove = Math.max(bestMove, this.minimax(depth - 1, game, !isMaximisingPlayer));
                            game.undo();
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }

                    return bestMove;
                } else {
                    var _bestMove = Infinity;
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                        for (var _iterator3 = newGameMoves[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var _newGameMove = _step3.value;

                            game.move(_newGameMove);
                            _bestMove = Math.min(_bestMove, this.minimax(depth - 1, game, !isMaximisingPlayer));
                            game.undo();
                        }
                    } catch (err) {
                        _didIteratorError3 = true;
                        _iteratorError3 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                _iterator3.return();
                            }
                        } finally {
                            if (_didIteratorError3) {
                                throw _iteratorError3;
                            }
                        }
                    }

                    return _bestMove;
                }
            }
        }]);
        return MinimaxPlayer;
    }();

    var FourInARow11Game = function (_ConnectGameBase) {
        inherits(FourInARow11Game, _ConnectGameBase);

        function FourInARow11Game() {
            classCallCheck(this, FourInARow11Game);
            return possibleConstructorReturn(this, (FourInARow11Game.__proto__ || Object.getPrototypeOf(FourInARow11Game)).call(this, new gridy.RectangularGrid(1, undefined, gridy.Shape.Even, 11, 11, gridy.Rectangular8Tile), 4));
        }

        return FourInARow11Game;
    }(ConnectGameBase);
    FourInARow11Game.title = 'Four-in-a-row';
    FourInARow11Game.group = 'Connect';
    FourInARow11Game.rules = ['Connect four pieces'];
    FourInARow11Game.wiki = 'https://en.wikipedia.org/wiki/M,n,k-game';
    FourInARow11Game.sample = 'f6, f5, e6, g6, d6, c6, e7, e5, c5, b4, f8';
    FourInARow11Game.player = function () {
        return new MinimaxPlayer(2);
    };

    var FourInARowRoundGame = function (_ConnectGameBase) {
        inherits(FourInARowRoundGame, _ConnectGameBase);

        function FourInARowRoundGame() {
            classCallCheck(this, FourInARowRoundGame);

            var grid = new gridy.RadialGrid(1, false, gridy.Shape.Even, 12, 8, gridy.Radial8Tile, 2);
            return possibleConstructorReturn(this, (FourInARowRoundGame.__proto__ || Object.getPrototypeOf(FourInARowRoundGame)).call(this, grid, 4));
        }

        return FourInARowRoundGame;
    }(ConnectGameBase);
    FourInARowRoundGame.title = 'Four-in-a-row Round';
    FourInARowRoundGame.group = 'Connect';
    FourInARowRoundGame.rules = ['Connect four pieces'];
    FourInARowRoundGame.original = 'FourInARow11Game';
    FourInARowRoundGame.sample = 'f5, g4, g5, h5, f3, i6, f6, f4, h4, i3, e7';

    var GomokuGame = function (_ConnectGameBase) {
        inherits(GomokuGame, _ConnectGameBase);

        function GomokuGame() {
            classCallCheck(this, GomokuGame);
            return possibleConstructorReturn(this, (GomokuGame.__proto__ || Object.getPrototypeOf(GomokuGame)).call(this, new gridy.RectangularGrid(1, false, gridy.Shape.Even, 15, 15, gridy.Rectangular8Tile), 5));
        }

        return GomokuGame;
    }(ConnectGameBase);
    GomokuGame.title = 'Gomoku';
    GomokuGame.group = 'Connect';
    GomokuGame.wiki = 'https://en.wikipedia.org/wiki/Gomoku';
    GomokuGame.location = 'Japan';
    GomokuGame.created = 990;
    GomokuGame.rules = ['Connect five pieces'];
    // tslint:disable-next-line:max-line-length
    GomokuGame.sample = 'h8, h7, i8, g8, g9, i7, g7, i9, h9, f9, h10, h11, f8, i11, e7, d6, f6, e5, g5, h4, g10, j7, f11, e12, e9, h6, e10, d10, e8, e11, e6';
    GomokuGame.player = function () {
        return new MinimaxPlayer(2);
    };

    var Gomoku9Game = function (_ConnectGameBase) {
        inherits(Gomoku9Game, _ConnectGameBase);

        function Gomoku9Game() {
            classCallCheck(this, Gomoku9Game);
            return possibleConstructorReturn(this, (Gomoku9Game.__proto__ || Object.getPrototypeOf(Gomoku9Game)).call(this, new gridy.RectangularGrid(1, false, gridy.Shape.Even, 9, 9, gridy.Rectangular8Tile), 5));
        }

        return Gomoku9Game;
    }(ConnectGameBase);
    Gomoku9Game.title = 'Gomoku 9x9';
    Gomoku9Game.group = 'Connect';
    Gomoku9Game.original = 'GomokuGame';
    // tslint:disable-next-line:max-line-length
    Gomoku9Game.sample = 'e5, e4, d6, f4, d5, d4, c4, g4, h4, f5, e6, b3, f7, g8, h5, f6, g6, e8, h7, h6, c7, b8, c5, c6, e7, d7, b4, f8, a3';
    Gomoku9Game.player = function () {
        return new MinimaxPlayer(2);
    };

    var Gomoku11Game = function (_ConnectGameBase) {
        inherits(Gomoku11Game, _ConnectGameBase);

        function Gomoku11Game() {
            classCallCheck(this, Gomoku11Game);
            return possibleConstructorReturn(this, (Gomoku11Game.__proto__ || Object.getPrototypeOf(Gomoku11Game)).call(this, new gridy.RectangularGrid(1, false, gridy.Shape.Even, 11, 11, gridy.Rectangular8Tile), 5));
        }

        return Gomoku11Game;
    }(ConnectGameBase);
    Gomoku11Game.title = 'Gomoku 11x11';
    Gomoku11Game.group = 'Connect';
    Gomoku11Game.original = 'GomokuGame';
    // tslint:disable-next-line:max-line-length
    Gomoku11Game.sample = 'f6, f5, e7, g5, f7, e5, d5, h5, i5, e6, d7, g7, d6, d8, c5, f8, c7, b7, d4, d3, c6, c4, e8, b5, c8, c9, f9, g10, d9, g6, e4, g4, f4, g3';
    Gomoku11Game.player = function () {
        return new MinimaxPlayer(2);
    };

    var GomokuHexGame = function (_ConnectGameBase) {
        inherits(GomokuHexGame, _ConnectGameBase);

        function GomokuHexGame() {
            classCallCheck(this, GomokuHexGame);
            return possibleConstructorReturn(this, (GomokuHexGame.__proto__ || Object.getPrototypeOf(GomokuHexGame)).call(this, new gridy.HexagonalGrid(1, true, gridy.Shape.Even, 15), 5));
        }

        return GomokuHexGame;
    }(ConnectGameBase);
    GomokuHexGame.title = 'Gomoku Hex';
    GomokuHexGame.group = 'Connect';
    GomokuHexGame.original = 'GomokuGame';
    GomokuHexGame.sample = 'h8, i8, h7, i7, i6, i5, g9, g10, h10, j6, h9, j7, g8, k8, i4, k9';
    GomokuHexGame.player = function () {
        return new MinimaxPlayer(2);
    };

    var ReversiGameBase = function () {
        function ReversiGameBase(grid) {
            var _this = this;

            var center = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var anti = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
            classCallCheck(this, ReversiGameBase);

            this.player = 1;
            this.moves = [];
            this.score = { 1: 0, 2: 0 };
            this.winner = 0;
            this.moveToString = moveToString.bind(this);
            this.stringToMove = stringToMove.bind(this);
            this.finished = false;
            this.history = [];
            this.anti = anti;
            this.grid = grid;
            this.tileMap = gridy.toMap(grid.tiles);
            var x1 = Math.floor(grid.x / 2 - 0.5);
            var x2 = Math.ceil(grid.x / 2 - 0.5);
            var y1 = Math.floor(grid.y / 2 - 0.5);
            var y2 = Math.ceil(grid.y / 2 - 0.5);
            this.center = [this.tileMap.get(grid.tile(x1, y1).key), this.tileMap.get(grid.tile(x1, y2).key), this.tileMap.get(grid.tile(x2, y2).key), this.tileMap.get(grid.tile(x2, y1).key)];
            this.empty = gridy.toMap(this.grid.tiles);
            gridy.link(this.tileMap);
            if (center) {
                this.center.forEach(function (t) {
                    _this.move(t, true);
                });
            }
            this.updatePossible();
        }

        createClass(ReversiGameBase, [{
            key: 'possible',
            value: function possible() {
                return this.knownPossible;
            }
        }, {
            key: 'updatePossible',
            value: function updatePossible() {
                this.knownPossible = this.possibleFor(this.player);
                if (!this.knownPossible.length) {
                    if (this.possibleFor(other(this.player)).length) {
                        this.move(null);
                    } else {
                        this.finished = true;
                    }
                }
            }
        }, {
            key: 'possibleFor',
            value: function possibleFor(pl) {
                var r = [];
                if (this.grid.tiles.length - this.empty.size < 4) {
                    return this.center.filter(function (t) {
                        return !t.data;
                    });
                }
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.empty.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var m = _step.value;
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = m.links.keys()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var d = _step2.value;

                                var node = m.links.get(d);
                                var nodes = 0;
                                while (node && node.data && node.data !== pl) {
                                    nodes++;
                                    node = node.links.get(d);
                                }
                                if (nodes && node && node.data === pl) {
                                    r.push(m);
                                    break;
                                }
                            }
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                    _iterator2.return();
                                }
                            } finally {
                                if (_didIteratorError2) {
                                    throw _iteratorError2;
                                }
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                return r;
            }
        }, {
            key: 'undo',
            value: function undo() {
                var m = this.moves.pop();
                this.finished = false;
                this.winner = 0;
                if (!m) {
                    this.player = other(this.player);
                    this.history.pop();
                    this.undo();
                    return;
                }
                this.score[m.data]--;
                m.data = null;
                this.empty.set(m.key, m);
                var h = this.history.pop();
                this.player = other(this.player);
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = Object.keys(h)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var k = _step3.value;

                        var d = this.tileMap.get(k);
                        this.score[d.data]--;
                        d.data = h[k];
                        this.score[d.data]++;
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }

                this.updatePossible();
            }
        }, {
            key: 'move',
            value: function move(m) {
                var fake = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

                if (!m) {
                    this.movePass(m);
                    return;
                }
                m.data = this.player;
                this.score[this.player] = this.score[this.player] || 0;
                this.score[this.player]++;
                this.player = other(this.player);
                this.empty.delete(m.key);
                if (fake) {
                    return;
                }
                this.moves.push(m);
                var state = this.getState(m);
                this.history.push(state);
                this.updatePossible();
                this.winner = this.getWinner();
            }
        }, {
            key: 'evaluate',
            value: function evaluate() {
                return -this.score[this.player] + this.score[other(this.player)];
            }
        }, {
            key: 'getWinner',
            value: function getWinner() {
                return !this.finished ? 0 : this.score[1] === this.score[2] ? -1 : this.score[1] > this.score[2] ? this.anti ? 2 : 1 : this.anti ? 1 : 2;
            }
        }, {
            key: 'movePass',
            value: function movePass(m) {
                this.player = other(this.player);
                this.moves.push(m);
                this.history.push({});
                this.updatePossible();
                this.winner = this.getWinner();
            }
        }, {
            key: 'getState',
            value: function getState(m) {
                var state = {};
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = m.links.keys()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var d = _step4.value;

                        var node = m.links.get(d);
                        var nodes = [];
                        while (node && node.data && node.data !== m.data) {
                            nodes.push(node);
                            node = node.links.get(d);
                        }
                        if (node && node.data === m.data) {
                            var _iteratorNormalCompletion5 = true;
                            var _didIteratorError5 = false;
                            var _iteratorError5 = undefined;

                            try {
                                for (var _iterator5 = nodes[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                    var n = _step5.value;

                                    state[n.key] = n.data;
                                    this.score[n.data]--;
                                    this.score[m.data]++;
                                    n.data = m.data;
                                }
                            } catch (err) {
                                _didIteratorError5 = true;
                                _iteratorError5 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                        _iterator5.return();
                                    }
                                } finally {
                                    if (_didIteratorError5) {
                                        throw _iteratorError5;
                                    }
                                }
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
                        }
                    } finally {
                        if (_didIteratorError4) {
                            throw _iteratorError4;
                        }
                    }
                }

                return state;
            }
        }]);
        return ReversiGameBase;
    }();
    ReversiGameBase.theme = exports.Theme.Reversi;

    var OthelloGame = function (_ReversiGameBase) {
        inherits(OthelloGame, _ReversiGameBase);

        function OthelloGame() {
            classCallCheck(this, OthelloGame);
            return possibleConstructorReturn(this, (OthelloGame.__proto__ || Object.getPrototypeOf(OthelloGame)).call(this, new gridy.RectangularGrid(1, undefined, gridy.Shape.Even, 8, 8, gridy.Rectangular8Tile), true));
        }

        return OthelloGame;
    }(ReversiGameBase);
    OthelloGame.title = 'Othello';
    OthelloGame.group = 'Reversi';
    OthelloGame.created = 1971;
    OthelloGame.authors = [' Goro Hasegawa'];
    OthelloGame.wiki = 'https://en.wikipedia.org/wiki/Reversi';
    OthelloGame.location = 'Japan';
    OthelloGame.rules = ['Capture more pieces'];
    // public static original = 'ReversiGame';
    // tslint:disable-next-line:max-line-length
    OthelloGame.sample = 'f4, d3, c3, f5, e3, g3, e6, c2, d6, c7, f3, b3, f6, g6, d2, e1, f7, e8, h3, c4, c1, e2, h6, h5, h4, g2, c6, g7, h1, f2, b4, b5, c5, d1, f1, d7, a5, b6, a6, g5, g1, b7, a8, a7, d8, e7, b8, b2, g4, c8, b1, a3, a4, h2, f8, h8, h7, g8, a2, a1';

    var Othello4Game = function (_ReversiGameBase) {
        inherits(Othello4Game, _ReversiGameBase);

        function Othello4Game() {
            classCallCheck(this, Othello4Game);
            return possibleConstructorReturn(this, (Othello4Game.__proto__ || Object.getPrototypeOf(Othello4Game)).call(this, new gridy.RectangularGrid(1, undefined, gridy.Shape.Even, 4, 4, gridy.Rectangular8Tile), true));
        }

        return Othello4Game;
    }(ReversiGameBase);
    Othello4Game.title = 'Othello 4x4';
    Othello4Game.group = 'Reversi';
    Othello4Game.original = 'OthelloGame';
    Othello4Game.sample = 'd2, d3, d4, b1, a4, b4, c4, d1, a3, pass, a2';

    var ReversiGame = function (_ReversiGameBase) {
        inherits(ReversiGame, _ReversiGameBase);

        function ReversiGame() {
            classCallCheck(this, ReversiGame);
            return possibleConstructorReturn(this, (ReversiGame.__proto__ || Object.getPrototypeOf(ReversiGame)).call(this, new gridy.RectangularGrid(1, undefined, gridy.Shape.Even, 8, 8, gridy.Rectangular8Tile)));
        }

        return ReversiGame;
    }(ReversiGameBase);
    ReversiGame.title = 'Reversi';
    ReversiGame.group = 'Reversi';
    ReversiGame.created = 1883;
    ReversiGame.authors = ['Lewis Waterman', 'John W. Mollett'];
    ReversiGame.wiki = 'https://en.wikipedia.org/wiki/Reversi';
    ReversiGame.rules = ['Capture more pieces'];
    ReversiGame.location = 'England';
    // tslint:disable-next-line:max-line-length
    ReversiGame.sample = 'd5, e5, d4, e4, f3, e3, f2, c3, f5, e6, c5, c6, f4, g2, d6, g6, h1, c4, b5, e2, b6, f1, d2, e1, b4, g3, c2, h3, f7, e7, h2, e8, f8, a6, g7, c1, d8, f6, b2, g4, d7, c8, h4, d1, h6, d3, c7, h8, g8, a1, a5, h5, b3, g5, a7, b1, a2, h7, b8, b7, a8, g1, a4, a3';

    var Reversi4Game = function (_ReversiGameBase) {
        inherits(Reversi4Game, _ReversiGameBase);

        function Reversi4Game() {
            classCallCheck(this, Reversi4Game);
            return possibleConstructorReturn(this, (Reversi4Game.__proto__ || Object.getPrototypeOf(Reversi4Game)).call(this, new gridy.RectangularGrid(1, undefined, gridy.Shape.Even, 4, 4, gridy.Rectangular8Tile)));
        }

        return Reversi4Game;
    }(ReversiGameBase);
    Reversi4Game.title = 'Reversi 4x4';
    Reversi4Game.group = 'Reversi';
    Reversi4Game.original = 'ReversiGame';
    Reversi4Game.sample = 'c2, c3, b2, b3, b4, a1, d2, d4, a2, a3, a4, c4, pass, c1, b1, pass, d3, d1';

    var Reversi6Game = function (_ReversiGameBase) {
        inherits(Reversi6Game, _ReversiGameBase);

        function Reversi6Game() {
            classCallCheck(this, Reversi6Game);
            return possibleConstructorReturn(this, (Reversi6Game.__proto__ || Object.getPrototypeOf(Reversi6Game)).call(this, new gridy.RectangularGrid(1, undefined, gridy.Shape.Even, 6, 6, gridy.Rectangular8Tile)));
        }

        return Reversi6Game;
    }(ReversiGameBase);
    Reversi6Game.title = 'Reversi 6x6';
    Reversi6Game.group = 'Reversi';
    Reversi6Game.original = 'ReversiGame';
    // tslint:disable-next-line:max-line-length
    Reversi6Game.sample = 'd4, d3, c4, c3, d2, c5, b5, e3, d5, c1, d1, e1, b2, b4, b3, d6, f3, a4, e5, a6, a5, c2, a2, f6, e4, e2, b6, c6, f5, a3, f1, f4, f2, e6, a1, b1';

    var Reversi10Game = function (_ReversiGameBase) {
        inherits(Reversi10Game, _ReversiGameBase);

        function Reversi10Game() {
            classCallCheck(this, Reversi10Game);
            return possibleConstructorReturn(this, (Reversi10Game.__proto__ || Object.getPrototypeOf(Reversi10Game)).call(this, new gridy.RectangularGrid(1, undefined, gridy.Shape.Even, 10, 10, gridy.Rectangular8Tile)));
        }

        return Reversi10Game;
    }(ReversiGameBase);
    Reversi10Game.title = 'Reversi 10x10';
    Reversi10Game.group = 'Reversi';
    Reversi10Game.original = 'ReversiGame';
    // tslint:disable-next-line:max-line-length
    Reversi10Game.sample = 'f6, e5, e6, f5, g4, e7, d8, h3, d4, e8, f8, e4, f4, g7, g5, e3, g3, c3, d6, d7, i3, g6, c8, f3, h6, c7, c6, b9, f2, b5, e2, d9, c10, i7, h4, i2, b2, h5, a4, c5, j1, j2, i4, g8, h7, a5, a10, a1, f9, a3, g9, i6, b8, h8, c9, d2, j3, i5, b6, d3, f7, a6, d1, e1, j7, j8, d5, c2, j4, e10, b7, b10, h9, h2, e9, i9, a9, b4, c4, b3, c1, i8, j10, j9, i10, j5, j6, h10, i1, d10, f10, g10, a8, g2, a7, h1, b1, a2, f1, g1';

    var ReversiHexGame = function (_ReversiGameBase) {
        inherits(ReversiHexGame, _ReversiGameBase);

        function ReversiHexGame() {
            classCallCheck(this, ReversiHexGame);
            return possibleConstructorReturn(this, (ReversiHexGame.__proto__ || Object.getPrototypeOf(ReversiHexGame)).call(this, landscapeHex(new gridy.HexagonalGrid(1, false, gridy.Shape.Rhombus, 8))));
        }

        return ReversiHexGame;
    }(ReversiGameBase);
    ReversiHexGame.title = 'Reversi Hex';
    ReversiHexGame.group = 'Reversi';
    ReversiHexGame.original = 'ReversiGame';
    // tslint:disable-next-line:max-line-length
    ReversiHexGame.sample = 'e4, d4, e5, d5, c6, d6, c7, f3, c5, b6, a6, c8, b5, c4, d3, a5, a4, e2, f4, f5, e6, e3, g5, e7, f2, g4, f6, g2, f1, g3, h1, d2, h4, g1, c2, g6, h2, d1, h3, b2, f7, c3, h6, g7, f8, e8, h5, h7, h8, g8, d7, a7, a8, b4, e1, d8, c1, b1, a2, a3, b7, b8, a1, b3';

    var ReversiHex4Game = function (_ReversiGameBase) {
        inherits(ReversiHex4Game, _ReversiGameBase);

        function ReversiHex4Game() {
            classCallCheck(this, ReversiHex4Game);
            return possibleConstructorReturn(this, (ReversiHex4Game.__proto__ || Object.getPrototypeOf(ReversiHex4Game)).call(this, landscapeHex(new gridy.HexagonalGrid(1, undefined, gridy.Shape.Rhombus, 4))));
        }

        return ReversiHex4Game;
    }(ReversiGameBase);
    ReversiHex4Game.title = 'Reversi Hex 4x4';
    ReversiHex4Game.group = 'Reversi';
    ReversiHex4Game.original = 'ReversiGame';
    ReversiHex4Game.sample = 'b3, c3, c2, b2, c4, b4, a4, d2, d1, pass, a2, pass, d3';

    var ReversiHex6Game = function (_ReversiGameBase) {
        inherits(ReversiHex6Game, _ReversiGameBase);

        function ReversiHex6Game() {
            classCallCheck(this, ReversiHex6Game);
            return possibleConstructorReturn(this, (ReversiHex6Game.__proto__ || Object.getPrototypeOf(ReversiHex6Game)).call(this, landscapeHex(new gridy.HexagonalGrid(1, undefined, gridy.Shape.Rhombus, 6))));
        }

        return ReversiHex6Game;
    }(ReversiGameBase);
    ReversiHex6Game.title = 'Reversi Hex 6x6';
    ReversiHex6Game.group = 'Reversi';
    ReversiHex6Game.original = 'ReversiGame';
    // tslint:disable-next-line:max-line-length
    ReversiHex6Game.sample = 'd3, c4, d4, c3, b3, e4, d5, c2, f4, e3, f3, e2, d2, e5, f1, f2, e1, a3, e6, c5, b4, d6, c6, b5, b2, c1, a6, b6, a5, f6, b1, a1, d1, f5, pass, a4, a2';

    var ReversiHex10Game = function (_ReversiGameBase) {
        inherits(ReversiHex10Game, _ReversiGameBase);

        function ReversiHex10Game() {
            classCallCheck(this, ReversiHex10Game);
            return possibleConstructorReturn(this, (ReversiHex10Game.__proto__ || Object.getPrototypeOf(ReversiHex10Game)).call(this, landscapeHex(new gridy.HexagonalGrid(1, undefined, gridy.Shape.Rhombus, 10))));
        }

        return ReversiHex10Game;
    }(ReversiGameBase);
    ReversiHex10Game.title = 'Reversi Hex 10x10';
    ReversiHex10Game.group = 'Reversi';
    ReversiHex10Game.original = 'ReversiGame';
    // tslint:disable-next-line:max-line-length
    ReversiHex10Game.sample = 'f5, f6, e6, e5, d5, d6, e7, d4, c5, f4, g4, b6, d3, g5, e4, d8, c6, d7, e8, e3, c9, h4, g6, d2, f3, f7, h3, h2, d1, b10, a7, d9, i4, c3, c10, g7, b4, b5, a10, g3, h1, d10, f2, a6, c8, c4, f8, f1, a5, e9, g1, a4, e10, i1, a3, b8, b9, e1, j1, h5, g2, j4, i3, e2, j3, a9, h6, i6, b3, f9, c7, b2, j6, i2, a8, h7, i5, j5, g8, f10, c1, j7, g9, g10, c2, j2, j8, b1, i7, i8, a2, b7, h9, i9, h10, j9, j10, pass, a1, pass, h8, pass, i10';

    var AntiReversiGame = function (_ReversiGameBase) {
        inherits(AntiReversiGame, _ReversiGameBase);

        function AntiReversiGame() {
            classCallCheck(this, AntiReversiGame);
            return possibleConstructorReturn(this, (AntiReversiGame.__proto__ || Object.getPrototypeOf(AntiReversiGame)).call(this, new gridy.RectangularGrid(1, undefined, gridy.Shape.Even, 8, 8, gridy.Rectangular8Tile), false, true));
        }

        return AntiReversiGame;
    }(ReversiGameBase);
    AntiReversiGame.title = 'Anti-Reversi';
    AntiReversiGame.group = 'Reversi';
    AntiReversiGame.original = 'ReversiGame';
    AntiReversiGame.rules = ['Capture less pieces'];
    // tslint:disable-next-line:max-line-length
    AntiReversiGame.sample = 'd5, e4, e5, d4, e3, d6, c4, f4, d7, c5, e6, b4, d3, f2, f5, c3, e2, c7, b6, e1, d8, g5, b2, b8, a3, a1, c6, c8, g4, a5, h6, e7, b5, h4, c2, b7, f7, g7, e8, f8, a7, a8, a4, f6, g8, b3, h7, h8, c1, g6, d2, f3, f1, b1, g1, h5, h3, g3, d1, a2, h2, h1, g2, a6';

    var AntiReversiHexGame = function (_ReversiGameBase) {
        inherits(AntiReversiHexGame, _ReversiGameBase);

        function AntiReversiHexGame() {
            classCallCheck(this, AntiReversiHexGame);
            return possibleConstructorReturn(this, (AntiReversiHexGame.__proto__ || Object.getPrototypeOf(AntiReversiHexGame)).call(this, landscapeHex(new gridy.HexagonalGrid(1, false, gridy.Shape.Rhombus, 8)), false, true));
        }

        return AntiReversiHexGame;
    }(ReversiGameBase);
    AntiReversiHexGame.title = 'Anti-Reversi Hex';
    AntiReversiHexGame.group = 'Reversi';
    AntiReversiHexGame.original = 'ReversiGame';
    AntiReversiHexGame.rules = ['Capture less pieces'];
    // tslint:disable-next-line:max-line-length
    AntiReversiHexGame.sample = 'e4, e5, d5, d4, f5, d6, c4, g5, e6, d7, d8, c8, b8, c5, f4, c6, b7, b6, a7, b5, f6, g4, h4, e3, a6, g6, d3, c7, e7, a8, g7, g3, h2, f3, f2, b4, a4, h3, a5, g1, e2, c3, d2, h5, g2, e8, f7, f1, e1, d1, c2, c1, h6, f8, b3, b2, a2, b1, a3, g8, h1, a1, h7';

    var HexGameBase = function () {
        function HexGameBase(grid) {
            classCallCheck(this, HexGameBase);

            this.moves = [];
            this.player = 1;
            this.winner = 0;
            this.playerTiles = { 1: [], 2: [] };
            this.moveToString = moveToString.bind(this);
            this.stringToMove = stringToMove.bind(this);
            this.undo = undo.bind(this);
            this.finished = false;
            this.grid = grid;
            this.tileMap = gridy.toMap(grid.tiles);
            this.freeTileMap = gridy.toMap(grid.tiles);
            gridy.link(this.tileMap);
            this.markLine(this.grid.tile(0, 0), this.grid.tile(0, this.grid.y - 1), 1, 'begin');
            this.markLine(this.grid.tile(this.grid.x - 1, 0), this.grid.tile(this.grid.x - 1, this.grid.y - 1), 1, 'end');
            this.markLine(this.grid.tile(0, 0), this.grid.tile(this.grid.x - 1, 0), 2, 'begin');
            this.markLine(this.grid.tile(0, this.grid.y - 1), this.grid.tile(this.grid.x - 1, this.grid.y - 1), 2, 'end');
        }

        createClass(HexGameBase, [{
            key: 'possible',
            value: function possible() {
                // throw new Error("Method not implemented.");
                if (this.finished) {
                    return [];
                }
                return gridy.toArray(this.freeTileMap);
            }
        }, {
            key: 'links',
            value: function links() {
                return [[this.grid.tile(-1, 1), this.grid.tile(-1, this.grid.y - 1), 1], [this.grid.tile(this.grid.x, 0), this.grid.tile(this.grid.x, this.grid.y - 2), 1], [this.grid.tile(1, -1), this.grid.tile(this.grid.x - 1, -1), 2], [this.grid.tile(0, this.grid.y), this.grid.tile(this.grid.x - 2, this.grid.y), 2]];
            }
        }, {
            key: 'move',
            value: function move(m) {
                m.data = this.player;
                this.playerTiles[this.player].push(m);
                this.player = other(this.player);
                this.moves.push(m);
                this.freeTileMap.delete(m.key);
                this.winner = this.getWinner();
                if (this.moves.length === this.grid.tiles.length || this.winner) {
                    this.finished = true;
                }
            }
        }, {
            key: 'evaluate',
            value: function evaluate() {
                throw new Error('Method not implemented.');
            }
        }, {
            key: 'winning',
            value: function winning() {
                var tile = this.moves[this.moves.length - 1];
                var m = new Map([[tile.key, true]]);
                var a = [{ tile: tile, previous: null }];
                var v = tile.data;
                var i = 0;
                var begin = void 0;
                var end = void 0;
                while (i < a.length) {
                    var t = a[i].tile;
                    if (t['begin' + v]) {
                        begin = begin || a[i];
                        // if (!end) {
                        //   continue;
                        // }
                    } else if (t['end' + v]) {
                        end = end || a[i];
                        // if (!begin) {
                        //   continue;
                        // }
                    }
                    if (begin && end) {
                        var result = [];
                        var item = begin;
                        while (item) {
                            result.push(item.tile);
                            item = item.previous;
                        }
                        item = end;
                        var line = [];
                        while (item) {
                            line.unshift(item.tile);
                            item = item.previous;
                        }
                        line.shift();
                        return result.concat(line);
                    }
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = t.links[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var _ref = _step.value;

                            var _ref2 = slicedToArray(_ref, 2);

                            var n = _ref2[1];

                            if (n.data === v) {
                                if (!m.has(n.key)) {
                                    a.push({ tile: n, previous: a[i] });
                                    m.set(n.key, true);
                                }
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }

                    i++;
                }
            }
        }, {
            key: 'getWinner',
            value: function getWinner() {
                if (!this.moves.length) {
                    return 0;
                }
                var last$$1 = this.moves[this.moves.length - 1];
                var w = this.flood(last$$1);
                if (w) {
                    return last$$1.data;
                }
                if (this.moves.length === this.grid.tiles.length) {
                    return -1;
                }
                return 0;
            }
        }, {
            key: 'markLine',
            value: function markLine(fromTile, to, value, key) {
                var _this = this;

                gridy.Float3.LINE(fromTile, to).forEach(function (t) {
                    _this.tileMap.get(t.toString())['' + key + value] = true;
                });
            }
        }, {
            key: 'flood',
            value: function flood(tile) {
                var m = new Map([[tile.key, true]]);
                var a = [tile];
                var v = tile.data;
                var i = 0;
                var begin = false;
                var end = false;
                while (i < a.length) {
                    var t = a[i];
                    if (t['begin' + v]) {
                        begin = true;
                        // if (!end) {
                        //   continue;
                        // }
                    } else if (t['end' + v]) {
                        end = true;
                        // if (!begin) {
                        //   continue;
                        // }
                    }
                    if (begin && end) {
                        return true;
                    }
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = t.links[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var _ref3 = _step2.value;

                            var _ref4 = slicedToArray(_ref3, 2);

                            var n = _ref4[1];

                            if (n.data === v) {
                                if (!m.has(n.key)) {
                                    a.push(n);
                                    m.set(n.key, true);
                                }
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }

                    i++;
                }
                return false;
            }
        }]);
        return HexGameBase;
    }();
    HexGameBase.theme = exports.Theme.Hex;

    var HexGame = function (_HexGameBase) {
        inherits(HexGame, _HexGameBase);

        function HexGame() {
            classCallCheck(this, HexGame);
            return possibleConstructorReturn(this, (HexGame.__proto__ || Object.getPrototypeOf(HexGame)).call(this, landscapeHex(new gridy.HexagonalGrid(1, undefined, gridy.Shape.Rhombus, 11))));
        }

        return HexGame;
    }(HexGameBase);
    HexGame.title = 'Hex';
    HexGame.group = 'Hex';
    HexGame.created = 1942;
    HexGame.location = 'Denmark';
    HexGame.authors = ['Piet Hein', 'John Nash'];
    HexGame.aliases = ['Con-tac-tix'];
    HexGame.wiki = 'https://en.wikipedia.org/wiki/Hex_(board_game)';
    HexGame.rules = ['Connect edges'];
    // tslint:disable-next-line:max-line-length
    HexGame.sample = 'f6, g6, f7, g5, e5, f5, e6, d4, d5, c5, b6, c6, g8, c8, i8, e2, k8, c10, j8, c9, h8, e3, f8, c11, c7, b7, d6, b8, a6, e1';

    var Hex5Game = function (_HexGameBase) {
        inherits(Hex5Game, _HexGameBase);

        function Hex5Game() {
            classCallCheck(this, Hex5Game);
            return possibleConstructorReturn(this, (Hex5Game.__proto__ || Object.getPrototypeOf(Hex5Game)).call(this, landscapeHex(new gridy.HexagonalGrid(1, undefined, gridy.Shape.Rhombus, 5))));
        }

        return Hex5Game;
    }(HexGameBase);
    Hex5Game.title = 'Hex 5x5';
    Hex5Game.group = 'Hex';
    Hex5Game.original = 'HexGame';
    Hex5Game.sample = 'e1, b2, b3, a4, a3, c2, c3, d2, d3, e3, e2';

    var Hex7Game = function (_HexGameBase) {
        inherits(Hex7Game, _HexGameBase);

        function Hex7Game() {
            classCallCheck(this, Hex7Game);
            return possibleConstructorReturn(this, (Hex7Game.__proto__ || Object.getPrototypeOf(Hex7Game)).call(this, landscapeHex(new gridy.HexagonalGrid(1, undefined, gridy.Shape.Rhombus, 7))));
        }

        return Hex7Game;
    }(HexGameBase);
    Hex7Game.title = 'Hex 7x7';
    Hex7Game.group = 'Hex';
    Hex7Game.original = 'HexGame';
    Hex7Game.sample = 'c7, c6, c5, a4, f1, e7, c3, g4, g3, g2, a6, e2, d5, f5, f4, d3, e4, g7, b5';

    var Hex9Game = function (_HexGameBase) {
        inherits(Hex9Game, _HexGameBase);

        function Hex9Game() {
            classCallCheck(this, Hex9Game);
            return possibleConstructorReturn(this, (Hex9Game.__proto__ || Object.getPrototypeOf(Hex9Game)).call(this, landscapeHex(new gridy.HexagonalGrid(1, undefined, gridy.Shape.Rhombus, 9))));
        }

        return Hex9Game;
    }(HexGameBase);
    Hex9Game.title = 'Hex 9x9';
    Hex9Game.group = 'Hex';
    Hex9Game.original = 'HexGame';
    // tslint:disable-next-line:max-line-length
    Hex9Game.sample = 'e5, e4, f5, e3, d5, g5, g4, c5, i3, c6, h3, d4, b8, c7, c8, d7, a8, e8, d8, e7, e2, g2, f2, f3, g1, h1, d9, e9';

    var Hex13Game = function (_HexGameBase) {
        inherits(Hex13Game, _HexGameBase);

        function Hex13Game() {
            classCallCheck(this, Hex13Game);
            return possibleConstructorReturn(this, (Hex13Game.__proto__ || Object.getPrototypeOf(Hex13Game)).call(this, landscapeHex(new gridy.HexagonalGrid(1, undefined, gridy.Shape.Rhombus, 13))));
        }

        return Hex13Game;
    }(HexGameBase);
    Hex13Game.title = 'Hex 13x13';
    Hex13Game.group = 'Hex';
    Hex13Game.original = 'HexGame';
    // tslint:disable-next-line:max-line-length
    Hex13Game.sample = 'l1, j3, c1, k12, b1, e6, d8, a12, b7, j6, l3, a1, l6, m2, h1, h4, i1, d3, g8, f1, k8, g7, f6, e2, b6, f8, i7, e5, f9, j4, h2, e10, l9, k6, m5, e9, g2, h7, a3, a6, g4, i6, a10, g10, f11, k3, h11, a9, j5, b8, e13, c8, i5, h12, i11, g1, b4, h5, b12, e1, c6, d13, k2, m3, c10, a11, i12, j10, d11, f5, a7, j1, e11, g13, m9, i8, d5, c11, b11, a5, l7, d10, i13, c12, b2, c5, m10, i9, m1, c13, a4, d2, m4, g11, f13, e8, d7, h3, b10, k9, g5, h6, j13, g3, i2, f3, d4, i3, l5, k4, j2, j2';

    // export { Hex14Game } from "./Hex14Game";
    //# sourceMappingURL=index.js.map

    var games = /*#__PURE__*/Object.freeze({
        TicTacToeGame: TicTacToeGame,
        TicTacToeRoundGame: TicTacToeRoundGame,
        TicTacToeTriGame: TicTacToeTriGame,
        TacTickleGame: TacTickleGame,
        TacTickle4Game: TacTickle4Game,
        TacTickleHexGame: TacTickleHexGame,
        TacTickleHex2Game: TacTickleHex2Game,
        TacTickleRoundGame: TacTickleRoundGame,
        TacTickleTriGame: TacTickleTriGame,
        ConnectFourGame: ConnectFourGame,
        QirkatGame: QirkatGame,
        Qirkat3Game: Qirkat3Game,
        Qirkat7Game: Qirkat7Game,
        QirkatHexGame: QirkatHexGame,
        QirkatHex7Game: QirkatHex7Game,
        QirkatHex2Game: QirkatHex2Game,
        CatchTheHareGame: CatchTheHareGame,
        CatchTheHare10Game: CatchTheHare10Game,
        FourInARow11Game: FourInARow11Game,
        FourInARowRoundGame: FourInARowRoundGame,
        GomokuGame: GomokuGame,
        Gomoku9Game: Gomoku9Game,
        Gomoku11Game: Gomoku11Game,
        GomokuHexGame: GomokuHexGame,
        OthelloGame: OthelloGame,
        Othello4Game: Othello4Game,
        ReversiGame: ReversiGame,
        Reversi4Game: Reversi4Game,
        Reversi6Game: Reversi6Game,
        Reversi10Game: Reversi10Game,
        ReversiHexGame: ReversiHexGame,
        ReversiHex4Game: ReversiHex4Game,
        ReversiHex6Game: ReversiHex6Game,
        ReversiHex10Game: ReversiHex10Game,
        AntiReversiGame: AntiReversiGame,
        AntiReversiHexGame: AntiReversiHexGame,
        HexGame: HexGame,
        Hex5Game: Hex5Game,
        Hex7Game: Hex7Game,
        Hex9Game: Hex9Game,
        Hex13Game: Hex13Game
    });

    var AlphaBetaPlayer = function () {
        function AlphaBetaPlayer() {
            var depth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;
            classCallCheck(this, AlphaBetaPlayer);

            this.count = 0;
            this.hit = 0;
            this.depth = 0;
            this.depth = depth;
        }

        createClass(AlphaBetaPlayer, [{
            key: "select",
            value: function select(game) {
                return { move: this.move(game, this.depth), count: this.count, hit: this.hit };
            }
        }, {
            key: "move",
            value: function move(game, depth) {
                var isMaximisingPlayer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

                this.count = 0;
                var newGameMoves = game.possible();
                var bestMove = -Infinity;
                var bestMoveFound = void 0;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = newGameMoves[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var newGameMove = _step.value;

                        game.move(newGameMove);
                        var value = this.minimax(depth - 1, game, -Infinity, Infinity, !isMaximisingPlayer);
                        game.undo();
                        if (value > bestMove) {
                            bestMove = value;
                            bestMoveFound = newGameMove;
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                return bestMoveFound;
            }
        }, {
            key: "minimax",
            value: function minimax(depth, game, inputAlpha, inputBeta, isMaximisingPlayer) {
                this.count++;
                if (depth === 0) {
                    return game.evaluate();
                }
                var newGameMoves = game.possible();
                var alpha = inputAlpha;
                var beta = inputBeta;
                if (isMaximisingPlayer) {
                    var bestMove = -Infinity;
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = newGameMoves[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var newGameMove = _step2.value;

                            game.move(newGameMove);
                            bestMove = Math.max(bestMove, this.minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
                            game.undo();
                            alpha = Math.max(alpha, bestMove);
                            if (beta <= alpha) {
                                this.hit++;
                                return bestMove;
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }

                    return bestMove;
                } else {
                    var _bestMove = Infinity;
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                        for (var _iterator3 = newGameMoves[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var _newGameMove = _step3.value;

                            game.move(_newGameMove);
                            _bestMove = Math.min(_bestMove, this.minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
                            game.undo();
                            beta = Math.min(beta, _bestMove);
                            if (beta <= alpha) {
                                this.hit++;
                                return _bestMove;
                            }
                        }
                    } catch (err) {
                        _didIteratorError3 = true;
                        _iteratorError3 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                _iterator3.return();
                            }
                        } finally {
                            if (_didIteratorError3) {
                                throw _iteratorError3;
                            }
                        }
                    }

                    return _bestMove;
                }
            }
        }]);
        return AlphaBetaPlayer;
    }();

    var RandomPlayer = function () {
        function RandomPlayer() {
            classCallCheck(this, RandomPlayer);
        }

        createClass(RandomPlayer, [{
            key: "select",
            value: function select(game) {
                var possible = game.possible();
                return { move: possible[Math.floor(Math.random() * possible.length)] };
            }
        }]);
        return RandomPlayer;
    }();

    var UctNode = function () {
        function UctNode(game, parentNode, action) {
            classCallCheck(this, UctNode);

            this.depth = game.moves.length;
            this.action = action;
            this.parentNode = parentNode;
            this.children = [];
            this.wins = 0;
            this.visits = 0;
            this.unexamined = game.possible();
            this.activePlayer = other(game.player);
        }

        createClass(UctNode, [{
            key: 'addChild',
            value: function addChild(game, index) {
                var node = new UctNode(game, this, this.unexamined[index]);
                this.unexamined.splice(index, 1);
                this.children.push(node);
                return node;
            }
        }, {
            key: 'selectChild',
            value: function selectChild() {
                var selected = null;
                var bestValue = Number.NEGATIVE_INFINITY;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var child = _step.value;

                        var uctValue = child.wins / child.visits + Math.sqrt(Math.log(this.visits) * 2 / child.visits);
                        if (uctValue > bestValue) {
                            selected = child;
                            bestValue = uctValue;
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                return selected;
            }
        }, {
            key: 'update',
            value: function update$$1(result) {
                this.visits++;
                this.wins += this.activePlayer === result ? 1 : result === -1 ? 0 : -1;
            }
        }, {
            key: 'mostVisitedChild',
            value: function mostVisitedChild() {
                this.children.sort(function (a, b) {
                    return b.visits - a.visits;
                });
                return this.children[0];
            }
        }]);
        return UctNode;
    }();
    // tslint:disable-next-line:max-classes-per-file
    var UctPlayer = function () {
        function UctPlayer() {
            var maxTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 400;
            var maxIterations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8192;
            var blockSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 8;
            classCallCheck(this, UctPlayer);

            this.blockSize = blockSize;
            this.maxTime = maxTime;
            this.maxIterations = maxIterations;
        }

        createClass(UctPlayer, [{
            key: 'select',
            value: function select(game) {
                var root = new UctNode(game);
                var startTime = Date.now();
                var timeLimit = startTime + this.maxTime;
                var nodesVisited = 0;
                if (root.unexamined.length === 1) {
                    return {
                        duration: Date.now() - startTime,
                        move: root.unexamined[0],
                        nodesVisited: nodesVisited
                    };
                }
                nodesVisited = this.iterate(game, root, timeLimit);
                return {
                    duration: Date.now() - startTime,
                    move: root.mostVisitedChild().action,
                    nodesVisited: nodesVisited
                };
            }
        }, {
            key: 'iterate',
            value: function iterate(game, root, timeLimit) {
                var nodesVisited = 0;
                for (var iterations = 0; iterations < this.maxIterations && Date.now() < timeLimit; iterations += this.blockSize) {
                    for (var i = 0; i < this.blockSize; ++i) {
                        var node = root;
                        var original = game.moves.length;
                        // Selection
                        while (node.unexamined.length === 0 && node.children.length > 0) {
                            node = node.selectChild();
                            game.move(node.action);
                        }
                        // Expansion
                        if (node.unexamined.length > 0) {
                            var j = Math.floor(Math.random() * node.unexamined.length);
                            game.move(node.unexamined[j]);
                            node = node.addChild(game, j);
                        }
                        // Simulation
                        var actions = game.possible();
                        while (actions.length > 0) {
                            game.move(actions[Math.floor(Math.random() * actions.length)]);
                            ++nodesVisited;
                            actions = game.possible();
                        }
                        // Backpropagation
                        var result = game.winner;
                        while (node) {
                            node.update(result);
                            node = node.parentNode;
                        }
                        while (game.moves.length > original) {
                            game.undo();
                        }
                    }
                }
                return nodesVisited;
            }
        }]);
        return UctPlayer;
    }();

    // tslint:disable-next-line:max-classes-per-file
    var UctCachedPlayer = function (_UctPlayer) {
        inherits(UctCachedPlayer, _UctPlayer);

        function UctCachedPlayer() {
            var maxTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 400;
            var maxIterations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 8192;
            var blockSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 8;
            classCallCheck(this, UctCachedPlayer);
            return possibleConstructorReturn(this, (UctCachedPlayer.__proto__ || Object.getPrototypeOf(UctCachedPlayer)).call(this, maxTime, maxIterations, blockSize));
        }

        createClass(UctCachedPlayer, [{
            key: 'select',
            value: function select(game) {
                var root = this.getRoot(game) || new UctNode(game);
                var startTime = Date.now();
                var timeLimit = startTime + this.maxTime;
                var nodesVisited = this.iterate(game, root, timeLimit);
                this.cachedRoot = root.mostVisitedChild();
                return {
                    duration: Date.now() - startTime,
                    move: this.cachedRoot.action,
                    nodesVisited: nodesVisited
                };
            }
        }, {
            key: 'getRoot',
            value: function getRoot(game) {
                var _this2 = this;

                if (!this.cachedRoot || this.cachedRoot.depth >= game.moves.length) {
                    return;
                }

                var _loop = function _loop(i) {
                    _this2.cachedRoot = _this2.cachedRoot.children.find(function (c) {
                        return c.action === game.moves[i];
                    });
                    if (!_this2.cachedRoot) {
                        return {
                            v: void 0
                        };
                    }
                };

                for (var i = this.cachedRoot.depth; i < game.moves.length; i++) {
                    var _ret = _loop(i);

                    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
                }
                return this.cachedRoot;
            }
        }]);
        return UctCachedPlayer;
    }(UctPlayer);

    //# sourceMappingURL=index.js.map

    var players = /*#__PURE__*/Object.freeze({
        AlphaBetaPlayer: AlphaBetaPlayer,
        RandomPlayer: RandomPlayer,
        UctPlayer: UctPlayer,
        UctCachedPlayer: UctCachedPlayer,
        MinimaxPlayer: MinimaxPlayer
    });

    // tslint:disable:no-unnecessary-class function-name
    var Info = function () {
        function Info() {
            classCallCheck(this, Info);
        }

        createClass(Info, null, [{
            key: 'game',
            value: function game(id) {
                return Info.games.find(function (g) {
                    return g.id === id;
                });
            }
        }, {
            key: 'similar',
            value: function similar(id, exclude) {
                return Info.games.filter(function (g) {
                    return g.originalId === id && g.id !== exclude;
                });
            }
        }, {
            key: 'wip',
            set: function set$$1(value) {
                if (value !== this.wipValue) {
                    this.wipValue = value;
                    Info.gamesValue = undefined;
                }
            }
        }, {
            key: 'games',
            get: function get$$1() {
                if (!Info.gamesValue) {
                    Info.gamesValue = Object.freeze(table(games, this.wipValue));
                }
                return Info.gamesValue;
            }
        }]);
        return Info;
    }();
    Info.wipValue = false;

    // tslint:disable-next-line:variable-name
    var Games = games;
    // tslint:disable-next-line:variable-name
    var Players = players;
    //# sourceMappingURL=index.js.map

    exports.Games = Games;
    exports.Players = Players;
    exports.TimedProxy = TimedProxy;
    exports.FIELDS = FIELDS;
    exports.other = other;
    exports.reset = reset;
    exports.stringify = stringify;
    exports.table = table;
    exports.undoFor = undoFor;
    exports.update = update;
    exports.Info = Info;
    exports.ThemeStones = ThemeStones;
    exports.StoneNames = StoneNames;
    exports.TicTacToeGame = TicTacToeGame;
    exports.TicTacToeRoundGame = TicTacToeRoundGame;
    exports.TicTacToeTriGame = TicTacToeTriGame;
    exports.TacTickleGame = TacTickleGame;
    exports.TacTickle4Game = TacTickle4Game;
    exports.TacTickleHexGame = TacTickleHexGame;
    exports.TacTickleHex2Game = TacTickleHex2Game;
    exports.TacTickleRoundGame = TacTickleRoundGame;
    exports.TacTickleTriGame = TacTickleTriGame;
    exports.ConnectFourGame = ConnectFourGame;
    exports.QirkatGame = QirkatGame;
    exports.Qirkat3Game = Qirkat3Game;
    exports.Qirkat7Game = Qirkat7Game;
    exports.QirkatHexGame = QirkatHexGame;
    exports.QirkatHex7Game = QirkatHex7Game;
    exports.QirkatHex2Game = QirkatHex2Game;
    exports.CatchTheHareGame = CatchTheHareGame;
    exports.CatchTheHare10Game = CatchTheHare10Game;
    exports.FourInARow11Game = FourInARow11Game;
    exports.FourInARowRoundGame = FourInARowRoundGame;
    exports.GomokuGame = GomokuGame;
    exports.Gomoku9Game = Gomoku9Game;
    exports.Gomoku11Game = Gomoku11Game;
    exports.GomokuHexGame = GomokuHexGame;
    exports.OthelloGame = OthelloGame;
    exports.Othello4Game = Othello4Game;
    exports.ReversiGame = ReversiGame;
    exports.Reversi4Game = Reversi4Game;
    exports.Reversi6Game = Reversi6Game;
    exports.Reversi10Game = Reversi10Game;
    exports.ReversiHexGame = ReversiHexGame;
    exports.ReversiHex4Game = ReversiHex4Game;
    exports.ReversiHex6Game = ReversiHex6Game;
    exports.ReversiHex10Game = ReversiHex10Game;
    exports.AntiReversiGame = AntiReversiGame;
    exports.AntiReversiHexGame = AntiReversiHexGame;
    exports.HexGame = HexGame;
    exports.Hex5Game = Hex5Game;
    exports.Hex7Game = Hex7Game;
    exports.Hex9Game = Hex9Game;
    exports.Hex13Game = Hex13Game;
    exports.AlphaBetaPlayer = AlphaBetaPlayer;
    exports.RandomPlayer = RandomPlayer;
    exports.UctPlayer = UctPlayer;
    exports.UctCachedPlayer = UctCachedPlayer;
    exports.MinimaxPlayer = MinimaxPlayer;
    exports.getMovePlace = getMovePlace;
    exports.initHighlight = initHighlight;
    exports.initActions = initActions;
    exports.selectAction = selectAction;
    exports.undoAction = undoAction;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=games.js.map
