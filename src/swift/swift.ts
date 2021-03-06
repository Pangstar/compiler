import * as path from 'path';
import {log} from "../log"
import {EmitterOptions, Emitter} from "../emitter" 
import {Module, SourceFile, Type, AnyType, ArrayType, BooleanType, StringType, NumberType, Declaration, VariableDeclaration} from "../ast"

export interface SwiftEmitterOptions extends EmitterOptions {
    javascriptcore?: EmitterOptions 
    bundleId: string | undefined    
}

export abstract class SwiftEmitter extends Emitter<SwiftEmitterOptions> {
        
    protected emitModule(module: Module, options: SwiftEmitterOptions): void {
        let writtenModuleFile = false;  
        for(let file of module.files as Array<SourceFile>) {            
            let filename = `${path.join(options.outDir, path.relative('.', file.path.dir), file.path.name)}.swift`;
            if(module.name != file.path.name) {
                this.writeFile(filename, this.file(file.declarations));                
            } else {
                writtenModuleFile = true;
                this.writeFile(filename, this.file(file.declarations, module.identifiers, this.resourcePath(options)));        
            }
        }        
        if(!writtenModuleFile) {
            let file = this.file(new Array<Declaration>(), module.identifiers, this.resourcePath(options)); 
            this.writeFile(`${path.join(options.outDir, module.name)}.swift`, file);
        }
    }
    
    private resourcePath(options: SwiftEmitterOptions): string {
        return `NSBundle${options.bundleId ? `(identifier: "${options.bundleId}")!` : `.mainBundle()`}.pathForResource("src", ofType: "js")!`; 
    }
    
    private file(declarations: ReadonlyArray<Declaration>, identifiers?: Set<string>, resourcePath?: string): string {
        let lines: string[] = [];
        lines.push('import Foundation\n');
        lines.push(this.header(resourcePath));
        for(let declaration of declarations as Array<Declaration>) {
            lines.push(`${this.declaration(declaration)}\n`);
        }
        lines.push(this.footer(identifiers));
        return lines.join('\n');
    }
    
    protected abstract header(resourcePath?: string): string;
    
    protected abstract footer(identifiers?: Set<string>): string;
    
    protected abstract declaration(declaration: Declaration): string;
    
}
 
declare module "../ast" {
    interface Declaration {
        definition(): string
    }
    interface Type {
        signature(optional?: boolean): string;
    }
}

VariableDeclaration.prototype.definition = function (this: VariableDeclaration) {
    return `public ${this.constant ? 'let' : 'var'} ${this.name} :${this.type.signature()}`;
}

AnyType.prototype.signature = function(this: AnyType, optional: boolean = this.optional): string {
    return `Any${optional ? '?' : ''}`;    
}

BooleanType.prototype.signature = function(this: BooleanType, optional: boolean = this.optional): string {
    return `Bool${optional ? '?' : ''}`;    
}

StringType.prototype.signature = function(this: StringType, optional: boolean = this.optional): string {
    return `String${optional ? '?' : ''}`;    
}

NumberType.prototype.signature = function(this: NumberType, optional: boolean = this.optional): string {
    return `Double${optional ? '?' : ''}`;    
}

ArrayType.prototype.signature = function(this: ArrayType, optional: boolean = this.optional): string {
    return `[${this.typeArguments[0].signature()}]${optional ? '?' : ''}`;    
}