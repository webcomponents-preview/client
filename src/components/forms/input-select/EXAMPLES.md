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
  <wcp-input-select-option
    value="bar"
    label="Bar"
    disabled
  ></wcp-input-select-option>
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
<form
  onsubmit="console.log(Array.from(new FormData(this).entries()));return false"
  onreset="console.log('Reset!')"
>
  <wcp-input-select label="Fully form enabled component">
    <wcp-input-select-option value="foo" label="Foo"></wcp-input-select-option>
    <wcp-input-select-option value="bar" label="Bar"></wcp-input-select-option>
    <wcp-input-select-option value="baz" label="Baz"></wcp-input-select-option>
  </wcp-input-select>
  <button type="submit">Submit</button>
  <button type="reset">Reset</button>
</form>
```
