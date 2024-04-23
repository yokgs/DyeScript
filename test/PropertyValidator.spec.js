const { PropertyValidator } = require('../dist/validator/PropertyValidator');
const assert = require("assert");

describe('PropertyValidator', () => {
    describe('isValid', () => {
        const validator = new PropertyValidator();
        it('should check if a css property is valid', () => {
            assert.equal(validator.isValid(''), false);
            assert.equal(validator.isValid(' '), false);
            assert.equal(validator.isValid('123'), false);
            assert.equal(validator.isValid('--'), false);
            assert.equal(validator.isValid('border-style-'), false);
            assert.equal(validator.isValid('d'), false);
          });
      
          it('should check if a css property is valid (valid properties)', () => {
            assert.equal(validator.isValid('color'), true);
            assert.equal(validator.isValid('background-color'), true);
            assert.equal(validator.isValid('font-size'), true);
            assert.equal(validator.isValid('margin-top'), true);
            assert.equal(validator.isValid('padding-left'), true);
            assert.equal(validator.isValid('border-width'), true);
            assert.equal(validator.isValid('border-color'), true);
            assert.equal(validator.isValid('border-style'), true);
          });
      
          it('should check if a css property is valid (properties with hyphens)', () => {
            assert.equal(validator.isValid('-webkit-animation'), true);
            assert.equal(validator.isValid('--primary'), true);
          });
    });
});
