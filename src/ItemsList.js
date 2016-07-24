import React, { Component, PropTypes } from 'react';
import Item from './Item';

export default class ItemsList extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    itemProps: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.func
    ]),
    renderItem: PropTypes.func.isRequired,
    sectionIndex: PropTypes.number,
    focusedItemIndex: PropTypes.number,
    getItemId: PropTypes.func.isRequired,
    theme: PropTypes.func.isRequired,
    keyPrefix: PropTypes.string.isRequired
  };

  static defaultProps = {
    sectionIndex: null
  };

  constructor() {
    super();

    this.storeItemsContainerReference = this.storeItemsContainerReference.bind(this);
    this.storeFocusedItemReference = this.storeFocusedItemReference.bind(this);
  }

  componentDidMount() {
    this.ensureFocusedSuggestionIsVisible();
  }

  componentDidUpdate() {
    this.ensureFocusedSuggestionIsVisible();
  }

  storeItemsContainerReference(itemsContainer) {
    if (itemsContainer !== null) {
      this.itemsContainer = itemsContainer;
    }
  }

  storeFocusedItemReference(focusedItem) {
    if (focusedItem !== null) {
      this.focusedItem = focusedItem.item;
    }
  }

  ensureFocusedSuggestionIsVisible() {
    if (!this.focusedItem) {
      return;
    }

    const { focusedItem, itemsContainer } = this;
    const itemOffsetRelativeToContainer =
      focusedItem.offsetParent === itemsContainer
        ? focusedItem.offsetTop
        : focusedItem.offsetTop - itemsContainer.offsetTop;

    let { scrollTop } = itemsContainer; // Top of the visible area

    if (itemOffsetRelativeToContainer < scrollTop) {
      // Item is off the top of the visible area
      scrollTop = itemOffsetRelativeToContainer;
    } else if (itemOffsetRelativeToContainer + focusedItem.offsetHeight > scrollTop + itemsContainer.offsetHeight) {
      // Item is off the bottom of the visible area
      scrollTop = itemOffsetRelativeToContainer + focusedItem.offsetHeight - itemsContainer.offsetHeight;
    }

    if (scrollTop !== itemsContainer.scrollTop) {
      itemsContainer.scrollTop = scrollTop;
    }
  }

  render() {
    const {
      id, items, itemProps, renderItem, sectionIndex,
      focusedItemIndex, getItemId, theme, keyPrefix
    } = this.props;
    const sectionPrefix = (sectionIndex === null ? keyPrefix : `${keyPrefix}section-${sectionIndex}-`);
    const itemsContainerClass = (sectionIndex === null ? 'itemsContainer' : 'sectionItemsContainer');
    const isItemPropsFunction = (typeof itemProps === 'function');

    return (
      <ul
        id={id}
        ref={this.storeItemsContainerReference}
        role="listbox"
        {...theme(`${sectionPrefix}items-container`, itemsContainerClass)}>
        {
          items.map((item, itemIndex) => {
            const isFocused = (itemIndex === focusedItemIndex);
            const itemKey = `${sectionPrefix}item-${itemIndex}`;
            const itemPropsObj = isItemPropsFunction ? itemProps({ sectionIndex, itemIndex }) : itemProps;
            const allItemProps = {
              id: getItemId(sectionIndex, itemIndex),
              ...theme(itemKey, 'item', isFocused && 'itemFocused'),
              ...itemPropsObj
            };

            if (isFocused) {
              allItemProps.ref = this.storeFocusedItemReference;
            }

            // `key` is provided by theme()
            /* eslint-disable react/jsx-key */
            return (
              <Item
                {...allItemProps}
                sectionIndex={sectionIndex}
                itemIndex={itemIndex}
                item={item}
                renderItem={renderItem} />
            );
            /* eslint-enable react/jsx-key */
          })
        }
      </ul>
    );
  }
}
