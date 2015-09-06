export const UPDATE_INPUT_VALUE = 'UPDATE_INPUT_VALUE';
export const UPDATE_FOCUSED_ITEM = 'UPDATE_FOCUSED_ITEM';

export function updateInputValue(exampleNumber, value) {
  return {
    type: UPDATE_INPUT_VALUE,
    exampleNumber,
    value
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
