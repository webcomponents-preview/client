# wcp-button

Shows a button element.

**Mixins:** ColorSchemable

## Examples

## Default button

```html
<wcp-button>Click me!</wcp-button>
```

## Button with icon

```html
<wcp-button kind="icon">
 <wcp-icon name="menu"></wcp-icon>
</wcp-button>
```

## Use as native submit button in form

```html
<form onsubmit="alert('Submit!'); return false">
 <wcp-button type="submit">Submit</wcp-button>
</form>
```

## Use as native reset button in form

```html
<form onreset="alert('Reset!'); return false">
  <wcp-button type="reset">Reset</wcp-button>
</form>
```

## Properties

| Property    | Attribute   | Type                                             | Default  |
|-------------|-------------|--------------------------------------------------|----------|
| `disabled`  | `disabled`  | `boolean`                                        | false    |
| `href`      | `href`      | `string \| undefined`                            |          |
| `kind`      | `kind`      | `"button" \| "icon"`                             | "button" |
| `nowrap`    | `nowrap`    | `boolean`                                        | false    |
| `stretched` | `stretched` | `boolean`                                        | false    |
| `target`    | `target`    | `"_self" \| "_blank" \| "_parent" \| "_top" \| undefined` |          |
| `type`      | `type`      | `"button" \| "reset" \| "submit"`                | "button" |

## Methods

| Method              | Type       |
|---------------------|------------|
| `handleButtonClick` | `(): void` |

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
