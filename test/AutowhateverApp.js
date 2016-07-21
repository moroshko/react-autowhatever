import React, { Component } from 'react';
import sinon from 'sinon';
import Autowhatever from '../src/Autowhatever';

const items = [{
  text: 'Apple'
}, {
  text: 'Banana'
}, {
  text: 'Cherry'
}, {
  text: 'Grapefruit'
}, {
  text: 'Lemon'
}];

let app = null;

export const renderItem = sinon.spy(item => (
  <span>{item.text}</span>
));

export default class AutowhateverApp extends Component {
  constructor() {
    super();
    app = this;
  }

  render() {
    return (
      <Autowhatever
        id="my-fancy-component"
        items={items}
        renderItem={renderItem} />
    );
  }
}
