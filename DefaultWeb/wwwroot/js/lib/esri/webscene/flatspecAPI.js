//>>built
define("require exports ../core/tsSupport/generatorHelper ../core/tsSupport/awaiterHelper ../WebScene ../Basemap ../Ground ../core/JSONSupport ../core/MultiOriginJSONSupport ../core/requireUtils ../layers/GroupLayer ../layers/mixins/OperationalLayer ../core/accessorSupport/extensions/serializableProperty/type".split(" "),function(I,q,g,e,J,K,L,M,N,O,E,F,P){function m(b,a){return e(this,void 0,void 0,function(){return g(this,function(c){switch(c.label){case 0:switch(b.typeName){case "array":return[3,
1];case "union":return[3,3];case "json":return[3,5];case "native":return[3,7]}return[3,9];case 1:return[4,Q(b,a)];case 2:return c.sent(),[3,9];case 3:return[4,R(b,a)];case 4:return c.sent(),[3,9];case 5:return[4,n(b,a)];case 6:return c.sent(),[3,9];case 7:return[4,S(b,a)];case 8:return c.sent(),[3,9];case 9:return[2]}})})}function S(b,a){return e(this,void 0,void 0,function(){return g(this,function(c){return a.addProperty({path:a.pathString,type:u(b)}),[2]})})}function Q(b,a){return e(this,void 0,
void 0,function(){return g(this,function(c){switch(c.label){case 0:return a.pushPath(a.popPath()+"[]"),[4,m(b.elementType,a)];case 1:return c.sent(),[2]}})})}function T(b){return U[b]||b}function R(b,a){return e(this,void 0,void 0,function(){var c,d,h,r;return g(this,function(k){switch(k.label){case 0:c=a.popPath(),d=0,h=b.types,k.label=1;case 1:return d<h.length?(r=h[d],a.pushPath(c+"\x3c"+T(r.value)+"\x3e"),[4,m(r.type,a)]):[3,4];case 2:k.sent(),a.popPath(),k.label=3;case 3:return d++,[3,1];case 4:return a.pushPath(c),
[2]}})})}function V(b,a,c){return e(this,void 0,void 0,function(){return g(this,function(d){switch(d.label){case 0:return b.type!==J||"layers"!==a?[3,2]:[4,p("web-scene/operational-layers")];case 1:return[2,d.sent()];case 2:return b.type!==K||"baseLayers"!==a?[3,4]:[4,p("web-scene/basemap")];case 3:return[2,d.sent()];case 4:return b.type!==L||"layers"!==a?[3,6]:[4,p("web-scene/ground")];case 5:return[2,d.sent()];case 6:return b.type!==E||"layers"!==a?[3,8]:[4,p("web-scene/operational-layers",function(a){return a!==
E})];case 7:return[2,d.sent()];case 8:return[2,W(c)]}})})}function n(b,a){return e(this,void 0,void 0,function(){var c,d,h,r,k,e,B,C,l,w,p,x,y,v,z,q,t,m,A,n;return g(this,function(f){switch(f.label){case 0:if(c=b.type.__accessorMetadata__,d=b.type.prototype.declaredClass.replace(/\./g,"/"),h=c&&c.properties,d&&a.classPaths&&(a.classPaths[a.pathString]=d),!h)return a.addProperty({path:a.pathString,type:"unknown"}),[2];if(r=a.seen.get(b.type)){k=0;for(e=r;k<e.length;k++)B=e[k],a.pushPath(B.path),a.addProperty({path:a.pathString,
type:B.type}),a.popPath();return[2]}C=a.flatProperties.length;l=a.pathString;w=[];for(p in h)w.push(p);x=0;f.label=1;case 1:if(x<w.length){y=w[x];v=h[y];if(v.json){f=v.json.origins;var g=v.json.write,u=f&&f["web-document"]&&f["web-document"].write;f=f&&f["web-scene"]&&f["web-scene"].write||u||g||null}else f=null;f=(z=f,z&&z.enabled?[4,V(b,y,v)]:[3,6])}else f=[3,7];return f;case 2:return(q=f.sent())?(t=z.target,"string"!=typeof t&&null!=t?[3,4]:[4,G(q,"string"==typeof t?t:y,a)]):[3,6];case 3:return f.sent(),
[3,6];case 4:return[4,X(t,a)];case 5:f.sent(),f.label=6;case 6:return x++,[3,1];case 7:if(a.flatProperties.length===C)return a.addProperty({path:a.pathString,type:"unknown"}),[2];m=[];for(A=C;A<a.flatProperties.length;A++)n=a.flatProperties[A],m.push({path:n.path.slice(l.length+1),type:n.type});return a.addSeen(b.type,m),[2]}})})}function G(b,a,c){return e(this,void 0,void 0,function(){return g(this,function(d){switch(d.label){case 0:return c.pushPath(a),[4,m(b,c)];case 1:return d.sent(),c.popPath(),
[2]}})})}function X(b,a){return e(this,void 0,void 0,function(){var c,d,h;return g(this,function(e){for(c in b)d=b[c],h=void 0,h=d.types?D(d.types):l(d.type),G(h,c,a);return[2]})})}function p(b,a){return e(this,void 0,void 0,function(){var c,d,h,e,k,l,m,n,p;return g(this,function(g){switch(g.label){case 0:c=F.supportedTypes[b];d={typeName:"union",key:"layerType",types:[]};h=[];for(e in c)h.push(e);k=0;g.label=1;case 1:return k<h.length?(l=h[k],m=F.typeModuleMap[l],m?[4,O.when(I,"../layers/mixins/"+
m)]:[3,3]):[3,4];case 2:if(n=g.sent(),a&&!a(n))return[3,3];d.types.push({type:{typeName:"json",type:n},value:l});g.label=3;case 3:return k++,[3,1];case 4:return 0===d.types.length?[2,null]:(p={typeName:"array",elementType:1===d.types.length?d.types[0].type:d},[2,p])}})})}function u(b){switch(b.typeName){case "array":return u(b.elementType)+"[]";case "union":return""+b.types.map(function(a){return u(a.type)}).join(" | ");case "native":switch(b.type){case Number:return"number";case String:return"string";
case Boolean:return"boolean";default:return"unknown"}case "json":return b.type.prototype.declaredClass}}function W(b){return b.types?D(b.types):l(b.json&&b.json.type||b.type)}function D(b){if(Array.isArray(b))return{typeName:"array",elementType:D(b[0])};var a=[],c;for(c in b.typeMap)a.push({type:l(b.typeMap[c]),value:c});return 1===a.length?a[0].type:{typeName:"union",key:"string"==typeof b.key?b.key:"type",types:a}}function l(b){var a;if(b)if(Array.isArray(b))a={typeName:"array",elementType:l(b[0])};
else if(P.isCollection(b))if(b=b.prototype.itemType&&b.prototype.itemType.Type)if("function"==typeof b)a={typeName:"array",elementType:l(b)};else if(b.typeMap){var c=[];for(a in b.typeMap)c.push({type:l(b.typeMap[a]),value:a});a={typeName:"array",elementType:{typeName:"union",key:"string"==typeof b.key?b.key:"type",types:c}}}else a=void 0;else a={typeName:"array",elementType:{typeName:"native",type:null}};else b===String||b===Boolean||b===Number?a={typeName:"native",type:b}:(a=b._meta&&b._meta.bases,
a=!a||-1===a.indexOf(M)&&-1===a.indexOf(N)?{typeName:"native",type:null}:{typeName:"json",type:b});else a={typeName:"native",type:null};return a}Object.defineProperty(q,"__esModule",{value:!0});q.scan=function(b){return e(this,void 0,void 0,function(){var a,c;return g(this,function(d){switch(d.label){case 0:return a=new H,[4,n({typeName:"json",type:b},a)];case 1:return d.sent(),c=a.flatProperties,c.sort(function(a,b){return a.path.localeCompare(b.path)}),[2,c]}})})};q.collectClassPaths=function(b){return e(this,
void 0,void 0,function(){var a;return g(this,function(c){switch(c.label){case 0:return a=new H({classPaths:{},cacheEnabled:!1}),[4,n({typeName:"json",type:b},a)];case 1:return c.sent(),[2,a.classPaths]}})})};var U={"unique-value":"uniqueValue","class-breaks":"classBreaks","point-3d":"PointSymbol3D","line-3d":"LineSymbol3D","mesh-3d":"MeshSymbol3D","polygon-3d":"PolygonSymbol3D","label-3d":"LabelSymbol3D","web-style":"styleSymbolReference",text:"Text",object:"Object",icon:"Icon",fill:"Fill",extrude:"Extrude",
line:"Line",path:"Path","point-cloud-class-breaks":"pointCloudClassBreaksRenderer","point-cloud-rgb":"pointCloudRGBRenderer","point-cloud-stretch":"pointCloudStretchRenderer","point-cloud-unique-value":"pointCloudUniqueValueRenderer","fixed-size":"pointCloudFixedSizeAlgorithm",splat:"pointCloudSplatAlgorithm"},H=function(){function b(a){this.flatProperties=[];this.path=[];this.seen=new Map;a&&a.classPaths&&(this.classPaths=a.classPaths);this.cacheEnabled=!(!a||!a.cacheEnabled)}return b.prototype.addProperty=
function(a){this.flatProperties.push(a)},b.prototype.addSeen=function(a,b){this.cacheEnabled&&this.seen.set(a,b)},b.prototype.pushPath=function(a){this.path.push(a)},b.prototype.popPath=function(){return this.path.pop()},Object.defineProperty(b.prototype,"pathString",{get:function(){return this.path.join(".")},enumerable:!0,configurable:!0}),b}()});