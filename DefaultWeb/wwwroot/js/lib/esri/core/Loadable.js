//>>built
define("./Promise ./Accessor ./Error ./Warning dojo/aspect dojo/_base/lang dojo/Deferred".split(" "),function(c,b,d,e,f,g,h){return c.createSubclass([b],{declaredClass:"esri.core.Loadable","-chains-":g.mixin(b._meta.chains,{load:"after"}),constructor:function(){this._set("loadWarnings",[]);var a=new h;this.addResolvingPromise(a.promise);f.around(this,"load",function(k){return function(){return"not-loaded"===this.loadStatus&&(this.loadStatus="loading",k.apply(this)),a&&(a.resolve(),a=null),this.when()}});
this.when(function(a){this.loadStatus="loaded"}.bind(this),function(a){this.loadStatus="failed";this.loadError=a}.bind(this))},properties:{loaded:{readOnly:!0,dependsOn:["loadStatus"],get:function(){return"loaded"===this.loadStatus}},loadError:null,loadStatus:"not-loaded",loadWarnings:{type:[e],readOnly:!0}},load:function(){},cancelLoad:function(){return this.isFulfilled()?this:(this.loadError=new d("load:cancelled","Cancelled"),this._promiseProps.cancel(this.loadError),this)}})});