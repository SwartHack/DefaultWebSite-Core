//>>built
define("require exports ./libs/gl-matrix/common ./libs/gl-matrix/mat2d ./libs/gl-matrix/vec2 ../../Viewpoint ../../core/promiseUtils ../../core/Error ../../geometry/SpatialReference ../../geometry/Geometry ../../geometry/Point ../../geometry/Extent ../../geometry/support/webMercatorUtils ../../geometry/support/scaleUtils ../../geometry/support/spatialReferenceUtils ../../geometry/support/webMercatorUtils".split(" "),function(T,g,p,h,e,A,B,M,N,O,x,C,q,D,P,Q){function E(a,b,c,d){d&&c&&!d.equals(c)&&
q.canProject(d,c)&&d.isWebMercator?d.isWebMercator?(c=b[1],a=(89.99999<c?c=89.99999:-89.99999>c&&(c=-89.99999),c=Math.sin(p.toRadian(c)),e.set(a,p.toRadian(b[0])*v,.5*v*Math.log((1+c)/(1-c))))):(c=p.toDegree(b[0]/v),a=e.set(a,c-360*Math.floor((c+180)/360),p.toDegree(.5*Math.PI-2*Math.atan(Math.exp(-1*b[1]/v))))):a=e.copy(a,b);return a}function w(a){return a.wkid?a:a.spatialReference||N.WGS84}function r(a,b){return b.type?e.set(a,b.x,b.y):e.copy(a,b)}function t(a,b){return Math.max(a.width/b[0],a.height/
b[1])*F(a.spatialReference)}function u(a,b,c){var d;if(!a)return null;if(Array.isArray(a)&&2===a.length&&"number"==typeof a[0]&&"number"==typeof a[1])return new x(a);if(a.reduce)return a.reduce(function(a,c){return u(c,b,a)},c);if(a instanceof O?d=a:a.geometry&&(d=a.geometry),!d)return null;var f;if(f="point"===d.type?new C({xmin:d.x,ymin:d.y,xmax:d.x,ymax:d.y,spatialReference:d.spatialReference}):d.extent,!f)return null;a=q.canProject(f,b);if(!f.spatialReference.equals(b)&&a)f=q.project(f,b);else if(!a)return null;
return c=c?c.union(f):f.clone()}function G(a,b){if(!a)return new A({targetGeometry:new x,scale:0,rotation:0});var c=b.spatialReference,d=b.size,f=b.viewpoint,g=b.constraints,l=null;"esri.Viewpoint"===a.declaredClass?l=a:a.viewpoint?l=a.viewpoint:a.target&&"esri.Viewpoint"===a.target.declaredClass&&(l=a.target);var k=null;l&&l.targetGeometry?k=l.targetGeometry:a instanceof C?k=a:(a||a&&(a.hasOwnProperty("center")||a.hasOwnProperty("extent")||a.hasOwnProperty("target")))&&(k=u(a.center,c)||u(a.extent,
c)||u(a.target,c)||u(a,c));!k&&f&&f.targetGeometry?k=f.targetGeometry:!k&&b.extent&&(k=b.extent);var h=w(k);if(c||(c=w(b.spatialReference||b.extent||k)),!Q.canProject(k,c)&&h&&!h.equals(c))return null;var m=r(e.create(),k.center?k.center:k),h=new x(E(m,m,h,c),c),m=null,m=l&&l.targetGeometry&&"point"===l.targetGeometry.type?l.scale:a.hasOwnProperty("scale")&&a.scale?a.scale:a.hasOwnProperty("zoom")&&-1!==a.zoom&&g&&g.effectiveLODs?g.zoomToScale(a.zoom):Array.isArray(k)||"point"===k.type||"extent"===
k.type&&0===k.width&&0===k.height?b.extent&&q.canProject(b.extent,c)?t(q.project(b.extent,c),d):b.extent?t(b.extent,d):f.scale:q.canProject(k.extent,c)?t(q.project(k.extent,c),d):t(k.extent,d);b=0;l?b=l.rotation:a.hasOwnProperty("rotation")?b=a.rotation:f&&(b=f.rotation);a=new A({targetGeometry:h,scale:m,rotation:b});return g&&(a=g.fit(a),g.rotationEnabled||(a.rotation=0)),a}function m(a,b){var c=a.targetGeometry,d=b.targetGeometry;return c.x=d.x,c.y=d.y,c.spatialReference=d.spatialReference,a.scale=
b.scale,a.rotation=b.rotation,a}function H(a,b,c){return c?e.set(a,.5*(b[0]-c.right+c.left),.5*(b[1]-c.bottom+c.top)):e.scale(a,b,.5)}function R(a,b,c,d){return g.getTransform(a,b,c,d),h.invert(a,a)}function z(a,b,c){var d=p.toRadian(b.rotation)||0;b=Math.abs(Math.cos(d));d=Math.abs(Math.sin(d));return e.set(a,Math.round(c[1]*d+c[0]*b),Math.round(c[1]*b+c[0]*d))}function n(a){return a.scale*(1/(D.getMetersPerUnitForSR(a.targetGeometry.spatialReference)*I*96))}function F(a){return D.getMetersPerUnitForSR(a)*
I*96}function J(a){return a.isWrappable?(a=P.getInfo(a),a.valid[1]-a.valid[0]):0}function K(a,b){return Math.round(J(a)/b)}Object.defineProperty(g,"__esModule",{value:!0});var I=39.37,v=6378137,S=180/Math.PI;g.extentToScale=t;g.create=G;g.copy=m;g.getAnchor=H;g.getExtent=function(){var a=e.create();return function(b,c,d){var f=c.targetGeometry;r(a,f);c=.5*n(c);return b.xmin=a[0]-c*d[0],b.ymin=a[1]-c*d[1],b.xmax=a[0]+c*d[0],b.ymax=a[1]+c*d[1],b.spatialReference=f.spatialReference,b}}();g.setExtent=
function(a,b,c,d,f){return g.centerAt(a,b,c.center),a.scale=t(c,d),f&&f.constraints&&f.constraints.constrain(a),a};g.getOuterExtent=function(){var a=e.create(),b=e.create();return function(c,d,f){r(a,d.targetGeometry);z(b,d,f);f=.5*n(d);return c.set({xmin:a[0]-f*b[0],ymin:a[1]-f*b[1],xmax:a[0]+f*b[0],ymax:a[1]+f*b[1],spatialReference:d.targetGeometry.spatialReference}),c}}();g.getClippedExtent=function(){var a=e.create(),b=e.create();return function(c,d,f){var e=n(d),g=d.targetGeometry.spatialReference,
k=K(g,e);r(a,d.targetGeometry);z(b,d,f);g.isWrappable&&b[0]>k&&(b[0]=k);d=.5*e;return c.set({xmin:a[0]-d*b[0],ymin:a[1]-d*b[1],xmax:a[0]+d*b[0],ymax:a[1]+d*b[1],spatialReference:g}),c}}();g.getOuterSize=z;g.getPaddingScreenTranslation=function(){var a=e.create();return function(b,c,d){return e.sub(b,e.scale(b,c,.5),H(a,c,d))}}();var L=function(){var a=h.create(),b=e.create();return function(c,d,f,y){var l=n(d);d=p.toRadian(d.rotation)||0;return e.set(b,l,l),h.fromScaling(a,b),h.rotate(a,a,d),h.translate(a,
a,g.getPaddingScreenTranslation(b,f,y)),h.translate(a,a,[0,y.top-y.bottom]),e.set(c,a[4],a[5])}}();g.getResolution=n;g.getResolutionToScaleFactor=F;g.getMatrix=function(){var a=e.create(),b=e.create(),c=e.create();return function(d,f,g,l,k,m){return e.negate(a,f),e.scale(b,g,.5*m),e.set(c,1/l*m,-1/l*m),h.identity(d),h.translate(d,d,b),k&&h.rotate(d,d,k),h.scale(d,d,c),h.translate(d,d,a),d}}();g.getTransform=function(){var a=e.create();return function(b,c,d,f){var e=n(c),l=p.toRadian(c.rotation)||
0;return r(a,c.targetGeometry),g.getMatrix(b,a,d,e,l,f)}}();g.getTransformNoRotation=function(){var a=e.create();return function(b,c,d,e){var f=n(c);return r(a,c.targetGeometry),g.getMatrix(b,a,d,f,0,e)}}();g.getWorldWidth=J;g.getWorldScreenWidth=K;g.createAsync=function(a,b){if(a=G(a,b))return B.resolve(a);a=new M("viewpointUtils-createAsync:different-spatialReference","Target spatialReference cannot be projected and is different from out spatialReference");return B.reject(a)};g.angleBetween=function(){var a=
e.create(),b=e.create(),c=e.create();return function(d,f,g){e.subtract(a,d,f);e.normalize(a,a);e.subtract(b,d,g);e.normalize(b,b);e.cross(c,a,b);d=Math.acos(e.dot(a,b)/(e.length(a)*e.length(b)))*S;return 0>c[2]&&(d=-d),isNaN(d)&&(d=0),d}}();g.addPadding=function(){var a=e.create();return function(b,c,d,e){var f=b.targetGeometry;return m(b,c),L(a,c,d,e),f.x+=a[0],f.y+=a[1],b}}();g.removePadding=function(){var a=e.create();return function(b,c,d,e){var f=b.targetGeometry;return m(b,c),L(a,c,d,e),f.x-=
a[0],f.y-=a[1],b}}();g.centerAt=function(){var a=e.create();return function(b,c,d){m(b,c);c=b.targetGeometry;var e=w(d),g=w(c);return r(a,d),E(a,a,e,g),c.x=a[0],c.y=a[1],b}}();g.pixelSizeAt=function(a,b,c){return n(b)};g.resize=function(){var a=e.create();return function(b,c,d,f,h){h||(h="center");e.sub(a,d,f);e.scale(a,a,.5);d=a[0];f=a[1];switch(h){case "center":e.set(a,0,0);break;case "left":e.set(a,-d,0);break;case "top":e.set(a,0,f);break;case "right":e.set(a,d,0);break;case "bottom":e.set(a,
0,-f);break;case "top-left":e.set(a,-d,f);break;case "bottom-left":e.set(a,-d,-f);break;case "top-right":e.set(a,d,f);break;case "bottom-right":e.set(a,d,-f)}return g.translateBy(b,c,a),b}}();g.rotateBy=function(a,b,c){return m(a,b),a.rotation+=c,a};g.rotateTo=function(a,b,c){return m(a,b),a.rotation=c,a};g.scaleBy=function(){var a=e.create();return function(b,c,d,f,h){return m(b,c),0!==d&&(g.toMap(a,f,c,h),b.scale=c.scale*d,g.toScreen(a,a,b,h),g.translateBy(b,b,e.set(a,a[0]-f[0],f[1]-a[1]))),b}}();
g.scaleTo=function(a,b,c){return m(a,b),a.scale=c,a};g.scaleAndRotateBy=function(){var a=e.create();return function(b,c,d,f,h,l){return m(b,c),0!==d&&(g.toMap(a,h,c,l),b.scale=c.scale*d,b.rotation+=f,g.toScreen(a,a,b,l),g.translateBy(b,b,e.set(a,a[0]-h[0],h[1]-a[1]))),b}}();g.padAndScaleAndRotateBy=function(){var a=e.create(),b=e.create();return function(c,d,f,h,l,k,m){return g.getPaddingScreenTranslation(b,k,m),e.add(a,l,b),h?g.scaleAndRotateBy(c,d,f,h,a,k):g.scaleBy(c,d,f,a,k)}}();g.toMap=function(){var a=
h.create();return function(b,c,d,f){return e.transformMat2d(b,c,R(a,d,f,1))}}();g.toScreen=function(){var a=h.create();return function(b,c,d,f){return e.transformMat2d(b,c,g.getTransform(a,d,f,1))}}();g.translateBy=function(){var a=e.create(),b=h.create();return function(c,d,f){m(c,d);var g=n(d),l=c.targetGeometry;return h.fromRotation(b,p.toRadian(d.rotation)||0),h.scale(b,b,e.fromValues(g,g)),e.transformMat2d(a,f,b),l.x+=a[0],l.y+=a[1],c}}()});