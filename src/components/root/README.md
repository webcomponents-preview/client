# class: `Root`

## Fields

| Name                       | Privacy | Type                                         | Default        | Description                                                                                                                                                                                                                                                                | Inherited From |
| -------------------------- | ------- | -------------------------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `config`                   |         | `Config \| undefined`                        |                |                                                                                                                                                                                                                                                                            |                |
| `elements`                 |         | `CustomElementDeclaration[]`                 | `[]`           |                                                                                                                                                                                                                                                                            |                |
| `activeElementDeclaration` |         | `CustomElementDeclaration \| undefined`      |                |                                                                                                                                                                                                                                                                            |                |
| `navigation`               |         | `Record<string, CustomElementDeclaration[]>` | `{}`           |                                                                                                                                                                                                                                                                            |                |
| `title`                    |         | `string`                                     |                |                                                                                                                                                                                                                                                                            |                |
| `activeElement`            |         | `string \| undefined`                        |                | Sets the currently active element by its tag name. Will be updated at runtime and can&#xA;be preset with an initial value to define the active element at startup.                                                                                                         |                |
| `inline`                   |         | `boolean`                                    | `false`        | Flags the component to be displayed inline and not standalone. Requires the surrounding&#xA;layout to provide the necessary styles like for any other block element.                                                                                                       |                |
| `fallbackGroupName`        |         | `string`                                     | `'Components'` | Allows to set a fallback group name for elements that do not have a \`groups\` property.&#xA;So this is the name of the group that will contain all elements unless the manifest is&#xA;generated with the optional \`@webcomponents-preview/cem-plugin-grouping\` plugin. |                |
| `initialPreviewTab`        |         | `Config['initialPreviewTab'] \| undefined`   |                | Configure the initial preview tab to be displayed. Can be either \`examples\`, \`readme\` or \`viewer\`.                                                                                                                                                                   |                |
| `configUrl`                |         |                                              |                | Allows to set a url to load a config file from.                                                                                                                                                                                                                            |                |
| `manifestUrl`              |         |                                              |                | Defines the location of the custom element manifest file.                                                                                                                                                                                                                  |                |
| `handleHashChange`         |         |                                              |                |                                                                                                                                                                                                                                                                            |                |

## Methods

| Name                               | Privacy   | Description | Parameters            | Return           | Inherited From |
| ---------------------------------- | --------- | ----------- | --------------------- | ---------------- | -------------- |
| `loadConfig`                       |           |             | `configUrl: string`   |                  |                |
| `loadCustomElementsManifest`       |           |             | `manifestUrl: string` |                  |                |
| `selectFallbackElement`            |           |             |                       |                  |                |
| `retrieveActiveElementDeclaration` |           |             |                       |                  |                |
| `emitManifestLoaded`               |           |             |                       |                  |                |
| `emitActiveElementChanged`         |           |             |                       |                  |                |
| `connectedCallback`                |           |             |                       |                  |                |
| `disconnectedCallback`             |           |             |                       |                  |                |
| `render`                           | protected |             |                       | `TemplateResult` |                |

## Attributes

| Name                  | Field             | Inherited From |
| --------------------- | ----------------- | -------------- |
| `title`               | title             |                |
| `active-element`      | activeElement     |                |
| `inline`              | inline            |                |
| `fallback-group-name` | fallbackGroupName |                |
| `initial-preview-tab` | initialPreviewTab |                |
| `config-url`          | configUrl         |                |
| `manifest-url`        | manifestUrl       |                |

## CSS Properties

| Name                          | Default | Description                                                  |
| ----------------------------- | ------- | ------------------------------------------------------------ |
| `--wcp-root-dark-background`  |         | The background color of the root element in dark mode        |
| `--wcp-root-dark-color`       |         | The text color of the text in the root element in dark mode  |
| `--wcp-root-light-background` |         | The background color of the root element in light mode       |
| `--wcp-root-light-color`      |         | The text color of the text in the root element in light mode |

## Slots

| Name               | Description                                                |
| ------------------ | ---------------------------------------------------------- |
| `logo`             | Allows setting a custom logo to be displayed in the title. |
| `preview-controls` | Can be used to inject additional preview controls.         |
| `preview-frame`    | Used to be override the existing preview pane.             |
| `preview-details`  | Can be used to inject additional preview detail panes.     |

<hr/>
