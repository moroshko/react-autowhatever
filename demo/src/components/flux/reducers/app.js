import { UPDATE_INPUT_VALUE } from 'flux/constants/actionTypes/app';

const initialState = {
  1: {
    value: 'Example 1'
  },
  2: {
    value: 'Example 2'
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_INPUT_VALUE:
      return {
        ...state,
        [action.exampleNumber]: {
          value: action.value
        }
      };

    default:
      return state;
  }
}
