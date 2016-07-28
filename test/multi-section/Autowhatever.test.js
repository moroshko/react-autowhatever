import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { expect } from 'chai';
import sections from './sections';
import {
  init,
  eventMatcher,
  clickDown
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
    it('should be called with the right parameters', () => {
      clickDown();
      expect(onKeyDown).to.be.calledOnce;
      expect(onKeyDown).to.be.calledWith(eventMatcher, {
        newFocusedSectionIndex: 0,
        newFocusedItemIndex: 0
      });

      clickDown();
      expect(onKeyDown).to.be.calledWith(eventMatcher, {
        newFocusedSectionIndex: 0,
        newFocusedItemIndex: 1
      });

      clickDown();
      expect(onKeyDown).to.be.calledWith(eventMatcher, {
        newFocusedSectionIndex: 1,
        newFocusedItemIndex: 0
      });

      clickDown();
      expect(onKeyDown).to.be.calledWith(eventMatcher, {
        newFocusedSectionIndex: 2,
        newFocusedItemIndex: 0
      });

      clickDown();
      expect(onKeyDown).to.be.calledWith(eventMatcher, {
        newFocusedSectionIndex: null,
        newFocusedItemIndex: null
      });
    });
  });
});
