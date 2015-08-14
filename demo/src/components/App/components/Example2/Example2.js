import theme from '../theme.less';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateInputValue } from 'flux/actionCreators/app';
import Autowhatever from 'Autowhatever';

function mapStateToProps(state) {
  return {
    value: state[2].value
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChange: event => dispatch(updateInputValue(2, event.target.value))
  };
}

const items = [{
  title: 'A',
  items: [{
    text: 'Apple'
  }, {
    text: 'Apricot'
  }]
}, {
  title: 'B',
  items: [{
    text: 'Banana'
  }]
}, {
  title: 'C',
  items: [{
    text: 'Cherry'
  }]
}];

function shouldRenderSection(section) {
  return section.items.length > 0;
}

function renderSectionTitle(section) {
  return (
    <strong>{section.title}</strong>
  );
}

function getSectionItems(section){
  return section.items;
}

function renderItem(item) {
  return (
    <span>{item.text}</span>
  );
}

class Example2 extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };

  render() {
    const { value, onChange } = this.props;
    const inputProps = { value, onChange };

    return (
      <Autowhatever id="2"
                    isMultiSection={true}
                    isOpen={true}
                    items={items}
                    shouldRenderSection={shouldRenderSection}
                    renderSectionTitle={renderSectionTitle}
                    getSectionItems={getSectionItems}
                    renderItem={renderItem}
                    inputProps={inputProps}
                    focusedSectionIndex={0}
                    focusedItemIndex={1}
                    theme={theme} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Example2);
