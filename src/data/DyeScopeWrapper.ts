import { WeightedValue } from "../common/style.interface";
import { DyeRuntime } from "../core/DyeRuntime";
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

    public applyClass(target: string, className: string) {
        if (this.scope.classes.has(target)) {
            const links = this.scope.links.get(target) || [];
            links.push(className);
            this.scope.links.set(target, links);
        } else DyeRuntime.alert('undefined target');
    }
    
    public extendClass(target: string, className: string) {
        if (this.scope.classes.has(target)) {
            const styles = this.scope.classes.get(target) || {};
            const origin = this.scope.classes.get(className) || {};
            for (let property in styles) {
                let style = styles[property].map(value => [...value]) as WeightedValue[];
                if (property in origin) origin[property] = style;
                else origin[property].push(...style);
            }
            this.scope.classes.set(className, origin);
        } else DyeRuntime.alert('undefined target');
    }

}