const { DataTypeConverter } = require('../dist/data/DataTypeConverter');
const assert = require("assert");

describe('DataTypeConverter', () => {
  describe('implicitConversion', () => {
    it('should convert to boolean implicitly', () => {
        assert.equal(DataTypeConverter.implicitConversion('false'), false);
        assert.equal(DataTypeConverter.implicitConversion('true'), true);
      });
  
      it('should convert to float implicitly', () => {
        assert.equal(DataTypeConverter.implicitConversion('123.45'), 123.45);
        assert.equal(DataTypeConverter.implicitConversion('-123.45'), -123.45);
      });
  
      it('should convert to string implicitly', () => {
        assert.equal(DataTypeConverter.implicitConversion('abc'), 'abc');
        assert.equal(DataTypeConverter.implicitConversion('a123'), 'a123');
      });
  
      it('should convert to null implicitly', () => {
        assert.equal(DataTypeConverter.implicitConversion('null'), null);
      });
  
      it('should convert to undefined implicitly', () => {
        assert.equal(DataTypeConverter.implicitConversion('undefined'), undefined);
      });
  });
});
