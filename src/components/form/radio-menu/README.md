# wcp-radio-menu

A radio menu element using the WCP style. Fully form aware.

## Examples

## With optional label

```html
<wcp-radio-menu label="With optional label">
  <wcp-input-radio label="foo" value="foo"></wcp-input-radio>
  <wcp-input-radio label="bar" value="bar"></wcp-input-radio>
  <wcp-input-radio label="baz" value="baz"></wcp-input-radio>
</wcp-radio-menu>
```

## With optional initial value

```html
<wcp-radio-menu label="With optional initial value">
  <wcp-input-radio label="foo" value="foo"></wcp-input-radio>
  <wcp-input-radio checked label="bar" value="bar"></wcp-input-radio>
  <wcp-input-radio label="baz" value="baz"></wcp-input-radio>
</wcp-radio-menu>
```

## Used within a form

```html
<form>
  <wcp-radio-menu label="Fully form enabled component">
    <wcp-input-radio label="foo" value="foo"></wcp-input-radio>
    <wcp-input-radio label="bar" value="bar"></wcp-input-radio>
    <wcp-input-radio label="baz" value="baz"></wcp-input-radio>
  </wcp-radio-menu>
  <button type="submit">Submit</button>
  <button type="reset">Reset</button>
</form>
```

## Properties

| Property   | Attribute  | Type                  | Default      |
|------------|------------|-----------------------|--------------|
| `disabled` | `disabled` | `boolean`             | false        |
| `label`    | `label`    | `string \| undefined` |              |
| `name`     | `name`     | `string`              | "radio-menu" |
| `required` | `required` | `boolean`             | false        |
| `value`    | `value`    | `string \| undefined` |              |

## Methods

| Method              | Type                 |
|---------------------|----------------------|
| `checkValidity`     | `(): boolean`        |
| `formResetCallback` | `(): void`           |
| `handleInput`       | `(event: any): void` |
| `handleSlotChange`  | `(): void`           |

## Slots

| Name | Description                                    |
|------|------------------------------------------------|
|      | The default slot. Pass the radio buttons here. |

## CSS Custom Properties

| Property                          | Description                                  |
|-----------------------------------|----------------------------------------------|
| `--wcp-radio-menu-label-size`     | The font size of the label.                  |
| `--wcp-radio-menu-label-spacing`  | The spacing between label and radio buttons. |
| `--wcp-radio-menu-option-spacing` | The spacing between the radio buttons.       |
