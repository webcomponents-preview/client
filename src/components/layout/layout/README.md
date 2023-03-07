# wcp-layout

## Examples

```html
<wcp-layout>
  <nav slot="aside">To the left!</nav>
  <article>Me the important content!</article>
</wcp-layout>
```

### Hidden contents

```html
<wcp-layout hidden>
  <nav slot="aside">To the left!</nav>
</wcp-layout>
```

## Properties

| Property    | Attribute    | Type      | Default |
|-------------|--------------|-----------|---------|
| `hideAside` | `hide-aside` | `boolean` | false   |

## Methods

| Method              | Type       |
|---------------------|------------|
| `handleAsideToggle` | `(): void` |

## Slots

| Name    | Description                              |
|---------|------------------------------------------|
|         | Receives the content of the main section |
| `aside` | Projects elements aside the main content |
