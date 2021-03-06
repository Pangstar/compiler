import {log} from "./log"
import {Module} from "./ast" 
import {Options} from 'yargs';
import {writeFile} from 'fs';

export interface EmitterOptions {
   outDir?: string
//    newLine: 'lf'|'crlf'
   noEmit?: boolean
   noEmitWrapper?: boolean
}

export abstract class Emitter<T extends EmitterOptions> {
    
    private noEmit: boolean | undefined;
    
    public emit(module: Module, options: T): void {
        this.noEmit = options.noEmit;
        this.emitModule(module, options);
    }
    
    protected writeFile(filename: string, data: string) {
        if(this.noEmit) {
            log.info(`Skipping emit of file ${filename}`);
        } else {
            log.info(`Emitting file ${filename}`);
            writeFile(filename, data);            
        }
    }
    
    protected abstract emitModule(module: Module, options: T): void
}