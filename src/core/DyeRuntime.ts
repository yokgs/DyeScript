import { Store } from "../store/store";
import { FileLoader } from "../fetch/FileLoader";
import { Parser } from "../parser/Parser";
import { DyeInterpreter } from "../interpreter/DyeInterpreter";
import { DyeScope } from "../data/DyeScope";

export class DyeRuntime {
    static readonly version = 'pre-1.0.0';
    private store: Store;
    private createdBy: string = 'api';
    private source: string;
    private mainScope = new DyeScope();
    private static readonly globalScope = new DyeScope();

    constructor(source: string) {
        this.store = new Store();
        this.source = source;
        this.initilize();
    }

    static createFromFile(filePath: string): DyeRuntime {
        const content = FileLoader.getInstance().load(filePath);
        return new DyeRuntime(content);
    }

    static createFromContent(content: string): DyeRuntime {
        return new DyeRuntime(content);
    }

    public restartFromSource(): DyeRuntime {
        this.store = new Store();
        this.initilize();
        return this;
    }

    private initilize() {
        let table = new Parser().parse(this.source);
        let interpreter = new DyeInterpreter(this.store, this.mainScope);
        interpreter.process(table);
    }

    public getStore(): Store {
        return this.store;
    }

}