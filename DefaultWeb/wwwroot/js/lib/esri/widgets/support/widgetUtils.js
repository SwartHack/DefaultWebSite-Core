//>>built
define(["require","exports","../../core/Logger","dojo/has"],function(h,c,f,g){Object.defineProperty(c,"__esModule",{value:!0});var e=g("dojo-debug-messages"),d=f.getLogger("esri.widgets.support.widgetUtils");c.join=function(){for(var b=[],a=0;a<arguments.length;a++)b[a]=arguments[a];return e&&2>b.length&&d.error("[Widget] `join` is intended for 2 or more CSS classes."),b.join(" ")};c.isRtl=function(){return"rtl"===document.dir};c.storeNode=function(b){var a=b.getAttribute("data-node-ref");if(e){if(!a)return void d.error("[Widget] node ref not found, did you forget the 'data-node-ref' attribute?");
if(!(a in this))return void d.error("[Widget] cannot store "+a+" if not defined on instance.")}this[a]=b}});