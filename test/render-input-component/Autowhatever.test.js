import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { expect } from 'chai';
import { init, getStoredInput } from '../helpers';
import AutowhateverApp from './AutowhateverApp';

describe('Autowhatever with renderInputComponent', () => {
  beforeEach(() => {
    init(TestUtils.renderIntoDocument(<AutowhateverApp />));
  });

  it('should store the input on the instance', () => {
    expect(getStoredInput().getAttribute('id')).to.equal('my-custom-input');
  });
});
