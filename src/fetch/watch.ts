import fs from 'fs';
import { checkModule } from './module';
import { DyeCache } from '../store/cache';
import { load } from '../core/loader';


export function watcher($path: string, output: string, target: string, debug) {
    let _path = $path;
    let options = { path: process.cwd(), debug } as IOptions;
    $path = checkModule($path, options);

    if (!fs.existsSync($path + '.dye')) {
        if (!fs.existsSync($path + '/index.dye'))
            throw new Error($path + ' does not exist');
        else $path += '/index.dye'
    } else $path += '.dye'

    fs.watchFile($path, () => {
        try {
            DyeCache.clear();
            load(_path, output, target, debug);
        } catch (_) { console.error(_) }
    });
}