# wcp-input-text

A text input element using the wcp style. Fully form aware.
Can display multiline text (textarea) if configured to do so.

**Mixins:** ColorSchemable

## Examples

## With optional label

```html
<wcp-input-text label="With optional label"></wcp-input-text>
```

## With optional initial value

```html
<wcp-input-text label="With optional initial value" value="Foo"></wcp-input-text>
```

## Multiline

```html
<wcp-input-text multiline label="With multiline value"></wcp-input-text>
```

## Used within a form

```html
<form>
  <wcp-input-text label="Fully form enabled component"></wcp-input-text>
  <button type="submit">Submit</button>
  <button type="reset">Reset</button>
</form>
```

## Properties

| Property       | Attribute      | Type                  | Default |
|----------------|----------------|-----------------------|---------|
| `autocomplete` | `autocomplete` | `boolean`             | false   |
| `disabled`     | `disabled`     | `boolean`             | false   |
| `input`        |                |                       |         |
| `label`        | `label`        | `string \| undefined` |         |
| `multiline`    | `multiline`    | `boolean`             | false   |
| `name`         | `name`         | `string`              | "text"  |
| `required`     | `required`     | `boolean`             | false   |
| `value`        | `value`        | `string \| undefined` |         |

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

| Property                           | Description                                      |
|------------------------------------|--------------------------------------------------|
| `--wcp-input-text-dark-background` | The background color of the element in dark mode. |
| `--wcp-input-text-dark-border`     | The border color of the element in dark mode.    |
| `--wcp-input-text-dark-color`      | The font color of the input element in dark mode. |
| `--wcp-input-text-label-size`      | The font size of the label.                      |
| `--wcp-input-text-label-spacing`   | The spacing between the label and the input.     |
| `--wcp-input-text-spacing`         | The inner spacing of the input element.          |
