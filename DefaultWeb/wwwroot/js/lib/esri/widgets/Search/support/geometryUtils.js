//>>built
define("require exports ../../../core/Error ../../../core/promiseUtils ../../../geometry ../../../geometry/support/scaleUtils ../../../views/MapView".split(" "),function(m,d,g,e,c,k,l){function h(a,b,f){return b&&b.map?(f?k.getExtentForScale(b,f):b.extent).clone().centerAt(a):new c.Extent({xmin:a.x-.25,ymin:a.y-.25,xmax:a.x+.25,ymax:a.y+.25,spatialReference:a.spatialReference})}Object.defineProperty(d,"__esModule",{value:!0});d.getPointWithElevation=function(a,b){return b?a?a.hasZ||b instanceof l?
e.resolve(a):(b=b.get("map.ground"))&&b.layers.length?b.queryElevation(a).then(function(a){return a.geometry}):e.resolve(a):e.reject(new g("searchgeometryutils:missing-parameter","point is missing.")):e.reject(new g("searchgeometryutils:missing-parameter","view is missing."))};d.getPointFromGeometry=function(a){return a instanceof c.Point?a:a instanceof c.Extent?a.center:a instanceof c.Polygon?a.centroid:a instanceof c.Multipoint?a.getPoint(0):a instanceof c.Polyline?a.getPoint(0,0):void 0};d.createExtentFromGeometry=
function(a,b,f){return a?a instanceof c.Extent?a:a instanceof c.Multipoint||a instanceof c.Polygon||a instanceof c.Polyline?a.extent:a instanceof c.Point?h(a,b,f):void 0:void 0};d.scaleExtent=function(a,b,c){return a&&b?h(a.center,b,c):void 0}});