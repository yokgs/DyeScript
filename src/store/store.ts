import { IAnimation } from "../common/animation.interface";
import { IFont } from "../common/font.interface";
import { IStyle, WeightedValue } from "../common/style.interface";
import { DyeScope } from "../data/DyeScope";
import { ScopeManager } from "./ScopeManager";
import { StyleManager } from "./StyleManager";

export class Store {
    public styles: Map<string, IStyle> = new Map<string, IStyle>;
    public fonts: Map<string, IFont> = new Map<string, IFont>();
    public animations: Map<string, IAnimation> = new Map<string, IAnimation>();
    public motions: Map<string, IAnimation> = new Map<string, IAnimation>();

    public scopeManager = new ScopeManager();

    public cachable: boolean = true;
    private counter = 0;

    activateCollection(collection: string): DyeScope {
        this.scopeManager.setActiveScope(collection);
        return this.scopeManager.getActiveScope();
    }

    addStyle(selectors: string[], property: string, value: string) {
        let weightedValue = [value, this.counter] as WeightedValue;
        let manager = new StyleManager(this.styles);
        for (let selector of selectors) {
            manager.addStyle(selector, property, weightedValue);
        }
        this.tick();
    }

    extendFrom(store: Store): void {
        for (let key of store.styles.keys()) {
            if (!this.styles.has(key)) this.styles.set(key, {});
            this.mergeStyles(this.styles.get(key) || {}, store.styles.get(key) || {});
        }
    }

    private mergeStyles(to: IStyle, from: IStyle): void {
        for (let key in from) {
            let fromProperty = from[key];
            let calibratedProperty = fromProperty.map(([value, score]) => [value, score + this.counter]) as WeightedValue[];
            if (key in to)
                to[key].push(...calibratedProperty);
            else
                to[key] = calibratedProperty;
        }
    }

    public tick() {
        this.counter++;
    }
}