<!-- Auto Generated Below -->

# wcp-root

## Properties

| Property        | Attribute      | Modifiers | Type                  | Default | Description                                      |
|-----------------|----------------|-----------|-----------------------|---------|--------------------------------------------------|
| `configUrl`     | `config-url`   |           | `string \| undefined` |         | Allows to set a url to load a config file from.  |
| `inline`        | `inline`       |           | `boolean`             | false   | Flags the component to be displayed inline and not standalone. Requires the surrounding<br />layout to provide the necessary styles like for any other block element. |
| `manifestUrl`   | `manifest-url` |           | `string`              |         | Defines the location of the custom element manifest file. |
| `navigationRef` |                | readonly  | `RootNavigation`      |         |                                                  |

## Methods

| Method                      | Type                                      |
|-----------------------------|-------------------------------------------|
| `handleSearchInput`         | `({ detail }: CustomEvent<string>): void` |
| `handleSplashTransitionEnd` | `(event: Event): void`                    |

## Events

| Event                             | Description                                      |
|-----------------------------------|--------------------------------------------------|
| `wcp-root:active-element-changed` | Fired when the active element changes. Carries the declaration of the new active element with it. |

## Slots

| Name               | Description                                      |
|--------------------|--------------------------------------------------|
| `logo`             | Allows setting a custom logo to be displayed in the title. |
| `preview-controls` | Can be used to inject additional preview controls. |
| `preview-details`  | Can be used to inject additional preview detail panes. |
| `preview-frame`    | Used to be override the existing preview pane.   |

## CSS Custom Properties

| Property                      | Description                                      |
|-------------------------------|--------------------------------------------------|
| `--wcp-root-dark-background`  | The background color of the root element in dark mode. |
| `--wcp-root-dark-color`       | The text color of the text in the root element in dark mode. |
| `--wcp-root-light-background` | The background color of the root element in light mode. |
| `--wcp-root-light-color`      | The text color of the text in the root element in light mode. |
