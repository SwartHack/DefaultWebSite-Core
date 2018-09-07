//>>built
define(["require","exports","../languageUtils","../Feature"],function(m,k,c,l){Object.defineProperty(k,"__esModule",{value:!0});k.registerFunctions=function(h,f){h.trim=function(d,e){return f(d,e,function(b,g,a){return c.pcCheck(a,1,1),c.toString(a[0]).trim()})};h.upper=function(d,e){return f(d,e,function(b,g,a){return c.pcCheck(a,1,1),c.toString(a[0]).toUpperCase()})};h.proper=function(d,e){return f(d,e,function(b,g,a){c.pcCheck(a,1,2);b=1;2===a.length&&"firstword"===c.toString(a[1]).toLowerCase()&&
(b=2);g=/\s/;a=c.toString(a[0]);for(var d="",e=!0,h=0;h<a.length;h++){var f=a[h];g.test(f)?1===b&&(e=!0):f.toUpperCase()!==f.toLowerCase()&&(e?(f=f.toUpperCase(),e=!1):f=f.toLowerCase());d+=f}return d})};h.lower=function(d,e){return f(d,e,function(b,g,a){return c.pcCheck(a,1,1),c.toString(a[0]).toLowerCase()})};h.guid=function(d,e){return f(d,e,function(b,g,a){if(c.pcCheck(a,0,1),0<a.length)switch(c.toString(a[0]).toLowerCase()){case "digits":return c.generateUUID().replace("-","").replace("-","").replace("-",
"").replace("-","");case "digits-hyphen":return c.generateUUID();case "digits-hyphen-parentheses":return"("+c.generateUUID()+")"}return"{"+c.generateUUID()+"}"})};h.console=function(d,e){return f(d,e,function(b,g,a){return 0===a.length||(1===a.length?d.console(c.toString(a[0])):d.console(c.toString(a))),c.voidOperation})};h.mid=function(d,e){return f(d,e,function(b,g,a){c.pcCheck(a,2,3);b=c.toNumber(a[1]);if(isNaN(b))return"";if(0>b&&(b=0),2===a.length)return c.toString(a[0]).substr(b);g=c.toNumber(a[2]);
return isNaN(g)?"":(0>g&&(g=0),c.toString(a[0]).substr(b,g))})};h.find=function(d,e){return f(d,e,function(b,g,a){c.pcCheck(a,2,3);b=0;if(2<a.length){if(b=c.toNumber(c.defaultUndefined(a[2],0)),isNaN(b))return-1;0>b&&(b=0)}return c.toString(a[1]).indexOf(c.toString(a[0]),b)})};h.left=function(d,e){return f(d,e,function(b,g,a){c.pcCheck(a,2,2);b=c.toNumber(a[1]);return isNaN(b)?"":(0>b&&(b=0),c.toString(a[0]).substr(0,b))})};h.right=function(d,e){return f(d,e,function(b,g,a){c.pcCheck(a,2,2);b=c.toNumber(a[1]);
return isNaN(b)?"":(0>b&&(b=0),c.toString(a[0]).substr(-1*b,b))})};h.split=function(d,e){return f(d,e,function(b,g,a){c.pcCheck(a,2,4);var d;b=c.toNumber(c.defaultUndefined(a[2],-1));g=c.toBoolean(c.defaultUndefined(a[3],!1));if(-1===b||null===b||!0===g?d=c.toString(a[0]).split(c.toString(a[1])):(isNaN(b)&&(b=-1),-1>b&&(b=-1),d=c.toString(a[0]).split(c.toString(a[1]),b)),!1===g)return d;a=[];for(g=0;g<d.length&&!(-1!==b&&a.length>=b);g++)""!==d[g]&&void 0!==d[g]&&a.push(d[g]);return a})};h.text=function(d,
e){return f(d,e,function(b,d,a){return c.pcCheck(a,1,2),c.toStringExplicit(a[0],a[1])})};h.concatenate=function(d,e){return f(d,e,function(b,d,a){b=[];if(1>a.length)return"";if(c.isArray(a[0])){d=c.defaultUndefined(a[2],"");for(var e=0;e<a[0].length;e++)b[e]=c.toStringExplicit(a[0][e],d);return 1<a.length?b.join(a[1]):b.join("")}if(c.isImmutableArray(a[0])){d=c.defaultUndefined(a[2],"");for(e=0;e<a[0].length();e++)b[e]=c.toStringExplicit(a[0].get(e),d);return 1<a.length?b.join(a[1]):b.join("")}for(e=
0;e<a.length;e++)b[e]=c.toStringExplicit(a[e]);return b.join("")})};h.reverse=function(d,e){return f(d,e,function(b,d,a){if(c.pcCheck(a,1,1),c.isArray(a[0]))return b=a[0].slice(0),b.reverse(),b;if(c.isImmutableArray(a[0]))return b=a[0].toArray().slice(0),b.reverse(),b;throw Error("Invalid Parameter");})};h.replace=function(d,e){return f(d,e,function(b,d,a){c.pcCheck(a,3,4);b=c.toString(a[0]);d=c.toString(a[1]);var e=c.toString(a[2]);return(4===a.length?c.toBoolean(a[3]):1)?c.multiReplace(b,d,e):b.replace(d,
e)})};h.domainname=function(d,e){return f(d,e,function(b,d,a){if(c.pcCheck(a,2,4),a[0]instanceof l)return a[0].domainValueLookup(c.toString(a[1]),a[2],void 0===a[3]?void 0:c.toNumber(a[3]));throw Error("Invalid Parameter");})};h.domaincode=function(d,e){return f(d,e,function(b,d,a){if(c.pcCheck(a,3,4),a[0]instanceof l)return a[0].domainCodeLookup(c.toString(a[1]),a[2],void 0===a[3]?void 0:c.toNumber(a[3]));throw Error("Invalid Parameter");})}}});