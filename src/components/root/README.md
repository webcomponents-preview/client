# wcp-root

## Properties

| Property            | Attribute             | Type                                         | Default                                          | Description                                      |
|---------------------|-----------------------|----------------------------------------------|--------------------------------------------------|--------------------------------------------------|
| `activeElement`     | `active-element`      | `string \| undefined`                        |                                                  | Sets the currently active element by its tag name. Will be updated at runtime and can<br />be preset with an initial value to define the active element at startup. |
| `configUrl`         | `config-url`          | `string \| undefined`                        |                                                  | Allows to set a url to load a config file from.  |
| `elements`          |                       | `CustomElementDeclaration[]`                 | []                                               |                                                  |
| `fallbackGroupName` | `fallback-group-name` | `string`                                     | "Components"                                     | Allows to set a fallback group name for elements that do not have a `groups` property.<br />So this is the name of the group that will contain all elements unless the manifest is<br />generated with the optional `@webcomponents-preview/cem-plugin-grouping` plugin. |
| `handleHashChange`  |                       |                                              | "(() => {\n    const [, activeElement] = window.location.hash.split('#/');\n    this.activeElement = activeElement;\n    this.emitActiveElementChanged();\n  }).bind(this)" |                                                  |
| `inline`            | `inline`              | `boolean`                                    | false                                            | Flags the component to be displayed inline and not standalone. Requires the surrounding<br />layout to provide the necessary styles like for any other block element. |
| `manifestUrl`       | `manifest-url`        | `string \| undefined`                        |                                                  | Defines the location of the custom element manifest file. |
| `navigation`        |                       | `Record<string, CustomElementDeclaration[]>` | {}                                               |                                                  |
| `title`             | `title`               | `string`                                     |                                                  |                                                  |

## Methods

| Method                        | Type                                        |
|-------------------------------|---------------------------------------------|
| `emitActiveElementChanged`    | `(): void`                                  |
| `emitManifestLoaded`          | `(): void`                                  |
| `getActiveElementDeclaration` | `(): CustomElementDeclaration \| undefined` |
| `handleMenuClick`             | `(): void`                                  |
| `loadCustomElementsManifest`  | `(): Promise<void>`                         |

## Events

| Event                             | Type                                      | Description                                      |
|-----------------------------------|-------------------------------------------|--------------------------------------------------|
| `wcp-aside:toggle`                | `CustomEvent<boolean>`                    |                                                  |
| `wcp-root:active-element-changed` | `CustomEvent<CustomElementDeclaration>`   | Fired when the active element changes. Carries the declaration of the new active element with it. |
| `wcp-root:manifest-loaded`        | `CustomEvent<CustomElementDeclaration[]>` | Fired when the manifest is (re)loaded. This happens after the json is fetched and the containing elements are resolved. |

## Slots

| Name               | Description                                      |
|--------------------|--------------------------------------------------|
| `logo`             | Allows setting a custom logo to be displayed in the title. |
| `preview-controls` | Can be used to inject additional preview controls. |
| `preview-details`  | Can be used to inject additional preview detail panes. |
| `preview-frame`    | Used to be override the existing preview pane.   |

## CSS Custom Properties

| Property                | Description                               |
|-------------------------|-------------------------------------------|
| `--wcp-root-background` | The background color of the root element. |
