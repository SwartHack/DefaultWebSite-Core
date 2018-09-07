//>>built
define("require exports dojo/Deferred ../../core/promiseUtils ../../core/executeAsync ../../core/ObjectPool ./VertexMemoryBuffer ./IndexMemoryBuffer ./TileParser ./BackgroundBucket ./FillBucket ./LineBucket ./SymbolBucket ./Placement ./GeometryUtils".split(" "),function(L,M,C,q,D,E,e,g,F,G,H,I,J,K,y){return function(){function b(){this.status=this.rotation=0;this._symbolBuckets=[];this.placementEngine=new K.PlacementEngine;this.fillVertexBuffer=new e.FillVertexBuffer(!1);this.fillDDVertexBuffer=new e.FillVertexBuffer(!0);
this.fillIndexBuffer=new g.TriangleIndexBuffer;this.outlineVertexBuffer=new e.OutlineVertexBuffer(!1);this.outlineDDVertexBuffer=new e.OutlineVertexBuffer(!0);this.outlineIndexBuffer=new g.TriangleIndexBuffer;this.lineVertexBuffer=new e.LineVertexBuffer(!1);this.lineDDVertexBuffer=new e.LineVertexBuffer(!0);this.lineIndexBuffer=new g.TriangleIndexBuffer;this.iconVertexBuffer=new e.SymbolVertexBuffer(!1);this.iconDDVertexBuffer=new e.SymbolVertexBuffer(!0);this.iconIndexBuffer=new g.TriangleIndexBuffer;
this.textVertexBuffer=new e.SymbolVertexBuffer(!1);this.textDDVertexBuffer=new e.SymbolVertexBuffer(!0);this.textIndexBuffer=new g.TriangleIndexBuffer}return b.prototype.initialize=function(b,e,a,f){void 0===f&&(f=0);this.tileKey=b;this.refKey=e;this._workerTileHandler=a;this.rotation=f;this.placementEngine.setAngle(y.C_DEG_TO_RAD*f)},b.prototype.release=function(){this.tileKey=this.refKey="";this.rotation=this.status=0;this.fillVertexBuffer.reset();this.fillDDVertexBuffer.reset();this.fillIndexBuffer.reset();
this.outlineVertexBuffer.reset();this.outlineDDVertexBuffer.reset();this.outlineIndexBuffer.reset();this.lineVertexBuffer.reset();this.lineDDVertexBuffer.reset();this.lineIndexBuffer.reset();this.iconVertexBuffer.reset();this.iconDDVertexBuffer.reset();this.iconIndexBuffer.reset();this.textVertexBuffer.reset();this.textDDVertexBuffer.reset();this.textIndexBuffer.reset();this.placementEngine.reset();this._symbolBuckets.length=0;this._workerTileHandler=null},b.prototype.setDataAndParse=function(b,e){var a=
this,f=new C(function(b){a.status=6});return this._parse(b,e).then(function(b){a.status=4;for(var e=new Uint32Array([1,a.fillVertexBuffer.sizeInBytes,2,a.fillDDVertexBuffer.sizeInBytes,3,a.fillIndexBuffer.sizeInBytes,4,a.outlineVertexBuffer.sizeInBytes,5,a.outlineDDVertexBuffer.sizeInBytes,6,a.outlineIndexBuffer.sizeInBytes,7,a.lineVertexBuffer.sizeInBytes,8,a.lineDDVertexBuffer.sizeInBytes,9,a.lineIndexBuffer.sizeInBytes,10,a.iconVertexBuffer.sizeInBytes,11,a.iconDDVertexBuffer.sizeInBytes,12,a.iconIndexBuffer.sizeInBytes,
13,a.textVertexBuffer.sizeInBytes,14,a.textDDVertexBuffer.sizeInBytes,15,a.textIndexBuffer.sizeInBytes]),d=[],l=b.length,k=0;l>k;k++){var c=b[k];if(c instanceof H)d.push(c.layerIndex),d.push(1),d.push(c.fillIndexStart),d.push(c.fillIndexCount),d.push(c.outlineIndexStart),d.push(c.outlineIndexCount);else if(c instanceof I)d.push(c.layerIndex),d.push(2),d.push(c.lineIndexStart),d.push(c.lineIndexCount),d.push(c.connectorStart),d.push(c.connectorCount);else if(c instanceof J){d.push(c.layerIndex);d.push(3);
d.push(c.sdfMarker?1:0);var m=c.markerPageMap;d.push(m.size);m.forEach(function(a,c){d.push(c);d.push(a[0]);d.push(a[1])});c=c.glyphsPageMap;d.push(c.size);c.forEach(function(a,c){d.push(c);d.push(a[0]);d.push(a[1])})}else c instanceof G&&(d.push(c.layerIndex),d.push(0))}b=new Uint32Array(d);var l=a.fillVertexBuffer.toBuffer(),k=a.fillDDVertexBuffer.toBuffer(),c=a.fillIndexBuffer.toBuffer(),m=a.outlineVertexBuffer.toBuffer(),n=a.outlineDDVertexBuffer.toBuffer(),r=a.outlineIndexBuffer.toBuffer(),A=
a.lineVertexBuffer.toBuffer(),t=a.lineDDVertexBuffer.toBuffer(),B=a.lineIndexBuffer.toBuffer(),h=a.iconVertexBuffer.toBuffer(),p=a.iconDDVertexBuffer.toBuffer(),g=a.iconIndexBuffer.toBuffer(),z=a.textVertexBuffer.toBuffer(),u=a.textDDVertexBuffer.toBuffer(),v=a.textIndexBuffer.toBuffer();f.resolve({data:{bufferDataInfo:e.buffer,bucketDataInfo:b.buffer,bufferData:[l,k,c,m,n,r,A,t,B,h,p,g,z,u,v]},buffers:[l,k,c,m,n,r,A,t,B,h,p,g,z,u,v,e.buffer,b.buffer]})}),f.promise},b.prototype.addBucket=function(b){this._symbolBuckets.push(b)},
b.prototype.updateSymbols=function(b){var e=this,a=this._symbolBuckets;if(!a||0===a.length)return q.resolve({data:null,buffers:null});this.rotation=b;var f=this.placementEngine;f.reset();f.setAngle(b/256*360*y.C_DEG_TO_RAD);var g=this.iconVertexBuffer;g.reset();var n=this.iconDDVertexBuffer;n.reset();var d=this.iconIndexBuffer;d.reset();var l=this.textVertexBuffer;l.reset();var k=this.textDDVertexBuffer;k.reset();var c=this.textIndexBuffer;c.reset();var m=[],w=a.length,x=0;return D(function(){if(6===
e.status||0===e.status)return!0;if(w>x){var b=a[x++],t=b.layer;(b=b.copy(t.hasDataDrivenIcon?n:g,d,t.hasDataDrivenText?k:l,c,f))&&(m.push(b),b.updateSymbols())}return x>=w},5).then(function(){if(6===e.status||0===e.status||0===g.sizeInBytes&&0===n.sizeInBytes&&0===d.sizeInBytes&&0===l.sizeInBytes&&0===k.sizeInBytes&&0===c.sizeInBytes)return{data:null,buffers:null};var a=new Uint32Array([10,g.sizeInBytes,11,n.sizeInBytes,12,d.sizeInBytes,13,l.sizeInBytes,14,k.sizeInBytes,15,c.sizeInBytes]),b=[];w=
m.length;for(var f=0;w>f;f++){var h=m[f];b.push(h.layerIndex);b.push(3);b.push(h.sdfMarker?1:0);var p=h.markerPageMap;b.push(p.size);p.forEach(function(a,c){b.push(c);b.push(a[0]);b.push(a[1])});h=h.glyphsPageMap;b.push(h.size);h.forEach(function(a,c){b.push(c);b.push(a[0]);b.push(a[1])})}var f=new Uint32Array(b),h=g.toBuffer(),p=n.toBuffer(),r=d.toBuffer(),q=l.toBuffer(),u=k.toBuffer(),v=c.toBuffer();return{data:{bufferDataInfo:a.buffer,bucketDataInfo:f.buffer,bufferData:[h,p,r,q,u,v]},buffers:[h,
p,r,q,u,v,a.buffer,f.buffer]}}).otherwise(function(a){return q.resolve({data:null,buffers:null})})},b.prototype.setObsolete=function(){this.status=6},b.prototype.getLayers=function(){return this._workerTileHandler.getLayers()},b.prototype.getWorkerTileHandler=function(){return this._workerTileHandler},b.prototype._parse=function(b,e){if(!b||0===b.byteLength)return q.resolve([]);this.status=2;return(new F(b,this,e)).parse()},b.pool=new E(b),b}()});