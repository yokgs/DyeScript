import { DyeScope } from "./DyeScope";

export class DyeScopeWrapper {
    private scope: DyeScope;
    constructor(scope: DyeScope) {
        this.scope = scope;
    }
    public get(variable: string): any {
        return this.scope.get(variable);
    }
}