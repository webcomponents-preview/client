### Usage with headline

```html
<wcp-navigation headline="Navigation">
  <wcp-navigation-item href="/home">Home</wcp-navigation-item>
  <wcp-navigation-item href="/about">About</wcp-navigation-item>
</wcp-navigation>
```

### Nested navigation

```html
<wcp-navigation headline="Navigation">
  <wcp-navigation-item href="/home">Home</wcp-navigation-item>
  <wcp-navigation headline="Nested">
    <wcp-navigation-item href="/about">About</wcp-navigation-item>
    <wcp-navigation-item href="/imprint">Imprint</wcp-navigation-item>
  </wcp-navigation>
</wcp-navigation>
```

### Togglable navigation

```html
<wcp-navigation headline="Navigation" togglable>
  <wcp-navigation-item href="/home">Home</wcp-navigation-item>
  <wcp-navigation-item href="/about">About</wcp-navigation-item>
</wcp-navigation>
```

### Initially opened togglable navigation

```html
<wcp-navigation headline="Navigation" togglable open>
  <wcp-navigation-item href="/home">Home</wcp-navigation-item>
  <wcp-navigation-item href="/about">About</wcp-navigation-item>
</wcp-navigation>
```

### Togglable nested navigation

```html
<wcp-navigation headline="Navigation">
  <wcp-navigation-item href="/home">Home</wcp-navigation-item>
  <wcp-navigation-item href="/about">About</wcp-navigation-item>
  <wcp-navigation togglable headline="Nested">
    <wcp-navigation-item href="/about">About</wcp-navigation-item>
    <wcp-navigation-item href="/imprint">Imprint</wcp-navigation-item>
  </wcp-navigation>
</wcp-navigation>
```
