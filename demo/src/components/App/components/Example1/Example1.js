import styles from './Example1.less';

import React, { Component } from 'react';
import Autowhatever from 'Autowhatever';

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

const inputProps = {
  value: 'hello',
  onChange: event => console.log('Example1:', event.target.value)
};

function renderItem(item) {
  return (
    <span>{item.text}</span>
  );
}

export default class Example1 extends Component {
  render() {
    return (
      <div>
        <Autowhatever isOpen={true}
                      items={items}
                      renderItem={renderItem}
                      inputProps={inputProps}
                      focusedItemIndex={2} />
      </div>
    );
  }
}
