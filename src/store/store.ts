import { IAnimation } from "../common/animation.interface";
import { IFont } from "../common/font.interface";
import { IStyle } from "../common/style.interface";

export class Store {
    public styles: Map<string, IStyle> = new Map<string, IStyle>;
    public fonts: Map<string, IFont> = new Map<string, IFont>();
    public animations: Map<string, IAnimation> = new Map<string, IAnimation>();
    public motions: Map<string, IAnimation> = new Map<string, IAnimation>();
    public cachable: boolean = true;
    private counter = 0;

    extendFrom(store: Store): void {
        for (let key of store.styles.keys()) {
            if (!this.styles.has(key)) this.styles.set(key, {} as IStyle);
            this.mergeStyles(this.styles.get(key) || {}, store.styles.get(key) || {});
        }
    }

    private mergeStyles(to: IStyle, from: IStyle): void {
        for (let key in from) {
            let fromProperty = from[key];
            let calibratedProperty = fromProperty.map(([value, score]) => [value, score + this.counter]) as [string, number][];
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