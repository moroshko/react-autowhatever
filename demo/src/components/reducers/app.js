import { UPDATE_INPUT_VALUE, UPDATE_FOCUSED_ITEM } from 'actions/app';

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
    value: 'Up/Down',
    focusedSectionIndex: null,
    focusedItemIndex: null
  },
  7: {
    value: 'Up/Down (with scrollbar)',
    focusedSectionIndex: null,
    focusedItemIndex: 7
  },
  8: {
    value: 'Multi section - Up/Down/Enter',
    focusedSectionIndex: null,
    focusedItemIndex: null
  },
  9: {
    value: '',
    items: []
  },
  10: {
    value: 'Custom Input'
  }
};

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
