//>>built
define("require exports ../../../../../core/tsSupport/declareExtendsHelper ../../../../../core/tsSupport/decorateHelper ../../../../../core/HandleRegistry ../../../../../core/StackedObjectPool ../../../../overlay/TextOverlayItem ../../../../overlay/LineOverlayItem ../../../lib/glMatrix ../../../webgl-engine/lib/Layer ../../../webgl-engine/lib/Object3D ../../../webgl-engine/lib/Geometry ../../../webgl-engine/lib/GeometryData ../../../webgl-engine/lib/GeometryUtil ../../../webgl-engine/lib/Selector ../../../webgl-engine/materials/Material ../../../webgl-engine/materials/ColorMaterial ../../../webgl-engine/materials/RibbonLineMaterial ../../../webgl-engine/materials/MeasurementArrowMaterial ../../../webgl-engine/parts/Model ../support/viewUtils ../support/PathSegmentInterpolator ./LaserLineRenderer ../../../support/mathUtils".split(" "),
function(u,U,V,W,J,K,L,M,C,N,q,A,O,D,P,G,Q,E,R,g,r,H,S,x){var p,v=C.vec2d,h=C.vec3d,t=C.mat4d,d=new K(function(){return h.create()});u=[1,.5,0,.75];var T={laserLineGlowColor:[1,.5,0],laserLineGlowWidth:8,laserLineInnerColor:[1,1,1],laserLineInnerWidth:.75,laserLineGlobalAlpha:.75,laserLineEnabled:!0,handleColor:[1,.5,0],handleRadius:10,triangleColor:u,triangleLineWidth:3,triangleCornerSize:32,triangleSubdivisions:128,arrowWidth:16,arrowOutlineColor:[1,.5,0,1],arrowOutlineWidth:.2,arrowStripeEvenColor:[1,
1,1,1],arrowStripeOddColor:[1,.5,0,1],arrowStripeLength:16,arrowSubdivisions:128,geodesicProjectionLineWidth:2,geodesicProjectionLineColor:u,guideLineWidth:2,guideLineColor:u,guideStippleLengthPixels:6,labelDistance:25};!function(b){b[b.Small=12]="Small";b[b.Large=16]="Large"}(p||(p={}));var F=function(){function b(){this.text=new L({visible:!1});this.callout=new M({visible:!1,width:2});this._visible=!1}return Object.defineProperty(b.prototype,"visible",{get:function(){return this._visible},set:function(a){this._visible=
a;this.text.visible=a;this.callout.visible=a},enumerable:!0,configurable:!0}),b.prototype.addToView=function(a){a.overlay.items.addMany([this.text,this.callout])},b.prototype.removeFromView=function(a){a.overlay.items.removeMany([this.text,this.callout])},b.prototype.update=function(a,c,f,b,e){void 0===e&&(e=p.Small);var k=c[0]-a[0],d=c[1]-a[1],k=Math.abs(k)>Math.abs(d)?0<k?"left":"right":0<d?"top":"bottom";this.text.position=[c[0],c[1]];this.text.text=f;this.text.fontSize=e;this.text.anchor=k;this.callout.startPosition=
[a[0],a[1]];this.callout.endPosition=[c[0],c[1]];this.visible=b},b}(),B=function(){function b(){this.origin=h.create();this.start=h.create();this.end=h.create()}return b.prototype.update=function(a,c,f){h.set(a,this.start);h.set(c,this.end);f?h.set(f,this.origin):r.midpoint([a,c],this.origin)},b}();u=function(){function b(a,c,f){void 0===f&&(f={});this._visible=!1;this._laserLineRenderer=null;this._handleGeometry=new A(D.createSphereGeometry(1,32,32),"handle");this._listenerHandles=null;this._cursorPosition=
h.create();this._startPosition=h.create();this._endPosition=h.create();this._centerPosition=h.create();this._cornerPosition=h.create();this._arrowLabelSegment=new B;this._horizontalLabelSegment=new B;this._verticalLabelSegment=new B;this._geodesicProjectionLabelSegment=new B;this._origin=h.create();this._originTransform=t.create();this._tempMat4=t.create();this._model=a;this._sceneView=c;this._params=r.copyParameter(T,f);this._layer=new N("point-to-point-measurement",{},"point-to-point-measurement");
this._createMaterials();this._createObjects();this._createLabels();this._selector=new P(this._sceneView.viewingMode)}return b.prototype.destroy=function(){this.hide()},Object.defineProperty(b.prototype,"cameraAboveGround",{get:function(){return this._sceneView.state.camera.aboveGround},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"visible",{get:function(){return this._visible},set:function(a){a?this.show():this.hide()},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,
"testData",{get:function(){return{labels:{direct:this._directDistanceLabel,horizontal:this._horizontalDistanceLabel,vertical:this._verticalDistanceLabel},laserLineRenderer:this._laserLineRenderer}},enumerable:!0,configurable:!0}),b.prototype.show=function(){if(!this._visible){this._visible=!0;var a=this._sceneView._stage;this._laserLineRenderer=new S(this._sceneView.renderCoordsHelper,{glowColor:this._params.laserLineGlowColor,glowWidth:this._params.laserLineGlowWidth,innerColor:this._params.laserLineInnerColor,
innerWidth:this._params.laserLineInnerWidth,globalAlpha:this._params.laserLineGlobalAlpha});a.addExternalRenderer(this._laserLineRenderer.renderSlots,this._laserLineRenderer);this._addToStage(a);this._directDistanceLabel.addToView(this._sceneView);this._horizontalDistanceLabel.addToView(this._sceneView);this._verticalDistanceLabel.addToView(this._sceneView);this._initializeListeners();this._updateCursorPosition();this._updateStartPosition();this._updateEndPosition();this._updateMouseCursor();this._updateView()}},
b.prototype.hide=function(){if(this._visible){this._visible=!1;var a=this._sceneView._stage;a.removeExternalRenderer(this._laserLineRenderer);this._laserLineRenderer=null;this._removeFromStage(a);this._directDistanceLabel.removeFromView(this._sceneView);this._horizontalDistanceLabel.removeFromView(this._sceneView);this._verticalDistanceLabel.removeFromView(this._sceneView);this._destroyListeners();this._sceneView.cursor=null}},b.prototype.pick=function(a){this._selector.enableTerrain=!a.pickHandles;
this._selector.enableHUDSelection=!a.pickHandles;var c=[];if(a.pickHandles)c.push(this._layer.id);else for(var f=this._sceneView._stage.getViewContent(),k=this._sceneView._stage.getAll(g.ContentType.LAYER),e=0;e<f.length;e++){var y=k[f[e]];y&&y!==this._layer&&"VISIBLE"===y.getState()&&c.push(y.id)}f=this._sceneView.spatialReference;a=this._sceneView._stage.pick([a.screenPoint.x,this._sceneView.height-a.screenPoint.y],c,!0,this._selector).getMinResult();c=h.create();if(!a.getIntersectionPoint(c))return new b.PickResult;
f=this._sceneView.renderCoordsHelper.fromRenderCoords(c,f);k=null;a.target===this._startHandleObject?k="start":a.target===this._endHandleObject&&(k="end");return new b.PickResult("terrain"===a.intersector?"surface":"feature",c,f,k)},b.prototype.getElevation=function(a){return this._sceneView.basemapTerrain.ready?this._sceneView.basemapTerrain.getElevation(a)||0:0},b.prototype.overlappingHandles=function(a,c){return r.pointToPointScreenDistance(a,c,this._sceneView)<=this._params.handleRadius},b.prototype._createMaterials=
function(){this._handleMaterial=new G({diffuse:this._params.handleColor,castShadows:!1},"handle");this._handleMaterial.setRenderOccluded(!0);this._handleMaterialHidden=new G({opacity:0,transparent:!0,castShadows:!1},"handle-hidden");this._triangleLineMaterial=new E({width:this._params.triangleLineWidth,color:this._params.triangleColor,polygonOffset:!0},"triangle-line");this._triangleLineMaterial.setRenderOccluded(!0);this._triangleCornerMaterial=new Q({color:this._params.triangleColor,transparent:!0,
polygonOffset:!0},"triangle-corner");this._triangleCornerMaterial.setRenderOccluded(!0);this._arrowMaterial=new R({outlineColor:this._params.arrowOutlineColor,stripeEvenColor:this._params.arrowStripeEvenColor,stripeOddColor:this._params.arrowStripeOddColor,polygonOffset:!0},"arrow");this._arrowMaterial.setRenderOccluded(!0);this._geodesicProjectionLineMaterial=new E({width:this._params.geodesicProjectionLineWidth,color:this._params.geodesicProjectionLineColor,polygonOffset:!0},"geodesic-line");this._geodesicProjectionLineMaterial.setRenderOccluded(!0);
this._geodesicGuideLineMaterial=new E({width:this._params.guideLineWidth,color:this._params.geodesicProjectionLineColor,polygonOffset:!0,stippleLength:0},"geodesic-guide");this._geodesicGuideLineMaterial.setRenderOccluded(!0)},b.prototype._createObjects=function(){this._startHandleObject=new q;this._startHandleObject.addGeometry(this._handleGeometry,[this._handleMaterial],t.identity());this._layer.addObject(this._startHandleObject);this._endHandleObject=new q;this._endHandleObject.addGeometry(this._handleGeometry,
[this._handleMaterial],t.identity());this._layer.addObject(this._endHandleObject);this._triangleLineObject=new q;this._layer.addObject(this._triangleLineObject);this._triangleCornerObject=new q;this._layer.addObject(this._triangleCornerObject);this._arrowObject=new q;this._layer.addObject(this._arrowObject);this._geodesicProjectionLineObject=new q;this._layer.addObject(this._geodesicProjectionLineObject);this._geodesicProjectionStartGuideObject=new q;this._layer.addObject(this._geodesicProjectionStartGuideObject);
this._geodesicProjectionEndGuideObject=new q;this._layer.addObject(this._geodesicProjectionEndGuideObject)},b.prototype._createLabels=function(){this._directDistanceLabel=new F;this._horizontalDistanceLabel=new F;this._verticalDistanceLabel=new F},b.prototype._addToStage=function(a){a.add(g.ContentType.LAYER,this._layer);a.add(g.ContentType.MATERIAL,this._handleMaterial);a.add(g.ContentType.MATERIAL,this._handleMaterialHidden);a.add(g.ContentType.MATERIAL,this._triangleLineMaterial);a.add(g.ContentType.MATERIAL,
this._triangleCornerMaterial);a.add(g.ContentType.MATERIAL,this._arrowMaterial);a.add(g.ContentType.MATERIAL,this._geodesicProjectionLineMaterial);a.add(g.ContentType.MATERIAL,this._geodesicGuideLineMaterial);a.add(g.ContentType.OBJECT,this._startHandleObject);a.add(g.ContentType.OBJECT,this._endHandleObject);a.add(g.ContentType.OBJECT,this._triangleLineObject);a.add(g.ContentType.OBJECT,this._triangleCornerObject);a.add(g.ContentType.OBJECT,this._arrowObject);a.add(g.ContentType.OBJECT,this._geodesicProjectionLineObject);
a.add(g.ContentType.OBJECT,this._geodesicProjectionStartGuideObject);a.add(g.ContentType.OBJECT,this._geodesicProjectionEndGuideObject);a.addToViewContent([this._layer.id])},b.prototype._removeFromStage=function(a){a.removeFromViewContent([this._layer.id]);a.remove(g.ContentType.LAYER,this._layer.id);a.remove(g.ContentType.MATERIAL,this._handleMaterial.getId());a.remove(g.ContentType.MATERIAL,this._handleMaterialHidden.getId());a.remove(g.ContentType.MATERIAL,this._triangleLineMaterial.getId());a.remove(g.ContentType.MATERIAL,
this._triangleCornerMaterial.getId());a.remove(g.ContentType.MATERIAL,this._arrowMaterial.getId());a.remove(g.ContentType.MATERIAL,this._geodesicProjectionLineMaterial.getId());a.remove(g.ContentType.MATERIAL,this._geodesicGuideLineMaterial.getId());a.remove(g.ContentType.OBJECT,this._startHandleObject.id);a.remove(g.ContentType.OBJECT,this._endHandleObject.id);a.remove(g.ContentType.OBJECT,this._triangleLineObject.id);a.remove(g.ContentType.OBJECT,this._triangleCornerObject.id);a.remove(g.ContentType.OBJECT,
this._arrowObject.id);a.remove(g.ContentType.OBJECT,this._geodesicProjectionLineObject.id);a.remove(g.ContentType.OBJECT,this._geodesicProjectionStartGuideObject.id);a.remove(g.ContentType.OBJECT,this._geodesicProjectionEndGuideObject.id)},b.prototype._mirrorLabelPosition=function(a){switch(a){case "top":return"bottom";case "right":return"left";case "bottom":return"top";case "left":return"right"}},b.prototype._getLabelPositions=function(a,c,f,b,e){var k=this._model.triangleView.collapsed;d.push();
var l=d.allocate(),h=d.allocate();e.projectPoint(f,l);e.projectPoint(c,h);l={direct:k?"top":"bottom",horizontal:"top",vertical:l[0]<h[0]?"left":"right"};k||(h=d.allocate(),k=d.allocate(),(r.screenSpaceTangent(a,f,h,e),r.screenSpaceTangent(a,c,k,e),v.dot(h,k)>=I)?l.direct=x.sign(h[1])===x.sign(k[1])?this._mirrorLabelPosition(l.vertical):l.vertical:(a=d.allocate(),r.screenSpaceTangent(f,c,a,e),v.dot(a,k)>=I&&(l.direct=x.sign(a[0])===x.sign(k[0])?this._mirrorLabelPosition(l.horizontal):l.horizontal)));
"below-the-surface"===b&&(c=function(a){return"top"===a?"bottom":"top"},l.direct=c(l.direct),l.horizontal=c(l.horizontal),l.vertical=c(l.vertical));return d.pop(),l},b.prototype._updateView=function(){if(this._sceneView.ready){var a=this._sceneView._stage.getCamera(),c=this._sceneView.renderCoordsHelper;this._updateHandleObject(this._startHandleObject,this._startPosition,null!==this._model.startPoint,0===this._model.draggedHandles.length&&"start"===this._model.hoveredHandle,this._model.draggedHandles.includes("start"),
a);this._updateHandleObject(this._endHandleObject,this._endPosition,null!==this._model.endPoint,0===this._model.draggedHandles.length&&"end"===this._model.hoveredHandle,this._model.draggedHandles.includes("end")||"drawing"===this._model.state,a);var f=this._model.triangleView;if(!f.visible)return this._triangleLineObject.removeAllGeometries(),this._triangleCornerObject.removeAllGeometries(),this._arrowObject.removeAllGeometries(),this._geodesicProjectionLineObject.removeAllGeometries(),this._geodesicProjectionStartGuideObject.removeAllGeometries(),
this._geodesicProjectionEndGuideObject.removeAllGeometries(),this._directDistanceLabel.visible=!1,this._horizontalDistanceLabel.visible=!1,void(this._verticalDistanceLabel.visible=!1);var k="camera-dependent"===this._model.measurementSurfaceLocation?this._sceneView.state.camera.aboveGround?"above-the-surface":"below-the-surface":this._model.measurementSurfaceLocation,e=this._startPosition,b=this._endPosition,d="above-the-surface"===k?1:-1,g=d*(c.getAltitude(b)-c.getAltitude(e));0>g&&(n=[b,e],e=n[0],
b=n[1]);n=this._cornerPosition;c.worldUpAtPosition(e,n);h.scale(n,d*Math.abs(g));h.add(n,e);c=this._centerPosition;r.midpoint([e,b,n],c);h.set(c,this._origin);t.identity(this._originTransform);t.translate(this._originTransform,this._origin);f.collapsed?(this._triangleLineObject.removeAllGeometries(),this._triangleCornerObject.removeAllGeometries()):this._updateTriangleObjects(this._triangleLineObject,this._triangleCornerObject,e,b,n,this._origin,this._originTransform,a,f.mode,this._horizontalLabelSegment,
this._verticalLabelSegment);this._updateArrowObject(this._arrowObject,this._startPosition,this._endPosition,this._origin,this._originTransform,f.stripeLength,a,f.mode,this._arrowLabelSegment);c=this._requiresGeodesicGuides(this._startPosition,this._endPosition,a,f.mode);this._updateGeodesicProjectionLineObject(this._geodesicProjectionLineObject,this._startPosition,this._endPosition,this._origin,this._originTransform,c,this._geodesicProjectionLabelSegment);this._updateGeodesicProjectionGuideObjects(a,
c);d=this._params.labelDistance;k=this._getLabelPositions(e,b,n,k,a);this._updateAuxiliaryMeasureLabels(f,a,k);"geodesic"!==f.mode?this._updateLabel(this._directDistanceLabel,this._arrowLabelSegment,d,k.direct,f.directLabel,f.visible,p.Large,a):(this._updateLabel(this._horizontalDistanceLabel,c?this._geodesicProjectionLabelSegment:this._arrowLabelSegment,d,k.horizontal,f.horizontalLabel,f.visible,p.Large,a),this._directDistanceLabel.visible=!1);var n}},b.prototype._updateAuxiliaryMeasureLabels=function(a,
c,f){if(a.collapsed)return this._horizontalDistanceLabel.visible=!1,void(this._verticalDistanceLabel.visible=!1);var b=this._params.labelDistance;this._updateLabel(this._horizontalDistanceLabel,this._horizontalLabelSegment,b,f.horizontal,a.horizontalLabel,!0,p.Small,c);this._updateLabel(this._verticalDistanceLabel,this._verticalLabelSegment,b,f.vertical,a.verticalLabel,!0,p.Small,c)},b.prototype._updateHandleObject=function(a,c,f,b,e,d){a.removeAllGeometries();f&&(r.scaleTranslateMatrix(this._params.handleRadius*
d.computePixelSizeAt(c),c,this._tempMat4),a.addGeometry(this._handleGeometry,[b&&!e?this._handleMaterial:this._handleMaterialHidden],this._tempMat4))},b.prototype._updateTriangleObjects=function(a,c,f,b,e,g,l,m,n,w,r){d.push();n=[h.subtract(f,g,d.allocate()),h.subtract(e,g,d.allocate()),h.subtract(b,g,d.allocate())];w.update(e,b);r.update(f,e);w=new A(D.createPolylineGeometry(n),"triangle-line");a.removeAllGeometries();a.addGeometry(w,[this._triangleLineMaterial],l);a=d.allocate();w=d.allocate();
h.subtract(e,f,a);h.normalize(a,a);h.subtract(b,e,w);h.normalize(w,w);f=.33*Math.min(h.dist(e,f),h.dist(e,b));m=this._params.triangleCornerSize*m.computePixelSizeAt(e);e=new A(this._quadGeometryData(e,a,w,Math.min(f,m),g),"triangle-corner");c.removeAllGeometries();c.addGeometry(e,[this._triangleCornerMaterial],l);d.pop()},b.prototype._updateArrowObject=function(a,c,f,b,e,d,h,g,n){this._createInterpolatedLineGeometry(a,this._arrowMaterial,"arrow",c,f,b,e,g,this._arrowLabelSegment);a=h.computePixelSizeAt(n.origin);
this._arrowMaterial.setParameterValues({width:this._params.arrowWidth*a,stripeLength:d})},b.prototype._getSegmentInterpolator=function(a,c){var b=this._sceneView.spatialReference,d=this._sceneView.renderCoordsHelper.spatialReference;return b.isWebMercator||b.isWGS84?new H.Spherical(a,c,d,d):new H.Linear(a,c)},b.prototype._updateGeodesicProjectionLineObject=function(a,c,b,k,e,g,l){if(!g)return void a.removeAllGeometries();d.push();g=this._sceneView.renderCoordsHelper;c=h.set(c,d.allocate());b=h.set(b,
d.allocate());g.setAltitude(0,c);g.setAltitude(0,b);this._createInterpolatedLineGeometry(a,this._geodesicProjectionLineMaterial,"geodesicProjectionLine",c,b,k,e,"geodesic",l);d.pop()},b.prototype._requiresGeodesicGuides=function(a,c,b,d){return"geodesic"===d&&this._model.geodesicDistanceExceeded?this._requiresGeodesicGuideAt(a,b)||this._requiresGeodesicGuideAt(c,b):!1},b.prototype._requiresGeodesicGuideAt=function(a,c){var b=this._sceneView.renderCoordsHelper;c=c.computePixelSizeAt(a);return 10<=
b.getAltitude(a)/c},b.prototype._updateGeodesicProjectionGuideObjects=function(a,c){if(!c)return this._geodesicProjectionStartGuideObject.removeAllGeometries(),void this._geodesicProjectionEndGuideObject.removeAllGeometries();d.push();c=this._sceneView.renderCoordsHelper;var b=h.set(this._startPosition,d.allocate()),k=h.set(this._endPosition,d.allocate());c.setAltitude(0,b);c.setAltitude(0,k);this._createInterpolatedLineGeometry(this._geodesicProjectionStartGuideObject,this._geodesicGuideLineMaterial,
"geodesicGuideLine",b,this._startPosition,this._origin,this._originTransform,"euclidean");this._createInterpolatedLineGeometry(this._geodesicProjectionEndGuideObject,this._geodesicGuideLineMaterial,"geodesicGuideLine",k,this._endPosition,this._origin,this._originTransform,"euclidean");a=Math.min(a.computePixelSizeAt(this._startPosition),a.computePixelSizeAt(b),a.computePixelSizeAt(this._endPosition),a.computePixelSizeAt(k));this._geodesicGuideLineMaterial.setParameterValues({stippleLength:this._params.guideStippleLengthPixels*
a});d.pop()},b.prototype._createInterpolatedLineGeometry=function(a,c,b,k,e,g,l,m,n){d.push();var f=this._sceneView.renderCoordsHelper,y=[],u=[],q=function(a,b){var c=d.allocate();h.subtract(a,g,c);y.push(c);u.push(b)};if("euclidean"===m){var p=d.allocate();r.midpoint([k,e],p);m=d.allocate();f.worldUpAtPosition(p,m);q(k,m);q(e,m);n&&n.update(k,e)}else{k=this._getSegmentInterpolator(k,e);e=this._params.arrowSubdivisions+1&-2;for(var v=p=null,t=0;e>t;++t){var x=t/(e-1),z=d.allocate();m=d.allocate();
k.eval(x,z);f.worldUpAtPosition(z,m);t===e/2-1?p=z:t===e/2&&(v=z);q(z,m)}n&&n.update(p,v)}b=new A(D.createPolylineGeometry(y,u),b);a.removeAllGeometries();a.addGeometry(b,[c],l);d.pop()},b.prototype._quadGeometryData=function(a,c,b,g,e){d.push();var f=d.allocate(),k=[],m=d.allocate();h.scale(b,g,m);b=d.allocate();h.scale(c,-g,b);for(c=0;4>c;++c)h.set(a,f),h.subtract(f,e),1&c&&h.add(f,m),2&c&&h.add(f,b),k.push(f[0],f[1],f[2]);a=new O({position:{size:3,data:k}},{position:new Uint32Array([0,1,2,1,2,
3])});return d.pop(),a},b.prototype._updateLabel=function(a,b,f,g,e,h,l,m){d.push();var c=d.allocate(),k=d.allocate();b=this._computeLabelPosition(b.origin,b.start,b.end,f,g,c,k,m);a.update(c,k,e,b&&h,l);d.pop()},b.prototype._computeLabelPosition=function(a,b,f,g,e,h,l,m){d.push();var c=d.allocate();r.screenSpaceTangent(b,f,c,m);b=d.allocate();v.set2(-c[1],c[0],b);c=!1;switch(e){case "top":c=0>b[1];break;case "bottom":c=0<b[1];break;case "left":c=0<b[0];break;case "right":c=0>b[0]}c&&v.negate(b);
e=d.allocate();c=d.allocate();return m.projectPoint(a,e),0>e[2]||1<e[2]?(d.pop(),!1):(v.scale(b,g,c),v.add(c,e,c),h[0]=e[0],h[1]=this._sceneView.height-e[1],l[0]=c[0],l[1]=this._sceneView.height-c[1],d.pop(),!0)},b.prototype._updateMouseCursor=function(){if("drawing"===this._model.state||"initial"===this._model.state)this._sceneView.cursor="crosshair";else if("editing"===this._model.state||"measured"===this._model.state)this._sceneView.cursor=null!==this._model.hoveredHandle?"pointer":"crosshair"},
b.prototype._updateCursorPosition=function(){this._model.cursorPoint&&this._sceneView.renderCoordsHelper.toRenderCoords(this._model.cursorPoint,this._cursorPosition);this._updateLaserLine()},b.prototype._updateStartPosition=function(){this._model.startPoint&&this._sceneView.renderCoordsHelper.toRenderCoords(this._model.startPoint,this._startPosition);this._updateLaserLine()},b.prototype._updateEndPosition=function(){this._model.endPoint&&this._sceneView.renderCoordsHelper.toRenderCoords(this._model.endPoint,
this._endPosition);this._updateLaserLine()},b.prototype._getFocusPosition=function(){if(!(this._model.triangleView.collapsed&&this._model.triangleView.visible&&this._model.horizontalDistance.value>this._model.verticalDistance.value)||1!==this._model.draggedHandles.length&&"drawing"!==this._model.state)return this._cursorPosition;var a=this._model.draggedHandles.getItemAt(0);return"drawing"===this._model.state||"end"===a?this._startPosition:this._endPosition},b.prototype._updateLaserLine=function(){var a=
"measured"===this._model.state,b=this._params.laserLineEnabled;this._laserLineRenderer.focusActive=b&&!!this._model.cursorPoint&&!a;this._laserLineRenderer.focusPosition=this._getFocusPosition();this._laserLineRenderer.segmentActive=b&&this._model.triangleView.visible&&!this._model.triangleView.collapsed&&!a;this._laserLineRenderer.segmentStartPosition=this._startPosition;this._laserLineRenderer.segmentEndPosition=this._endPosition},b.prototype._initializeListeners=function(){var a=this;this._listenerHandles=
new J;this._listenerHandles.add(this._model.watch("state",function(){a._updateMouseCursor()}));this._listenerHandles.add(this._model.watch("hoveredHandle",function(){a._updateMouseCursor();a._updateView()}));this._listenerHandles.add(this._model.watch("cursorPoint",function(){a._updateCursorPosition()}));this._listenerHandles.add(this._model.watch("startPoint",function(){a._updateStartPosition();a._updateView()}));this._listenerHandles.add(this._model.watch("endPoint",function(){a._updateEndPosition();
a._updateView()}));this._listenerHandles.add(this._model.watch("unit",function(){a._updateView()}));this._listenerHandles.add(this._sceneView.state.watch("camera",function(){a._updateView()}))},b.prototype._destroyListeners=function(){this._listenerHandles.destroy();this._listenerHandles=null},b}();!function(b){var a=function(){return function(){}}();b.PickRequest=a;a=function(){return function(a,b,d,e){void 0===a&&(a=null);void 0===b&&(b=null);void 0===d&&(d=null);void 0===e&&(e=null);this.type=
a;this.scenePoint=b;this.mapPoint=d;this.handle=e}}();b.PickResult=a}(u||(u={}));var I=Math.cos(x.deg2rad(12));return u});