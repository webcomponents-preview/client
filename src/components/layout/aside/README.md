# wcp-aside

To toggle the side bar remotely, you can dispatch a custom event on the global window object:
```js
window.dispatchEvent(new CustomEvent('wcp-aside:toggle'));
```
You may pass an optional boolean value to the event to toggle the side bar to a specific state:
```js
window.dispatchEvent(new CustomEvent('wcp-aside:toggle', { detail: true }));
```

## Properties

| Property            | Attribute   | Type      | Default                                          | Description                                      |
|---------------------|-------------|-----------|--------------------------------------------------|--------------------------------------------------|
| `collapsed`         | `collapsed` | `boolean` | false                                            | Used to toggle the width of the aside bar        |
| `listenAsideToggle` |             |           | "(({ detail = !this.collapsed }: CustomEvent<boolean>) => {\n    this.collapsed = detail;\n    this.emitToggled();\n  }).bind(this)" |                                                  |
| `role`              | `role`      | `string`  | "complementary"                                  | Presets the aria role to `complementary` as we do not use te aside element directly |

## Methods

| Method              | Type       |
|---------------------|------------|
| `emitToggled`       | `(): void` |
| `handleAsideToggle` | `(): void` |

## Events

| Event               | Type                   | Description                                      |
|---------------------|------------------------|--------------------------------------------------|
| `wcp-aside-toggled` |                        | Dispatches this event when the side bar has been toggled. Do not get confused with the `wcp-aside:toggle` event. |
| `wcp-aside:toggled` | `CustomEvent<boolean>` |                                                  |

## Slots

| Name | Description                              |
|------|------------------------------------------|
|      | Projects elements aside the main content |

## CSS Custom Properties

| Property                               | Description                                      |
|----------------------------------------|--------------------------------------------------|
| `--wcp-aside-collapsed-width`          | The width of the aside bar when collapsed        |
| `--wcp-aside-dark-background`          | The background color of the side bar in dark mode |
| `--wcp-aside-dark-color`               | The color of the side bar in dark mode           |
| `--wcp-aside-expanded-width`           | The width of the aside bar when expanded         |
| `--wcp-aside-light-background`         | The background color of the side bar in light mode |
| `--wcp-aside-light-color`              | The color of the side bar in light mode          |
| `--wcp-aside-spacing`                  | Inner padding of the aside bar                   |
| `--wcp-aside-toggle-offset-horizontal` | The horizontal offset of the toggle button       |
| `--wcp-aside-toggle-offset-vertical`   | The vertical offset of the toggle button         |
| `--wcp-aside-toggle-size`              | The size of the toggle button                    |
