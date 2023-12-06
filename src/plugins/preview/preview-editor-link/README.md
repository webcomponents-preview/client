# wcp-preview-editor-link

Links all found custom elements in a preview with their current state to the editor to be further played around with.

## Properties

| Property         | Attribute          | Modifiers | Type               | Default          |
|------------------|--------------------|-----------|--------------------|------------------|
| `available`      | `available`        |           | `boolean`          | true             |
| `container`      |                    | readonly  |                    |                  |
| `enabled`        | `enabled`          |           | `boolean`          | false            |
| `label`          | `label`            | readonly  | `"Show in viewer"` | "Show in viewer" |
| `name`           | `name`             | readonly  | `"viewer-link"`    | "viewer-link"    |
| `previewTagName` | `preview-tag-name` | readonly  | `string`           |                  |

## Methods

| Method                       | Type                   |
|------------------------------|------------------------|
| `#attachHint`                | `(element: any): void` |
| `#attachHints`               | `(): void`             |
| `#attachOverlay`             | `(): void`             |
| `#checkAvailability`         | `(): void`             |
| `#detachHints`               | `(): void`             |
| `#detachOverlay`             | `(): void`             |
| `#findContainerSlot`         | `(): any`              |
| `#handleContainerScroll`     | `(): void`             |
| `#handleContainerSlotChange` | `(): void`             |
| `#observeContainerScroll`    | `(): void`             |
| `#observeContainerSlot`      | `(): void`             |
| `#openViewer`                | `(element: any): any`  |
| `#setupHints`                | `(): void`             |
| `#teardownHints`             | `(): void`             |
| `#unobserveContainerScroll`  | `(): void`             |
| `#unobserveContainerSlot`    | `(): void`             |
| `adoptedCallback`            | `(): void`             |

## Events

| Event                                    |
|------------------------------------------|
| `wcp-preview-plugin:availability-change` |