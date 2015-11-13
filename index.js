'use strict';

import React from 'react';

export default function pluginAssumeReact(assume, util) {
  assume.add('allowedProp', function(propName, prop, msg) {
    let result = this.value.propTypes[propName]({ [propName]: prop }, propName);

    this.test(result === null, result);
  });
}