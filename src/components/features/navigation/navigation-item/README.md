<!-- Auto Generated Below -->

# wcp-navigation-item

**Mixins:** ColorSchemable

## Examples

### Non-interactive

This will probably only be used for the active item.

```html
<wcp-navigation-item>
  Non-interactive
</wcp-navigation-item>
```

### With link

```html
<wcp-navigation-item href="/home">
  Home
</wcp-navigation-item>
```

## Properties

| Property | Attribute | Type                  | Default |
|----------|-----------|-----------------------|---------|
| `active` | `active`  | `boolean`             | false   |
| `href`   | `href`    | `string \| undefined` |         |

## Slots

| Name | Description               |
|------|---------------------------|
|      | Default slot for contents |

## CSS Custom Properties

| Property                                         | Description                                      |
|--------------------------------------------------|--------------------------------------------------|
| `--wcp-navigation-item-dark-active-background`   | Background color of the item when active in dark mode |
| `--wcp-navigation-item-dark-active-color`        | Text color of the item when active in dark mode  |
| `--wcp-navigation-item-dark-hover-background`    | Background color of the item when hovered in dark mode |
| `--wcp-navigation-item-dark-hover-color`         | Text color of the item when hovered in dark mode |
| `--wcp-navigation-item-dark-passive-background`  | Background color of the item when non interactive in dark mode |
| `--wcp-navigation-item-dark-passive-color`       | Text color of the item when non interactive in dark mode |
| `--wcp-navigation-item-light-active-background`  | Background color of the item when active in light mode |
| `--wcp-navigation-item-light-active-color`       | Text color of the item when active in light mode |
| `--wcp-navigation-item-light-hover-background`   | Background color of the item when hovered in light mode |
| `--wcp-navigation-item-light-hover-color`        | Text color of the item when hovered in light mode |
| `--wcp-navigation-item-light-passive-background` | Background color of the item when non interactive in light mode |
| `--wcp-navigation-item-light-passive-color`      | Text color of the item when non interactive in light mode |
| `--wcp-navigation-item-spacing`                  | Inner padding of the item                        |
