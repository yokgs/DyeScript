import path from 'path';

export function checkModule($path: string, options: IOptions) {
    // check if we import a <module>
    if (/^<[\w\-\./]+>$/.test($path)) {
        return path.join(__dirname, '../../dye.rectory/' + $path.slice(1, $path.length - 1));
    }

    return path.join(options.path, $path);
}