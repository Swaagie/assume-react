'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pluginAssumeReact;

var _reactAddonsTestUtils = require('react-addons-test-utils');

var _reactAddonsTestUtils2 = _interopRequireDefault(_reactAddonsTestUtils);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Slick = require('mootools-core/Source/Slick/Slick.Parser');

var _tree = require('./tree');

var _tree2 = _interopRequireDefault(_tree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function pluginAssumeReact(assume, util) {
  var a = assume().a;

  /**
   * Is the value allowed for the React Component.propTypes.
   *
   * @param {String} propName Propety name
   * @param {String} prop Value to test against
   * @param {String} msg Custom message
   * @api public
   */
  assume.add('allowProp', function allowProp(prop, value, msg) {
    var result = this.value.propTypes[prop](_defineProperty({}, prop, value), prop);

    if (result) {
      result = util.format(result.message);
    }

    this.test(result === null, msg, result);
  });

  /**
   * Is the value allowed for the React Component.propTypes.
   *
   * @param {Component} type React Component definition.
   * @param {String} msg Custom message
   * @api public
   */
  assume.add('elementOfType', function allowProp(type, msg) {
    return this.test(_reactAddonsTestUtils2.default.isElementOfType(this.value, type), msg);
  });

  /**
   * Check if the Component.props have the property with value.
   *
   * @param {String} propName Propety name
   * @param {String} prop Value to test against
   * @param {String} msg Custom message
   * @api public
   */
  assume.add('prop, props', function props(prop, value, msg) {
    var test = this.clone(this.value.props);

    return test.property.apply(test, arguments);
  });

  /**
   * Proxy type of check to test against React Elements.
   *
   * @param {Mixed} of Value to typeof
   * @param {String} msg Custom message
   * @api public
   */
  assume.add('a, an', function an(of, msg) {
    if (of === 'element') {
      return this.test(_reactAddonsTestUtils2.default.isElement(this.value) === true, msg);
    }

    return a.call(this, of, msg);
  });

  assume.add('child', function child(selector) {
    var _this = this;

    var parsed = _Slick.Slick.parse(selector);
    var tree = new _tree2.default(this.value);

    var matches = tree.findAll(parsed.expressions).map(function (node) {
      return _this.clone(node);
    });

    return matches.length === 1 ? matches[0] : matches;
  });
}
