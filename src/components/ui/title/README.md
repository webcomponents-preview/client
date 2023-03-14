# wcp-title

Shows the application title and a logo.

## Example

```html
<wcp-title title="Web Components Preview">
  <img slot="logo" src="assets/icons/logo.svg" height="30px" />
</wcp-title>
```

## Properties

| Property | Attribute | Type     |
|----------|-----------|----------|
| `title`  | `title`   | `string` |

## Slots

| Name   | Description                         |
|--------|-------------------------------------|
| `logo` | Receives the logo image to be shown |

## CSS Custom Properties

| Property                           | Description                                      |
|------------------------------------|--------------------------------------------------|
| `--wcp-title-gap`                  | The gap between the logo and the title           |
| `--wcp-title-headline-line-height` | The line height of the title                     |
| `--wcp-title-headline-size`        | The font size of the title                       |
| `--wcp-title-headline-spacing`     | The letter spacing of the title                  |
| `--wcp-title-headline-transform`   | The text transform of the title                  |
| `--wcp-title-headline-weight`      | The font weight of the title                     |
| `--wcp-title-height`               | The height of the title. Content may exceed and scales the tile |
| `--wcp-title-spacing`              | Inner padding of the title                       |
