//>>built
define("../../core/Accessor ../../core/Scheduler ../../core/now ../ViewAnimation ./unitBezier ./viewpointUtils".split(" "),function(n,p,h,k,e,l){var m=function(a,b,c,d){var f=a.targetGeometry,g=b.targetGeometry;d?"string"==typeof d&&(d=e.parse(d)||e.ease):d=e.ease;this.easing=d;this.duration=c;this.sCenterX=f.x;this.sCenterY=f.y;this.sScale=a.scale;this.sRotation=a.rotation;this.tCenterX=g.x;this.tCenterY=g.y;this.tScale=b.scale;this.tRotation=b.rotation;this.dCenterX=this.tCenterX-this.sCenterX;
this.dCenterY=this.tCenterY-this.sCenterY;this.dScale=this.tScale-this.sScale;this.dRotation=this.tRotation-this.sRotation;180<this.dRotation?this.dRotation-=360:-180>this.dRotation&&(this.dRotation+=360)};m.prototype.applyRatio=function(a,b){var c,d,f,g,e=this.easing(b);1<=b?(c=this.tCenterX,d=this.tCenterY,f=this.tRotation,g=this.tScale):(c=this.sCenterX+e*this.dCenterX,d=this.sCenterY+e*this.dCenterY,f=this.sRotation+e*this.dRotation,g=this.sScale+e*this.dScale);a.targetGeometry.x=c;a.targetGeometry.y=
d;a.scale=g;a.rotation=f};return n.createSubclass({constructor:function(){this._updateTask=p.addFrameTask({postRender:this._postRender.bind(this)});this._updateTask.pause()},getDefaults:function(){return{viewpoint:l.create()}},properties:{animation:null,duration:{value:200},transition:{value:null},easing:{value:e.ease},viewpoint:null},animate:function(a,b,c){this.stop();return l.copy(this.viewpoint,b),this.transition=new m(this.viewpoint,a.target,c&&c.duration||this.duration,c&&c.easing||this.easing),
a.always(function(){this.animation===a&&this._updateTask&&("finished"===a.state&&(this.transition.applyRatio(this.viewpoint,1),this.animation._dfd.progress(this.viewpoint)),this._updateTask.pause(),this.animation=null,this.updateFunction=null)}.bind(this)),this._startTime=h(),this._updateTask.resume(),this.animation=a,a},animateContinous:function(a,b){this.stop();this.updateFunction=b;this.viewpoint=a;var c=new k({target:a.clone()});return c.always(function(){this.animation===c&&this._updateTask&&
(this._updateTask.pause(),this.animation=null,this.updateFunction=null)}.bind(this)),this._startTime=h(),this._updateTask.resume(),this.animation=c,c},stop:function(){this.animation&&(this.animation.stop(),this.animation=null,this.updateFunction=null)},_postRender:function(a){var b=this.animation;if(!b||b.state===k.STOPPED)return void this._updateTask.pause();this.updateFunction?this.updateFunction(this.viewpoint,a.deltaTime):(a=(h()-this._startTime)/this.transition.duration,b=1<=a,this.transition.applyRatio(this.viewpoint,
a),b&&this.animation.finish());this.animation._dfd.progress(this.viewpoint)}})});