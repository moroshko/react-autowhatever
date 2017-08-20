const UPDATE_INPUT_VALUE = 'UPDATE_INPUT_VALUE';
const HIDE_ITEMS = 'HIDE_ITEMS';
const UPDATE_HIGHLIGHTED_ITEM = 'UPDATE_HIGHLIGHTED_ITEM';

const initialState = {
  0: {
    value: 'Items not displayed'
  },
  1: {
    value: 'No highlighted item'
  },
  2: {
    value: 'Highlighted item'
  },
  3: {
    value: 'Multi section - No highlighted item'
  },
  4: {
    value: 'Multi section - highlighted item'
  },
  5: {
    value: 'Hover and click items',
    highlightedSectionIndex: null,
    highlightedItemIndex: null
  },
  6: {
    value: 'Up/Down',
    highlightedSectionIndex: null,
    highlightedItemIndex: null
  },
  7: {
    value: 'Up/Down (with scrollbar)',
    highlightedSectionIndex: null,
    highlightedItemIndex: 7
  },
  8: {
    value: 'Multi section - Up/Down/Enter',
    highlightedSectionIndex: null,
    highlightedItemIndex: null
  },
  9: {
    value: '',
    items: [],
    highlightedSectionIndex: null,
    highlightedItemIndex: null
  },
  10: {
    value: ''
  },
  11: {
    value: ''
  },
  12: {
    value: '',
    highlightedSectionIndex: null,
    highlightedItemIndex: null
  }
};

export function updateInputValue(exampleNumber, value, items) {
  return {
    type: UPDATE_INPUT_VALUE,
    exampleNumber,
    value,
    items
  };
}

export function hideItems(exampleNumber) {
  return {
    type: HIDE_ITEMS,
    exampleNumber
  };
}

export function updateHighlightedItem(exampleNumber, highlightedSectionIndex, highlightedItemIndex) {
  return {
    type: UPDATE_HIGHLIGHTED_ITEM,
    exampleNumber,
    highlightedSectionIndex,
    highlightedItemIndex
  };
}

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_INPUT_VALUE: {
      const { exampleNumber, value, items } = action;

      return {
        ...state,
        [exampleNumber]: {
          ...state[exampleNumber],
          value,
          ...(items ? { items } : {})
        }
      };
    }

    case HIDE_ITEMS: {
      const { exampleNumber } = action;

      return {
        ...state,
        [exampleNumber]: {
          ...state[exampleNumber],
          items: [],
          highlightedSectionIndex: null,
          highlightedItemIndex: null
        }
      };
    }

    case UPDATE_HIGHLIGHTED_ITEM: {
      const { exampleNumber, highlightedSectionIndex, highlightedItemIndex } = action;

      return {
        ...state,
        [exampleNumber]: {
          ...state[exampleNumber],
          highlightedSectionIndex: highlightedSectionIndex,
          highlightedItemIndex: highlightedItemIndex
        }
      };
    }

    default:
      return state;
  }
}
