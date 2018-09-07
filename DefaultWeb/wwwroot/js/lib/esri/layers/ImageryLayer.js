//>>built
define("dojo/_base/lang ./Layer ./mixins/ArcGISImageService ./mixins/OperationalLayer ./mixins/PortalLayer ./mixins/ScaleRangeLayer ./mixins/RefreshableLayer".split(" "),function(d,e,f,g,h,k,l){var c={canvas2D:"2d",webGL:"webgl",expWebGL:"experimental-webgl",webGL2:"webgl2",expWebGL2:"experimental-webgl2"};return e.createSubclass([f,g,h,k,l],{declaredClass:"esri.layers.ImageryLayer",viewModulePaths:{"2d":"../views/2d/layers/ImageryLayerView2D","3d":"../views/3d/layers/ImageryLayerView3D"},normalizeCtorArgs:function(a,
b){return"string"==typeof a?d.mixin({},{url:a},b):a},load:function(){this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Image Service"]}).always(this._fetchService.bind(this)))},properties:{drawMode:!0,drawType:{value:c.canvas2D,cast:function(a){return a in c?a:c.canvas2D}},legendEnabled:{json:{read:{source:["showLegend"],reader:function(a,b){return null!=b.showLegend?b.showLegend:!0}},write:function(a,b){b.showLegend=!!a}}},operationalLayerType:"ArcGISImageServiceLayer",popupEnabled:{json:{read:{source:["disablePopup"],
reader:function(a,b){return null!=b.disablePopup?!b.disablePopup:!0}},write:function(a,b){a||(b.disablePopup=!0)}}},pixelFilter:null,type:{value:"imagery",json:{read:!1}}},redraw:function(){this.emit("redraw")}})});