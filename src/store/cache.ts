import { Store } from "./store";

export class DyeCache {
    private static scripts: Map<string, Store> = new Map();

    public static cache(store: Store, name: string) {
        this.scripts.set(name, store);
    }

    public static cached(name: string) {
        return this.scripts.has(name);
    }

    public static getCached(name: string) {
        return this.scripts.get(name);
    }

    public static clear() {
        this.scripts.clear();
    }
}