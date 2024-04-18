import { DyeScope } from "../data/DyeScope";

export class ScopeManager {

    private scopes: Map<string, DyeScope> = new Map();
    private currentScope: string;

    constructor() {
        this.scopes.set('default', new DyeScope('default'));
        this.currentScope = 'default';
    }

    public getActiveScope(): DyeScope {
        let scope = this.scopes.get(this.currentScope) || new DyeScope();
        if (!this.scopes.has(this.currentScope))
            this.scopes.set(this.currentScope, scope);
        return scope;
    }

    public setActiveScope(scope: string) {
        if (!this.scopes.has(scope)) this.scopes.set(scope, new DyeScope(scope));
        this.currentScope = scope;
    }

    public loadCollections(collections: string[]) {
        let scopes = collections.filter(scope => this.scopes.has(scope)).map(scope => this.scopes.get(scope) || new DyeScope());
        this.getActiveScope().global(scopes);
    }

}