//>>built
define(["require","exports","./mathUtils","../lib/glMatrix"],function(p,g,h,a){Object.defineProperty(g,"__esModule",{value:!0});var n=a.vec3d.create(),k=a.vec3d.create();g.directionToHeadingTilt=function(d,c,l,e,m){var b=n;a.vec3d.normalize(d,b);var f=a.vec3d.dot(b,e),g=0<f,f=Math.abs(f);.99<f&&(f=Math.abs(a.vec3d.dot(c,e)),.99>f?(a.vec3d.set(c,b),g&&a.vec3d.scale(b,-1)):b=null);c=0;b&&(a.vec3d.scale(e,a.vec3d.dot(e,b),k),a.vec3d.subtract(b,k),c=a.vec3d.dot(b,m)/(a.vec3d.length(b)*a.vec3d.length(m)),
a.vec3d.cross(b,m,k),c=(0<a.vec3d.dot(k,e)?1:-1)*h.rad2deg(h.acos(c)));d=h.rad2deg(h.acos(-a.vec3d.dot(e,d)/a.vec3d.length(d)));return l?(l.heading=c,l.tilt=d,l):{heading:c,tilt:d}}});