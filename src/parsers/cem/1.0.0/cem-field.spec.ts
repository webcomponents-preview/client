import { CemField } from './cem-field.js';

describe('cem-field', () => {
  it('flags field privacy', () => {
    expect(new CemField({}).isPublic).toBeTruthy();
    expect(new CemField({}).isProtected).toBeFalsy();
    expect(new CemField({}).isPrivate).toBeFalsy();

    expect(new CemField({ privacy: 'public' }).isPublic).toBeTruthy();
    expect(new CemField({ privacy: 'public' }).isProtected).toBeFalsy();
    expect(new CemField({ privacy: 'public' }).isPrivate).toBeFalsy();

    expect(new CemField({ privacy: 'private' }).isPrivate).toBeTruthy();
    expect(new CemField({ privacy: 'private' }).isProtected).toBeFalsy();
    expect(new CemField({ privacy: 'private' }).isPublic).toBeFalsy();

    expect(new CemField({ privacy: 'protected' }).isProtected).toBeTruthy();
    expect(new CemField({ privacy: 'protected' }).isPrivate).toBeFalsy();
    expect(new CemField({ privacy: 'protected' }).isPublic).toBeFalsy();
  });

  it('flags attribute presence', () => {
    expect(new CemField({}).hasAttribute).toBeFalsy();
    expect(new CemField({ attribute: 'foo' }).hasAttribute).toBeFalsy();
    expect(new CemField({ attribute: 'foo', reflects: true }).hasAttribute).toBeTruthy();
  });

  it('flags boolean type', () => {
    expect(new CemField({}).isBoolean).toBeFalsy();
    expect(new CemField({ type: { text: 'boolean' } }).isBoolean).toBeTruthy();
    expect(new CemField({ type: { text: 'boolean | undefined' } }).isBoolean).toBeTruthy();
    expect(new CemField({ type: { text: 'boolean | undefined' } }).isNumber).toBeFalsy();
    expect(new CemField({ type: { text: 'boolean | undefined' } }).isString).toBeFalsy();
    expect(new CemField({ type: { text: 'boolean | undefined' } }).isEnum).toBeFalsy();
    expect(new CemField({ type: { text: 'boolean | undefined' } }).isArray).toBeFalsy();
    expect(new CemField({ type: { text: 'boolean | undefined' } }).isObject).toBeFalsy();
  });

  it('flags number type', () => {
    expect(new CemField({}).isNumber).toBeFalsy();
    expect(new CemField({ type: { text: 'number' } }).isNumber).toBeTruthy();
    expect(new CemField({ type: { text: 'number | undefined' } }).isBoolean).toBeFalsy();
    expect(new CemField({ type: { text: 'number | undefined' } }).isNumber).toBeTruthy();
    expect(new CemField({ type: { text: 'number | undefined' } }).isString).toBeFalsy();
    expect(new CemField({ type: { text: 'number | undefined' } }).isEnum).toBeFalsy();
    expect(new CemField({ type: { text: 'number | undefined' } }).isArray).toBeFalsy();
    expect(new CemField({ type: { text: 'number | undefined' } }).isObject).toBeFalsy();
  });

  it('flags string type', () => {
    expect(new CemField({}).isString).toBeFalsy();
    expect(new CemField({ type: { text: 'string' } }).isString).toBeTruthy();
    expect(new CemField({ type: { text: `'foo'` } }).isString).toBeTruthy();
    expect(new CemField({ type: { text: 'string | undefined' } }).isBoolean).toBeFalsy();
    expect(new CemField({ type: { text: 'string | undefined' } }).isNumber).toBeFalsy();
    expect(new CemField({ type: { text: 'string | undefined' } }).isString).toBeTruthy();
    expect(new CemField({ type: { text: 'string | undefined' } }).isEnum).toBeFalsy();
    expect(new CemField({ type: { text: 'string | undefined' } }).isArray).toBeFalsy();
    expect(new CemField({ type: { text: 'string | undefined' } }).isObject).toBeFalsy();

    expect(new CemField({ type: { text: `'foo' | undefined` } }).isBoolean).toBeFalsy();
    expect(new CemField({ type: { text: `'foo' | undefined` } }).isNumber).toBeFalsy();
    expect(new CemField({ type: { text: `'foo' | undefined` } }).isString).toBeTruthy();
    expect(new CemField({ type: { text: `'foo' | undefined` } }).isEnum).toBeFalsy();
    expect(new CemField({ type: { text: `'foo' | undefined` } }).isArray).toBeFalsy();
    expect(new CemField({ type: { text: `'foo' | undefined` } }).isObject).toBeFalsy();

    expect(new CemField({ type: { text: `'foo' | 'bar' | undefined` } }).isBoolean).toBeFalsy();
    expect(new CemField({ type: { text: `'foo' | 'bar' | undefined` } }).isNumber).toBeFalsy();
    expect(new CemField({ type: { text: `'foo' | 'bar' | undefined` } }).isString).toBeTruthy();
    expect(new CemField({ type: { text: `'foo' | 'bar' | undefined` } }).isEnum).toBeTruthy();
    expect(new CemField({ type: { text: `'foo' | 'bar' | undefined` } }).isArray).toBeFalsy();
    expect(new CemField({ type: { text: `'foo' | 'bar' | undefined` } }).isObject).toBeFalsy();
  });

  it('flags enum type', () => {
    expect(new CemField({ type: { text: `'foo' | 'bar' | undefined` } }).isEnum).toBeTruthy();
    expect(new CemField({ type: { text: `| 'foo'\n    | 'bar'\n    | 'baz'` } }).isEnum).toBeTruthy();
  });

  it('sanitizes malformed unions (as this happens in the wild...)', () => {
    expect(new CemField({ type: { text: `| 'foo'\n    | 'bar'\n    | 'baz'` } }).enumValues).toEqual([
      'foo',
      'bar',
      'baz',
    ]);
  });

  it('flags (simple) array type', () => {
    expect(new CemField({}).isObject).toBeFalsy();
    expect(new CemField({ type: { text: 'string[]' } }).isString).toBeFalsy();
    expect(new CemField({ type: { text: 'string[]' } }).isArray).toBeTruthy();
    expect(new CemField({ type: { text: 'string[] | undefined' } }).isArray).toBeTruthy();
    expect(new CemField({ type: { text: 'ReadonlyArray<null> | undefined' } }).isArray).toBeFalsy();
  });

  it('flags object type', () => {
    expect(new CemField({}).isObject).toBeFalsy();
    expect(new CemField({ type: { text: 'object' } }).isArray).toBeFalsy();
    expect(new CemField({ type: { text: 'object' } }).isObject).toBeTruthy();
    expect(new CemField({ type: { text: 'object | undefined' } }).isObject).toBeTruthy();
    expect(new CemField({ type: { text: 'Record<null, null>' } }).isObject).toBeTruthy();
    expect(new CemField({ type: { text: 'Record<null, null> | undefined' } }).isObject).toBeTruthy();
  });
});
