import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { expect } from 'chai';
import {
  init,
  getInputAttribute
} from '../helpers';
import AutowhateverApp, {
  renderItemsContainer
} from './AutowhateverApp';

describe('Autowhatever with empty items and renderItemsContainer', () => {
  beforeEach(() => {
    renderItemsContainer.reset();
    init(TestUtils.renderIntoDocument(<AutowhateverApp />));
  });

  it('should be open since this is rendered with a custom container', () => {
    expect(getInputAttribute('aria-expanded')).to.equal('true');
  });
});
