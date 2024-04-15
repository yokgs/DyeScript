const { TextCaseConverter } = require('../dist/common/TextCaseConverter');
const assert = require("assert");

describe('TextCaseConverter', () => {
  describe('toKebabCase', () => {
    it('should convert a string to kebab case', () => {
      assert.equal(TextCaseConverter.toKebabCase('WebkitTransform'), '-webkit-transform');
      assert.equal(TextCaseConverter.toKebabCase('backgroundColor'), 'background-color');
      assert.equal(TextCaseConverter.toKebabCase('helloWorld'), 'hello-world');
      assert.equal(TextCaseConverter.toKebabCase('hello-world'), 'hello-world');
    });
  });

  describe('toCamelCase', () => {
    it('should convert a string to camel case', () => {
      assert.equal(TextCaseConverter.toCamelCase('-webkit-transform'), 'WebkitTransform');
      assert.equal(TextCaseConverter.toCamelCase('background-color'), 'backgroundColor');
      assert.equal(TextCaseConverter.toCamelCase('hello-world'), 'helloWorld');
      assert.equal(TextCaseConverter.toCamelCase('helloWorld'), 'helloWorld');
    });
  });
});
