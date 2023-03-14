# wcp-button

Shows a button element.

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

| Property                            | Description                                      |
|-------------------------------------|--------------------------------------------------|
| `--wcp-button-active-background`    | Background color of the button if active         |
| `--wcp-button-active-border-color`  | Border color of the button if active             |
| `--wcp-button-active-color`         | Text color of the button if active               |
| `--wcp-button-hover-background`     | Background color of the button if hovered        |
| `--wcp-button-hover-border-color`   | Border color of the button if hovered            |
| `--wcp-button-hover-color`          | Text color of the button if hovered              |
| `--wcp-button-passive-background`   | Background color of the button if non interactive |
| `--wcp-button-passive-border-color` | Border color of the button if non interactive    |
| `--wcp-button-passive-color`        | Text color of the button if non interactive      |
