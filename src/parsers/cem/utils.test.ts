import { expect } from '@esm-bundle/chai';
import type * as CEM from 'custom-elements-manifest';

import { getEnumValues, unwrapString } from './utils.js';

describe('utils', () => {
  describe('unwrapString', () => {
    it('removes quotes from the start and end of a string', () => {
      expect(unwrapString("'foo'")).to.eql('foo');
      expect(unwrapString('"foo"')).to.equal('foo');
      expect(unwrapString('`foo`')).to.equal('foo');
    });

    it('returns the original string if it does not start with a single quote', () => {
      expect(unwrapString('foo')).to.equal('foo');
    });
  });

  describe('getEnumValues', () => {
    it('returns an empty array if the type is insufficient', () => {
      expect(getEnumValues({ type: {} } as CEM.CustomElementField)).to.eql([]);
    });

    it('returns an array for single value enums', () => {
      expect(getEnumValues({ type: { text: 'foo' } } as CEM.CustomElementField)).to.eql(['foo']);
    });

    it('returns an array of values', () => {
      expect(getEnumValues({ type: { text: 'foo | bar' } } as CEM.CustomElementField)).to.eql(['foo', 'bar']);
    });
  });
});
