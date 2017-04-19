import theme from '../theme.less';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { updateInputValue, hideItems, updateHighlightedItem } from '../../redux';
import Autowhatever from 'Autowhatever';
import SourceCodeLink from 'SourceCodeLink/SourceCodeLink';
import countries from './countries';
import { escapeRegexCharacters } from '../../utils';
import IsolatedScroll from 'react-isolated-scroll';

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
    highlightedSectionIndex: state[exampleId].highlightedSectionIndex,
    highlightedItemIndex: state[exampleId].highlightedItemIndex,
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
    onBlur: () => {
      dispatch(hideItems(exampleId));
    },
    onMouseEnter: (event, { sectionIndex, itemIndex }) => {
      dispatch(updateHighlightedItem(exampleId, sectionIndex, itemIndex));
    },
    onMouseLeave: () => {
      dispatch(updateHighlightedItem(exampleId, null, null));
    },
    onMouseDown: clickedItem => {
      dispatch(updateInputValue(exampleId, clickedItem.name));
    }
  };
}

function renderItemsContainer({ children, containerProps }) {
  const { ref, ...restContainerProps } = containerProps;
  const callRef = isolatedScroll => {
    if (isolatedScroll !== null) {
      ref(isolatedScroll.component);
    }
  };

  return (
    <IsolatedScroll ref={callRef} {...restContainerProps}>
      {children}
    </IsolatedScroll>
  );
}

function renderItem(country, { value }) {
  const matches = match(country.name, value.trim());
  const parts = parse(country.name, matches);

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
    value, highlightedSectionIndex, highlightedItemIndex, items,
    onChange, onFocus, onBlur, onMouseEnter, onMouseLeave, onMouseDown
  } = props;
  const inputProps = {
    placeholder: 'Search and click countries',
    value,
    onChange,
    onFocus,
    onBlur
  };
  const itemProps = ({ itemIndex }) => ({
    'data-item-index': itemIndex,
    onMouseEnter,
    onMouseLeave,
    onMouseDown: event => {
      const clickedItem = findItemElement(event.target);
      const clickedItemIndex = clickedItem.getAttribute('data-item-index');

      onMouseDown(items[clickedItemIndex]);
    }
  });

  return (
    <div>
      <Autowhatever
        id={exampleId}
        items={items}
        renderItemsContainer={renderItemsContainer}
        renderItem={renderItem}
        renderItemData={{ value }}
        inputProps={inputProps}
        highlightedSectionIndex={highlightedSectionIndex}
        highlightedItemIndex={highlightedItemIndex}
        itemProps={itemProps}
        theme={theme}
      />
      <SourceCodeLink file={file} />
    </div>
  );
}

Example.propTypes = {
  value: PropTypes.string.isRequired,
  highlightedSectionIndex: PropTypes.number,
  highlightedItemIndex: PropTypes.number,
  items: PropTypes.array.isRequired,

  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Example);
