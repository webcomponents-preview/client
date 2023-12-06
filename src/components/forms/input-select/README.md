<!-- Auto Generated Below -->

# wcp-input-select

A numeric input element using the wcp style. Fully form aware.

## Examples

## With optional label

```html
<wcp-input-select label="With optional label">
  <wcp-input-select-option value="foo" label="Foo"></wcp-input-select-option>
  <wcp-input-select-option value="bar" label="Bar"></wcp-input-select-option>
  <wcp-input-select-option value="baz" label="Baz"></wcp-input-select-option>
</wcp-input-select>
```

## With disabled options

```html
<wcp-input-select label="With disabled options">
  <wcp-input-select-option value="foo" label="Foo"></wcp-input-select-option>
  <wcp-input-select-option value="bar" label="Bar" disabled></wcp-input-select-option>
  <wcp-input-select-option value="baz" label="Baz"></wcp-input-select-option>
</wcp-input-select>
```

## With optional initial value

```html
<wcp-input-select label="With optional initial value" value="bar">
  <wcp-input-select-option value="foo" label="Foo"></wcp-input-select-option>
  <wcp-input-select-option value="bar" label="Bar"></wcp-input-select-option>
  <wcp-input-select-option value="baz" label="Baz"></wcp-input-select-option>
</wcp-input-select>
```

## Used within a form

```html
<form onsubmit="console.log(Array.from(new FormData(this).entries()));return false" onreset="console.log('Reset!')">
  <wcp-input-select label="Fully form enabled component">
    <wcp-input-select-option value="foo" label="Foo"></wcp-input-select-option>
    <wcp-input-select-option value="bar" label="Bar"></wcp-input-select-option>
    <wcp-input-select-option value="baz" label="Baz"></wcp-input-select-option>
  </wcp-input-select>
  <button type="submit">Submit</button>
  <button type="reset">Reset</button>
</form>
```

## Properties

| Property       | Attribute      | Type                  | Default | Description                     |
|----------------|----------------|-----------------------|---------|---------------------------------|
| `autocomplete` | `autocomplete` | `boolean`             | false   |                                 |
| `disabled`     | `disabled`     | `boolean`             | false   |                                 |
| `label`        |                | `string`              |         | The label of the input element. |
| `name`         | `name`         | `string`              | "text"  |                                 |
| `readonly`     | `readonly`     | `boolean`             | false   |                                 |
| `required`     | `required`     | `boolean`             | false   |                                 |
| `value`        | `value`        | `string \| undefined` |         |                                 |

## Methods

| Method              | Type                   |
|---------------------|------------------------|
| `checkValidity`     | `(): boolean`          |
| `formResetCallback` | `(): void`             |
| `handleInput`       | `(event: Event): void` |
| `handleSlotChange`  | `(event: Event): void` |
| `renderInput`       | `(id: string): any`    |

## Slots

| Name   | Description                                      |
|--------|--------------------------------------------------|
|        | Projects options into the select elements dropdown menu. |
| `hint` | Receives optional descriptions below the input.  |

## CSS Custom Properties

| Property                              | Description                                      |
|---------------------------------------|--------------------------------------------------|
| `--wcp-input-select-arrow-size`       | The size of the arrow icon.                      |
| `--wcp-input-select-dark-background`  | The background color of the element in dark mode. |
| `--wcp-input-select-dark-border`      | The border color of the element in dark mode.    |
| `--wcp-input-select-dark-color`       | The font color of the input element in dark mode. |
| `--wcp-input-select-hint-size`        | The font size of the hint.                       |
| `--wcp-input-select-label-size`       | The font size of the label.                      |
| `--wcp-input-select-light-background` | The background color of the element in light mode. |
| `--wcp-input-select-light-border`     | The border color of the element in light mode.   |
| `--wcp-input-select-light-color`      | The font color of the input element in light mode. |
| `--wcp-input-select-spacing`          | The inner spacing of the input element.          |
