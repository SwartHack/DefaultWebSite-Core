//>>built
define("require exports ./core/tsSupport/declareExtendsHelper ./core/tsSupport/decorateHelper ./core/accessorSupport/decorators ./core/JSONSupport".split(" "),function(n,p,k,e,c,l){var m={milliseconds:{getter:"getUTCMilliseconds",setter:"setUTCMilliseconds",multiplier:1},seconds:{getter:"getUTCSeconds",setter:"setUTCSeconds",multiplier:1},minutes:{getter:"getUTCMinutes",setter:"setUTCMinutes",multiplier:1},hours:{getter:"getUTCHours",setter:"setUTCHours",multiplier:1},days:{getter:"getUTCDate",setter:"setUTCDate",
multiplier:1},weeks:{getter:"getUTCDate",setter:"setUTCDate",multiplier:7},months:{getter:"getUTCMonth",setter:"setUTCMonth",multiplier:1},years:{getter:"getUTCFullYear",setter:"setUTCFullYear",multiplier:1},decades:{getter:"getUTCFullYear",setter:"setUTCFullYear",multiplier:10},centuries:{getter:"getUTCFullYear",setter:"setUTCFullYear",multiplier:100}};return function(h){function b(a,d){a=h.call(this)||this;return a.endTime=null,a.startTime=null,a}return k(b,h),g=b,b.prototype.normalizeCtorArgs=
function(a,d){return!a||a instanceof Date?{startTime:a,endTime:d}:a},b.prototype.readEndTime=function(a,d){return null!=d.endTime?new Date(d.endTime):null},b.prototype.writeEndTime=function(a,d,b){d.endTime=a?a.getTime():null},b.prototype.readStartTime=function(a,d){return null!=d.startTime?new Date(d.startTime):null},b.prototype.writeStartTime=function(a,d,b){d.startTime=a?a.getTime():null},b.prototype.clone=function(){return new g({endTime:this.endTime,startTime:this.startTime})},b.prototype.intersection=
function(a){if(!a)return null;var d,b,f=this.startTime?this.startTime.getTime():-(1/0),c=this.endTime?this.endTime.getTime():1/0,e=a.startTime?a.startTime.getTime():-(1/0);a=a.endTime?a.endTime.getTime():1/0;if(e>=f&&c>=e?d=e:f>=e&&a>=f&&(d=f),c>=e&&a>=c?b=c:a>=f&&c>=a&&(b=a),isNaN(d)||isNaN(b))return null;f=new g;return f.startTime=d===-(1/0)?null:new Date(d),f.endTime=b===1/0?null:new Date(b),f},b.prototype.offset=function(a,b){var d=new g,c=this.startTime,e=this.endTime;return c&&(d.startTime=
this._offsetDate(c,a,b)),e&&(d.endTime=this._offsetDate(e,a,b)),d},b.prototype._offsetDate=function(a,b,c){a=new Date(a.getTime());b&&c&&(c=m[c],a[c.setter](a[c.getter]()+b*c.multiplier));return a},e([c.property({type:Date,json:{write:{allowNull:!0}}})],b.prototype,"endTime",void 0),e([c.reader("endTime")],b.prototype,"readEndTime",null),e([c.writer("endTime")],b.prototype,"writeEndTime",null),e([c.property({type:Date,json:{write:{allowNull:!0}}})],b.prototype,"startTime",void 0),e([c.reader("startTime")],
b.prototype,"readStartTime",null),e([c.writer("startTime")],b.prototype,"writeStartTime",null),b=g=e([c.subclass("esri.TimeExtent")],b);var g}(c.declared(l))});