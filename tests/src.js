'use strict';var booleanConst=false;var numberConst=Number.NaN;var stringConst="stringConstLiteral";var numberArrayConst=[1,2,3];var stringArrayArrayConst=[["1","2","3"],["4","5","6"],["7","8","9"]];var anyConst="anyConstLiteral";var optionalBooleanConst=null;var optionalNumberConst=null;var optionalStringConst=null;var optionalNumberArrayConst=null;var optionalAnyConst=null;var booleanVar=true;var numberVar=0;var stringVar="stringVarLiteral";var numberArrayVar;var anyVar="anyVarLiteral";var optionalBooleanVar;
var optionalNumberVar;var optionalStringVar;var optionalNumberArrayVar;var optionalAnyVar;var voidNoArgFunctionCalled=false;function voidNoArgFunction(){voidNoArgFunctionCalled=true}function stringNoArgFunction(){return"stringNoArgFunctionReturnValue"}function numberMultipleArgFunction(a,b){return a*b}var stringNoArgLambda=function(){return"stringNoArgLambdaReturnValue"};var SimpleObject=function(v){this.value=v?v:7;this.methodToOverrideCalled=false};SimpleObject.staticVoidNoArgMethod=function(){this.staticVoidNoArgMethodCalled=true};SimpleObject.prototype.numberSingleObjectArgMethod=function(a){return a.value*this.value};SimpleObject.prototype.callOverriddenMethod=function(){this.methodToOverride()};SimpleObject.prototype.methodToOverride=function(){this.methodToOverrideCalled=true};SimpleObject.prototype.upcastThisToObject=function(){return this};
var simpleObjectInstance=new SimpleObject;var anyObjectInstance=simpleObjectInstance;var simpleInterfaceInstanceCalled=false;var simpleInterfaceInstance={voidNoArgMethod:function(){simpleInterfaceInstanceCalled=true}};function acceptSimpleInterface(simpleInterface){simpleInterface.voidNoArgMethod()};