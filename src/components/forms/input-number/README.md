<!-- Auto Generated Below -->

# wcp-input-number

A numeric input element using the wcp style. Fully form aware.

## Properties

| Property       | Attribute      | Type                  | Default | Description                     |
|----------------|----------------|-----------------------|---------|---------------------------------|
| `autocomplete` | `autocomplete` | `boolean`             | false   |                                 |
| `disabled`     | `disabled`     | `boolean`             | false   |                                 |
| `label`        |                | `string`              |         | The label of the input element. |
| `name`         | `name`         | `string`              | "text"  |                                 |
| `readonly`     | `readonly`     | `boolean`             | false   |                                 |
| `required`     | `required`     | `boolean`             | false   |                                 |
| `value`        | `value`        | `number \| undefined` |         |                                 |

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

| Property                              | Description                                      |
|---------------------------------------|--------------------------------------------------|
| `--wcp-input-number-dark-background`  | The background color of the element in dark mode. |
| `--wcp-input-number-dark-border`      | The border color of the element in dark mode.    |
| `--wcp-input-number-dark-color`       | The font color of the input element in dark mode. |
| `--wcp-input-number-hint-size`        | The font size of the hint.                       |
| `--wcp-input-number-label-size`       | The font size of the label.                      |
| `--wcp-input-number-light-background` | The background color of the element in light mode. |
| `--wcp-input-number-light-border`     | The border color of the element in light mode.   |
| `--wcp-input-number-light-color`      | The font color of the input element in light mode. |
| `--wcp-input-number-spacing`          | The inner spacing of the input element.          |
