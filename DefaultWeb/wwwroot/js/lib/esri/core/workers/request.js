//>>built
define(["require","exports","../global","dojo/_base/lang"],function(n,c,l,m){Object.defineProperty(c,"__esModule",{value:!0});var f;c.execute=function(c,d){void 0===d&&(d={});var a=d.responseType;return a?"json"!==a&&"text"!==a&&"blob"!==a&&"array-buffer"!==a&&(a="text"):a="json",l.invokeStaticMessage("request",{url:c,options:d}).then(function(k){var b,g,e,h=k.data;if(h&&("json"===a||"text"===a||"blob"===a)&&(b=new Blob([h]),("json"===a||"text"===a)&&(f||(f=new FileReaderSync),g=f.readAsText(b),"json"===
a&&(e=JSON.parse(g||null),e.error))))throw m.mixin(Error(),e.error);switch(a){case "json":b=e;break;case "text":b=g;break;case "blob":break;default:b=h}return{data:b,requestOptions:d,ssl:k.ssl,url:c}})}});