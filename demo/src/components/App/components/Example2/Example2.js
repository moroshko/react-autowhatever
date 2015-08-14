import styles from './Example2.less';

import React, { Component } from 'react';
import Autowhatever from 'Autowhatever';

const items = [{
  title: {
    text: 'A'
  },
  items: [{
    text: 'Apple'
  }, {
    text: 'Apricot'
  }]
}, {
  title: {
    text: 'B'
  },
  items: [{
    text: 'Banana'
  }]
}, {
  title: {
    text: 'C'
  },
  items: [{
    text: 'Cherry'
  }]
}];

const inputProps = {
  onChange: event => console.log('Example2:', event.target.value)
};

function renderItem(item) {
  return (
    <span>{item.text}</span>
  );
}

function renderTitle(title) {
  return (
    <strong>{`- ${title.text} -`}</strong>
  );
}

export default class App extends Component {
  render() {
    return (
      <Autowhatever id="2"
                    isOpen={true}
                    items={items}
                    renderItem={renderItem}
                    renderTitle={renderTitle}
                    inputProps={inputProps}
                    focusedSectionIndex={0}
                    focusedItemIndex={1} />
    );
  }
}
