# wcp-preview-frame-viewer

**Mixins:** ColorSchemable

## Properties

| Property    | Attribute   | Modifiers | Type                  | Default  |
|-------------|-------------|-----------|-----------------------|----------|
| `available` | `available` | readonly  | `true`                | true     |
| `data`      | `data`      |           | `string \| undefined` |          |
| `element`   | `element`   |           |                       |          |
| `label`     | `label`     | readonly  | `"Viewer"`            | "Viewer" |
| `name`      | `name`      | readonly  | `"viewer"`            | "viewer" |

## Methods

| Method                | Type                                |
|-----------------------|-------------------------------------|
| `#prepareElementData` | `(data?: string \| undefined): any` |

## Events

| Event                                  |
|----------------------------------------|
| `wcp-preview-frame-plugin:data-change` |
