import type * as CEM from 'custom-elements-manifest';
import type { Element, Field, Slot } from '@/utils/parser.types.js';

import {
  type CustomElementDeclarationWithExamples,
  type CustomElementDeclarationWithGroups,
  type CustomElementDeclarationWithReadme,
  isCustomElementField,
} from '../utils.js';
import { CemField } from './cem-field.js';
import { CemSlot } from './cem-slot.js';

export const CemElement = class {
  #fields: Map<string, Field>;
  #slots: Map<string, Slot>;

  get fields() {
    return this.#fields;
  }
  get hasFields(): boolean {
    return this.#fields.size > 0;
  }

  get slots() {
    return this.#slots;
  }
  get hasSlots(): boolean {
    return this.#slots.size > 0;
  }

  get hasGroups(): boolean {
    return 'groups' in this._element;
  }
  get groups(): string[] {
    return (this._element as CustomElementDeclarationWithGroups).groups ?? [];
  }

  get hasReadme(): boolean {
    return 'readme' in this._element;
  }
  get readme(): string | undefined {
    return (this._element as CustomElementDeclarationWithReadme).readme;
  }

  get hasExamples(): boolean {
    return 'examples' in this._element && (this._element as CustomElementDeclarationWithExamples).examples.length > 0;
  }
  get examples(): string[] {
    return (this._element as CustomElementDeclarationWithExamples).examples ?? [];
  }

  getNiceName(): string {
    return this._element.name.replace(/([a-z])([A-Z])/g, '$1 $2');
  }

  getNiceUrl(): string {
    return this._element.tagName ?? this._element.name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }

  constructor(private _element: CEM.CustomElementDeclaration) {
    this.#fields =
      this._element.members
        ?.filter(isCustomElementField)
        .reduce((map, field) => map.set(field.name, new CemField(field)), new Map()) ?? new Map();
    this.#slots =
      this._element.slots?.reduce((map, slot) => map.set(slot.name, new CemSlot(slot)), new Map()) ?? new Map();

    // allow access to the original data by proxying
    return new Proxy(this, {
      get: (t: this, p: keyof Element) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return p in t ? (t as any)[p] : (this._element as any)[p];
      },
    });
  }
} as unknown as Element;
