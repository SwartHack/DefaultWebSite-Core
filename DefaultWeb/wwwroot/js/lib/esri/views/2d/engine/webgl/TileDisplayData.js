//>>built
define("require exports ../../../../core/ObjectPool ./WGLDisplayObject ./WGLDisplayRecord ./WGLDisplayList ./enums ./Utils".split(" "),function(E,F,C,D,x,r,p,l){function t(f,d,e,c){f=f[d];d=0;d+=l.serializeInteger(f.length,e,c+d);for(var a=0;a<f.length;a++)d+=x.serialize(f[a],e,c+d,!1);return d}function u(f,d,e,c){f=f[d];var a=0,a=a+l.deserializeInteger(w,e,c+a);f.length=w.n;for(var v=0;v<w.n;++v)a+=x.deserialize(y,e,c+a,!1),f[v]=y.displayRecord,f[v].geometryType=d;return a}var w={n:void 0},y={displayRecord:null},
z={n:void 0},A={n:void 0},B={n:void 0};return function(){function f(){this.displayList=new r;this.displayRecords=[[],[],[],[]];this.displayObjects=[];this.displayObjectRegistry=new Map}return f.prototype.release=function(){},f.serialize=function(d,e,c){var a=d.displayRecords,f=d.displayObjects,b=0,b=b+r.serialize(d.displayList,e,c+b),b=b+t(a,p.WGLGeometryType.FILL,e,c+b),b=b+t(a,p.WGLGeometryType.LINE,e,c+b),b=b+t(a,p.WGLGeometryType.MARKER,e,c+b);d=b+=t(a,p.WGLGeometryType.TEXT,e,c+b);c+=b;for(var b=
0,b=b+l.serializeInteger(f.length,e,c+b),g=new Map,m=0,q=a.length;q>m;m++)for(var h=a[m],k=0,n=h.length;n>k;k++)g.set(h[k],k);m=0;for(q=f.length;q>m;m++)for(a=f[m],h=a.displayRecords,b+=l.serializeInteger(a.id,e,c+b),b+=l.serializeInteger(h.length,e,c+b),k=0,n=h.length;n>k;k++)a=h[k],g.has(a)&&(e&&(e[c+b]=a.geometryType),++b,b+=l.serializeInteger(g.get(a),e,c+b));return b=d+b},f.deserialize=function(d,e,c){var a=0;d.displayList=r.pool.acquire();var a=a+r.deserialize(d.displayList,e,c+a),a=a+u(d.displayRecords,
p.WGLGeometryType.FILL,e,c+a),a=a+u(d.displayRecords,p.WGLGeometryType.LINE,e,c+a),a=a+u(d.displayRecords,p.WGLGeometryType.MARKER,e,c+a),f=a+=u(d.displayRecords,p.WGLGeometryType.TEXT,e,c+a);c+=a;var a=d.displayObjects,b=d.displayObjectRegistry;d=d.displayRecords;var g=0;b.clear();for(var m={n:void 0},g=g+l.deserializeInteger(m,e,c+g),q=0;q<m.n;++q){var g=g+l.deserializeInteger(z,e,c+g),g=g+l.deserializeInteger(A,e,c+g),h=D.pool.acquire();a.push(h);h.id=z.n;for(var k=0;k<A.n;++k){var n=void 0;g&&
(n=e[c+g]);++g;g+=l.deserializeInteger(B,e,c+g);n=d[n][B.n];n.id=h.id;h.displayRecords[k]=n}b.set(h.id,h)}return a=f+g},f.pool=new C(f),f}()});