import theme from '../theme.less';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateInputValue } from '../../redux';
import Autowhatever from 'Autowhatever';
import SourceCodeLink from 'SourceCodeLink/SourceCodeLink';

const exampleId = '10';
const file = `demo/src/components/App/components/Example${exampleId}/Example${exampleId}.js`;

function CustomInput(props) {
  const style = {
    border: '0 solid green',
    borderBottomWidth: '1px',
    borderRadius: 0
  };

  return (
    <input style={style} {...props} />
  );
}

function mapStateToProps(state) {
  return {
    value: state[exampleId].value
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChange: event => dispatch(updateInputValue(exampleId, event.target.value))
  };
}

function Example(props) {
  const { value, onChange } = props;
  const inputProps = {
    placeholder: 'Custom input',
    value,
    onChange
  };

  return (
    <div>
      <Autowhatever
        id={exampleId}
        items={[]}
        inputElement={CustomInput}
        inputProps={inputProps}
        theme={theme} />
      <SourceCodeLink file={file} />
    </div>
  );
}

Example.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Example);
