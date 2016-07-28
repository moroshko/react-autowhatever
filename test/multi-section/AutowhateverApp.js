import React, { Component } from 'react';
import sinon from 'sinon';
import Autowhatever from '../../src/Autowhatever';
import sections from './sections';

let app;

export const shouldRenderSection = sinon.spy(section => section.items.length > 0);

export const renderSectionTitle = sinon.spy(section => (
  <strong>{section.title}</strong>
));

export const getSectionItems = sinon.spy(section => section.items);

export const renderItem = sinon.spy(item => (
  <span>{item.text}</span>
));

export const onKeyDown = sinon.spy((event, { newFocusedSectionIndex, newFocusedItemIndex }) => {
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    app.setState({
      focusedSectionIndex: newFocusedSectionIndex,
      focusedItemIndex: newFocusedItemIndex
    });
  }
});

export default class AutowhateverApp extends Component {
  constructor() {
    super();

    app = this;

    this.state = {
      value: '',
      focusedSectionIndex: null,
      focusedItemIndex: null
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

  render() {
    const { value, focusedSectionIndex, focusedItemIndex } = this.state;
    const inputProps = {
      value,
      onChange: this.onChange,
      onKeyDown
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
