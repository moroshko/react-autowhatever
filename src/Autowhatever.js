import React, { Component, PropTypes } from 'react';
import createSectionIterator from 'section-iterator';
import themeable from 'react-themeable';
import Item from './Item';

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
    this.storeInputReference = this.storeInputReference.bind(this);
    this.storeItemsContainerReference = this.storeItemsContainerReference.bind(this);
    this.storeFocusedItemReference = this.storeFocusedItemReference.bind(this);
  }

  componentDidMount() {
    this.ensureFocusedSuggestionIsVisible();
  }

  componentDidUpdate() {
    this.ensureFocusedSuggestionIsVisible();
  }

  storeInputReference(input) {
    if (input !== null) {
      this.input = input;
    }
  }

  storeItemsContainerReference(itemsContainer) {
    if (itemsContainer !== null) {
      this.itemsContainer = itemsContainer;
    }
  }

  storeFocusedItemReference(focusedItem) {
    if (focusedItem !== null) {
      this.focusedItem = focusedItem;
    }
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
    const { id, renderItem, focusedSectionIndex, focusedItemIndex, itemProps } = this.props;
    const isItemPropsFunction = (typeof itemProps === 'function');
    const sectionPrefix = (sectionIndex === null ? '' : `section-${sectionIndex}-`);

    return items.map((item, itemIndex) => {
      const isFocused = sectionIndex === focusedSectionIndex && itemIndex === focusedItemIndex;
      const itemKey = `react-autowhatever-${id}-${sectionPrefix}item-${itemIndex}`;
      const itemPropsObj = isItemPropsFunction ? itemProps({ sectionIndex, itemIndex }) : itemProps;
      const newItemProps = {
        id: this.getItemId(sectionIndex, itemIndex),
        ref: isFocused ? this.storeFocusedItemReference : null,
        ...theme(itemKey, 'item', isFocused && 'itemFocused'),
        ...itemPropsObj
      };

      return (
        <Item
          sectionIndex={sectionIndex}
          itemIndex={itemIndex}
          item={item}
          itemProps={newItemProps}
          renderItem={renderItem}
          key={itemKey} />
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

    const { id, shouldRenderSection, renderSectionTitle } = this.props;

    return (
      <div
        id={this.getItemsContainerId()}
        ref={this.storeItemsContainerReference}
        role="listbox"
        {...theme(`react-autowhatever-${id}-items-container`, 'itemsContainer')}>
        {
          items.map((section, sectionIndex) => {
            if (!shouldRenderSection(section)) {
              return null;
            }

            const sectionTitle = renderSectionTitle(section);

            // `key` is provided by theme()
            /* eslint-disable react/jsx-key */
            return (
              <div {...theme(`react-autowhatever-${id}-section-${sectionIndex}-container`, 'sectionContainer')}>
                {
                  sectionTitle &&
                    <div {...theme(`react-autowhatever-${id}-section-${sectionIndex}-title`, 'sectionTitle')}>
                      {sectionTitle}
                    </div>
                }
                <ul {...theme(`react-autowhatever-${id}-section-${sectionIndex}-items-container`, 'sectionItemsContainer')}>
                  {this.renderItemsList(theme, sectionItemsArray[sectionIndex], sectionIndex)}
                </ul>
              </div>
            );
            /* eslint-enable react/jsx-key */
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

    const id = this.props;

    return (
      <ul
        id={this.getItemsContainerId()}
        ref={this.storeItemsContainerReference}
        role="listbox"
        {...theme(`react-autowhatever-${id}-items-container`, 'itemsContainer')}>
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
      case 'ArrowUp': {
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
      }

      default:
        onKeyDownFn(event, { focusedSectionIndex, focusedItemIndex });
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
    const { id, multiSection, focusedSectionIndex, focusedItemIndex } = this.props;
    const theme = themeable(this.props.theme);
    const renderedItems = multiSection ? this.renderSections(theme) : this.renderItems(theme);
    const isOpen = (renderedItems !== null);
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
      ...theme(`react-autowhatever-${id}-input`, 'input'),
      ...this.props.inputProps,
      onKeyDown: this.props.inputProps.onKeyDown && this.onKeyDown,
      ref: this.storeInputReference
    };

    return (
      <div {...theme(`react-autowhatever-${id}-container`, 'container', isOpen && 'containerOpen')}>
        <input {...inputProps} />
        {renderedItems}
      </div>
    );
  }
}
