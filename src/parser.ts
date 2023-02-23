export const _complete = (commands: string[][]) => {
    let astrik = "";
    commands.map((command, i) => {
        return command.map((el, j) => {

            if (el == "^" && i > 0) {
                astrik = commands[i - 1][j];
                return astrik;
            }
            if (el == "<" && j > 0) {
                astrik = command[j - 1];
                return astrik;
            }
            if (/\{\^\}/.test(el)) {
                astrik = commands[i - 1][j];
                return el.replace(/\{\^\}/g, commands[i - 1][j]);
            }

            if (/\{\<\}/.test(el)) {
                astrik = command[j - 1];
                return el.replace(/\{\^\}/g, command[j - 1]);
            }
            if (/\{\*\}/.test(el)) {
                return el.replace(/\{\*\}/g, astrik);
            }
        })
    })
}

export const _split = (str: string) => {
    return str.split(/[\r*\n]+/).map(x=>x.trim().split(/[\s]+/));
}

