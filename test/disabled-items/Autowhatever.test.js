import React from 'react'
import TestUtils from 'react-dom/test-utils'
import { expect } from 'chai'
import {
  init,
  eventMatcher,
  clickDown,
} from '../helpers'
import AutowhateverApp, {
  onKeyDown
} from './AutowhateverApp'

describe('Disabled Items Autowhatever', () => {
  beforeEach(() => {
    onKeyDown.reset()
    init(TestUtils.renderIntoDocument(
      <AutowhateverApp
        multiSection={false}
        sections={['A', 'B', 'C']}
        isItemDisabled={(item, itemIndex) => {
          return itemIndex === 1
        }}
      />
    ))
  })

  describe('inputProps.onKeyDown', () => {
    it('should ignore disabled items when when Up/Down is pressed', () => {
      clickDown()
      expect(onKeyDown).to.be.calledOnce
      expect(onKeyDown).to.be.calledWith(eventMatcher, {
        newHighlightedSectionIndex: null,
        newHighlightedItemIndex: 0
      })
      clickDown()
      expect(onKeyDown).to.be.calledWith(eventMatcher, {
        newHighlightedSectionIndex: null,
        newHighlightedItemIndex: 2
      })
    })
  })
})
