import { prefixRelativeUrls } from './markdown.utils';

describe('markdown.utils', () => {
  describe('prefixRelativeUrls', () => {
    it('prefixes relative urls', () => {
      expect(prefixRelativeUrls('[foo](bar)', 'baz/')).toBe('[foo](baz/bar)');
      expect(prefixRelativeUrls('[foo](./bar)', 'baz/')).toBe('[foo](baz/bar)');
    });

    it('does not prefix absolute urls', () => {
      expect(prefixRelativeUrls('[foo](https://bar)', 'baz/')).toBe('[foo](https://bar)');
      expect(prefixRelativeUrls('[foo](/bar)', 'baz/')).toBe('[foo](/bar)');
    });
  });
});
