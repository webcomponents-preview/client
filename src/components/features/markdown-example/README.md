<!-- Auto Generated Below -->

# wcp-markdown-example

Shows an inline code example and a preview of the element in the readme.
This is used in the markdown formatter to render `html` examples.

In most cases you don't want to use this component directly, but rather use the `wcp-readme` element instead,
or the enhanced markdown renderer which instruments this element under the hood. It can be used with the
`renderMarkdown` function provided by the `@/utils/markdown.utils`.

**Mixins:** ColorSchemable

## Slots

| Name      | Description              |
|-----------|--------------------------|
| `code`    | Code example             |
| `preview` | Rendered example preview |

## CSS Custom Properties

| Property                                    | Description                               |
|---------------------------------------------|-------------------------------------------|
| `--wcp-markdown-example-border-radius`      | Border radius of the example              |
| `--wcp-markdown-example-border-width`       | Border width of the example               |
| `--wcp-markdown-example-dark-border-color`  | Border color of the example in dark mode  |
| `--wcp-markdown-example-light-border-color` | Border color of the example in light mode |
| `--wcp-markdown-example-spacing`            | Inner padding of the example              |
