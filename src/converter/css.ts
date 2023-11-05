import { CSSBuilder } from "../builder/css.builder";
import { Store } from "../store/store";

export function DyeScript2CSS(assembledStyles:Store) {
    let { css } = CSSBuilder(assembledStyles);
    console.log('Building CSS...');
    return css;
}

export function DyeScript2MinCSS(assembledStyles: Store) {
    let { cssmin } = CSSBuilder(assembledStyles);
    console.log('Building Minified CSS...');
    return cssmin;
}