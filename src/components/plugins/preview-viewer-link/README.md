# wcp-preview-viewer-link

## Properties

| Property         | Attribute   | Modifiers | Type         | Default    |
|------------------|-------------|-----------|--------------|------------|
| `available`      | `available` | readonly  | `true`       | true       |
| `container`      |             | readonly  |              |            |
| `enabled`        | `enabled`   |           | `boolean`    | false      |
| `label`          | `label`     | readonly  | `"Viewport"` | "Viewport" |
| `name`           | `name`      | readonly  | `"viewport"` | "viewport" |
| `previewTagName` |             | readonly  | `string`     |            |

## Methods

| Method                       | Type                   |
|------------------------------|------------------------|
| `#attachHint`                | `(element: any): void` |
| `#attachHints`               | `(): void`             |
| `#attachOverlay`             | `(): void`             |
| `#detachOverlay`             | `(): void`             |
| `#findContainerSlot`         | `(): any`              |
| `#handleContainerScroll`     | `(): void`             |
| `#handleContainerSlotChange` | `(): void`             |
| `#observeContainerScroll`    | `(): void`             |
| `#observeContainerSlot`      | `(): void`             |
| `#setupHints`                | `(): void`             |
| `#teardownHints`             | `(): void`             |
| `#unobserveContainerScroll`  | `(): void`             |
| `#unobserveContainerSlot`    | `(): void`             |
