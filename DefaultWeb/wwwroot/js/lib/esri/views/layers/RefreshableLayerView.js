//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/accessorSupport/decorators ../../core/Accessor".split(" "),function(g,h,e,c,b,f){return function(d){function a(){var a=null!==d&&d.apply(this,arguments)||this;return a.refreshTimestamp=null,a}return e(a,d),a.prototype.refresh=function(a){void 0===a&&(a=Date.now());this._set("refreshTimestamp",a);this.doRefresh&&this.doRefresh()},c([b.property()],a.prototype,"layer",void 0),c([b.aliasOf("layer.refreshInterval")],
a.prototype,"refreshInterval",void 0),c([b.property({readOnly:!0})],a.prototype,"refreshTimestamp",void 0),a=c([b.subclass("esri.layers.mixins.RefreshableLayerView")],a)}(b.declared(f))});