//>>built
define(["require","exports","../../../../core/tsSupport/extendsHelper","./SingleKey"],function(a,b,e,f){Object.defineProperty(b,"__esModule",{value:!0});a=function(a){function c(c,b,d){d=a.call(this,"esri.views.3d.input.handlers.SingleKeyResetHeading",b,d)||this;return d.view=c,d.key=b,d}return e(c,a),c.prototype.activate=function(){this.view.goTo({heading:0})},c}(f.SingleKey);b.SingleKeyResetHeading=a});