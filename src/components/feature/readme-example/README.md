# wcp-readme-example

Shows an inline code example and a preview of the element in the readme.
This is used in the markdown formatter to render `html` examples.

In most cases you don't want to use this component directly, but rather use the `wcp-readme` element instead,
or the enhanced markdown renderer which instruments this element under the hood. It can be used with the
`renderMarkdown` function provided by the `@/utils/markdown.utils`.

**Mixins:** ColorSchemable

## Example

### Shows arbitrary HTML code example

```html
<wcp-readme-example>
  <pre slot="code">
&lt;h1&gt;Readme&lt;/h1&gt;
&lt;p&gt;Some readme content&lt;/p&gt;
  </pre>
  <div slot="preview">
    <h1>Readme</h1>
    <p>Some readme content</p>
  </div>
</wcp-readme-example>
```

## Slots

| Name      | Description              |
|-----------|--------------------------|
| `code`    | Code example             |
| `preview` | Rendered example preview |

## CSS Custom Properties

| Property                                  | Description                               |
|-------------------------------------------|-------------------------------------------|
| `--wcp-readme-example-border-radius`      | Border radius of the example              |
| `--wcp-readme-example-border-width`       | Border width of the example               |
| `--wcp-readme-example-dark-border-color`  | Border color of the example in dark mode  |
| `--wcp-readme-example-light-border-color` | Border color of the example in light mode |
| `--wcp-readme-example-spacing`            | Inner padding of the example              |
