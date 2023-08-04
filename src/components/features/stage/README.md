# wcp-stage

**Mixins:** ColorSchemable

## Example

```html
<wcp-stage></wcp-stage>
```

## Methods

| Method                   | Type                                         |
|--------------------------|----------------------------------------------|
| `emitActivePluginChange` | `(activePlugin?: string \| undefined): void` |

## Events

| Event                            |
|----------------------------------|
| `wcp-stage:active-plugin-change` |

## Slots

| Name | Description                                      |
|------|--------------------------------------------------|
|      | The preview frame can be filled with any number of plugins. The plugins will be rendered as tabs. |

## CSS Custom Properties

| Property                         | Description                                      |
|----------------------------------|--------------------------------------------------|
| `--wcp-stage-border-radius`      | Border radius of the preview frame               |
| `--wcp-stage-border-width`       | Border width of the preview frame                |
| `--wcp-stage-dark-background`    | Background color of the preview frame in dark mode |
| `--wcp-stage-dark-border-color`  | Border color of the example section in dark mode |
| `--wcp-stage-dark-color`         | Text color of the preview frame in dark mode     |
| `--wcp-stage-distance`           | Outer margin of the preview frame                |
| `--wcp-stage-light-background`   | Background color of the preview frame in light mode |
| `--wcp-stage-light-border-color` | Border color of the example section in light mode |
| `--wcp-stage-light-color`        | Text color of the preview frame in light mode    |
| `--wcp-stage-spacing`            | Inner padding of the preview frame               |
