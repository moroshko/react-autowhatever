import theme from '../theme.less';

import React, { Component } from 'react';
import Autowhatever from 'Autowhatever';

const items = [{
  title: 'A',
  items: [{
    text: 'Apple'
  }, {
    text: 'Apricot'
  }]
}, {
  title: 'B',
  items: [{
    text: 'Banana'
  }]
}, {
  title: 'C',
  items: [{
    text: 'Cherry'
  }]
}];

function shouldRenderSection(section) {
  return section.items.length > 0;
}

function renderSectionTitle(section) {
  return (
    <strong>{section.title}</strong>
  );
}

function getSectionItems(section){
  return section.items;
}

function renderItem(item) {
  return (
    <span>{item.text}</span>
  );
}

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      inputProps: {
        value: 'hi',
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
      <Autowhatever id="2"
                    isMultiSection={true}
                    isOpen={true}
                    items={items}
                    shouldRenderSection={shouldRenderSection}
                    renderSectionTitle={renderSectionTitle}
                    getSectionItems={getSectionItems}
                    renderItem={renderItem}
                    inputProps={this.state.inputProps}
                    focusedSectionIndex={0}
                    focusedItemIndex={1}
                    theme={theme} />
    );
  }
}
