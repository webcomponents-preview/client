import type * as CEM from 'custom-elements-manifest';
import type { Field } from '@/utils/parser.types.js';

import { WRAPPED_STRING_REGEX, getEnumValues, unwrapString } from '../utils.js';

export const CemField = class {
  #types: string[];
  #enumValues: string[];

  get isBoolean(): boolean {
    return this.#types[0] === 'boolean';
  }
  get isNumber(): boolean {
    return this.#types[0] === 'number';
  }
  get isString(): boolean {
    return this.#types[0] === 'string' || WRAPPED_STRING_REGEX.test(this.#types[0] ?? '');
  }
  get isEnum(): boolean {
    return this.#types.length > 1 && this.#types[1] !== 'undefined';
  }
  get isArray(): boolean {
    return this.#types[0]?.endsWith('[]');
  }
  get isObject(): boolean {
    return !!this._field.type && !this.isBoolean && !this.isNumber && !this.isString && !this.isArray;
  }

  get isControllable(): boolean {
    return this.isPublic && !this.isStatic;
  }

  get isOptional(): boolean {
    return !!this._field.type?.text.endsWith(' | undefined');
  }

  get hasAttribute(): boolean {
    return 'attribute' in this._field && !!this._field.reflects;
  }

  get hasDefault(): boolean {
    return this._field.default !== undefined;
  }

  get hasDescription(): boolean {
    return this._field.default !== undefined;
  }

  get isStatic(): boolean {
    return !!this._field.static;
  }
  get isPublic(): boolean {
    return !this._field.privacy || this._field.privacy === 'public';
  }
  get isPrivate(): boolean {
    return this._field.privacy === 'private';
  }
  get isProtected(): boolean {
    return this._field.privacy === 'protected';
  }

  get enumValues(): string[] {
    return this.#enumValues;
  }

  get default(): string | number | boolean | undefined {
    if (this.isBoolean) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return this.hasDefault && this._field.default!.startsWith('true');
    }
    if (this.isNumber) {
      return this.hasDefault && Number(this._field.default);
    }
    if (this.isString) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return this.hasDefault ? unwrapString(this._field.default!) : '';
    }

    return this._field.default;
  }

  constructor(private _field: CEM.CustomElementField) {
    this.#types = getEnumValues(this._field);
    this.#enumValues = this.#types.map(unwrapString);

    // allow access to the original data by proxying
    return new Proxy(this, {
      get: (t: this, p: keyof Element) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return p in t ? (t as any)[p] : (this._field as any)[p];
      },
    });
  }
} as unknown as Field;
