# class: `PreviewFrameViewer`

## Fields

| Name        | Privacy | Type      | Default    | Description | Inherited From |
| ----------- | ------- | --------- | ---------- | ----------- | -------------- |
| `element`   |         |           |            |             |                |
| `available` |         | `boolean` | `true`     |             |                |
| `name`      |         | `string`  | `'viewer'` |             |                |
| `label`     |         | `string`  | `'Viewer'` |             |                |

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
| `available` | available |                |
| `name`      | name      |                |
| `label`     | label     |                |

<hr/>
