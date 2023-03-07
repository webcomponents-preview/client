# wcp-tabs

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

| Property    | Attribute    | Type                     | Default |
|-------------|--------------|--------------------------|---------|
| `activeTab` | `active-tab` | `string \| undefined`    |         |
| `code`      |              | `string`                 | ""      |
| `tabFocus`  |              | `number`                 | 0       |
| `tabRoles`  |              | `HTMLElement[]`          |         |
| `tabs`      | `tabs`       | `Record<string, string>` | {}      |

## Methods

| Method                | Type                           |
|-----------------------|--------------------------------|
| `emitActiveTabChange` | `(): void`                     |
| `handleKeydown`       | `(event: KeyboardEvent): void` |
| `handleTabClick`      | `(event: Event): void`         |

## Events

| Event                        | Type                                             | Description                           |
|------------------------------|--------------------------------------------------|---------------------------------------|
| `wcp-tabs:active-tab-change` | `CustomEvent<{ activeTab: string \| undefined; }>` | Notifies when the active tab changes. |

## Slots

| Name | Description                              |
|------|------------------------------------------|
|      | tab name - The content of the named tab. |
