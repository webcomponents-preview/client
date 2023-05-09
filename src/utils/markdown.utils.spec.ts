import { prefixRelativeUrls } from './markdown.utils';

describe('markdown.utils', () => {
  describe('prefixRelativeUrls', () => {
    it('prefixes relative urls', () => {
      expect(prefixRelativeUrls('[foo](bar)', 'baz/foo.md')).toBe('[foo](baz/bar)');
      expect(prefixRelativeUrls('[foo](./bar)', 'baz/foo.md')).toBe('[foo](baz/bar)');
    });

    it('prefixes hashes', () => {
      expect(prefixRelativeUrls('[foo](#hash)', 'baz/foo.md')).toBe('[foo](baz%2Ffoo.md/hash)');
      expect(prefixRelativeUrls('[foo](./#hash)', 'baz/foo.md')).toBe('[foo](baz%2Ffoo.md/hash)');
    });

    it('prefixes relative markdown urls with hashes', () => {
      expect(prefixRelativeUrls('[foo](bar.md#hash)', 'baz/foo.md')).toBe('[foo](bar.md/hash)');
      expect(prefixRelativeUrls('[foo](./bar.md#hash)', 'baz/foo.md')).toBe('[foo](bar.md/hash)');
      expect(prefixRelativeUrls('[foo](bar.mdx#hash)', 'baz/foo.md')).toBe('[foo](bar.mdx/hash)');
      expect(prefixRelativeUrls('[foo](./bar.mdx#hash)', 'baz/foo.md')).toBe('[foo](bar.mdx/hash)');
    });

    it('prefixes relative markdown urls with subpath and hashes', () => {
      expect(prefixRelativeUrls('[foo](baz/bar.md#hash)', 'foo.md')).toBe('[foo](baz%2Fbar.md/hash)');
      expect(prefixRelativeUrls('[foo](./baz/bar.md#hash)', 'foo.md')).toBe('[foo](baz%2Fbar.md/hash)');
      expect(prefixRelativeUrls('[foo](baz/bar.mdx#hash)', 'foo.md')).toBe('[foo](baz%2Fbar.mdx/hash)');
      expect(prefixRelativeUrls('[foo](./baz/bar.mdx#hash)', 'foo.md')).toBe('[foo](baz%2Fbar.mdx/hash)');
    });

    it('prefixes relative markdown files with additional route', () => {
      expect(prefixRelativeUrls('[foo](bar.md)', 'baz/foo.md', '/#/readme/')).toBe('[foo](/#/readme/bar.md)');
      expect(prefixRelativeUrls('[foo](baz/bar.md)', 'foo.md', '/#/readme/')).toBe('[foo](/#/readme/baz%2Fbar.md)');
      expect(prefixRelativeUrls('[foo](bar.mdx)', 'baz/foo.md', '/#/readme/')).toBe('[foo](/#/readme/bar.mdx)');
      expect(prefixRelativeUrls('[foo](baz/bar.mdx)', 'foo.md', '/#/readme/')).toBe('[foo](/#/readme/baz%2Fbar.mdx)');
    });

    it('prefixes relative markdown files with additional route and hashes', () => {
      expect(prefixRelativeUrls('[foo](bar.md#hash)', 'baz/foo.md', '/#/')).toBe('[foo](/#/bar.md/hash)');
      expect(prefixRelativeUrls('[foo](baz/bar.md#hash)', 'foo.md', '/#/')).toBe('[foo](/#/baz%2Fbar.md/hash)');
      expect(prefixRelativeUrls('[foo](bar.mdx#hash)', 'baz/foo.md', '/#/')).toBe('[foo](/#/bar.mdx/hash)');
      expect(prefixRelativeUrls('[foo](baz/bar.mdx#hash)', 'foo.md', '/#/')).toBe('[foo](/#/baz%2Fbar.mdx/hash)');
    });

    it('does not prefix absolute urls', () => {
      expect(prefixRelativeUrls('[foo](https://bar)', 'baz/foo.md')).toBe('[foo](https://bar)');
      expect(prefixRelativeUrls('[foo](/bar)', 'baz/foo.md')).toBe('[foo](/bar)');
      expect(prefixRelativeUrls('[foo](https://bar.md)', 'baz/foo.md', '/#/')).toBe('[foo](https://bar.md)');
      expect(prefixRelativeUrls('[foo](/bar.md)', 'baz/foo.md', '/#/')).toBe('[foo](/bar.md)');
    });
  });
});
