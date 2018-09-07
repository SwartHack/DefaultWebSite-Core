//>>built
define("require exports dojo/promise/all dojo/_base/lang ../../core/promiseUtils ../../core/Error ../../geometry/Point ../../geometry/Multipoint ../../geometry/Polyline ../../geometry/support/webMercatorUtils ../../geometry/support/scaleUtils ./ElevationTile".split(" "),function(r,p,t,u,g,m,v,w,z,q,x,y){Object.defineProperty(p,"__esModule",{value:!0});r=function(){function f(){}return f.prototype.queryAll=function(a,b,c){var e=this;if(a=c&&c.ignoreInvisibleLayers?a.filter(function(a){return a.visible}):
a.slice(),!a.length)return g.reject(new m("elevation-query:invalid-layer","Elevation queries require at least one elevation layer to fetch tiles from"));b=n.fromGeometry(b);var d=!1;return c&&c.returnSampleInfo||(d=!0),c=u.mixin({},c,{returnSampleInfo:!0,demResolution:"auto"}),this.query(a[a.length-1],b,c).then(function(b){return e._queryAllNext(a,b,c)}).then(function(a){return a.geometry=a.geometry["export"](),d&&delete a.sampleInfo,a})},f.prototype._queryAllNext=function(a,b,c){var e=this,d=a.pop();
if(b.geometry.coordinates.forEach(function(a,c){0<=b.sampleInfo[c].demResolution&&!b.sampleInfo[c].source&&(b.sampleInfo[c].source=d)}),!a.length)return g.resolve(b);for(var h=b.geometry.coordinates,f=[],l=[],k=0;k<h.length;k++)0>b.sampleInfo[k].demResolution&&(f.push(h[k]),l.push(k));if(0===f.length)return g.resolve(b);f=b.geometry.clone(f);return this.query(a[a.length-1],f,c).then(function(d){return l.forEach(function(a,c){h[a].z=d.geometry.coordinates[c].z;b.sampleInfo[a].demResolution=d.sampleInfo[c].demResolution}),
e._queryAllNext(a,b,c)})},f.prototype.query=function(a,b,c){var e=this;if(!a)return g.reject(new m("elevation-query:invalid-layer","Elevation queries require an elevation layer to fetch tiles from"));if(!b||!(b instanceof n)&&"point"!==b.type&&"multipoint"!==b.type&&"polyline"!==b.type)return g.reject(new m("elevation-query:invalid-geometry","Only point, polyline and multipoint geometries can be used to query elevation"));c=u.mixin({noDataValue:0,demResolution:"auto",maximumAutoTileRequests:20,returnSampleInfo:!1},
c);var d={layer:a,geometry:null,options:c,outsideExtentTile:null,outSpatialReference:b.spatialReference};return g.resolve().then(function(){return a.load()}).then(function(){return e._createGeometryDescriptor(d,b)}).then(function(){return e._selectTiles(d)}).then(function(){return e._populateElevationTiles(d)}).then(function(){return e._sampleGeometryWithElevation(d)}).then(function(){return e._createQueryResult(d)})},f.prototype._createQueryResult=function(a){var b={geometry:(a.outSpatialReference.equals(a.geometry.spatialReference)?
a.geometry:a.geometry.project(a.outSpatialReference))["export"](),noDataValue:a.options.noDataValue};return a.options.returnSampleInfo&&(b.sampleInfo=this._extractSampleInfo(a)),a.geometry.coordinates.forEach(function(a){a.tile=null;a.elevationTile=null}),b},f.prototype._createGeometryDescriptor=function(a,b){var c,e=a.layer.tileInfo.spatialReference;return(c=b instanceof n?b.project(e):q.project(b,e))?(a.geometry=n.fromGeometry(c),g.resolve()):g.reject(new m("elevation-query:spatial-reference-mismatch",
"Cannot query elevation in '"+b.spatialReference.wkid+"' on an elevation service in '"+e.wkid+"'"))},f.prototype._selectTiles=function(a){var b=a.options.demResolution;return this._preselectOutsideLayerExtent(a),"number"==typeof b?this._selectTilesClosestResolution(a):"finest-contiguous"===b?this._selectTilesFinestContiguous(a):"auto"===b?this._selectTilesAuto(a):g.reject(new m("elevation-query:invalid-dem-resolution","Invalid dem resolution value '"+b+'\', expected a number, "finest-contiguous" or "auto"'))},
f.prototype._preselectOutsideLayerExtent=function(a){var b=new y.ElevationTile(null);b.sample=function(b,c){return a.options.noDataValue};a.outsideExtentTile=b;var c=a.layer.fullExtent;a.geometry.coordinates.forEach(function(a){var d=a.x,h=a.y;(d<c.xmin||d>c.xmax||h<c.ymin||h>c.ymax)&&(a.elevationTile=b)})},f.prototype._selectTilesClosestResolution=function(a){var b=a.layer.tileInfo,c=this._findNearestDemResolutionLevel(b,a.options.demResolution);return a.geometry.coordinates.forEach(function(a){a.tile=
b.tileAt(c,a.x,a.y)}),g.resolve()},f.prototype._findNearestDemResolutionLevel=function(a,b){var c=x.getMetersPerUnitForSR(a.spatialReference);b/=c;for(var c=a.lods[0],e=1;e<a.lods.length;e++){var d=a.lods[e];Math.abs(d.resolution-b)<Math.abs(c.resolution-b)&&(c=d)}return c.level},f.prototype._selectTilesFinestContiguous=function(a){return this._selectTilesFinestContiguousAt(a,a.layer.tileInfo.lods.length-1)},f.prototype._selectTilesFinestContiguousAt=function(a,b){var c=this,e=a.layer,d=a.geometry;
if(0>b)return d.coordinates.forEach(function(a){return a.tile=null}),g.resolve();var h=e.tilemapCache,f=e.tileInfo,l=f.lods[b];d.coordinates.forEach(function(a){a.tile=f.tileAt(l.level,a.x,a.y)});var k,e=this._selectTilesToFetch(d.coordinates);return k=h?t(e.map(function(a){return h.fetchAvailability(a.level,a.row,a.col)})):this._populateElevationTiles(a).then(function(){return d.coordinates.some(function(a){return!a.elevationTile})?(d.coordinates.filter(function(b){return b.elevationTile!==a.outsideExtentTile}).forEach(function(a){return a.elevationTile=
null}),g.reject()):void 0}),k.then(function(){return d}).otherwise(function(){return c._selectTilesFinestContiguousAt(a,b-1)})},f.prototype._populateElevationTiles=function(a){var b=a.options.noDataValue,c={},e=this._selectTilesToFetch(a.geometry.coordinates).map(function(d){return a.layer.fetchTile(d.level,d.row,d.col,b).then(function(a){return c[d.id]=new y.ElevationTile(d,a)})});return g.eachAlways(e).then(function(){a.geometry.coordinates.forEach(function(a){!a.elevationTile&&a.tile&&(a.elevationTile=
c[a.tile.id])})})},f.prototype._selectTilesToFetch=function(a){var b={},c=[];return a.forEach(function(a){var d=a.tile;a.elevationTile||!a.tile||b[d.id]||(b[d.id]=d,c.push(d))}),c},f.prototype._selectTilesAuto=function(a){var b=a.geometry.coordinates;this._selectTilesAutoFinest(a);this._reduceTilesForMaximumRequests(a);var c=a.layer.tilemapCache;if(c){var e={};a=this._selectTilesToFetch(b).map(function(a){var b={id:null,level:0,row:0,col:0,extent:[0,0,0,0]};return c.fetchAvailabilityUpsample(a.level,
a.row,a.col,b).then(function(){return e[a.id]=b}).otherwise(function(){})});return t(a).then(function(){return b.forEach(function(a){return a.tile=e[a.tile.id]})})}return this._selectTilesAutoPrefetchUpsample(a)},f.prototype._reduceTilesForMaximumRequests=function(a){var b=a.geometry.coordinates,c=a.layer.tileInfo,e=0,d={},h=function(a){a.id in d?d[a.id]++:(d[a.id]=1,e++)},f=function(a){var b=d[a.id];1===b?(delete d[a.id],e--):d[a.id]=b-1};b.forEach(function(a){a.tile&&!a.elevationTile&&h(a.tile)});
for(var l=!0;l;){for(var l=!1,k=0;k<b.length;k++){var g=b[k];if(!g.elevationTile||g.tile){if(e<=a.options.maximumAutoTileRequests)return;f(g.tile);c.upsampleTile(g.tile)&&(l=!0);h(g.tile)}}if(!l)break}},f.prototype._selectTilesAutoFinest=function(a){var b=a.layer.tileInfo,c=b.lods[b.lods.length-1].level;a.geometry.coordinates.forEach(function(a){return a.tile=b.tileAt(c,a.x,a.y)})},f.prototype._selectTilesAutoPrefetchUpsample=function(a){var b=this,c=a.geometry.coordinates,e=a.layer.tileInfo;return this._populateElevationTiles(a).then(function(){var d=
!1;return c.forEach(function(a){!a.elevationTile&&a.tile&&(e.upsampleTile(a.tile)?d=!0:a.tile=null)}),d?b._selectTilesAutoPrefetchUpsample(a):void 0})},f.prototype._sampleGeometryWithElevation=function(a){a.geometry.coordinates.forEach(function(b){var c=b.elevationTile,e=a.options.noDataValue;c&&(c=c.sample(b.x,b.y),void 0!==c?e=c:b.elevationTile=null);b.z=e})},f.prototype._extractSampleInfo=function(a){var b=a.layer.tileInfo,c=x.getMetersPerUnitForSR(b.spatialReference);return a.geometry.coordinates.map(function(e){var d=
-1;e.elevationTile&&e.elevationTile!==a.outsideExtentTile&&(d=b.lodAt(e.elevationTile.tile.level).resolution*c);return{demResolution:d}})},f}();p.ElevationQuery=r;var n=function(){function f(){}return f.prototype["export"]=function(){return this._exporter(this.coordinates,this.spatialReference)},f.prototype.clone=function(a){var b=this,c=new f;return c.geometry=this.geometry,c.spatialReference=this.spatialReference,c.coordinates=a||this.coordinates.map(function(a){return b._cloneCoordinate(a)}),c._exporter=
this._exporter,c},f.prototype.project=function(a){var b=this;if(this.spatialReference.equals(a))return this.clone();if(q.canProject(this.spatialReference,a)){var c=a.isWGS84?q.xyToLngLat:q.lngLatToXY,e=[0,0],d=this.coordinates.map(function(a){a=b._cloneCoordinate(a);return c(a.x,a.y,e),a.x=e[0],a.y=e[1],a}),d=this.clone(d);return d.spatialReference=a,d}return null},f.prototype._cloneCoordinate=function(a){return{x:a.x,y:a.y,z:a.z,tile:null,elevationTile:null}},f.fromGeometry=function(a){var b=new f;
if(b.geometry=a,b.spatialReference=a.spatialReference,a instanceof f)b.coordinates=a.coordinates.map(function(a){return b._cloneCoordinate(a)}),b._exporter=function(b,c){b=a.clone(b);return b.spatialReference=c,b};else switch(a.type){case "point":a.hasM?b.coordinates=[{x:a.x,y:a.y,m:a.m}]:b.coordinates=[{x:a.x,y:a.y}];b._exporter=function(b,c){return a.hasM?new v(b[0].x,b[0].y,b[0].z,b[0].m,c):new v(b[0].x,b[0].y,b[0].z,c)};break;case "multipoint":b.coordinates=a.points.map(function(b){return a.hasM?
{x:b[0],y:b[1],m:b[a.hasZ?3:2]}:{x:b[0],y:b[1]}});b._exporter=function(b,c){return a.hasM?new w({points:b.map(function(a){return[a.x,a.y,a.z,a.m]}),hasZ:!0,hasM:!0,spatiaReference:c}):new w(b.map(function(a){return[a.x,a.y,a.z]}),c)};break;case "polyline":var c=[],e=[],d=0;a.paths.forEach(function(b){e.push([d,d+b.length]);d+=b.length;c.push.apply(c,b.map(function(b){return a.hasM?{x:b[0],y:b[1],m:b[a.hasZ?3:2]}:{x:b[0],y:b[1]}}))});b.coordinates=c;b._exporter=function(b,c){var d=a.hasM?b.map(function(a){return[a.x,
a.y,a.z,a.m]}):b.map(function(a){return[a.x,a.y,a.z]});b=e.map(function(a){return d.slice(a[0],a[1])});return new z({paths:b,hasM:a.hasM,hasZ:!0,spatialReference:c})}}return b},f}();p.GeometryDescriptor=n;p["default"]=r});