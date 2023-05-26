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
});
