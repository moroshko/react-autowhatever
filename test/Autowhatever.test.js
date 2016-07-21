import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import {
  init,
  getInputAttribute,
  getItemsContainerAttribute
} from './helpers';
import AutowhateverApp from './AutowhateverApp';

describe('Autowhatever', () => {
  beforeEach(() => {
    const app = TestUtils.renderIntoDocument(React.createElement(AutowhateverApp));
    const container = TestUtils.findRenderedDOMComponentWithClass(app, 'react-autowhatever__container');
    const input = TestUtils.findRenderedDOMComponentWithTag(app, 'input');
    const itemsContainer = TestUtils.findRenderedDOMComponentWithClass(app, 'react-autowhatever__items-container');

    init({ app, container, input, itemsContainer });
  });

  it('input \'aria-owns\' should be equal to items container \'id\'', function() {
    expect(getInputAttribute('aria-owns')).to.equal(getItemsContainerAttribute('id'));
  });
});
