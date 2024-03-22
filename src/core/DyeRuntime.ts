import { Store } from "../store/store";

export class DyeRuntime {
    static readonly version = 'pre-1.0.0';
    private store: Store;

    constructor() {
        this.store = new Store();
    }

    static createFromFile(filename: string): DyeRuntime {
        return new DyeRuntime();
    }

    static createFromContent(content: string): DyeRuntime {
        return new DyeRuntime();
    }

    

}