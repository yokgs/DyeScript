export class Parser {

    static readonly UP_ANCHOR = "^";
    static readonly LEFT_ANCHOR = "<";
    static readonly TEMPLATE_ANCHOR = /\{\*\}/g;
    static readonly UP_TEMPLATE_ANCHOR = /\{\^\}/g;
    static readonly LEFT_TEMPLATE_ANCHOR = /\{<\}/g;


    private replaceAnchors(commands: ParsedSource[]): ParsedSource[] {
        let astrik = "";
        let warn = true;

        return commands.map((command, i) => {
            return {
                content: command.content.map((el, j) => {
                    if (el == Parser.UP_ANCHOR && i > 0) {
                        astrik = commands[i - 1].content[j];
                        warn = false;
                        return astrik;
                    }

                    if (el == Parser.LEFT_ANCHOR && j > 0) {
                        astrik = command.content[j - 1];
                        warn = false;
                        return astrik;
                    }

                    if (Parser.UP_TEMPLATE_ANCHOR.test(el) && i > 0) {
                        astrik = commands[i - 1].content[j];
                        warn = false;
                        return el.replace(Parser.UP_TEMPLATE_ANCHOR, commands[i - 1].content[j]);
                    }

                    if (Parser.LEFT_TEMPLATE_ANCHOR.test(el) && j > 0) {
                        astrik = command.content[j - 1];
                        warn = false;
                        return el.replace(Parser.LEFT_TEMPLATE_ANCHOR, command.content[j - 1]);
                    }

                    if (Parser.TEMPLATE_ANCHOR.test(el)) {
                        if (warn) console.warn(`[WARN] Template "{*}" is used before being initilized`);
                        return el.replace(Parser.TEMPLATE_ANCHOR, astrik);
                    }

                    return el;
                }),
                index: command.index
            };
        });
    }

    public parse(source: string): ParsedSource[] {
        let removeBackchariot = source.replace(/\r\n/g, '\n');

        let soureTracking = removeBackchariot.split(/\n/).map((x, i) => ({
            line: x,
            index: i + 1
        }));

        let removeEmptyLines = soureTracking.filter(x => x.line.trim() != "");

        let unwrapInline = removeEmptyLines.map(indexedLine => {
            let index = indexedLine.index;
            return indexedLine.line.split(';').filter(e => e.trim() != "").map(e => ({
                line: e,
                index
            }));
        }).flat();

        let joinCommas = unwrapInline.map(x => ({
            line: x.line.replace(/\s{1,4},/g, ',').replace(/,\s{1,4}/g, ','),
            index: x.index
        }));

        let table = joinCommas.map(x => ({
            content: x.line.split(/\s+/),
            index: x.index
        })) as ParsedSource[];

        return this.replaceAnchors(table);
    }

}

export type ParsedSource = {
    content: string[],
    index: number
}