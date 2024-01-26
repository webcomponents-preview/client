<!-- Auto Generated Below -->

# wcp-input-code

A text input element using the wcp style. Fully form aware.
Can display multiline text (textarea) if configured to do so.

## Properties

| Property   | Attribute  | Type                  | Default | Description                     |
|------------|------------|-----------------------|---------|---------------------------------|
| `autosize` | `autosize` | `boolean`             | false   |                                 |
| `disabled` | `disabled` | `boolean`             | false   |                                 |
| `label`    |            | `string`              |         | The label of the input element. |
| `language` | `language` | `"html"`              | "html"  |                                 |
| `name`     | `name`     | `string`              | "text"  |                                 |
| `required` | `required` | `boolean`             | false   |                                 |
| `value`    | `value`    | `string \| undefined` |         |                                 |

## Methods

| Method              | Type                        |
|---------------------|-----------------------------|
| `checkValidity`     | `(): boolean`               |
| `formResetCallback` | `(): void`                  |
| `handleInput`       | `(event: InputEvent): void` |
| `renderInput`       | `(id: string): any`         |

## Slots

| Name   | Description                                     |
|--------|-------------------------------------------------|
| `hint` | Receives optional descriptions below the input. |

## CSS Custom Properties

| Property                                  | Description                                      |
|-------------------------------------------|--------------------------------------------------|
| `--wcp-input-code-border-radius`          | The border radius of the input element.          |
| `--wcp-input-code-border-size`            | The border size of the input element.            |
| `--wcp-input-code-dark-background`        | The background color of the element in dark mode. |
| `--wcp-input-code-dark-background-lines`  | The background color of the line numbers in dark mode. |
| `--wcp-input-code-dark-border`            | The border color of the element in dark mode.    |
| `--wcp-input-code-dark-color`             | The font color of the input element in dark mode. |
| `--wcp-input-code-hint-size`              | The font size of the hint.                       |
| `--wcp-input-code-label-size`             | The font size of the label.                      |
| `--wcp-input-code-light-background`       | The background color of the element in light mode. |
| `--wcp-input-code-light-background-lines` | The background color of the line numbers in light mode. |
| `--wcp-input-code-light-border`           | The border color of the element in light mode.   |
| `--wcp-input-code-light-color`            | The font color of the input element in light mode. |
| `--wcp-input-code-spacing`                | The inner spacing of the input element.          |
