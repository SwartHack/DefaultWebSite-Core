//>>built
define("require exports ../../../../../core/tsSupport/extendsHelper ../../../lib/glMatrix ../../../input/util ../../../webgl-engine/lib/Camera ../InteractiveController ./MomentumController ../../utils/navigationUtils ../../utils/navigationUtils ../../../camera/constraintUtils".split(" "),function(l,n,q,e,p,r,t,u,f,m,h){Object.defineProperty(n,"__esModule",{value:!0});l=function(l){function c(b,d){var a=l.call(this)||this;return a.view=b,a.pickingHelper=d,a.smoothRotation=new p.ExponentialFalloff(.05),
a.rotationAxis=e.vec3d.create(),a.panningCenterScene=e.vec3d.create(),a.panningPlane={normal:e.vec3d.create(),d:0},a.smoothScaling=new p.ExponentialFalloff(.05),a.zoomCenterScreen=e.vec2d.create(),a.beginScenePoints={points:[],center:e.vec3d.create()},a.adjustedSphere={center:e.vec3d.create(),radius:0},a.panMode=m.PanMode.Horizontal,a.tmp2d=e.vec2d.create(),a.tmp3d=e.vec3d.create(),a.tmpInteractionDirection=e.vec3d.create(),a.beginScreenPoint=e.vec2d.create(),a.screenPickPoint=e.vec2d.create(),a.currentPoints=
[],a.currentCenter=e.vec3d.create(),a.constraintOptions={selection:15,interactionType:0,interactionFactor:0,interactionStartCamera:new r,interactionDirection:null},a.momentumController=new u.MomentumController(b),a}return q(c,l),c.prototype.begin=function(b,d,a){if(this.active){this.beginRadius=d.radius;f.navPointToScreenPoint(this.currentCamera,d.center,this.screenPickPoint);e.vec2d.set(this.screenPickPoint,this.beginScreenPoint);a=f.pickPointAndInitSphere(this.pickingHelper,this.beginCamera,this.screenPickPoint,
!0);if(this.scenePickPoint=a.scenePickPoint,this.sphere=a.sphere,this.panMode=f.decidePanMode(this.beginCamera,this.sphere,this.scenePickPoint),this.panMode===m.PanMode.Horizontal)this.computeSpherePoints(b,"startEvent",this.sphere,this.beginCamera,this.beginScenePoints.points),f.centroidOnSphere(this.sphere.radius,this.beginScenePoints.points,this.beginScenePoints.center);else{e.vec3d.set(this.beginCamera.viewForward,this.panningPlane.normal);e.vec3d.normalize(this.panningPlane.normal);e.vec3d.negate(this.panningPlane.normal);
f.setPlane(this.scenePickPoint,this.panningPlane.normal,this.panningPlane);b=e.vec3d.create();e.vec3d.set3(this.screenPickPoint[0],this.currentCamera.height,0,b);a=e.vec3d.create();var g=e.vec3d.length(this.beginCamera.eye);this.adjustedSphere.radius=g<this.sphere.radius?g-100:this.sphere.radius;f.sphereOrSilhouettePointFromScreenPoint(this.adjustedSphere,this.beginCamera,b,a);this.beginCamera.projectPoint(a,b);this.screenPickPoint[1]=Math.min(this.screenPickPoint[1],.9*b[1]);this.pickingHelper.pickPointInScreen(this.screenPickPoint,
this.scenePickPoint)&&f.setPlane(this.scenePickPoint,this.panningPlane.normal,this.panningPlane);f.navPointToScreenPoint(this.currentCamera,d.center,this.tmp2d);f.intersectPlaneFromScreenPoint(this.panningPlane,this.beginCamera,this.tmp2d,this.panningCenterScene)}this.constraintOptions.interactionStartCamera.copyFrom(this.beginCamera)}},c.prototype.update=function(b,d,a){if(this.active){this.currentCamera.copyFrom(this.beginCamera);var g=1<b.length;this.panMode===m.PanMode.Horizontal?(g&&this.zoomSpherical(d,
a),this.panningSpherical(b,d,a),g&&this.rotateSpherical(b,d,a)):(g&&this.zoomPlanar(b,d,a),this.panningPlanar(b,d,a),g&&this.rotatePlanar(b,d,a));this.currentCamera.markViewDirty()}},c.prototype.end=function(){return this.panMode===m.PanMode.Horizontal?this.momentumController.setParameters(this.sphere.radius,this.panMode,this.zoomCenterScreen,this.beginScenePoints.center):this.momentumController.setParameters(this.sphere.radius,this.panMode,this.zoomCenterScreen,this.panningCenterScene),this.finishController(),
this.momentumController.initiate()?this.momentumController:null},c.prototype.computeSpherePoints=function(b,d,a,g,k){k.length=b.length;for(var h=this.tmp2d,c=0;c<k.length;c++)f.navPointToScreenPoint(g,b[c][d],h),void 0===k[c]&&(k[c]=e.vec3d.create()),f.sphereOrSilhouettePointFromScreenPoint(a,g,h,k[c]);return k},c.prototype.zoomSpherical=function(b,d){var a=this.currentCamera.height,g=this.beginRadius/b.radius;this.smoothScaling.gain=.001875*Math.min(Math.max(b.radius,40),120);this.smoothScaling.update(g);
f.applyZoomOnSphere(this.sphere,this.currentCamera,this.smoothScaling.value);e.vec2d.set2(b.center.x,a-b.center.y,this.zoomCenterScreen);this.momentumController.addScaleValue(d,this.smoothScaling.value);this.constraintOptions.interactionType=1;this.constraintOptions.interactionFactor=h.pixelDistanceToInteractionFactor(b.radius-this.beginRadius);h.applyAll(this.view,this.currentCamera,this.constraintOptions)},c.prototype.panningSpherical=function(b,d,a){this.currentPoints;this.computeSpherePoints(b,
"currentEvent",this.sphere,this.currentCamera,this.currentPoints);f.centroidOnSphere(this.sphere.radius,this.currentPoints,this.currentCenter);f.navPointToScreenPoint(this.currentCamera,d.center,this.tmp2d);f.applyPanSpherical(this.sphere,this.currentCamera,this.beginScenePoints.center,this.currentCenter,{estimator:this.momentumController,time:a,endScreenPoint:this.tmp2d});this.constraintOptions.interactionType=4;this.constraintOptions.interactionFactor=h.pixelDistanceToInteractionFactor(this.screenPickPoint,
this.tmp2d);h.applyAll(this.view,this.currentCamera,this.constraintOptions)},c.prototype.rotateSpherical=function(b,d,a){var g=b.length;e.vec3d.normalize(this.beginScenePoints.center,this.rotationAxis);this.computeSpherePoints(b,"currentEvent",this.sphere,this.currentCamera,this.currentPoints);for(var c=b=0;g>c;c++)b+=f.rotationFromPointsAroundAxis(this.currentPoints[c],this.beginScenePoints.points[c],this.rotationAxis);c=this.smoothRotation.value;g=f.normalizeRotationDelta(b/g-c);b=c+g;this.smoothRotation.gain=
.00125*Math.min(Math.max(d.radius,40),120);this.smoothRotation.update(b);g=this.smoothRotation.value;this.momentumController.addRotationValue(a,g);f.applyRotation(this.currentCamera,this.sphere.center,this.rotationAxis,g);this.constraintOptions.interactionType=2;this.constraintOptions.interactionFactor=h.pixelDistanceToInteractionFactor(d.radius*b);h.applyAll(this.view,this.currentCamera,this.constraintOptions)},c.prototype.panningPlanar=function(b,d,a){f.navPointToScreenPoint(this.currentCamera,
d.center,this.tmp2d);f.intersectPlaneFromScreenPoint(this.panningPlane,this.currentCamera,this.tmp2d,this.tmp3d)&&(f.applyPanPlanar(this.currentCamera,this.panningCenterScene,this.tmp3d,{estimator:this.momentumController,time:a,endScreenPoint:this.tmp2d}),this.constraintOptions.interactionType=4,this.constraintOptions.interactionFactor=h.pixelDistanceToInteractionFactor(this.beginScreenPoint,this.tmp2d),this.constraintOptions.interactionDirection=this.view.renderCoordsHelper.worldUpAtPosition(this.currentCamera.eye,
this.tmpInteractionDirection),h.applyAll(this.view,this.currentCamera,this.constraintOptions),this.constraintOptions.interactionDirection=null)},c.prototype.zoomPlanar=function(b,d,a){b=this.beginRadius/d.radius;this.smoothScaling.gain=.001875*Math.min(Math.max(d.radius,40),120);this.smoothScaling.update(b);this.momentumController.addScaleValue(a,this.smoothScaling.value);this.momentumController.setParametersVertical(this.panningCenterScene);f.applyZoomToPoint(this.currentCamera,this.panningCenterScene,
this.smoothScaling.value,this.view.state.constraints.minimumPoiDistance);this.constraintOptions.interactionType=1;this.constraintOptions.interactionFactor=h.pixelDistanceToInteractionFactor(d.radius-this.beginRadius);h.applyAll(this.view,this.currentCamera,this.constraintOptions)},c.prototype.rotatePlanar=function(b,d,a){e.vec3d.set(this.panningCenterScene,this.rotationAxis);var c=d.angle;b=this.smoothRotation.value;c=f.normalizeRotationDelta(c-b);c=b+c;this.smoothRotation.gain=.00125*Math.min(Math.max(d.radius,
40),120);this.smoothRotation.update(c);b=this.smoothRotation.value;this.momentumController.addRotationValue(a,b);f.applyRotation(this.currentCamera,this.sphere.center,this.rotationAxis,b);this.constraintOptions.interactionType=2;this.constraintOptions.interactionFactor=h.pixelDistanceToInteractionFactor(d.radius*b);h.applyAll(this.view,this.currentCamera,this.constraintOptions)},c}(t.InteractiveController);n.PinchAndPanController=l});