# wcp-preview

Previews given content.

**Mixins:** ColorSchemable

## Example

```html
<wcp-preview>
  <wcp-button>Example button</wcp-button>
</wcp-preview>
```

## Properties

| Property         | Attribute          | Type                  |
|------------------|--------------------|-----------------------|
| `config`         |                    |                       |
| `previewTagName` | `preview-tag-name` | `string \| undefined` |

## Methods

| Method                    | Type       |
|---------------------------|------------|
| `#syncStageOverlayScroll` | `(): void` |

## Slots

| Name | Description             |
|------|-------------------------|
|      | The content to preview. |

## CSS Custom Properties

| Property                                  | Description                                      |
|-------------------------------------------|--------------------------------------------------|
| `--wcp-preview-menu-background-opacity`   | Opacity of the expanding menu background.        |
| `--wcp-preview-menu-border-radius`        | Border radius of the expanding menu.             |
| `--wcp-preview-menu-dark-background-raw`  | Background color of the expanding menu in dark mode. Must be a raw space-separated HSL color value list. |
| `--wcp-preview-menu-light-background-raw` | Background color of the expanding menu in light mode. Must be a raw space-separated HSL color value list. |
