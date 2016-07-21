import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

let data = null;

export function init(d) {
  data = d;
}

export const getInputAttribute = attr =>
  data.input.getAttribute(attr);

export const getItemsContainerAttribute = attr =>
  data.itemsContainer.getAttribute(attr);
