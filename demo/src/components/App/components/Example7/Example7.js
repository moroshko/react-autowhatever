import theme from '../theme.less';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateInputValue, updateFocusedItem } from '../../redux';
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
    focusedSectionIndex: state[exampleId].focusedSectionIndex,
    focusedItemIndex: state[exampleId].focusedItemIndex
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChange: event => {
      dispatch(updateInputValue(exampleId, event.target.value));
    },
    onKeyDown: (event, { newFocusedSectionIndex, newFocusedItemIndex }) => {
      event.preventDefault(); // Don't move the cursor to start/end

      if (typeof newFocusedItemIndex !== 'undefined') {
        dispatch(updateFocusedItem(exampleId, newFocusedSectionIndex, newFocusedItemIndex));
      }
    }
  };
}

function renderItemsContainer({ ref, ...rest }) { // eslint-disable-line react/prop-types
  const callRef = isolatedScroll => {
    if (isolatedScroll !== null) {
      ref(isolatedScroll.component);
    }
  };

  return (
    <IsolatedScroll {...rest} ref={callRef} />
  );
}

function renderItem(item) {
  return (
    <span>{item.text}</span>
  );
}

function Example(props) {
  const { value, focusedSectionIndex, focusedItemIndex, onChange, onKeyDown } = props;
  const inputProps = { value, onChange, onKeyDown };

  return (
    <div>
      <Autowhatever
        id={exampleId}
        items={items}
        renderItemsContainer={renderItemsContainer}
        renderItem={renderItem}
        inputProps={inputProps}
        focusedSectionIndex={focusedSectionIndex}
        focusedItemIndex={focusedItemIndex}
        theme={theme} />
      <SourceCodeLink file={file} />
    </div>
  );
}

Example.propTypes = {
  value: PropTypes.string.isRequired,
  focusedSectionIndex: PropTypes.number,
  focusedItemIndex: PropTypes.number,

  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Example);
