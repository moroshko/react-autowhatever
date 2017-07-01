import React, { Component } from 'react';
import sinon from 'sinon';
import Autowhatever from '../../src/Autowhatever';
import items from './items';

export const renderItem = item => item.text;

export const renderListItemContainer = sinon.spy(({ item, containerProps, children }) => (
  <li {...containerProps} className={item.text + '-list-item-container-class'}>
    {children}
  </li>
));

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
        renderListItemContainer={renderListItemContainer}
        items={items}
        renderItem={renderItem}
        inputProps={inputProps}
      />
    );
  }
}
