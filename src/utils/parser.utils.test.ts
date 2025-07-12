import { expect } from '@esm-bundle/chai';

import type * as Parsed from '@/utils/parser.types.js';

import { litKey } from './parser.utils.js';

const field = (data: Partial<Parsed.Field>) => data as Parsed.Field;

describe('parser.utils', () => {
  describe('litKey', () => {
    it('delivers property notation', () => {
      expect(litKey(field({ name: 'foo', hasAttribute: false }))).to.equal('.foo');
    });

    it('delivers attribute notation', () => {
      expect(litKey(field({ name: 'foo', attribute: 'foo', hasAttribute: true }))).to.equal('foo');
    });

    it('delivers boolean notation', () => {
      expect(litKey(field({ name: 'foo', attribute: 'foo', hasAttribute: true, isBoolean: true }))).to.equal('?foo');
    });
  });
});
