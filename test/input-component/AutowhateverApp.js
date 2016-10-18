import React, { Component } from 'react';
import Autowhatever from '../../src/Autowhatever';
import items from './items';

export const renderItem = item => item.text;

export const inputComponent = props => (
  <div>
    <input {...props} />
  </div>
);

export default class AutowhateverApp extends Component {
  constructor() {
    super();

    this.state = {
      value: ''
    };

    this.storeAutowhateverReference = this.storeAutowhateverReference.bind(this);
    this.onChange = this.onChange.bind(this);
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

  onClick(event, { itemIndex }) {
    this.setState({
      value: items[itemIndex].text
    });
  }

  render() {
    const { value } = this.state;
    const inputProps = {
      id: 'my-custom-input',
      value,
      onChange: this.onChange
    };

    return (
      <Autowhatever
        inputComponent={inputComponent}
        items={items}
        renderItem={renderItem}
        inputProps={inputProps}
        ref={this.storeAutowhateverReference}
      />
    );
  }
}
