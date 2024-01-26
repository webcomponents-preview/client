/**
 * Wraps custom element field declarations to provide additional meta data.
 */
export type GenericField<T> = {
  name: string;

  // type information
  isBoolean: T extends boolean ? true : false;
  isNumber: T extends number ? true : false;
  isString: T extends string ? true : false;
  isArray: T extends [] ? true : false;
  isEnum: T extends string ? boolean : false;
  isObject: boolean;

  /**
   * Indicates if the field can be controlled by the viewer.
   */
  isControllable: boolean;
  isOptional: boolean;

  hasAttribute: boolean;
  attribute?: string;

  hasDefault: boolean;
  default?: T;

  hasDescription: boolean;
  description?: string;

  isStatic: boolean;
  isPublic: boolean;
  isPrivate: boolean;
  isProtected: boolean;

  enumValues: string[];

  // we always need a call signature
  new (element: object): Field;
};

export type Field =
  | GenericField<boolean>
  | GenericField<number>
  | GenericField<string>
  | GenericField<[]>
  | GenericField<unknown>;

export type Slot = {
  /**
   * Contains the default type of the slot.
   */
  default: string;

  /**
   * Default slots should have an empty name ('').
   */
  name: '' | string;

  // we always need a call signature
  new (element: object): Slot;
} & (
  | {
      hasDescription: true;
      description: string;
    }
  | {
      hasDescription: false;
      description: undefined;
    }
);

/**
 * Wraps custom element declarations to provide additional meta data.
 */
export type Element = {
  /**
   * Contains all fields, keyed by their property name.
   */
  fields: Map<string, Field>;
  hasFields: boolean;

  /**
   * Contains all slots, keyed by their name.
   * The default slot always has an empty name ('').
   */
  slots: Map<string, Slot>;
  hasSlots: boolean;

  name: string;
  tagName: string;

  getNiceName(): string;
  getNiceUrl(): string;

  // we always need a call signature
  new (element: object): Element;
} & (
  | {
      hasGroups: true;
      groups: [string, ...string[]];
    }
  | {
      hasGroups: false;
      groups: [];
    }
) &
  (
    | {
        hasReadme: true;
        readme: string;
      }
    | {
        hasReadme: false;
        readme: undefined;
      }
  ) &
  (
    | {
        hasExamples: true;
        examples: [string, ...string[]];
      }
    | {
        hasExamples: false;
        examples: [];
      }
  );

/**
 * Grouped elements, even nested.
 * The key is either the group or element name.
 */
export type GroupedElements = Map<string, Element | GroupedElements>;

/**
 * Wraps a manifest to provide additional meta data.
 */
export type Manifest = {
  /**
   * Contains all custom elements, keyed by their tag name.
   */
  elements: Map<string, Element>;

  /**
   * Delivers the elements grouped.
   */
  groupedElements(fallbackGroupName: string): GroupedElements;
};

export type Parser = {
  /**
   * Parses the given data to a manifest with some meta data.
   * Allow the exclusion of certain elements by their tag name.
   */
  new (data: object, exclude?: string[]): Manifest;
};
