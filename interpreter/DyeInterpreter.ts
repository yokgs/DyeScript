import { variable } from "@tensorflow/tfjs-node";
import { Store } from "../src/store/store";

export class DyeInterpreter {

    private static readonly variable = /&[a-zA-Z]{1}[\w]+/g;

    private store: Store;

    constructor(store: Store) {
        this.store = store;
    }

    public evaluate(statment: string) {

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
        let selector = statment[0];
        for (let i = 1; i < statment.length; i += 2) {
            let property = statment[i];
            let value = statment[i + 1];
            this.store.addStyle(selector, property, value);
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