import theme from '../theme.less';

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import highlight  from 'autosuggest-highlight';
import { updateInputValue, hideItems, updateFocusedItem } from '../../redux';
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

function findItemElement(startNode) {
  let node = startNode;

  do {
    if (node.getAttribute('data-item-index') !== null) {
      return node;
    }

    node = node.parentNode;
  } while (node !== null);

  console.error('Clicked item:', startNode); // eslint-disable-line no-console
  throw new Error('Couldn\'t find the clicked item element');
}

function mapStateToProps(state) {
  return {
    value: state[exampleId].value,
    focusedSectionIndex: state[exampleId].focusedSectionIndex,
    focusedItemIndex: state[exampleId].focusedItemIndex,
    items: state[exampleId].items
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChange: event => {
      const newValue = event.target.value;
      const newItems = getMatchingCountries(newValue);

      dispatch(updateInputValue(exampleId, newValue, newItems));
    },
    onFocus: () => {
      dispatch(updateInputValue(exampleId, ''));
    },
    onMouseEnter: (event, { sectionIndex, itemIndex }) => {
      dispatch(updateFocusedItem(exampleId, sectionIndex, itemIndex));
    },
    onMouseLeave: () => {
      dispatch(updateFocusedItem(exampleId, null, null));
    },
    onClick: clickedItem => {
      dispatch(updateInputValue(exampleId, clickedItem.name));
      dispatch(hideItems(exampleId));
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
  const {
    value, focusedSectionIndex, focusedItemIndex, items,
    onChange, onFocus, onMouseEnter, onMouseLeave, onClick
  } = props;
  const inputProps = {
    placeholder: 'Search and click countries',
    value,
    onChange,
    onFocus
  };
  const itemProps = ({ itemIndex }) => ({
    'data-item-index': itemIndex,
    onMouseEnter,
    onMouseLeave,
    onClick: event => {
      const clickedItem = findItemElement(event.target);
      const clickedItemIndex = clickedItem.getAttribute('data-item-index');

      onClick(items[clickedItemIndex]);
    }
  });

  return (
    <div>
      <Autowhatever
        id={exampleId}
        items={items}
        renderItem={renderItem}
        renderItemData={{ value }}
        inputProps={inputProps}
        focusedSectionIndex={focusedSectionIndex}
        focusedItemIndex={focusedItemIndex}
        itemProps={itemProps}
        theme={theme} />
      <SourceCodeLink file={file} />
    </div>
  );
}

Example.propTypes = {
  value: PropTypes.string.isRequired,
  focusedSectionIndex: PropTypes.number,
  focusedItemIndex: PropTypes.number,
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Example);
