//>>built
define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../input/InputHandler","../../../input/handlers/support"],function(e,f,g,h,k){Object.defineProperty(f,"__esModule",{value:!0});e=function(e){function b(b,c,a){var d=e.call(this,!0)||this;return d.view=b,d.pointerType=c,d.registerIncoming("drag",a,function(a){return d._handleDrag(a)}),d.registerIncoming("pointer-down",function(a){return d.stopMomentumNavigation()}),d}return g(b,e),b.prototype._handleDrag=function(b){var c=
b.data,a=this.view.navigation;if(1<c.pointers.length||a.pinch.zoomMomentum||a.pinch.rotateMomentum)return void this.stopMomentumNavigation();if(k.eventMatchesPointerType(c.pointers[0].startEvent["native"],this.pointerType)){a=a.pan;switch(c.action){case "start":a.begin(this.view,c);break;case "update":a.update(this.view,c);break;case "end":a.end(this.view,c)}b.stopPropagation()}},b.prototype.stopMomentumNavigation=function(){this.view.navigation.pan.stopMomentumNavigation()},b}(h.InputHandler);f.DragPan=
e});