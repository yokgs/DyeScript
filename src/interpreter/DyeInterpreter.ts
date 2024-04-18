import { TextCaseConverter } from "../common/TextCaseConverter";
import { DyeScope } from "../data/DyeScope";
import { DyeScopeWrapper } from "../data/DyeScopeWrapper";
import { Store } from "../store/store";
import { VariableNameValidator } from "../validator/VariableNameValidator";

export class DyeInterpreter {

    private readonly variable = /&[a-zA-Z][a-zA-Z0-9/]*/;

    private store: Store;
    private scope: DyeScopeWrapper;

    constructor(store: Store) {
        this.store = store;
        this.scope = new DyeScopeWrapper(this.store.scopeManager.getActiveScope());
    }

    public evaluate(statment: string) {
        if (this.variable.test(statment))
            return this.scope.get(statment.slice(1));
        return statment;
    }

    public interpret(statment: string[]) {
        let [query, ...queue] = statment.map(s => this.evaluate(s));
        switch (query) {
            case '@':
                this.defineVariables(queue);
                break;
            case '!@':
                this.defineDefaultVariables(queue);
                break;
            case '#':
                this.defineScope(queue);
                break;
            case '$':
                this.defineStyle(queue);
                break;
        }
    }

    private defineDefaultVariables(statment: string[]) {
        for (let i = 0; i < statment.length; i += 2) {
            let name = statment[i];
            let value = statment[i + 1];
            this.scope.setDefault(name, value);
        }
    }

    private defineStyle(statment: string[]) {
        let selectors = statment[0].split(",");
        for (let i = 1; i < statment.length; i += 2) {
            let property = TextCaseConverter.toCamelCase(statment[i]);
            let value = statment[i + 1];
            this.store.addStyle(selectors, property, value);
        }
    }

    private defineVariables(statment: string[]) {
        for (let i = 0; i < statment.length; i += 2) {

            let name = statment[i];
            new VariableNameValidator().isValid(name);

            let value = statment[i + 1];
            this.scope.set(name, value);
        }
    }

    private defineScope(statment: string[]) {
        this.scope.update(this.store.activateCollection(statment[0]));
        this.store.scopeManager.loadCollections(statment.slice(1))
    }

    public process(statments: string[][]): Store {
        for (let statment of statments) {
            this.interpret(statment);
        }
        return this.store;
    }

}