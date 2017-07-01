import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { expect } from 'chai';
import {
  init,
  childrenMatcher,
  listItemContainerPropsMatcher,
  itemMatcher,
  getElementWithClass
} from '../helpers';
import AutowhateverApp, {
  renderListItemContainer
} from './AutowhateverApp';

describe('Autowhatever with renderListItemContainer', () => {
  beforeEach(() => {
    renderListItemContainer.reset();
    init(TestUtils.renderIntoDocument(<AutowhateverApp />));
  });

  it('should render whatever renderListItemContainer returns', () => {
    expect(getElementWithClass('Apple-list-item-container-class')).not.to.equal(null);
  });

  it('should call renderListItemContainer once with the right parameters', () => {
    expect(renderListItemContainer).to.have.been.calledOnce;
    expect(renderListItemContainer).to.be.calledWith({
      item: itemMatcher,
      children: childrenMatcher,
      containerProps: listItemContainerPropsMatcher
    });
  });
});
