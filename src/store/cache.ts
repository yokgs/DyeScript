import { Store } from "./store";

export class DyeCache {
    static dyescripts: Map<string, Store> = new Map();
    public static setCache(store: Store, name: string) {
        this.dyescripts.set(name, store);
    };
    public static cached(name: string) {
        return this.dyescripts.has(name);
    };
    public static getCached(name: string) {
        return this.dyescripts.get(name);
    }
    public static clear() {
        this.dyescripts.clear();
    }
}