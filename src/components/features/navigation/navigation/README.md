<!-- Auto Generated Below -->

# wcp-navigation

**Mixins:** ColorSchemable

## Properties

| Property    | Attribute   | Type                  | Default | Description                                      |
|-------------|-------------|-----------------------|---------|--------------------------------------------------|
| `headline`  | `headline`  | `string \| undefined` |         | An optional headline to be shown for categorization |
| `open`      | `open`      | `boolean`             | false   | If togglable, this flag indicates if the nested items are currently visible |
| `togglable` | `togglable` | `boolean`             | false   | Allows the nested items to be toggled            |

## Methods

| Method           | Type                           |
|------------------|--------------------------------|
| `toggleClick`    | `(): void`                     |
| `toggleKeyboard` | `(event: KeyboardEvent): void` |

## Events

| Event                   | Description                                   |
|-------------------------|-----------------------------------------------|
| `wcp-navigation-toggle` | Emitted when the togglable open state changes |

## Slots

| Name     | Description                                      |
|----------|--------------------------------------------------|
|          | Default slot for navigation items or nested navigation |
| `action` | Slot for an action to be shown next to the headline |

## CSS Shadow Parts

| Part       | Description                    |
|------------|--------------------------------|
| `headline` | The headline of the navigation |
| `nav`      | The nested navigation          |

## CSS Custom Properties

| Property                                      | Description                                      |
|-----------------------------------------------|--------------------------------------------------|
| `--wcp-navigation-dark-border-color`          | Border color of the navigation headline in dark mode |
| `--wcp-navigation-headline-dark-background`   | Background color of the navigation headline in dark mode |
| `--wcp-navigation-headline-light-background`  | Background color of the navigation headline in light mode |
| `--wcp-navigation-headline-size`              | Font size of the navigation headline             |
| `--wcp-navigation-headline-spacing`           | Letter spacing of the navigation headline        |
| `--wcp-navigation-headline-weight`            | Font weight of the navigation headline           |
| `--wcp-navigation-inset`                      | Inset of the navigation if nested (is applied on each level) |
| `--wcp-navigation-light-border-color`         | Border color of the navigation headline in light mode |
| `--wcp-navigation-spacing`                    | Spacing between navigation and headline          |
| `--wcp-navigation-spacing-headline`           | Inner padding of the navigation headline         |
| `--wcp-navigation-spacing-headline-togglable` | Inner padding of the navigation headline if togglable |
| `--wcp-navigation-spacing-items`              | Spacing between navigation items                 |
