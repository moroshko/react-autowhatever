import theme from '../theme.less';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateInputValue } from 'actions/app';
import Autowhatever from 'Autowhatever';
import SourceCodeLink from 'SourceCodeLink/SourceCodeLink';

const exampleId = '8';
const file = `demo/src/components/App/components/Example${exampleId}/Example${exampleId}.js`;

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

class Example extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  renderTextArea(inputProps) {

    console.log('input props', inputProps);

    return (
      <textarea {...inputProps} rows={3} />
    );
  }

  render() {
    const { value, onChange } = this.props;
    const inputProps = { value, onChange };

    return (
      <div>
        <Autowhatever id={exampleId}
                      items={[]}
                      inputProps={inputProps}
                      renderInput={this.renderTextArea}
                      theme={theme} />
        <SourceCodeLink file={file} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Example);
