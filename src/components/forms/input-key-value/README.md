<!-- Auto Generated Below -->

# wcp-input-key-value

A key-value input element using the wcp style. Fully form aware.

## Properties

| Property       | Attribute      | Type                  | Default | Description                     |
|----------------|----------------|-----------------------|---------|---------------------------------|
| `autocomplete` | `autocomplete` | `boolean`             | false   |                                 |
| `disabled`     | `disabled`     | `boolean`             | false   |                                 |
| `label`        |                | `string`              |         | The label of the input element. |
| `name`         | `name`         | `string \| undefined` |         |                                 |
| `required`     | `required`     | `boolean`             | false   |                                 |
| `value`        | `value`        | `string \| undefined` |         |                                 |

## Methods

| Method              | Type                        |
|---------------------|-----------------------------|
| `checkValidity`     | `(): boolean`               |
| `formResetCallback` | `(): void`                  |
| `handleKeyInput`    | `(event: InputEvent): void` |
| `handleValueInput`  | `(event: InputEvent): void` |
| `renderInput`       | `(id: string): any`         |

## Slots

| Name   | Description                                     |
|--------|-------------------------------------------------|
| `hint` | Receives optional descriptions below the input. |

## CSS Custom Properties

| Property                       | Description                                   |
|--------------------------------|-----------------------------------------------|
| `--wcp-input-key-value-gutter` | The gutter between the key-value pair inputs. |
