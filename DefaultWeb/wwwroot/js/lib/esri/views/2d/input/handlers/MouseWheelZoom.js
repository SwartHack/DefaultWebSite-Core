//>>built
define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../input/InputHandler"],function(b,d,e,f){Object.defineProperty(d,"__esModule",{value:!0});b=function(b){function c(g,c){var a=b.call(this,!0)||this;return a.view=g,a._canZoom=!0,a.registerIncoming("mouse-wheel",c,function(b){return a._handleMouseWheel(b)}),a}return e(c,b),c.prototype._handleMouseWheel=function(b){var c=this;if(this._canZoom){var a=b.data;(a=this.view.navigation.zoom(1/Math.pow(.6,1/60*a.deltaY),[a.x,a.y]))&&
(this._canZoom=!1,a.always(function(){c._canZoom=!0}));b.stopPropagation()}},c}(f.InputHandler);d.MouseWheelZoom=b});