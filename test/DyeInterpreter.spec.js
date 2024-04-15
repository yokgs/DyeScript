const { DyeInterpreter } = require('../dist/interpreter/DyeInterpreter');
const { DyeScope } = require('../dist/data/DyeScope');
const { DyeScopeWrapper } = require('../dist/data/DyeScopeWrapper');
const { Store } = require('../dist/store/store');
const assert = require("assert");

describe('DyeInterpreter', () => {

    let scope = new DyeScope();
    scope.set('color', 'blue');
    scope.set('123badName', '12');
    let wrapper = new DyeScopeWrapper(scope);

    describe('#evaluate', () => {
        it('should convert a variable to its value', () => {
            let interpreter = new DyeInterpreter(new Store(), wrapper);

            assert.equal(interpreter.evaluate('background'), 'background');
            assert.equal(interpreter.evaluate('&color'), 'blue');
            assert.equal(interpreter.evaluate('&abc'), undefined);
            assert.equal(interpreter.evaluate('&123badName'), '&123badName');
        });
    });
});
