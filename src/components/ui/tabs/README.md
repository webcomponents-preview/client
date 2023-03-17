# class: `Tabs`

## Fields

| Name        | Privacy | Type                     | Default | Description | Inherited From |
| ----------- | ------- | ------------------------ | ------- | ----------- | -------------- |
| `tabFocus`  |         | `number`                 | `0`     |             |                |
| `tabRoles`  |         | `HTMLElement[]`          |         |             |                |
| `code`      |         | `string`                 | `''`    |             |                |
| `tabs`      |         | `Record<string, string>` | `{}`    |             |                |
| `activeTab` |         | `string \| undefined`    |         |             |                |

## Methods

| Name                  | Privacy   | Description | Parameters             | Return           | Inherited From |
| --------------------- | --------- | ----------- | ---------------------- | ---------------- | -------------- |
| `emitActiveTabChange` |           |             |                        |                  |                |
| `handleTabClick`      |           |             | `event: Event`         |                  |                |
| `handleKeydown`       |           |             | `event: KeyboardEvent` |                  |                |
| `render`              | protected |             |                        | `TemplateResult` |                |

## Attributes

| Name         | Field     | Inherited From |
| ------------ | --------- | -------------- |
| `tabs`       | tabs      |                |
| `active-tab` | activeTab |                |

## CSS Properties

| Name                                       | Default | Description                                      |
| ------------------------------------------ | ------- | ------------------------------------------------ |
| `--wcp-tabs-tablist-gap`                   |         | The gap between the tablist and the tabpanels    |
| `--wcp-tabs-tablist-spacing`               |         | The inner padding of the tablist                 |
| `--wcp-tabs-tab-spacing`                   |         | The inner padding of the tabs                    |
| `--wcp-tabs-tab-active-border-width`       |         | The border width of the active tab               |
| `--wcp-tabs-panel-spacing`                 |         | The inner padding of the tabpanels               |
| `--wcp-tabs-tablist-dark-border-color`     |         | The border color of the tablist in dark mode     |
| `--wcp-tabs-tab-active-dark-border-color`  |         | The border color of the active tab in dark mode  |
| `--wcp-tabs-tablist-light-border-color`    |         | The border color of the tablist in light mode    |
| `--wcp-tabs-tab-active-light-border-color` |         | The border color of the active tab in light mode |

## Slots

| Name  | Description                          |
| ----- | ------------------------------------ |
| `tab` | name - The content of the named tab. |

<hr/>
