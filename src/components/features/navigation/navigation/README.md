<!-- Auto Generated Below -->

# wcp-navigation

**Mixins:** ColorSchemable

## Examples

### Usage with headline

```html
<wcp-navigation headline="Navigation">
  <wcp-navigation-item href="/home">Home</wcp-navigation-item>
  <wcp-navigation-item href="/about">About</wcp-navigation-item>
</wcp-navigation>
```

### Nested navigation

```html
<wcp-navigation headline="Navigation">
  <wcp-navigation-item href="/home">Home</wcp-navigation-item>

  <wcp-navigation nested headline="Nested">
    <wcp-navigation-item href="/about">About</wcp-navigation-item>
    <wcp-navigation-item href="/imprint">Imprint</wcp-navigation-item>
  </wcp-navigation>
</wcp-navigation>
```

## Properties

| Property   | Attribute  | Type                  | Default |
|------------|------------|-----------------------|---------|
| `headline` | `headline` | `string \| undefined` |         |
| `nested`   | `nested`   | `boolean`             | false   |

## Slots

| Name | Description                                      |
|------|--------------------------------------------------|
|      | Default slot for navigation items or nested navigation |

## CSS Custom Properties

| Property                                     | Description                                      |
|----------------------------------------------|--------------------------------------------------|
| `--wcp-navigation-dark-border-color`         | Border color of the navigation headline in dark mode |
| `--wcp-navigation-headline-dark-background`  | Background color of the navigation headline in dark mode |
| `--wcp-navigation-headline-light-background` | Background color of the navigation headline in light mode |
| `--wcp-navigation-headline-size`             | Font size of the navigation headline             |
| `--wcp-navigation-headline-spacing`          | Letter spacing of the navigation headline        |
| `--wcp-navigation-headline-weight`           | Font weight of the navigation headline           |
| `--wcp-navigation-inset`                     | Inset of the navigation if nested (is applied on each level) |
| `--wcp-navigation-light-border-color`        | Border color of the navigation headline in light mode |
| `--wcp-navigation-spacing`                   | Spacing between navigation and headline          |
| `--wcp-navigation-spacing-headline`          | Inner padding of the navigation headline         |
| `--wcp-navigation-spacing-items`             | Spacing between navigation items                 |
