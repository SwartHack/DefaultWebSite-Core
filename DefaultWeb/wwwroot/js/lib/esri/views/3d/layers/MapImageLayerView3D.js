//>>built
define("require exports ../../../core/tsSupport/extendsHelper ../../../core/tsSupport/decorateHelper ../../../core/accessorSupport/decorators ../../../layers/support/ExportImageParameters ./DynamicLayerView3D".split(" "),function(m,n,h,g,e,k,l){return function(f){function a(){var b=null!==f&&f.apply(this,arguments)||this;return b._exportImageParameters=null,b._imageVersion=null,b}return h(a,f),a.prototype.initialize=function(){var b=this;this._exportImageParameters=new k({layer:this.layer});this._handles.add(this._exportImageParameters.watch("version",
function(a){b._imageVersion!==a&&(b._imageVersion=a,b.refetch())}))},a.prototype.destroy=function(){this._exportImageParameters&&(this._exportImageParameters.layer=null,this._exportImageParameters.destroy(),this._exportImageParameters=null)},a.prototype.beforeFetch=function(){this._exportImageParameters.scale!==this.view.scale&&(this._exportImageParameters.scale=this.view.scale);this._imageVersion=this._exportImageParameters.version},a.prototype.getPopupData=function(b){var a=this,d=this.view.scale;
return this.layer.allSublayers.filter(function(a){var b=0===a.minScale||d<=a.minScale,c=0===a.maxScale||d>=a.maxScale;return a.popupTemplate&&a.visible&&b&&c}).map(function(c){var d=c.createQuery();return d.geometry=b,d.outFields=a.getTemplateOutFields(c.popupTemplate),c.queryFeatures(d).then(function(a){return a.features})})},a.prototype.getTemplateOutFields=function(a){if(!a||!a.fieldInfos)return["*"];var b=[];return a.fieldInfos.forEach(function(a){var c=a.fieldName&&a.fieldName.toLowerCase();
c&&"shape"!==c&&0!==c.indexOf("relationships/")&&b.push(a.fieldName)}),b},g([e.property()],a.prototype,"layer",void 0),a=g([e.subclass("esri.views.3d.layers.MapImageLayerView3D")],a)}(e.declared(l))});