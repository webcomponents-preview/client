# wcp-preview-frame-viewer

**Mixins:** ColorSchemable

## Properties

| Property         | Attribute          | Modifiers | Type                  | Default  |
|------------------|--------------------|-----------|-----------------------|----------|
| `available`      | `available`        | readonly  | `true`                | true     |
| `data`           | `data`             |           | `string \| undefined` |          |
| `label`          | `label`            | readonly  | `"Viewer"`            | "Viewer" |
| `name`           | `name`             | readonly  | `"viewer"`            | "viewer" |
| `previewTagName` | `preview-tag-name` |           | `string`              |          |

## Methods

| Method                | Type                                |
|-----------------------|-------------------------------------|
| `#prepareElementData` | `(data?: string \| undefined): any` |

## Events

| Event                          |
|--------------------------------|
| `wcp-stage-plugin:data-change` |
