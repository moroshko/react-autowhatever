import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Item from './Item';
import compareObjects from './compareObjects';

const DefaultList = ({ items, renderItem, role, className }) => (
  <ul role={role} className={className}>
    {items.map(renderItem)}
  </ul>
);

export default class ItemsList extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    itemProps: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    renderItem: PropTypes.func.isRequired,
    renderItemData: PropTypes.object.isRequired,
    sectionIndex: PropTypes.number,
    highlightedItemIndex: PropTypes.number,
    onHighlightedItemChange: PropTypes.func.isRequired,
    getItemId: PropTypes.func.isRequired,
    theme: PropTypes.func.isRequired,
    keyPrefix: PropTypes.string.isRequired,
    renderItemsList: PropTypes.func
  }

  static defaultProps = {
    sectionIndex: null,
    renderItemsList: DefaultList
  }

  shouldComponentUpdate(nextProps) {
    return compareObjects(nextProps, this.props, ['itemProps']);
  }

  storeHighlightedItemReference = highlightedItem => {
    this.props.onHighlightedItemChange(
      highlightedItem === null ? null : highlightedItem.item
    );
  }

  getSectionPrefix = () => {
    const {
        sectionIndex,
        keyPrefix
      } = this.props;

    return sectionIndex === null ? keyPrefix : `${keyPrefix}section-${sectionIndex}-`;
  }

  renderItem = (item, itemIndex) => {
    const {
      itemProps,
      renderItem,
      renderItemData,
      sectionIndex,
      highlightedItemIndex,
      getItemId,
      theme
    } = this.props;
    const sectionPrefix = this.getSectionPrefix();
    const isItemPropsFunction = typeof itemProps === 'function';
    const isFirst = itemIndex === 0;
    const isHighlighted = itemIndex === highlightedItemIndex;
    const itemKey = `${sectionPrefix}item-${itemIndex}`;
    const itemPropsObj = isItemPropsFunction
      ? itemProps({ sectionIndex, itemIndex })
      : itemProps;
    const allItemProps = {
      id: getItemId(sectionIndex, itemIndex),
      'aria-selected': isHighlighted,
      ...theme(
        itemKey,
        'item',
        isFirst && 'itemFirst',
        isHighlighted && 'itemHighlighted'
      ),
      ...itemPropsObj
    };

    if (isHighlighted) {
      allItemProps.ref = this.storeHighlightedItemReference;
    }

    // `key` is provided by theme()
    return (
      <Item
        {...allItemProps}
        sectionIndex={sectionIndex}
        isHighlighted={isHighlighted}
        itemIndex={itemIndex}
        item={item}
        renderItem={renderItem}
        renderItemData={renderItemData}
      />
    );
  }

  render() {
    const {
      items,
      theme,
      renderItemsList: ListComponent
    } = this.props;
    const sectionPrefix = this.getSectionPrefix();

    return (
      <ListComponent
        items={items}
        renderItem={this.renderItem}
        role="listbox"
        {...theme(`${sectionPrefix}items-list`, 'itemsList')}
      />
    );
  }
}
