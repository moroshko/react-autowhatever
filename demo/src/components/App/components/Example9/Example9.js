import theme from '../theme.less';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import highlight  from 'autosuggest-highlight';
import { updateInputValue } from 'actions/app';
import Autowhatever from 'Autowhatever';
import SourceCodeLink from 'SourceCodeLink/SourceCodeLink';
import countries from './countries';
import { escapeRegexCharacters } from '../../utils';

const exampleId = '9';
const file = `demo/src/components/App/components/Example${exampleId}/Example${exampleId}.js`;

function getMatchingCountries(value) {
  const escapedValue = escapeRegexCharacters(value.trim());

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return countries.filter(country => regex.test(country.name));
}

function mapStateToProps(state) {
  return {
    value: state[exampleId].value,
    items: state[exampleId].items
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChange: event => {
      const newValue = event.target.value;
      const newItems = getMatchingCountries(newValue);

      dispatch(updateInputValue(exampleId, newValue, newItems));
    }
  };
}

function renderItem(country, { value }) {
  const matches = highlight.match(country.name, value.trim());
  const parts = highlight.parse(country.name, matches);

  return (
    <span>
      {
        parts.map((part, index) => {
          const className = part.highlight ? theme.highlight : null;

          return (
            <span className={className} key={index}>{part.text}</span>
          );
        })
      }
    </span>
  );
}

function Example(props) {
  const { value, items, onChange } = props;
  const inputProps = {
    placeholder: 'Type to search a country',
    value,
    onChange
  };

  return (
    <div>
      <Autowhatever
        id={exampleId}
        items={items}
        renderItem={renderItem}
        renderItemData={{ value }}
        inputProps={inputProps}
        theme={theme} />
      <SourceCodeLink file={file} />
    </div>
  );
}

Example.propTypes = {
  value: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Example);
