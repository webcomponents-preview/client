# wcp-tabs

**Mixins:** ColorSchemable

## Examples

```html
<wcp-tabs tabs='{"first": "First tab", "second": "Second tab"}'>
 <div slot="first">First tab content</div>
 <div slot="second">Second tab content</div>
</wcp-tabs>
```

### Active tab preselected

```html
<wcp-tabs tabs='{"first": "First tab", "second": "Second tab"}' active-tab="second">
 <div slot="first">First tab content</div>
 <div slot="second">Second tab content</div>
</wcp-tabs>
```

## Properties

| Property    | Attribute    | Type                  | Default |
|-------------|--------------|-----------------------|---------|
| `activeTab` | `active-tab` | `string \| undefined` |         |
| `tabFocus`  |              | `number`              | 0       |
| `tabs`      | `tabs`       |                       | {}      |

## Methods

| Method                | Type                 |
|-----------------------|----------------------|
| `emitActiveTabChange` | `(): void`           |
| `handleKeydown`       | `(event: any): void` |
| `handleTabClick`      | `(event: any): void` |

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
