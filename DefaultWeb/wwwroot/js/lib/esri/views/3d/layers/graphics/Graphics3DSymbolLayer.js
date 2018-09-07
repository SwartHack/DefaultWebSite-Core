//>>built
define("require exports ../../../../core/tsSupport/extendsHelper ../../support/PromiseLightweight ./featureExpressionInfoUtils ./ElevationContext ./graphicUtils ./Graphics3DSymbolCommonCode ./constants ../../../../core/Logger ../../../../Color ../../../../core/Scheduler".split(" "),function(A,B,p,q,h,k,l,r,t,u,v,w){function m(c,a){c=null!=c?a.attributes[c]:0;return null!=c&&isFinite(c)||(c=0),c}var c=new k,x=u.getLogger("esri.views.3d.layers.graphics.Graphics3DSymbolLayer"),y={mode:"on-the-ground",
offset:0,unit:"meters"},z={mode:"absolute-height",offset:0,unit:"meters"};return function(n){function a(b,d,f,e){var a=n.call(this)||this;return a._elevationOptions={supportsOffsetAdjustment:!1,supportsOnTheGround:!0},a.symbolContainer=b,a.symbol=d,a._context=f,a._symbolLayerOrder=f.layerOrder,a._symbolLayerOrderDelta=f.layerOrderDelta,a._elevationContext=new k,a._material=null,a._geometryCreationWarningHandle=null,a._updateDrivenProperties(e),a._updateElevationContext(),a._prepareResources(),a}return p(a,
n),a.prototype._logWarning=function(b){x.warn(b)},a.prototype._logGeometryCreationWarnings=function(b,d,a,e){var f=this;if(null==this._geometryCreationWarningHandle){var c=b.geometryData&&b.geometryData.polygons;e+=" geometry failed to be created";var g=null;b.projectionSuccess?!d.length||1===d.length&&!d[0].length?g=e+" (no "+a+" were defined)":Array.isArray(d)&&Array.isArray(d[0])?d.some(function(b){return 1===b.length})?g=e+" ("+a+" should contain at least 2 vertices)":c&&0===c.length&&"rings"===
a&&(g=e+" (filled "+a+" should use clockwise winding - try reversing the order of vertices)"):g=e+" ("+a+" should be defined as a 2D array)":g=e+" (failed to project geometry to view spatial reference)";g&&(this._geometryCreationWarningHandle=w.schedule(function(){return f._onNextTick()}),this._logWarning(g))}},a.prototype._onNextTick=function(){this._geometryCreationWarningHandle=null},a.prototype._validateGeometry=function(b){switch(b.type){case "point":if(null==b.x||null==b.y){this._logWarning("point coordinate is null - setting to default value");
var a=b.clone();return a.x=b.x||0,a.y=b.y||0,a}}return b},a.prototype._prepareResources=function(b){throw Error("This is an abstract base class");},a.prototype._defaultElevationInfoNoZ=function(){return y},a.prototype._defaultElevationInfoZ=function(){return z},a.prototype._updateElevationContext=function(){this._elevationContext.setDefaults();var b=this._context.layer.elevationInfo;b&&this._elevationContext.mixinApi(b);(b=this.symbol&&this.symbol.elevationInfo)&&this._elevationContext.mixinApi(b);
this._elevationContext.featureExpressionInfoContext=this._context.featureExpressionInfoContext},a.prototype.getGraphicElevationContext=function(b){var a=b.geometry.hasZ?this._defaultElevationInfoZ():this._defaultElevationInfoNoZ();c.setUnit(null!=this._elevationContext.unit?this._elevationContext.unit:a.unit);c.mode=this._elevationContext.mode||a.mode;c.setOffsetMeters(null!=this._elevationContext.meterUnitOffset?this._elevationContext.meterUnitOffset:a.offset);c.featureExpressionInfoContext=this._elevationContext.featureExpressionInfoContext;
c.hasOffsetAdjustment=!1;this._elevationOptions.supportsOnTheGround||"on-the-ground"!==c.mode||(c.mode="relative-to-ground",c.setOffsetMeters(0),c.featureExpressionInfoContext=h.zeroContext);a=h.createFeature(b);return h.setContextFeature(c.featureExpressionInfoContext,a),r.needsOffsetAdjustment(c,this._elevationOptions,b.geometry,this.symbolContainer)&&(c.setOffsetRenderUnits(t.defaultIconElevationOffset),c.hasOffsetAdjustment=!0),c},a.prototype._getDrapedZ=function(){return-2},a.prototype._updateDrivenProperties=
function(b){var a={color:!1,opacity:!1,size:!1};b||(b=this._context.renderer)&&(a.color=!!b.colorInfo,a.size=!!b.sizeInfo,b.visualVariables&&b.visualVariables.forEach(function(b){switch(b.type){case "color":if(a.color=!0,b.colors)for(var e=0;e<b.colors.length;e++){var d=b.colors[e];d&&(Array.isArray(d)&&3<d.length&&255!==d[3]||void 0!==d.a&&255!==d.a)&&(a.opacity=!0)}if(b.stops)for(e=0;e<b.stops.length;e++)(d=b.stops[e].color)&&(Array.isArray(d)&&3<d.length&&255!==d[3]||void 0!==d.a&&255!==d.a)&&
(a.opacity=!0);break;case "opacity":a.opacity=!0;break;case "size":a.size=!0}}));this._drivenProperties=a},a.prototype._isPropertyDriven=function(b){return this._drivenProperties[b]},a.prototype._getLayerOpacity=function(){if(this._context.layerView&&"fullOpacity"in this._context.layerView)return this._context.layerView.fullOpacity;var b=this._context.layer.opacity;return null==b?1:b},a.prototype._getMaterialOpacity=function(){var b;b=1*this._getLayerOpacity();var a=this.symbol&&this.symbol.material;
return a&&!this._isPropertyDriven("opacity")&&a.color&&(b*=a.color.a),b},a.prototype._getMaterialOpacityAndColor=function(){var b=this.symbol&&this.symbol.material,a=this._getMaterialOpacity(),b=!this._isPropertyDriven("color")&&b&&b.color?v.toUnitRGB(b.color):null;return l.mixinColorAndOpacity(b,a)},a.prototype._getVertexOpacityAndColor=function(a,d,c){var b=this._isPropertyDriven("color")?a.color:null;a=this._isPropertyDriven("opacity")?a.opacity:null;b=l.mixinColorAndOpacity(b,a);return c&&(b[0]*=
c,b[1]*=c,b[2]*=c,b[3]*=c),d?new d(b):b},a.prototype._getStageIdHint=function(){return this._context.layer.id+"_symbol"},a.prototype.isFastUpdatesEnabled=function(){return this._fastUpdates&&this._fastUpdates.enabled},a.prototype.setDrawOrder=function(b,a,c){this._material&&(this._material.setRenderPriority(b),c[this._material.getId()]=!0)},a.prototype.createGraphics3DGraphic=function(b,a){for(var c=2;c<arguments.length;c++);throw Error("This is an abstract base class");},a.prototype.destroy=function(){this._geometryCreationWarningHandle&&
(this._geometryCreationWarningHandle.remove(),this._geometryCreationWarningHandle=null)},a.prototype.layerPropertyChanged=function(a,c,f){return!1},a.prototype.applyRendererDiff=function(a,c,f,e){return!1},a.prototype._getFastUpdateAttrValues=function(a){if(!this._fastUpdates.enabled)return null;var b=this._fastUpdates.visualVariables,c=b.size?m(b.size.field,a):0;a=b.color?m(b.color.field,a):0;return[c,a,0,0]},a}(q.Promise)});