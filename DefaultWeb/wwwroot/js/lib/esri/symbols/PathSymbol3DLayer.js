//>>built
define("require exports ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ./Symbol3DLayer ../core/accessorSupport/decorators".split(" "),function(h,k,f,c,g,b){return function(e){function a(a){a=e.call(this)||this;return a.material=null,a.type="path",a.size=void 0,a}return f(a,e),d=a,a.prototype.readSize=function(a,b){return a||b.width||0},a.prototype.clone=function(){return new d({enabled:this.enabled,elevationInfo:this.elevationInfo&&this.elevationInfo.clone(),material:this.material&&
this.material.clone(),size:this.size})},c([b.property()],a.prototype,"material",void 0),c([b.property()],a.prototype,"type",void 0),c([b.property({type:Number,json:{write:!0}})],a.prototype,"size",void 0),c([b.reader("size",["size","width"])],a.prototype,"readSize",null),a=d=c([b.subclass("esri.symbols.PathSymbol3DLayer")],a);var d}(b.declared(g))});