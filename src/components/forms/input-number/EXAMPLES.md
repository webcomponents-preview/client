## With optional label

```html
<wcp-input-number label="With optional label"></wcp-input-number>
```

## With optional initial value

```html
<wcp-input-number
  label="With optional initial value"
  value="23"
></wcp-input-number>
```

## Used within a form

```html
<form
  onsubmit="console.log(Array.from(new FormData(this).entries()));return false"
  onreset="console.log('Reset!')"
>
  <wcp-input-number label="Fully form enabled component"></wcp-input-number>
  <button type="submit">Submit</button>
  <button type="reset">Reset</button>
</form>
```
