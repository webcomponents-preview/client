## Default button

```html
<wcp-button>Click me!</wcp-button>
```

## Disabled button

```html
<wcp-button disabled>Try to click me!</wcp-button>
```

## Button with icon

```html
<wcp-button kind="icon">
  <wcp-icon name="menu"></wcp-icon>
</wcp-button>
```

## Force active state

```html
<wcp-button class="active">Link</wcp-button>
```

## Use as link

```html
<wcp-button href=".">Link</wcp-button>
```

## Displaced to the right

```html
<wcp-button
  style="position:relative;left:calc(100% - 40px);transform:translateX(-100%)"
>
  Try to find me!
</wcp-button>
```

## Use as native submit button in form

```html
<form onsubmit="alert('Submit!'); return false">
  <wcp-button type="submit">Submit</wcp-button>
</form>
```

## Use as native reset button in form

```html
<form onreset="alert('Reset!'); return false">
  <wcp-button type="reset">Reset</wcp-button>
</form>
```
