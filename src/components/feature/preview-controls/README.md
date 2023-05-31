# wcp-preview-controls

A wrapper above the preview frame content to contain various controls.

**Mixins:** ColorSchemable

## Example

### Usage with controls

```html
<wcp-preview-controls>
  <wcp-toggle-sidebar></wcp-toggle-sidebar>
  <wcp-toggle-color-scheme></wcp-toggle-color-scheme>
</wcp-preview-controls>
```

## Slots

| Name | Description                       |
|------|-----------------------------------|
|      | Default slot for navigation items |

## CSS Custom Properties

| Property                             | Description                                    |
|--------------------------------------|------------------------------------------------|
| `--wcp-preview-controls-dark-color`  | Text color of the controls in dark mode        |
| `--wcp-preview-controls-height`      | Overall height of the preview controls nav bar |
| `--wcp-preview-controls-light-color` | Text color of the controls in light mode       |
| `--wcp-preview-controls-spacing`     | Inner spacing, used as padding of the controls |
