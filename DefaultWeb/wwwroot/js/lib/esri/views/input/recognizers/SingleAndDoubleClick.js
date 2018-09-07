//>>built
define(["require","exports","../../../core/tsSupport/extendsHelper","../InputHandler","./support"],function(h,f,k,l,m){Object.defineProperty(f,"__esModule",{value:!0});f.DefaultParameters={maximumDoubleClickDelay:250,maximumDoubleClickDistance:10,maximumDoubleTouchDelay:350,maximumDoubleTouchDistance:35};h=function(h){function g(a,c,e,d){void 0===a&&(a=f.DefaultParameters.maximumDoubleClickDelay);void 0===c&&(c=f.DefaultParameters.maximumDoubleClickDistance);void 0===e&&(e=f.DefaultParameters.maximumDoubleTouchDelay);
void 0===d&&(d=f.DefaultParameters.maximumDoubleTouchDistance);var b=h.call(this,!1)||this;return b.maximumDoubleClickDelay=a,b.maximumDoubleClickDistance=c,b.maximumDoubleTouchDelay=e,b.maximumDoubleTouchDistance=d,b._pointerState=new Map,b._click=b.registerOutgoing("click"),b._doubleClick=b.registerOutgoing("double-click"),b._firstClick=b.registerOutgoing("first-click"),b.registerIncoming("pointer-click",b._handlePointerClick.bind(b)),b}return k(g,h),g.prototype.onUninstall=function(){this._pointerState.forEach(function(a){0!==
a.doubleClickTimeout&&(clearTimeout(a.doubleClickTimeout),a.doubleClickTimeout=0)})},g.prototype._pointerId=function(a){a=a["native"];return"mouse"===a.pointerType?a.pointerId+":"+a.button:""+a.pointerType},g.prototype._handlePointerClick=function(a){var c=a.data,e=this._pointerId(c),d=this._pointerState.get(e);if(d){clearTimeout(d.doubleClickTimeout);d.doubleClickTimeout=0;var b="touch"===c["native"].pointerType?this.maximumDoubleTouchDistance:this.maximumDoubleClickDistance;m.manhattanDistance(d.event.data,
c)>b?(this._doubleClickTimeoutExceeded(e),this._startClick(a)):(this._doubleClick.emit(c,void 0,d.event.modifiers),this._pointerState["delete"](e))}else this._startClick(a)},g.prototype._startClick=function(a){var c=this,e=a.data,d=this._pointerId(a.data);this._pointerState.set(d,{event:a,doubleClickTimeout:setTimeout(function(){return c._doubleClickTimeoutExceeded(d)},"touch"===e["native"].pointerType?this.maximumDoubleTouchDelay:this.maximumDoubleClickDelay)});this._firstClick.emit(a.data,void 0,
a.modifiers)},g.prototype._doubleClickTimeoutExceeded=function(a){var c=this._pointerState.get(a);this._click.emit(c.event.data,void 0,c.event.modifiers);c.doubleClickTimeout=0;this._pointerState["delete"](a)},g}(l.InputHandler);f.SingleAndDoubleClick=h});