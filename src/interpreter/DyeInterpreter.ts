import { TextCaseConverter } from "../common/TextCaseConverter";
import { DyeScope } from "../data/DyeScope";
import { DyeScopeWrapper } from "../data/DyeScopeWrapper";
import { Store } from "../store/store";

export class DyeInterpreter {

    private readonly variable = /&[a-zA-Z][\w]+/g;

    private store: Store;
    private scope: DyeScopeWrapper;

    constructor(store: Store, scope: DyeScope) {
        this.store = store;
        this.scope = new DyeScopeWrapper(scope);
    }

    public evaluate(statment: string) {
        if (this.variable.test(statment))
            return this.scope.get(statment);
    }

    public interpret(statment: string[]) {
        let query = statment[0];
        statment = statment.slice(1);
        switch (query) {
            case '@':
                this.defineVariables(statment)
                break;
            case '#':
                this.defineCollection(statment);
                break;
            case '$':
                this.defineStyle(statment);
                break;
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
        throw new Error("Method not implemented.");
    }

    private defineCollection(statment: string[]) {
        throw new Error("Method not implemented.");
    }

    public process(statments: string[][]): Store {
        for (let statment of statments) {
            this.interpret(statment);
        }
        return this.store;
    }

}