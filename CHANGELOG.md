# <img align="left" src="https://github.com/webcomponents-preview/client/raw/main/src/assets/icons/logo.svg" alt="WCP Logo" height="43px"> Web Components Preview

## [0.5.6](https://github.com/webcomponents-preview/client/compare/0.5.5...0.5.6) (2023-08-18)


### Bug Fixes

* **wcp-aside:** restore visibility properly ([2cbd12f](https://github.com/webcomponents-preview/client/commit/2cbd12f9ad15fbca71c49089c474ee086f39f287))

## [0.5.5](https://github.com/webcomponents-preview/client/compare/0.5.4...0.5.5) (2023-08-16)


### Bug Fixes

* **wcp-stage-editor-preview:** do not render empty slot contents ([aa96310](https://github.com/webcomponents-preview/client/commit/aa96310bafb76f705752b9dccf7c0efab65e8849))

## [0.5.4](https://github.com/webcomponents-preview/client/compare/0.5.3...0.5.4) (2023-08-16)


### Bug Fixes

* **wcp-aside:** close navigation dependent on layout ([f08d8c0](https://github.com/webcomponents-preview/client/commit/f08d8c01d59dd861e6e471d2666d1efcfb7c28ff))

## [0.5.3](https://github.com/webcomponents-preview/client/compare/0.5.2...0.5.3) (2023-08-16)


### Bug Fixes

* **wcp-root-navigation:** close navigation after redirect ([8d90690](https://github.com/webcomponents-preview/client/commit/8d906904c8b2028c96b371d0ddb0d2977d21ac7c))

## [0.5.2](https://github.com/webcomponents-preview/client/compare/0.5.1...0.5.2) (2023-08-15)


### Bug Fixes

* **wcp-navigation:** sort navigation items and groups ([b97162e](https://github.com/webcomponents-preview/client/commit/b97162ef31c0266a992875aefa319a4c673398af))

## [0.5.1](https://github.com/webcomponents-preview/client/compare/0.5.0...0.5.1) (2023-08-15)

# [0.5.0](https://github.com/webcomponents-preview/client/compare/0.4.2...0.5.0) (2023-08-15)


### Bug Fixes

* add plugins to barrel ([c899d01](https://github.com/webcomponents-preview/client/commit/c899d0165629e90ca6b8648d4089259611a401ce))
* **wcp-preview-editor-link:** check availability correctly ([82dcdb1](https://github.com/webcomponents-preview/client/commit/82dcdb189ab37b5640b69476f02199a4893c5fa5))


### Features

* add log prefix ([76a8fbc](https://github.com/webcomponents-preview/client/commit/76a8fbca61640e84a0ca1891bf3db269a476c248))
* add log util ([0623e83](https://github.com/webcomponents-preview/client/commit/0623e83de3a58b7294c7b1fe822bc54a891c3e32))
* add state persistence to config ([d183440](https://github.com/webcomponents-preview/client/commit/d18344051eafdc13e0df62bcfaa2d79c852d94ee))
* add topbar plugin type ([002f11c](https://github.com/webcomponents-preview/client/commit/002f11ce4e25b212e850e2b0703ef064d4a1ff4e))
* add utils to manage global state ([3481e80](https://github.com/webcomponents-preview/client/commit/3481e80b108f60c6af1ff0aff9120d03f420b6a3))
* use global state for color-scheme, sidebar and editor link hints ([8ec0382](https://github.com/webcomponents-preview/client/commit/8ec0382df1ecfde329b4e2e585a09878b2367dcb))
* **wcp-preview-editor-link:** toggle from global event ([00f1055](https://github.com/webcomponents-preview/client/commit/00f1055824103b0ac3e97b830049c7835ba7047f))
* **wcp-root-splash:** introduce component ([5c2d8c7](https://github.com/webcomponents-preview/client/commit/5c2d8c7b0b97b2ac91e47a517d4857a44f540e19))
* **wcp-root:** use topbar elements from config ([c4f6691](https://github.com/webcomponents-preview/client/commit/c4f66914d3d5803f3cb6bbe26ee0afc82c7ea66d))
* **wcp-topbar-preview-editor-link-toggle:** introduce plugin component ([5314627](https://github.com/webcomponents-preview/client/commit/5314627abbb8b43cd97e97a2ef8ad0bcb4c2c4a5))

## [0.4.2](https://github.com/webcomponents-preview/client/compare/0.4.1...0.4.2) (2023-08-11)


### Bug Fixes

* **wcp-preview-editor-link:** ignore slot attribute ([358a78e](https://github.com/webcomponents-preview/client/commit/358a78e5d95abd1f81caa2f2a67c181e9bb1ce76))

## [0.4.1](https://github.com/webcomponents-preview/client/compare/0.4.0...0.4.1) (2023-08-10)


### Bug Fixes

* **wcp-input-select:** align input query type ([4632896](https://github.com/webcomponents-preview/client/commit/463289617e08e83364c709587a2d40121f12a382))

# [0.4.0](https://github.com/webcomponents-preview/client/compare/0.3.4...0.4.0) (2023-08-09)


### Bug Fixes

* **wcp-input-code:** redispatch event with ([bbd9082](https://github.com/webcomponents-preview/client/commit/bbd9082948d8874726ad8ed9e0c71380a2b05992))
* **wcp-stage-editor-controls:** allow string based dropdowns only ([a4232fa](https://github.com/webcomponents-preview/client/commit/a4232fa2aa5ebc2a9f3a3862e4f898e47fde3aea))
* **wcp-stage-editor-preview:** always re-render on element data changes ([4862bcd](https://github.com/webcomponents-preview/client/commit/4862bcdeae080e66fc572a51879a03ec10ef657c))


### Features

* **wcp-input-key-value-pairs:** introduce new component ([b4f2c77](https://github.com/webcomponents-preview/client/commit/b4f2c772396d355cb1235b83ff24ab53f2ab6d36))
* **wcp-input-key-value:** introduce new component ([6d4f867](https://github.com/webcomponents-preview/client/commit/6d4f867b56a05cc8bce760edf5924d871a11e464))
* **wcp-stage-editor-controls:** organize controls in tabs ([f24b21d](https://github.com/webcomponents-preview/client/commit/f24b21ddc62491fc45d449b1486188c17c84e834))
* **wcp-stage-editor:** allow editing generic attributes ([27ffdd9](https://github.com/webcomponents-preview/client/commit/27ffdd94180d13fe1b8b4bb26d076a2dfc0909d8))

## [0.3.4](https://github.com/webcomponents-preview/client/compare/0.3.3...0.3.4) (2023-08-08)


### Bug Fixes

* **wcp-input-code:** align event handling ([b71d3a2](https://github.com/webcomponents-preview/client/commit/b71d3a24c2ca8c92cba2a9de4a70c5f4748204e8))
* **wcp-stage-editor-preview:** align whitespace ([b4f6df1](https://github.com/webcomponents-preview/client/commit/b4f6df1ba7b89261de2223c42f6f736a3e52f4d5))
* **wcp-stage-editor-preview:** set attributes state in preview ([f0078f6](https://github.com/webcomponents-preview/client/commit/f0078f6e8d86b481db3debf47e0a207e8a0afbcd))

## [0.3.3](https://github.com/webcomponents-preview/client/compare/0.3.2...0.3.3) (2023-08-08)

## [0.3.2](https://github.com/webcomponents-preview/client/compare/0.3.1...0.3.2) (2023-08-08)


### Bug Fixes

* add missing export ([b7ff367](https://github.com/webcomponents-preview/client/commit/b7ff367cb4dfa185d92b843873352cbba4e799ee))
* align it.each types ([c6fce6e](https://github.com/webcomponents-preview/client/commit/c6fce6e3f2e1ebb3a45a636606f203b83ec33b7c))
* load missing grammars ([66c4967](https://github.com/webcomponents-preview/client/commit/66c496798fd47c4d71e75228254e3ac9dee3881e))
* **wcp-readme:** render async markdown ([6eff363](https://github.com/webcomponents-preview/client/commit/6eff363f1f4e9389e95d3ee4a465faca0138bd1e))
* **wcp-stage-editor:** render async markdown ([47ea75b](https://github.com/webcomponents-preview/client/commit/47ea75b7241fed3dd4a9bc522dae095d13ac91da))
* **wcp-stage-examples:** render async markdown ([de0ad86](https://github.com/webcomponents-preview/client/commit/de0ad86f20a3c13e4963b2233d73526bb4a544f5))

## [0.3.1](https://github.com/webcomponents-preview/client/compare/0.3.0...0.3.1) (2023-08-07)


### Performance Improvements

* debounce control changes ([1462c37](https://github.com/webcomponents-preview/client/commit/1462c37887f67b84a8d817792e95ba905b5b7ade))

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