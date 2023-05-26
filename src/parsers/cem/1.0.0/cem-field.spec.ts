import { CemField } from './cem-field.js';

// prepares a fixture from a given field type text
function byType(text: string) {
  return new CemField({ type: { text } });
}

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
    expect(byType('boolean').isBoolean).toBeTruthy();
    expect(byType('boolean | undefined').isBoolean).toBeTruthy();
    expect(byType('boolean | undefined').isNumber).toBeFalsy();
    expect(byType('boolean | undefined').isString).toBeFalsy();
    expect(byType('boolean | undefined').isEnum).toBeFalsy();
    expect(byType('boolean | undefined').isArray).toBeFalsy();
    expect(byType('boolean | undefined').isObject).toBeFalsy();
  });

  it('flags number type', () => {
    expect(new CemField({}).isNumber).toBeFalsy();
    expect(byType('number').isNumber).toBeTruthy();
    expect(byType('number | undefined').isBoolean).toBeFalsy();
    expect(byType('number | undefined').isNumber).toBeTruthy();
    expect(byType('number | undefined').isString).toBeFalsy();
    expect(byType('number | undefined').isEnum).toBeFalsy();
    expect(byType('number | undefined').isArray).toBeFalsy();
    expect(byType('number | undefined').isObject).toBeFalsy();
  });

  it('flags string type', () => {
    expect(new CemField({}).isString).toBeFalsy();
    expect(byType('string').isString).toBeTruthy();
    expect(byType(`'foo'`).isString).toBeTruthy();
    expect(byType('string | undefined').isBoolean).toBeFalsy();
    expect(byType('string | undefined').isNumber).toBeFalsy();
    expect(byType('string | undefined').isString).toBeTruthy();
    expect(byType('string | undefined').isEnum).toBeFalsy();
    expect(byType('string | undefined').isArray).toBeFalsy();
    expect(byType('string | undefined').isObject).toBeFalsy();

    expect(byType(`'foo' | undefined`).isBoolean).toBeFalsy();
    expect(byType(`'foo' | undefined`).isNumber).toBeFalsy();
    expect(byType(`'foo' | undefined`).isString).toBeTruthy();
    expect(byType(`'foo' | undefined`).isEnum).toBeFalsy();
    expect(byType(`'foo' | undefined`).isArray).toBeFalsy();
    expect(byType(`'foo' | undefined`).isObject).toBeFalsy();

    expect(byType(`'foo' | 'bar' | undefined`).isBoolean).toBeFalsy();
    expect(byType(`'foo' | 'bar' | undefined`).isNumber).toBeFalsy();
    expect(byType(`'foo' | 'bar' | undefined`).isString).toBeTruthy();
    expect(byType(`'foo' | 'bar' | undefined`).isEnum).toBeTruthy();
    expect(byType(`'foo' | 'bar' | undefined`).isArray).toBeFalsy();
    expect(byType(`'foo' | 'bar' | undefined`).isObject).toBeFalsy();
  });

  it('flags (simple) array type', () => {
    expect(new CemField({}).isObject).toBeFalsy();
    expect(byType('string[]').isString).toBeFalsy();
    expect(byType('string[]').isArray).toBeTruthy();
    expect(byType('string[] | undefined').isArray).toBeTruthy();
    expect(byType('ReadonlyArray<null> | undefined').isArray).toBeFalsy();
  });

  it('flags object type', () => {
    expect(new CemField({}).isObject).toBeFalsy();
    expect(byType('object').isArray).toBeFalsy();
    expect(byType('object').isObject).toBeTruthy();
    expect(byType('object | undefined').isObject).toBeTruthy();
    expect(byType('Record<null, null>').isObject).toBeTruthy();
    expect(byType('Record<null, null> | undefined').isObject).toBeTruthy();
  });
});
