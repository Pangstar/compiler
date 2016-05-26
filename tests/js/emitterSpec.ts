import * as fs from 'fs';
import {Module} from "../../src/ast"
import {Emitter, EmitterOptions} from "../../src/emitter"

class MockEmitter extends Emitter<EmitterOptions> {
    protected emitModule(module: Module, options: EmitterOptions): void {
        
    }
}

describe("Emitter", () => {
    
    beforeEach(() => {
        this.module = {}
        this.emitter = new MockEmitter()
        this.fs = fs;
        spyOn(this.emitter, 'writeFiles');
        spyOn(this.fs, 'writeFile');
    });
    
    it("defaults to first engine if none specified in options", () => {
        this.emitter.emit({});
        expect(this.emitter.writeFiles).toHaveBeenCalledTimes(1);
        expect(this.emitter.writeFiles.calls.argsFor(0)[2]).toBe('mockengine1');
    });
    
    it("calls writeFiles with the all engines specified in the options", () => {
        this.emitter.emit({'mockengine1' : true, 'mockengine2' : true});
        expect(this.emitter.writeFiles).toHaveBeenCalledTimes(2);
        expect(this.emitter.writeFiles.calls.argsFor(0)[2]).toBe('mockengine1');
        expect(this.emitter.writeFiles.calls.argsFor(1)[2]).toBe('mockengine2');
    });
    
    it("writeFile emits when noEmit is not present", () => {
        this.emitter.emit({});
        this.emitter.writeFile('test', '');
        expect(this.fs.writeFile.calls.any()).toEqual(true);
    });

    it("writeFile does not emit when noEmit is present", () => {
        this.emitter.emit({'noEmit': true});
        this.emitter.writeFile('test', '');
        expect(this.fs.writeFile.calls.any()).toEqual(false);
    });
});