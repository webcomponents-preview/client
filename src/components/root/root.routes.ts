import { html } from 'lit';
import { unsafeStatic, withStatic } from 'lit/static-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { map } from 'lit/directives/map.js';
import { until } from 'lit/directives/until.js';

import type { Config } from '@/utils/config.utils.js';
import { prefixRelativeUrls } from '@/utils/markdown.utils.js';
import type { Manifest } from '@/utils/parser.types.js';
import type { Route, Router } from '@/utils/routable.utils.js';

export const prepareRoutes = (router: Router, config: Config, manifest: Manifest): Route[] => [
  {
    path: '/',
    enter: () => {
      // redirect to initial element if defined
      if (config.initialActiveElement !== undefined) {
        router.redirect(`/element/${config.initialActiveElement}`);
        return false;
      }

      // redirect to first readme if available
      const firstReadme = config.additionalReadmes[0]?.url;
      if (firstReadme !== undefined) {
        router.redirect(`/readme/${encodeURIComponent(firstReadme)}`);
        return false;
      }

      // redirect to first element
      const firstElement = manifest.elements.values().next().value.getNiceUrl();
      router.redirect(`/element/${firstElement}`);
      return false;
    },
  },
  {
    path: '/readme/:url/:hash?',
    enter: () => (config.additionalReadmes.length ?? 0) > 0,
    render: ({ url = '', hash }) => {
      // the url is encoded to be able to use it as a param
      const encoded = decodeURIComponent(url);
      // fetch the readme contents and parse it as markdown
      const markdown = fetch(encoded)
        .then((response) => response.text())
        .then((markdown) => prefixRelativeUrls(markdown, encoded, '/#/readme/'));
      return html`
        <wcp-readme-frame>
          <wcp-readme markdown="${until(markdown, '')}" hash="${hash}"></wcp-readme>
        </wcp-readme-frame>
      `;
    },
  },
  {
    path: '/element/:tagName',
    render: ({ tagName = '' }) => html`
      <wcp-preview-frame initial-preview-tab="${ifDefined(config.initialPreviewTab)}">
        ${map(
          config.previewFramePlugins ?? [],
          (plugin) => withStatic(html)`
            <${unsafeStatic(plugin)} .element="${manifest.elements.get(tagName)}"></${unsafeStatic(plugin)}>
          `
        )}
      </wcp-preview-frame>
    `,
  },
];
