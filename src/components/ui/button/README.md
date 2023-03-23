# class: `Button`

## Fields

| Name        | Privacy | Type                                                      | Default    | Description                                                                                                                                                                                      | Inherited From |
| ----------- | ------- | --------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| `disabled`  |         | `boolean`                                                 | `false`    |                                                                                                                                                                                                  |                |
| `nowrap`    |         | `boolean`                                                 | `false`    |                                                                                                                                                                                                  |                |
| `stretched` |         | `boolean`                                                 | `false`    | Allows stretching the button across the full width of its container.&#xA;This is useful for buttons that are used in a narrow form, or in general&#xA;on small viewports, like handheld devices. |                |
| `kind`      |         | `'button' \| 'icon'`                                      | `'button'` | The kind of button to render. Either like a conventional button, or for&#xA;icons. Icon buttons are quadrtic and will show a radial background on interaction.                                   |                |
| `type`      |         | `'button' \| 'reset' \| 'submit'`                         | `'button'` |                                                                                                                                                                                                  |                |
| `href`      |         | `string \| undefined`                                     |            |                                                                                                                                                                                                  |                |
| `target`    |         | `'_self' \| '_blank' \| '_parent' \| '_top' \| undefined` |            |                                                                                                                                                                                                  |                |

## Methods

| Name                | Privacy   | Description | Parameters | Return           | Inherited From |
| ------------------- | --------- | ----------- | ---------- | ---------------- | -------------- |
| `handleButtonClick` |           |             |            |                  |                |
| `render`            | protected |             |            | `TemplateResult` |                |

## Attributes

| Name        | Field     | Inherited From |
| ----------- | --------- | -------------- |
| `disabled`  | disabled  |                |
| `nowrap`    | nowrap    |                |
| `stretched` | stretched |                |
| `kind`      | kind      |                |
| `type`      | type      |                |
| `href`      | href      |                |
| `target`    | target    |                |

## CSS Properties

| Name                                      | Default | Description                                                     |
| ----------------------------------------- | ------- | --------------------------------------------------------------- |
| `--wcp-button-dark-passive-background`    |         | Background color of the button if non interactive in dark mode  |
| `--wcp-button-dark-passive-border-color`  |         | Border color of the button if non interactive in dark mode      |
| `--wcp-button-dark-passive-color`         |         | Text color of the button if non interactive in dark mode        |
| `--wcp-button-dark-hover-background`      |         | Background color of the button if hovered in dark mode          |
| `--wcp-button-dark-hover-border-color`    |         | Border color of the button if hovered in dark mode              |
| `--wcp-button-dark-hover-color`           |         | Text color of the button if hovered in dark mode                |
| `--wcp-button-dark-active-background`     |         | Background color of the button if active in dark mode           |
| `--wcp-button-dark-active-border-color`   |         | Border color of the button if active in dark mode               |
| `--wcp-button-dark-active-color`          |         | Text color of the button if active in dark mode                 |
| `--wcp-button-light-passive-background`   |         | Background color of the button if non interactive in light mode |
| `--wcp-button-light-passive-border-color` |         | Border color of the button if non interactive in light mode     |
| `--wcp-button-light-passive-color`        |         | Text color of the button if non interactive in light mode       |
| `--wcp-button-light-hover-background`     |         | Background color of the button if hovered in light mode         |
| `--wcp-button-light-hover-border-color`   |         | Border color of the button if hovered in light mode             |
| `--wcp-button-light-hover-color`          |         | Text color of the button if hovered in light mode               |
| `--wcp-button-light-active-background`    |         | Background color of the button if active in light mode          |
| `--wcp-button-light-active-border-color`  |         | Border color of the button if active in light mode              |
| `--wcp-button-light-active-color`         |         | Text color of the button if active in light mode                |

## Slots

| Name | Description                         |
| ---- | ----------------------------------- |
|      | Default slot for the button content |

<hr/>
