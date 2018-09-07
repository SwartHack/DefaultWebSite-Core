//>>built
define("require exports ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ../core/tsSupport/paramHelper ../core/accessorSupport/decorators ../core/lang ../core/urlUtils ../core/Logger ../core/arrayUtils ../core/Error ../core/accessorSupport/ensureType ../portal/Portal ../support/arcadeUtils ../symbols/WebStyleSymbol ../symbols/support/jsonUtils ../symbols/support/styleUtils ../symbols/support/typeUtils ./Renderer ./support/LegendOptions ./support/UniqueValueInfo ./support/diffUtils".split(" "),
function(G,H,w,c,x,d,g,m,y,t,z,u,p,h,A,q,B,r,C,D,n,E){var f=y.getLogger("esri.renderers.UniqueValueRenderer"),F=u.ensureType(n["default"]);return function(v){function a(b){b=v.call(this)||this;return b._valueInfoMap={},b._isDefaultSymbolDerived=!1,b.type="unique-value",b.field=null,b.field2=null,b.field3=null,b.valueExpression=null,b.valueExpressionTitle=null,b.legendOptions=null,b.defaultLabel=null,b.fieldDelimiter=null,b.portal=null,b.styleOrigin=null,b.diff={uniqueValueInfos:function(b,a){if(b||
a){if(!b||!a)return{type:"complete",oldValue:b,newValue:a};for(var e=!1,k={type:"collection",added:[],removed:[],changed:[],unchanged:[]},d=function(c){var d=t.find(b,function(b){return b.value===a[c].value});d?E.diff(d,a[c])?(k.changed.push({type:"complete",oldValue:d,newValue:a[c]}),e=!0):(k.unchanged.push({oldValue:d,newValue:a[c]}),e=!0):(k.added.push(a[c]),e=!0)},c=0;c<a.length;c++)d(c);d=function(c){t.find(a,function(e){return e.value===b[c].value})||(k.removed.push(b[c]),e=!0)};for(c=0;c<b.length;c++)d(c);
return e?k:void 0}}},b._set("uniqueValueInfos",[]),b}return w(a,v),l=a,a.prototype.writeType=function(b,e,a,c){e.type="uniqueValue"},a.prototype.castField=function(b){return null==b?b:"function"==typeof b?b:u.ensureString(b)},a.prototype.writeField=function(b,e,a,c){"string"==typeof b?e[a]=b:c&&c.messages?c.messages.push(new z("property:unsupported","UniqueValueRenderer.field set to a function cannot be written to JSON")):f.error(".field: cannot write field to JSON since it's not a string value")},
Object.defineProperty(a.prototype,"compiledFunc",{get:function(){return h.createFunction(this.valueExpression)},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"defaultSymbol",{set:function(b){this._isDefaultSymbolDerived=!1;this._set("defaultSymbol",b)},enumerable:!0,configurable:!0}),a.prototype.readDefaultSymbol=function(b,e,a){return q.read(b,e,a)},a.prototype.writeDefaultSymbolWebScene=function(b,e,a,c){this._isDefaultSymbolDerived||q.writeTarget(b,e,a,c)},a.prototype.writeDefaultSymbol=
function(b,e,a,c){this._isDefaultSymbolDerived||q.writeTarget(b,e,a,c)},a.prototype.readPortal=function(b,e,a){return a.portal||p.getDefault()},a.prototype.readStyleOrigin=function(b,e,a){if(e.styleName)return Object.freeze({styleName:e.styleName});if(e.styleUrl)return b=m.read(e.styleUrl,a),Object.freeze({styleUrl:b})},a.prototype.writeStyleOrigin=function(b,e,a,c){b.styleName?e.styleName=b.styleName:b.styleUrl&&(e.styleUrl=m.write(b.styleUrl,c),m.isAbsolute(e.styleUrl)&&(e.styleUrl=m.normalize(e.styleUrl)))},
Object.defineProperty(a.prototype,"uniqueValueInfos",{set:function(b){return this.styleOrigin?void f.error("#uniqueValueInfos\x3d","Cannot modify unique value infos of a UniqueValueRenderer created from a web style"):(this._set("uniqueValueInfos",b),void this._updateValueInfoMap())},enumerable:!0,configurable:!0}),a.prototype.addUniqueValueInfo=function(b,e){if(this.styleOrigin)return void f.error("#addUniqueValueInfo()","Cannot modify unique value infos of a UniqueValueRenderer created from a web style");
b="object"==typeof b?F(b):new n["default"]({value:b,symbol:e});this.uniqueValueInfos.push(b);this._valueInfoMap[b.value]=b},a.prototype.removeUniqueValueInfo=function(b){if(this.styleOrigin)return void f.error("#removeUniqueValueInfo()","Cannot modify unique value infos of a UniqueValueRenderer created from a web style");for(var e=0;e<this.uniqueValueInfos.length;e++)if(this.uniqueValueInfos[e].value===b+""){delete this._valueInfoMap[b];this.uniqueValueInfos.splice(e,1);break}},a.prototype.getUniqueValueInfo=
function(b,e){var a,c=this.field,d=b.attributes;this.valueExpression?a=h.executeFunction(this.compiledFunc,h.createExecContext(b,h.getViewInfo(e))):"function"!=typeof c&&this.field2?(b=this.field2,e=this.field3,a=[],c&&a.push(d[c]),b&&a.push(d[b]),e&&a.push(d[e]),a=a.join(this.fieldDelimiter||"")):"function"==typeof c?a=c(b):c&&(a=d[c]);return this._valueInfoMap[a+""]},a.prototype.getSymbol=function(b,a){return(b=this.getUniqueValueInfo(b,a))&&b.symbol||this.defaultSymbol},a.prototype.getSymbols=
function(){for(var b=[],a=0,c=this.uniqueValueInfos;a<c.length;a++){var d=c[a];d.symbol&&b.push(d.symbol)}return this.defaultSymbol&&b.push(this.defaultSymbol),b},a.prototype.clone=function(){var b=new l({field:this.field,field2:this.field2,field3:this.field3,defaultLabel:this.defaultLabel,defaultSymbol:g.clone(this.defaultSymbol),valueExpression:this.valueExpression,valueExpressionTitle:this.valueExpressionTitle,fieldDelimiter:this.fieldDelimiter,visualVariables:g.clone(this.visualVariables),legendOptions:g.clone(this.legendOptions),
authoringInfo:this.authoringInfo&&this.authoringInfo.clone()});this._isDefaultSymbolDerived&&(b._isDefaultSymbolDerived=!0);b._set("portal",this.portal);var a=g.clone(this.uniqueValueInfos);return this.styleOrigin&&(b._set("styleOrigin",Object.freeze(g.clone(this.styleOrigin))),Object.freeze(a)),b._set("uniqueValueInfos",a),b._updateValueInfoMap(),b},a.prototype.collectRequiredFields=function(b){this.inherited(arguments);[this.field,this.field2,this.field3].forEach(function(a){a&&"string"==typeof a&&
(b[a]=!0)});this.valueExpression&&h.extractFieldNames(this.valueExpression).forEach(function(a){b[a]=!0})},a.prototype.populateFromStyle=function(){var b=this;return B.fetchStyle(this.styleOrigin,{portal:this.portal}).then(function(a){var c=[];return b._valueInfoMap={},a&&a.data&&Array.isArray(a.data.items)&&a.data.items.forEach(function(e){var d=new A({styleUrl:a.styleUrl,styleName:a.styleName,portal:b.portal,name:e.name});b.defaultSymbol||e.name!==a.data.defaultItem||(b.defaultSymbol=d,b._isDefaultSymbolDerived=
!0);d=new n["default"]({value:e.name,symbol:d});c.push(d);b._valueInfoMap[e.name]=d}),b._set("uniqueValueInfos",Object.freeze(c)),!b.defaultSymbol&&b.uniqueValueInfos.length&&(b.defaultSymbol=b.uniqueValueInfos[0].symbol,b._isDefaultSymbolDerived=!0),b})},a.prototype._updateValueInfoMap=function(){var b=this;this._valueInfoMap={};this.uniqueValueInfos.forEach(function(a){return b._valueInfoMap[a.value+""]=a})},a.fromPortalStyle=function(a,c){var b=new l(c&&c.properties);b._set("styleOrigin",Object.freeze({styleName:a}));
b._set("portal",c&&c.portal||p.getDefault());c=b.populateFromStyle();return c.otherwise(function(b){f.error("#fromPortalStyle('"+a+"'[, ...])","Failed to create unique value renderer from style name",b)}),c},a.fromStyleUrl=function(a,c){c=new l(c&&c.properties);c._set("styleOrigin",Object.freeze({styleUrl:a}));c=c.populateFromStyle();return c.otherwise(function(b){f.error("#fromStyleUrl('"+a+"'[, ...])","Failed to create unique value renderer from style URL",b)}),c},c([d.property()],a.prototype,"type",
void 0),c([d.writer("type")],a.prototype,"writeType",null),c([d.property({json:{type:String,read:{source:"field1"},write:{target:"field1"}}})],a.prototype,"field",void 0),c([d.cast("field")],a.prototype,"castField",null),c([d.writer("field")],a.prototype,"writeField",null),c([d.property({type:String,json:{write:!0}})],a.prototype,"field2",void 0),c([d.property({type:String,json:{write:!0}})],a.prototype,"field3",void 0),c([d.property({type:String,json:{write:!0}})],a.prototype,"valueExpression",void 0),
c([d.property({type:String,json:{write:!0}})],a.prototype,"valueExpressionTitle",void 0),c([d.property({dependsOn:["valueExpression"]})],a.prototype,"compiledFunc",null),c([d.property({type:D["default"],json:{write:!0}})],a.prototype,"legendOptions",void 0),c([d.property({type:String,json:{write:!0}})],a.prototype,"defaultLabel",void 0),c([d.property({types:r.types})],a.prototype,"defaultSymbol",null),c([d.reader("defaultSymbol")],a.prototype,"readDefaultSymbol",null),c([d.writer("web-scene","defaultSymbol",
{defaultSymbol:{types:r.types3D}})],a.prototype,"writeDefaultSymbolWebScene",null),c([d.writer("defaultSymbol")],a.prototype,"writeDefaultSymbol",null),c([d.property({type:String,json:{write:!0}})],a.prototype,"fieldDelimiter",void 0),c([d.property({type:p,readOnly:!0})],a.prototype,"portal",void 0),c([d.reader("portal",["styleName"])],a.prototype,"readPortal",null),c([d.property({readOnly:!0})],a.prototype,"styleOrigin",void 0),c([d.reader("styleOrigin",["styleName","styleUrl"])],a.prototype,"readStyleOrigin",
null),c([d.writer("styleOrigin",{styleName:{type:String},styleUrl:{type:String}})],a.prototype,"writeStyleOrigin",null),c([d.property({type:[n["default"]],json:{write:{overridePolicy:function(){return this.styleOrigin?{enabled:!1}:{enabled:!0}}}}})],a.prototype,"uniqueValueInfos",null),c([d.property({dependsOn:["field","field2","field3","valueExpression"],readOnly:!0})],a.prototype,"requiredFields",void 0),c([x(1,d.cast(r.ensureType))],a.prototype,"addUniqueValueInfo",null),a=l=c([d.subclass("esri.renderers.UniqueValueRenderer")],
a);var l}(d.declared(C))});