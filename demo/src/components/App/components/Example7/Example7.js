import theme from '../theme.less';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateInputValue, updateFocusedItem } from 'actions/app';
import Autowhatever from 'Autowhatever';
import SourceCodeLink from 'SourceCodeLink/SourceCodeLink';

const exampleId = '7';
const file = `demo/src/components/App/components/Example${exampleId}/Example${exampleId}.js`;

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

function getSectionItems(section) {
  return section.items;
}

function renderItem(item) {
  return (
    <span>{item.text}</span>
  );
}

function mapStateToProps(state) {
  return {
    value: state[exampleId].value,
    focusedSectionIndex: state[exampleId].focusedSectionIndex,
    focusedItemIndex: state[exampleId].focusedItemIndex
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChange: event => {
      dispatch(updateInputValue(exampleId, event.target.value));
    },
    onKeyDown: (event, { focusedSectionIndex, focusedItemIndex, newFocusedSectionIndex, newFocusedItemIndex }) => {
      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowUp':
          event.preventDefault();
          dispatch(updateFocusedItem(exampleId, newFocusedSectionIndex, newFocusedItemIndex));
          break;

        case 'Enter':
          dispatch(updateInputValue(exampleId, items[focusedSectionIndex].items[focusedItemIndex].text + ' selected'));
          break;
      }
    }
  };
}

class Example extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    focusedSectionIndex: PropTypes.number,
    focusedItemIndex: PropTypes.number,

    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired
  };

  render() {
    const { value, focusedSectionIndex, focusedItemIndex, onChange, onKeyDown } = this.props;
    const inputProps = { value, onChange, onKeyDown };

    return (
      <div>
        <Autowhatever id={exampleId}
                      multiSection={true}
                      items={items}
                      shouldRenderSection={shouldRenderSection}
                      renderSectionTitle={renderSectionTitle}
                      getSectionItems={getSectionItems}
                      renderItem={renderItem}
                      inputProps={inputProps}
                      focusedSectionIndex={focusedSectionIndex}
                      focusedItemIndex={focusedItemIndex}
                      theme={theme} />
        <SourceCodeLink file={file} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Example);
