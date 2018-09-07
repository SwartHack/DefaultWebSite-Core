//>>built
define("require exports ../../../../core/tsSupport/declareExtendsHelper ../../../../core/tsSupport/decorateHelper ../../../../core/accessorSupport/decorators ../../../../core/Accessor ../../../../core/Logger ../../../../geometry/Point ../../webgl-engine/lib/Selector ../../support/Evented ../../support/aaBoundingRect ../../lib/glMatrix".split(" "),function(x,y,q,k,d,r,t,u,v,w,g,h){var e=g.create(g.NEGATIVE_INFINITY),f={spatialReference:null,extent:e},c=h.vec3d.create(),l=h.vec3d.create(),m=h.vec3d.create(),
n=t.getLogger("esri.views.3d.layers.i3s.I3SElevationProvider");return function(p){function a(b){return p.call(this)||this}return q(a,p),a.prototype.initialize=function(){this.renderCoordsHelper=this.layerView.view.renderCoordsHelper;this.intersectLayers=[this.stageLayer];this.selector=new v(this.layerView.view.viewingMode);var b=this.layerView.layer.fullExtent;this.zmin=b.zmin;this.zmax=b.zmax},a.prototype.getElevation=function(b){if(b instanceof u){if(!this.renderCoordsHelper.toRenderCoords(b,c))return n.error("could not project point for elevation alignment"),
-(1/0)}else if(!this.renderCoordsHelper.toRenderCoords(b,this.spatialReference,c))return n.error("could not project point for elevation alignment"),-(1/0);var a=this.layerView.elevationOffset;b=this.zmin+a;a=this.zmax+a;return h.vec3d.set(c,l),h.vec3d.set(c,m),this.renderCoordsHelper.setAltitude(a,l),this.renderCoordsHelper.setAltitude(b,m),this.selector.init(this.intersectLayers,l,m,null,null,1,!1),this.selector.getMinResult().getIntersectionPoint(c)?this.renderCoordsHelper.getAltitude(c):-(1/0)},
a.prototype.layerChanged=function(){this.spatialReference&&(f.extent=this.computeLayerExtent(this.intersectLayers[0]),f.spatialReference=this.spatialReference,this.emit("elevation-change",f))},a.prototype.objectChanged=function(b){this.spatialReference&&(f.extent=this.computeObjectExtent(b),f.spatialReference=this.spatialReference,this.emit("elevation-change",f))},a.prototype.computeObjectExtent=function(b){return g.set(e,g.NEGATIVE_INFINITY),this.expandExtent(b,e),e},a.prototype.computeLayerExtent=
function(b){g.set(e,g.NEGATIVE_INFINITY);var a=0;for(b=b.getObjects();a<b.length;a++)this.expandExtent(b[a],e);return e},a.prototype.expandExtent=function(a,e){for(var b=a.getBBMin(!0),f=a.getBBMax(!0),d=0;8>d;++d)c[0]=1&d?b[0]:f[0],c[1]=2&d?b[1]:f[1],c[2]=4&d?b[2]:f[2],h.mat4d.multiplyVec3(a.objectTransformation,c),this.renderCoordsHelper.fromRenderCoords(c,c,this.spatialReference),g.expand(e,c);return e},k([d.property({constructOnly:!0})],a.prototype,"layerView",void 0),k([d.property({constructOnly:!0})],
a.prototype,"stageLayer",void 0),k([d.property({readOnly:!0,aliasOf:"layerView.view.elevationProvider.spatialReference"})],a.prototype,"spatialReference",void 0),a=k([d.subclass("esri.views.3d.layers.i3s.I3SElevationProvider")],a)}(d.declared(r,w.Evented))});