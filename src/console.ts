export class DyeConsole {

    private logStore: DyeLog[] = [];

    public warn(message: string, from: string, source: string, line: number) {
        this.log('WARN', message, from, source, line);
    }

    public debug(message: string, from: string, source: string, line: number) {
        this.log('DEBUG', message, from, source, line);
    }

    public fatal(message: string, from: string, source: string, line: number) {
        this.log('FATAL', message, from, source, line);
    }

    public error(message: string, from: string, source: string, line: number) {
        this.log('ERROR', message, from, source, line);
    }

    public info(message: string, from: string, source: string, line: number) {
        this.log('INFO', message, from, source, line);
    }

    public exportLogs() {
        let builtLog = this.logStore.map(this.buildLog);
        this.clear();
        return builtLog.join('\n');
    }

    private buildLog(buildLog: DyeLog) {
        return `[${new Date(buildLog.time).toUTCString()}] [${buildLog.type}] "${buildLog.message}" at ${buildLog.source}:${buildLog.line} from ${buildLog.from}`
    }

    private clear() {
        this.logStore = [];
    }

    private log(type: typeof DyeLogType[number], message: string, from: string, source: string, line: number) {
        this.logStore.push({
            type,
            message,
            from,
            source,
            line,
            time: Date.now()
        });
    }
}

export const DyeLogType = ['INFO', 'WARN', 'ERROR', 'FATAL', 'DEBUG'] as const;

export type DyeLog = {
    type: typeof DyeLogType[number],
    message: string,
    source?: string,
    line?: number,
    time: number,
    from: string
}