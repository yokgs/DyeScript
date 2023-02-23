import { DyeStore } from "./store";

export const _fetch = (key: string, stack: DyeStore[]) => {

    if (stack.length === 0) {
        return undefined;
    }
    let i = stack.length - 1;

    while (!(key in stack[i].tokens)) {
        if (i === 0) break;
        i--;
    }
    return stack[i][key];
}