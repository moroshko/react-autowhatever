import React, { Component, PropTypes } from 'react';
import createSectionIterator from 'section-iterator';
import themeable from 'react-themeable';

function noop() {}

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
    itemProps: PropTypes.oneOfType([       // Arbitrary item props
      PropTypes.object,
      PropTypes.func
    ]),
    focusedSectionIndex: PropTypes.number, // Section index of the focused item
    focusedItemIndex: PropTypes.number,    // Focused item index (within a section)
    element: PropTypes.string,             // Tag to render input field
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
    element: 'input',
    theme: {
      container: 'react-autowhatever__container',
      containerOpen: 'react-autowhatever__container--open',
      input: 'react-autowhatever__input',
      itemsContainer: 'react-autowhatever__items-container',
      item: 'react-autowhatever__item',
      itemFocused: 'react-autowhatever__item--focused',
      sectionContainer: 'react-autowhatever__section-container',
      sectionTitle: 'react-autowhatever__section-title',
      sectionItemsContainer: 'react-autowhatever__section-items-container'
    }
  };

  constructor(props) {
    super(props);

    this.onKeyDown = this.onKeyDown.bind(this);
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
    const isItemPropsFunction = (typeof this.props.itemProps === 'function');

    return items.map((item, itemIndex) => {
      const itemPropsObj = isItemPropsFunction
        ? this.props.itemProps({ sectionIndex, itemIndex })
        : this.props.itemProps;
      const { onMouseEnter, onMouseLeave, onMouseDown, onClick } = itemPropsObj;

      const onMouseEnterFn = onMouseEnter ?
        event => onMouseEnter(event, { sectionIndex, itemIndex }) :
        noop;
      const onMouseLeaveFn = onMouseLeave ?
        event => onMouseLeave(event, { sectionIndex, itemIndex }) :
        noop;
      const onMouseDownFn = onMouseDown ?
        event => onMouseDown(event, { sectionIndex, itemIndex }) :
        noop;
      const onClickFn = onClick ?
        event => onClick(event, { sectionIndex, itemIndex }) :
        noop;
      const itemProps = {
        id: this.getItemId(sectionIndex, itemIndex),
        role: 'option',
        ...theme(itemIndex, 'item', sectionIndex === focusedSectionIndex &&
                                    itemIndex === focusedItemIndex &&
                                    'itemFocused'),
        ...itemPropsObj,
        onMouseEnter: onMouseEnterFn,
        onMouseLeave: onMouseLeaveFn,
        onMouseDown: onMouseDownFn,
        onClick: onClickFn
      };

      return (
        <li {...itemProps}>
          {renderItem(item)}
        </li>
      );
    });
  }

  renderSections(theme) {
    const { items, getSectionItems } = this.props;
    const sectionItemsArray = items.map(section => getSectionItems(section));
    const noItemsExist = sectionItemsArray.every(sectionItems => sectionItems.length === 0);

    if (noItemsExist) {
      return null;
    }

    const { shouldRenderSection, renderSectionTitle } = this.props;

    return (
      <div id={this.getItemsContainerId()}
           role="listbox"
           {...theme('itemsContainer', 'itemsContainer')}>
        {
          items.map((section, sectionIndex) => {
            if (!shouldRenderSection(section)) {
              return null;
            }

            const sectionTitle = renderSectionTitle(section);

            return (
              <div key={sectionIndex}
                   {...theme(sectionIndex, 'sectionContainer')}>
                {
                  sectionTitle &&
                    <div {...theme('sectionTitle', 'sectionTitle')}>
                      {sectionTitle}
                    </div>
                }
                <ul {...theme('sectionItemsContainer', 'sectionItemsContainer')}>
                  {this.renderItemsList(theme, sectionItemsArray[sectionIndex], sectionIndex)}
                </ul>
              </div>
            );
          })
        }
      </div>
    );
  }

  renderItems(theme) {
    const { items } = this.props;

    if (items.length === 0) {
      return null;
    }

    return (
      <ul id={this.getItemsContainerId()}
          role="listbox"
          {...theme('itemsContainer', 'itemsContainer')}>
        {this.renderItemsList(theme, items, null)}
      </ul>
    );
  }

  onKeyDown(event) {
    const { inputProps, focusedSectionIndex, focusedItemIndex } = this.props;
    const { onKeyDown: onKeyDownFn } = inputProps; // Babel is throwing:
                                                   //   "onKeyDown" is read-only
                                                   // on:
                                                   //   const { onKeyDown } = inputProps;

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

        onKeyDownFn(event, { newFocusedSectionIndex, newFocusedItemIndex });
        break;

      default:
        onKeyDownFn(event, { focusedSectionIndex, focusedItemIndex });
    }
  }

  render() {
    const { multiSection, focusedSectionIndex, focusedItemIndex } = this.props;
    const theme = themeable(this.props.theme);
    const renderedItems = multiSection ? this.renderSections(theme) : this.renderItems(theme);
    const isOpen = (renderedItems !== null);
    const ariaActivedescendant = this.getItemId(focusedSectionIndex, focusedItemIndex);
    const Tag = this.props.element;
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
      ...theme('input', 'input'),
      ...this.props.inputProps,
      onKeyDown: this.props.inputProps.onKeyDown && this.onKeyDown
    };

    return (
      <div {...theme('container', 'container', isOpen && 'containerOpen')}>
        <Tag {...inputProps} />
        {renderedItems}
      </div>
    );
  }
}
