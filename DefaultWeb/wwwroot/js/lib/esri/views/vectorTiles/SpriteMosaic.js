//>>built
define("require exports ../webgl/Texture ../2d/engine/webgl/Geometry ./Rect ./GeometryUtils ./RectangleBinPack".split(" "),function(J,K,H,I,E,F,D){function w(e){return e-Math.floor(e)}function G(e,a,b){e=0>e?0:.9999991<e?.9999991:e;var c=w(e*z[0]),d=w(e*z[1]),l=w(e*z[2]);e=w(e*z[3]);a[b+0]=256*(c-c*C[0]);a[b+1]=256*(d-c*C[1]);a[b+2]=256*(l-d*C[2]);a[b+3]=256*(e-l*C[3])}var z=[16777216,65536,256,1],C=[0,1/256,1/256,1/256];return function(){function e(a,b,c){void 0===c&&(c=0);this._size=[];this._mosaicsData=
[];this._textures=[];this._dirties=[];this._pageHeight=this._pageWidth=this._currentPage=this._maxItemSize=0;this._mosaicRects={};this.pixelRatio=1;(0>=a||0>=b)&&console.error("Sprites mosaic defaultWidth and defaultHeight must be greater than zero!");this._pageWidth=a;this._pageHeight=b;0<c&&(this._maxItemSize=c);this._binPack=new D(a-4,b-4)}return e.prototype.getWidth=function(a){return a>=this._size.length?-1:this._size[a][0]},e.prototype.getHeight=function(a){return a>=this._size.length?-1:this._size[a][1]},
e.prototype.setSpriteSource=function(a){if(this.dispose(),this.pixelRatio=a.devicePixelRatio,0===this._mosaicsData.length){this._binPack=new D(this._pageWidth-4,this._pageHeight-4);var b=new Uint32Array(Math.floor(this._pageWidth)*Math.floor(this._pageHeight));this._mosaicsData[0]=b;this._dirties.push(!0);this._size.push([this._pageWidth,this._pageHeight]);this._textures.push(void 0)}this._sprites=a},e.prototype.getSpriteItem=function(a,b){void 0===b&&(b=!1);var c=this._mosaicRects[a];if(c)return c;
if(!this._sprites||"loaded"!==this._sprites.loadStatus)return null;var d=this._sprites.getSpriteInfo(a);if(!d||!d.width||!d.height||0>d.width||0>d.height)return null;var l,e=d.width,k=d.height,g=1;if(d.cim){g=this._buildSDF(d.cim);l=g[0];var m=g[1],n=g[2],f=g[3],h=g[4],g=g[5];if(!l||0>=f||0>=h)return null;var p=this._allocateImage(m,n),h=p[0],f=p[1],p=p[2];if(0>=h.width)return null;(d.cim||d.sdf)&&this._clearRect(h,f,p,1);this._copy(h,{width:m,height:n,x:0,y:0},f,p,b,l);h.x+=4;h.y+=4;h.width-=8;h.height-=
8;b=h;l=f;g*=.75;g=n/k;d.sdf=!0}else{n=this._allocateImage(e,k);h=n[0];f=n[1];p=n[2];if(0>=h.width)return null;this._copy(h,d,f,p,b);b=h;l=f}return c={rect:b,width:e,height:k,sdf:d.sdf,pixelRatio:d.pixelRatio,page:l,sdfRatio:g},this._mosaicRects[a]=c,c},e.prototype.preloadSpriteItems=function(){for(var a=0,b=this._sprites.spriteNames;a<b.length;a++)this.getSpriteItem(b[a],!0)},e.prototype.getSpriteItems=function(a){for(var b={},c=0;c<a.length;c++){var d=a[c];b[d]=this.getSpriteItem(d)}return b},e.prototype.getMosaicItemPosition=
function(a,b){b=(a=this.getSpriteItem(a,b))&&a.rect;if(!b)return null;b.width=a.width;b.height=a.height;return{size:[a.width,a.height],tl:[(b.x+2)/this._size[a.page][0],(b.y+2)/this._size[a.page][1]],br:[(b.x+2+a.width)/this._size[a.page][0],(b.y+2+a.height)/this._size[a.page][1]],page:a.page}},e.prototype.bind=function(a,b,c,d){void 0===c&&(c=0);void 0===d&&(d=0);this._textures[c]||(this._textures[c]=new H(a,{pixelFormat:6408,dataType:5121,width:this._size[c][0],height:this._size[c][1]},new Uint8Array(this._mosaicsData[c].buffer)));
var l=this._textures[c];l.setSamplingMode(b);this._dirties[c]&&l.setData(new Uint8Array(this._mosaicsData[c].buffer));a.bindTexture(l,d);this._dirties[c]=!1},e._copyBits=function(a,b,c,d,l,e,k,g,m,n,f){var h=d*b+c;k=g*e+k;if(f)for(k-=e,f=-1;n>=f;f++,h=((f+n)%n+d)*b+c,k+=e)for(g=-1;m>=g;g++)l[k+g]=a[h+(g+m)%m];else for(f=0;n>f;f++){for(g=0;m>g;g++)l[k+g]=a[h+g];h+=b;k+=e}},e.prototype._copy=function(a,b,c,d,l,t){if(this._sprites&&"loaded"===this._sprites.loadStatus&&!(c>=this._mosaicsData.length)){var k=
new Uint32Array(t?t.buffer:this._sprites.image.buffer),g=this._mosaicsData[c];g&&k||console.error("Source or target images are uninitialized!");e._copyBits(k,t?b.width:this._sprites.width,b.x,b.y,g,d[0],a.x+2,a.y+2,b.width,b.height,l);this._dirties[c]=!0}},e.prototype._allocateImage=function(a,b){a+=2;b+=2;var c=Math.max(a,b);if(this._maxItemSize&&this._maxItemSize<c){var c=Math.pow(2,Math.ceil(F.log2(a))),d=Math.pow(2,Math.ceil(F.log2(b)));a=new E(0,0,a,b);return this._mosaicsData.push(new Uint32Array(c*
d)),this._dirties.push(!0),this._size.push([c,d]),this._textures.push(void 0),[a,this._mosaicsData.length-1,[c,d]]}c=a%4?4-a%4:4;d=b%4?4-b%4:4;1===c&&(c=5);1===d&&(d=5);c=this._binPack.allocate(a+c,b+d);return 0>=c.width?(this._dirties[this._currentPage]||(this._mosaicsData[this._currentPage]=null),this._currentPage=this._mosaicsData.length,this._mosaicsData.push(new Uint32Array(this._pageWidth*this._pageHeight)),this._dirties.push(!0),this._size.push([this._pageWidth,this._pageHeight]),this._textures.push(void 0),
this._binPack=new D(this._pageWidth-4,this._pageHeight-4),this._allocateImage(a,b)):[c,this._currentPage,[this._pageWidth,this._pageHeight]]},e.prototype._clearRect=function(a,b,c,d){(b=this._mosaicsData[b])||console.error("Source image is uninitialized!");var l=[0,0,0,0];G(d,l,0);d=255&l[0]|(255&l[1])<<8|(255&l[2])<<16|l[3]<<24;c=c[0];var l=a.y*c+a.x,e=a.width;a=a.height;for(var k=0;a>k;k++){for(var g=0;e>g;g++)b[l+g]=d;l+=c}},e.prototype.dispose=function(){this._binPack=null;this._mosaicRects={};
for(var a=0,b=this._textures;a<b.length;a++){var c=b[a];c&&c.dispose()}this._textures.length=0},e.prototype._extractGeometry=function(a){if(!a)return null;a=a.symbolLayers;if(!a||1!==a.length)return null;a=a[0];if(!a)return null;a=a.markerGraphics;if(!a||1!==a.length)return null;a=a[0];if(!a)return null;var b=a.geometry;if(!b||!b.rings)return null;a=[];for(var c=0,b=b.rings;c<b.length;c++){for(var d=[],l=0,e=b[c];l<e.length;l++){var k=e[l];d.push(new I.Point(k[0],k[1]))}a.push(d)}return a},e.prototype._getEnvelope=
function(a){for(var b=1/0,c=-(1/0),d=1/0,e=-(1/0),t=0;t<a.length;t++)for(var k=0,g=a[t];k<g.length;k++){var m=g[k];m.x<b&&(b=m.x);m.x>c&&(c=m.x);m.y<d&&(d=m.y);m.y>e&&(e=m.y)}return new E(b,d,c-b,e-d)},e.prototype._buildSDF=function(a){a=this._extractGeometry(a);if(!a)return null;var b=this._getEnvelope(a);if(0>=b.width||0>=b.height)return null;for(var c=86/Math.max(b.width,b.height),d=Math.round(b.width*c),e=Math.round(b.height*c),t=d+32,k=e+32,g=0;g<a.length;g++)for(var m=0,n=a[g];m<n.length;m++){var f=
n[m];f.x-=b.x;f.y-=b.y;f.x*=c;f.y*=c;f.x+=15.5;f.y+=15.5}b=this._dist_map(a,t,k,16);return this._sign_dist_map(a,t,k,16,b),[this._encodeDistMap(b),t,k,d,e,c]},e.prototype._dist_map=function(a,b,c,d){for(var e=b*c,t=new Float32Array(e),k=d*d+1,g=0;e>g;++g)t[g]=k;for(k=0;k<a.length;k++)for(var m=a[k],n=m.length,g=1;n>g;++g){var f=m[g-1],h=m[g],p=void 0,q=void 0;f.x<h.x?(p=f.x,q=h.x):(p=h.x,q=f.x);var u=void 0,v=void 0;f.y<h.y?(u=f.y,v=h.y):(u=h.y,v=f.y);var r=Math.floor(p)-d,q=Math.floor(q)+d,u=Math.floor(u)-
d,v=Math.floor(v)+d;0>r&&(r=0);q>b&&(q=b);0>u&&(u=0);v>c&&(v=c);for(var p=h.x-f.x,w=h.y-f.y,z=p*p+w*w;q>r;r++)for(var A=u;v>A;A++){var x=(r-f.x)*p+(A-f.y)*w,y=void 0,B=void 0;0>x?(y=f.x,B=f.y):x>z?(y=h.x,B=h.y):(x/=z,y=f.x+x*p,B=f.y+x*w);x=(r-y)*(r-y)+(A-B)*(A-B);y=(c-A-1)*b+r;x<t[y]&&(t[y]=x)}}for(g=0;e>g;++g)t[g]=Math.sqrt(t[g]);return t},e.prototype._sign_dist_map=function(a,b,c,d,e){for(var l=0;l<a.length;l++)for(var k=a[l],g=k.length,m=1;g>m;++m){var n=k[m-1],f=k[m],h=void 0,p=void 0;n.x<f.x?
(h=n.x,p=f.x):(h=f.x,p=n.x);var q=void 0,u=void 0;n.y<f.y?(q=n.y,u=f.y):(q=f.y,u=n.y);h=Math.floor(h);p=Math.floor(p)+1;q=Math.floor(q);u=Math.floor(u)+1;d>h&&(h=d);p>b-d&&(p=b-d);d>q&&(q=d);for(u>c-d&&(u=c-d);u>q;++q)if(n.y>q!=f.y>q){for(var v=(c-q-1)*b,r=h;p>r;++r)r<(f.x-n.x)*(q-n.y)/(f.y-n.y)+n.x&&(e[v+r]=-e[v+r]);for(r=d;h>r;++r)e[v+r]=-e[v+r]}}},e.prototype._encodeDistMap=function(a){for(var b=a.length,c=new Uint8Array(4*b),d=0;b>d;++d)G(a[d]/16+.5,c,4*d);return c},e}()});