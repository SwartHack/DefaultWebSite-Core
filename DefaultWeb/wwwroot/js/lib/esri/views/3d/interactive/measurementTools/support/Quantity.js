//>>built
define(["require","exports","./unitUtils"],function(e,f,b){return function(){function a(c,a){this.measure=b.measureForUnit(a);this.value=c;this.unit=a}return Object.defineProperty(a.prototype,"isBaseUnit",{get:function(){return b.isBaseUnit(this.unit)},enumerable:!0,configurable:!0}),a.prototype.toUnit=function(c){return new a(b.convertUnit(this.value,this.unit,c),c)},a.prototype.toBaseUnit=function(){return this.toUnit(b.baseUnitForUnit(this.unit))},a.prototype.toDecimalString=function(a,d){return void 0===
a&&(a=2),b.formatDecimal(this.value,this.unit,a,d)},a}()});