//>>built
define("require exports ../../../core/tsSupport/extendsHelper ../../../geometry/SpatialReference ../../../geometry/Point ../../../geometry/support/scaleUtils ../lib/glMatrix ./earthUtils ./projectionUtils ../webgl-engine/lib/BufferVectorMath ../webgl-engine/lib/Util".split(" "),function(h,l,n,v,p,w,d,k,e,g,q){Object.defineProperty(l,"__esModule",{value:!0});l.createRenderCoordsHelper=function(d,b){return"global"===d?new x(b):new y(b)};h=function(){function d(b,a){this.spatialReference=b;this.unitInMeters=
a}return d.prototype.toRenderCoords=function(b,a,c){return b instanceof p?e.pointToVector(b,a,this.spatialReference):e.vectorToVector(b,a,c,this.spatialReference)},d.prototype.fromRenderCoords=function(b,a,c){return a instanceof p?e.vectorToPoint(b,this.spatialReference,a,c):a instanceof v?e.vectorToPoint(b,this.spatialReference,a):e.vectorToVector(b,this.spatialReference,a,c)},d}();l.RenderCoordsHelper=h;var x=function(r){function b(a){return r.call(this,a||e.SphericalECEFSpatialReference,1)||this}
return n(b,r),b.prototype.getAltitude=function(a,c){void 0===c&&(c=0);return g.Vec3Compact.length(a,c)-k.earthRadius},b.prototype.setAltitude=function(a,c){a=(a+k.earthRadius)/g.Vec3Compact.length(c,0);g.Vec3Compact.scale(c,0,a)},b.prototype.setAltitudeOfTransformation=function(a,c){a=(a+k.earthRadius)/g.Vec3Compact.length(c,12);g.Vec3Compact.scale(c,12,a)},b.prototype.worldUpAtPosition=function(a,c){return d.vec3d.normalize(a||[0,0,0],c)},b.prototype.intersectManifold=function(a,c,b,m){return void 0===
m&&(m=d.vec3d.create()),q.raySphere(a,c,null,k.earthRadius+b,f)?0>d.vec3d.dot(d.vec3d.direction(f,a,t),c)?!1:(d.vec3d.set(f,m),!0):!1},b}(h),y=function(e){function b(a){a=e.call(this,a,w.getMetersPerUnitForSR(a))||this;return a.worldUp=[0,0,1],a}return n(b,e),b.prototype.getAltitude=function(a,c){return c?a[c+2]:a[2]},b.prototype.setAltitude=function(a,c){c[2]=a},b.prototype.setAltitudeOfTransformation=function(a,c){c[14]=a},b.prototype.worldUpAtPosition=function(a,c){return d.vec3d.set(this.worldUp,
c)},b.prototype.intersectManifold=function(a,c,b,e){return void 0===e&&(e=d.vec3d.create()),d.vec4d.set4(this.worldUp[0],this.worldUp[1],this.worldUp[2],-b,u),q.rayPlane(a,c,u,f)?0>d.vec3d.dot(d.vec3d.direction(f,a,t),c)?!1:(d.vec3d.set(f,e),!0):!1},b}(h),u=d.vec4d.create(),f=d.vec3d.create(),t=d.vec3d.create()});