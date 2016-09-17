import theme from '../theme.less';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateInputValue } from '../../redux';
import Autowhatever from 'Autowhatever';
import SourceCodeLink from 'SourceCodeLink/SourceCodeLink';

const exampleId = '3';
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

function getSectionItems(section) {
  return section.items;
}

function renderItem(item) {
  return (
    <span>{item.text}</span>
  );
}

function Example(props) {
  const { value, onChange } = props;
  const inputProps = { value, onChange };

  return (
    <div>
      <Autowhatever
        id={exampleId}
        multiSection={true}
        items={items}
        shouldRenderSection={shouldRenderSection}
        renderSectionTitle={renderSectionTitle}
        getSectionItems={getSectionItems}
        renderItem={renderItem}
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
