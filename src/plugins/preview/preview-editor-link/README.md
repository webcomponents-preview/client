<!-- Auto Generated Below -->

# wcp-preview-editor-link

Links all found custom elements in a preview with their current state to the editor to be further played around with.

## Properties

| Property         | Attribute          | Modifiers | Type               | Default                                     |
|------------------|--------------------|-----------|--------------------|---------------------------------------------|
| `available`      | `available`        |           | `boolean`          | true                                        |
| `container`      |                    | readonly  |                    |                                             |
| `enabled`        | `enabled`          |           |                    | "read('editor-link-hint-visible') ?? false" |
| `label`          |                    | readonly  | `"Show in editor"` | "Show in editor"                            |
| `name`           |                    | readonly  | `"editor-link"`    | "editor-link"                               |
| `previewTagName` | `preview-tag-name` | readonly  | `string`           |                                             |

## Methods

| Method                      | Type                           |
|-----------------------------|--------------------------------|
| `#attachHint`               | `(element: HTMLElement): void` |
| `#attachHints`              | `(): void`                     |
| `#attachOverlay`            | `(): void`                     |
| `#checkAvailability`        | `(): void`                     |
| `#detachHints`              | `(): void`                     |
| `#detachOverlay`            | `(): void`                     |
| `#findContainerSlot`        | `(): any`                      |
| `#observeContainerScroll`   | `(): void`                     |
| `#observeContainerSlot`     | `(): void`                     |
| `#openViewer`               | `(element: HTMLElement): any`  |
| `#setupHints`               | `(): void`                     |
| `#teardownHints`            | `(): void`                     |
| `#unobserveContainerScroll` | `(): void`                     |
| `#unobserveContainerSlot`   | `(): void`                     |
| `adoptedCallback`           | `(): void`                     |

## Events

| Event                                    |
|------------------------------------------|
| `wcp-preview-plugin:availability-change` |
