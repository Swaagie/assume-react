'use strict';

import TestUtils from 'react-addons-test-utils';
import React from 'react';

import { Slick } from 'mootools-core/Source/Slick/Slick.Parser';
import Tree from './tree';

export default function pluginAssumeReact(assume, util) {
  let a = assume().a;

  /**
   * Is the value allowed for the React Component.propTypes.
   *
   * @param {String} propName Propety name
   * @param {String} prop Value to test against
   * @param {String} msg Custom message
   * @api public
   */
  assume.add('allowProp', function allowProp(prop, value, msg) {
    let result = this.value.propTypes[prop]({ [prop]: value }, prop);

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
    return this.test(TestUtils.isElementOfType(this.value, type), msg);
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
    let test = this.clone(this.value.props);

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
      return this.test(TestUtils.isElement(this.value) === true, msg);
    }

    return a.call(this, of, msg);
  });

  assume.add('child', function child(selector) {
    let parsed = Slick.parse(selector);
    let tree = new Tree(this.value);

    let matches = tree.findAll(
      parsed.expressions
    ).map(node => this.clone(node));

    return matches.length === 1 ? matches[0] : matches;
  });
}