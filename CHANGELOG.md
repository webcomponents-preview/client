# <img align="left" src="https://github.com/webcomponents-preview/client/raw/main/src/assets/icons/logo.svg" alt="WCP Logo" height="43px"> Web Components Preview

# [0.3.0](https://github.com/webcomponents-preview/client/compare/0.2.0...0.3.0) (2023-08-05)


### Bug Fixes

* align buggy form data ([5addf24](https://github.com/webcomponents-preview/client/commit/5addf24984ff8e4157c0bc0accb6c83334e14763))
* align form input value handling ([cda5dff](https://github.com/webcomponents-preview/client/commit/cda5dffd01faafe4ad544437493baccd1063b673))
* align routing to recognize plugin data properly ([a126ab9](https://github.com/webcomponents-preview/client/commit/a126ab9c980288b103223c181daf519573f8fec1))
* navigation headline border ([422e14f](https://github.com/webcomponents-preview/client/commit/422e14f612a3b40863c967b01790390615eeaffd))
* **PreviewPlugin:** align type to be readonly ([61731dc](https://github.com/webcomponents-preview/client/commit/61731dc50a4bfbb8ec1810f328189913ef4eeee9))
* **wcp-button:** proper aspect ration notation ([9629780](https://github.com/webcomponents-preview/client/commit/962978028a1dcfee18852d61e0e10e155d265336))
* **wcp-input-code:** handle value changes ([7fb1f95](https://github.com/webcomponents-preview/client/commit/7fb1f955c66e98ad66569508a773145747e2798b))
* **wcp-preview-frame-viewer-controls:** access state properly ([ceca006](https://github.com/webcomponents-preview/client/commit/ceca006379ff02d148dd97b3ffcdedb88009a5e1))
* **wcp-preview-hint:** set size for Safari ([466a58c](https://github.com/webcomponents-preview/client/commit/466a58cb17407baa0a53f49dac0c1cffb3217c76))
* **wcp-preview-viewer-link-hint:** check for stage changes ([7dd84ed](https://github.com/webcomponents-preview/client/commit/7dd84ed077e00ea476606ab2310d11844561cb90))
* **wcp-preview-viewer-link-hint:** switched axis ([500e17b](https://github.com/webcomponents-preview/client/commit/500e17b0adcd4980e56f9a22df082e3363c486a7))
* **wcp-preview-viewer-link:** detach hints as well ([fbf5f99](https://github.com/webcomponents-preview/client/commit/fbf5f99d3ab44961a8aac1cb42e73749ceaaae04))
* **wcp-preview-viewer-link:** isolate hints stacking context ([b7da3c0](https://github.com/webcomponents-preview/client/commit/b7da3c0b55f7d927ac3f187ed54ed6dc35df3efa))
* **wcp-preview:** orchestrate viewport preview ([2c07954](https://github.com/webcomponents-preview/client/commit/2c079541c24a2d2de5bd9e144feee580544016c3))
* **wcp-stage-editor:** properly handle state ([9eb8579](https://github.com/webcomponents-preview/client/commit/9eb85798b96a827368a017d14dd96055009168d6))


### Features

* add utils for (de)compressing strings ([40d57d4](https://github.com/webcomponents-preview/client/commit/40d57d4a4440b2dd96925dd0b56869137c32004b))
* improve router ([ff8f264](https://github.com/webcomponents-preview/client/commit/ff8f26459d1a6f0217e4f7bac97cd5b7716f91da))
* prepare plugin routes for additional string data param ([0e128c3](https://github.com/webcomponents-preview/client/commit/0e128c3bb498d20fbd9240327e3a8698ab915ca5))
* **wcp-input-code:** prevent scroll handling if auto sized ([2c9a3a9](https://github.com/webcomponents-preview/client/commit/2c9a3a94f3bc8e443e7c350f7bbbaebaebf47912))
* **wcp-preview-frame-viewer-controls:** use auto sizing slot editors ([6db75c1](https://github.com/webcomponents-preview/client/commit/6db75c1c1e69e7353df90e165dd78fdba224c37d))
* **wcp-preview-frame-viewer:** persist state in url ([f0d8657](https://github.com/webcomponents-preview/client/commit/f0d8657d1a61c1fd1e781ef489a7fe49260ed940))
* **wcp-preview-hint:** introduce hint marker ([6e1ea4d](https://github.com/webcomponents-preview/client/commit/6e1ea4de0913063235a52c124c46d9e6d7251cc1))
* **wcp-preview-hint:** position marker relative to offset parent ([5293145](https://github.com/webcomponents-preview/client/commit/52931459871189c6d1ba3fc513ae69c6dd1962f2))
* **wcp-preview-hint:** react to element size changes ([99ba27d](https://github.com/webcomponents-preview/client/commit/99ba27d742ee6f9d96e89fe37220d17fd27723d7))
* **wcp-preview-viewer-link-hint:** always show debug overlay ([995f999](https://github.com/webcomponents-preview/client/commit/995f999b2d230ae760152c53534757b24caffafa))
* **wcp-preview-viewer-link:** handle slots as well ([6c7196f](https://github.com/webcomponents-preview/client/commit/6c7196fcee58145a3c7ca4ed3a4ea382d69bc331))
* **wcp-preview-viewer-link:** toggle plugin availability ([1682662](https://github.com/webcomponents-preview/client/commit/16826620047ecae44d3b249910ff374ec1fe54c7))
* **wcp-preview-viewer-link:** use toggle icon button ([fab87ef](https://github.com/webcomponents-preview/client/commit/fab87ef8454ffbf6840a021264292cccc6e25ea1))
* **wcp-preview:** hand in tag name of previewed element ([62740e2](https://github.com/webcomponents-preview/client/commit/62740e239ae243a46a73f3ab8c01a5bdddf9bb02))
* **wcp-preview:** hide unavailable plugins ([ad1d495](https://github.com/webcomponents-preview/client/commit/ad1d49580bbb709828715e1b50856e49ff0738df))
* **wcp-preview:** show in viewer as well ([f5ffd9d](https://github.com/webcomponents-preview/client/commit/f5ffd9d4772fd66e0cfb6c82e0735123b076ac4c))


### Performance Improvements

* use only relevant workers ([3606b83](https://github.com/webcomponents-preview/client/commit/3606b837a56a4ba3bd0fc4aa68a72ca50a5c8a08))


### Reverts

* do not optimize at the wrong place ([ada981b](https://github.com/webcomponents-preview/client/commit/ada981b3d8b9be2e737a868c68a7838fa56214ab))

# [0.2.0](https://github.com/webcomponents-preview/client/compare/0.1.0...0.2.0) (2023-06-22)


### Bug Fixes

* **wcp-input-code:** align autosize ([90b9213](https://github.com/webcomponents-preview/client/commit/90b92131d8acb8f26233483772655efc28c09c93))


### Features

* **wcp-navigation-search:** introduce component ([e030067](https://github.com/webcomponents-preview/client/commit/e03006724122d7f390e5056f8d6c01f74f9404b3))
* **wcp-root-navigation:** add empty message ([f48285a](https://github.com/webcomponents-preview/client/commit/f48285a06203a767af46625706034571d45281f1))
* **wcp-root:** add simple search ([4139f00](https://github.com/webcomponents-preview/client/commit/4139f0055e7f3bd6d7e773941e279a760ec8f183))


### Performance Improvements

* prevent router outlet from re-rendering ([ac3adf9](https://github.com/webcomponents-preview/client/commit/ac3adf953aac5a35527f3e8da153bf3cb90dd243))

# [0.1.0](https://github.com/webcomponents-preview/client/compare/0.0.52...0.1.0) (2023-06-21)


### Bug Fixes

* typo ([7fd3ba0](https://github.com/webcomponents-preview/client/commit/7fd3ba015c6796664b406d7cbccd1f6cfa236b33))
* **wcp-input-text:** align value assignment ([ac3e624](https://github.com/webcomponents-preview/client/commit/ac3e624b116a61063e80b36e3341661c978bf76e))
* **wcp-preview-frame-viewer-controls:** target hint slot correctly ([48928aa](https://github.com/webcomponents-preview/client/commit/48928aaa28e1afd7476b5ba6859ec69d83271fdd))
* **wcp-root:** fix typos ([2989ea9](https://github.com/webcomponents-preview/client/commit/2989ea97dab9bdf972894a16f635f7e46d1b3793))


### Features

* **wcp-input-checkbox:** add basic checkbox form element ([d98fd4a](https://github.com/webcomponents-preview/client/commit/d98fd4abb4e4b6bf65457ad9453e7fa8f50546b1))
* **wcp-input-code:** introduce code editor as form element ([0f5184a](https://github.com/webcomponents-preview/client/commit/0f5184a10394e0f3e81055d6ff8b06866ffdb541))
* **wcp-input-number:** add basic number form element ([4127bd1](https://github.com/webcomponents-preview/client/commit/4127bd1a6aa8bf41d5208572d35c4da0632e07b1))
* **wcp-input-radio:** add basic radio form element ([6e74c27](https://github.com/webcomponents-preview/client/commit/6e74c27745f7e211b37cdf0f5d69649e31384ebf))
* **wcp-input-select:** introduce select component ([d0c6eaf](https://github.com/webcomponents-preview/client/commit/d0c6eafcc241f1ed21e44c47d3533197690dd586))
* **wcp-input-text:** add basic text form element ([ab509d9](https://github.com/webcomponents-preview/client/commit/ab509d91fbfff0f1ee72b569636c45d83d68e969))
* **wcp-input-text:** allow some additional string based input types ([aeb3f7e](https://github.com/webcomponents-preview/client/commit/aeb3f7e9f9062b4c11e4f0eae052737b6c256c55))
* **wcp-preview-frame-viewer-controls:** render markdown in hints ([41da716](https://github.com/webcomponents-preview/client/commit/41da71602561d970e4362569f410ea975cc1abc7))
* **wcp-preview-frame-viewer-controls:** separate component logic ([bbae49e](https://github.com/webcomponents-preview/client/commit/bbae49e331a92fb7d16a83fc13535f34c7e74115))
* **wcp-preview-frame-viewer-controls:** use code editor for slot contents ([c574a7e](https://github.com/webcomponents-preview/client/commit/c574a7eb426af9dbb6eef97f378432b1fb789c22))
* **wcp-preview-frame:** use new custom form elements ([3e8ea45](https://github.com/webcomponents-preview/client/commit/3e8ea45266a2aaad9cbb1d22188eb4e158b32d68))
* **wcp-radio-menu:** add basic radio menu form element ([dbf62a2](https://github.com/webcomponents-preview/client/commit/dbf62a241e4327aa13cd655dc25b7485c22b7c23))

## [0.0.52](https://github.com/webcomponents-preview/client/compare/0.0.51...0.0.52) (2023-06-20)

## [0.0.51](https://github.com/webcomponents-preview/client/compare/0.0.50...0.0.51) (2023-06-15)


### Bug Fixes

* **wcp-preview:** allow scrolling preview contents ([48b3c5d](https://github.com/webcomponents-preview/client/commit/48b3c5d6124233862b44f26e75d3452a65b65a0e))

## [0.0.50](https://github.com/webcomponents-preview/client/compare/0.0.49...0.0.50) (2023-06-14)