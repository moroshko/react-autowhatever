import React, { Component, PropTypes } from 'react';

export default class Autowhatever extends Component {
  static propTypes = {
    id: PropTypes.string,               // Used in aria-* attributes. If multiple Autowhatever's are rendered on a page, they must have unique ids.
    isOpen: PropTypes.bool.isRequired,
    items: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired
        })
      ),
      PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.shape({
            text: PropTypes.string.isRequired
          }),
          items: PropTypes.arrayOf(
            PropTypes.shape({
              text: PropTypes.string.isRequired
            })
          )
        })
      )
    ]).isRequired,
    renderItem: PropTypes.func.isRequired,
    renderTitle: PropTypes.func,
    inputProps: PropTypes.object,
    focusedSectionIndex: PropTypes.number,
    focusedItemIndex: PropTypes.number
  };

  static defaultProps = {
    id: '1',
    renderTitle: title => title.text,
    inputProps: {},
    focusedSectionIndex: null,
    focusedItemIndex: null
  };

  getItemId(sectionIndex, itemIndex) {
    if (itemIndex === null) {
      return null;
    }

    const { id } = this.props;
    const itemKey = this.getItemKey(sectionIndex, itemIndex);

    return `react-autowhatever-${id}-${itemKey}`;
  }

  getItemKey(sectionIndex, itemIndex) {
    const section = (sectionIndex === null ? '' : `section-${sectionIndex}`);

    return `${section}-item-${itemIndex}`;
  }

  getItemsContainerId() {
    const { id } = this.props;

    return `react-whatever-${id}`;
  }

  renderItemsList(items, sectionIndex) {
    const { renderItem } = this.props;

    return items.map((item, itemIndex) => {
      const itemKey = this.getItemKey(sectionIndex, itemIndex);

      return (
        <li id={this.getItemId(sectionIndex, itemIndex)}
            role="option"
            key={itemKey}>
          {renderItem(item)}
        </li>
      );
    });
  }

  renderSections() {
    const { id, items, renderTitle } = this.props;

    return (
      <div id={this.getItemsContainerId()}
           role="listbox">
        {
          items.map((section, sectionIndex) => {
            return section.items.length === 0 ? null : (
              <div key={sectionIndex}>
                {section.title && renderTitle(section.title)}
                <ul>
                  {this.renderItemsList(section.items, sectionIndex)}
                </ul>
              </div>
            );
          })
        }
      </div>
    );
  }

  renderItems() {
    const { id, items } = this.props;

    return (
      <ul id={this.getItemsContainerId()}
          role="listbox">
        {this.renderItemsList(items, null)}
      </ul>
    );
  }

  render() {
    const { id, isOpen, items, focusedSectionIndex, focusedItemIndex } = this.props;
    const isMultipleSections = items.length > 0 && typeof items[0].items !== 'undefined';
    const ariaActivedescendant = this.getItemId(focusedSectionIndex, focusedItemIndex);
    const inputProps = {
      type: 'text',
      value: '',
      autoComplete: 'off',
      role: 'combobox',
      'aria-autocomplete': 'list',
      'aria-owns': this.getItemsContainerId(),
      'aria-expanded': isOpen,
      'aria-activedescendant': ariaActivedescendant,
      ...this.props.inputProps
    };

    return (
      <div>
        <input {...inputProps} />
        {isOpen && isMultipleSections && this.renderSections()}
        {isOpen && !isMultipleSections && this.renderItems()}
      </div>
    );
  }
}
