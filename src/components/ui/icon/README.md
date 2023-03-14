# wcp-icon

Shows an icon from the css.gg icon set.

## Examples

## Use icon
By setting the name attribute.

```html
<wcp-icon name="smartphone"></wcp-icon>
```

### Set a custom ~~size~~ _scale_

It is not recommended to set this value yet, until a proper icon set is used and the icon sizes can be set explicitly. \
The approach of the currently used icons is to (CSS) transform by a given scale, which breaks the layout boundaries.

```html
<example style="display: inline-block; height: 22px; width: 22px; border: 5px solid rgba(255, 0, 0, .5)">
  <wcp-icon name="laptop" style="--wcp-icon-scale: 2"></wcp-icon>
</example>
```

## Properties

| Property | Attribute | Type     |
|----------|-----------|----------|
| `name`   | `name`    | `string` |

## CSS Custom Properties

| Property           | Description                                      |
|--------------------|--------------------------------------------------|
| `--wcp-icon-scale` | Sets the scale of the icon, where 1 is the default scale at a size of 22px. It is not<br />recommended to set this value yet, until a proper icon set is used and the icon sizes can be set explicitly. The<br />approach of the currently used icons is to (CSS) transform by a given scale, which breaks the layout boundaries. |
