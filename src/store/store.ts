import { IAnimation } from "../common/animation.interface";
import { IFont } from "../common/font.interface";
import { IStyle } from "../common/style.interface";

export class Store {
    public styles: Map<string, IStyle> = new Map<string, IStyle>;
    public fonts: Map<string, IFont> = new Map<string, IFont>();
    public animations: Map<string, IAnimation> = new Map<string, IAnimation>();
    public motions: Map<string, IAnimation> = new Map<string, IAnimation>();
    public cachable: boolean = true;

    extendFrom(store: Store): void {

    }
}