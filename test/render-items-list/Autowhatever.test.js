import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { expect } from 'chai';
import sinon from 'sinon';
import {
  init,
  getElementWithClass
} from '../helpers';
import AutowhateverApp, {
  renderItemsList
} from './AutowhateverApp';
import items from './items';

describe('Autowhatever with renderItemsList', () => {
  beforeEach(() => {
    renderItemsList.reset();
    init(TestUtils.renderIntoDocument(<AutowhateverApp />));
  });

  it('should render whatever renderItemsList returns', () => {
    expect(getElementWithClass('testClass')).not.to.equal(null);
  });

  it('should call renderItemsList once with the right parameters', () => {
    expect(renderItemsList).to.have.been.calledOnce;
    expect(renderItemsList).to.be.calledWith({
      items,
      renderItem: sinon.match.func,
      role: 'listbox',
      className: 'react-autowhatever__items-list'
    });
  });
});
