## With optional label

```html
<wcp-input-radio label="With optional label"></wcp-input-radio>
```

## With initial value

```html
<wcp-input-radio checked label="With optional initial value"></wcp-input-radio>
```

## Used within a form

```html
<form
  onsubmit="console.log(Array.from(new FormData(this).entries()));return false"
  onreset="console.log('Reset!')"
>
  <wcp-input-radio label="Fully form enabled component"></wcp-input-radio>
  <button type="submit">Submit</button>
  <button type="reset">Reset</button>
</form>
```
