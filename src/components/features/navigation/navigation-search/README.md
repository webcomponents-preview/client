# wcp-navigation-search

**Mixins:** ColorSchemable

## Properties

| Property | Attribute | Type     | Default |
|----------|-----------|----------|---------|
| `term`   | `term`    | `string` | ""      |

## Methods

| Method              | Type                   |
|---------------------|------------------------|
| `#updateSearchTerm` | `(term: string): void` |

## Events

| Event                          | Description                                      |
|--------------------------------|--------------------------------------------------|
| `wcp-navigation-search:search` | Fired when the search term changes. Carries the new search term with it. |

## CSS Custom Properties

| Property                                       | Description                                      |
|------------------------------------------------|--------------------------------------------------|
| `--wcp-navigation-search-active-dark-stroke`   | The stroke color of the search input in dark mode when focused. |
| `--wcp-navigation-search-active-light-stroke`  | The stroke color of the search input in light mode when focused. |
| `--wcp-navigation-search-passive-dark-stroke`  | The stroke color of the search input in dark mode when not focused. |
| `--wcp-navigation-search-passive-light-stroke` | The stroke color of the search input in light mode when not focused. |
| `--wcp-navigation-search-spacing`              | The spacing around the search input.             |
