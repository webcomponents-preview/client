import type * as CEM from 'custom-elements-manifest';
import type { Slot } from '@/utils/parser.types.js';

export const CemSlot = class {
  get default(): string {
    // we use a bug in the analyzer for the time being to provide default contents
    // for slots by their inofficial (and maybe unintentionally shipped) type data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (this._slot as any).type?.text ?? '';
  }

  get hasDescription(): boolean {
    return this._slot.description !== undefined;
  }

  constructor(private _slot: CEM.Slot) {
    // allow access to the original data by proxying
    return new Proxy(this, {
      get: (t: this, p: keyof Element) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return p in t ? (t as any)[p] : (this._slot as any)[p];
      },
    });
  }
} as unknown as Slot;
