# class: `Aside`

## Mixins

| Name             | Module | Package                    |
| ---------------- | ------ | -------------------------- |
| `ColorSchemable` |        | @/utils/color-scheme.utils |

## Fields

| Name                | Privacy | Type      | Default           | Description                                                                           | Inherited From |
| ------------------- | ------- | --------- | ----------------- | ------------------------------------------------------------------------------------- | -------------- |
| `hidden`            |         | `boolean` | `false`           | Used to toggle the width of the aside bar                                             |                |
| `role`              |         | `string`  | `'complementary'` | Presets the aria role to \`complementary\` as we do not use te aside element directly |                |
| `listenAsideToggle` |         |           |                   |                                                                                       |                |

## Methods

| Name                   | Privacy   | Description | Parameters | Return           | Inherited From |
| ---------------------- | --------- | ----------- | ---------- | ---------------- | -------------- |
| `emitToggled`          |           |             |            |                  |                |
| `handleButtonClick`    |           |             |            |                  |                |
| `connectedCallback`    |           |             |            |                  |                |
| `disconnectedCallback` |           |             |            |                  |                |
| `render`               | protected |             |            | `TemplateResult` |                |

## Events

| Name                | Type | Description                                                                                                        | Inherited From |
| ------------------- | ---- | ------------------------------------------------------------------------------------------------------------------ | -------------- |
| `wcp-aside-toggled` |      | Dispatches this event when the side bar has been toggled. Do not get confused with the \`wcp-aside:toggle\` event. |                |

## Attributes

| Name     | Field  | Inherited From |
| -------- | ------ | -------------- |
| `hidden` | hidden |                |
| `role`   | role   |                |

## CSS Properties

| Name                           | Default | Description                                        |
| ------------------------------ | ------- | -------------------------------------------------- |
| `--wcp-aside-max-width`        |         | The maximum width of the aside bar when visible    |
| `--wcp-aside-spacing`          |         | Inner padding of the aside bar                     |
| `--wcp-aside-toggle-size`      |         | The size of the toggle button                      |
| `--wcp-aside-dark-background`  |         | The background color of the side bar in dark mode  |
| `--wcp-aside-dark-color`       |         | The color of the side bar in dark mode             |
| `--wcp-aside-light-background` |         | The background color of the side bar in light mode |
| `--wcp-aside-light-color`      |         | The color of the side bar in light mode            |

## Slots

| Name | Description                              |
| ---- | ---------------------------------------- |
|      | Projects elements aside the main content |

<hr/>
