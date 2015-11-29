'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sectionIterator = require('section-iterator');

var _sectionIterator2 = _interopRequireDefault(_sectionIterator);

var _reactThemeable = require('react-themeable');

var _reactThemeable2 = _interopRequireDefault(_reactThemeable);

var Autowhatever = (function (_Component) {
  _inherits(Autowhatever, _Component);

  _createClass(Autowhatever, null, [{
    key: 'propTypes',
    value: {
      id: _react.PropTypes.string, // Used in aria-* attributes. If multiple Autowhatever's are rendered on a page, they must have unique ids.
      multiSection: _react.PropTypes.bool, // Indicates whether a multi section layout should be rendered.
      items: _react.PropTypes.array.isRequired, // Array of items or sections to render.
      renderItem: _react.PropTypes.func, // This function renders a single item.
      shouldRenderSection: _react.PropTypes.func, // This function gets a section and returns whether it should be rendered, or not.
      renderSectionTitle: _react.PropTypes.func, // This function gets a section and renders its title.
      getSectionItems: _react.PropTypes.func, // This function gets a section and returns its items, which will be passed into `renderItem` for rendering.
      inputProps: _react.PropTypes.object, // Arbitrary input props
      itemProps: _react.PropTypes.object, // Arbitrary item props
      focusedSectionIndex: _react.PropTypes.number, // Section index of the focused item
      focusedItemIndex: _react.PropTypes.number, // Focused item index (within a section)
      theme: _react.PropTypes.object // Styles. See: https://github.com/markdalgleish/react-themeable
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      id: '1',
      multiSection: false,
      shouldRenderSection: function shouldRenderSection() {
        return true;
      },
      renderItem: function renderItem() {
        throw new Error('`renderItem` must be provided');
      },
      renderSectionTitle: function renderSectionTitle() {
        throw new Error('`renderSectionTitle` must be provided');
      },
      getSectionItems: function getSectionItems() {
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
    },
    enumerable: true
  }]);

  function Autowhatever(props) {
    _classCallCheck(this, Autowhatever);

    _get(Object.getPrototypeOf(Autowhatever.prototype), 'constructor', this).call(this, props);

    this.onKeyDown = this.onKeyDown.bind(this);
  }

  _createClass(Autowhatever, [{
    key: 'getItemId',
    value: function getItemId(sectionIndex, itemIndex) {
      if (itemIndex === null) {
        return null;
      }

      var id = this.props.id;

      var section = sectionIndex === null ? '' : 'section-' + sectionIndex;

      return 'react-autowhatever-' + id + '-' + section + '-item-' + itemIndex;
    }
  }, {
    key: 'getItemsContainerId',
    value: function getItemsContainerId() {
      var id = this.props.id;

      return 'react-whatever-' + id;
    }
  }, {
    key: 'renderItemsList',
    value: function renderItemsList(theme, items, sectionIndex) {
      var _this = this;

      var _props = this.props;
      var renderItem = _props.renderItem;
      var focusedSectionIndex = _props.focusedSectionIndex;
      var focusedItemIndex = _props.focusedItemIndex;
      var _props$itemProps = this.props.itemProps;
      var onMouseEnter = _props$itemProps.onMouseEnter;
      var onMouseLeave = _props$itemProps.onMouseLeave;
      var onMouseDown = _props$itemProps.onMouseDown;
      var onClick = _props$itemProps.onClick;

      return items.map(function (item, itemIndex) {
        var onMouseEnterFn = onMouseEnter ? function (event) {
          return onMouseEnter(event, { sectionIndex: sectionIndex, itemIndex: itemIndex });
        } : function () {};
        var onMouseLeaveFn = onMouseLeave ? function (event) {
          return onMouseLeave(event, { sectionIndex: sectionIndex, itemIndex: itemIndex });
        } : function () {};
        var onMouseDownFn = onMouseDown ? function (event) {
          return onMouseDown(event, { sectionIndex: sectionIndex, itemIndex: itemIndex });
        } : function () {};
        var onClickFn = onClick ? function (event) {
          return onClick(event, { sectionIndex: sectionIndex, itemIndex: itemIndex });
        } : function () {};
        var itemProps = _extends({
          id: _this.getItemId(sectionIndex, itemIndex),
          role: 'option'
        }, theme(itemIndex, 'item', sectionIndex === focusedSectionIndex && itemIndex === focusedItemIndex && 'item--focused'), _this.props.itemProps, {
          onMouseEnter: onMouseEnterFn,
          onMouseLeave: onMouseLeaveFn,
          onMouseDown: onMouseDownFn,
          onClick: onClickFn
        });

        return _react2['default'].createElement(
          'li',
          itemProps,
          renderItem(item)
        );
      });
    }
  }, {
    key: 'renderSections',
    value: function renderSections(theme) {
      var _this2 = this;

      var _props2 = this.props;
      var id = _props2.id;
      var items = _props2.items;
      var shouldRenderSection = _props2.shouldRenderSection;
      var renderSectionTitle = _props2.renderSectionTitle;
      var getSectionItems = _props2.getSectionItems;

      return _react2['default'].createElement(
        'div',
        _extends({ id: this.getItemsContainerId(),
          role: 'listbox'
        }, theme('items-container', 'items-container')),
        items.map(function (section, sectionIndex) {
          return shouldRenderSection(section) && _react2['default'].createElement(
            'div',
            _extends({ key: sectionIndex
            }, theme(sectionIndex, 'section-container')),
            _react2['default'].createElement(
              'div',
              theme('section-title', 'section-title'),
              renderSectionTitle(section)
            ),
            _react2['default'].createElement(
              'ul',
              theme('section-items-container', 'section-items-container'),
              _this2.renderItemsList(theme, getSectionItems(section), sectionIndex)
            )
          );
        })
      );
    }
  }, {
    key: 'renderItems',
    value: function renderItems(theme) {
      var _props3 = this.props;
      var id = _props3.id;
      var items = _props3.items;

      return _react2['default'].createElement(
        'ul',
        _extends({ id: this.getItemsContainerId(),
          role: 'listbox'
        }, theme('items-container', 'items-container')),
        this.renderItemsList(theme, items, null)
      );
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(event) {
      var _props4 = this.props;
      var inputProps = _props4.inputProps;
      var focusedSectionIndex = _props4.focusedSectionIndex;
      var focusedItemIndex = _props4.focusedItemIndex;
      var onKeyDown = inputProps.onKeyDown;

      switch (event.key) {
        case 'ArrowDown':
        case 'ArrowUp':
          var _props5 = this.props,
              multiSection = _props5.multiSection,
              items = _props5.items,
              getSectionItems = _props5.getSectionItems;

          var sectionIterator = (0, _sectionIterator2['default'])({
            multiSection: multiSection,
            data: multiSection ? items.map(function (section) {
              return getSectionItems(section).length;
            }) : items.length
          });
          var nextPrev = event.key === 'ArrowDown' ? 'next' : 'prev';

          var _sectionIterator$nextPrev = sectionIterator[nextPrev]([focusedSectionIndex, focusedItemIndex]),
              _sectionIterator$nextPrev2 = _slicedToArray(_sectionIterator$nextPrev, 2),
              newFocusedSectionIndex = _sectionIterator$nextPrev2[0],
              newFocusedItemIndex = _sectionIterator$nextPrev2[1];

          onKeyDown(event, { newFocusedSectionIndex: newFocusedSectionIndex, newFocusedItemIndex: newFocusedItemIndex });
          break;

        default:
          onKeyDown(event, { focusedSectionIndex: focusedSectionIndex, focusedItemIndex: focusedItemIndex });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props6 = this.props;
      var id = _props6.id;
      var multiSection = _props6.multiSection;
      var items = _props6.items;
      var focusedSectionIndex = _props6.focusedSectionIndex;
      var focusedItemIndex = _props6.focusedItemIndex;

      var isOpen = items.length > 0;
      var ariaActivedescendant = this.getItemId(focusedSectionIndex, focusedItemIndex);
      var theme = (0, _reactThemeable2['default'])(this.props.theme);
      var inputProps = _extends({
        type: 'text',
        value: '',
        autoComplete: 'off',
        role: 'combobox',
        ref: 'input',
        'aria-autocomplete': 'list',
        'aria-owns': this.getItemsContainerId(),
        'aria-expanded': isOpen,
        'aria-activedescendant': ariaActivedescendant
      }, theme('input', 'input', isOpen && 'input--open'), this.props.inputProps, {
        onKeyDown: this.props.inputProps.onKeyDown && this.onKeyDown
      });

      return _react2['default'].createElement(
        'div',
        theme('container', 'container'),
        _react2['default'].createElement('input', inputProps),
        isOpen && multiSection && this.renderSections(theme),
        isOpen && !multiSection && this.renderItems(theme)
      );
    }
  }]);

  return Autowhatever;
})(_react.Component);

exports['default'] = Autowhatever;
module.exports = exports['default'];
