//>>built
define(["require","exports","../../../core/ObjectPool","../../../core/ArrayPool","./TileSpan"],function(l,m,e,d,f){return function(){function a(b){this.lodInfo=b;this.spans=d.acquire()}return a.prototype.release=function(){for(var b=0,a=this.spans;b<a.length;b++)f.pool.release(a[b]);d.release(this.spans)},a.prototype.forEach=function(a,d){var b=this.spans,g=this.lodInfo,e=g.level;if(0!==b.length)for(var h=0;h<b.length;h++)for(var c=b[h],f=c.row,k=c.colTo,c=c.colFrom;k>=c;c++)a.call(d,e,f,g.normalizeCol(c),
g.getWorldForColumn(c))},a.pool=new e(a,!0),a}()});