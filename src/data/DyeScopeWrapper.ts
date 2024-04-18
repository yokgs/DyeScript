import { DyeScope } from "./DyeScope";

export class DyeScopeWrapper {

    private scope: DyeScope;

    constructor(scope: DyeScope) {
        this.scope = scope;
    }

    public get(variable: string): any {
        return this.scope.get(variable);
    }

    public set(name: string, value: string): void {
        return this.scope.set(name, value);
    }

    public setDefault(name: string, value: string) {
        if (this.scope.hasLocal(name)) return;
        this.scope.set(name, value);
    }

    public update(scope: DyeScope) {
        this.scope = scope;
    }

}