//>>built
define(["require","exports","../../../../core/tsSupport/extendsHelper","./CameraController","../../webgl-engine/lib/Camera"],function(d,e,g,h,f){Object.defineProperty(e,"__esModule",{value:!0});d=function(c){function b(){var a=null!==c&&c.apply(this,arguments)||this;return a.beginCamera=new f,a.currentCamera=new f,a}return g(b,c),Object.defineProperty(b.prototype,"isInteractive",{get:function(){return!0},enumerable:!0,configurable:!0}),b.prototype.stepController=function(a,b){c.prototype.stepController.call(this,
a,b);b.copyViewFrom(this.currentCamera);this.currentCamera.copyFrom(b)},b.prototype.onControllerStart=function(a){c.prototype.onControllerStart.call(this,a);this.beginCamera.copyFrom(a);this.currentCamera.copyFrom(a)},b.prototype.onControllerEnd=function(a){a.copyViewFrom(this.currentCamera);c.prototype.onControllerEnd.call(this,a)},b}(h.CameraController);e.InteractiveController=d});