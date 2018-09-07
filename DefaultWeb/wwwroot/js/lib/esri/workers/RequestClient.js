//>>built
define(["../core/declare","dojo/_base/xhr","../config","./WorkerClient"],function(k,l,g,m){function n(a,b){var c=new e;(c.addWorkerCallback(a,b),f.unshift({id:b?a+"::"+b:a,client:c}),f.length>h)&&f.pop().client.terminate();return c}var e=k([m],{declaredClass:"esri.workers.RequestClient",constructor:function(){this.setWorker(["./mutableWorker","./requestWorker"],function(){})},get:function(a){return this._send("GET",a)},post:function(a){return this._send("POST",a)},_send:function(a,b){b=l._ioSetArgs(b);
b.xhr=null;var c=b.ioArgs,d=c.url;return delete c.url,delete c.args,this.postMessage({method:a,url:d,options:c}).then(this._getSuccessHandler(b),this._getErrorHandler(b),this._getProgressHandler(b)),b},_addHeaderFunctions:function(a){return a.getResponseHeader=function(b){var c,d=a.headers;return Object.keys(d).forEach(function(a){return a.toLowerCase()==b.toLowerCase()?(c=d[a],!1):void 0}),c},a.getAllResponseHeaders=function(){var b=[],c=a.headers;return Object.keys(c).forEach(function(a){b.push(a+
": "+c[a])}),b=b.join("\n")},a},_getSuccessHandler:function(a){var b=this,c=a.ioArgs;return function(d){a.xhr=b._addHeaderFunctions(d);d=a.xhr.getResponseHeader("content-type");("xml"==c.handleAs||-1<d.indexOf("xml"))&&"string"==typeof a.xhr.response&&(a.xhr.response=(new DOMParser).parseFromString(a.xhr.response,"text/xml"));a.resolve(a.xhr.response,a.xhr)}},_getErrorHandler:function(a){return function(b){a.reject(b)}},_getProgressHandler:function(a){return function(b){a.progress(b)}}}),f=[],h=g.request.maxWorkers,
p=new e;return e.getClient=function(a,b){if(a){var c;return f.some(function(d){return d.id==(b?a+"::"+b:a)&&(c=d.client),!0}),c||n(a,b)}return p},e.setLimit=function(a){h=g.request.maxWorkers=a},e});