import React, { Component, PropTypes } from 'react';
import themeable from 'react-themeable';

export default class Autowhatever extends Component {
  static propTypes = {
    id: PropTypes.string,               // Used in aria-* attributes. If multiple Autowhatever's are rendered on a page, they must have unique ids.
    isOpen: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired,
    renderItem: PropTypes.func.isRequired,
    renderSection: PropTypes.func,
    inputProps: PropTypes.object,
    focusedSectionIndex: PropTypes.number,
    focusedItemIndex: PropTypes.number,
    theme: PropTypes.object
  };

  static defaultProps = {
    id: '1',
    renderTitle: title => title.text,
    inputProps: {},
    focusedSectionIndex: null,
    focusedItemIndex: null,
    theme: {
      container: 'react-autowhatever__container',
      input: 'react-autowhatever__input',
      'items-container': 'react-autowhatever__items-container',
      item: 'react-autowhatever__item',
      'item--focused': 'react-autowhatever__item--focused',
      'section-container': 'react-autowhatever__section-container',
      'section-title': 'react-autowhatever__section-title',
      'section-items-container': 'react-autowhatever__section-items-container'
    }
  };

  getItemId(sectionIndex, itemIndex) {
    if (itemIndex === null) {
      return null;
    }

    const { id } = this.props;
    const section = (sectionIndex === null ? '' : `section-${sectionIndex}`);

    return `react-autowhatever-${id}-${section}-item-${itemIndex}`;
  }

  getItemsContainerId() {
    const { id } = this.props;

    return `react-whatever-${id}`;
  }

  renderItemsList(theme, items, sectionIndex) {
    const { renderItem, focusedSectionIndex, focusedItemIndex } = this.props;

    return items.map((item, itemIndex) => {
      return (
        <li id={this.getItemId(sectionIndex, itemIndex)}
            role="option"
            {...theme(itemIndex, 'item', sectionIndex === focusedSectionIndex &&
                                         itemIndex === focusedItemIndex &&
                                         'item--focused')}>
          {renderItem(item)}
        </li>
      );
    });
  }

  renderSections(theme) {
    const { id, items, renderTitle } = this.props;

    return (
      <div id={this.getItemsContainerId()}
           role="listbox"
           {...theme('items-container', 'items-container')}>
        {
          items.map((section, sectionIndex) => {
            return section.items.length === 0 ? null : (
              <div key={sectionIndex}
                   {...theme(sectionIndex, 'section-container')}>
                <div {...theme('section-title', 'section-title')}>
                  {section.title && renderTitle(section.title)}
                </div>
                <ul {...theme('section-items-container', 'section-items-container')}>
                  {this.renderItemsList(theme, section.items, sectionIndex)}
                </ul>
              </div>
            );
          })
        }
      </div>
    );
  }

  renderItems(theme) {
    const { id, items } = this.props;

    return (
      <ul id={this.getItemsContainerId()}
          role="listbox"
          {...theme('items-container', 'items-container')}>
        {this.renderItemsList(theme, items, null)}
      </ul>
    );
  }

  render() {
    const { id, isOpen, items, focusedSectionIndex, focusedItemIndex } = this.props;
    const isMultipleSections = items.length > 0 && typeof items[0].items !== 'undefined';
    const ariaActivedescendant = this.getItemId(focusedSectionIndex, focusedItemIndex);
    const theme = themeable(this.props.theme);
    const inputProps = {
      type: 'text',
      value: '',
      autoComplete: 'off',
      role: 'combobox',
      'aria-autocomplete': 'list',
      'aria-owns': this.getItemsContainerId(),
      'aria-expanded': isOpen,
      'aria-activedescendant': ariaActivedescendant,
      ...this.props.inputProps,
      ...theme('input', 'input')
    };

    return (
      <div {...theme('container', 'container')}>
        <input {...inputProps} />
        {isOpen && isMultipleSections && this.renderSections(theme)}
        {isOpen && !isMultipleSections && this.renderItems(theme)}
      </div>
    );
  }
}
