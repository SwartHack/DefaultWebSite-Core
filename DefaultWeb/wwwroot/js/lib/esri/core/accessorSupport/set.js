//>>built
define(["require","exports","dojo/has","../Logger","./get"],function(m,c,g,h,k){function f(e,a,d){if(e&&a)if("object"==typeof a){d=0;for(var c=Object.getOwnPropertyNames(a);d<c.length;d++){var b=c[d];f(e,b,a[b])}}else if("_"!==a[0]){if(-1!==a.indexOf("."))return a=a.split("."),b=a.splice(a.length-1,1)[0],void f(k["default"](e,a),b,d);g("dojo-debug-messages")&&(b=e.__accessor__,null==b||b.metadatas[a]||l.warn("setting unknown property '"+a+"' on instance of "+b.host.declaredClass));e[a]=d}}Object.defineProperty(c,
"__esModule",{value:!0});var l=h.getLogger("esri.core.accessorSupport.set");c.set=f;c["default"]=f});