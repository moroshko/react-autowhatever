import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { expect } from 'chai';
import sections from './sections';
import {
  init,
  eventMatcher,
  clickUp,
  clickDown,
  clickEnter
} from '../helpers';
import AutowhateverApp, {
  getSectionItems,
  renderSectionTitle,
  onKeyDown
} from './AutowhateverApp';

describe('Multi Section Autowhatever', () => {
  beforeEach(() => {
    getSectionItems.reset();
    renderSectionTitle.reset();
    onKeyDown.reset();
    init(TestUtils.renderIntoDocument(<AutowhateverApp />));
  });

  describe('renderSectionTitle', () => {
    it('should be called once for every section', () => {
      expect(renderSectionTitle).to.have.callCount(3);
      expect(renderSectionTitle.getCall(0).args[0]).to.deep.equal(sections[0]);
      expect(renderSectionTitle.getCall(1).args[0]).to.deep.equal(sections[1]);
      expect(renderSectionTitle.getCall(2).args[0]).to.deep.equal(sections[2]);
    });

    it('should not be called when Down is pressed', () => {
      renderSectionTitle.reset();
      clickDown();
      expect(renderSectionTitle).not.to.have.been.called;
    });
  });

  describe('getSectionItems', () => {
    it('should be called once for every section', () => {
      expect(getSectionItems).to.have.callCount(3);
      expect(getSectionItems.getCall(0).args[0]).to.deep.equal(sections[0]);
      expect(getSectionItems.getCall(1).args[0]).to.deep.equal(sections[1]);
      expect(getSectionItems.getCall(2).args[0]).to.deep.equal(sections[2]);
    });

    it('should not be called when Down is pressed', () => {
      getSectionItems.reset();
      clickDown();
      expect(getSectionItems).not.to.have.been.called;
    });
  });

  describe('inputProps.onKeyDown', () => {
    it('should be called with the right parameters when Up/Down is pressed', () => {
      clickDown();
      expect(onKeyDown).to.be.calledOnce;
      expect(onKeyDown).to.be.calledWith(eventMatcher, {
        newHighlightedSectionIndex: 0,
        newHighlightedItemIndex: 0
      });

      clickDown();
      expect(onKeyDown).to.be.calledWith(eventMatcher, {
        newHighlightedSectionIndex: 0,
        newHighlightedItemIndex: 1
      });

      clickDown();
      expect(onKeyDown).to.be.calledWith(eventMatcher, {
        newHighlightedSectionIndex: 1,
        newHighlightedItemIndex: 0
      });

      clickDown();
      expect(onKeyDown).to.be.calledWith(eventMatcher, {
        newHighlightedSectionIndex: 2,
        newHighlightedItemIndex: 0
      });

      clickDown();
      expect(onKeyDown).to.be.calledWith(eventMatcher, {
        newHighlightedSectionIndex: null,
        newHighlightedItemIndex: null
      });
    });

    it('should be called with the right parameters when Enter is pressed', () => {
      clickEnter();
      expect(onKeyDown).to.be.calledWith(eventMatcher, {
        highlightedSectionIndex: null,
        highlightedItemIndex: null
      });

      clickUp();
      clickEnter();
      expect(onKeyDown).to.be.calledWith(eventMatcher, {
        highlightedSectionIndex: 2,
        highlightedItemIndex: 0
      });
    });
  });
});
