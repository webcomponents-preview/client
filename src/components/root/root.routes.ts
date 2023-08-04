import { html } from 'lit';
import { unsafeStatic, withStatic } from 'lit/static-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { map } from 'lit/directives/map.js';
import { until } from 'lit/directives/until.js';

import type { Config } from '@/utils/config.utils.js';
import { prefixRelativeUrls } from '@/utils/markdown.utils.js';
import type { Manifest } from '@/utils/parser.types.js';
import { areParamsEqual, mergeParams, type Route, type Router } from '@/utils/router.utils.js';

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
          <wcp-readme markdown="${until(markdown, '')}" hash="${ifDefined(hash)}"></wcp-readme>
        </wcp-readme-frame>
      `;
    },
  },
  {
    path: '/element/:tagName/:pluginName?/:pluginData?',
    // fill in existing params if not provided for next route
    enter: (params, router, outgoingParams) => {
      // check if the params can be taken over (current route is the same
      // path with different params), but exclude pluginData, as they're
      // specific to the current element and should not be taken over
      const hasOutgoingParams = outgoingParams !== undefined;
      const isSamePath = router.currentPath?.startsWith('/element/');
      const alignedParams = mergeParams(outgoingParams ?? {}, params, ['pluginData']);
      const haveParamsChanged = !areParamsEqual(params, alignedParams, ['pluginData']);

      // digest these insights; redirect and block current route
      if (hasOutgoingParams && haveParamsChanged && isSamePath) {
        const { tagName, pluginName, pluginData } = alignedParams;
        router.redirect('/element', tagName, pluginName, pluginData);
        return false;
      }

      // everything okay here, just go on
      return true;
    },
    render: ({ tagName = '', pluginName = config.initialPreviewTab, pluginData }) => {
      return html`
        <wcp-preview-frame
          active-plugin="${ifDefined(pluginName)}"
          @wcp-preview-frame:active-plugin-change="${({ detail: pluginName }: CustomEvent<string>) =>
            router.redirect('/element', tagName, pluginName)}"
        >
          ${map(
            config.previewFramePlugins ?? [],
            (previewFramePlugin) => withStatic(html)`
            <${unsafeStatic(previewFramePlugin)}
              preview-tag-name="${tagName}"
              .data="${ifDefined(pluginData)}"
              @wcp-preview-frame-plugin:data-change="${({ detail: pluginData }: CustomEvent<string>) =>
                router.redirect('/element', tagName, pluginName, pluginData)}"
            ></${unsafeStatic(previewFramePlugin)}>
          `
          )}
        </wcp-preview-frame>
      `;
    },
  },
];
