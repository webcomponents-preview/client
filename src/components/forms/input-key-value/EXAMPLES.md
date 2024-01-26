## With optional label

```html
<wcp-input-key-value label="With optional label"></wcp-input-key-value>
```

## Used within a form

```html
<form
  onsubmit="console.log(Array.from(new FormData(this).entries()));return false"
  onreset="console.log('Reset!')"
>
  <input type="hidden" name="hidden" value="hidden" />
  <wcp-input-key-value
    name="embedded"
    label="Fully form enabled component"
  ></wcp-input-key-value>
  <button type="submit">Submit</button>
  <button type="reset">Reset</button>
</form>
```
