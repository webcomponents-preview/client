<!-- Auto Generated Below -->

# wcp-stage-editor

Allows editing a custom element.

**Mixins:** ColorSchemable

## Properties

| Property         | Attribute          | Modifiers | Type                  | Default  |
|------------------|--------------------|-----------|-----------------------|----------|
| `available`      | `available`        | readonly  | `true`                | true     |
| `data`           | `data`             |           | `string \| undefined` |          |
| `label`          |                    | readonly  | `"Editor"`            | "Editor" |
| `name`           |                    | readonly  | `"editor"`            | "editor" |
| `previewTagName` | `preview-tag-name` |           | `string`              |          |

## Methods

| Method                | Type                                      |
|-----------------------|-------------------------------------------|
| `#prepareElementData` | `(compressed?: string \| undefined): any` |

## Events

| Event                          |
|--------------------------------|
| `wcp-stage-plugin:data-change` |
