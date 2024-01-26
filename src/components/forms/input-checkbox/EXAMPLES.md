## With optional label

```html
<wcp-input-checkbox label="With optional label"></wcp-input-checkbox>
```

## With initial value

```html
<wcp-input-checkbox
  checked
  label="With optional initial value"
></wcp-input-checkbox>
```

## Used within a form

```html
<form
  onsubmit="console.log(Array.from(new FormData(this).entries()));return false"
  onreset="console.log('Reset!')"
>
  <wcp-input-checkbox label="Fully form enabled component"></wcp-input-checkbox>
  <button type="submit">Submit</button>
  <button type="reset">Reset</button>
</form>
```
