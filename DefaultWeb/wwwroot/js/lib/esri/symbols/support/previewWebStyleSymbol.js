//>>built
define(["require","exports","../../core/screenUtils","../../request"],function(l,c,g,k){Object.defineProperty(c,"__esModule",{value:!0});c.previewWebStyleSymbol=function(f,c,b){var h=f.thumbnail&&f.thumbnail.url;return h?k(h,{responseType:"image"}).then(function(a){a=a.data;var d=!/\\.svg$/i.test(a.src)&&b&&b.disableUpsampling,e=Math.max(a.width,a.height),c=b&&null!=b.maxSize?g.pt2px(b.maxSize):120;d&&(c=Math.min(e,c));d=Math.min(c,b&&null!=b.size?g.pt2px(b.size):e);d!==e&&(e=0!==a.width&&0!==a.height?
a.width/a.height:1,1<=e?(a.width=d,a.height=d/e):(a.width=d*e,a.height=d));return b&&b.node?(b.node.appendChild(a),b.node):a}):f.fetchSymbol().then(function(a){return c(a,b)})}});