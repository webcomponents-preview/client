<!-- Auto Generated Below -->

# wcp-button

Shows a button element.

**Mixins:** ColorSchemable

## Properties

| Property    | Attribute   | Type                                             | Default  | Description                                      |
|-------------|-------------|--------------------------------------------------|----------|--------------------------------------------------|
| `disabled`  | `disabled`  | `boolean`                                        | false    |                                                  |
| `href`      | `href`      | `string \| undefined`                            |          |                                                  |
| `kind`      | `kind`      | `"button" \| "icon"`                             | "button" | The kind of button to render. Either like a conventional button, or for<br />icons. Icon buttons are quadratic and will show a radial background on interaction. |
| `nowrap`    | `nowrap`    | `boolean`                                        | false    |                                                  |
| `stretched` | `stretched` | `boolean`                                        | false    | Allows stretching the button across the full width of its container.<br />This is useful for buttons that are used in a narrow form, or in general<br />on small viewports, like handheld devices. |
| `target`    | `target`    | `"_self" \| "_blank" \| "_parent" \| "_top" \| undefined` |          |                                                  |
| `type`      | `type`      | `"button" \| "reset" \| "submit"`                | "button" |                                                  |

## Methods

| Method              | Type       |
|---------------------|------------|
| `handleButtonClick` | `(): void` |

## Slots

| Name | Description                         |
|------|-------------------------------------|
|      | Default slot for the button content |

## CSS Custom Properties

| Property                                  | Description                                      |
|-------------------------------------------|--------------------------------------------------|
| `--wcp-button-dark-active-background`     | Background color of the button if active in dark mode |
| `--wcp-button-dark-active-border-color`   | Border color of the button if active in dark mode |
| `--wcp-button-dark-active-color`          | Text color of the button if active in dark mode  |
| `--wcp-button-dark-hover-background`      | Background color of the button if hovered in dark mode |
| `--wcp-button-dark-hover-border-color`    | Border color of the button if hovered in dark mode |
| `--wcp-button-dark-hover-color`           | Text color of the button if hovered in dark mode |
| `--wcp-button-dark-passive-background`    | Background color of the button if non interactive in dark mode |
| `--wcp-button-dark-passive-border-color`  | Border color of the button if non interactive in dark mode |
| `--wcp-button-dark-passive-color`         | Text color of the button if non interactive in dark mode |
| `--wcp-button-light-active-background`    | Background color of the button if active in light mode |
| `--wcp-button-light-active-border-color`  | Border color of the button if active in light mode |
| `--wcp-button-light-active-color`         | Text color of the button if active in light mode |
| `--wcp-button-light-hover-background`     | Background color of the button if hovered in light mode |
| `--wcp-button-light-hover-border-color`   | Border color of the button if hovered in light mode |
| `--wcp-button-light-hover-color`          | Text color of the button if hovered in light mode |
| `--wcp-button-light-passive-background`   | Background color of the button if non interactive in light mode |
| `--wcp-button-light-passive-border-color` | Border color of the button if non interactive in light mode |
| `--wcp-button-light-passive-color`        | Text color of the button if non interactive in light mode |
