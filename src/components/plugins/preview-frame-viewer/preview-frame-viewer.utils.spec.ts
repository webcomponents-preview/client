import type { CustomElementField } from 'custom-elements-manifest';
import { Field, litKey } from './preview-frame-viewer.utils';

// prepares a fixture from a given context partial
function cef(ctx: object): Field {
  return new Field({ ...ctx } as CustomElementField);
}

// prepares a fixture from a given field type text
function cefType(text: string): Field {
  return cef({ type: { text } });
}

describe('preview-frame-viewer.utils', () => {
  describe('Field', () => {
    it('flags field privacy', () => {
      expect(cef({}).isPublic).toBeTruthy();
      expect(cef({}).isProtected).toBeFalsy();
      expect(cef({}).isPrivate).toBeFalsy();

      expect(cef({ privacy: 'public' }).isPublic).toBeTruthy();
      expect(cef({ privacy: 'public' }).isProtected).toBeFalsy();
      expect(cef({ privacy: 'public' }).isPrivate).toBeFalsy();

      expect(cef({ privacy: 'private' }).isPrivate).toBeTruthy();
      expect(cef({ privacy: 'private' }).isProtected).toBeFalsy();
      expect(cef({ privacy: 'private' }).isPublic).toBeFalsy();

      expect(cef({ privacy: 'protected' }).isProtected).toBeTruthy();
      expect(cef({ privacy: 'protected' }).isPrivate).toBeFalsy();
      expect(cef({ privacy: 'protected' }).isPublic).toBeFalsy();
    });

    it('flags attribute presence', () => {
      expect(cef({}).hasAttribute).toBeFalsy();
      expect(cef({ attribute: 'foo' }).hasAttribute).toBeFalsy();
      expect(cef({ attribute: 'foo', reflects: true }).hasAttribute).toBeTruthy();
    });

    it('flags boolean type', () => {
      expect(cef({}).isBoolean).toBeFalsy();
      expect(cefType('boolean').isBoolean).toBeTruthy();
      expect(cefType('boolean | undefined').isBoolean).toBeTruthy();
      expect(cefType('boolean | undefined').isNumber).toBeFalsy();
      expect(cefType('boolean | undefined').isString).toBeFalsy();
      expect(cefType('boolean | undefined').isEnum).toBeFalsy();
      expect(cefType('boolean | undefined').isArray).toBeFalsy();
      expect(cefType('boolean | undefined').isObject).toBeFalsy();
    });

    it('flags number type', () => {
      expect(cef({}).isNumber).toBeFalsy();
      expect(cefType('number').isNumber).toBeTruthy();
      expect(cefType('number | undefined').isBoolean).toBeFalsy();
      expect(cefType('number | undefined').isNumber).toBeTruthy();
      expect(cefType('number | undefined').isString).toBeFalsy();
      expect(cefType('number | undefined').isEnum).toBeFalsy();
      expect(cefType('number | undefined').isArray).toBeFalsy();
      expect(cefType('number | undefined').isObject).toBeFalsy();
    });

    it('flags string type', () => {
      expect(cef({}).isString).toBeFalsy();
      expect(cefType('string').isString).toBeTruthy();
      expect(cefType(`'foo'`).isString).toBeTruthy();
      expect(cefType('string | undefined').isBoolean).toBeFalsy();
      expect(cefType('string | undefined').isNumber).toBeFalsy();
      expect(cefType('string | undefined').isString).toBeTruthy();
      expect(cefType('string | undefined').isEnum).toBeFalsy();
      expect(cefType('string | undefined').isArray).toBeFalsy();
      expect(cefType('string | undefined').isObject).toBeFalsy();

      expect(cefType(`'foo' | undefined`).isBoolean).toBeFalsy();
      expect(cefType(`'foo' | undefined`).isNumber).toBeFalsy();
      expect(cefType(`'foo' | undefined`).isString).toBeTruthy();
      expect(cefType(`'foo' | undefined`).isEnum).toBeFalsy();
      expect(cefType(`'foo' | undefined`).isArray).toBeFalsy();
      expect(cefType(`'foo' | undefined`).isObject).toBeFalsy();

      expect(cefType(`'foo' | 'bar' | undefined`).isBoolean).toBeFalsy();
      expect(cefType(`'foo' | 'bar' | undefined`).isNumber).toBeFalsy();
      expect(cefType(`'foo' | 'bar' | undefined`).isString).toBeTruthy();
      expect(cefType(`'foo' | 'bar' | undefined`).isEnum).toBeTruthy();
      expect(cefType(`'foo' | 'bar' | undefined`).isArray).toBeFalsy();
      expect(cefType(`'foo' | 'bar' | undefined`).isObject).toBeFalsy();
    });

    it('flags (simple) array type', () => {
      expect(cef({}).isObject).toBeFalsy();
      expect(cefType('string[]').isArray).toBeTruthy();
      expect(cefType('string[] | undefined').isArray).toBeTruthy();
      expect(cefType('ReadonlyArray<null> | undefined').isArray).toBeFalsy();
    });

    it('flags object type', () => {
      expect(cef({}).isObject).toBeFalsy();
      expect(cefType('object').isObject).toBeTruthy();
      expect(cefType('object | undefined').isObject).toBeTruthy();
      expect(cefType('Record<null, null>').isObject).toBeTruthy();
      expect(cefType('Record<null, null> | undefined').isObject).toBeTruthy();
    });
  });

  describe('litKey', () => {
    it('delivers property notation', () => {
      expect(litKey(cef({ name: 'foo' }))).toBe('.foo');
      expect(litKey(cef({ name: 'foo', attribute: 'foo', reflects: false }))).toBe('.foo');
    });

    it('delivers attribute notation', () => {
      expect(litKey(cef({ name: 'foo', attribute: 'foo', reflects: true }))).toBe('foo');
    });

    it('delivers boolean notation', () => {
      expect(litKey(cef({ name: 'foo', attribute: 'foo', reflects: true, type: { text: 'boolean' } }))).toBe('?foo');
    });
  });
});
