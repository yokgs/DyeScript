import fs from 'fs';
import path from 'path';

export class FileLoader {
    private static instance: FileLoader | null = null;

    private constructor() { }

    public static getInstance(): FileLoader {
        if (!FileLoader.instance) {
            FileLoader.instance = new FileLoader();
        }
        return FileLoader.instance;
    }

    public load(entityPath: string) {
        const fixedPath = this.fixExtension(entityPath);
        if (!fs.existsSync(fixedPath))
            throw new Error(`file does not exist at ${fixedPath}`);
        let entity = fs.lstatSync(fixedPath);
        if (!entity.isDirectory()) {
            return this.readFile(fixedPath);
        }
        if (fs.existsSync(path.join(fixedPath, 'index.dye')))
            return this.readFile(path.join(fixedPath, 'index.dye'));
        if (fs.existsSync(path.join(fixedPath, 'index.dyex')))
            return this.readFile(path.join(fixedPath, 'index.dyex'));

        return {
            content: "",
            path: "",
            ext: ""
        };
    }

    private fixExtension(pathLike: string) {
        let { ext } = path.parse(pathLike);
        if (ext == 'dye' || ext == 'dyex') {
            return pathLike;
        }
        if (fs.existsSync(pathLike.concat('.dye')))
            return pathLike.concat('.dye');
        if (fs.existsSync(pathLike.concat('.dyex')))
            return pathLike.concat('.dyex');
        return pathLike;
    }

    private readFile(pathLike: string) {
        return {
            content: fs.readFileSync(pathLike, 'utf-8').toString(),
            path: pathLike,
            ext: path.extname(pathLike)
        };
    }
}