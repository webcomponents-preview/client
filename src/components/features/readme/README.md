# wcp-readme

Displays a Readme file by its URL.

**Mixins:** ColorSchemable

## Example

```html
<wcp-readme markdown="# Hello _World_!"></wcp-readme>
```

## Properties

| Property          | Attribute          | Modifiers | Type                  | Default |
|-------------------|--------------------|-----------|-----------------------|---------|
| `hash`            | `hash`             | readonly  | `string \| undefined` |         |
| `markdown`        | `markdown`         | readonly  | `""`                  | ""      |
| `previewTagName`  | `preview-tag-name` | readonly  | `string \| undefined` |         |
| `showCodePreview` | `add-code-preview` | readonly  | `false`               | false   |

## Methods

| Method       | Type                      |
|--------------|---------------------------|
| `scrollToId` | `(section: string): void` |

## CSS Custom Properties

| Property                                  | Description                                      |
|-------------------------------------------|--------------------------------------------------|
| `--wcp-readme-dark-border-color`          | Border color of the readme in dark mode.         |
| `--wcp-readme-dark-color`                 | Text color of the readme in dark mode.           |
| `--wcp-readme-dark-color-accent`          | Accent text color (e.g. links) of the readme in dark mode. |
| `--wcp-readme-dark-color-muted`           | Muted text color of the readme in dark mode.     |
| `--wcp-readme-dark-highlight-background`  | Background color of highlighted table rows in dark mode. |
| `--wcp-readme-light-border-color`         | Border color of the readme in light mode.        |
| `--wcp-readme-light-color`                | Text color of the readme in light mode.          |
| `--wcp-readme-light-color-accent`         | Accent text color (e.g. links) of the readme in light mode. |
| `--wcp-readme-light-color-muted`          | Muted text color of the readme in light mode.    |
| `--wcp-readme-light-highlight-background` | Background color of highlighted table rows in light mode. |
