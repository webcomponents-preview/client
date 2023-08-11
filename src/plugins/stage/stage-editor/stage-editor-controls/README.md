# wcp-stage-editor-controls

**Mixins:** ColorSchemable

## Properties

| Property         | Attribute          | Modifiers | Type     |
|------------------|--------------------|-----------|----------|
| `data`           | `data`             | readonly  |          |
| `previewTagName` | `preview-tag-name` |           | `string` |

## Events

| Event                             | Type                    | Description                                  |
|-----------------------------------|-------------------------|----------------------------------------------|
| `wcp-stage-editor-controls:input` | `CustomEvent<FormData>` | Fires when the user changes a control value. |

## CSS Custom Properties

| Property                                         | Description                                    |
|--------------------------------------------------|------------------------------------------------|
| `--wcp-stage-editor-controls-dark-border-color`  | The border color of the element in dark mode.  |
| `--wcp-stage-editor-controls-headline-size`      | The font size of the headline.                 |
| `--wcp-stage-editor-controls-headline-spacing`   | The inner spacing of the headline.             |
| `--wcp-stage-editor-controls-headline-weight`    | The font weight of the headline.               |
| `--wcp-stage-editor-controls-light-border-color` | The border color of the element in light mode. |
