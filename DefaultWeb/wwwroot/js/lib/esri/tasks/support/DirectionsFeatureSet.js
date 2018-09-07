//>>built
define("../../geometry/Extent ../../geometry/Point ../../geometry/Polyline ../../geometry/SpatialReference ./FeatureSet ../../Graphic dojo/_base/array".split(" "),function(l,m,n,p,q,h,d){return q.createSubclass({declaredClass:"esri.tasks.support.DirectionsFeatureSet",properties:{geometryType:"esriGeometryPolyline",extent:{type:l,json:{read:{source:"summary.envelope"}}},features:{value:null,json:{read:function(a,c){a.forEach(function(b){this._decompressFeatureGeometry(b,c.summary.envelope.spatialReference)},
this);var e=p.fromJSON(c.spatialReference);return a.map(function(b){var a=h.fromJSON(b),g=b.geometry&&b.geometry.spatialReference;return a.geometry&&!g&&(a.geometry.spatialReference=e),a.strings=b.strings,a.events=(b.events||[]).map(function(a){var g=new h({geometry:new m({x:a.point.x,y:a.point.y,z:a.point.z,hasZ:void 0!==a.point.z,spatialReference:b.geometry&&b.geometry.spatialReference}),attributes:{ETA:a.ETA,arriveTimeUTC:a.arriveTimeUTC}});return g.strings=a.strings,g}),a})}}},mergedGeometry:{value:null,
readOnly:!0,dependsOn:["features","extent.spatialReference"],get:function(){if(!this.features)return null;var a=d.map(this.features,function(a){return a.geometry}),c=this.get("extent.spatialReference");return this._mergePolylinesToSinglePath(a,c)}},routeId:null,routeName:null,strings:{value:null,readOnly:!0,dependsOn:["features"],get:function(){return d.map(this.features,function(a){return a.strings})}},totalDriveTime:{value:null,json:{read:{source:"summary.totalDriveTime"}}},totalLength:{value:null,
json:{read:{source:"summary.totalLength"}}},totalTime:{value:null,json:{read:{source:"summary.totalTime"}}}},_decompressFeatureGeometry:function(a,c){a.geometry=this._decompressGeometry(a.compressedGeometry,c)},_decompressGeometry:function(a,c){var e,b,f,g=0,d=0,h=[];(b=a.match(/((\+|\-)[^\+\-]+)/g))||(b=[]);f=parseInt(b[0],32);for(var k=1;k<b.length;k+=2)g=a=parseInt(b[k],32)+g,d=e=parseInt(b[k+1],32)+d,h.push([a/f,e/f]);return{paths:[h],spatialReference:c}},_mergePolylinesToSinglePath:function(a,
c){var e=[];d.forEach(a,function(a){d.forEach(a.paths,function(a){e=e.concat(a)})});var b=[],f=[0,0];return d.forEach(e,function(a){(a[0]!==f[0]||a[1]!==f[1])&&(b.push(a),f=a)}),new n({paths:[b]},c)}})});