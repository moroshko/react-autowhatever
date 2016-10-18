import React, { Component } from 'react';
import sinon from 'sinon';
import Autowhatever from '../../src/Autowhatever';
import items from './items';

export const renderItem = sinon.spy(item => (
  <span>{item.text}</span>
));

export default class AutowhateverApp extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      focusedItemIndex: null
    };

    this.storeAutowhateverReference = this.storeAutowhateverReference.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  storeAutowhateverReference(autowhatever) {
    if (autowhatever !== null) {
      this.autowhatever = autowhatever;
    }
  }

  onChange(event) {
    this.setState({
      value: event.target.value
    });
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
    const inputComponent = props => (
      <div id="my-custom-input-component">
        <input {...props} type="text" />
      </div>
    );
    const inputProps = {
      id: 'my-fancy-input',
      value,
      onChange: this.onChange
    };
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
        inputComponent={inputComponent}
        inputProps={inputProps}
        itemProps={itemProps}
        focusedItemIndex={focusedItemIndex}
        ref={this.storeAutowhateverReference}
      />
    );
  }
}
