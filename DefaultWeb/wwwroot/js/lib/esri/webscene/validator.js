//>>built
define(["require","exports","./libs/ajv/ajv.bundle","./schema"],function(r,k,l,g){function m(a){if(n(a.params)){var b=a.params.allowedValues;if(b){if(b=b.map(function(a){return JSON.stringify(a)}),b.length>h){var c="("+(b.length-h)+" more...)",b=b.slice(0,h);b.push(c)}a.message="should be equal to one of: "+b.join(", ")}}else p(a.params)&&(a.message="should NOT have additional property: "+a.params.additionalProperty);return a}function n(a){return null!=(a&&a.allowedValues)}function p(a){return null!=
(a&&a.additionalProperty)}function q(a){var b=f(a);if(!e.getSchema(b)){var c;c=g.json.definitions[f(a)];if(!c)throw Error("invalid schema name to validate against '"+a+"'");a={};for(var d in c)a[d]=c[d];c=(a.definitions=g.json.definitions,a);e.addSchema(c,b)}}function f(a){return a?a+"_schema.json":"webScene_schema.json"}Object.defineProperty(k,"__esModule",{value:!0});var e=new l({allErrors:!0,extendRefs:!0});e.addSchema(g.json,f());var h=5;k.validate=function(a,b){if(q(b),!e.validate(f(b),a)){var c=
{};a=e.errors.map(m).map(function(a,b){return{e:a,i:b}}).sort(function(a,b){var d=a.e;a=a.i;var c=b.e;b=b.i;d=d.dataPath?d.dataPath.split(".").length:0;c=c.dataPath?c.dataPath.split(".").length:0;return d===c?a-b:d-c}).map(function(a){a=a.e;return""+(a.dataPath?a.dataPath+": ":"")+a.message}).filter(function(a){var b=!c[a];return c[a]=!0,b});10<a.length&&(b="("+(a.length-10)+" more...)",a=a.slice(0,10),a.push(b));return a}return[]}});