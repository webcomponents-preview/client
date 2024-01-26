## With optional label

```html
<wcp-input-key-value-pairs
  label="With optional label"
></wcp-input-key-value-pairs>
```

## Used within a form

```html
<form
  oninput="console.log(Array.from(new FormData(this).entries()))"
  onsubmit="console.log(Array.from(new FormData(this).entries()));return false"
  onreset="console.log('Reset!')"
>
  <wcp-input-key-value-pairs
    name="embedded."
    label="Fully form enabled component"
  ></wcp-input-key-value-pairs>
  <button type="submit">Submit</button>
  <button type="reset">Reset</button>
</form>
```
