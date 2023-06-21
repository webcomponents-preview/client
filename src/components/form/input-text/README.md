# wcp-input-text

A text input element using the wcp style. Fully form aware.
Can display multiline text (textarea) if configured to do so.

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

| Property       | Attribute      | Type                                             | Default | Description                                      |
|----------------|----------------|--------------------------------------------------|---------|--------------------------------------------------|
| `autocomplete` | `autocomplete` | `boolean`                                        | false   |                                                  |
| `disabled`     | `disabled`     | `boolean`                                        | false   |                                                  |
| `label`        |                | `string`                                         |         | The label of the input element.                  |
| `multiline`    | `multiline`    | `boolean`                                        | false   |                                                  |
| `name`         | `name`         | `string`                                         | "text"  |                                                  |
| `readonly`     | `readonly`     | `boolean`                                        | false   |                                                  |
| `required`     | `required`     | `boolean`                                        | false   |                                                  |
| `type`         | `type`         | `"text" \| "email" \| "password" \| "search" \| "tel" \| "url"` | "text"  | Can be set to to `text`, `email`, `password`, `search`, `tel`, `url`.<br />Beware that this will be ignored if combined with the `multiline` attribute. |
| `value`        | `value`        | `string \| undefined`                            |         |                                                  |

## Methods

| Method              | Type                 |
|---------------------|----------------------|
| `checkValidity`     | `(): boolean`        |
| `formResetCallback` | `(): void`           |
| `handleInput`       | `(event: any): void` |
| `renderInput`       | `(id: string): any`  |

## Slots

| Name   | Description                                     |
|--------|-------------------------------------------------|
| `hint` | Receives optional descriptions below the input. |

## CSS Custom Properties

| Property                            | Description                                      |
|-------------------------------------|--------------------------------------------------|
| `--wcp-input-text-dark-background`  | The background color of the element in dark mode. |
| `--wcp-input-text-dark-border`      | The border color of the element in dark mode.    |
| `--wcp-input-text-dark-color`       | The font color of the input element in dark mode. |
| `--wcp-input-text-label-size`       | The font size of the label.                      |
| `--wcp-input-text-light-background` | The background color of the element in light mode. |
| `--wcp-input-text-light-border`     | The border color of the element in light mode.   |
| `--wcp-input-text-light-color`      | The font color of the input element in light mode. |
| `--wcp-input-text-spacing`          | The inner spacing of the input element.          |
