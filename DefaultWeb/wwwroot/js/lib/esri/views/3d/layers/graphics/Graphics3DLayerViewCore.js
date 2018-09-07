//>>built
define("require exports ../../../../core/HandleRegistry ../../../../core/watchUtils ../../../../core/promiseUtils ../../../../core/Collection ../../../../tasks/support/Query ../../../../Graphic ./Graphics3DCore ./Graphics3DLabeling ./Graphics3DScaleVisibility ./Graphics3DFrustumVisibility ./Graphics3DElevationAlignment ./Graphics3DSpatialIndex ./Graphics3DVerticalScale ./Graphics3DHighlights ../support/attributeUtils".split(" "),function(y,z,f,k,l,m,n,g,p,q,r,t,u,v,w,x,h){return function(){function e(a){var b=
this;if(this._handles=new f,this.layer=a.layer,this.owner=a.owner,this.updateClippingExtent=a.updateClippingExtent,this.updateSuspendResumeExtent=a.updateSuspendResumeExtent,this.getGraphicsInExtent=a.getGraphicsInExtent,this.graphicsCore=new p(a.elevationFeatureExpressionEnabled),a.spatialIndexRequired&&(this.spatialIndex=new v),a.frustumVisibilityEnabled){this.frustumVisibility=new t;var c=this.owner.view.basemapTerrain;this._handles.add([this.owner.view.on("resize",function(){return b.frustumVisibility.viewChange()}),
this.owner.view.state.watch("camera",function(){return b.frustumVisibility.viewChange()},!0),c.on("elevation-bounds-change",function(){return b.frustumVisibility.elevationBoundsChange()})]);"local"===this.owner.view.viewingMode?this.frustumVisibility.isVisibleBelowSurface=!0:this._handles.add(k.init(c,["opacity","wireframe"],function(){return b.frustumVisibility.isVisibleBelowSurface=c.isSeeThrough()}))}a.scaleVisibilityEnabled&&(a.spatialIndexRequired?(this.scaleVisibility=new r,this._handles.add(this.layer.watch("minScale,maxScale",
function(){return b.scaleVisibility.layerMinMaxScaleChangeHandler()}))):console.warn("scaleVisibility requires a spatialIndex"));a.elevationAlignmentEnabled&&(this.elevationAlignment=new u,this._handles.add(this.layer.watch("elevationInfo",function(){return b.graphicsCore.elevationInfoChange()})));a.labelingEnabled&&(this.labeling=new q,this._handles.add(this.layer.watch("labelsVisible",function(){return b.labeling.labelVisibilityChanged()})),this._handles.add(this.layer.watch("labelingInfo",function(){return b.labeling.updateLabelingInfo()})));
a.verticalScaleEnabled&&(this.verticalScale=new w({sourceSpatialReference:this.layer.spatialReference,destSpatialReference:this.owner.view.spatialReference}));a.highlightsEnabled&&(this.highlights=new x)}return e.prototype.initialize=function(){var a=this;return this.whenSpatialIndexLoaded().then(function(){return a.deferredInitialize()})},e.prototype.whenSpatialIndexLoaded=function(){return this.spatialIndex?this.spatialIndex.whenLoaded():l.resolve()},e.prototype.deferredInitialize=function(){var a=
this;this.spatialIndex&&this.spatialIndex.initialize(this.owner,this.layer,this.owner.view.spatialReference,this.graphicsCore);this.frustumVisibility&&this.frustumVisibility.initialize(this.owner);var b=this.owner.view.basemapTerrain,c=this.owner.view.elevationProvider;(this.scaleVisibility&&this.scaleVisibility.initialize(this.owner,this.layer,this.spatialIndex,this.graphicsCore,b),this.elevationAlignment&&this.elevationAlignment.initialize(this.owner,function(b,c,d){return a._getGraphicsInExtent(b,
c,d)},this.graphicsCore,c),this.labeling)&&this.labeling.initialize(this.owner,this.layer,this.spatialIndex,this.graphicsCore,this.scaleVisibility);return this.highlights&&this.highlights.initialize(this.graphicsCore),this.graphicsCore.initialize(this.owner,this.layer,this.elevationAlignment,this.scaleVisibility,this.spatialIndex,this.labeling,this.highlights,function(){a.updateSuspendResumeExtent&&a._updateSuspendResumeExtent(a.updateSuspendResumeExtent())},function(b){return a.verticalScale?a.verticalScale.adjust(b):
b},b),this._handles.add([this.layer.watch("renderer",function(b){return a.graphicsCore.rendererChange(b)}),this.owner.watch("fullOpacity",function(){return a.graphicsCore.opacityChange()})]),this._handles.add(this.layer.on("graphic-update",function(b){return a.graphicsCore.graphicUpdateHandler(b)})),this.owner.view.resourceController.registerIdleFrameWorker(this,{needsUpdate:this._needsIdleUpdate,idleFrame:this._idleUpdate}),this.updateClippingExtent&&(this._handles.add(this.owner.view.watch("clippingArea",
function(){return a._updateClippingExtent()})),this._updateClippingExtent()),this.labeling?this.labeling.updateLabelingInfo():void 0},e.prototype.destroy=function(){this.owner&&this.owner.view.resourceController.deregisterIdleFrameWorker(this);this._handles&&(this._handles.destroy(),this._handles=null);this.frustumVisibility&&(this.frustumVisibility.destroy(),this.frustumVisibility=null);this.scaleVisibility&&(this.scaleVisibility.destroy(),this.scaleVisibility=null);this.elevationAlignment&&(this.elevationAlignment.destroy(),
this.elevationAlignment=null);this.labeling&&(this.labeling.destroy(),this.labeling=null);this.graphicsCore&&(this.graphicsCore.destroy(),this.graphicsCore=null);this.spatialIndex&&(this.spatialIndex.destroy(),this.spatialIndex=null);this.highlights&&(this.highlights.destroy(),this.highlights=null);this.owner=this.layer=null},e.prototype.highlight=function(a,b,c){var e=this;if(a instanceof n){b=this.highlights.acquireSet(b,c);var f=b.set,d=b.handle;return this.owner.queryObjectIds(a).then(function(a){return e.highlights.setObjectIds(f,
a)}),d}if("number"==typeof a||a instanceof g)return this.highlight([a],b,c);if(a instanceof m&&(a=a.toArray()),Array.isArray(a)&&0<a.length){if(a[0]instanceof g){d=a;if(!c||!d[0].attributes||null===h.attributeLookup(d[0].attributes,c))return a=d.map(function(a){return a.uid}),d=this.highlights.acquireSet(b,null),b=d.set,d=d.handle,this.highlights.setUids(b,a),d;a=d.map(function(a){return h.attributeLookup(a.attributes,c)})}if("number"==typeof a[0])return d=this.highlights.acquireSet(b,c),b=d.set,
d=d.handle,this.highlights.setObjectIds(b,a),d}return{remove:function(){}}},e.prototype.canResume=function(){return(!this.frustumVisibility||this.frustumVisibility.canResume())&&(!this.scaleVisibility||this.scaleVisibility.canResume())},e.prototype._needsIdleUpdate=function(){return this.frustumVisibility&&this.frustumVisibility.needsIdleUpdate()?!0:this.scaleVisibility&&this.scaleVisibility.needsIdleUpdate()?!0:this.elevationAlignment&&this.elevationAlignment.needsIdleUpdate()?!0:this.graphicsCore&&
this.graphicsCore.needsIdleUpdate()?!0:!1},e.prototype._idleUpdate=function(a){this.frustumVisibility&&this.frustumVisibility.idleUpdate(a);this.scaleVisibility&&this.scaleVisibility.idleUpdate(a);this.elevationAlignment&&this.elevationAlignment.idleUpdate(a);this.graphicsCore&&this.graphicsCore.idleUpdate(a)},e.prototype._updateSuspendResumeExtent=function(a){this.frustumVisibility&&this.frustumVisibility.setExtent(a);this.scaleVisibility&&this.scaleVisibility.setExtent(a)},e.prototype._updateClippingExtent=
function(){var a=this.owner.view.clippingArea;this.graphicsCore.setClippingExtent(a,this.owner.view.spatialReference)&&(this.updateClippingExtent(a)||this.graphicsCore.recreateAllGraphics())},e.prototype._getGraphicsInExtent=function(a,b,c){this.getGraphicsInExtent?this.getGraphicsInExtent(a,b,c):this.spatialIndex?this.spatialIndex.intersects(a,b,c):c([],0)},e}()});