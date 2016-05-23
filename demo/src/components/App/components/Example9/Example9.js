import theme from '../theme.less';
import css from './customStyles.less';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateInputValue, updateFocusedItem } from 'actions/app';
import Autowhatever from 'Autowhatever';
import SourceCodeLink from 'SourceCodeLink/SourceCodeLink';

const exampleId = '9';
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
    onMouseEnter: (event, { sectionIndex, itemIndex }) => {
      dispatch(updateFocusedItem(exampleId, sectionIndex, itemIndex));
    },
    onMouseLeave: () => {
      dispatch(updateFocusedItem(exampleId, null, null));
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

function renderInput(inputProps) {
  return (
    <div {...inputProps} className={`${inputProps.className} ${css.input}`}>{inputProps.value}</div>
  );
}

class Example extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    focusedSectionIndex: PropTypes.number,
    focusedItemIndex: PropTypes.number,

    onChange: PropTypes.func.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    onMouseDown: PropTypes.func.isRequired
  };

  render() {
    const { value, focusedSectionIndex, focusedItemIndex, onChange,
            onMouseEnter, onMouseLeave, onMouseDown } = this.props;
    const inputProps = {
      value,
      onChange,
      tabIndex: 0,
      autoComplete: null,
      type: null,
      ref: null
    };
    const itemProps = { onMouseEnter, onMouseLeave, onMouseDown };

    return (
      <div>
        <Autowhatever id={exampleId}
                      items={items}
                      renderItem={renderItem}
                      renderInput={renderInput}
                      inputProps={inputProps}
                      itemProps={itemProps}
                      focusedSectionIndex={focusedSectionIndex}
                      focusedItemIndex={focusedItemIndex}
                      theme={theme} />
        <SourceCodeLink file={file} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Example);
