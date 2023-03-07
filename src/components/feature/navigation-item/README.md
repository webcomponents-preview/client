# wcp-navigation-item

## Examples

### Non-interactive

This will probably only be used for the active item.

```html
<wcp-navigation-item>
  Non-interactive
</wcp-navigation-item>
```

### With link

```html
<wcp-navigation-item href="/home">
  Home
</wcp-navigation-item>
```

## Properties

| Property | Attribute | Type                  | Default |
|----------|-----------|-----------------------|---------|
| `active` | `active`  | `boolean`             | false   |
| `href`   | `href`    | `string \| undefined` |         |

## Slots

| Name | Description               |
|------|---------------------------|
|      | Default slot for contents |
