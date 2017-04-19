import theme from '../theme.less';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateInputValue, updateHighlightedItem } from '../../redux';
import Autowhatever from 'Autowhatever';
import SourceCodeLink from 'SourceCodeLink/SourceCodeLink';

const exampleId = '5';
const file = `demo/src/components/App/components/Example${exampleId}/Example${exampleId}.js`;

const items = [{
  text: 'Apple'
}, {
  text: 'Banana'
}, {
  text: 'Cherry'
}, {
  text: 'Grapefruit'
}, {
  text: 'Lemon'
}];

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
    onMouseEnter: (event, { sectionIndex, itemIndex }) => {
      dispatch(updateHighlightedItem(exampleId, sectionIndex, itemIndex));
    },
    onMouseLeave: () => {
      dispatch(updateHighlightedItem(exampleId, null, null));
    },
    onMouseDown: (event, { itemIndex }) => {
      dispatch(updateInputValue(exampleId, items[itemIndex].text + ' clicked'));
    }
  };
}

function renderItem(item) {
  return (
    <span>{item.text}</span>
  );
}

function Example(props) {
  const { value, highlightedSectionIndex, highlightedItemIndex, onChange,
          onMouseEnter, onMouseLeave, onMouseDown } = props;
  const inputProps = { value, onChange };
  const itemProps = { onMouseEnter, onMouseLeave, onMouseDown };

  return (
    <div>
      <Autowhatever
        id={exampleId}
        items={items}
        renderItem={renderItem}
        inputProps={inputProps}
        itemProps={itemProps}
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
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Example);
