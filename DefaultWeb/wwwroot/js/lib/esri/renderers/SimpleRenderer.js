//>>built
define("require exports ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ../core/accessorSupport/decorators ../core/lang ../symbols/support/jsonUtils ../symbols/support/typeUtils ./Renderer".split(" "),function(m,n,h,c,b,k,e,g,l){return function(d){function a(){var a=null!==d&&d.apply(this,arguments)||this;return a.description=null,a.label=null,a.symbol=null,a.type="simple",a}return h(a,d),f=a,a.prototype.writeSymbolWebScene=function(a,b,c,d){e.writeTarget(a,b,c,d)},a.prototype.writeSymbol=
function(a,b,c,d){e.writeTarget(a,b,c,d)},a.prototype.readSymbol=function(a,b,c){return e.read(a,b,c)},a.prototype.getSymbol=function(a,b){return this.symbol},a.prototype.getSymbols=function(){return this.symbol?[this.symbol]:[]},a.prototype.clone=function(){return new f({description:this.description,label:this.label,symbol:this.symbol&&this.symbol.clone(),visualVariables:k.clone(this.visualVariables),authoringInfo:this.authoringInfo&&this.authoringInfo.clone()})},c([b.property({type:String,json:{write:!0}})],
a.prototype,"description",void 0),c([b.property({type:String,json:{write:!0}})],a.prototype,"label",void 0),c([b.property({types:g.types})],a.prototype,"symbol",void 0),c([b.writer("web-scene","symbol",{symbol:{types:g.types3D}})],a.prototype,"writeSymbolWebScene",null),c([b.writer("symbol")],a.prototype,"writeSymbol",null),c([b.reader("symbol")],a.prototype,"readSymbol",null),a=f=c([b.subclass("esri.renderers.SimpleRenderer")],a);var f}(b.declared(l))});