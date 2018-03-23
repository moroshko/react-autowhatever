import React, { Component } from 'react';
import Autowhatever from '../../src/Autowhatever';
import items from './items';

export const renderItem = item => item.text;

export default class AutowhateverApp extends Component {
  constructor() {
    super();

    this.state = {
      value: ''
    };
  }

  onChange = event => {
    this.setState({
      value: event.target.value
    });
  };

  render() {
    const { value } = this.state;
    const inputProps = {
      id: 'my-custom-input',
      value,
      onChange: this.onChange
    };

    return (
      <Autowhatever
        id="my-id"
        items={items}
        renderItem={renderItem}
        inputProps={inputProps}
      />
    );
  }
}
