//>>built
define(["require","exports","dojo/has"],function(e,f,h){var g={info:0,warn:1,error:2};e=function(){function a(b){void 0===b&&(b={});this.module=b.module||"";this.writer=b.writer||null;this.level=b.level||null;null!=b.enabled&&(this.enabled=!!b.enabled);a._loggers[this.module]=this;b=this.module.lastIndexOf(".");-1!==b&&(this.parent=a.getLogger(this.module.slice(0,b)))}return a.prototype.log=function(b){for(var c=[],a=1;a<arguments.length;a++)c[a-1]=arguments[a];this._isEnabled()&&this._matchLevel(b)&&
(a=this._inheritedWriter())&&a.apply(void 0,[b,this.module].concat(c))},a.prototype.error=function(){for(var b=[],a=0;a<arguments.length;a++)b[a]=arguments[a];this.log.apply(this,["error"].concat(b))},a.prototype.warn=function(){for(var b=[],a=0;a<arguments.length;a++)b[a]=arguments[a];this.log.apply(this,["warn"].concat(b))},a.prototype.info=function(){for(var a=[],c=0;c<arguments.length;c++)a[c]=arguments[c];this.log.apply(this,["info"].concat(a))},a.prototype.getLogger=function(b){return a.getLogger(this.module+
"."+b)},a.getLogger=function(b){var c=a._loggers[b];return c||(c=new a({module:b})),c},a.prototype._parentWithMember=function(a,c){for(var b=this;b&&null==b[a];)b=b.parent;return b?b[a]:c},a.prototype._inheritedWriter=function(){return this._parentWithMember("writer",this._consoleWriter)},a.prototype._consoleWriter=function(a,c){for(var b=[],d=2;d<arguments.length;d++)b[d-2]=arguments[d];console[a].apply(console,["["+c+"]"].concat(b))},a.prototype._matchLevel=function(a){return g[this._parentWithMember("level",
"error")]<=g[a]},a.prototype._isEnabled=function(){return this._parentWithMember("enabled",!0)},a._loggers={},a}();f=e.getLogger("esri");return h("dojo-debug-messages")?f.level="info":f.level="warn",e});