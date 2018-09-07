//>>built
define("./internal/MaterialUtil ../lib/Util ../lib/gl-matrix ../lib/RenderSlot ../lib/DefaultVertexBufferLayouts ../lib/ComponentUtils ../../../webgl/Util".split(" "),function(m,x,u,p,C,D,E){var a=u.vec3d,v=u.vec2d,y=u.mat4d,z=x.VertexAttrConstants,d=a.create(),b=a.create(),h=a.create(),w=a.create(),r=v.create(),t=v.create(),A=a.create(),B=a.create(),F=[],H=function(a,d){m.basicGLMaterialConstructor(this,a);var b=d.get("simple"),k=a.getColor();this.beginSlot=function(a){return a===p.OPAQUE_MATERIAL};
this.getProgram=function(){return b};this.bind=function(a,e){a.bindProgram(b);b.setUniform4fv("color",k);a.setBlendingEnabled(1>k[3]);a.setBlendFunctionSeparate(a.gl.SRC_ALPHA,a.gl.ONE_MINUS_SRC_ALPHA,a.gl.ONE,a.gl.ONE_MINUS_SRC_ALPHA);a.setDepthTestEnabled(!0)};this.release=function(a){1>k[3]&&a.setBlendingEnabled(!1)};this.bindView=function(a,e){m.bindView(e.origin,e.view,b)};this.bindInstance=function(a,e){b.setUniformMatrix4fv("model",e.transformation)};this.getDrawMode=function(a){return a.gl.LINES}},
I=function(a,b){m.basicGLMaterialConstructor(this,a);var d=b.get("highlight");this.beginSlot=function(a){return a===p.OPAQUE_MATERIAL};this.getProgram=function(){return d};this.bind=function(a,b){a.bindProgram(d);a.setDepthTestEnabled(!0)};this.release=function(a){};this.bindView=function(a,b){m.bindView(b.origin,b.view,d)};this.bindInstance=function(a,b){d.setUniformMatrix4fv("model",b.transformation)};this.getDrawMode=function(a){return a.gl.LINES}};return function(u,p,v){m.basicMaterialConstructor(this,
v);var k=C.Pos3,G=E.getStride(k)/4;this.canBeMerged=!0;this.setColor=function(a){p=a;this.notifyDirty("matChanged")};this.getColor=function(){return p};this.dispose=function(){};this.getOutputAmount=function(a){return a*G};this.getVertexBufferLayout=function(){return k};this.fillInterleaved=function(a,c,b,f,d,h){b=a.vertexAttr[z.POSITION].data;if(c){var e=b;b=F;for(f=0;f<e.length;f+=3){var g=e[f],n=e[f+1],l=e[f+2];b[f]=c[0]*g+c[4]*n+c[8]*l+c[12];b[f+1]=c[1]*g+c[5]*n+c[9]*l+c[13];b[f+2]=c[2]*g+c[6]*
n+c[10]*l+c[14]}}a=a.indices[z.POSITION];for(f=0;f<a.length;f++)c=3*a[f],d[h++]=b[c],d[h++]=b[c+1],d[h++]=b[c+2]};this.intersect=function(e,c,k,f,q,m,p){if(f.isSelection&&!D.isAllHidden(c.componentVisibilities,e.data.componentOffsets)){var g,n;c=e.getData().getVertexAttr("position").position.data;e=Number.MAX_VALUE;q=f.camera;m=f.point;for(var l=0;l<c.length-5;l+=3){if(d[0]=c[l],d[1]=c[l+1],d[2]=c[l+2],y.multiplyVec3(k,d),b[0]=c[l+3],b[1]=c[l+4],b[2]=c[l+5],y.multiplyVec3(k,b),q.projectPoint(d,r),
q.projectPoint(b,t),0>r[2]&&0<t[2])a.subtract(d,b,h),g=q.frustumPlanes,n=-(a.dot(g[4],d)+g[4][3]),g=n/a.dot(h,g[4]),a.scale(h,g,h),a.add(d,h,d),q.projectPoint(d,r);else if(0<r[2]&&0>t[2])a.subtract(b,d,h),g=q.frustumPlanes,n=-(a.dot(g[4],b)+g[4][3]),g=n/a.dot(h,g[4]),a.scale(h,g,h),a.add(b,h,b),q.projectPoint(b,t);else if(0>r[2]&&0>t[2])continue;g=x.pointLineSegmentDistance2D(r,t,m);e>g&&(e=g,a.set(d,A),a.set(b,B))}k=f.p0;f=f.p1;2>e&&(e=x.lineSegmentLineSegmentDistance3D(A,B,k,f),c=Number.MAX_VALUE,
e[0]&&(a.subtract(e[2],k,w),e=a.length(w),a.scale(w,1/e),c=e/a.dist(k,f)),p(c,w))}};this.getGLMaterials=function(){return{color:H,depthShadowMap:void 0,normal:void 0,depth:void 0,highlight:I}};this.getAllTextureIds=function(){return[]}}});