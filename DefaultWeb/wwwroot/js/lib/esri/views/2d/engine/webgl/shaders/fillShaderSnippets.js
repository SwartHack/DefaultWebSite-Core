//>>built
require({cache:{"url:esri/views/2d/engine/webgl/shaders/fillShaders.xml":'\x3c?xml version\x3d"1.0" encoding\x3d"UTF-8"?\x3e\n\x3c!--\n  // YF TODO: (doc)\n--\x3e\n\x3csnippets\x3e\n  \x3csnippet name\x3d"fillVVUniformsVS"\x3e\n    \x3c![CDATA[\n  #if defined(VV_COLOR)|| defined(VV_OPACITY)\n    attribute vec4 a_vv;\n  #endif // VV_COLOR || VV_OPACITY\n\n  #ifdef VV_COLOR\n    uniform float u_vvColorValues[8];\n    uniform vec4 u_vvColors[8];\n  #endif // VV_COLOR\n\n  #ifdef VV_OPACITY\n    uniform float u_vvOpacityValues[8];\n    uniform float u_vvOpacities[8];\n  #endif // VV_OPACITY\n\n    ]]\x3e\n  \x3c/snippet\x3e\n\n  \x3csnippet name\x3d"fillVVFunctions"\x3e\n    \x3c![CDATA[\n  #ifdef VV_OPACITY\n    const int VV_OPACITY_N \x3d 8;\n\n    float getVVOpacity(float opacityValue) {\n      if (opacityValue \x3c\x3d u_vvOpacityValues[0]) {\n        return u_vvOpacities[0];\n      }\n\n      for (int i \x3d 1; i \x3c VV_OPACITY_N; ++i) {\n        if (u_vvOpacityValues[i] \x3e\x3d opacityValue) {\n          float f \x3d (opacityValue - u_vvOpacityValues[i-1]) / (u_vvOpacityValues[i] - u_vvOpacityValues[i-1]);\n          return mix(u_vvOpacities[i-1], u_vvOpacities[i], f);\n        }\n      }\n\n      return u_vvOpacities[VV_OPACITY_N - 1];\n    }\n  #endif // VV_OPACITY\n\n  #ifdef VV_COLOR\n    const int VV_COLOR_N \x3d 8;\n\n    vec4 getVVColor(float colorValue) {\n      if (colorValue \x3c\x3d u_vvColorValues[0]) {\n        return u_vvColors[0];\n      }\n\n      for (int i \x3d 1; i \x3c VV_COLOR_N; ++i) {\n        if (u_vvColorValues[i] \x3e\x3d colorValue) {\n          float f \x3d (colorValue - u_vvColorValues[i-1]) / (u_vvColorValues[i] - u_vvColorValues[i-1]);\n          return mix(u_vvColors[i-1], u_vvColors[i], f);\n        }\n      }\n\n      return u_vvColors[VV_COLOR_N - 1];\n    }\n  #endif // VV_COLOR\n    ]]\x3e\n  \x3c/snippet\x3e\n\n  \x3csnippet name\x3d"fillVS"\x3e\n    \x3c![CDATA[\n      precision mediump float;\n\n      attribute vec2 a_pos;\n      attribute vec4 a_id; // since we need to render the Id as a color we need to break it into RGBA components. so just like a color, the Id is normalized.\n      attribute vec4 a_color;\n      attribute vec4 a_tlbr;\n      attribute vec4 a_aux;\n\n      uniform highp mat4 u_transformMatrix;\n      uniform highp vec2 u_normalized_origin;\n\n      varying lowp vec4 v_color;\n      varying lowp float v_opacity;\n\n      // import the VV inputs and functions (they are #ifdefed, so if the proper #define is not set it will end-up being a no-op)\n      $fillVVUniformsVS\n      $fillVVFunctions\n\n  #ifdef PATTERN\n    uniform mediump float u_zoomFactor;\n    uniform mediump vec2 u_mosaicSize;\n\n    varying mediump vec4 v_tlbr;\n    varying mediump vec2 v_tileTextureCoord;\n  #endif // PATTERN\n\n  #ifdef ID\n    varying highp vec4 v_id;\n  #endif // ID\n\n      void main()\n      {\n  #ifdef VV_OPACITY\n        v_opacity \x3d getVVOpacity(a_vv.y);\n  #else\n        v_opacity \x3d 1.0;\n  #endif\n\n    #ifdef VV_COLOR\n       v_color \x3d getVVColor(a_vv.x);\n  #else\n       v_color \x3d a_color;\n  #endif // VV_COLOR\n\n  #ifdef ID\n      v_id \x3d a_id;\n  #endif // ID\n\n  #ifdef PATTERN\n       // calculate the pattern matrix\n       mat3 patternMatrix \x3d mat3(1.0, 0.0, 0.0,\n                                 0.0, 1.0, 0.0,\n                                 0.0, 0.0, 1.0);\n       patternMatrix[0][0] \x3d 1.0 / (u_zoomFactor * a_aux.x);\n       patternMatrix[1][1] \x3d 1.0 / (u_zoomFactor * a_aux.y);\n\n       // calculate the texture coordinates of the current vertex. It will of course get interpolated.\n       // The pattern matrix is a 3x3 scale matrix which \'tiles\' the texture inside the tile, translating from\n       // tile coordinates to texture coordinates.\n       v_tileTextureCoord \x3d (patternMatrix * vec3(a_pos, 1.0)).xy;\n       v_tlbr \x3d vec4(a_tlbr.x / u_mosaicSize.x, a_tlbr.y / u_mosaicSize.y, a_tlbr.z / u_mosaicSize.x, a_tlbr.w / u_mosaicSize.y);\n  #endif // PATTERN\n\n        gl_Position \x3d vec4(u_normalized_origin, 0.0, 0.0) + u_transformMatrix * vec4(a_pos, 0, 1.0);\n      }\n    ]]\x3e\n  \x3c/snippet\x3e\n\n  \x3csnippet name\x3d"fillFS"\x3e\n    \x3c![CDATA[\n      precision lowp float;\n      uniform lowp float u_opacity;\n\n  #ifdef PATTERN\n      uniform lowp sampler2D u_texture;\n\n      varying mediump vec4 v_tlbr;\n      varying mediump vec2 v_tileTextureCoord;\n  #endif // PATTERN\n\n  #ifdef ID\n    varying highp vec4 v_id;\n  #endif // ID\n\n      varying lowp vec4 v_color;\n      varying lowp float v_opacity;\n\n      void main()\n      {\n  #ifdef PATTERN\n         // normalize the calculated texture coordinate such that it fits in the range of 0 to 1.\n         mediump vec2 normalizedTextureCoord \x3d mod(v_tileTextureCoord, 1.0);\n         // interpolate the image coordinate between the top-left and the bottom right to get the actual position to sample.\n         // after normalizing the position, we get a value ranging between 0 and 1 which refers to the entire texture, however\n         // we need to only sample from area that has our sprite in the mosaic.\n         mediump vec2 samplePos \x3d mix(v_tlbr.xy, v_tlbr.zw, normalizedTextureCoord);\n         // sample the sprite mosaic\n         lowp vec4 color \x3d texture2D(u_texture, samplePos);\n         gl_FragColor \x3d u_opacity * v_opacity * v_color * color;\n  #else\n        gl_FragColor \x3d u_opacity * v_opacity * v_color;\n  #endif // PATTERN\n\n  #ifdef HIGHLIGHT\n        gl_FragColor.a \x3d step(1.0 / 255.0, gl_FragColor.a);\n  #endif // HIGHLIGHT\n\n  #ifdef ID\n      if (gl_FragColor.a \x3c 1.0 / 255.0) {\n        discard;\n      }\n      gl_FragColor \x3d v_id;\n  #endif // ID\n      }\n    ]]\x3e\n  \x3c/snippet\x3e\n\x3c/snippets\x3e\n'}});
define(["require","exports","../../../../webgl/ShaderSnippets","dojo/text!./fillShaders.xml"],function(a,d,b,c){a=new b;return b.parse(c,a),a});