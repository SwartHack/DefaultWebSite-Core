//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/accessorSupport/decorators ../../core/JSONSupport ../../symbols/support/typeUtils ../../symbols/support/jsonUtils".split(" "),function(b,c,h,e,d,k,g,f){Object.defineProperty(c,"__esModule",{value:!0});b=function(b){function a(){var a=null!==b&&b.apply(this,arguments)||this;return a.description=null,a.label=null,a.minValue=null,a.maxValue=0,a.symbol=null,a}return h(a,b),c=a,a.prototype.clone=
function(){return new c({description:this.description,label:this.label,minValue:this.minValue,maxValue:this.maxValue,symbol:this.symbol?this.symbol.clone():null})},e([d.property({type:String,json:{write:!0}})],a.prototype,"description",void 0),e([d.property({type:String,json:{write:!0}})],a.prototype,"label",void 0),e([d.property({type:Number,json:{read:{source:"classMinValue"},write:{target:"classMinValue"}}})],a.prototype,"minValue",void 0),e([d.property({type:Number,json:{read:{source:"classMaxValue"},
write:{target:"classMaxValue"}}})],a.prototype,"maxValue",void 0),e([d.property({types:g.types,json:{origins:{"web-scene":{read:f.read,write:{target:{symbol:{types:g.types3D}},writer:f.writeTarget}}},read:f.read,write:f.writeTarget}})],a.prototype,"symbol",void 0),a=c=e([d.subclass("esri.renderers.support.ClassBreakInfo")],a);var c}(d.declared(k));c.ClassBreakInfo=b;c["default"]=b});