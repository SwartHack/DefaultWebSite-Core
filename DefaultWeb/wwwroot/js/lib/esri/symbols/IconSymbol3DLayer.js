//>>built
define("require exports ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ../core/kebabDictionary ../core/urlUtils ../core/accessorSupport/decorators ./Symbol3DLayer ./support/Symbol3DOutline ./support/Symbol3DResource ./support/materialUtils".split(" "),function(r,t,g,c,k,f,b,l,m,n,p){var h=k({center:"center",left:"left",right:"right",top:"top",bottom:"bottom",topLeft:"top-left",topRight:"top-right",bottomLeft:"bottom-left",bottomRight:"bottom-right"},{ignoreUnknown:!0}),q=
function(e){function a(){return null!==e&&e.apply(this,arguments)||this}return g(a,e),d=a,a.prototype.readHref=function(a,b,c){return a?f.read(a,c):b.dataURI},a.prototype.writeHref=function(a,b,c,d){a&&(f.isDataProtocol(a)?b.dataURI=a:(b.href=f.write(a,d),f.isAbsolute(b.href)&&(b.href=f.normalize(b.href))))},a.prototype.clone=function(){return new d({href:this.href,primitive:this.primitive})},c([b.property({json:{write:!0,read:{source:["href","dataURI"]}}})],a.prototype,"href",void 0),c([b.reader("href")],
a.prototype,"readHref",null),c([b.writer("href")],a.prototype,"writeHref",null),a=d=c([b.subclass("esri.symbols.support.IconSymbol3DLayerResource")],a);var d}(b.declared(n["default"]));return function(e){function a(a){a=e.call(this)||this;return a.material=null,a.resource=null,a.type="icon",a.size=12,a.anchor=void 0,a.outline=void 0,a}return g(a,e),d=a,a.prototype.clone=function(){return new d({anchor:this.anchor,enabled:this.enabled,elevationInfo:this.elevationInfo&&this.elevationInfo.clone(),material:this.material&&
this.material.clone(),outline:this.outline&&this.outline.clone(),resource:this.resource&&this.resource.clone(),size:this.size})},c([b.property()],a.prototype,"material",void 0),c([b.property({type:q,json:{write:!0}})],a.prototype,"resource",void 0),c([b.property()],a.prototype,"type",void 0),c([b.property(p.screenSizeProperty)],a.prototype,"size",void 0),c([b.property({type:String,json:{read:h.read,write:h.write}})],a.prototype,"anchor",void 0),c([b.property({type:m["default"],json:{write:!0}})],
a.prototype,"outline",void 0),a=d=c([b.subclass("esri.symbols.IconSymbol3DLayer")],a);var d}(b.declared(l))});