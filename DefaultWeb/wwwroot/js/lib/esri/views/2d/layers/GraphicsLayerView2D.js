//>>built
define("require exports ../../../core/tsSupport/extendsHelper ../../../core/tsSupport/decorateHelper ../../../core/accessorSupport/decorators ./LayerView2D ./support/GraphicsView2D".split(" "),function(k,l,e,f,d,g,h){return function(c){function a(){var b=null!==c&&c.apply(this,arguments)||this;return b.graphicsView=new h,b.container=b.graphicsView.container,b}return e(a,c),a.prototype.hitTest=function(b,a){return this.graphicsView.hitTest(b,a)},a.prototype.attach=function(){var a=this;this.layer.createGraphicsController({layerView:this}).then(function(b){a.graphicsView.view=
a.view;a.graphicsView.graphics=b.graphics})},a.prototype.detach=function(){this.graphicsView.graphics=null},a.prototype.update=function(a){},a.prototype.moveStart=function(){},a.prototype.viewChange=function(){},a.prototype.moveEnd=function(){},a=f([d.subclass("esri.views.2d.layers.GraphicsLayerView2D")],a)}(d.declared(g))});