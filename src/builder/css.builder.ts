import { Store } from "../store/store";
import { cleanStyles } from "./clean.styles";
import { header } from "./header";

export function CSSBuilder(store: Store) {

    let { css, cssmin } = header;

    let {
        styles,
        fonts,
        animations,
        motions
    } = store;

    for (let el in fonts) {
        css += `\n@font-face {\n\tfont-family: ${el};\n\tsrc: url(${fonts[el].source});\n}`
        cssmin += `@font-face{font-family:${el};src:url(${fonts[el].source});}`
    }
    for (let el in styles) {
        css += `\n\n${el} {\n`;
        cssmin += `${el}{`;
        for (let p in styles[el]) {
            css += `\t${p}: ${cleanStyles(styles[el][p])};\n`;
            cssmin += `${p}:${cleanStyles(styles[el][p])};`;
        }
        css += `}`
        cssmin += `}`;
    }

    for (let el in animations) {
        css += `\n\n@keyframes ${el} {\n`;
        cssmin += `@keyframes ${el}{`;
        for (let s in animations[el]) {

            css += `\t${s} {\n`;
            cssmin += `${s}{`;

            for (let p in animations[el][s]) {
                css += `\t\t${p}: ${animations[el][s][p]};\n`;
                cssmin += `${p}:${animations[el][s][p]};`;
            }
            css += `\t}\n`
            cssmin += `}`;
        }
        css += `}`
        cssmin += `}`;
    }

    let pcss = '';

    let pcssmin = '';


    for (let el in motions) {
        pcss += `\n\t@keyframes ${el} {\n`;
        pcssmin += `@keyframes ${el}{`;
        for (let s in motions[el]) {
            pcss += `\t\t${s} {\n`;
            pcssmin += `${s}{`;
            for (let p in motions[el][s]) {
                css += `\t\t\t${p}: ${motions[el][s][p]};\n`;
                cssmin += `${p}:${motions[el][s][p]};`;
            }
            pcss += `\t\t}\n`
            pcssmin += `}`;
        }
        pcss += `\t}\n`
        pcssmin += `}`;
    }
    if (pcss.length > 0) {
        css += `\n\n@media (prefers-reduced-motion) {`;
        cssmin += `@media (prefers-reduced-motion){`;
        css += pcss + `}`;
        cssmin += pcssmin + `}`;
    }

    cssmin = cssmin.replace(/;\}/g, '}')

    return {
        css,
        cssmin
    }
}
