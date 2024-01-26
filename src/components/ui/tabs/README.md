<!-- Auto Generated Below -->

# wcp-tabs

**Mixins:** ColorSchemable

## Properties

| Property    | Attribute    | Type                                             | Default |
|-------------|--------------|--------------------------------------------------|---------|
| `activeTab` | `active-tab` | `string \| undefined`                            |         |
| `tabFocus`  |              | `number`                                         | 0       |
| `tabs`      | `tabs`       | `Record<string, { label: string; disabled?: boolean \| undefined; }>` | {}      |

## Methods

| Method                | Type                           |
|-----------------------|--------------------------------|
| `emitActiveTabChange` | `(): void`                     |
| `handleKeydown`       | `(event: KeyboardEvent): void` |
| `handleTabClick`      | `(event: Event): void`         |

## Events

| Event                        | Description                          |
|------------------------------|--------------------------------------|
| `wcp-tabs:active-tab-change` | Notifies when the active tab changes |

## Slots

| Name | Description                              |
|------|------------------------------------------|
|      | tab name - The content of the named tab. |

## CSS Custom Properties

| Property                                   | Description                                      |
|--------------------------------------------|--------------------------------------------------|
| `--wcp-tabs-panel-spacing`                 | The inner padding of the tabpanels               |
| `--wcp-tabs-tab-active-border-width`       | The border width of the active tab               |
| `--wcp-tabs-tab-active-dark-border-color`  | The border color of the active tab in dark mode  |
| `--wcp-tabs-tab-active-light-border-color` | The border color of the active tab in light mode |
| `--wcp-tabs-tab-spacing`                   | The inner padding of the tabs                    |
| `--wcp-tabs-tablist-dark-border-color`     | The border color of the tablist in dark mode     |
| `--wcp-tabs-tablist-gap`                   | The gap between the tablist and the tabpanels    |
| `--wcp-tabs-tablist-light-border-color`    | The border color of the tablist in light mode    |
| `--wcp-tabs-tablist-spacing`               | The inner padding of the tablist                 |
