import styles from './Example1.less';

import React, { Component } from 'react';
import Autowhatever from 'Autowhatever';
import theme from './Example1.less';

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

function onChange(event) {
  console.log('Example1:', event.target.value);
}

export default class Example1 extends Component {
  constructor() {
    super();

    this.state = {
      inputProps: {
        value: 'hello',
        onChange
      }
    };

    setTimeout(() => {
      this.setState({
        inputProps: {
          value: 'all good',
          onChange
        }
      });
    }, 1000);
  }

  render() {
    return (
      <div>
        <Autowhatever id="1"
                      isOpen={true}
                      items={items}
                      renderItem={renderItem}
                      inputProps={this.state.inputProps}
                      focusedItemIndex={2}
                      theme={theme} />
      </div>
    );
  }
}
