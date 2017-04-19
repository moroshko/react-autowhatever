import theme from '../theme.less';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateInputValue, updateHighlightedItem } from '../../redux';
import Autowhatever from 'Autowhatever';
import SourceCodeLink from 'SourceCodeLink/SourceCodeLink';

const exampleId = '8';
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
    highlightedSectionIndex: state[exampleId].highlightedSectionIndex,
    highlightedItemIndex: state[exampleId].highlightedItemIndex
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChange: event => {
      dispatch(updateInputValue(exampleId, event.target.value));
    },
    onKeyDown: (event, { highlightedSectionIndex, highlightedItemIndex, newHighlightedSectionIndex, newHighlightedItemIndex }) => {
      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowUp':
          event.preventDefault(); // Don't move the cursor to start/end
          dispatch(updateHighlightedItem(exampleId, newHighlightedSectionIndex, newHighlightedItemIndex));
          break;

        case 'Enter':
          if (highlightedItemIndex !== null) {
            dispatch(updateInputValue(exampleId, items[highlightedSectionIndex].items[highlightedItemIndex].text + ' selected'));
          }
          break;
      }
    }
  };
}

function Example(props) {
  const { value, highlightedSectionIndex, highlightedItemIndex, onChange, onKeyDown } = props;
  const inputProps = { value, onChange, onKeyDown };

  return (
    <div>
      <Autowhatever
        id={exampleId}
        multiSection={true}
        items={items}
        renderSectionTitle={renderSectionTitle}
        getSectionItems={getSectionItems}
        renderItem={renderItem}
        inputProps={inputProps}
        highlightedSectionIndex={highlightedSectionIndex}
        highlightedItemIndex={highlightedItemIndex}
        theme={theme}
      />
      <SourceCodeLink file={file} />
    </div>
  );
}

Example.propTypes = {
  value: PropTypes.string.isRequired,
  highlightedSectionIndex: PropTypes.number,
  highlightedItemIndex: PropTypes.number,

  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Example);
