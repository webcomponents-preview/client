<img align="left" src="https://github.com/webcomponents-preview/client/raw/main/src/assets/icons/logo.svg" alt="WCP Logo" width="55px" style="margin-right: 10px">

# Web Components Preview

![Workflow status](https://github.com/webcomponents-preview/client/actions/workflows/workflow.yml/badge.svg)
![npm Release](https://badgen.net/npm/v/@webcomponents-preview/client/latest?label=@webcomponents-preview/client&color=cyan&icon=npm)
![Package name](https://badgen.net/badge/%20/@webcomponents-preview%2Fclient?color=blue&icon=https://github.com/webcomponents-preview/client/raw/main/src/assets/icons/logo-mono.svg)

A storybook alike preview application for web components. It processes a given custom element manifest and renders a preview for each element with its properties and events.

Configuration is done by providing a schema file of your custom elements. The schema is a JSON file that describes the custom elements and their properties and should comply to the draft [Custom element manifest](https://github.com/webcomponents/custom-elements-manifest) specification.

## Usage

### Generating a custom element manifest

We recommend to use the [`@custom-elements-manifest/analyzer` package](https://github.com/open-wc/custom-elements-manifest/tree/master/packages/analyzer) to generate a custom element manifest.

### Generating readmes

Once you documented your components with jsdoc, you can use e.g. the [`web-component-analyzer` package](https://github.com/runem/web-component-analyzer) to generate readme files for your components as well.

### Configuration

Just add the following script tag to your html file:

#### via JsDelivr

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/@webcomponents-preview/client"></script>
```

#### via unpkg

```html
<script type="module" src="https://unpkg.com/@webcomponents-preview/client"></script>
```

Then add the following markup to your html and pass in the manifest url and a path to the configuration file:

```html
<wcp-root config-url="/webcomponents-preview.config.json" manifest-url="/custom-elements.json"></wcp-root>
```

## Extras

**tbd**

- [ ] How to add previews from jsdoc -> cem analyzer plugin
- [ ] How to add existing readmes
- [ ] Plugin infrastructure

## Development

**tbd**
