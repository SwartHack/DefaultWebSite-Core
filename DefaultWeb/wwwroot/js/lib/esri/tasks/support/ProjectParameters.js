//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/accessorSupport/decorators ../../core/lang ../../geometry/support/jsonUtils ../../core/JSONSupport ../../core/Logger".split(" "),function(m,n,f,b,c,g,h,k,l){var d=l.getLogger("esri.tasks.support.ProjectParameters");return function(e){function a(a){a=e.call(this)||this;return a.geometries=null,a.outSpatialReference=null,a.transformation=null,a.transformForward=null,a}return f(a,e),Object.defineProperty(a.prototype,
"outSR",{get:function(){return d.warn("ProjectParameters.outSR is deprecated. Use outSpatialReference instead."),this.outSpatialReference},set:function(a){d.warn("ProjectParameters.outSR is deprecated. Use outSpatialReference instead.");this.outSpatialReference=a},enumerable:!0,configurable:!0}),a.prototype.toJSON=function(){var a=this.geometries.map(function(a){return a.toJSON()}),c=this.geometries[0],b={};return b.outSR=this.outSpatialReference.wkid||JSON.stringify(this.outSpatialReference.toJSON()),
b.inSR=c.spatialReference.wkid||JSON.stringify(c.spatialReference.toJSON()),b.geometries=JSON.stringify({geometryType:h.getJsonType(c),geometries:a}),this.transformation&&(b.transformation=this.transformation.wkid||JSON.stringify(this.transformation)),g.isDefined(this.transformForward)&&(b.transformForward=this.transformForward),b},b([c.property()],a.prototype,"geometries",void 0),b([c.property({json:{read:{source:"outSR"}}})],a.prototype,"outSpatialReference",void 0),b([c.property({json:{read:!1}})],
a.prototype,"outSR",null),b([c.property()],a.prototype,"transformation",void 0),b([c.property()],a.prototype,"transformForward",void 0),a=b([c.subclass("esri.tasks.support.ProjectParameters")],a)}(c.declared(k))});