import type * as Parsed from '@/utils/parser.types.js';
import { litKey } from './parser.utils.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const field = (data: Partial<Parsed.Field>) => data as Parsed.Field;

describe('parser.utils', () => {
  describe('litKey', () => {
    it('delivers property notation', () => {
      expect(litKey(field({ name: 'foo', hasAttribute: false }))).toBe('.foo');
    });

    it('delivers attribute notation', () => {
      expect(litKey(field({ name: 'foo', attribute: 'foo', hasAttribute: true }))).toBe('foo');
    });

    it('delivers boolean notation', () => {
      expect(litKey(field({ name: 'foo', attribute: 'foo', hasAttribute: true, isBoolean: true }))).toBe('?foo');
    });
  });
});
