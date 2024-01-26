```html
<wcp-tabs
  tabs='{"first": {"label": "First tab"}, "second": {"label": "Second tab"}}'
>
  <div slot="first">First tab content</div>
  <div slot="second">Second tab content</div>
</wcp-tabs>
```

### Active tab preselected

```html
<wcp-tabs
  tabs='{"first": {"label": "First tab"}, "second": {"label": "Second tab"}}'
  active-tab="second"
>
  <div slot="first">First tab content</div>
  <div slot="second">Second tab content</div>
</wcp-tabs>
```

### Disabled tabs

```html
<wcp-tabs
  tabs='{"first": {"label": "First tab"}, "second": {"label": "Second tab", "disabled": true}}'
  active-tab="second"
>
  <div slot="first">First tab content</div>
  <div slot="second">Second tab content</div>
</wcp-tabs>
```
