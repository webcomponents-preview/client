# class: `PreviewFrameViewer`

## Mixins

| Name             | Module | Package                    |
| ---------------- | ------ | -------------------------- |
| `ColorSchemable` |        | @/utils/color-scheme.utils |

## Fields

| Name        | Privacy | Type      | Default    | Description | Inherited From |
| ----------- | ------- | --------- | ---------- | ----------- | -------------- |
| `element`   |         |           |            |             |                |
| `name`      |         | `string`  | `'viewer'` |             |                |
| `label`     |         | `string`  | `'Viewer'` |             |                |
| `available` |         | `boolean` | `true`     |             |                |

## Methods

| Name                  | Privacy   | Description | Parameters          | Return                           | Inherited From |
| --------------------- | --------- | ----------- | ------------------- | -------------------------------- | -------------- |
| `getElementReference` | protected |             |                     | `Element \| undefined`           |                |
| `getFields`           | protected |             |                     | `CustomElementField[]`           |                |
| `getSlots`            | protected |             |                     | `Slot[]`                         |                |
| `getSlotsWithData`    | protected |             |                     | `{ slot: Slot; data: string }[]` |                |
| `handleControlsInput` | protected |             | `event: InputEvent` |                                  |                |
| `renderSlots`         | protected |             |                     | `TemplateResult`                 |                |
| `renderElement`       | protected |             |                     | `TemplateResult`                 |                |
| `render`              | protected |             |                     | `TemplateResult`                 |                |

## Attributes

| Name        | Field     | Inherited From |
| ----------- | --------- | -------------- |
| `element`   | element   |                |
| `name`      | name      |                |
| `label`     | label     |                |
| `available` | available |                |

<hr/>
