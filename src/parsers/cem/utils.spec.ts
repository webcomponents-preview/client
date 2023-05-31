import type * as CEM from 'custom-elements-manifest';
import { getEnumValues, unwrapString } from './utils.js';

describe('utils', () => {
  describe('unwrapString', () => {
    it('removes quotes from the start and end of a string', () => {
      expect(unwrapString(`'foo'`)).toBe('foo');
      expect(unwrapString(`"foo"`)).toBe('foo');
      expect(unwrapString('`foo`')).toBe('foo');
    });

    it('returs the original string if it does not start with a single quote', () => {
      expect(unwrapString('foo')).toBe('foo');
    });
  });

  describe('getEnumValues', () => {
    it('returns an empty array if the type is unsufficient', () => {
      expect(getEnumValues({ type: {} } as CEM.CustomElementField)).toEqual([]);
    });

    it('returns an array for single value enums', () => {
      expect(getEnumValues({ type: { text: 'foo' } } as CEM.CustomElementField)).toEqual(['foo']);
    });

    it('returns an array of values', () => {
      expect(getEnumValues({ type: { text: 'foo | bar' } } as CEM.CustomElementField)).toEqual(['foo', 'bar']);
    });
  });
});
