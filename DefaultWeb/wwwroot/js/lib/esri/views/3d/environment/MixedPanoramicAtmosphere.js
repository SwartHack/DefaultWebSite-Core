//>>built
define(["../support/ExternalRenderer","./RealisticAtmosphere","./PanoramicAtmosphere","../webgl-engine/lib/RenderSlot"],function(b,c,d,e){return b.createSubclass({declaredClass:"esri.views.3d.environment.MixedPanoramicAtmosphere",properties:{view:{},needsRender:{dependsOn:["_panoramicAtmosphere.needsRender","_realisticAtmosphere.needsRender"],get:function(){return this._panoramicAtmosphere.needsRender||this._realisticAtmosphere.needsRender}},slot:{value:e.BACKGROUND,set:function(a){this._panoramicAtmosphere&&
(this._panoramicAtmosphere.slot=a);this._set("slot",a)}}},initialize:function(){this._panoramicAtmosphere=new d({view:this.view,slot:this.slot});this._realisticAtmosphere=new c({view:this.view,planar:!0});this.addResolvingPromise(this._panoramicAtmosphere);this.addResolvingPromise(this._realisticAtmosphere)},destroy:function(){this._panoramicAtmosphere&&(this._panoramicAtmosphere.destroy(),this._panoramicAtmosphere=null);this._realisticAtmosphere&&(this._realisticAtmosphere.destroy(),this._realisticAtmosphere=
null)},initializeRenderContext:function(a){this._panoramicAtmosphere.initializeRenderContext(a);this._realisticAtmosphere.initializeRenderContext(a)},render:function(a){return this._panoramicAtmosphere.render(a),this._realisticAtmosphere.render(a),this._panoramicAtmosphere.didRender||this._realisticAtmosphere.didRender},resetNeedsRender:function(){this._panoramicAtmosphere.resetNeedsRender?this._panoramicAtmosphere.resetNeedsRender():this._panoramicAtmosphere.didRender&&(this._panoramicAtmosphere.needsRender=
!1,this._panoramicAtmosphere.didRender=!1);this._realisticAtmosphere.resetNeedsRender?this._realisticAtmosphere.resetNeedsRender():this._realisticAtmosphere.didRender&&(this._realisticAtmosphere.needsRender=!1,this._realisticAtmosphere.didRender=!1)},_setEnableTestImage:function(a){this._realisticAtmosphere._setEnableTestImage(a)}})});