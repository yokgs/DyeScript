const { DyeInterpreter } = require('../dist/interpreter/DyeInterpreter');
const { Store } = require('../dist/store/store');
const assert = require("assert");

describe('DyeInterpreter', () => {
    let store = new Store();
    let scope = store.scopeManager.getActiveScope();
    scope.set('color', 'blue');
    scope.set('123badName', '12');

    let interpreter = new DyeInterpreter(store);

    describe('#evaluate()', () => {
        it('should convert a variable to its value', () => {
            assert.equal(interpreter.evaluate('background'), 'background');
            assert.equal(interpreter.evaluate('&color'), 'blue');
            assert.equal(interpreter.evaluate('&abc'), undefined);
            assert.equal(interpreter.evaluate('&123badName'), '&123badName');
        });
    });

    describe('#defineDefaultVariables()', () => {
        it('should define default values for a variable', () => {
            interpreter.defineDefaultVariables(['color', 'black', 'bgColor', 'white']);
            assert.equal(scope.get('color'), 'blue');
            assert.equal(scope.get('bgColor'), 'white');
        });
    });
    
    describe('#defineScope()', () => {
        it('should redefine active scope', () => {

            interpreter.defineScope(['newScope', 'default']);
            
            assert.equal(store.scopeManager.getActiveScope().name, interpreter.scope.scope.name);
            assert.equal(store.scopeManager.getActiveScope().name, 'newScope');
            assert.equal(store.scopeManager.getActiveScope().stack.length, 1);
            assert.equal(store.scopeManager.getActiveScope().stack[0].name, 'default');

            interpreter.defineVariables(['color', 'red']);
            assert.equal(interpreter.scope.get('color'), 'red');
            interpreter.defineScope(['default']);

            assert.equal(store.scopeManager.getActiveScope().name, interpreter.scope.scope.name);
            assert.equal(store.scopeManager.getActiveScope().name, 'default');
            assert.equal(store.scopeManager.getActiveScope().stack.length, 0);

            assert.equal(scope.get('color'), 'blue');
        });
    });

});
