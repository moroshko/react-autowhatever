import styles from './Example11.less';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateInputValue } from '../../redux';
import Autowhatever from 'Autowhatever';
import SourceCodeLink from 'SourceCodeLink/SourceCodeLink';

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
    zIndex: 2,
    maxHeight: '260px',
    overflowY: 'auto'
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

const exampleId = '11';
const file = `demo/src/components/App/components/Example${exampleId}/Example${exampleId}.js`;

const renderItemsContainer = ({ children, containerProps, query }) => (
  <div {...containerProps}>
    {children}
    <div className={styles.footer}>
      {
        query
          ? <span>Press Enter to search <strong>{query}</strong></span>
          : <span>Powered by react-autowhatever</span>
      }
    </div>
  </div>
);

const mapStateToProps = state => ({
  value: state[exampleId].value
});

const mapDispatchToProps = dispatch => ({
  onChange: event => dispatch(updateInputValue(exampleId, event.target.value))
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
    onChange: PropTypes.func.isRequired
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
    const { value, onChange } = this.props;
    const inputProps = {
      placeholder: 'Custom items container',
      value,
      onChange
    };

    return (
      <div>
        <Autowhatever
          id={exampleId}
          renderItemsContainer={this.renderItemsContainer}
          items={items}
          renderItem={renderItem}
          inputProps={inputProps}
          theme={theme}
        />
        <SourceCodeLink file={file} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Example);
