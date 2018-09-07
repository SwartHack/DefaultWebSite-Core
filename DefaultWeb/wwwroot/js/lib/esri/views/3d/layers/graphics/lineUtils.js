//>>built
define("require exports ../../webgl-engine/materials/RibbonLineMaterial ../../webgl-engine/materials/NativeLineMaterial ../../webgl-engine/lib/GeometryData ../../webgl-engine/lib/Util".split(" "),function(u,g,q,r,m,t){function n(a){var d=a.length;return a[0]===a[d-3]&&a[1]===a[d-2]&&a[2]===a[d-1]}Object.defineProperty(g,"__esModule",{value:!0});var h=t.VertexAttrConstants;g.createRibbonMaterial=function(a){var d={width:a.width,color:a.color,miterLimit:a.miterLimit,polygonOffset:!0};return"miter"===
a.join||"bevel"===a.join?d.join=a.join:(d.join="miter",a.join&&console.warn("unsupported join type for line symbol: "+a.join)),new q(d,a.idHint+"_ribbonlinemat")};g.createNativeMaterial=function(a){return new r(a.width,a.color,a.idHint+"_nativelinemat")};g.isClosed=n;g.createPolylineGeometry=function(a,d,e,g,f){var c,b,k;if(e=e&&!n(a)){e=new Float32Array(a.length+3);for(b=0;b<a.length;b++)e[b]=a[b];b=e.length;e[b-3]=a[0];e[b-2]=a[1];e[b-1]=a[2];c=a.length/3+1;b=new Uint32Array(2*(c-1));k=new Uint32Array(2*
(c-1))}else c=a.length/3,b=new Uint32Array(2*(c-1)),k=new Uint32Array(2*(c-1)),e=a;a=new Float32Array(1);a[0]=f;for(var p=f=0,l=0;c-1>l;l++)b[f++]=l,b[f++]=l+1,k[p++]=0,k[p++]=0;f={};c={};f[h.POSITION]=b;f[h.COLOR]=k;f[h.SIZE]=k;c[h.POSITION]={size:3,data:e,offsetIdx:0,strideIdx:3};c[h.COLOR]={size:4,data:g,offsetIdx:0,strideIdx:4};c[h.SIZE]={size:1,data:a,offsetIdx:0,strideIdx:1};d&&(f.mapPos=b,c.mapPos={size:3,data:d,offsetIdx:0,strideIdx:3});return new m(c,f,m.DefaultOffsets,"line")}});