//>>built
define("require exports ../../core/tsSupport/declareExtendsHelper ../../core/tsSupport/decorateHelper ../../core/accessorSupport/decorators dojo/_base/lang ./FileLink ../../request ../../core/Accessor ../../core/Collection ../../core/Error ../../core/HandleRegistry ../../core/promiseUtils ../../core/watchUtils ../../geometry/Extent ../../Viewpoint ../../views/2d/viewpointUtils ../../tasks/PrintTask ../../tasks/support/PrintParameters".split(" "),function(B,C,p,d,c,q,k,r,t,u,g,v,h,w,x,y,z,l,A){var m=
u.ofType(k);return function(n){function b(a){a=n.call(this,a)||this;return a._handles=new v,a._viewpoint=null,a.view=null,a.printServiceUrl=null,a.updateDelay=1E3,a.exportedLinks=new m,a.templatesInfo=null,a.scaleEnabled=!1,a.error=null,a.print=a.print.bind(a),a}return p(b,n),b.prototype.initialize=function(){var a=this;this._handles.add(w.init(this,"printServiceUrl",function(b){b&&a._getPrintTemplatesFromService().then(function(b){return a._set("templatesInfo",b)})}))},b.prototype.destroy=function(){this._handles.destroy();
this.view=this._handles=null},Object.defineProperty(b.prototype,"_printTask",{get:function(){return new l(this.printServiceUrl,{updateDelay:this.updateDelay})},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"state",{get:function(){return this.get("view.ready")&&!this.error?"ready":"disabled"},enumerable:!0,configurable:!0}),b.prototype.print=function(a){var b;if(!this.view)return h.reject(new g("export-error","view is not set"));this.scaleEnabled?(this._viewpoint||(this._viewpoint=
this.view.viewpoint.clone()),b=this._getExtent(this._viewpoint,a.outScale)):(this._viewpoint=null,b=this._getExtent(this.view.viewpoint));a=new A({view:this.view,template:a});var c=this.exportedLinks,d=c.getItemAt(c.length-1);return this._printTask.execute(q.mixin(a,{extent:b})).then(function(a){var b=new k({formattedName:d.formattedName,url:a&&a.url,state:"ready"}),e=c.indexOf(d);return c.splice(e,1,b),a}).otherwise(function(a){var b=new k({formattedName:d.formattedName,url:d.url,state:"error"}),
e=c.indexOf(d);return c.splice(e,1,b),h.reject(new g("export-error",a.message))})},b.prototype._getPrintTemplatesFromService=function(){var a=this;return-1===this.printServiceUrl.toLowerCase().split("/").indexOf("gpserver")?(this.error=new g("url-error","Can't fetch print templates information from provided URL"),h.reject(this.error)):r(this.printServiceUrl,{callbackParamName:"callback",query:{f:"json"},timeout:6E4}).then(function(b){b=b&&b.data;a._printTask.mode=-1<b.executionType.toLowerCase().indexOf("async")?
"async":"sync";var c=null,d=null;(b&&b.parameters).forEach(function(a){var b,e=a.choiceList&&a.choiceList.slice();if(e&&e.length&&a.defaultValue&&(b=e.indexOf(a.defaultValue)),-1<b&&(e.splice(b,1),e.unshift(a.defaultValue)),"Format"===a.name)c={defaultValue:a.defaultValue,choiceList:e};else if("Layout_Template"===a.name){var e=e.filter(function(a){return"map_only"!==a.toLowerCase()}),f;b=void 0;e.some(function(a,b){a=a.toLowerCase();return-1<a.indexOf("letter")&&-1<a.indexOf("landscape")?(f=b,!0):
-1<a.indexOf("a4")&&-1<a.indexOf("landscape")?(f=b,!1):!1});f&&(b=e[f],e.splice(f,1),e.unshift(b));d={defaultValue:e&&e[0]||a.defaultValue,choiceList:e}}});a.error=null;return{format:c,layout:d}}).otherwise(function(b){return a.error=new g("fetching-print-templates-info-error","Can't fetch templates info from service"),h.reject(a.error)})},b.prototype._getExtent=function(a,b){b=b||this.view.scale;var c=this.get("view.size");a=a?a.targetGeometry:null;return z.getExtent(new x,new y({scale:b,targetGeometry:a}),
c)},d([c.property()],b.prototype,"view",void 0),d([c.property()],b.prototype,"printServiceUrl",void 0),d([c.property({dependsOn:["printServiceUrl"],type:l})],b.prototype,"_printTask",null),d([c.property({dependsOn:["view.ready","error"],readOnly:!0})],b.prototype,"state",null),d([c.property()],b.prototype,"updateDelay",void 0),d([c.property({type:m})],b.prototype,"exportedLinks",void 0),d([c.property({readOnly:!0})],b.prototype,"templatesInfo",void 0),d([c.property()],b.prototype,"scaleEnabled",void 0),
d([c.property()],b.prototype,"error",void 0),b=d([c.subclass("esri.widgets.Print.PrintViewModel")],b)}(c.declared(t))});