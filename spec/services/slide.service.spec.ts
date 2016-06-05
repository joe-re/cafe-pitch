import { describe, it, inject, expect, beforeEachProviders, beforeEach } from '@angular/core/testing';
import { SlideService } from '../../src/renderer/services/slide.service';

describe('SlideService', () => {

    beforeEachProviders(() => [
        SlideService
    ]);

    it('Should service exist', inject([SlideService], (testee: SlideService) => {
        expect(testee).toBeDefined();
    }));

    describe('#getPageText', () => {
      let testee: SlideService;
      beforeEach(inject([SlideService], (s: SlideService) => testee = s));

      describe('text is nothing', () => {
        it('should be empty', () => {
          expect(testee.getPageText(1)).toEqual('');
        });
      });

      describe('text has been setted', () => {
        beforeEach(() => {
          testee.setText('# page1\n---\n# page2');
        });
        it('should get text by page', () => {
          expect(testee.getPageText(1)).toEqual('# page1\n');
          expect(testee.getPageText(2)).toEqual('\n# page2');
          expect(testee.getPageText(3)).toEqual('');
        });
      });
    });

    describe('#getMaxPage', () => {
      let testee: SlideService;
      beforeEach(inject([SlideService], (s: SlideService) => testee = s));

      describe('text is nothing', () => {
        it('should be 1', () => {
          expect(testee.getMaxPage()).toEqual(1);
        });
      });

      describe('text has been setted', () => {
        beforeEach(() => {
          testee.setText('# page1\n---\n# page2');
        });
        it('should get last page number', () => {
          expect(testee.getMaxPage()).toEqual(2);
        });
      });
    });

    describe('#getPageNo', () => {
      let testee: SlideService;
      beforeEach(inject([SlideService], (s: SlideService) => testee = s));

      describe('text is nothing', () => {
        it('should be 1', () => {
          expect(testee.getPageNo(1)).toEqual(1);
        });
      });

      describe('text has been setted', () => {
        beforeEach(() => {
          testee.setText('# page1\n---\n# page2');
        });
        it('should get page number', () => {
          expect(testee.getPageNo(1)).toEqual(1);
          expect(testee.getPageNo(2)).toEqual(2);
          expect(testee.getPageNo(3)).toEqual(2);
        });
      });
    });
});
