# wcp-legacy

## Properties

| Property                  | Attribute                   | Modifiers | Type                                          | Default                                          |
|---------------------------|-----------------------------|-----------|-----------------------------------------------|--------------------------------------------------|
| `componentExpression`     |                             | readonly  | `RegExp`                                      | "/\\/([-\\w\\d]+)\\/preview.html$/i"             |
| `components`              | `components`                |           | `string[]`                                    | []                                               |
| `expandComponentDetails`  | `expand-component-details`  |           | `boolean`                                     | false                                            |
| `handleResize`            |                             |           | `(this: unknown, ...args: unknown[]) => void` | "debounce(this.setPreviewScale.bind(this), 500)" |
| `hasComponentDetails`     | `has-component-details`     |           | `boolean`                                     | false                                            |
| `hideAside`               | `hide-aside`                |           | `boolean`                                     | false                                            |
| `hideComponentDetails`    | `hide-component-details`    |           | `boolean`                                     | false                                            |
| `iframe`                  |                             |           | `HTMLIFrameElement`                           |                                                  |
| `invertSimulatedViewport` | `invert-simulated-viewport` |           | `boolean`                                     | false                                            |
| `preview`                 |                             |           | `HTMLDivElement`                              |                                                  |

## Methods

| Method                          | Type                                             |
|---------------------------------|--------------------------------------------------|
| `getCurrentUrl`                 | `(): string`                                     |
| `getPreviewMetaData`            | `(paths: string[], matcher: RegExp): Record<string, string>` |
| `handleAsideToggle`             | `(): void`                                       |
| `handleComponentDetailsExpand`  | `(): void`                                       |
| `handleComponentDetailsToggle`  | `(): void`                                       |
| `handleInvertSimulatedViewport` | `(): void`                                       |
| `handleLoad`                    | `(): Promise<void>`                              |
| `handleNavigation`              | `(event: Event): void`                           |
| `handleOpen`                    | `(): void`                                       |
| `handlePreClick`                | `(event: Event): Promise<void>`                  |
| `handleReload`                  | `(): void`                                       |
| `handleSimulateViewport`        | `(event: Event): void`                           |
| `openLink`                      | `(path: string): void`                           |
| `reloadIframe`                  | `(): void`                                       |
| `resolveComponent`              | `(path: string): Promise<ComponentData \| undefined>` |
| `setPreviewScale`               | `(): void`                                       |
| `setPreviewSize`                | `(): void`                                       |
