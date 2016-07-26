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

export const onChange = sinon.spy(event => {
  app.setState({
    value: event.target.value
  });
});

export default class AutowhateverApp extends Component {
  constructor() {
    super();

    app = this;

    this.state = {
      value: '',
      focusedItemIndex: null
    };

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onClick = this.onClick.bind(this);
    this.storeAutowhateverReference = this.storeAutowhateverReference.bind(this);
  }

  storeAutowhateverReference(autowhatever) {
    if (autowhatever !== null) {
      this.autowhatever = autowhatever;
    }
  }

  onMouseEnter(event, { itemIndex }) {
    this.setState({
      focusedItemIndex: itemIndex
    });
  }

  onMouseLeave() {
    this.setState({
      focusedItemIndex: null
    });
  }

  onClick(event, { itemIndex }) {
    this.setState({
      value: items[itemIndex].text
    });
  }

  render() {
    const { value, focusedItemIndex } = this.state;
    const inputProps = { value, onChange };
    const itemProps = {
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave,
      onClick: this.onClick
    };

    return (
      <Autowhatever
        id="my-fancy-component"
        items={items}
        renderItem={renderItem}
        inputProps={inputProps}
        itemProps={itemProps}
        focusedItemIndex={focusedItemIndex}
        ref={this.storeAutowhateverReference} />
    );
  }
}
