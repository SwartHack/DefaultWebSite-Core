//>>built
define(["require","exports","../../../../core/arrayUtils"],function(n,e,D){function w(a,b){if(null!=a){var c=a.isVisibleBit,d=a.data,m=8*d.BYTES_PER_ELEMENT;return d.length*m>b?x(c,d,b,m):!a.isVisibleBit}return!0}function y(a){return null===a.component?-1:a.component}function z(a,b,c,d,m){w(b,d)&&A(a,b,c,c[d],c[d+1]-1,m)}function A(a,b,c,d,m,f){c=(b=0<a.length?a[a.length-1]:null)?b.range[1]:-1;var e=b?b.options:null;c>=d||(c+1===d&&e===f?b.range[1]=m:a.push({range:[d,m],options:f}))}function q(a){return void 0===
a&&(a=!0),{isVisibleBit:!a,data:new Uint32Array(0)}}function B(a,b){return C(a,b,!0)}function t(a,b){return C(a,b,!1)}function C(a,b,c){var d=!1;a=a||E;d=a.isVisibleBit;a=a.data;b=p(b);var m=8*a.BYTES_PER_ELEMENT,f=a.length*m;c=c===d;if(0===a.length||0===b)d=!c;else if(b>f&&!c)d=!0;else{for(var e=r[m],f=r[0],g=0;g<a.length-1;g++)if(d=!c&&a[g]!==e||c&&a[g]!==f)return d;d=a.length-1;b=r[(b-1)%m+1];d=!c&&(a[d]&b)!==b||c&&(a[d]&b)!==f}return d}function u(a){return 0<a.length}function x(a,b,c,d){var e=
c/d|0;return 0!==(b[e]&1<<c-e*d)===a}function p(a){return Math.max(0,a.length-1)}Object.defineProperty(e,"__esModule",{value:!0});e.updateVisibility=function(a,b,c,d){if(c<p(b)){null==a&&(a=q());var e=a.isVisibleBit,f=a.data,l=8*f.BYTES_PER_ELEMENT,g=c/l|0,k=c-l*g;b=(p(b)-1)/l|0;var h=f;d=d===e;h.length*l>c||!d||(c=Math.max(g+1,Math.ceil(1.5*h.length)),c=Math.min(c,b+1),f=new Uint32Array(c),f.set(h));g<f.length&&(f[g]=f[g]&~(1<<k)|(d?1:0)<<k);a.data=f}return a};e.getVisibility=w;e.hideAllComponents=
function(a){if(null==a)a=q(!1);else{a.isVisibleBit=!0;for(var b=0;b<a.data.length;b++)a.data[b]=0}return a};e.unhideAllComponents=function(a){var b;if(null!=a)for(b=a,b.isVisibleBit=!1,a=0;a<b.data.length;a++)b.data[a]=0;return b};e.generateVisibleIndexRanges=function(a,b){var c;if(a)if(u(b))if(0===a.data.length)c=[],b=[[b[0],b[b.length-1]-1]],c=a.isVisibleBit?c:b;else{c=[];for(var d=a.isVisibleBit,e=a.data,f=8*e.BYTES_PER_ELEMENT,l=e.length*f,g=p(b),k=!1,h=0;l>h&&g>h;h++){var v=x(d,e,h,f);if(v!==
k){var n=b[h];v?c.push([n,0]):(k=c[c.length-1],k[1]=n-1);k=v}}a=!a.isVisibleBit;g>l&&a&&!k?c.push([b[l],b[g]-1]):k&&(k=c[c.length-1],k[1]=b[a?g:Math.min(g,l)]-1)}else c=[],c=a.isVisibleBit?c:null;else c=null;return c};e.addHighlight=function(a,b,c,d){a=a||[];b={component:b,options:c,id:d};a.push(b);b=y(b);for(c=a.length-1;0<c&&b<y(a[c-1]);)d=[a[c],a[c-1]],a[c-1]=d[0],a[c]=d[1],--c;return a};e.removeHighlight=function(a,b){return a?(a=a.filter(function(a){return a.id!==b}),0===a.length?null:a):a};
e.generateHighlightedIndexRanges=function(a,b,c){if(b){if(u(c)){for(var d=c[0],e=c[c.length-1]-1,f=[],l=!t(a,c),g=0;g<b.length;++g){var k=b[g].options,h=b[g].component;if(null!==h)z(f,a,c,h,k);else if(l)A(f,a,c,d,e,k);else for(h=0;h<p(c);++h)z(f,a,c,h,k)}return 0<f.length?f:null}return(l=!a||!a.isVisibleBit)?b.map(function(a){return{range:null,options:a.options}}):null}return null};e.defaultVisibilities=q;e.isAllVisible=function(a,b){return!t(a,b)};e.isAllHidden=function(a,b){return!B(a,b)};e.hasVisible=
B;e.hasHidden=t;var E=q();e.createOffsets=function(a){return Array.isArray(a)?new Uint32Array(a):a};e.hasComponent=function(a,b){return b<p(a)};e.hasComponents=u;var r=[];for(n=0;65>n;n++)r.push(Math.pow(2,n)-1);e.componentCount=p;e.componentFind=function(a,b){a=D.binaryIndexOf(a,b,!0);return 0<=a?a:null}});