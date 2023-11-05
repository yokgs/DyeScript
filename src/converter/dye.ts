export function DyeScript2StaticDyeScript(assembledStyles) {
    let { staticdye } = StaticDyeScriptBuilder(assembledStyles);
    console.log('Building Static DyeScript...');
    return staticdye;
}