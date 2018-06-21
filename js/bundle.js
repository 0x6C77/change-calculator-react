(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ChangeCalculator = require("./ChangeCalculator.js");

var _ChangeCalculator2 = _interopRequireDefault(_ChangeCalculator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
    _inherits(App, _Component);

    function App() {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

        _this.title = 'Change calculator';
        return _this;
    }

    _createClass(App, [{
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                { className: "app" },
                _react2.default.createElement(
                    "h1",
                    null,
                    this.title
                ),
                _react2.default.createElement(_ChangeCalculator2.default, null)
            );
        }
    }]);

    return App;
}(_react.Component);

exports.default = App;

},{"./ChangeCalculator.js":2,"react":"react"}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CoinCalculator = function (_React$Component) {
    _inherits(CoinCalculator, _React$Component);

    function CoinCalculator() {
        _classCallCheck(this, CoinCalculator);

        var _this = _possibleConstructorReturn(this, (CoinCalculator.__proto__ || Object.getPrototypeOf(CoinCalculator)).call(this));

        _this._regex = /^£?(\d+)(?:\.(\d*))?p?$/i;
        _this._coins = [{ value: 200, text: '£2' }, { value: 100, text: '£1' }, { value: 50, text: '50p' }, { value: 20, text: '20p' }, { value: 10, text: '10p' }, { value: 5, text: '5p' }, { value: 2, text: '2p' }, { value: 1, text: '1p' }];

        _this.state = {
            change: 0
        };

        _this._handleChange = _this._handleChange.bind(_this);
        return _this;
    }

    // Takes users input, validates and calculates correct change


    _createClass(CoinCalculator, [{
        key: '_handleChange',
        value: function _handleChange(event) {
            // Reset state
            this.setState({
                change: null,
                error: null
            });

            if (event.target.value) {
                this._calculateChange(event.target.value);
            }
        }

        // Convert a given string into its corresponding value in pennies

    }, {
        key: '_calculateChange',
        value: function _calculateChange(value) {
            try {
                var amount = this._convertToPennies(value),
                    change = this._calculateCoins(amount);

                this.setState({
                    change: change
                });
            } catch (error) {
                this.setState({
                    error: error
                });
            }
        }

        // Convert a given string into its corresponding value in pennies

    }, {
        key: '_convertToPennies',
        value: function _convertToPennies(input) {
            var amount = void 0,
                parts = input.match(this._regex);

            // Invalid input
            if (parts === null) {
                throw 'Invalid amount entered';
            }

            // If only the number before the decimal is present assume it is pence,
            // unless otherwise stated
            if (typeof parts[2] == "undefined" && input.charAt(0) !== '£') {
                amount = parseFloat(parts[1], 10);
            } else {
                // Rebuild and parse parts into valid float
                amount = parseFloat(parts[1] + '.' + parts[2], 10);

                // Round amount to correct precisison
                amount = amount.toFixed(2);

                // Covert amount into pennies
                amount = amount * 100;
            }

            return amount;
        }

        // Take an integer and return an array of the smallest denomination of coins

    }, {
        key: '_calculateCoins',
        value: function _calculateCoins(amount) {
            var change = [];

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this._coins[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var coin = _step.value;

                    if (coin.value > amount) {
                        continue;
                    }

                    var quantitiy = Math.floor(amount / coin.value);
                    change.push({ coin: coin.text, quantitiy: quantitiy });

                    amount -= coin.value * quantitiy;
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

            return change;
        }
    }, {
        key: 'render',
        value: function render() {
            var output = void 0;
            if (this.state.change) {
                output = this.state.change.map(function (change, index) {
                    return _react2.default.createElement(
                        'li',
                        { key: index },
                        change.quantitiy,
                        ' x ',
                        change.coin
                    );
                });
            }

            return _react2.default.createElement(
                'div',
                { className: 'change-calculator' },
                this.state.error && _react2.default.createElement(
                    'div',
                    { className: 'error' },
                    this.state.error
                ),
                _react2.default.createElement('input', { type: 'text', onChange: this._handleChange, placeholder: 'Insert amount' }),
                output && _react2.default.createElement(
                    'ul',
                    { 'class': 'change-calculator-output' },
                    output
                )
            );
        }
    }]);

    return CoinCalculator;
}(_react2.default.Component);

exports.default = CoinCalculator;

},{"react":"react"}],3:[function(require,module,exports){
"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _App = require("./components/App.js");

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(_App2.default, null), document.getElementById("App"));

},{"./components/App.js":1,"react":"react","react-dom":"react-dom"}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvY29tcG9uZW50cy9BcHAuanMiLCJzcmMvanMvY29tcG9uZW50cy9DaGFuZ2VDYWxjdWxhdG9yLmpzIiwic3JjL2pzL21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0FBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVNLEc7OztBQUNGLG1CQUFjO0FBQUE7O0FBQUE7O0FBRVYsY0FBSyxLQUFMLEdBQWEsbUJBQWI7QUFGVTtBQUdiOzs7O2lDQUVPO0FBQ0osbUJBQ0k7QUFBQTtBQUFBLGtCQUFLLFdBQVUsS0FBZjtBQUNJO0FBQUE7QUFBQTtBQUFNLHlCQUFLO0FBQVgsaUJBREo7QUFFSSw4Q0FBQywwQkFBRDtBQUZKLGFBREo7QUFNSDs7OztFQWJhLGdCOztrQkFnQkgsRzs7Ozs7Ozs7Ozs7QUNuQmY7Ozs7Ozs7Ozs7OztJQUVNLGM7OztBQUNGLDhCQUFjO0FBQUE7O0FBQUE7O0FBR1YsY0FBSyxNQUFMLEdBQWMsMEJBQWQ7QUFDQSxjQUFLLE1BQUwsR0FBYyxDQUNWLEVBQUMsT0FBTyxHQUFSLEVBQWEsTUFBTSxJQUFuQixFQURVLEVBQ2dCLEVBQUMsT0FBTyxHQUFSLEVBQWEsTUFBTSxJQUFuQixFQURoQixFQUMwQyxFQUFDLE9BQU8sRUFBUixFQUFZLE1BQU0sS0FBbEIsRUFEMUMsRUFFVixFQUFDLE9BQU8sRUFBUixFQUFZLE1BQU0sS0FBbEIsRUFGVSxFQUVnQixFQUFDLE9BQU8sRUFBUixFQUFZLE1BQU0sS0FBbEIsRUFGaEIsRUFFMEMsRUFBQyxPQUFPLENBQVIsRUFBVyxNQUFNLElBQWpCLEVBRjFDLEVBR1YsRUFBQyxPQUFPLENBQVIsRUFBVyxNQUFNLElBQWpCLEVBSFUsRUFHYyxFQUFDLE9BQU8sQ0FBUixFQUFXLE1BQU0sSUFBakIsRUFIZCxDQUFkOztBQUtBLGNBQUssS0FBTCxHQUFhO0FBQ1Qsb0JBQVE7QUFEQyxTQUFiOztBQUlBLGNBQUssYUFBTCxHQUFxQixNQUFLLGFBQUwsQ0FBbUIsSUFBbkIsT0FBckI7QUFiVTtBQWNiOztBQUVEOzs7OztzQ0FDYyxLLEVBQU87QUFDakI7QUFDQSxpQkFBSyxRQUFMLENBQWM7QUFDVix3QkFBUSxJQURFO0FBRVYsdUJBQU87QUFGRyxhQUFkOztBQUtBLGdCQUFJLE1BQU0sTUFBTixDQUFhLEtBQWpCLEVBQXdCO0FBQ3BCLHFCQUFLLGdCQUFMLENBQXNCLE1BQU0sTUFBTixDQUFhLEtBQW5DO0FBQ0g7QUFDSjs7QUFFRDs7Ozt5Q0FDaUIsSyxFQUFPO0FBQ3BCLGdCQUFJO0FBQ0Esb0JBQUksU0FBUyxLQUFLLGlCQUFMLENBQXVCLEtBQXZCLENBQWI7QUFBQSxvQkFDSSxTQUFTLEtBQUssZUFBTCxDQUFxQixNQUFyQixDQURiOztBQUdBLHFCQUFLLFFBQUwsQ0FBYztBQUNWLDRCQUFRO0FBREUsaUJBQWQ7QUFHSCxhQVBELENBT0UsT0FBTSxLQUFOLEVBQWE7QUFDWCxxQkFBSyxRQUFMLENBQWM7QUFDViwyQkFBTztBQURHLGlCQUFkO0FBR0g7QUFDSjs7QUFFRDs7OzswQ0FDa0IsSyxFQUFPO0FBQ3JCLGdCQUFJLGVBQUo7QUFBQSxnQkFDSSxRQUFRLE1BQU0sS0FBTixDQUFZLEtBQUssTUFBakIsQ0FEWjs7QUFHQTtBQUNBLGdCQUFJLFVBQVUsSUFBZCxFQUFvQjtBQUNoQixzQkFBTSx3QkFBTjtBQUNIOztBQUVEO0FBQ0E7QUFDQSxnQkFBSSxPQUFPLE1BQU0sQ0FBTixDQUFQLElBQW1CLFdBQW5CLElBQWtDLE1BQU0sTUFBTixDQUFhLENBQWIsTUFBb0IsR0FBMUQsRUFBK0Q7QUFDM0QseUJBQVMsV0FBVyxNQUFNLENBQU4sQ0FBWCxFQUFxQixFQUFyQixDQUFUO0FBQ0gsYUFGRCxNQUVPO0FBQ0g7QUFDQSx5QkFBUyxXQUFXLE1BQU0sQ0FBTixJQUFXLEdBQVgsR0FBaUIsTUFBTSxDQUFOLENBQTVCLEVBQXNDLEVBQXRDLENBQVQ7O0FBRUE7QUFDQSx5QkFBUyxPQUFPLE9BQVAsQ0FBZSxDQUFmLENBQVQ7O0FBRUE7QUFDQSx5QkFBUyxTQUFTLEdBQWxCO0FBQ0g7O0FBRUQsbUJBQU8sTUFBUDtBQUNIOztBQUVEOzs7O3dDQUNnQixNLEVBQVE7QUFDcEIsZ0JBQUksU0FBUyxFQUFiOztBQURvQjtBQUFBO0FBQUE7O0FBQUE7QUFHcEIscUNBQWlCLEtBQUssTUFBdEIsOEhBQThCO0FBQUEsd0JBQXJCLElBQXFCOztBQUMxQix3QkFBSSxLQUFLLEtBQUwsR0FBYSxNQUFqQixFQUF5QjtBQUNyQjtBQUNIOztBQUVELHdCQUFJLFlBQVksS0FBSyxLQUFMLENBQVcsU0FBUyxLQUFLLEtBQXpCLENBQWhCO0FBQ0EsMkJBQU8sSUFBUCxDQUFZLEVBQUMsTUFBTSxLQUFLLElBQVosRUFBa0IsV0FBVyxTQUE3QixFQUFaOztBQUVBLDhCQUFVLEtBQUssS0FBTCxHQUFhLFNBQXZCO0FBQ0g7QUFabUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFjcEIsbUJBQU8sTUFBUDtBQUNIOzs7aUNBRVE7QUFDTCxnQkFBSSxlQUFKO0FBQ0EsZ0JBQUksS0FBSyxLQUFMLENBQVcsTUFBZixFQUF1QjtBQUNuQix5QkFBUyxLQUFLLEtBQUwsQ0FBVyxNQUFYLENBQWtCLEdBQWxCLENBQXNCLFVBQUMsTUFBRCxFQUFTLEtBQVQ7QUFBQSwyQkFDM0I7QUFBQTtBQUFBLDBCQUFJLEtBQUssS0FBVDtBQUFrQiwrQkFBTyxTQUF6QjtBQUFBO0FBQXlDLCtCQUFPO0FBQWhELHFCQUQyQjtBQUFBLGlCQUF0QixDQUFUO0FBR0g7O0FBRUQsbUJBQ0k7QUFBQTtBQUFBLGtCQUFLLFdBQVUsbUJBQWY7QUFDSyxxQkFBSyxLQUFMLENBQVcsS0FBWCxJQUFvQjtBQUFBO0FBQUEsc0JBQUssV0FBVSxPQUFmO0FBQXlCLHlCQUFLLEtBQUwsQ0FBVztBQUFwQyxpQkFEekI7QUFFSSx5REFBTyxNQUFLLE1BQVosRUFBbUIsVUFBVSxLQUFLLGFBQWxDLEVBQWlELGFBQVksZUFBN0QsR0FGSjtBQUdLLDBCQUFVO0FBQUE7QUFBQSxzQkFBSSxTQUFNLDBCQUFWO0FBQ0w7QUFESztBQUhmLGFBREo7QUFTSDs7OztFQTdHd0IsZ0JBQU0sUzs7a0JBZ0hwQixjOzs7OztBQ2xIZjs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLG1CQUFTLE1BQVQsQ0FDSSw4QkFBQyxhQUFELE9BREosRUFFSSxTQUFTLGNBQVQsQ0FBd0IsS0FBeEIsQ0FGSiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBDaGFuZ2VDYWxjdWxhdG9yIGZyb20gXCIuL0NoYW5nZUNhbGN1bGF0b3IuanNcIjtcblxuY2xhc3MgQXBwIGV4dGVuZHMgQ29tcG9uZW50e1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnRpdGxlID0gJ0NoYW5nZSBjYWxjdWxhdG9yJztcbiAgICB9XG5cbiAgICByZW5kZXIoKXtcbiAgICAgICAgcmV0dXJuKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhcHBcIj5cbiAgICAgICAgICAgICAgICA8aDE+eyB0aGlzLnRpdGxlIH08L2gxPlxuICAgICAgICAgICAgICAgIDxDaGFuZ2VDYWxjdWxhdG9yIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFwcDsiLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCI7XG5cbmNsYXNzIENvaW5DYWxjdWxhdG9yIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLl9yZWdleCA9IC9ewqM/KFxcZCspKD86XFwuKFxcZCopKT9wPyQvaTtcbiAgICAgICAgdGhpcy5fY29pbnMgPSBbXG4gICAgICAgICAgICB7dmFsdWU6IDIwMCwgdGV4dDogJ8KjMid9LCB7dmFsdWU6IDEwMCwgdGV4dDogJ8KjMSd9LCB7dmFsdWU6IDUwLCB0ZXh0OiAnNTBwJ30sXG4gICAgICAgICAgICB7dmFsdWU6IDIwLCB0ZXh0OiAnMjBwJ30sIHt2YWx1ZTogMTAsIHRleHQ6ICcxMHAnfSwge3ZhbHVlOiA1LCB0ZXh0OiAnNXAnfSxcbiAgICAgICAgICAgIHt2YWx1ZTogMiwgdGV4dDogJzJwJ30sIHt2YWx1ZTogMSwgdGV4dDogJzFwJ31dO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBjaGFuZ2U6IDBcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLl9oYW5kbGVDaGFuZ2UgPSB0aGlzLl9oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICAvLyBUYWtlcyB1c2VycyBpbnB1dCwgdmFsaWRhdGVzIGFuZCBjYWxjdWxhdGVzIGNvcnJlY3QgY2hhbmdlXG4gICAgX2hhbmRsZUNoYW5nZShldmVudCkge1xuICAgICAgICAvLyBSZXNldCBzdGF0ZVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGNoYW5nZTogbnVsbCxcbiAgICAgICAgICAgIGVycm9yOiBudWxsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChldmVudC50YXJnZXQudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbGN1bGF0ZUNoYW5nZShldmVudC50YXJnZXQudmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ29udmVydCBhIGdpdmVuIHN0cmluZyBpbnRvIGl0cyBjb3JyZXNwb25kaW5nIHZhbHVlIGluIHBlbm5pZXNcbiAgICBfY2FsY3VsYXRlQ2hhbmdlKHZhbHVlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgYW1vdW50ID0gdGhpcy5fY29udmVydFRvUGVubmllcyh2YWx1ZSksXG4gICAgICAgICAgICAgICAgY2hhbmdlID0gdGhpcy5fY2FsY3VsYXRlQ29pbnMoYW1vdW50KTtcblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgY2hhbmdlOiBjaGFuZ2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoKGVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBlcnJvcjogZXJyb3JcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ29udmVydCBhIGdpdmVuIHN0cmluZyBpbnRvIGl0cyBjb3JyZXNwb25kaW5nIHZhbHVlIGluIHBlbm5pZXNcbiAgICBfY29udmVydFRvUGVubmllcyhpbnB1dCkge1xuICAgICAgICBsZXQgYW1vdW50LFxuICAgICAgICAgICAgcGFydHMgPSBpbnB1dC5tYXRjaCh0aGlzLl9yZWdleCk7XG4gICAgICAgIFxuICAgICAgICAvLyBJbnZhbGlkIGlucHV0XG4gICAgICAgIGlmIChwYXJ0cyA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgJ0ludmFsaWQgYW1vdW50IGVudGVyZWQnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgb25seSB0aGUgbnVtYmVyIGJlZm9yZSB0aGUgZGVjaW1hbCBpcyBwcmVzZW50IGFzc3VtZSBpdCBpcyBwZW5jZSxcbiAgICAgICAgLy8gdW5sZXNzIG90aGVyd2lzZSBzdGF0ZWRcbiAgICAgICAgaWYgKHR5cGVvZiBwYXJ0c1syXSA9PSBcInVuZGVmaW5lZFwiICYmIGlucHV0LmNoYXJBdCgwKSAhPT0gJ8KjJykge1xuICAgICAgICAgICAgYW1vdW50ID0gcGFyc2VGbG9hdChwYXJ0c1sxXSwgMTApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gUmVidWlsZCBhbmQgcGFyc2UgcGFydHMgaW50byB2YWxpZCBmbG9hdFxuICAgICAgICAgICAgYW1vdW50ID0gcGFyc2VGbG9hdChwYXJ0c1sxXSArICcuJyArIHBhcnRzWzJdLCAxMCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFJvdW5kIGFtb3VudCB0byBjb3JyZWN0IHByZWNpc2lzb25cbiAgICAgICAgICAgIGFtb3VudCA9IGFtb3VudC50b0ZpeGVkKDIpO1xuXG4gICAgICAgICAgICAvLyBDb3ZlcnQgYW1vdW50IGludG8gcGVubmllc1xuICAgICAgICAgICAgYW1vdW50ID0gYW1vdW50ICogMTAwO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFtb3VudDtcbiAgICB9XG5cbiAgICAvLyBUYWtlIGFuIGludGVnZXIgYW5kIHJldHVybiBhbiBhcnJheSBvZiB0aGUgc21hbGxlc3QgZGVub21pbmF0aW9uIG9mIGNvaW5zXG4gICAgX2NhbGN1bGF0ZUNvaW5zKGFtb3VudCkge1xuICAgICAgICBsZXQgY2hhbmdlID0gW107XG5cbiAgICAgICAgZm9yIChsZXQgY29pbiBvZiB0aGlzLl9jb2lucykge1xuICAgICAgICAgICAgaWYgKGNvaW4udmFsdWUgPiBhbW91bnQpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IHF1YW50aXRpeSA9IE1hdGguZmxvb3IoYW1vdW50IC8gY29pbi52YWx1ZSk7XG4gICAgICAgICAgICBjaGFuZ2UucHVzaCh7Y29pbjogY29pbi50ZXh0LCBxdWFudGl0aXk6IHF1YW50aXRpeX0pO1xuXG4gICAgICAgICAgICBhbW91bnQgLT0gY29pbi52YWx1ZSAqIHF1YW50aXRpeTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjaGFuZ2U7XG4gICAgfTtcblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IG91dHB1dDtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY2hhbmdlKSB7XG4gICAgICAgICAgICBvdXRwdXQgPSB0aGlzLnN0YXRlLmNoYW5nZS5tYXAoKGNoYW5nZSwgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgICA8bGkga2V5PXtpbmRleH0+eyBjaGFuZ2UucXVhbnRpdGl5IH0geCB7IGNoYW5nZS5jb2luIH08L2xpPlxuICAgICAgICAgICAgKSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNoYW5nZS1jYWxjdWxhdG9yXCI+XG4gICAgICAgICAgICAgICAge3RoaXMuc3RhdGUuZXJyb3IgJiYgPGRpdiBjbGFzc05hbWU9XCJlcnJvclwiPnsgdGhpcy5zdGF0ZS5lcnJvciB9PC9kaXY+fVxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG9uQ2hhbmdlPXt0aGlzLl9oYW5kbGVDaGFuZ2V9IHBsYWNlaG9sZGVyPVwiSW5zZXJ0IGFtb3VudFwiLz5cbiAgICAgICAgICAgICAgICB7b3V0cHV0ICYmIDx1bCBjbGFzcz1cImNoYW5nZS1jYWxjdWxhdG9yLW91dHB1dFwiPlxuICAgICAgICAgICAgICAgICAgICB7IG91dHB1dCB9XG4gICAgICAgICAgICAgICAgPC91bD59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvaW5DYWxjdWxhdG9yOyIsImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQgQXBwIGZyb20gXCIuL2NvbXBvbmVudHMvQXBwLmpzXCI7XG5cblJlYWN0RE9NLnJlbmRlcihcbiAgICA8QXBwIC8+LFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiQXBwXCIpXG4pOyJdfQ==
