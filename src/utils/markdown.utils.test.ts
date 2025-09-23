import { expect } from '@esm-bundle/chai';

import { prefixRelativeUrls, resolveRelativePath } from './markdown.utils.js';

describe('markdown.utils', () => {
  describe('resolveRelativePath', () => {
    it('resolves relative parent paths', () => {
      expect(resolveRelativePath('bar/../foo.md')).to.equal('foo.md');
      expect(resolveRelativePath('foo/bar/../../foo.md')).to.equal('foo.md');
      expect(resolveRelativePath('foo/bar/../foo.md')).to.equal('foo/foo.md');
      expect(resolveRelativePath('foo/bar/../baz/foo.md')).to.equal('foo/baz/foo.md');
    });

    it('constrains parent paths to the boundaries', () => {
      expect(resolveRelativePath('../foo.md')).to.equal('foo.md');
      expect(resolveRelativePath('../../foo.md')).to.equal('foo.md');
      expect(resolveRelativePath('foo/../../../foo.md')).to.equal('foo.md');
    });
  });

  describe('prefixRelativeUrls', () => {
    it('prefixes relative urls', () => {
      expect(prefixRelativeUrls('[foo](bar)', 'baz/foo.md')).to.equal('[foo](baz/bar)');
      expect(prefixRelativeUrls('[foo](./bar)', 'baz/foo.md')).to.equal('[foo](baz/bar)');

      expect(prefixRelativeUrls('href="bar"', 'baz/foo.md')).to.equal('href="baz/bar"');
      expect(prefixRelativeUrls('href="./bar"', 'baz/foo.md')).to.equal('href="baz/bar"');

      expect(prefixRelativeUrls('src="bar"', 'baz/foo.md')).to.equal('src="baz/bar"');
      expect(prefixRelativeUrls('src="./bar"', 'baz/foo.md')).to.equal('src="baz/bar"');
    });

    it('resolves url traversions', () => {
      expect(prefixRelativeUrls('[foo](../bar)', 'baz/foo.md')).to.equal('[foo](bar)');
      expect(prefixRelativeUrls('href="../bar"', 'baz/foo.md')).to.equal('href="bar"');
      expect(prefixRelativeUrls('src="../bar"', 'baz/foo.md')).to.equal('src="bar"');
    });

    it('prefixes hashes', () => {
      expect(prefixRelativeUrls('[foo](#hash)', 'baz/foo.md')).to.equal('[foo](baz%2Ffoo.md/hash)');
      expect(prefixRelativeUrls('[foo](./#hash)', 'baz/foo.md')).to.equal('[foo](baz%2Ffoo.md/hash)');

      expect(prefixRelativeUrls('href="#hash"', 'baz/foo.md')).to.equal('href="baz%2Ffoo.md/hash"');
      expect(prefixRelativeUrls('href="./#hash"', 'baz/foo.md')).to.equal('href="baz%2Ffoo.md/hash"');

      expect(prefixRelativeUrls('src="#hash"', 'baz/foo.md')).to.equal('src="baz%2Ffoo.md/hash"');
      expect(prefixRelativeUrls('src="./#hash"', 'baz/foo.md')).to.equal('src="baz%2Ffoo.md/hash"');
    });

    it('prefixes relative markdown urls with hashes', () => {
      expect(prefixRelativeUrls('[foo](bar.md#hash)', 'foo.md')).to.equal('[foo](bar.md/hash)');
      expect(prefixRelativeUrls('[foo](./bar.md#hash)', 'foo.md')).to.equal('[foo](bar.md/hash)');
      expect(prefixRelativeUrls('[foo](bar.md#hash)', 'baz/foo.md')).to.equal('[foo](baz%2Fbar.md/hash)');
      expect(prefixRelativeUrls('[foo](./bar.md#hash)', 'baz/foo.md')).to.equal('[foo](baz%2Fbar.md/hash)');

      expect(prefixRelativeUrls('[foo](bar.mdx#hash)', 'foo.md')).to.equal('[foo](bar.mdx/hash)');
      expect(prefixRelativeUrls('[foo](./bar.mdx#hash)', 'foo.md')).to.equal('[foo](bar.mdx/hash)');
      expect(prefixRelativeUrls('[foo](bar.mdx#hash)', 'baz/foo.md')).to.equal('[foo](baz%2Fbar.mdx/hash)');
      expect(prefixRelativeUrls('[foo](./bar.mdx#hash)', 'baz/foo.md')).to.equal('[foo](baz%2Fbar.mdx/hash)');
    });

    it('prefixes relative markdown urls with subpath and hashes', () => {
      expect(prefixRelativeUrls('[foo](baz/bar.md#hash)', 'foo.md')).to.equal('[foo](baz%2Fbar.md/hash)');
      expect(prefixRelativeUrls('[foo](./baz/bar.md#hash)', 'foo.md')).to.equal('[foo](baz%2Fbar.md/hash)');
      expect(prefixRelativeUrls('[foo](baz/bar.md#hash)', 'foo/foo.md')).to.equal('[foo](foo%2Fbaz%2Fbar.md/hash)');
      expect(prefixRelativeUrls('[foo](./baz/bar.md#hash)', 'foo/foo.md')).to.equal('[foo](foo%2Fbaz%2Fbar.md/hash)');

      expect(prefixRelativeUrls('[foo](baz/bar.mdx#hash)', 'foo.md')).to.equal('[foo](baz%2Fbar.mdx/hash)');
      expect(prefixRelativeUrls('[foo](./baz/bar.mdx#hash)', 'foo.md')).to.equal('[foo](baz%2Fbar.mdx/hash)');
      expect(prefixRelativeUrls('[foo](baz/bar.mdx#hash)', 'foo/foo.md')).to.equal('[foo](foo%2Fbaz%2Fbar.mdx/hash)');
      expect(prefixRelativeUrls('[foo](./baz/bar.mdx#hash)', 'foo/foo.md')).to.equal('[foo](foo%2Fbaz%2Fbar.mdx/hash)');
    });

    it('prefixes relative markdown files with additional route', () => {
      expect(prefixRelativeUrls('[foo](bar.md)', 'baz/foo.md', '/#/readme/')).to.equal('[foo](/#/readme/baz%2Fbar.md)');
      expect(prefixRelativeUrls('[foo](baz/bar.md)', 'foo.md', '/#/readme/')).to.equal('[foo](/#/readme/baz%2Fbar.md)');

      expect(prefixRelativeUrls('[foo](bar.mdx)', 'baz/foo.md', '/#/readme/')).to.equal(
        '[foo](/#/readme/baz%2Fbar.mdx)'
      );
      expect(prefixRelativeUrls('[foo](baz/bar.mdx)', 'foo.md', '/#/readme/')).to.equal(
        '[foo](/#/readme/baz%2Fbar.mdx)'
      );
    });

    it('prefixes relative markdown files with additional route and hashes', () => {
      expect(prefixRelativeUrls('[foo](bar.md#hash)', 'baz/foo.md', '/#/')).to.equal('[foo](/#/baz%2Fbar.md/hash)');
      expect(prefixRelativeUrls('[foo](baz/bar.md#hash)', 'foo.md', '/#/')).to.equal('[foo](/#/baz%2Fbar.md/hash)');
      expect(prefixRelativeUrls('[foo](bar.mdx#hash)', 'baz/foo.md', '/#/')).to.equal('[foo](/#/baz%2Fbar.mdx/hash)');
      expect(prefixRelativeUrls('[foo](baz/bar.mdx#hash)', 'foo.md', '/#/')).to.equal('[foo](/#/baz%2Fbar.mdx/hash)');
    });

    it('does not prefix absolute urls', () => {
      expect(prefixRelativeUrls('[foo](https://bar)', 'baz/foo.md')).to.equal('[foo](https://bar)');
      expect(prefixRelativeUrls('[foo](/bar)', 'baz/foo.md')).to.equal('[foo](/bar)');
      expect(prefixRelativeUrls('[foo](https://bar.md)', 'baz/foo.md', '/#/')).to.equal('[foo](https://bar.md)');
      expect(prefixRelativeUrls('[foo](/bar.md)', 'baz/foo.md', '/#/')).to.equal('[foo](/bar.md)');
    });

    it('should replace all occurrences', () => {
      expect(prefixRelativeUrls('[foo](bar) [foo](bar)', 'baz/foo.md')).to.equal('[foo](baz/bar) [foo](baz/bar)');
      expect(prefixRelativeUrls('[foo](bar.md#hash) [foo](bar.md#hash)', 'baz/foo.md')).to.equal(
        '[foo](baz%2Fbar.md/hash) [foo](baz%2Fbar.md/hash)'
      );
    });
  });
});
