import { Store } from "../store/store";
import { FileLoader } from "../fetch/FileLoader";
import { Parser } from "../parser/Parser";
import { DyeInterpreter } from "../interpreter/DyeInterpreter";
import { DyeScope } from "../data/DyeScope";
import { FileBuilderFactory } from "../builder/FileBuilderFactory";
import { DyeBuilderTarget } from "../common/Target";
import { DyeConsole } from "../console";

export class DyeRuntime {
    static readonly version = 'pre-1.0.0';
    private store: Store;
    private _logs: DyeConsole;
    private createdBy: string = 'api';
    private source: string;
    private static readonly globalScope = new DyeScope();
    
    private _strictMode = false;
    private _isDigested = false;
    
    constructor(source: string) {
        this.store = new Store();
        this._logs = new DyeConsole();
        this.source = source;
        this.initilize();
    }
    
    static createFromFile(filePath: string): DyeRuntime {
        const content = FileLoader.getInstance().load(filePath);
        let runtime = new DyeRuntime(content.content);
        runtime.createdBy = content.path;
        
        if(content.ext === '.dyex') runtime.enableStrictMode();
        
        return runtime;
    }
    
    static createFromContent(content: string): DyeRuntime {
        return new DyeRuntime(content);
    }
    
    public restartFromSource(): this {
        this.store = null as unknown as Store;
        this.store = new Store();
        this.initilize();
        return this;
    }
    
    private initilize() {
        let table = new Parser().parse(this.source);
        let interpreter = new DyeInterpreter(this.store, this);
        interpreter.process(table);
    }
    
    public getStore(): Store {
        return this.store;
    }
    
    public build(targets: DyeBuilderTarget[]) {
        let factory = new FileBuilderFactory(this.store);
        const isNotDyeGest = !this.isDigested;
        const nonRecursiveTargets = targets.filter(target => isNotDyeGest || (!isNotDyeGest && target != "dyegest"));
        return nonRecursiveTargets.map(target => {
            return { data: factory.build(target), target };
        });
    }
    
    static alert(message: string) {
        console.warn("[DyeRuntime] " + message);
    }
    
    public enableDyeGestMode() {
        this._isDigested = true;
    }

    public enableStrictMode() {
        this._strictMode = true;
    }
    
    public disableStrictMode() {
        this._strictMode = false;
    }
    
    public get strictMode() {
        return this._strictMode;
    }

    public get isDigested() {
        return this._isDigested;
    }

    public get logger() {
        return this._logs;
    }

}