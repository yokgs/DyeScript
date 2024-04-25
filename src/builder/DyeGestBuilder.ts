import { IFont } from "../common/font.interface";
import { IStyle } from "../common/style.interface";
import { DyeRuntime } from "../core/DyeRuntime";
import { Store } from "../store/store";
import { FileBuilder } from "./FileBuilder";

export class DyeGestBuilder extends FileBuilder {

    protected header: string = `!dyegest;!version ${DyeRuntime.version}\n`;

    constructor() {
        super();
    }

    build(store: Store): string {

        this.initBuffer();

        let {
            styles,
            fonts,
        } = store;

        this.processStyles(styles);
        this.processFonts(fonts);

        return this.getOutput();
    }


    processStyles(styles: Map<string, IStyle>) {
        for (let el of styles.keys()) {
            this.append(`$ ${el}`);
            let style = styles.get(el);
            for (let p in style) {
                this.append(` ${p} ${this.getDominantStyle(style[p])}`);
            }
            this.append(`\n`);
        }
    }

    processFonts(fonts: Map<string, IFont>) {
        for (let el in fonts) {
            let font = fonts.get(el);
            if (font)
                this.append(`\n@font ${el} ${font.source}`);
        }
    }
    
}