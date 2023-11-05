import fs from 'fs';
export function bundler(data: string[][], filename: string) {
    for (let d of data) {
        fs.writeFileSync(filename + d[1], d[0]);
    }
}