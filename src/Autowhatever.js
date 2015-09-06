import React, { Component, PropTypes } from 'react';
import createSectionIterator from 'section-iterator';
import themeable from 'react-themeable';

export default class Autowhatever extends Component {
  static propTypes = {
    id: PropTypes.string,                  // Used in aria-* attributes. If multiple Autowhatever's are rendered on a page, they must have unique ids.
    multiSection: PropTypes.bool,          // Indicates whether a multi section layout should be rendered.
    items: PropTypes.array.isRequired,     // Array of items or sections to render.
    renderItem: PropTypes.func,            // This function renders a single item.
    shouldRenderSection: PropTypes.func,   // This function gets a section and returns whether it should be rendered, or not.
    renderSectionTitle: PropTypes.func,    // This function gets a section and renders its title.
    getSectionItems: PropTypes.func,       // This function gets a section and returns its items, which will be passed into `renderItem` for rendering.
    inputProps: PropTypes.object,          // Arbitrary input props
    itemProps: PropTypes.object,           // Arbitrary item props
    focusedSectionIndex: PropTypes.number, // Section index of the focused item
    focusedItemIndex: PropTypes.number,    // Focused item index (within a section)
    theme: PropTypes.object                // Styles. See: https://github.com/markdalgleish/react-themeable
  };

  static defaultProps = {
    id: '1',
    multiSection: false,
    shouldRenderSection: () => true,
    renderItem: () => {
      throw new Error('`renderItem` must be provided');
    },
    renderSectionTitle: () => {
      throw new Error('`renderSectionTitle` must be provided');
    },
    getSectionItems: () => {
      throw new Error('`getSectionItems` must be provided');
    },
    inputProps: {},
    itemProps: {},
    focusedSectionIndex: null,
    focusedItemIndex: null,
    theme: {
      container: 'react-autowhatever__container',
      input: 'react-autowhatever__input',
      'input--open': 'react-autowhatever__input--open',
      'items-container': 'react-autowhatever__items-container',
      item: 'react-autowhatever__item',
      'item--focused': 'react-autowhatever__item--focused',
      'section-container': 'react-autowhatever__section-container',
      'section-title': 'react-autowhatever__section-title',
      'section-items-container': 'react-autowhatever__section-items-container'
    }
  };

  constructor(props) {
    super(props);

    this.onKeyDown = ::this.onKeyDown;
  }

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
    const { onMouseEnter, onMouseLeave, onMouseDown } = this.props.itemProps;

    return items.map((item, itemIndex) => {
      const onMouseEnterFn = onMouseEnter ?
        event => onMouseEnter(event, { sectionIndex, itemIndex }) :
        () => {};
      const onMouseLeaveFn = onMouseLeave ?
        event => onMouseLeave(event, { sectionIndex, itemIndex }) :
        () => {};
      const onMouseDownFn = onMouseDown ?
        event => onMouseDown(event, { sectionIndex, itemIndex }) :
        () => {};
      const itemProps = {
        id: this.getItemId(sectionIndex, itemIndex),
        role: 'option',
        ...this.props.itemProps,
        onMouseEnter: onMouseEnterFn,
        onMouseLeave: onMouseLeaveFn,
        onMouseDown: onMouseDownFn,
        ...theme(itemIndex, 'item', sectionIndex === focusedSectionIndex &&
                                    itemIndex === focusedItemIndex &&
                                    'item--focused')
      };

      return (
        <li {...itemProps}>
          {renderItem(item)}
        </li>
      );
    });
  }

  renderSections(theme) {
    const { id, items, shouldRenderSection,
            renderSectionTitle, getSectionItems } = this.props;

    return (
      <div id={this.getItemsContainerId()}
           role="listbox"
           {...theme('items-container', 'items-container')}>
        {
          items.map((section, sectionIndex) => {
            return shouldRenderSection(section) && (
              <div key={sectionIndex}
                   {...theme(sectionIndex, 'section-container')}>
                <div {...theme('section-title', 'section-title')}>
                  {renderSectionTitle(section)}
                </div>
                <ul {...theme('section-items-container', 'section-items-container')}>
                  {this.renderItemsList(theme, getSectionItems(section), sectionIndex)}
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

  onKeyDown(event) {
    const { inputProps, focusedSectionIndex, focusedItemIndex } = this.props;
    const { onKeyDown } = inputProps;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        const { multiSection, items, getSectionItems } = this.props;
        const sectionIterator = createSectionIterator({
          multiSection,
          data: multiSection ?
            items.map(section => getSectionItems(section).length) :
            items.length
        });
        const nextPrev = (event.key === 'ArrowDown' ? 'next' : 'prev');
        const [newFocusedSectionIndex, newFocusedItemIndex] =
          sectionIterator[nextPrev]([focusedSectionIndex, focusedItemIndex]);

        onKeyDown(event, { newFocusedSectionIndex, newFocusedItemIndex });
        break;

      default:
        onKeyDown(event, { focusedSectionIndex, focusedItemIndex });
    }
  }

  render() {
    const { id, multiSection, items,
            focusedSectionIndex, focusedItemIndex } = this.props;
    const isOpen = (items.length > 0);
    const ariaActivedescendant = this.getItemId(focusedSectionIndex, focusedItemIndex);
    const theme = themeable(this.props.theme);
    const inputProps = {
      type: 'text',
      value: '',
      autoComplete: 'off',
      role: 'combobox',
      ref: 'input',
      'aria-autocomplete': 'list',
      'aria-owns': this.getItemsContainerId(),
      'aria-expanded': isOpen,
      'aria-activedescendant': ariaActivedescendant,
      ...this.props.inputProps,
      onKeyDown: this.props.inputProps.onKeyDown && this.onKeyDown,
      ...theme('input', 'input', isOpen && 'input--open')
    };

    return (
      <div {...theme('container', 'container')}>
        <input {...inputProps} />
        {isOpen && multiSection && this.renderSections(theme)}
        {isOpen && !multiSection && this.renderItems(theme)}
      </div>
    );
  }
}
