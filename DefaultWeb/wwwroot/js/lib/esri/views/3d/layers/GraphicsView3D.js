//>>built
define("require exports ../../../core/tsSupport/declareExtendsHelper ../../../core/tsSupport/decorateHelper ../../../core/accessorSupport/decorators ../../layers/GraphicsView ./graphics/Graphics3DCore ./graphics/Graphics3DSpatialIndex ./graphics/Graphics3DElevationAlignment ../support/PromiseLightweight ../../../core/promiseUtils".split(" "),function(p,q,g,c,d,h,k,l,m,n,f){return function(e){function b(){var a=null!==e&&e.apply(this,arguments)||this;return a.graphicsCore=null,a.spatialIndex=null,
a.elevationAlignment=null,a.supportsDraping=!0,a._overlayUpdating=!1,a._eventHandles=[],a}return g(b,e),Object.defineProperty(b.prototype,"graphics",{set:function(a){a!==this.loadedGraphics&&(this.loadedGraphics=a);this._set("graphics",a)},enumerable:!0,configurable:!0}),b.prototype.initialize=function(){var a=this;this.mockLayerId="__sceneView.graphics-"+Date.now().toString(16);this.spatialIndex=new l;this.spatialIndex.whenLoaded().then(function(){return a.deferredInitialize()})},b.prototype.deferredInitialize=
function(){var a=this;if(!this.destroyed){this.loadedGraphics=this.graphics;this.graphicsCore=new k;this.elevationAlignment=new m;var b={id:this.mockLayerId,uid:this.mockLayerId};this.spatialIndex.initialize(this,b,this.view.spatialReference,this.graphicsCore);this.elevationAlignment.initialize(this,function(b,d,c){a.spatialIndex.intersects(b,d,c)},this.graphicsCore,this.view.elevationProvider);this.graphicsCore.initialize(this,b,this.elevationAlignment,null,this.spatialIndex,null,null,null,null,
this.view.basemapTerrain);this._eventHandles.push(this.view.watch("clippingArea",function(){return a.updateClippingExtent()}));this.updateClippingExtent();this.view.resourceController.registerIdleFrameWorker(this,{needsUpdate:this._needsIdleUpdate,idleFrame:this._idleUpdate})}},b.prototype.destroy=function(){this._eventHandles.forEach(function(a){return a.remove()});this._eventHandles=null;this.view.resourceController.deregisterIdleFrameWorker(this);this.spatialIndex&&(this.spatialIndex.destroy(),
this.spatialIndex=null);this.elevationAlignment&&(this.elevationAlignment.destroy(),this.elevationAlignment=null);this.graphicsCore&&(this.graphicsCore.destroy(),this.graphicsCore=null);this.loadedGraphics=null},b.prototype.getGraphicsFromStageObject=function(a,b){var d=a.getMetadata().graphicId,c=null;this.loadedGraphics&&this.loadedGraphics.some(function(a){return a.uid===d?(c=a,!0):!1});a=new n.Promise;return null!==c?a.done(c):a.reject(),a},b.prototype.whenGraphicBounds=function(a){var b=this;
return this.spatialIndex?this.spatialIndex.whenLoaded().then(function(){return b.graphicsCore?b.graphicsCore.whenGraphicBounds(a):f.reject()}):f.reject()},b.prototype._needsIdleUpdate=function(){return this.elevationAlignment.needsIdleUpdate()},b.prototype._idleUpdate=function(a){this.elevationAlignment.idleUpdate(a)},b.prototype._notifySuspendedChange=function(){},b.prototype._notifyDrapedDataChange=function(){this.view.basemapTerrain&&this.view.basemapTerrain.overlayManager.setOverlayDirty()},b.prototype._evaluateUpdatingState=
function(){if(this.elevationAlignment){var a;a=0+this.elevationAlignment.numNodesUpdating();a+=this.graphicsCore.numNodesUpdating();this.updating=a=(a=(a=(a=0<a||this._overlayUpdating)||this.spatialIndex.isUpdating())||this.elevationAlignment.isUpdating())||this.graphicsCore.needsIdleUpdate()}else this.updating=!1},b.prototype.updateClippingExtent=function(){this.graphicsCore.setClippingExtent(this.view.clippingArea,this.view.spatialReference)&&this.graphicsCore.recreateAllGraphics()},c([d.property()],
b.prototype,"graphics",null),c([d.property()],b.prototype,"loadedGraphics",void 0),c([d.property({value:!0})],b.prototype,"updating",void 0),c([d.property({value:!1})],b.prototype,"suspended",void 0),b=c([d.subclass("esri.views.3d.layers.GraphicsView3D")],b)}(d.declared(h))});