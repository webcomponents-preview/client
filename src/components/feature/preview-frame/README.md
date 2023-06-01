# wcp-preview-frame

**Mixins:** ColorSchemable

## Example

```html
<wcp-preview-frame></wcp-preview-frame>
```

## Methods

| Method                   | Type                                         |
|--------------------------|----------------------------------------------|
| `emitActivePluginChange` | `(activePlugin?: string \| undefined): void` |

## Events

| Event                                    |
|------------------------------------------|
| `wcp-preview-frame:active-plugin-change` |

## Slots

| Name | Description                                      |
|------|--------------------------------------------------|
|      | The preview frame can be filled with any number of plugins. The plugins will be rendered as tabs. |

## CSS Custom Properties

| Property                                 | Description                                      |
|------------------------------------------|--------------------------------------------------|
| `--wcp-preview-frame-border-radius`      | Border radius of the preview frame               |
| `--wcp-preview-frame-border-width`       | Border width of the preview frame                |
| `--wcp-preview-frame-dark-background`    | Background color of the preview frame in dark mode |
| `--wcp-preview-frame-dark-border-color`  | Border color of the example section in dark mode |
| `--wcp-preview-frame-dark-color`         | Text color of the preview frame in dark mode     |
| `--wcp-preview-frame-distance`           | Outer margin of the preview frame                |
| `--wcp-preview-frame-light-background`   | Background color of the preview frame in light mode |
| `--wcp-preview-frame-light-border-color` | Border color of the example section in light mode |
| `--wcp-preview-frame-light-color`        | Text color of the preview frame in light mode    |
| `--wcp-preview-frame-spacing`            | Inner padding of the preview frame               |
