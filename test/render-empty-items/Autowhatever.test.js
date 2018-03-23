import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { expect } from 'chai';
import {
  init,
  getInputAttribute
} from '../helpers';
import AutowhateverApp from './AutowhateverApp';

describe('Autowhatever with empty items and default items container', () => {
  beforeEach(() => {
    init(TestUtils.renderIntoDocument(<AutowhateverApp />));
  });

  it('should be closed since this is rendered without a custom container', () => {
    expect(getInputAttribute('aria-expanded')).to.equal('false');
  });
});
