//>>built
define(["require","exports","./EventMatch","../../core/Logger"],function(f,h,l,m){Object.defineProperty(h,"__esModule",{value:!0});var k=m.getLogger("esri.views.input.InputHandler");f=function(){function a(b){this._manager=null;this._incoming={};this._outgoing={};this._outgoingEventTypes=this._incomingEventTypes=this._incomingEventMatches=null;this._hasSideEffects=b}return Object.defineProperty(a.prototype,"incomingEventMatches",{get:function(){if(!this._incomingEventMatches){this._incomingEventMatches=
[];for(var b in this._incoming)for(var c=0,a=this._incoming[b];c<a.length;c++)this._incomingEventMatches.push(a[c].match)}return this._incomingEventMatches},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"incomingEventTypes",{get:function(){return this._incomingEventTypes||(this._incomingEventTypes=this.incomingEventMatches.map(function(b){return b.eventType})),this._incomingEventTypes},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"outgoingEventTypes",{get:function(){return this._outgoingEventTypes||
(this._outgoingEventTypes=Object.keys(this._outgoing)),this._outgoingEventTypes},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"hasSideEffects",{get:function(){return this._hasSideEffects},enumerable:!0,configurable:!0}),a.prototype.onInstall=function(b){var c=this;return this._manager?void k.error("This InputHandler has already been registered with an InputManager"):(b.setEventCallback(function(b){return c._handleEvent(b)}),b.setUninstallCallback(function(){return c._onUninstall()}),
void(this._manager=b))},a.prototype.onUninstall=function(){},a.prototype.registerIncoming=function(b,c,a){var d,e=this;"function"==typeof c?(a=c,d=[]):d=c||[];b="string"==typeof b?new l.EventMatch(b,d):b;var g=function(){e._incomingEventTypes=null;e._incomingEventMatches=null};c=function(b){var a=e._incoming[b.match.eventType];a&&(b=a.indexOf(b),a.splice(b,1),g(),e._manager&&e._manager.updateDependencies())};a=new n(b,a,{onPause:c,onRemove:c,onResume:function(b){var a=e._incoming[b.match.eventType];
a&&-1===a.indexOf(b)&&(a.push(b),g(),e._manager&&e._manager.updateDependencies())}});c=this._incoming[b.eventType];return c||(c=[],this._incoming[b.eventType]=c),c.push(a),g(),this._manager&&this._manager.updateDependencies(),a},a.prototype.registerOutgoing=function(b){var a=this;if(this._outgoing[b])throw Error("There is already a callback registered for this outgoing InputEvent: "+b);var d=new p(b,{onEmit:function(b,c,d,f){a._manager.emit(b.eventType,c,d,f)},onRemove:function(b){delete a._outgoing[b.eventType];
a._manager.updateDependencies()}});return this._outgoing[b]=d,this._outgoingEventTypes=null,this._manager&&this._manager.updateDependencies(),d},a.prototype.startCapturingPointer=function(b){this._manager.setPointerCapture(b,!0)},a.prototype.stopCapturingPointer=function(b){this._manager.setPointerCapture(b,!1)},a.prototype._onUninstall=function(){return this._manager?(this.onUninstall(),void(this._manager=null)):void k.error("This InputHandler is not registered with an InputManager")},a.prototype._handleEvent=
function(b){var a=this._incoming[b.type];if(a)for(var d=0;d<a.length;d++){var f=a[d];if(f.match.matches(b)&&(f.callback(b),b.shouldStopPropagation()))break}},a}();h.InputHandler=f;var n=function(){function a(b,a,d){this.match=b;this._callback=a;this._handler=d}return a.prototype.pause=function(){this._handler.onPause(this)},a.prototype.resume=function(){this._handler.onResume(this)},a.prototype.remove=function(){this._handler.onRemove(this)},Object.defineProperty(a.prototype,"callback",{get:function(){return this._callback},
enumerable:!0,configurable:!0}),a}(),p=function(){function a(b,a){this.eventType=b;this._removed=!1;this._handler=a}return a.prototype.emit=function(a,c,d){this._removed||this._handler.onEmit(this,a,c,d)},a.prototype.remove=function(){this._removed=!0;this._handler.onRemove(this)},a}()});