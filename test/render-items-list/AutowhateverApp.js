import React, { Component } from 'react';
import sinon from 'sinon';
import Autowhatever from '../../src/Autowhatever';
import items from './items';

export const renderItem = item => item.text;

export const renderItemsList =  sinon.spy(({ items, renderItem, role, className }) =>
  <ul style={{ backgroundColor: 'red' }} role={role} className={`${className} testClass`}>
    {items.slice(0,2).map(renderItem)}
  </ul>
);

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
        renderItemsList={renderItemsList}
        items={items}
        renderItem={renderItem}
        inputProps={inputProps}
      />
    );
  }
}
