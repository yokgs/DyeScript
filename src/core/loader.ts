import { bundler } from "../bundle/bundler";
import { DyeScript2CSS, DyeScript2MinCSS } from "../converter/css";
import { DyeScript2StaticDyeScript } from "../converter/dye";
import { DyeScript2ReactNative } from "../converter/react";

export function load($path: string, output = './', target = 'default', debug = false) {
    let $$time = new Date().getTime();
    let name = 'dye.compiled.';

    if (target == 'r')
        name += 'js';
    else if (target == 's')
        name += 'static.dye'
    else
        name += 'css';

    if ($path) {
        let file = ($path + '.dye').split(/[\\|\/]+/).pop() || '';
        let u = file.split('.');
        if (u[u.length - 1] === "dye") {
            u[u.length - 1] = '';
        } else {
            u.push('');
        }
        name = u.join('.');
    }
    let out = path.join(output || './', name);

    let data: Array<[string, string]> = [];

    const assembledStyles = DyeAssembler($path, { debug });

    if (target == 'r' || target == 'a') {
        data.push([DyeScript2ReactNative(assembledStyles), 'js']);
    }
    if (target == 'c' || target == 'a' || target == 'default') {
        data.push([DyeScript2CSS(assembledStyles), 'css']);
    }
    if (target == 'm' || target == 'a' || target == 'default') {
        data.push([DyeScript2MinCSS(assembledStyles), 'min.css']);
    }
    if (target == 's' || target == 'a') {
        data.push([DyeScript2StaticDyeScript(assembledStyles), 'static.dye']);
    }

    bundler(data, out);
    console.log('Done in ' + ((new Date()).getTime() - $$time) + ' milliseconds');
}