# wcp-navigation

## Example

### Usage with headline

```html
<wcp-navigation headline="Navigation">
  <wcp-navigation-item href="/home">Home</wcp-navigation-item>
  <wcp-navigation-item href="/about">About</wcp-navigation-item>
</wcp-navigation>
```

## Properties

| Property   | Attribute  | Type                  |
|------------|------------|-----------------------|
| `headline` | `headline` | `string \| undefined` |

## Slots

| Name | Description                       |
|------|-----------------------------------|
|      | Default slot for navigation items |

## CSS Custom Properties

| Property                                     | Description                                      |
|----------------------------------------------|--------------------------------------------------|
| `--wcp-navigation-dark-border-color`         | Border color of the navigation headline in dark mode |
| `--wcp-navigation-headline-dark-background`  | Background color of the navigation headline in dark mode |
| `--wcp-navigation-headline-light-background` | Background color of the navigation headline in light mode |
| `--wcp-navigation-headline-size`             | Font size of the navigation headline             |
| `--wcp-navigation-headline-spacing`          | Letter spacing of the navigation headline        |
| `--wcp-navigation-headline-weight`           | Font weight of the navigation headline           |
| `--wcp-navigation-light-border-color`        | Border color of the navigation headline in light mode |
| `--wcp-navigation-spacing`                   | Spacing between navigation and headline          |
| `--wcp-navigation-spacing-headline`          | Inner padding of the navigation headline         |
| `--wcp-navigation-spacing-items`             | Spacing between navigation items                 |
