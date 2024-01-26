<!-- Auto Generated Below -->

# wcp-input-radio

A radio input element using the wcp style. Fully form aware.

## Properties

| Property       | Attribute      | Type      | Default | Description                     |
|----------------|----------------|-----------|---------|---------------------------------|
| `autocomplete` | `autocomplete` | `boolean` | false   |                                 |
| `checked`      | `checked`      | `boolean` |         |                                 |
| `disabled`     | `disabled`     | `boolean` | false   |                                 |
| `label`        |                | `string`  |         | The label of the input element. |
| `name`         | `name`         | `string`  | "radio" |                                 |
| `required`     | `required`     | `boolean` | false   |                                 |
| `value`        | `value`        | `string`  | "on"    |                                 |

## Methods

| Method              | Type                   |
|---------------------|------------------------|
| `checkValidity`     | `(): boolean`          |
| `formResetCallback` | `(): void`             |
| `handleInput`       | `(event: Event): void` |
| `renderInput`       | `(id: string): any`    |

## Slots

| Name   | Description                                     |
|--------|-------------------------------------------------|
| `hint` | Receives optional descriptions below the input. |

## CSS Custom Properties

| Property                             | Description                                      |
|--------------------------------------|--------------------------------------------------|
| `--wcp-input-radio-border-radius`    | The border radius of the radio input.            |
| `--wcp-input-radio-border-size`      | The border size of the radio input.              |
| `--wcp-input-radio-dark-background`  | The background color of the radio input in dark mode. |
| `--wcp-input-radio-dark-border`      | The border color of the radio input in dark mode. |
| `--wcp-input-radio-dark-color`       | The fill color of the radio input when checked in dark mode. |
| `--wcp-input-radio-hint-size`        | The font size of the hint.                       |
| `--wcp-input-radio-label-size`       | The font size of the label.                      |
| `--wcp-input-radio-light-background` | The background color of the radio input in light mode. |
| `--wcp-input-radio-light-border`     | The border color of the radio input in light mode. |
| `--wcp-input-radio-light-color`      | The fill color of the radio input when checked in light mode. |
| `--wcp-input-radio-size`             | The size of the radio input.                     |
| `--wcp-input-radio-spacing`          | The leading distance of the label to the input.  |
