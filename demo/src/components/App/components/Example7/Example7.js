import theme from '../theme.less';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateInputValue, updateHighlightedItem } from '../../redux';
import Autowhatever from 'Autowhatever';
import SourceCodeLink from 'SourceCodeLink/SourceCodeLink';
import IsolatedScroll from 'react-isolated-scroll';

const exampleId = '7';
const file = `demo/src/components/App/components/Example${exampleId}/Example${exampleId}.js`;

const items = [{
  text: 'Apple cake'
}, {
  text: 'Apple pie'
}, {
  text: 'Banana cake'
}, {
  text: 'Banana pie'
}, {
  text: 'Cherry cake'
}, {
  text: 'Cherry pie'
}, {
  text: 'Grapefruit cake'
}, {
  text: 'Grapefruit pie'
}, {
  text: 'Lemon cake'
}, {
  text: 'Lemon pie'
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
    onKeyDown: (event, { newHighlightedSectionIndex, newHighlightedItemIndex }) => {
      event.preventDefault(); // Don't move the cursor to start/end

      if (typeof newHighlightedItemIndex !== 'undefined') {
        dispatch(updateHighlightedItem(exampleId, newHighlightedSectionIndex, newHighlightedItemIndex));
      }
    }
  };
}

function renderItemsContainer({ children, containerProps }) {
  const { ref, ...restContainerProps } = containerProps;
  const callRef = isolatedScroll => {
    if (isolatedScroll !== null) {
      ref(isolatedScroll.component);
    }
  };

  return (
    <IsolatedScroll ref={callRef} {...restContainerProps}>
      {children}
    </IsolatedScroll>
  );
}

function renderItem(item) {
  return (
    <span>{item.text}</span>
  );
}

function Example(props) {
  const { value, highlightedSectionIndex, highlightedItemIndex, onChange, onKeyDown } = props;
  const inputProps = { value, onChange, onKeyDown };

  return (
    <div>
      <Autowhatever
        id={exampleId}
        items={items}
        renderItemsContainer={renderItemsContainer}
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
