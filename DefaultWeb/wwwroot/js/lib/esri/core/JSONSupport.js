//>>built
define("require exports ./tsSupport/declareExtendsHelper ./tsSupport/decorateHelper ./Accessor ./declare ./accessorSupport/read ./accessorSupport/write ./accessorSupport/decorators".split(" "),function(p,q,h,k,l,d,m,n,e){function f(a,b){if(!a)return null;if(a.declaredClass)throw Error("JSON object is already hydrated");var g=new this;return g.read(a,b),g}var c=function(a){function b(){return null!==a&&a.apply(this,arguments)||this}return h(b,a),b.prototype.read=function(a,b){return m["default"](this,
a,b),this},b.prototype.write=function(a,b){return n["default"](this,a||{},b)},b.prototype.toJSON=function(a){return this.write(null,a)},b.fromJSON=function(a,b){return f.call(this,a,b)},b=k([e.subclass("esri.core.JSONSupport")],b)}(e.declared(l));return c.prototype.toJSON.isDefaultToJSON=!0,d.after(function(a){d.hasMixin(a,c)&&(a.fromJSON=f.bind(a))}),c});