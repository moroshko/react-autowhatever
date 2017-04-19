import theme from '../theme.less';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateInputValue } from '../../redux';
import Autowhatever from 'Autowhatever';
import SourceCodeLink from 'SourceCodeLink/SourceCodeLink';

const exampleId = '10';
const file = `demo/src/components/App/components/Example${exampleId}/Example${exampleId}.js`;

const renderInputComponent = inputProps => {
  const style = {
    border: '0 solid green',
    borderBottomWidth: '1px',
    borderRadius: 0
  };

  return (
    <input style={style} {...inputProps} />
  );
};

const mapStateToProps = state => ({
  value: state[exampleId].value
});

const mapDispatchToProps = dispatch => ({
  onChange: event => dispatch(updateInputValue(exampleId, event.target.value))
});

const Example = props => {
  const { value, onChange } = props;
  const inputProps = {
    placeholder: 'Custom input, no items here',
    value,
    onChange
  };

  return (
    <div>
      <Autowhatever
        id={exampleId}
        renderInputComponent={renderInputComponent}
        items={[]}
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
