//>>built
define("require exports ../../../core/tsSupport/declareExtendsHelper ../../../core/tsSupport/decorateHelper ../../../core/accessorSupport/decorators ../../../Color ../../../core/JSONSupport ../../../core/lang".split(" "),function(b,c,f,e,d,g,h,k){Object.defineProperty(c,"__esModule",{value:!0});b=function(b){function a(){var a=null!==b&&b.apply(this,arguments)||this;return a.label=null,a.value=0,a.color=null,a}return f(a,b),c=a,a.prototype.clone=function(){return new c({label:this.label,value:this.value,
color:k.clone(this.color)})},e([d.property({type:String,json:{write:!0}})],a.prototype,"label",void 0),e([d.property({type:Number,nonNullable:!0,json:{write:!0}})],a.prototype,"value",void 0),e([d.property({type:g,json:{type:[Number],write:!0}})],a.prototype,"color",void 0),a=c=e([d.subclass("esri.renderers.support.pointCloud.StopInfo")],a);var c}(d.declared(h));c.StopInfo=b;c["default"]=b});