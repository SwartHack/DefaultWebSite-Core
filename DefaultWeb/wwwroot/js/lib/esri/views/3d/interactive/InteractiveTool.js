//>>built
define("require exports ../../../core/tsSupport/declareExtendsHelper ../../../core/tsSupport/decorateHelper ../../../core/Accessor ../../../core/accessorSupport/decorators".split(" "),function(g,h,e,d,f,b){return function(c){function a(){return null!==c&&c.apply(this,arguments)||this}return e(a,c),a.prototype.start=function(){this.view.activeTool=this},a.prototype.stop=function(){this.view.ready&&(this.view.activeTool=null)},a.prototype.activate=function(a){},a.prototype.deactivate=function(a){},
d([b.property({constructOnly:!0})],a.prototype,"view",void 0),a=d([b.subclass("esri.views.3d.interactive.InteractiveTool")],a)}(b.declared(f))});