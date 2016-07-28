import chai from 'chai';
import sinonChai from 'sinon-chai';
import TestUtils, { Simulate } from 'react-addons-test-utils';

chai.use(sinonChai);

let app, input, itemsContainer;

export const init = application => {
  app = application;
  input = TestUtils.findRenderedDOMComponentWithTag(app, 'input');
  itemsContainer = TestUtils.findRenderedDOMComponentWithClass(app, 'react-autowhatever__items-container');
};

export const getStoredFocusedItemName = () => {
  const { focusedItem } = app.autowhatever.itemsList;

  return focusedItem ? focusedItem.constructor.name : null;
};

export const getInputAttribute = attr =>
  input.getAttribute(attr);

export const getItemsContainerAttribute = attr =>
  itemsContainer.getAttribute(attr);

export const getItems = () =>
  TestUtils.scryRenderedDOMComponentsWithClass(app, 'react-autowhatever__item');

export const getItem = itemIndex => {
  const items = getItems();

  if (itemIndex >= items.length) {
    throw Error(`Cannot find item #${itemIndex}`);
  }

  return items[itemIndex];
};

export const mouseEnterItem = itemIndex =>
  Simulate.mouseEnter(getItem(itemIndex));

export const mouseLeaveItem = itemIndex =>
  Simulate.mouseLeave(getItem(itemIndex));

export const mouseDownItem = itemIndex =>
  Simulate.mouseDown(getItem(itemIndex));

export const clickItem = itemIndex =>
  Simulate.click(getItem(itemIndex));

export const clickDown = () =>
  Simulate.keyDown(input, { key: 'ArrowDown' });
