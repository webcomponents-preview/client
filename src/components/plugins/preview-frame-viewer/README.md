# class: `PreviewFrameViewer`

## Fields

| Name        | Privacy | Type      | Default    | Description | Inherited From |
| ----------- | ------- | --------- | ---------- | ----------- | -------------- |
| `element`   |         |           |            |             |                |
| `name`      |         | `string`  | `'viewer'` |             |                |
| `label`     |         | `string`  | `'Viewer'` |             |                |
| `available` |         | `boolean` | `true`     |             |                |

## Methods

| Name                  | Privacy   | Description | Parameters            | Return                 | Inherited From |
| --------------------- | --------- | ----------- | --------------------- | ---------------------- | -------------- |
| `getElementReference` | protected |             |                       | `Element \| undefined` |                |
| `handleControlsInput` | protected |             | `event: InputEvent`   |                        |                |
| `renderSlots`         | protected |             |                       | `TemplateResult`       |                |
| `renderFieldControl`  | protected |             | `field: Parsed.Field` | `TemplateResult`       |                |
| `renderSlotControl`   | protected |             | `slot: Parsed.Slot`   | `TemplateResult`       |                |
| `renderElement`       | protected |             |                       | `TemplateResult`       |                |
| `render`              | protected |             |                       | `TemplateResult`       |                |

## Attributes

| Name        | Field     | Inherited From |
| ----------- | --------- | -------------- |
| `element`   | element   |                |
| `name`      | name      |                |
| `label`     | label     |                |
| `available` | available |                |

<hr/>
