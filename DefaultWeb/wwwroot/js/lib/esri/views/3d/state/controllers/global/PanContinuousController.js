//>>built
define("require exports ../../../../../core/tsSupport/extendsHelper ../../../camera/constraintUtils ../CameraController ../../../support/earthUtils ../../../support/mathUtils ../../../lib/glMatrix".split(" "),function(k,b,n,p,q,f,l,m){Object.defineProperty(b,"__esModule",{value:!0});b.Direction={LEFT:1,RIGHT:2,FORWARD:4,BACKWARD:8,UP:16,DOWN:32};var d=m.vec3d,g=m.mat4d;k=function(h){function e(a){var c=h.call(this)||this;return c.view=a,c.directionStatus=0,c.direction=d.create(),c.tmpAxis=d.create(),
c.radiusChange=0,c.velocity=0,c.tmpP1=d.create(),c.tmpTransf=g.create(),c}return n(e,h),Object.defineProperty(e.prototype,"isInteractive",{get:function(){return!0},enumerable:!0,configurable:!0}),e.prototype.addDirection=function(a){(0===this.directionStatus&&d.set3(0,0,0,this.direction),this.directionStatus&a)||((this.directionStatus|=a,a&(b.Direction.LEFT|b.Direction.RIGHT|b.Direction.FORWARD|b.Direction.BACKWARD))?(this.computePanAxis(a,this.tmpAxis),d.add(this.direction,this.tmpAxis)):(a=this.directionStatus&
(b.Direction.UP|b.Direction.DOWN),this.radiusChange=a===b.Direction.UP?1:a===b.Direction.DOWN?-1:0),this.velocity=this.computePanVelocity())},e.prototype.removeDirection=function(a){(this.directionStatus&=~a,0===this.directionStatus&&this.active)?this.finishController():a&(b.Direction.LEFT|b.Direction.RIGHT|b.Direction.FORWARD|b.Direction.BACKWARD)?(this.computePanAxis(a,this.tmpAxis),d.subtract(this.direction,this.tmpAxis),.01>d.length(this.direction)&&d.set3(0,0,0,this.direction)):(a=this.directionStatus&
(b.Direction.UP|b.Direction.DOWN),this.radiusChange=a===b.Direction.UP?1:a===b.Direction.DOWN?-1:0)},e.prototype.stepController=function(a,c){h.prototype.stepController.call(this,a,c);a*=this.velocity;var b=!1;if(0<Math.abs(this.radiusChange)){var b=1+a*this.radiusChange,e=c.viewForward,f=d.normalize(c.center,this.tmpP1);(-.999<d.dot(e,f)||0>this.radiusChange)&&d.scale(c.center,b);d.scale(c.eye,b);this.velocity=this.computePanVelocity();b=!0}.01<d.length2(this.direction)&&(g.identity(this.tmpTransf),
g.rotate(this.tmpTransf,a,this.direction),g.multiplyVec3(this.tmpTransf,c.eye),g.multiplyVec3(this.tmpTransf,c.center),g.multiplyVec3(this.tmpTransf,c.up),b=!0);b&&p.applyAll(this.view,c,{selection:14,interactionType:4,interactionStartCamera:this.view.state.camera,interactionFactor:null,interactionDirection:null})},e.prototype.computePanAxis=function(a,c){var e=this.view.state.camera;d.subtract(e.center,e.eye,c);d.cross(c,e.up);a!==b.Direction.LEFT&&a!==b.Direction.RIGHT||(d.normalize(c),d.cross(c,
e.center));a!==b.Direction.RIGHT&&a!==b.Direction.FORWARD||d.negate(c);d.normalize(c)},e.prototype.computePanVelocity=function(){var a=.5*Math.abs(d.length(this.view.state.camera.eye)-f.earthRadius);return a=l.clamp(a,1,2*f.earthRadius),l.acos(1-a*a/(2*f.earthRadius*f.earthRadius))},e}(q.CameraController);b.PanContinuousController=k});