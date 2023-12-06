<!-- Auto Generated Below -->

# wcp-input-key-value-pairs

A key-value pairs editor. Integrates into forms and allows editing string based form data.

## Examples

## With optional label

```html
<wcp-input-key-value-pairs label="With optional label"></wcp-input-key-value-pairs>
```

## Used within a form

```html
<form oninput="console.log(Array.from(new FormData(this).entries()))" onsubmit="console.log(Array.from(new FormData(this).entries()));return false" onreset="console.log('Reset!')">
  <wcp-input-key-value-pairs name="embedded." label="Fully form enabled component"></wcp-input-key-value-pairs>
  <button type="submit">Submit</button>
  <button type="reset">Reset</button>
</form>
```

## Properties

| Property       | Attribute      | Modifiers | Type              | Default      | Description                                      |
|----------------|----------------|-----------|-------------------|--------------|--------------------------------------------------|
| `autocomplete` | `autocomplete` |           | `boolean`         | false        |                                                  |
| `disabled`     | `disabled`     |           | `boolean`         | false        |                                                  |
| `form`         |                | readonly  | `HTMLFormElement` |              |                                                  |
| `label`        |                |           | `string`          |              | The label of the input element.                  |
| `name`         | `name`         |           | `string`          | "key-value." | The name acts as a prefix to the form data keys. |
| `pairs`        |                |           | `object`          |              |                                                  |
| `required`     | `required`     |           | `boolean`         | false        |                                                  |
| `value`        |                |           |                   |              |                                                  |

## Methods

| Method              | Type                        |
|---------------------|-----------------------------|
| `checkValidity`     | `(): boolean`               |
| `formResetCallback` | `(): void`                  |
| `handleInput`       | `(): void`                  |
| `handleRemoveClick` | `(event: MouseEvent): void` |
| `renderInput`       | `(): any`                   |

## Events

| Event   |
|---------|
| `input` |

## Slots

| Name   | Description                                     |
|--------|-------------------------------------------------|
| `hint` | Receives optional descriptions below the input. |

## CSS Custom Properties

| Property                             | Description                                   |
|--------------------------------------|-----------------------------------------------|
| `--wcp-input-key-value-pairs-gutter` | The gutter between the key-value pair inputs. |
