import { html } from 'lit';
import { unsafeStatic, withStatic } from 'lit/static-html.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { map } from 'lit/directives/map.js';
import { until } from 'lit/directives/until.js';

import { getManifest } from '@/utils/manifest.utils.js';
import { prefixRelativeUrls } from '@/utils/markdown.utils.js';
import { areParamsEqual, mergeParams, type Route, Router } from '@/utils/router.utils.js';

export const prepareRoutes = (): Route[] => [
  {
    path: '/',
    enter: () => {
      // redirect to initial element if defined
      if (window.wcp.config.initialActiveElement !== undefined) {
        Router.navigate(`/element/${window.wcp.config.initialActiveElement}`);
        return false;
      }

      // redirect to first readme if available
      const firstReadme = window.wcp.config.additionalReadmes[0]?.url;
      if (firstReadme !== undefined) {
        Router.navigate(`/readme/${encodeURIComponent(firstReadme)}`);
        return false;
      }

      // redirect to first element
      const firstElement = getManifest().elements.values().next().value.getNiceUrl();
      Router.navigate(`/element/${firstElement}`);
      return false;
    },
  },
  {
    path: '/readme/:url/:hash?',
    enter: () => (window.wcp.config.additionalReadmes.length ?? 0) > 0,
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
        Router.navigate('/element', tagName, pluginName, pluginData);
        return false;
      }

      // everything okay here, just go on
      return true;
    },
    render: ({ tagName = '', pluginName = window.wcp.config.initialPreviewTab, pluginData }) => {
      return html`
        <wcp-stage
          active-plugin="${ifDefined(pluginName)}"
          @wcp-stage:active-plugin-change="${({ detail: pluginName }: CustomEvent<string>) =>
            Router.navigate('/element', tagName, pluginName)}"
        >
          ${map(
            window.wcp.config.previewFramePlugins ?? [],
            (previewFramePlugin) => withStatic(html)`
            <${unsafeStatic(previewFramePlugin)}
              preview-tag-name="${tagName}"
              .data="${ifDefined(pluginData)}"
              @wcp-stage-plugin:data-change="${({ detail: pluginData }: CustomEvent<string>) =>
                Router.navigate('/element', tagName, pluginName, pluginData)}"
            ></${unsafeStatic(previewFramePlugin)}>
          `
          )}
        </wcp-stage>
      `;
    },
  },
];
