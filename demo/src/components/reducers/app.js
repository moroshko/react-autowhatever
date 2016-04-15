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
  '6s': {
    value: 'Up/Down (Scrolling)',
    focusedSectionIndex: null,
    focusedItemIndex: null
  },
  7: {
    value: 'Multi section - Up/Down/Enter',
    focusedSectionIndex: null,
    focusedItemIndex: null
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_INPUT_VALUE:
      return {
        ...state,
        [action.exampleNumber]: {
          ...state[action.exampleNumber],
          value: action.value
        }
      };

    case UPDATE_FOCUSED_ITEM:
      return {
        ...state,
        [action.exampleNumber]: {
          ...state[action.exampleNumber],
          focusedSectionIndex: action.focusedSectionIndex,
          focusedItemIndex: action.focusedItemIndex
        }
      };

    default:
      return state;
  }
}
