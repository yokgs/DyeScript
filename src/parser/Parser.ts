export class Parser {

    static readonly UP_ANCHOR = "^";
    static readonly LEFT_ANCHOR = "<";
    static readonly TEMPLATE_ANCHOR = /\{\*\}/g;
    static readonly UP_TEMPLATE_ANCHOR = /\{\^\}/g;
    static readonly LEFT_TEMPLATE_ANCHOR = /\{<\}/g;


    private replaceAnchors(commands: string[][]): string[][] {
        let astrik = "";
        let warn = true;

        return commands.map((command, i) => {
            return command.map((el, j) => {
                if (el == Parser.UP_ANCHOR && i > 0) {
                    astrik = commands[i - 1][j];
                    warn = false;
                    return astrik;
                }

                if (el == Parser.LEFT_ANCHOR && j > 0) {
                    astrik = command[j - 1];
                    warn = false;
                    return astrik;
                }

                if (Parser.UP_TEMPLATE_ANCHOR.test(el) && i > 0) {
                    astrik = commands[i - 1][j];
                    warn = false;
                    return el.replace(Parser.UP_TEMPLATE_ANCHOR, commands[i - 1][j]);
                }

                if (Parser.LEFT_TEMPLATE_ANCHOR.test(el) && j > 0) {
                    astrik = command[j - 1];
                    warn = false;
                    return el.replace(Parser.LEFT_TEMPLATE_ANCHOR, command[j - 1]);
                }

                if (Parser.TEMPLATE_ANCHOR.test(el)) {
                    if (warn) console.warn(`[WARN] Template "{*}" is used before being initilized`);
                    return el.replace(Parser.TEMPLATE_ANCHOR, astrik);
                }

                return el;
            });
        });
    }

    public parse(source: string): string[][] {

        let removedInline = source.replace(/;/g, '\n').replace(/\r\n/g, '\n');
        let removedMultipleLines = removedInline.split(/\n+/);

        let joinCommas = removedMultipleLines.map(x => x.replace(/\s{1,4},/g, ',').replace(/,\s{1,4}/g, ','));

        let table = joinCommas.map(x => x.split(/\s+/));
        return this.replaceAnchors(table);
    }

}