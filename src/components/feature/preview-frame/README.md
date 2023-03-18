# wcp-preview-frame

**Mixins:** ColorSchemable

## Example

```html
<wcp-preview-frame></wcp-preview-frame>
```

## Properties

| Property        | Attribute       | Type                                    | Default |
|-----------------|-----------------|-----------------------------------------|---------|
| `activeElement` | `activeElement` | `CustomElementDeclaration \| undefined` |         |
| `examples`      |                 | `string[]`                              | []      |
| `preview`       |                 | `string`                                | ""      |

## CSS Custom Properties

| Property                                 | Description                                      |
|------------------------------------------|--------------------------------------------------|
| `--wcp-preview-frame-border-width`       | Border width of the example section              |
| `--wcp-preview-frame-dark-background`    | Background color of the preview frame in dark mode |
| `--wcp-preview-frame-dark-border-color`  | Border color of the example section in dark mode |
| `--wcp-preview-frame-dark-color`         | Text color of the preview frame in dark mode     |
| `--wcp-preview-frame-distance`           | Outer margin of the preview frame                |
| `--wcp-preview-frame-light-background`   | Background color of the preview frame in light mode |
| `--wcp-preview-frame-light-border-color` | Border color of the example section in light mode |
| `--wcp-preview-frame-light-color`        | Text color of the preview frame in light mode    |
| `--wcp-preview-frame-spacing`            | Inner padding of the preview frame               |
