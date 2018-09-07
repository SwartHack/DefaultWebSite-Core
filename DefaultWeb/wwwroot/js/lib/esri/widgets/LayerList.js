//>>built
define("require exports ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ../core/accessorSupport/decorators ./Widget ./support/widget dojo/i18n!../nls/common dojo/i18n!./LayerList/nls/LayerList ../core/HandleRegistry ./LayerList/LayerListViewModel ../core/watchUtils".split(" "),function(y,E,A,f,h,B,d,t,u,C,v,p){var D=y.toUrl("./LayerList/images/default-action.svg");return function(w){function c(){var a=w.call(this)||this;return a._handleRegistry=new C,a.createActionsFunction=
null,a.statusIndicatorsVisible=!0,a.listItemCreatedFunction=null,a.operationalItems=null,a.view=null,a.viewModel=new v,a}return A(c,w),c.prototype.postInitialize=function(){var a=this,b=this.operationalItems;this.own(p.on(this,"operationalItems","change",function(){return a._itemsChanged(b)}))},c.prototype.destroy=function(){this._handleRegistry.destroy();this._handleRegistry=null},c.prototype.triggerAction=function(a,b){},c.prototype.render=function(){var a=this,b=this._getItems(),c=this.get("viewModel.state"),
b=0===b.length?d.tsx("div",{"class":"esri-layer-list__no-items"},u.noItemsToDisplay):d.tsx("ul",{"class":d.join("esri-layer-list__list","esri-layer-list__list--root","esri-layer-list__list--independent")},b.map(function(b,d){return a._renderItem(b,null)})),c=(g={},g["esri-hidden"]="loading"===c,g["esri-disabled"]="disabled"===c,g);return d.tsx("div",{"class":"esri-layer-list esri-widget esri-widget--panel",classes:c},b);var g},c.prototype._getItems=function(){var a=this;return this.operationalItems.toArray().filter(function(b){return a.errorsVisible||
!b.error})},c.prototype._renderItem=function(a,b){var c=this,g=this.id+"_"+a.uid,e=g+"_actions",f=g+"__list",g=g+"__title",h=!!a.children.length,x=!!a.error,p=x?u.layerError:"",m=a.visibilityMode,z=a.children&&a.children.toArray(),v=(n={},n["esri-layer-list__list--exclusive"]="exclusive"===m,n["esri-layer-list__list--inherited"]="inherited"===m,n["esri-layer-list__list--independent"]="inherited"!==m&&"exclusive"!==m,n),n=(l={},l["esri-layer-list__item--has-children"]=h,l["esri-layer-list__item--error"]=
!!p,l["esri-layer-list__item--updating"]=a.updating&&!b&&this.statusIndicatorsVisible,l["esri-layer-list__item--invisible-at-scale"]=!a.visibleAtCurrentScale,l),w=(l=this._countActions(a.actionsSections))?this._renderActionMenuItem(a,a.actionsSections):null,y=(k={},k["esri-icon-handle-horizontal"]=!a.actionsOpen,k["esri-icon-close"]=a.actionsOpen,k),k=a.actionsOpen?t.close:t.open,k=1<l?d.tsx("div",{key:"esri-layer-list__actions-menu-toggle","data-item":a,onclick:this._toggleActionsOpen,onkeydown:this._toggleActionsOpen,
"class":"esri-layer-list__item-actions-menu-item",tabindex:"0",role:"button","aria-controls":e,"aria-label":k,title:k},d.tsx("span",{"aria-hidden":"true",classes:y})):null,k=l?d.tsx("div",{key:"esri-layer-list__actions-menu","class":"esri-layer-list__item-actions-menu"},w,k):null,e=1<l?this._renderActionsSections(a,a.actionsSections,e):null,m=h?d.tsx("ul",{key:"esri-layer-list__list-items",id:f,"class":"esri-layer-list__list",classes:v,"aria-expanded":a.open?"true":"false",role:"exclusive"===m?"radiogroup":
"group",hidden:a.open?null:!0},z.map(function(b,d){return c._renderItem(b,a)})):null,z=(r={},r["esri-layer-list__child-toggle--open"]=a.open,r),r=a.open?t.collapse:t.expand,f=h?d.tsx("span",{onclick:this._toggleChildrenClick,onkeydown:this._toggleChildrenClick,"data-item":a,key:"esri-layer-list__toggle-children","class":"esri-layer-list__child-toggle",classes:z,tabindex:"0",role:"button","aria-controls":f,"aria-label":r,title:r},d.tsx("span",{"aria-hidden":"true","class":d.join("esri-layer-list__child-toggle-icon--closed",
"esri-icon-right-triangle-arrow")}),d.tsx("span",{"aria-hidden":"true","class":d.join("esri-layer-list__child-toggle-icon--opened","esri-icon-down-arrow")}),d.tsx("span",{"aria-hidden":"true","class":d.join("esri-layer-list__child-toggle-icon--closed-rtl","esri-icon-left-triangle-arrow")})):null;b=this._createLabelNode(a,b,g);x=x?d.tsx("div",{key:"esri-layer-list__error","class":"esri-layer-list__item-error-message",role:"alert"},d.tsx("span",{"aria-hidden":"true","class":"esri-icon-notice-triangle"}),
d.tsx("span",null,p)):null;return d.tsx("li",{key:a,"class":"esri-layer-list__item",classes:n,"aria-labelledby":g},d.tsx("div",{key:"esri-layer-list__list-item-container","class":"esri-layer-list__item-container"},f,b,k),x,e,m);var n,l,k,r},c.prototype._createLabelNode=function(a,b,c){b=b&&b.visibilityMode;var g=(e={},e["esri-icon-radio-checked"]="exclusive"===b&&a.visible,e["esri-icon-radio-unchecked"]="exclusive"===b&&!a.visible,e["esri-icon-visible"]="exclusive"!==b&&a.visible,e["esri-icon-non-visible"]=
"exclusive"!==b&&!a.visible,e),e="exclusive"===b?"radio":"checkbox",q=a.title||u.untitledLayer,f=a.visibleAtCurrentScale?q:q+" ("+u.layerInvisibleAtScale+")",q=d.tsx("span",{id:c,title:f,"aria-label":f,"class":"esri-layer-list__item-title"},q);return"inherited"===b?d.tsx("div",{key:a,"class":"esri-layer-list__item-label"},q):d.tsx("div",{key:a,onclick:this._labelClick,onkeydown:this._labelClick,"data-item":a,"data-parent-visibility":b,tabindex:"0","aria-checked":a.visible?"true":"false",role:e,"aria-labelledby":c,
"class":"esri-layer-list__item-label"},d.tsx("span",{"class":"esri-layer-list__item-toggle"},d.tsx("span",{"class":"esri-layer-list__item-toggle-icon","aria-hidden":"true",classes:g})),q);var e},c.prototype._renderActionMenuItem=function(a,b){if(b=(b=b.getItemAt(0))&&b.getItemAt(0)){var c=this._getActionImageStyles(b),g=(e={},e[b.className]=!!b.className,e["esri-layer-list__item-action-image"]=!!c["background-image"],e),e=b.title;return d.tsx("div",{key:a,bind:this,"data-item":a,"data-action":b,onclick:this._triggerAction,
onkeydown:this._triggerAction,"class":"esri-layer-list__item-actions-menu-item",role:"button",tabindex:"0",title:e,"aria-label":e},d.tsx("span",{classes:g,styles:c}))}var e},c.prototype._watchActionSectionChanges=function(a,b){var c=this,d="action-section"+b;this._handleRegistry.add(a.on("change",this.scheduleRender.bind(this)),d);a.forEach(function(a){return c._renderOnActionChanges(a,b)})},c.prototype._renderOnActionChanges=function(a,b){var c=this;b="actions"+b;this._handleRegistry.add([p.init(a,
"className, image, id, title, visible",function(){return c.scheduleRender()})],b)},c.prototype._renderOnItemChanges=function(a){var b=this,c=a.uid,d="items"+c;this._handleRegistry.add([p.init(a,"actionsOpen, visible, open, updating, title, visibleAtCurrentScale, error, visibilityMode",function(){return b.scheduleRender()}),a.actionsSections.on("change",function(){return b.scheduleRender()}),a.children.on("change",function(){return b.scheduleRender()})],d);a.children.forEach(function(a){return b._renderOnItemChanges(a)});
a.actionsSections.forEach(function(a){return b._watchActionSectionChanges(a,c)})},c.prototype._itemsChanged=function(a){var b=this;this._handleRegistry.removeAll();a.forEach(function(a){return b._renderOnItemChanges(a)});this.scheduleRender()},c.prototype._renderActionsSections=function(a,b,c){var f=this;b=b.toArray().map(function(b){return d.tsx("ul",{key:b,"class":"esri-layer-list__item-actions-list"},f._renderActionSection(a,b))});return d.tsx("div",{role:"group","aria-expanded":a.actionsOpen?
"true":"false",key:"esri-layer-list__actions-section",id:c,"class":"esri-layer-list__item-actions",hidden:a.actionsOpen?null:!0},b)},c.prototype._renderActionSection=function(a,b){var c=this;return(b&&b.toArray()).map(function(b){return c._renderAction(a,b)})},c.prototype._renderAction=function(a,b){var c=this._getActionImageStyles(b),f=(e={},e[b.className]=!!b.className,e["esri-layer-list__item-action-image"]=!!c["background-image"],e);return d.tsx("li",{bind:this,"data-item":a,"data-action":b,key:b,
onclick:this._triggerAction,onkeydown:this._triggerAction,"class":"esri-layer-list__item-action",tabindex:"0",role:"button",title:b.title,"aria-label":b.title},d.tsx("span",{"aria-hidden":"true","class":"esri-layer-list__item-action-icon",classes:f,styles:c}),d.tsx("span",{"class":"esri-layer-list__item-action-title"},b.title));var e},c.prototype._countActions=function(a){return a.reduce(function(a,c){return a+c.length},0)},c.prototype._getActionImageStyles=function(a){var b=a.image||null;return a.className||
b||(b=D),{"background-image":b?'url("'+b+'")':null}},c.prototype._toggleActionsOpen=function(a){a=a.currentTarget["data-item"];a.actionsOpen=!a.actionsOpen},c.prototype._triggerAction=function(a){a=a.currentTarget;this.triggerAction(a["data-action"],a["data-item"])},c.prototype._labelClick=function(a){var b=a.currentTarget;a=b.getAttribute("data-parent-visibility");b=b["data-item"];"exclusive"===a&&b.visible||(b.visible=!b.visible)},c.prototype._toggleChildrenClick=function(a){a=a.currentTarget["data-item"];
a.open=!a.open},f([h.aliasOf("viewModel.createActionsFunction"),d.renderable()],c.prototype,"createActionsFunction",void 0),f([h.property(),d.renderable()],c.prototype,"statusIndicatorsVisible",void 0),f([h.property(),d.renderable()],c.prototype,"errorsVisible",void 0),f([h.aliasOf("viewModel.listItemCreatedFunction"),d.renderable()],c.prototype,"listItemCreatedFunction",void 0),f([h.aliasOf("viewModel.operationalItems"),d.renderable()],c.prototype,"operationalItems",void 0),f([h.aliasOf("viewModel.view"),
d.renderable()],c.prototype,"view",void 0),f([d.vmEvent("trigger-action"),h.property({type:v}),d.renderable("viewModel.state")],c.prototype,"viewModel",void 0),f([h.aliasOf("viewModel.triggerAction")],c.prototype,"triggerAction",null),f([d.accessibleHandler()],c.prototype,"_toggleActionsOpen",null),f([d.accessibleHandler()],c.prototype,"_triggerAction",null),f([d.accessibleHandler()],c.prototype,"_labelClick",null),f([d.accessibleHandler()],c.prototype,"_toggleChildrenClick",null),c=f([h.subclass("esri.widgets.LayerList")],
c)}(h.declared(B))});