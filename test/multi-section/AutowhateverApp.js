import React, { Component } from 'react';
import sinon from 'sinon';
import Autowhatever from '../../src/Autowhatever';
import sections from './sections';

export const shouldRenderSection = sinon.spy(section => section.items.length > 0);

export const renderSectionTitle = sinon.spy(section => (
  <strong>{section.title}</strong>
));

export const getSectionItems = sinon.spy(section => section.items);

export const renderItem = sinon.spy(item => (
  <span>{item.text}</span>
));

export default class AutowhateverApp extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      focusedSectionIndex: null,
      focusedItemIndex: null
    };

    this.storeAutowhateverReference = this.storeAutowhateverReference.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
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

  onKeyDown(event, { newFocusedSectionIndex, newFocusedItemIndex }) {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        this.setState({
          focusedSectionIndex: newFocusedSectionIndex,
          focusedItemIndex: newFocusedItemIndex
        });
        break;
    }
  }

  render() {
    const { value, focusedSectionIndex, focusedItemIndex } = this.state;
    const inputProps = {
      value,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown
    };

    return (
      <Autowhatever
        multiSection={true}
        items={sections}
        shouldRenderSection={shouldRenderSection}
        renderSectionTitle={renderSectionTitle}
        getSectionItems={getSectionItems}
        renderItem={renderItem}
        inputProps={inputProps}
        focusedSectionIndex={focusedSectionIndex}
        focusedItemIndex={focusedItemIndex}
        ref={this.storeAutowhateverReference} />
    );
  }
}
