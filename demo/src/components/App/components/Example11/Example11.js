import styles from './Example11.less';
import theme from '../theme.less';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateInputValue } from '../../redux';
import Autowhatever from 'Autowhatever';
import SourceCodeLink from 'SourceCodeLink/SourceCodeLink';

const exampleId = '11';
const file = `demo/src/components/App/components/Example${exampleId}/Example${exampleId}.js`;

const renderItemsContainer = ({ children, containerProps, data }) => (
  <div {...containerProps}>
    {children}
    <div className={styles.footer}>
      {
        data.query
          ? <span>Press Enter to search <strong>{data.query}</strong></span>
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

const Example = props => {
  const { value, onChange } = props;
  const inputProps = {
    placeholder: 'Custom items container',
    value,
    onChange
  };
  const renderItemsContainerData = {
    query: value.trim()
  };

  return (
    <div>
      <Autowhatever
        id={exampleId}
        renderItemsContainer={renderItemsContainer}
        renderItemsContainerData={renderItemsContainerData}
        items={items}
        renderItem={renderItem}
        inputProps={inputProps}
        theme={theme}
      />
      <SourceCodeLink file={file} />
    </div>
  );
};

Example.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Example);
