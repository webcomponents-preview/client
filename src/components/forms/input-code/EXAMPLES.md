## With optional label

```html
<wcp-input-code label="With optional label"></wcp-input-code>
```

## With optional initial value

```html
<wcp-input-code
  label="With optional initial value"
  value="<strong>Test</strong>"
  language="html"
></wcp-input-code>
```

## With autosize

```html
<wcp-input-code
  autosize
  label="With optional initial value"
  value="<strong>Test</strong>"
  language="html"
></wcp-input-code>
```

## Used within a form

```html
<form
  onsubmit="console.log(Array.from(new FormData(this).entries()));return false"
  onreset="console.log('Reset!')"
>
  <wcp-input-code
    label="Fully form enabled component"
    value="<strong>Test</strong>"
    language="html"
  ></wcp-input-code>
  <button type="submit">Submit</button>
  <button type="reset">Reset</button>
</form>
```
