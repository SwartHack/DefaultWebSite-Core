//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/accessorSupport/decorators ../../core/Accessor ../../portal/Portal".split(" "),function(k,l,f,c,b,g,h){return function(d){function a(){var a=null!==d&&d.apply(this,arguments)||this;return a.portal=null,a}return f(a,d),e=a,a.prototype.clone=function(){return new e({name:this.name,styleUrl:this.styleUrl,styleName:this.styleName,portal:this.portal})},c([b.property({type:String})],a.prototype,
"name",void 0),c([b.property({type:String})],a.prototype,"styleUrl",void 0),c([b.property({type:String})],a.prototype,"styleName",void 0),c([b.property({type:h})],a.prototype,"portal",void 0),a=e=c([b.subclass("esri.symbols.support.StyleOrigin")],a);var e}(b.declared(g))});