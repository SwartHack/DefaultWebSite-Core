//>>built
define("require exports dojo/_base/lang ../../../core/promiseUtils ../../support/utils ./support/utils ./color ./size ../support/utils ../../support/AuthoringInfo".split(" "),function(x,l,e,f,m,h,r,n,k,t){function u(a){if(!(a&&a.layer&&(a.field||a.valueExpression||a.sqlExpression)))return f.reject(h.createError("univariate-colorsize-visual-variables:missing-parameters","'layer' and 'field', 'valueExpression' or 'sqlExpression' parameters are required"));var b=e.mixin({},a);a=[0,1];var d=k.createLayerAdapter(b.layer,
a);return b.layer=d,d?d.load().then(function(){var a=k.getFieldsList({field:b.field,normalizationField:b.normalizationField,valueExpression:b.valueExpression});return(a=h.verifyBasicFieldValidity(d,a,"univariate-colorsize-visual-variables:invalid-parameters"))?f.reject(a):b}):f.reject(h.createError("univariate-colorsize-visual-variables:invalid-parameters","'layer' must be one of these types: "+k.getLayerTypeLabels(a).join(", ")))}function p(a,b){a=e.mixin({},a);b=0===b?a.colorOptions:a.sizeOptions;
return delete a.sizeOptions,delete a.colorOptions,e.mixin(a,b)}function v(a){if(!(a&&a.layer&&(a.field||a.valueExpression||a.sqlExpression)))return f.reject(h.createError("univariate-colorsize-continuous-renderer:missing-parameters","'layer' and 'field', 'valueExpression' or 'sqlExpression' parameters are required"));var b=e.mixin({},a);b.symbolType=b.symbolType||"2d";a=[0,1];var d=k.createLayerAdapter(b.layer,a);return b.layer=d,d?d.load().then(function(){var a=k.getFieldsList({field:b.field,normalizationField:b.normalizationField,
valueExpression:b.valueExpression});return(a=h.verifyBasicFieldValidity(d,a,"univariate-colorsize-continuous-renderer:invalid-parameters"))?f.reject(a):b}):f.reject(h.createError("univariate-colorsize-continuous-renderer:invalid-parameters","'layer' must be one of these types: "+k.getLayerTypeLabels(a).join(", ")))}function w(a){a=e.mixin({},a);var b=a.sizeOptions;return delete a.sizeOptions,delete a.colorOptions,e.mixin(a,b)}function q(a){return u(a).then(function(a){var b;return r.createVisualVariable(p(a,
0)).then(function(g){var c=p(a,1);return c.statistics=g.statistics,b=g,n.createVisualVariables(c)}).then(function(a){var c=b.visualVariable,d=a.visualVariables,g=c.stops.length;d.forEach(function(a){null!=a.minDataValue&&(a.minDataValue=c.stops[0].value,a.maxDataValue=c.stops[g-1].value)});var e=a.authoringInfo.visualVariables[0],e=new t({type:"univariate-color-size",visualVariables:[b.authoringInfo.visualVariables[0].clone(),e.clone()]});return{basemapId:a.basemapId,statistics:b.statistics,defaultValuesUsed:b.defaultValuesUsed,
color:{visualVariable:c,colorScheme:b.colorScheme},size:{visualVariables:d,sizeScheme:a.sizeScheme},authoringInfo:e}})})}Object.defineProperty(l,"__esModule",{value:!0});l.createVisualVariables=q;l.createContinuousRenderer=function(a){return v(a).then(function(a){var b;return n.createContinuousRenderer(w(a)).then(function(g){var c;c=e.mixin({},a);var d=c.symbolType,f=-1<d.indexOf("3d-volumetric");delete c.symbolType;delete c.defaultSymbolEnabled;c=(c.worldScale=f,f&&(c.sizeOptions=e.mixin({},c.sizeOptions),
c.sizeOptions.axis="3d-volumetric-uniform"===d?"all":"height"),c);return c.statistics=g.statistics,b=g,q(c)}).then(function(a){var c=b.renderer;return c.visualVariables=a.size.visualVariables.map(function(a){return m.cloneSizeVariable(a)}),c.visualVariables.push(m.cloneColorVariable(a.color.visualVariable)),c.authoringInfo=a.authoringInfo&&a.authoringInfo.clone(),{renderer:c,statistics:b.statistics,defaultValuesUsed:b.defaultValuesUsed,color:a.color,size:a.size,basemapId:a.basemapId}})})}});