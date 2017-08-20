import styles from './Example12.less';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateInputValue, updateHighlightedItem } from '../../redux';
import Autowhatever from 'Autowhatever';
import SourceCodeLink from 'SourceCodeLink/SourceCodeLink';
import IsolatedScroll from 'react-isolated-scroll';

const theme = {
  container: {
    position: 'relative'
  },
  input: {
    width: '240px',
    height: '30px',
    padding: '10px 20px',
    fontSize: '16px',
    fontFamily: 'Helvetica, Arial, sans-serif',
    border: '1px solid #aaa',
    borderRadius: '4px',
    boxSizing: 'content-box'
  },
  inputOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  inputFocused: {
    outline: 'none'
  },
  itemsContainer: {
    display: 'none'
  },
  itemsContainerOpen: {
    display: 'block',
    position: 'relative',
    top: '-1px',
    width: '280px',
    border: '1px solid #aaa',
    backgroundColor: '#fff',
    fontSize: '16px',
    lineHeight: 1.25,
    borderBottomLeftRadius: '4px',
    borderBottomRightRadius: '4px',
    zIndex: 2
  },
  itemsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  },
  item: {
    cursor: 'pointer',
    padding: '10px 20px'
  },
  itemHighlighted: {
    backgroundColor: '#ddd'
  }
};

const exampleId = '12';
const file = `demo/src/components/App/components/Example${exampleId}/Example${exampleId}.js`;

const renderItemsContainer = ({ children, containerProps, query }) => {
  const { ref, ...restContainerProps } = containerProps;
  const callRef = isolatedScroll => {
    if (isolatedScroll !== null) {
      ref(isolatedScroll.component);
    }
  };

  return (
    <div {...restContainerProps}>
      <div className={styles.header}>
        Suggestions
      </div>
      <IsolatedScroll className={styles.suggestions} ref={callRef}>
        {children}
      </IsolatedScroll>
      <div className={styles.footer}>
        {
          query
            ? <span>Press Enter to search <strong>{query}</strong></span>
            : <span>Powered by react-autowhatever</span>
        }
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  value: state[exampleId].value,
  highlightedSectionIndex: state[exampleId].highlightedSectionIndex,
  highlightedItemIndex: state[exampleId].highlightedItemIndex
});

const mapDispatchToProps = dispatch => ({
  onChange: event => {
    dispatch(updateInputValue(exampleId, event.target.value));
  },
  onKeyDown: (event, { newHighlightedSectionIndex, newHighlightedItemIndex }) => {
    event.preventDefault(); // Don't move the cursor to start/end

    if (typeof newHighlightedItemIndex !== 'undefined') {
      dispatch(updateHighlightedItem(exampleId, newHighlightedSectionIndex, newHighlightedItemIndex));
    }
  }
});

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

function renderItem(item) {
  return (
    <span>{item.text}</span>
  );
}

class Example extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    highlightedSectionIndex: PropTypes.number,
    highlightedItemIndex: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func.isRequired
  };

  renderItemsContainer = ({ children, containerProps }) => {
    const { value } = this.props;

    return renderItemsContainer({
      children,
      containerProps,
      query: value.trim()
    });
  };

  render() {
    const { value, highlightedSectionIndex, highlightedItemIndex, onChange, onKeyDown } = this.props;
    const inputProps = {
      placeholder: 'Custom scrollable items container',
      value,
      onChange,
      onKeyDown
    };

    return (
      <div>
        <Autowhatever
          id={exampleId}
          items={items}
          renderItemsContainer={this.renderItemsContainer}
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
}

export default connect(mapStateToProps, mapDispatchToProps)(Example);
