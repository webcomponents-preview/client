# wcp-input-checkbox

A checkbox input element using the wcp style. Fully form aware.

**Mixins:** ColorSchemable

## Examples

## With optional label

```html
<wcp-input-checkbox label="With optional label"></wcp-input-checkbox>
```

## With initial value

```html
<wcp-input-checkbox checked label="With optional initial value"></wcp-input-checkbox>
```

## Used within a form

```html
<form>
  <wcp-input-checkbox label="Fully form enabled component"></wcp-input-checkbox>
  <button type="submit">Submit</button>
  <button type="reset">Reset</button>
</form>
```

## Properties

| Property       | Attribute      | Type                  | Default    |
|----------------|----------------|-----------------------|------------|
| `autocomplete` | `autocomplete` | `boolean`             | false      |
| `checked`      | `checked`      | `boolean`             | false      |
| `disabled`     | `disabled`     | `boolean`             | false      |
| `label`        | `label`        | `string \| undefined` |            |
| `name`         | `name`         | `string`              | "checkbox" |
| `required`     | `required`     | `boolean`             | false      |
| `value`        | `value`        | `string`              | "on"       |

## Methods

| Method              | Type                 |
|---------------------|----------------------|
| `checkValidity`     | `(): boolean`        |
| `formResetCallback` | `(): void`           |
| `handleInput`       | `(event: any): void` |

## Slots

| Name | Description                                     |
|------|-------------------------------------------------|
|      | Receives optional descriptions below the input. |

## CSS Custom Properties

| Property                                | Description                                      |
|-----------------------------------------|--------------------------------------------------|
| `--wcp-input-checkbox-border-radius`    | The border radius of the checkbox input.         |
| `--wcp-input-checkbox-dark-background`  | The background color of the checkbox input in dark mode. |
| `--wcp-input-checkbox-dark-border`      | The border color of the checkbox input in dark mode. |
| `--wcp-input-checkbox-dark-color`       | The fill color of the checkbox input when checked in dark mode. |
| `--wcp-input-checkbox-label-size`       | The font size of the label.                      |
| `--wcp-input-checkbox-label-spacing`    | The leading distance of the label to the input.  |
| `--wcp-input-checkbox-light-background` | The background color of the checkbox input in light mode. |
| `--wcp-input-checkbox-light-border`     | The border color of the checkbox input in light mode. |
| `--wcp-input-checkbox-light-color`      | The fill color of the checkbox input when checked in light mode. |
| `--wcp-input-checkbox-size`             | The size of the checkbox input.                  |
