const UPDATE_INPUT_VALUE = 'UPDATE_INPUT_VALUE';
const HIDE_ITEMS = 'HIDE_ITEMS';
const UPDATE_FOCUSED_ITEM = 'UPDATE_FOCUSED_ITEM';

const initialState = {
  0: {
    value: 'Items not displayed'
  },
  1: {
    value: 'No focused item'
  },
  2: {
    value: 'Focused item'
  },
  3: {
    value: 'Multi section - No focused item'
  },
  4: {
    value: 'Multi section - focused item'
  },
  5: {
    value: 'Hover and click items',
    focusedSectionIndex: null,
    focusedItemIndex: null
  },
  6: {
    value: 'Up/Down/Tab',
    focusedSectionIndex: null,
    focusedItemIndex: null
  },
  7: {
    value: 'Up/Down/Tab (with scrollbar)',
    focusedSectionIndex: null,
    focusedItemIndex: 7
  },
  8: {
    value: 'Multi section - Up/Down/Tab/Enter',
    focusedSectionIndex: null,
    focusedItemIndex: null
  },
  9: {
    value: '',
    items: [],
    focusedSectionIndex: null,
    focusedItemIndex: null
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

export function updateFocusedItem(exampleNumber, focusedSectionIndex, focusedItemIndex) {
  return {
    type: UPDATE_FOCUSED_ITEM,
    exampleNumber,
    focusedSectionIndex,
    focusedItemIndex
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
          focusedSectionIndex: null,
          focusedItemIndex: null
        }
      };
    }

    case UPDATE_FOCUSED_ITEM: {
      const { exampleNumber, focusedSectionIndex, focusedItemIndex } = action;

      return {
        ...state,
        [exampleNumber]: {
          ...state[exampleNumber],
          focusedSectionIndex: focusedSectionIndex,
          focusedItemIndex: focusedItemIndex
        }
      };
    }

    default:
      return state;
  }
}
