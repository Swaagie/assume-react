/* eslint no-invalid-this: 0 */
import TestUtils from 'react-addons-test-utils';

export default function pluginAssumeReact(assume, util) {
  const a = assume().a;

  /**
   * Is the value allowed for the React Component.propTypes.
   *
   * @param {String} prop Propety name
   * @param {String} value Value to test against
   * @param {String} msg Custom message
   * @returns {Assert} reference to self
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
   * @returns {Assert} reference to self
   * @api public
   */
  assume.add('elementOfType', function allowProp(type, msg) {
    if (typeof type === 'string') {
      return this.test(this.value.type.name === type, msg);
    }

    return this.test(TestUtils.isElementOfType(this.value, type), msg);
  });

  /**
   * Check if the Component.props have the property with value.
   *
   * @param {Array} args Prop and value to test against
     * @returns {Assert} reference to self
   * @api public
   */
  assume.add('prop, props', function props(...args) {
    const test = this.clone(this.value.props);

    return test.property.apply(test, args);
  });

  /**
   * Check if the Component.props.className contains the value.
   *
   * @param {String} value Value to test against
   * @returns {Assert} reference to self
   * @api public
   */
  assume.add('className', function className(value) {
    const test = this.clone(this.value.props.className);

    return test.includes(value);
  });

  /**
   * Check if the Component has child.
   *
   * @param {String} value Value to test against
   * @returns {Assert} reference to self
   * @api public
   */
  assume.add('child, children', function children(value) {
    const test = this.clone(this.value.props.children);

    return test.includes(value);
  });

  /**
   * Proxy type of check to test against React Elements.
   *
   * @param {Mixed} of Value to typeof
   * @param {String} msg Custom message
   * @returns {Assert} reference to self
   * @api public
   */
  assume.add('a, an', function an(of, msg) {
    if (of === 'element') {
      return this.test(TestUtils.isElement(this.value) === true, msg);
    }

    return a.call(this, of, msg);
  });
}