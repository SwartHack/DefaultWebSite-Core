//>>built
define("require exports ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ../core/accessorSupport/decorators ./Geometry ./Point ./SpatialReference ../core/lang ./support/spatialReferenceUtils ./support/webMercatorUtils ./support/coordsUtils".split(" "),function(u,C,y,k,h,z,n,w,A,x,p,B){function q(h,b,k){return null==b?k:null==k?b:h(b,k)}u=function(u){function b(){for(var a=[],c=0;c<arguments.length;c++)a[c]=arguments[c];a=u.apply(this,a)||this;return a.type="extent",a.xmin=0,
a.ymin=0,a.mmin=void 0,a.zmin=void 0,a.xmax=0,a.ymax=0,a.mmax=void 0,a.zmax=void 0,a}return y(b,u),r=b,b.prototype.normalizeCtorArgs=function(a,c,d,v,e){return!a||"esri.SpatialReference"!==a.declaredClass&&null==a.wkid?"object"==typeof a?(a.spatialReference=null!=a.spatialReference?a.spatialReference:w.WGS84,a):{xmin:a,ymin:c,xmax:d,ymax:v,spatialReference:null!=e?e:w.WGS84}:{spatialReference:a,xmin:0,ymin:0,xmax:0,ymax:0}},Object.defineProperty(b.prototype,"center",{get:function(){var a=new n({x:.5*
(this.xmin+this.xmax),y:.5*(this.ymin+this.ymax),spatialReference:this.spatialReference});return this.hasZ&&(a.z=.5*(this.zmin+this.zmax)),this.hasM&&(a.m=.5*(this.mmin+this.mmax)),a},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"extent",{get:function(){return this.clone()},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"hasM",{get:function(){return null!=this.mmin&&null!=this.mmax},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"hasZ",{get:function(){return null!=
this.zmin&&null!=this.zmax},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"height",{get:function(){return Math.abs(this.ymax-this.ymin)},enumerable:!0,configurable:!0}),Object.defineProperty(b.prototype,"width",{get:function(){return Math.abs(this.xmax-this.xmin)},enumerable:!0,configurable:!0}),b.prototype.centerAt=function(a){var c=this.center;return null!=a.z&&this.hasZ?this.offset(a.x-c.x,a.y-c.y,a.z-c.z):this.offset(a.x-c.x,a.y-c.y)},b.prototype.clone=function(){var a=new r;
return a.xmin=this.xmin,a.ymin=this.ymin,a.xmax=this.xmax,a.ymax=this.ymax,a.spatialReference=this.spatialReference,null!=this.zmin&&(a.zmin=this.zmin,a.zmax=this.zmax),null!=this.mmin&&(a.mmin=this.mmin,a.mmax=this.mmax),a},b.prototype.contains=function(a){if(!a)return!1;if("point"===a.type){var c=this.spatialReference,d=a.spatialReference,v=void 0,e=a.x,b=a.y;a=a.z;return c&&d&&!c.equals(d)&&p.canProject(c,d)&&(v=c.isWebMercator?p.lngLatToXY(e,b):p.xyToLngLat(e,b,[0,0],0,!0),e=v[0],b=v[1]),e>=this.xmin&&
e<=this.xmax&&b>=this.ymin&&b<=this.ymax?null!=a&&this.hasZ?a>=this.zmin&&a<=this.zmax:!0:!1}return"extent"===a.type?this._containsExtent(a):!1},b.prototype.equals=function(a){if(!a)return!1;var c=this.spatialReference;if(!c.equals(a.spatialReference)){if(!p.canProject(a.spatialReference,c))return!1;a=p.project(a,c)}return this.xmin===a.xmin&&this.ymin===a.ymin&&this.zmin===a.zmin&&this.mmin===a.mmin&&this.xmax===a.xmax&&this.ymax===a.ymax&&this.zmax===a.zmax&&this.mmax===a.mmax},b.prototype.expand=
function(a){a=.5*(1-a);var c=this.width*a,d=this.height*a;if(this.xmin+=c,this.ymin+=d,this.xmax-=c,this.ymax-=d,this.hasZ)c=(this.zmax-this.zmin)*a,this.zmin+=c,this.zmax-=c;this.hasM&&(a*=this.mmax-this.mmin,this.mmin+=a,this.mmax-=a);return this},b.prototype.intersects=function(a){if(!a)return!1;var c=this.spatialReference,d=a.spatialReference;switch(c&&d&&!c.equals(d)&&p.canProject(c,d)&&(a=c.isWebMercator?p.geographicToWebMercator(a):p.webMercatorToGeographic(a,!0)),a.type){case "point":return this.contains(a);
case "multipoint":return this._intersectsMultipoint(a);case "extent":return this._intersectsExtent(a);case "polygon":return this._intersectsPolygon(a);case "polyline":return this._intersectsPolyline(a)}},b.prototype.normalize=function(){var a=this._normalize(!1,!0);return Array.isArray(a)?a:[a]},b.prototype.offset=function(a,c,d){return this.xmin+=a,this.ymin+=c,this.xmax+=a,this.ymax+=c,null!=d&&(this.zmin+=d,this.zmax+=d),this},b.prototype.shiftCentralMeridian=function(){return this._normalize(!0)},
b.prototype.union=function(a){return this.xmin=Math.min(this.xmin,a.xmin),this.ymin=Math.min(this.ymin,a.ymin),this.xmax=Math.max(this.xmax,a.xmax),this.ymax=Math.max(this.ymax,a.ymax),(this.hasZ||a.hasZ)&&(this.zmin=q(Math.min,this.zmin,a.zmin),this.zmax=q(Math.max,this.zmax,a.zmax)),(this.hasM||a.hasM)&&(this.mmin=q(Math.min,this.mmin,a.mmin),this.mmax=q(Math.max,this.mmax,a.mmax)),this},b.prototype.intersection=function(a){return this._intersectsExtent(a)?(this.xmin=Math.max(this.xmin,a.xmin),
this.ymin=Math.max(this.ymin,a.ymin),this.xmax=Math.min(this.xmax,a.xmax),this.ymax=Math.min(this.ymax,a.ymax),(this.hasZ||a.hasZ)&&(this.zmin=q(Math.max,this.zmin,a.zmin),this.zmax=q(Math.min,this.zmax,a.zmax)),(this.hasM||a.hasM)&&(this.mmin=q(Math.max,this.mmin,a.mmin),this.mmax=q(Math.min,this.mmax,a.mmax)),this):null},b.prototype.toJSON=function(a){return this.write(null,a)},b.prototype._containsExtent=function(a){var c=a.xmin,d=a.ymin,b=a.zmin,e=a.xmax,f=a.ymax,g=a.zmax;a=a.spatialReference;
return null!=b&&this.hasZ?this.contains(new n(c,d,b,a))&&this.contains(new n(c,f,b,a))&&this.contains(new n(e,f,b,a))&&this.contains(new n(e,d,b,a))&&this.contains(new n(c,d,g,a))&&this.contains(new n(c,f,g,a))&&this.contains(new n(e,f,g,a))&&this.contains(new n(e,d,g,a)):this.contains(new n(c,d,a))&&this.contains(new n(c,f,a))&&this.contains(new n(e,f,a))&&this.contains(new n(e,d,a))},b.prototype._intersectsMultipoint=function(a){for(var c=a.points.length,d=0;c>d;d++)if(this.contains(a.getPoint(d)))return!0;
return!1},b.prototype._intersectsExtent=function(a){var c,d,b,e=this.hasZ&&a.hasZ;if(this.xmin<=a.xmin){if(c=a.xmin,this.xmax<c)return!1}else if(c=this.xmin,a.xmax<c)return!1;if(this.ymin<=a.ymin){if(d=a.ymin,this.ymax<d)return!1}else if(d=this.ymin,a.ymax<d)return!1;if(e&&a.hasZ)if(this.zmin<=a.zmin){if(b=a.zmin,this.zmax<b)return!1}else if(b=this.zmin,a.zmax<b)return!1;return!0},b.prototype._intersectsPolygon=function(a){for(var c=[this.xmin,this.ymax],d=[this.xmax,this.ymax],b=[this.xmin,this.ymin],
e=[this.xmax,this.ymin],f=[c,d,b,e],g=new n(0,0,this.spatialReference),t=f.length,m=0;t>m;m++)if(g.x=f[m][0],g.y=f[m][1],a.contains(g))return!0;g.set({x:0,y:0,spatialReference:a.spatialReference});a=a.rings;f=a.length;c=[[b,c],[c,d],[d,e],[e,b]];for(m=0;f>m;m++)if(d=a[m],b=d.length){e=d[0];if(g.x=e[0],g.y=e[1],this.contains(g))return!0;for(t=1;b>t;t++){var l=d[t];if(g.x=l[0],g.y=l[1],this.contains(g)||this._intersectsLine([e,l],c))return!0;e=l}}return!1},b.prototype._intersectsPolyline=function(a){var c=
[[[this.xmin,this.ymin],[this.xmin,this.ymax]],[[this.xmin,this.ymax],[this.xmax,this.ymax]],[[this.xmax,this.ymax],[this.xmax,this.ymin]],[[this.xmax,this.ymin],[this.xmin,this.ymin]]],d=a.paths,b=d.length;a=new n(0,0,a.spatialReference);for(var e=0;b>e;e++){var f=d[e],g=f.length;if(g){var t=f[0];if(a.x=t[0],a.y=t[1],this.contains(a))return!0;for(var m=1;g>m;m++){var l=f[m];if(a.x=l[0],a.y=l[1],this.contains(a)||this._intersectsLine([t,l],c))return!0;t=l}}}return!1},b.prototype._intersectsLine=function(a,
c){for(var d=0;d<c.length;d++)if(B._getLineIntersection2(a,c[d]))return!0;return!1},b.prototype._shiftCM=function(a){if(void 0===a&&(a=x.getInfo(this.spatialReference)),!a||!this.spatialReference)return this;var c=this.spatialReference,d=this._getCM(a);if(d){var b=c.isWebMercator?p.webMercatorToGeographic(d):d;this.xmin-=d.x;this.xmax-=d.x;c.isWebMercator||(b.x=this._normalizeX(b.x,a).x);this.spatialReference=new w(A.substitute({Central_Meridian:b.x},c.isWGS84?a.altTemplate:a.wkTemplate))}return this},
b.prototype._getCM=function(a){var c=null,d=a.valid;a=d[0];var d=d[1],b=this.xmin,e=this.xmax;return b>=a&&d>=b&&e>=a&&d>=e||(c=this.center),c},b.prototype._normalize=function(a,b,d){var c=this.spatialReference;if(!c||(d=d||x.getInfo(c),!d))return this;var e=this._getParts(d).map(function(a){return a.extent});if(2>e.length)return e[0]||this;if(2<e.length)return a?this._shiftCM(d):this.set({xmin:d.valid[0],xmax:d.valid[1]});if(a)return this._shiftCM(d);if(b)return e;var f=!0,g=!0;return e.forEach(function(a){a.hasZ||
(f=!1);a.hasM||(g=!1)}),{rings:e.map(function(a){var d=[[a.xmin,a.ymin],[a.xmin,a.ymax],[a.xmax,a.ymax],[a.xmax,a.ymin],[a.xmin,a.ymin]];if(f)for(var b=(a.zmax-a.zmin)/2,c=0;c<d.length;c++)d[c].push(b);if(g)for(a=(a.mmax-a.mmin)/2,c=0;c<d.length;c++)d[c].push(a);return d}),hasZ:f,hasM:g,spatialReference:c}},b.prototype._getParts=function(a){var c=this.cache._parts;if(!c){var c=[],d=this.ymin,b=this.ymax,e=this.spatialReference,f=this.width,g=this.xmin,k=this.xmax,m=void 0;a=a||x.getInfo(e);var l=
a.valid,h=l[0],n=l[1],m=this._normalizeX(this.xmin,a),p=m.x,l=m.frameId,m=this._normalizeX(this.xmax,a),q=m.x;a=m.frameId;m=p===q&&0<f;if(f>2*n){f=new r(k>g?p:q,d,n,b,e);g=new r(h,d,k>g?q:p,b,e);k=new r(0,d,n,b,e);d=new r(h,d,0,b,e);b=[];e=[];f.contains(k)&&b.push(l);f.contains(d)&&e.push(l);g.contains(k)&&b.push(a);g.contains(d)&&e.push(a);for(h=l+1;a>h;h++)b.push(h),e.push(h);c.push({extent:f,frameIds:[l]},{extent:g,frameIds:[a]},{extent:k,frameIds:b},{extent:d,frameIds:e})}else p>q||m?c.push({extent:new r(p,
d,n,b,e),frameIds:[l]},{extent:new r(h,d,q,b,e),frameIds:[a]}):c.push({extent:new r(p,d,q,b,e),frameIds:[l]});this.cache._parts=c}a=this.hasZ;d=this.hasM;if(a||d)for(l={},a&&(l.zmin=this.zmin,l.zmax=this.zmax),d&&(l.mmin=this.mmin,l.mmax=this.mmax),a=0;a<c.length;a++)c[a].extent.set(l);return c},b.prototype._normalizeX=function(a,b){var d,c=b.valid;b=c[0];var c=c[1],e=2*c,f=0;return a>c?(d=Math.ceil(Math.abs(a-c)/e),a-=d*e,f=d):b>a&&(d=Math.ceil(Math.abs(a-b)/e),a+=d*e,f=-d),{x:a,frameId:f}},k([h.property({dependsOn:"xmin ymin zmin mmin xmax ymax zmax mmax spatialReference".split(" ")})],
b.prototype,"cache",void 0),k([h.property({readOnly:!0,dependsOn:["cache"]})],b.prototype,"center",null),k([h.property({readOnly:!0,dependsOn:["cache"]})],b.prototype,"extent",null),k([h.property({readOnly:!0,dependsOn:["mmin","mmax"],json:{write:{enabled:!1,overridePolicy:null}}})],b.prototype,"hasM",null),k([h.property({readOnly:!0,dependsOn:["zmin","zmax"],json:{write:{enabled:!1,overridePolicy:null}}})],b.prototype,"hasZ",null),k([h.property({readOnly:!0,dependsOn:["ymin","ymax"]})],b.prototype,
"height",null),k([h.property({readOnly:!0,dependsOn:["xmin","xmax"]})],b.prototype,"width",null),k([h.property({type:Number,json:{write:!0}})],b.prototype,"xmin",void 0),k([h.property({type:Number,json:{write:!0}})],b.prototype,"ymin",void 0),k([h.property({type:Number,json:{write:{overridePolicy:function(){return{enabled:this.hasM}}}}})],b.prototype,"mmin",void 0),k([h.property({type:Number,json:{write:{overridePolicy:function(){return{enabled:this.hasZ}}}}})],b.prototype,"zmin",void 0),k([h.property({type:Number,
json:{write:!0}})],b.prototype,"xmax",void 0),k([h.property({type:Number,json:{write:!0}})],b.prototype,"ymax",void 0),k([h.property({type:Number,json:{write:{overridePolicy:function(){return{enabled:this.hasM}}}}})],b.prototype,"mmax",void 0),k([h.property({type:Number,json:{write:{overridePolicy:function(){return{enabled:this.hasZ}}}}})],b.prototype,"zmax",void 0),b=r=k([h.subclass("esri.geometry.Extent")],b);var r}(h.declared(z));return u.prototype.toJSON.isDefaultToJSON=!0,u});