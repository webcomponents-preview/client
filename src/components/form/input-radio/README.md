# wcp-input-radio

A radio input element using the wcp style. Fully form aware.

**Mixins:** ColorSchemable

## Examples

## With optional label

```html
<wcp-input-radio label="With optional label"></wcp-input-radio>
```

## With initial value

```html
<wcp-input-radio checked label="With optional initial value"></wcp-input-radio>
```

## Used within a form

```html
<form>
  <wcp-input-radio label="Fully form enabled component"></wcp-input-radio>
  <button type="submit">Submit</button>
  <button type="reset">Reset</button>
</form>
```

## Properties

| Property       | Attribute      | Type                  | Default |
|----------------|----------------|-----------------------|---------|
| `autocomplete` | `autocomplete` | `boolean`             | false   |
| `checked`      | `checked`      | `boolean`             | false   |
| `disabled`     | `disabled`     | `boolean`             | false   |
| `label`        | `label`        | `string \| undefined` |         |
| `name`         | `name`         | `string`              | "radio" |
| `required`     | `required`     | `boolean`             | false   |
| `value`        | `value`        | `string`              | "on"    |

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
| `--wcp-input-radio-dark-active-color`   | The fill color of the radio input when checked in dark mode. |
| `--wcp-input-radio-dark-background`     | The background color of the radio input in dark mode. |
| `--wcp-input-radio-dark-border`         | The border color of the radio input in dark mode. |
| `--wcp-input-radio-dark-passive-color`  | The fill color of the radio input when not checked in dark mode. |
| `--wcp-input-radio-label-size`          | The font size of the label.                      |
| `--wcp-input-radio-label-spacing`       | The leading distance of the label to the input.  |
| `--wcp-input-radio-light-active-color`  | The fill color of the radio input when checked in light mode. |
| `--wcp-input-radio-light-background`    | The background color of the radio input in light mode. |
| `--wcp-input-radio-light-border`        | The border color of the radio input in light mode. |
| `--wcp-input-radio-light-passive-color` | The fill color of the radio input when not checked in light mode. |
| `--wcp-input-radio-size`                | The size of the radio input.                     |