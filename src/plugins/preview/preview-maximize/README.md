<!-- Auto Generated Below -->

# wcp-preview-maximize

Maximizes a custom element preview to fullscreen.

**Mixins:** ColorSchemable

## Properties

| Property    | Attribute   | Modifiers | Type         | Default    |
|-------------|-------------|-----------|--------------|------------|
| `available` | `available` | readonly  | `true`       | true       |
| `container` |             | readonly  |              |            |
| `label`     |             | readonly  | `"Maximize"` | "Maximize" |
| `name`      |             | readonly  | `"maximize"` | "maximize" |

## Methods

| Method             | Type                         |
|--------------------|------------------------------|
| `#emitChange`      | `(): void`                   |
| `#initMaximized`   | `(): void`                   |
| `#injectStyles`    | `(): void`                   |
| `#updateMaximized` | `(maximized: boolean): void` |

## Events

| Event                          |
|--------------------------------|
| `wcp-preview-maximize:toggled` |
