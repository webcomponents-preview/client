# wcp-toggle-color-scheme

Shows a button to toggle the desired color-scheme.

**Mixins:** ColorSchemable

## Example

```html
<wcp-toggle-color-scheme></wcp-toggle-color-scheme>
```

## Properties

| Property      | Type                | Default                                          |
|---------------|---------------------|--------------------------------------------------|
| `colorScheme` | `"dark" \| "light"` | "matchMedia('(prefers-color-scheme: dark)').matches ? ('dark' as const) : ('light' as const)" |

## Methods

| Method              | Type       |
|---------------------|------------|
| `handleButtonClick` | `(): void` |

## Events

| Event                     |
|---------------------------|
| `wcp-color-scheme:toggle` |
