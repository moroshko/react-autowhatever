import theme from '../theme.less';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateInputValue } from 'flux/actionCreators/app';
import Autowhatever from 'Autowhatever';

function mapStateToProps(state) {
  return {
    value: state[1].value
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChange: event => dispatch(updateInputValue(1, event.target.value))
  };
}

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

class Example1 extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  render() {
    const { value, onChange } = this.props;
    const inputProps = { value, onChange };

    return (
      <div>
        <Autowhatever id="1"
                      isMultiSection={false}
                      isOpen={true}
                      items={items}
                      renderItem={renderItem}
                      inputProps={inputProps}
                      focusedItemIndex={2}
                      theme={theme} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Example1);
