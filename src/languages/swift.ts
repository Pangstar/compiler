import {Emitter, Output} from "../emitter" 
import {VariableDeclaration, ClassDeclaration, MethodDeclaration, Module, Declaration, SourceFile} from "../ast" 

let emitter: Emitter = {
    
    emitModule(node: Module, out: Output) {
        out.emitChildren();
    },
    
    emitSourceFile(node: SourceFile, out :Output) {
        //insert header comment
        out.emit(`${node.filename}.swift`, `import Foundation\n`);
        out.emitChildren();
    },
    
    emitVariable(node: VariableDeclaration, out :Output) {
        //public let name :Any        
        
    },
    
    emitClass(node: ClassDeclaration, out :Output) {
        
    },
    
    emitMethod(node: MethodDeclaration, out :Output) {
        
    }
    
    // abstract visitAnyType(node: ast.AnyType); 
    // abstract visitStringType(node: ast.StringType);
    // abstract visitNumberType(node: ast.NumberType);
    // abstract visitBooleanType(node: ast.BooleanType);
    // abstract visitArrayType(node: ast.ArrayType);
}

export default emitter;

