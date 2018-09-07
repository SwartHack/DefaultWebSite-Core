//>>built
define("require exports ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ../core/accessorSupport/decorators ./support/widget ./Widget ./Compass/CompassViewModel dojo/i18n!./Compass/nls/Compass".split(" "),function(n,p,l,b,c,e,m,f,h){return function(k){function a(a){a=k.call(this)||this;return a.activeMode=null,a.modes=null,a.view=null,a.viewModel=new f,a}return l(a,k),a.prototype.reset=function(){},a.prototype.render=function(){var a=this.viewModel.orientation,b=this.viewModel.state,
c="disabled"===b,f="compass"===("rotation"===b?"rotation":"compass"),b=(d={},d["esri-disabled"]=c,d["esri-compass--active"]="device-orientation"===this.viewModel.activeMode,d["esri-interactive"]=!c,d),d=(g={},g["esri-icon-compass"]=f,g["esri-icon-dial"]=!f,g);return e.tsx("div",{bind:this,"class":"esri-compass esri-widget-button esri-widget",classes:b,onclick:this._start,onkeydown:this._start,role:"button",tabIndex:c?-1:0,"aria-label":h.reset,title:h.reset},e.tsx("span",{"aria-hidden":"true","class":"esri-compass__icon",
classes:d,styles:this._toRotationTransform(a)}),e.tsx("span",{"class":"esri-icon-font-fallback-text"},h.reset));var d,g},a.prototype._start=function(){var a=this.viewModel;a.nextMode();a.startMode()},a.prototype._toRotationTransform=function(a){return{transform:"rotateZ("+a.z+"deg)"}},b([c.aliasOf("viewModel.activeMode")],a.prototype,"activeMode",void 0),b([c.aliasOf("viewModel.modes")],a.prototype,"modes",void 0),b([c.aliasOf("viewModel.view")],a.prototype,"view",void 0),b([c.property({type:f}),
e.renderable(["viewModel.orientation","viewModel.state"])],a.prototype,"viewModel",void 0),b([c.aliasOf("viewModel.reset")],a.prototype,"reset",null),b([e.accessibleHandler()],a.prototype,"_start",null),a=b([c.subclass("esri.widgets.Compass")],a)}(c.declared(m))});