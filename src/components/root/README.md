# wcp-root

## Properties

| Property           | Attribute        | Type                         | Default                                          | Description                                      |
|--------------------|------------------|------------------------------|--------------------------------------------------|--------------------------------------------------|
| `activeElement`    | `active-element` | `string \| undefined`        |                                                  |                                                  |
| `configUrl`        | `config-url`     | `string \| undefined`        |                                                  | Allows to set a url to load a config file from.  |
| `elements`         |                  | `CustomElementDeclaration[]` | []                                               |                                                  |
| `handleHashChange` |                  |                              | "(() => {\n    const [, activeElement] = window.location.hash.split('#/');\n    this.activeElement = activeElement;\n    this.emitActiveElementChanged();\n  }).bind(this)" |                                                  |
| `manifestUrl`      | `manifest-url`   | `string \| undefined`        |                                                  | Defines the location of the custom element manifest file. |
| `title`            |                  | `string`                     | "Webcomponents Preview"                          |                                                  |

## Methods

| Method                        | Type                                        |
|-------------------------------|---------------------------------------------|
| `emitActiveElementChanged`    | `(): void`                                  |
| `emitManifestLoaded`          | `(): void`                                  |
| `getActiveElementDeclaration` | `(): CustomElementDeclaration \| undefined` |
| `loadCustomElementsManifest`  | `(): Promise<void>`                         |
| `loadTitleFromConfig`         | `(): Promise<void>`                         |

## Events

| Event                             | Type                                      | Description                                      |
|-----------------------------------|-------------------------------------------|--------------------------------------------------|
| `wcp-root:active-element-changed` | `CustomEvent<CustomElementDeclaration>`   | Fired when the active element changes. Carries the declaration of the new active element with it. |
| `wcp-root:manifest-loaded`        | `CustomEvent<CustomElementDeclaration[]>` | Fired when the manifest is (re)loaded. This happens after the json is fetched and the containing elements are resolved. |

## Slots

| Name               | Description                                      |
|--------------------|--------------------------------------------------|
| `logo`             | Allows setting a custom logo to be displayed in the title. |
| `preview-controls` | Can be used to inject additional preview controls. |
| `preview-details`  | Can be used to inject additional preview detail panes. |
| `preview-frame`    | Used to be override the existing preview pane.   |
