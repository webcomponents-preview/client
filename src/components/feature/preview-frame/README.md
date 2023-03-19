# class: `PreviewFrame`

## Mixins

| Name             | Module | Package                    |
| ---------------- | ------ | -------------------------- |
| `ColorSchemable` |        | @/utils/color-scheme.utils |

## Fields

| Name            | Privacy | Type                                    | Default | Description | Inherited From |
| --------------- | ------- | --------------------------------------- | ------- | ----------- | -------------- |
| `preview`       |         | `string`                                | `''`    |             |                |
| `examples`      |         | `string[]`                              | `[]`    |             |                |
| `activeElement` |         | `CustomElementDeclaration \| undefined` |         |             |                |

## Methods

| Name             | Privacy   | Description | Parameters                                      | Return           | Inherited From |
| ---------------- | --------- | ----------- | ----------------------------------------------- | ---------------- | -------------- |
| `renderExamples` | protected |             | `element: CustomElementDeclarationWithExamples` | `TemplateResult` |                |
| `renderReadme`   | protected |             | `element: CustomElementDeclarationWithReadme`   | `TemplateResult` |                |
| `render`         | protected |             |                                                 | `TemplateResult` |                |

## Attributes

| Name            | Field         | Inherited From |
| --------------- | ------------- | -------------- |
| `activeElement` | activeElement |                |

## CSS Properties

| Name                                     | Default | Description                                         |
| ---------------------------------------- | ------- | --------------------------------------------------- |
| `--wcp-preview-frame-dark-background`    |         | Background color of the preview frame in dark mode  |
| `--wcp-preview-frame-dark-border-color`  |         | Border color of the example section in dark mode    |
| `--wcp-preview-frame-dark-color`         |         | Text color of the preview frame in dark mode        |
| `--wcp-preview-frame-light-background`   |         | Background color of the preview frame in light mode |
| `--wcp-preview-frame-light-border-color` |         | Border color of the example section in light mode   |
| `--wcp-preview-frame-light-color`        |         | Text color of the preview frame in light mode       |
| `--wcp-preview-frame-distance`           |         | Outer margin of the preview frame                   |
| `--wcp-preview-frame-spacing`            |         | Inner padding of the preview frame                  |
| `--wcp-preview-frame-border-width`       |         | Border width of the example section                 |
| `--wcp-preview-frame-spacing`            |         | Inner padding of the example section                |

<hr/>
