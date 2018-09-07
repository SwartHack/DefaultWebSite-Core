//>>built
define(["require","exports","../../../../webgl/VertexArrayObject","../../../../webgl/Texture","../Utils"],function(x,y,p,w,u){return function(){function k(){this._iconAttributeLocations={a_pos:0,a_vertexOffsetAndTex:1,a_id:2,a_color:3,a_outlineColor:4,a_sizeAndOutlineWidth:5};this._iconAttributeLocationsVV={a_pos:0,a_vertexOffsetAndTex:1,a_id:2,a_color:3,a_outlineColor:4,a_sizeAndOutlineWidth:5,a_vv:6};this._iconAttributeLocationsHeatmap={a_pos:0,a_vertexOffsetAndTex:1,a_id:2,a_color:3,a_outlineColor:4,
a_sizeAndOutlineWidth:5,a_weight:6};this._iconVertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:24,normalized:!1,divisor:0},{name:"a_vertexOffsetAndTex",count:4,type:5120,offset:4,stride:24,normalized:!1,divisor:0},{name:"a_id",count:4,type:5121,offset:8,stride:24,normalized:!0,divisor:0},{name:"a_color",count:4,type:5121,offset:12,stride:24,normalized:!0,divisor:0},{name:"a_outlineColor",count:4,type:5121,offset:16,stride:24,normalized:!0,divisor:0},{name:"a_sizeAndOutlineWidth",
count:4,type:5121,offset:20,stride:24,normalized:!1,divisor:0}]};this._iconVertexAttributesWithVV={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:40,normalized:!1,divisor:0},{name:"a_vertexOffsetAndTex",count:4,type:5120,offset:4,stride:40,normalized:!1,divisor:0},{name:"a_id",count:4,type:5121,offset:8,stride:40,normalized:!0,divisor:0},{name:"a_color",count:4,type:5121,offset:12,stride:40,normalized:!0,divisor:0},{name:"a_outlineColor",count:4,type:5121,offset:16,stride:40,normalized:!0,
divisor:0},{name:"a_sizeAndOutlineWidth",count:4,type:5121,offset:20,stride:40,normalized:!1,divisor:0},{name:"a_vv",count:4,type:5126,offset:24,stride:40,normalized:!1,divisor:0}]};this._iconVertexAttributesWithHeatmap={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:28,normalized:!1,divisor:0},{name:"a_vertexOffsetAndTex",count:4,type:5120,offset:4,stride:28,normalized:!1,divisor:0},{name:"a_id",count:4,type:5121,offset:8,stride:28,normalized:!0,divisor:0},{name:"a_color",count:4,type:5121,
offset:12,stride:28,normalized:!0,divisor:0},{name:"a_outlineColor",count:4,type:5121,offset:16,stride:28,normalized:!0,divisor:0},{name:"a_sizeAndOutlineWidth",count:4,type:5121,offset:20,stride:28,normalized:!1,divisor:0},{name:"a_weight",count:1,type:5126,offset:24,stride:28,normalized:!1,divisor:0}]};this._spritesTextureSize=new Float32Array(2)}return k.prototype.draw=function(f,a,r,d,b,m,p,l,c,k,u){if(r.canDisplay){var e=a.materialKeyInfo,h=e.heatmap,g=e.vvSizeMinMaxValue||e.vvSizeScaleStops||
e.vvSizeFieldStops||e.vvSizeUnitValue||e.vvColor||e.vvRotation||e.vvOpacity;if(b=l.getProgram(a.materialKey,b,g?this._iconAttributeLocationsVV:this._iconAttributeLocations)){f.bindProgram(b);g=this._getVAO(f,r,g,h);if(f.bindVAO(g),h){c=d.heatmapParameters;if(c.intensityKernel&&!c.refreshIntensityKernel)c=c.intensityKernel;else{c.intensityKernel&&(c.intensityKernel.dispose(),c.intensityKernel=null);l=c.radius;a=c.kernelSize;for(var v=c.blurRadius,n=l*l,h=[],g=-1;++g<a;)h[g]=Math.exp(-Math.pow(g-v,
2)/(2*n))/(l/2*Math.sqrt(2*Math.PI));for(var q=[],t=0;a>t;t++)for(v=h[t],g=0;a>g;g++)n=t*a+g,l=h[g],q[4*n+0]=v*l,q[4*n+1]=0,q[4*n+2]=0,q[4*n+3]=1;a=new w(f,{target:3553,pixelFormat:6408,internalFormat:34836,dataType:5126,samplingMode:f.extensions.textureFloatLinear?9729:9728,wrapMode:33071,width:a,height:a},new Float32Array(q));c=(c.intensityKernel=a,c.refreshIntensityKernel=!1,a)}f.bindTexture(c,1);b.setUniform1i("u_texture",1);this._spritesTextureSize[0]=Math.round(d.heatmapParameters.radius);this._spritesTextureSize[1]=
Math.round(d.heatmapParameters.radius)}else h=a.texBindingInfo[0],a=h.pageId,c.bindSpritePage(f,a,h.unit),b.setUniform1i(h.semantic,h.unit),c=c.sprites,this._spritesTextureSize[0]=c.getWidth(a)/4,this._spritesTextureSize[1]=c.getHeight(a)/4;k=d.vvMaterialParameters.vvRotationEnabled&&"geographic"===d.vvMaterialParameters.vvRotationType?k:u;b.setUniformMatrix4fv("u_transformMatrix",r.tileTransform.transform);b.setUniformMatrix4fv("u_extrudeMatrix",k);b.setUniform2fv("u_normalized_origin",r.tileTransform.displayCoord);
b.setUniform2fv("u_mosaicSize",this._spritesTextureSize);b.setUniform1f("u_opacity",1);e.vvSizeMinMaxValue&&b.setUniform4fv("u_vvSizeMinMaxValue",d.vvSizeMinMaxValue);e.vvSizeScaleStops&&b.setUniform1f("u_vvSizeScaleStopsValue",d.vvSizeScaleStopsValue);e.vvSizeFieldStops&&(b.setUniform1fv("u_vvSizeFieldStopsValues",d.vvSizeFieldStopsValues),b.setUniform1fv("u_vvSizeFieldStopsSizes",d.vvSizeFieldStopsSizes));e.vvSizeUnitValue&&b.setUniform1f("u_vvSizeUnitValueWorldToPixelsRatio",d.vvSizeUnitValueToPixelsRatio);
e.vvColor&&(b.setUniform1fv("u_vvColorValues",d.vvColorValues),b.setUniform4fv("u_vvColors",d.vvColors));e.vvOpacity&&(b.setUniform1fv("u_vvOpacityValues",d.vvOpacityValues),b.setUniform1fv("u_vvOpacities",d.vvOpacities));f.drawElements(4,p,5125,4*m);f.bindVAO(null)}}},k.prototype._getVAO=function(f,a,k,d){if(a.iconGeometry.vao)return a.iconGeometry.vao;var b=a.iconGeometry.vertexBufferMap[u.C_VBO_GEOMETRY],m=a.iconGeometry.indexBuffer;return b&&m?(k?a.iconGeometry.vao=new p(f,this._iconAttributeLocationsVV,
this._iconVertexAttributesWithVV,{geometry:b},m):d?a.iconGeometry.vao=new p(f,this._iconAttributeLocationsHeatmap,this._iconVertexAttributesWithHeatmap,{geometry:b},m):a.iconGeometry.vao=new p(f,this._iconAttributeLocations,this._iconVertexAttributes,{geometry:b},m),a.iconGeometry.vao):null},k}()});