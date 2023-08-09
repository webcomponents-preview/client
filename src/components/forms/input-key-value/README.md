# wcp-input-key-value

A key-value input element using the wcp style. Fully form aware.

## Examples

## With optional label

```html
<wcp-input-key-value label="With optional label"></wcp-input-key-value>
```

## Used within a form

```html
<form onsubmit="console.log(Array.from(new FormData(this).entries()));return false" onreset="console.log('Reset!')">
  <input type="hidden" name="hidden" value="hidden" />
  <wcp-input-key-value name="embedded" label="Fully form enabled component"></wcp-input-key-value>
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
| `name`         | `name`         | `string \| undefined` |         |                                 |
| `required`     | `required`     | `boolean`             | false   |                                 |
| `value`        | `value`        | `string \| undefined` |         |                                 |

## Methods

| Method              | Type                 |
|---------------------|----------------------|
| `checkValidity`     | `(): boolean`        |
| `formResetCallback` | `(): void`           |
| `handleKeyInput`    | `(event: any): void` |
| `handleValueInput`  | `(event: any): void` |
| `renderInput`       | `(id: string): any`  |

## Slots

| Name   | Description                                     |
|--------|-------------------------------------------------|
| `hint` | Receives optional descriptions below the input. |

## CSS Custom Properties

| Property                       | Description                                   |
|--------------------------------|-----------------------------------------------|
| `--wcp-input-key-value-gutter` | The gutter between the key-value pair inputs. |
