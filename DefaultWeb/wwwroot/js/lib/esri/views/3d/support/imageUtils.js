//>>built
define(["require","exports","dojo/Deferred","../../../core/urlUtils","../../../request"],function(m,f,h,k,l){function g(a){var c=!1,b=new Image,e=new h(function(){c=!0;b.src=""}),d=function(){c||e.reject()};return b.onload=function(){c||e.resolve(b)},b.onerror=d,b.onabort=d,b.src=a,e.promise}Object.defineProperty(f,"__esModule",{value:!0});f.dataURItoBlob=function(a){var c=atob(a.split(",")[1]);a=a.split(",")[0].split(":")[1].split(";")[0];for(var b=new ArrayBuffer(c.length),e=new Uint8Array(b),d=
0;d<c.length;d++)e[d]=c.charCodeAt(d);return new Blob([b],{type:a})};f.dataUriToImage=g;f.requestImage=function(a){return k.isDataProtocol(a)?g(a):l(a,{responseType:"image",allowImageDataAccess:!0}).then(function(a){return a.data})}});