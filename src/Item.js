import React, { Component, PropTypes } from 'react';

export default class Item extends Component {
  static propTypes = {
    sectionIndex: PropTypes.number,
    itemIndex: PropTypes.number.isRequired,
    item: PropTypes.any.isRequired,
    renderItem: PropTypes.func.isRequired,
    itemProps: PropTypes.object.isRequired
  };

  constructor() {
    super();

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onMouseEnter(event) {
    const { sectionIndex, itemIndex, itemProps } = this.props;

    itemProps.onMouseEnter(event, { sectionIndex, itemIndex });
  }

  onMouseLeave(event) {
    const { sectionIndex, itemIndex, itemProps } = this.props;

    itemProps.onMouseLeave(event, { sectionIndex, itemIndex });
  }

  onMouseDown(event) {
    const { sectionIndex, itemIndex, itemProps } = this.props;

    itemProps.onMouseDown(event, { sectionIndex, itemIndex });
  }

  onClick(event) {
    const { sectionIndex, itemIndex, itemProps } = this.props;

    itemProps.onClick(event, { sectionIndex, itemIndex });
  }

  render() {
    const { item, renderItem, itemProps, ...restProps } = this.props;

    delete restProps.sectionIndex;
    delete restProps.itemIndex;

    const liProps = { ...itemProps };

    if (typeof itemProps.onMouseEnter === 'function') {
      liProps.onMouseEnter = this.onMouseEnter;
    }

    if (typeof itemProps.onMouseLeave === 'function') {
      liProps.onMouseLeave = this.onMouseLeave;
    }

    if (typeof itemProps.onMouseDown === 'function') {
      liProps.onMouseDown = this.onMouseDown;
    }

    if (typeof itemProps.onClick === 'function') {
      liProps.onClick = this.onClick;
    }

    return (
      <li role="option" {...restProps} {...liProps}>
        {renderItem(item)}
      </li>
    );
  }
}
