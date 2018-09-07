//>>built
define("require exports ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ../core/tsSupport/paramHelper ../core/accessorSupport/decorators dojo/_base/lang ../request ./Task ./support/FeatureSet ./support/Query ../geometry ../geometry/support/jsonUtils ../geometry/support/normalizeUtils".split(" "),function(x,y,t,h,k,g,f,l,u,q,m,v,w,n){return function(r){function d(a){a=r.call(this,a)||this;return a.gdbVersion=null,a.source=null,a}return t(d,r),p=d,d.queryToQueryStringParameters=
function(a){var e=a.geometry;a=a.toJSON();if(e&&(a.geometry=JSON.stringify(e),a.geometryType=w.getJsonType(e),a.inSR=e.spatialReference.wkid||JSON.stringify(e.spatialReference)),a.groupByFieldsForStatistics&&(a.groupByFieldsForStatistics=a.groupByFieldsForStatistics.join(",")),a.objectIds&&(a.objectIds=a.objectIds.join(",")),a.orderByFields&&(a.orderByFields=a.orderByFields.join(",")),a.outFields&&(a.outFields=a.outFields.join(",")),a.outSR?a.outSR=a.outSR.wkid||JSON.stringify(a.outSR):e&&(a.returnGeometry||
a.returnCentroid)&&(a.outSR=a.inSR),a.returnGeometry&&delete a.returnGeometry,a.outStatistics&&(a.outStatistics=JSON.stringify(a.outStatistics)),a.pixelSize&&(a.pixelSize=JSON.stringify(a.pixelSize)),a.quantizationParameters&&(a.quantizationParameters=JSON.stringify(a.quantizationParameters)),a.timeExtent)e=a.timeExtent,a.time=[null!=e.startTime?e.startTime:"null",null!=e.endTime?e.endTime:"null"],delete a.timeExtent;return a},d.prototype.execute=function(a,e){var b=this;return this.rawExecute(a,
e).then(function(a){return b._handleExecuteResponse(a)})},d.prototype.rawExecute=function(a,e){var b=this;return n.normalizeCentralMeridian(a.geometry?[a.geometry]:[]).then(function(c){c=b._encode(f.mixin({},b.parsedUrl.query,{f:"json"},b._normalizeQuery(a,c&&c[0])));if(b.source){var d={source:b.source.toJSON()};c.layer=JSON.stringify(d)}b.gdbVersion&&(c.gdbVersion=b.gdbVersion);c={query:c,callbackParamName:"callback"};return(b.requestOptions||e)&&(c=f.mixin({},b.requestOptions,e,c)),l(b.parsedUrl.path+
"/query",c)})},d.prototype.executeRelationshipQuery=function(a,e){a=this._encode(f.mixin({},this.parsedUrl.query,{f:"json"},a.toJSON()));this.gdbVersion&&(a.gdbVersion=this.gdbVersion);a={query:a,callbackParamName:"callback"};return(this.requestOptions||e)&&(a=f.mixin({},this.requestOptions,e,a)),l(this.parsedUrl.path+"/queryRelatedRecords",a).then(this._handleExecuteRelationshipQueryResponse)},d.prototype.executeForIds=function(a,e){var b=this;return n.normalizeCentralMeridian(a.geometry?[a.geometry]:
[]).then(function(c){c=b._encode(f.mixin({},b.parsedUrl.query,{f:"json",returnIdsOnly:!0},b._normalizeQuery(a,c&&c[0])));if(b.source){var d={source:b.source.toJSON()};c.layer=JSON.stringify(d)}b.gdbVersion&&(c.gdbVersion=b.gdbVersion);c={query:c,callbackParamName:"callback"};return(b.requestOptions||e)&&(c=f.mixin({},b.requestOptions,e,c)),l(b.parsedUrl.path+"/query",c)}).then(this._handleExecuteForIdsResponse)},d.prototype.executeForCount=function(a,e){var b=this;return n.normalizeCentralMeridian(a.geometry?
[a.geometry]:[]).then(function(c){c=b._encode(f.mixin({},b.parsedUrl.query,{f:"json",returnIdsOnly:!0,returnCountOnly:!0},b._normalizeQuery(a,c&&c[0])));if(b.source){var d={source:b.source.toJSON()};c.layer=JSON.stringify(d)}b.gdbVersion&&(c.gdbVersion=b.gdbVersion);c={query:c,callbackParamName:"callback"};return(b.requestOptions||e)&&(c=f.mixin({},b.requestOptions,e,c)),l(b.parsedUrl.path+"/query",c)}).then(this._handleExecuteForCountResponse)},d.prototype.executeForExtent=function(a,e){var b=this;
return n.normalizeCentralMeridian(a.geometry?[a.geometry]:[]).then(function(c){c=b._encode(f.mixin({},b.parsedUrl.query,{f:"json",returnExtentOnly:!0,returnCountOnly:!0},b._normalizeQuery(a,c&&c[0])));if(b.source){var d={source:b.source.toJSON()};c.layer=JSON.stringify(d)}b.gdbVersion&&(c.gdbVersion=b.gdbVersion);c={query:c,callbackParamName:"callback"};return(b.requestOptions||e)&&(c=f.mixin({},b.requestOptions,e,c)),l(b.parsedUrl.path+"/query",c)}).then(this._handleExecuteForExtentResponse)},d.prototype._handleExecuteResponse=
function(a){return q.fromJSON(a.data)},d.prototype._handleExecuteRelationshipQueryResponse=function(a){a=a.data;var e=a.geometryType,b=a.spatialReference,c={};return a.relatedRecordGroups.forEach(function(a){var d=q.fromJSON({geometryType:e,spatialReference:b,features:a.relatedRecords});if(null!=a.objectId)c[a.objectId]=d;else for(var f in a)a.hasOwnProperty(f)&&"relatedRecords"!==f&&(c[a[f]]=d)}),c},d.prototype._handleExecuteForIdsResponse=function(a){return a.data.objectIds},d.prototype._handleExecuteForCountResponse=
function(a){a=a.data;var d=a.features,b=a.objectIds;if(b)a=b.length;else{if(d)throw Error("Unable to perform query. Please check your parameters.");a=a.count}return a},d.prototype._handleExecuteForExtentResponse=function(a){a=a.data;if(a.hasOwnProperty("extent"))a.extent=v.Extent.fromJSON(a.extent);else{if(a.features)throw Error("Layer does not support extent calculation.");if(a.hasOwnProperty("count"))throw Error("Layer does not support extent calculation.");}return a},d.prototype._normalizeQuery=
function(a,d){return d&&(a=a.clone(),a.geometry=d),p.queryToQueryStringParameters(a)},h([g.property()],d.prototype,"gdbVersion",void 0),h([g.property()],d.prototype,"source",void 0),h([k(0,g.cast(m))],d.prototype,"execute",null),h([k(0,g.cast(m))],d.prototype,"rawExecute",null),h([k(0,g.cast(m))],d.prototype,"executeForIds",null),h([k(0,g.cast(m))],d.prototype,"executeForCount",null),h([k(0,g.cast(m))],d.prototype,"executeForExtent",null),d=p=h([g.subclass("esri.tasks.QueryTask")],d);var p}(g.declared(u))});