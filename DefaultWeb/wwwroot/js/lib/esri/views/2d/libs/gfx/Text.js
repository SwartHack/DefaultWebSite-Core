//>>built
define("require exports ../../../../core/tsSupport/extendsHelper dojo/has dojox/gfx/_base ./Shape ./svg".split(" "),function(f,g,h,d,e,k,l){Object.defineProperty(g,"__esModule",{value:!0});f=d("android");var m=d("chrome")||f&&4<=f?"auto":"optimizeLegibility";d=function(d){function c(a){var b=d.call(this)||this;return b.fontStyle=null,b.shape=e.getDefault("Text"),b.rawNode=a,b}return h(c,d),c.prototype.getFont=function(){return this.fontStyle},c.prototype.setFont=function(a){return this.fontStyle=
"string"==typeof a?e.splitFontString(a):e.makeParameters(e.defaultFont,a),this._setFont(),this},c.prototype._setFont=function(){var a=this.fontStyle;this.rawNode.setAttribute("font-style",a.style);this.rawNode.setAttribute("font-weight",a.weight);this.rawNode.setAttribute("font-size",a.size);this.rawNode.setAttribute("font-family",a.family)},c.prototype.setShape=function(a){this.shape=e.makeParameters(this.shape,a);this.bbox=null;a=this.rawNode;var b=this.shape;return a.setAttribute("x",b.x),a.setAttribute("y",
b.y),a.setAttribute("text-anchor",b.align),a.setAttribute("text-decoration",b.decoration),a.setAttribute("rotate",b.rotated?90:0),a.setAttribute("kerning",b.kerning?"auto":0),a.setAttribute("text-rendering",m),a.firstChild?a.firstChild.nodeValue=b.text:a.appendChild(l._createTextNode(b.text)),this},c.prototype.getTextWidth=function(){var a=this.rawNode,b=a.parentNode,a=a.cloneNode(!0);a.style.visibility="hidden";var c=0,d=a.firstChild.nodeValue;if(b.appendChild(a),""!==d)for(;!c;)c=a.getBBox?parseInt(a.getBBox().width,
10):68;return b.removeChild(a),c},c.prototype.getBoundingBox=function(){var a=null;if(this.getShape().text)try{a=this.rawNode.getBBox()}catch(b){a={x:0,y:0,width:0,height:0}}return a},c.nodeType="text",c}(k["default"]);g["default"]=d});