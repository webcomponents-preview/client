## With optional label

```html
<wcp-input-text label="With optional label"></wcp-input-text>
```

## With optional initial value

```html
<wcp-input-text
  label="With optional initial value"
  value="Foo"
></wcp-input-text>
```

## Multiline

```html
<wcp-input-text multiline label="With multiline value"></wcp-input-text>
```

## Used within a form

```html
<form
  onsubmit="console.log(Array.from(new FormData(this).entries()));return false"
  onreset="console.log('Reset!')"
>
  <wcp-input-text label="Fully form enabled component"></wcp-input-text>
  <button type="submit">Submit</button>
  <button type="reset">Reset</button>
</form>
```
