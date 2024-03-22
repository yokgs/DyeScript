import { IAnimation } from "../common/animation.interface";
import { IFont } from "../common/font.interface";
import { IStyle } from "../common/style.interface";
import { DyeRuntime } from "../core/DyeRuntime";
import { Store } from "../store/store";
import { FileBuilder } from "./FileBuilder";

export class CSSBuilder extends FileBuilder {

    protected header: string = `/**
    * Built with DyeScript v${DyeRuntime.version}
    * by Yazid Slila (@yokgs)
    */`;

    constructor() {
        super();
    }

    build(store: Store): string {

        this.initBuffer();

        let {
            styles,
            fonts,
            animations,
            motions
        } = store;

        this.processFonts(fonts);
        this.processStyles(styles);
        this.processAnimations(animations);
        this.processMotions(motions);

        return this.getOutput();
    }

    processMotions(motions: Map<string, IAnimation>): void {

        let motionBuffer = '';
        for (let motionKey in motions) {

            motionBuffer += `\n\t@keyframes ${motionKey} {\n`;
            let motion = motions.get(motionKey);
            for (let s in motion) {
                motionBuffer += `\t\t${s} {\n`;
                for (let p in motion[s]) {
                    motionBuffer += `\t\t\t${p}: ${motion[s][p]};\n`;
                }
                motionBuffer += `\t\t}\n`;
            }
            motionBuffer += `\t}\n`;
        }

        if (motionBuffer.length > 0) {
            this.append(`\n\n@media (prefers-reduced-motion) {`);
            this.append(motionBuffer + `}`);
        }
    }

    processAnimations(animations: Map<string, IAnimation>): void {
        for (let animationKey in animations) {
            this.append(`\n\n@keyframes ${animationKey} {\n`);
            for (let keyframe in animations.get(animationKey)) {

                this.append(`\t${keyframe} {\n`);
                let animation = animations.get(animationKey);
                if (typeof animation != "undefined") {
                    for (let property in animation[keyframe]) {
                        this.append(`\t\t${property}: ${animation[keyframe][property]};\n`);
                    }
                }
                this.append(`\t}\n`);
            }
            this.append(`}`);
        }
    }

    processStyles(styles: Map<string, IStyle>) {
        for (let el in styles) {
            this.append(`\n\n${el} {\n`);
            let style = styles.get(el);
            for (let p in style) {
                this.append(`\t${p}: ${this.getDominantStyle(style[p])};\n`);
            }
            this.append(`}`);
        }
    }

    processFonts(fonts: Map<string, IFont>) {
        for (let el in fonts) {
            let font = fonts.get(el);
            if (font)
                this.append(`\n@font-face {\n\tfont-family: ${el};\n\tsrc: url(${font.source});\n}`);
        }
    }

}