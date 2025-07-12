import { expect } from '@esm-bundle/chai';

import { CemField } from './cem-field.js';

describe('cem-field', () => {
  it('flags field privacy', () => {
    expect(new CemField({}).isPublic).to.be.true;
    expect(new CemField({}).isProtected).to.be.false;
    expect(new CemField({}).isPrivate).to.be.false;

    expect(new CemField({ privacy: 'public' }).isPublic).to.be.true;
    expect(new CemField({ privacy: 'public' }).isProtected).to.be.false;
    expect(new CemField({ privacy: 'public' }).isPrivate).to.be.false;

    expect(new CemField({ privacy: 'private' }).isPrivate).to.be.true;
    expect(new CemField({ privacy: 'private' }).isProtected).to.be.false;
    expect(new CemField({ privacy: 'private' }).isPublic).to.be.false;

    expect(new CemField({ privacy: 'protected' }).isProtected).to.be.true;
    expect(new CemField({ privacy: 'protected' }).isPrivate).to.be.false;
    expect(new CemField({ privacy: 'protected' }).isPublic).to.be.false;
  });

  it('flags attribute presence', () => {
    expect(new CemField({}).hasAttribute).to.be.false;
    expect(new CemField({ attribute: 'foo' }).hasAttribute).to.be.false;
    expect(new CemField({ attribute: 'foo', reflects: true }).hasAttribute).to.be.true;
  });

  it('flags boolean type', () => {
    expect(new CemField({}).isBoolean).to.be.false;
    expect(new CemField({ type: { text: 'boolean' } }).isBoolean).to.be.true;
    expect(new CemField({ type: { text: 'boolean | undefined' } }).isBoolean).to.be.true;
    expect(new CemField({ type: { text: 'boolean | undefined' } }).isNumber).to.be.false;
    expect(new CemField({ type: { text: 'boolean | undefined' } }).isString).to.be.false;
    expect(new CemField({ type: { text: 'boolean | undefined' } }).isEnum).to.be.false;
    expect(new CemField({ type: { text: 'boolean | undefined' } }).isArray).to.be.false;
    expect(new CemField({ type: { text: 'boolean | undefined' } }).isObject).to.be.false;
  });

  it('flags number type', () => {
    expect(new CemField({}).isNumber).to.be.false;
    expect(new CemField({ type: { text: 'number' } }).isNumber).to.be.true;
    expect(new CemField({ type: { text: 'number | undefined' } }).isBoolean).to.be.false;
    expect(new CemField({ type: { text: 'number | undefined' } }).isNumber).to.be.true;
    expect(new CemField({ type: { text: 'number | undefined' } }).isString).to.be.false;
    expect(new CemField({ type: { text: 'number | undefined' } }).isEnum).to.be.false;
    expect(new CemField({ type: { text: 'number | undefined' } }).isArray).to.be.false;
    expect(new CemField({ type: { text: 'number | undefined' } }).isObject).to.be.false;
  });

  it('flags string type', () => {
    expect(new CemField({}).isString).to.be.false;
    expect(new CemField({ type: { text: 'string' } }).isString).to.be.true;
    expect(new CemField({ type: { text: "'foo'" } }).isString).to.be.true;
    expect(new CemField({ type: { text: 'string | undefined' } }).isBoolean).to.be.false;
    expect(new CemField({ type: { text: 'string | undefined' } }).isNumber).to.be.false;
    expect(new CemField({ type: { text: 'string | undefined' } }).isString).to.be.true;
    expect(new CemField({ type: { text: 'string | undefined' } }).isEnum).to.be.false;
    expect(new CemField({ type: { text: 'string | undefined' } }).isArray).to.be.false;
    expect(new CemField({ type: { text: 'string | undefined' } }).isObject).to.be.false;

    expect(new CemField({ type: { text: "'foo' | undefined" } }).isBoolean).to.be.false;
    expect(new CemField({ type: { text: "'foo' | undefined" } }).isNumber).to.be.false;
    expect(new CemField({ type: { text: "'foo' | undefined" } }).isString).to.be.true;
    expect(new CemField({ type: { text: "'foo' | undefined" } }).isEnum).to.be.false;
    expect(new CemField({ type: { text: "'foo' | undefined" } }).isArray).to.be.false;
    expect(new CemField({ type: { text: "'foo' | undefined" } }).isObject).to.be.false;

    expect(new CemField({ type: { text: "'foo' | 'bar' | undefined" } }).isBoolean).to.be.false;
    expect(new CemField({ type: { text: "'foo' | 'bar' | undefined" } }).isNumber).to.be.false;
    expect(new CemField({ type: { text: "'foo' | 'bar' | undefined" } }).isString).to.be.true;
    expect(new CemField({ type: { text: "'foo' | 'bar' | undefined" } }).isEnum).to.be.true;
    expect(new CemField({ type: { text: "'foo' | 'bar' | undefined" } }).isArray).to.be.false;
    expect(new CemField({ type: { text: "'foo' | 'bar' | undefined" } }).isObject).to.be.false;
  });

  it('flags enum type', () => {
    expect(new CemField({ type: { text: "'foo' | 'bar' | undefined" } }).isEnum).to.be.true;
    expect(new CemField({ type: { text: "| 'foo'\n    | 'bar'\n    | 'baz'" } }).isEnum).to.be.true;
  });

  it('sanitizes malformed unions (as this happens in the wild...)', () => {
    expect(new CemField({ type: { text: "| 'foo'\n    | 'bar'\n    | 'baz'" } }).enumValues).to.eql([
      'foo',
      'bar',
      'baz',
    ]);
  });

  it('flags (simple) array type', () => {
    expect(new CemField({}).isObject).to.be.false;
    expect(new CemField({ type: { text: 'string[]' } }).isString).to.be.false;
    expect(new CemField({ type: { text: 'string[]' } }).isArray).to.be.true;
    expect(new CemField({ type: { text: 'string[] | undefined' } }).isArray).to.be.true;
    expect(new CemField({ type: { text: 'ReadonlyArray<null> | undefined' } }).isArray).to.be.false;
  });

  it('flags object type', () => {
    expect(new CemField({}).isObject).to.be.false;
    expect(new CemField({ type: { text: 'object' } }).isArray).to.be.false;
    expect(new CemField({ type: { text: 'object' } }).isObject).to.be.true;
    expect(new CemField({ type: { text: 'object | undefined' } }).isObject).to.be.true;
    expect(new CemField({ type: { text: 'Record<null, null>' } }).isObject).to.be.true;
    expect(new CemField({ type: { text: 'Record<null, null> | undefined' } }).isObject).to.be.true;
  });
});
