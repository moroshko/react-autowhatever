import theme from '../theme.less';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateInputValue, updateFocusedItem } from 'actions/app';
import Autowhatever from 'Autowhatever';
import SourceCodeLink from 'SourceCodeLink/SourceCodeLink';

const exampleId = '10';
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
      if (typeof newFocusedItemIndex !== 'undefined') {
        event.preventDefault();
        dispatch(updateFocusedItem(exampleId, newFocusedSectionIndex, newFocusedItemIndex));
      }
    }
  };
}

function renderItem(item) {
  return (
    <span>{item.text}</span>
  );
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
                      items={items}
                      wrapItemFocus={false}
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
