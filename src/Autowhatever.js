import React, { Component, PropTypes } from 'react';
import createSectionIterator from 'section-iterator';
import themeable from 'react-themeable';
import SectionTitle from './SectionTitle';
import ItemsList from './ItemsList';

const alwaysTrue = () => true;
const emptyObject = {};
const defaultTheme = {
  container: 'react-autowhatever__container',
  containerOpen: 'react-autowhatever__container--open',
  input: 'react-autowhatever__input',
  itemsContainer: 'react-autowhatever__items-container',
  item: 'react-autowhatever__item',
  itemFocused: 'react-autowhatever__item--focused',
  sectionContainer: 'react-autowhatever__section-container',
  sectionTitle: 'react-autowhatever__section-title',
  sectionItemsContainer: 'react-autowhatever__section-items-container'
};

export default class Autowhatever extends Component {
  static propTypes = {
    id: PropTypes.string,                  // Used in aria-* attributes. If multiple Autowhatever's are rendered on a page, they must have unique ids.
    multiSection: PropTypes.bool,          // Indicates whether a multi section layout should be rendered.
    items: PropTypes.array.isRequired,     // Array of items or sections to render.
    renderItem: PropTypes.func,            // This function renders a single item.
    renderItemData: PropTypes.object,      // Arbitrary data that will be passed to renderItem()
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
    shouldRenderSection: alwaysTrue,
    renderItem: () => {
      throw new Error('`renderItem` must be provided');
    },
    renderItemData: emptyObject,
    renderSectionTitle: () => {
      throw new Error('`renderSectionTitle` must be provided');
    },
    getSectionItems: () => {
      throw new Error('`getSectionItems` must be provided');
    },
    inputProps: emptyObject,
    itemProps: emptyObject,
    focusedSectionIndex: null,
    focusedItemIndex: null,
    theme: defaultTheme
  };

  constructor(props) {
    super(props);

    this.setSectionsItems(props);
    this.setSectionIterator(props);
    this.setTheme(props);

    this.onKeyDown = this.onKeyDown.bind(this);
    this.storeInputReference = this.storeInputReference.bind(this);
    this.storeItemsListReference = this.storeItemsListReference.bind(this);
    this.getItemId = this.getItemId.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items !== this.props.items) {
      this.setSectionsItems(nextProps);
    }

    if (nextProps.items !== this.props.items || nextProps.multiSection !== this.props.multiSection) {
      this.setSectionIterator(nextProps);
    }

    if (nextProps.theme !== this.props.theme) {
      this.setTheme(nextProps);
    }
  }

  setSectionsItems(props) {
    if (props.multiSection) {
      this.sectionsItems = props.items.map(section => props.getSectionItems(section));
      this.sectionsLengths = this.sectionsItems.map(items => items.length);
      this.allSectionsAreEmpty = this.sectionsLengths.every(itemsCount => itemsCount === 0);
    }
  }

  setSectionIterator(props) {
    this.sectionIterator = createSectionIterator({
      multiSection: props.multiSection,
      data: props.multiSection ? this.sectionsLengths : props.items.length
    });
  }

  setTheme(props) {
    this.theme = themeable(props.theme);
  }

  storeInputReference(input) {
    if (input !== null) {
      this.input = input;
    }
  }

  // Needed only for testing
  storeItemsListReference(itemsList) {
    if (itemsList !== null) {
      this.itemsList = itemsList;
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

    return `react-autowhatever-${id}`;
  }

  renderSections() {
    if (this.allSectionsAreEmpty) {
      return null;
    }

    const { theme } = this;
    const {
      id, items, renderItem, renderItemData, shouldRenderSection,
      renderSectionTitle, focusedSectionIndex, focusedItemIndex, itemProps
    } = this.props;

    return (
      <div
        {...theme(`react-autowhatever-${id}-items-container`, 'itemsContainer')}>
        {
          items.map((section, sectionIndex) => {
            if (!shouldRenderSection(section)) {
              return null;
            }

            const keyPrefix = `react-autowhatever-${id}-`;
            const sectionKeyPrefix = `${keyPrefix}section-${sectionIndex}-`;

            // `key` is provided by theme()
            /* eslint-disable react/jsx-key */
            return (
              <div {...theme(`${sectionKeyPrefix}container`, 'sectionContainer')}>
                <SectionTitle
                  section={section}
                  renderSectionTitle={renderSectionTitle}
                  theme={theme}
                  sectionKeyPrefix={sectionKeyPrefix} />
                <ItemsList
                  id={this.getItemsContainerId()}
                  items={this.sectionsItems[sectionIndex]}
                  itemProps={itemProps}
                  renderItem={renderItem}
                  renderItemData={renderItemData}
                  sectionIndex={sectionIndex}
                  focusedItemIndex={focusedSectionIndex === sectionIndex ? focusedItemIndex : null}
                  getItemId={this.getItemId}
                  theme={theme}
                  keyPrefix={keyPrefix}
                  ref={this.storeItemsListReference} />
              </div>
            );
            /* eslint-enable react/jsx-key */
          })
        }
      </div>
    );
  }

  renderItems() {
    const { items } = this.props;

    if (items.length === 0) {
      return null;
    }

    const { theme } = this;
    const {
      id, renderItem, renderItemData, focusedSectionIndex,
      focusedItemIndex, itemProps
    } = this.props;

    return (
      <ItemsList
        id={this.getItemsContainerId()}
        items={items}
        itemProps={itemProps}
        renderItem={renderItem}
        renderItemData={renderItemData}
        focusedItemIndex={focusedSectionIndex === null ? focusedItemIndex : null}
        getItemId={this.getItemId}
        theme={theme}
        keyPrefix={`react-autowhatever-${id}-`}
        ref={this.storeItemsListReference} />
    );
  }

  onKeyDown(event) {
    const { inputProps, focusedSectionIndex, focusedItemIndex } = this.props;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp': {
        const nextPrev = (event.key === 'ArrowDown' ? 'next' : 'prev');
        const [newFocusedSectionIndex, newFocusedItemIndex] =
          this.sectionIterator[nextPrev]([focusedSectionIndex, focusedItemIndex]);

        inputProps.onKeyDown(event, { newFocusedSectionIndex, newFocusedItemIndex });
        break;
      }

      default:
        inputProps.onKeyDown(event, { focusedSectionIndex, focusedItemIndex });
    }
  }

  render() {
    const { theme } = this;
    const { id, multiSection, focusedSectionIndex, focusedItemIndex } = this.props;
    const renderedItems = multiSection ? this.renderSections() : this.renderItems();
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
