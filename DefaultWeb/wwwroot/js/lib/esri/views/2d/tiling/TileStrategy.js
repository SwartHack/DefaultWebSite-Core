//>>built
define(["require","exports","../../../core/tsSupport/extendsHelper","./TileKey"],function(y,z,A,n){var h=new n(0,0,0,0),f=new Map,g=[],k=[];return function(){function c(a){this._previousResolution=Number.POSITIVE_INFINITY;this.cachePolicy="keep";this.tileIndex=new Map;this.tiles=[];this.acquireTile=a.acquireTile;this.releaseTile=a.releaseTile;this.tileInfoView=a.tileInfoView;a.cachePolicy&&(this.cachePolicy=a.cachePolicy)}return c.prototype.destroy=function(){this.tileIndex.clear()},c.prototype.update=
function(a){var p=this,b=this.tileIndex,c=this.tileInfoView.getTileCoverage(a.state);if(c){var e=c.spans,q=c.lodInfo,t=q.level,d=a.state.resolution,l=!a.stationary&&d>this._previousResolution;this._previousResolution=d;b.forEach(function(a){return a.visible=!0});this.tiles.length=0;f.clear();var u=0,v=0;if(0<e.length)for(var r=0;r<e.length;r++){a=e[r];for(var n=a.row,w=a.colTo,m=a.colFrom;w>=m;m++)u++,a=h.set(t,n,q.normalizeCol(m),q.getWorldForColumn(m)).id,b.has(a)?(d=b.get(a),d.attached?(f.set(a,
d),v++):d.attached||l||this._addParentTile(a,f)):(d=this.acquireTile(h),this.tileIndex.set(a,d),l||this._addParentTile(a,f))}var x=v===u;k.length=0;g.length=0;b.forEach(function(a,b){if(h.set(b),!f.has(b)){var d=p.tileInfoView.intersects(c,h);!d||!l&&x?"purge"===p.cachePolicy?g.push(b):(h.level>t||!d)&&g.push(b):a.attached?k.push(b):l&&g.push(b)}});for(e=0;e<k.length;e++)a=k[e],(d=b.get(a))&&d.attached&&f.set(a,d);for(e=0;e<g.length;e++)a=g[e],d=b.get(a),this.releaseTile(d),b["delete"](a);f.forEach(function(a){return p.tiles.push(a)});
b.forEach(function(a){f.has(a.key.id)||(a.visible=!1)});k.length=0;g.length=0;f.clear()}},c.prototype.clear=function(){var a=this,c=this.tileIndex;c.forEach(function(b){a.releaseTile(b)});c.clear()},c.prototype._addParentTile=function(a,c){for(var b=null;a=this.tileInfoView.getTileParentId(a),a;)if(this.tileIndex.has(a)&&(b=this.tileIndex.get(a),b&&b.attached)){c.has(b.key.id)||c.set(b.key.id,b);break}},c}()});