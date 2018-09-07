//>>built
define(["require","exports","../../../../core/Error","../../../../core/promiseUtils"],function(k,f,m,e){function g(a){return e.create(function(d,b){a.oncomplete=function(){return d()};a.onerror=function(){return b(a.error)};a.onabort=function(){return b(a.error)}})}function h(a){return e.create(function(d,b){"done"===a.readyState?null!=a.error?b(a.error):d(a.result):(a.onsuccess=function(){return d(a.result)},a.onerror=function(){return b(a.error)})})}Object.defineProperty(f,"__esModule",{value:!0});
k=function(){function a(d,b,c){this._quotaReductionPromise=this._db=null;this._gcCounter=0;this.gcFrequency=50;this.maxByteSize=1073741824;this.quotaReductionFactor=.2;this._dbName=d;this._storeName=b;this._version=c}return a.prototype.init=function(){var d=this;return e.resolve().then(function(){var b=indexedDB.open(d._dbName,d._version);return b.onupgradeneeded=function(c){var a=b.result,l=b.transaction,e=a.objectStoreNames.contains(d._storeName)?l.objectStore(d._storeName):a.createObjectStore(d._storeName),
a=a.objectStoreNames.contains("last_access")?l.objectStore("last_access"):a.createObjectStore("last_access");a.indexNames.contains("date")||a.createIndex("date","date",{unique:!1});a.indexNames.contains("byteSize")||a.createIndex("byteSize","byteSize",{unique:!1});c.oldVersion<d._version&&(e.clear(),a.clear())},h(b)}).then(function(b){d._db=b})},a.prototype.destroy=function(){this._db&&(this._db.close(),this._db=null)},a.prototype.put=function(a,b){var c=this;return null==this._db?e.reject(new m("indexedb:not-initialized",
"IndexedDB Cache is not initialized")):(null!=this._quotaReductionPromise?this._quotaReductionPromise:e.resolve()).then(function(){return c._put(a,b)}).otherwise(function(d){if("QuotaExceededError"===d.name)return null==c._quotaReductionPromise&&(c._quotaReductionPromise=c._getCacheSize().then(function(a){return c._removeLeastRecentlyAccessed(b.byteSize+Math.ceil(a*c.quotaReductionFactor))}),c._quotaReductionPromise.always(function(){c._quotaReductionPromise=null})),c._quotaReductionPromise.then(function(){return c._put(a,
b)});throw d;}).then(function(){c._gcCounter--;0>c._gcCounter&&(c._gcCounter=c.gcFrequency,c._getCacheSize().then(function(a){return c._removeLeastRecentlyAccessed(a-c.maxByteSize)}))})},a.prototype.get=function(a){var b=this;return null==this._db?e.resolve(null):e.resolve().then(function(){var c=b._db.transaction(b._storeName,"readonly").objectStore(b._storeName).get(a);return h(c)}).then(function(c){null!=c&&b._db.transaction("last_access","readwrite").objectStore("last_access").put({date:(new Date).getTime(),
byteSize:c.byteSize},a);return c}).otherwise(function(a){return null})},a.prototype.remove=function(a){var b=this;return null==this._db?e.resolve():e.resolve().then(function(){var c=b._db.transaction([b._storeName,"last_access"],"readwrite"),d=c.objectStore(b._storeName),e=c.objectStore("last_access");return d["delete"](a),e["delete"](a),g(c)})},a.prototype._put=function(a,b){var c=this._db.transaction([this._storeName,"last_access"],"readwrite");c.objectStore(this._storeName).put(b,a);return c.objectStore("last_access").put({date:(new Date).getTime(),
byteSize:b.byteSize},a),g(c)},a.prototype._removeLeastRecentlyAccessed=function(a){if(!(0>=a)){var b=this._db.transaction([this._storeName,"last_access"],"readwrite"),c=b.objectStore(this._storeName),d=b.objectStore("last_access"),e=0,f=d.index("date").openCursor(null,"next");return f.onsuccess=function(b){b=f.result;null!=b&&(null!=b.value.byteSize&&(e+=b.value.byteSize),c["delete"](b.primaryKey),d["delete"](b.primaryKey),a>e&&b["continue"]())},g(b)}},a.prototype._getCacheSize=function(){var a=this._db.transaction("last_access"),
b=0,c=a.objectStore("last_access").index("byteSize").openKeyCursor();return c.onsuccess=function(a){if(a=c.result){var d=a.key;null!=d&&(b+=d);a["continue"]()}},g(a).then(function(){return b})},a}();f.IDBCache=k;f.whenTransaction=g;f.whenRequest=h});