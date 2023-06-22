# wcp-root-navigation

Manages the main root-navigation in the application root.

## Properties

| Property          | Attribute           | Type                  | Default     |
|-------------------|---------------------|-----------------------|-------------|
| `currentPath`     |                     | `string \| undefined` |             |
| `items`           |                     |                       | "new Map()" |
| `minSearchLength` | `min-search-length` | `number`              | 1           |
| `router`          |                     |                       |             |
| `searchTerms`     |                     | `object`              | []          |

## Methods

| Method           | Type                         |
|------------------|------------------------------|
| `#matchesSearch` | `(content: string): boolean` |
