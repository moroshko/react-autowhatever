import theme from '../theme.less';

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

function renderItem(item) {
  return (
    <span>{item.text}</span>
  );
}

export default class Example1 extends Component {
  constructor() {
    super();

    this.state = {
      inputProps: {
        value: 'hello',
        onChange: event => {
          this.setState({
            inputProps: {
              ...this.state.inputProps,
              value: event.target.value
            }
          });
        }
      }
    };
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
