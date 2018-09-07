//>>built
define("require exports ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ../core/accessorSupport/decorators ./Print/PrintViewModel ../tasks/support/PrintTemplate ../core/Logger ../core/watchUtils ./Widget ./Print/FileLink ./Print/TemplateOptions ../core/urlUtils ./support/widget dojo/i18n!./Print/nls/Print".split(" "),function(D,E,x,f,h,r,y,z,p,A,B,v,C,a,c){var m=z.getLogger("esri.widgets.Print");return function(w){function d(a){a=w.call(this)||this;return a._exportedFileNameMap=
{},a._layoutTabSelected=!0,a._advancedOptionsVisible=!1,a._pendingExportScroll=!1,a._rootNode=null,a._templatesInfo=null,a.templateOptions=new v,a.printServiceUrl=null,a.view=null,a.viewModel=new r,a}return x(d,w),d.prototype.postInitialize=function(){var a=this,b=this.templateOptions,c=b.format,d=b.height,k=b.layout,g=b.scale,f=b.scaleEnabled,b=b.width;p.init(this,"viewModel.templatesInfo",function(b){if(b){a._templatesInfo=b;var e=k===b.layout.defaultValue||k&&"MAP_ONLY"===k.toUpperCase()||b.layout.choiceList&&
-1<b.layout.choiceList.indexOf(k);b=c===b.format.defaultValue||b.format.choiceList&&-1<b.format.choiceList.indexOf(c);e||(k&&m.warn("User sets an invalid layout, resetting it to the default valid one..."),a.templateOptions.layout=a._templatesInfo.layout.defaultValue);b||(c&&m.warn("User sets an invalid format, resetting it to the default valid one..."),a.templateOptions.format=a._templatesInfo.format.defaultValue);k&&"MAP_ONLY"===k.toUpperCase()&&(a._layoutTabSelected=!1)}});p.init(this,"templateOptions.format",
function(b){if(a._templatesInfo&&b){var e=!1;a._templatesInfo.format.choiceList&&a._templatesInfo.format.choiceList.forEach(function(c){c.toUpperCase()===b.toUpperCase()&&(a.templateOptions.format=c,e=!0)});e||(a.templateOptions.format=a._templatesInfo.format.defaultValue,m.warn("User sets an invalid format, resetting it to the default valid one..."));a.scheduleRender()}});p.init(this,"templateOptions.layout",function(b){if(a._templatesInfo&&b){a._layoutTabSelected="MAP_ONLY"!==b.toUpperCase();var e=
!a._layoutTabSelected;e||a._templatesInfo.layout.choiceList&&a._templatesInfo.layout.choiceList.forEach(function(c){c.toUpperCase()===b.toUpperCase()&&(a.templateOptions.layout=c,e=!0)});e||(a.templateOptions.layout=a._templatesInfo.layout.defaultValue,m.warn("User sets an invalid layout, resetting it to the default valid one..."));a.scheduleRender()}});p.init(this,"viewModel.view.scale",function(b){f&&g||(a.templateOptions.scale=b)});this.templateOptions.width=b||800;this.templateOptions.height=
d||1100},d.prototype.render=function(){var e=this,b=this.templateOptions,d=b.attributionEnabled,t=b.author,k=b.copyright,g=b.format,f=b.height,h=b.layout,p=b.legendEnabled,m=b.scaleEnabled,r=b.scale,u=b.width,b=a.tsx("div",{"class":"esri-print__form-section-container"},a.tsx("label",null,this._layoutTabSelected?c.title:c.fileName,a.tsx("input",{type:"text",tabIndex:0,placeholder:this._layoutTabSelected?c.titlePlaceHolder:c.fileNamePlaceHolder,"class":"esri-print__input-text",value:b.title,"data-input-name":"title",
oninput:this._updateInputValue,bind:this}))),n=this.get("_templatesInfo.format.choiceList")||[],n=0<n.length?n.map(function(b){return a.tsx("option",{key:b,selected:b===g},b)}):a.tsx("option",{key:"format-default-option"},c.formatDefaultOption),n=a.tsx("div",{"class":"esri-print__form-section-container"},a.tsx("label",null,c.fileFormatTitle,a.tsx("select",{"class":"esri-select",onchange:this._updateFromOption,"data-target-property":"format",bind:this},n))),q=this.get("_templatesInfo.layout.choiceList")||
[],q=0<q.length?q.map(function(b){return a.tsx("option",{key:b,bind:e,selected:b===h},b)}):a.tsx("option",{key:"layout-default-option"},c.layoutDefaultOption),q=a.tsx("div",{"class":"esri-print__form-section-container"},a.tsx("label",null,c.layoutTitle,a.tsx("select",{"class":"esri-select",onchange:this._updateFromOption,"data-target-property":"layout",bind:this},q))),t=this._advancedOptionsVisible?a.tsx("div",{"aria-labelledby":this.id+"__advancedOptions","class":"esri-print__advanced-options-container"},
a.tsx("div",{"class":a.join("esri-print__scale-info-container","esri-print__form-section-container")},a.tsx("label",null,a.tsx("input",{"data-option-name":"scaleEnabled",checked:m,type:"checkbox",tabIndex:0,onchange:this._toggleInputValue,bind:this}),c.scale),a.tsx("div",{"class":"esri-print__scale-input-container"},a.tsx("input",{"aria-label":c.scaleLabel,"aria-valuenow":""+r,role:"spinbutton",type:"number","class":a.join("esri-print__input-text","esri-print__scale-input"),tabIndex:0,"data-input-name":"scale",
oninput:this._updateInputValue,disabled:!m,value:""+r,bind:this}),a.tsx("button",{role:"button","aria-label":c.reset,"class":a.join("esri-widget-button","esri-print__refresh-button","esri-icon-refresh"),tabIndex:0,onclick:this._resetToCurrentScale,bind:this}))),a.tsx("div",{"class":a.join("esri-print__author-info-container","esri-print__form-section-container")},a.tsx("label",null,c.author,a.tsx("input",{type:"text",value:t,"class":"esri-print__input-text",tabIndex:0,"data-input-name":"author",oninput:this._updateInputValue,
bind:this}))),a.tsx("div",{"class":a.join("esri-print__copyright-info-container","esri-print__form-section-container")},a.tsx("label",null,c.copyright,a.tsx("input",{type:"text","class":"esri-print__input-text",tabIndex:0,value:k,"data-input-value":"copyright",oninput:this._updateInputValue,bind:this}))),a.tsx("div",{"class":a.join("esri-print__legend-info-container","esri-print__form-section-container")},a.tsx("label",null,a.tsx("input",{type:"checkbox","data-option-name":"legendEnabled",tabIndex:0,
checked:p,onchange:this._toggleInputValue,bind:this}),c.legend))):null,d=this._layoutTabSelected?a.tsx("section",{key:"esri-print__layoutContent",id:this.id+"__layoutContent","aria-labelledby":this.id+"__layoutTab","class":"esri-print__layout-section",role:"tabpanel","aria-selected":this._layoutTabSelected},a.tsx("div",{"class":"esri-print__panel-container"},b,q,this._layoutTabSelected?n:null),a.tsx("div",{"class":a.join("esri-print__panel-container","esri-print__advanced-options-section")},a.tsx("button",
{"aria-label":c.advancedOptions,"aria-expanded":this._advancedOptionsVisible?"true":"false",role:"button","class":"esri-print__advanced-options-button",onclick:this._showAdvancedOptions,bind:this},a.tsx("div",{"class":"esri-print__advanced-options-button-container"},a.tsx("span",{"aria-hidden":"true","class":a.join("esri-icon-right-triangle-arrow","esri-print__advanced-options-button-icon--closed")}),a.tsx("span",{"aria-hidden":"true","class":a.join("esri-icon-left-triangle-arrow","esri-print__advanced-options-button-icon--closed-rtl")}),
a.tsx("span",{"aria-hidden":"true","class":a.join("esri-icon-down-arrow","esri-print__advanced-options-button-icon--opened")}),a.tsx("span",{"class":"esri-print__advanced-options-button-title"},c.advancedOptions))),t)):a.tsx("section",{key:"esri-print__mapOnlyContent",id:this.id+"__mapOnlyContent","aria-selected":!this._layoutTabSelected,"aria-labelledby":this.id+"__mapOnlyTab","class":"esri-print__map-only-section",role:"tabpanel"},a.tsx("div",{"class":"esri-print__panel-container"},b,this._layoutTabSelected?
null:n,a.tsx("div",{"class":a.join("esri-print__size-container","esri-print__form-section-container")},a.tsx("div",{"class":"esri-print__width-container"},a.tsx("label",null,c.width,a.tsx("input",{type:"text","class":"esri-print__input-text","data-input-name":"width",onchange:this._updateInputValue,value:""+u,tabIndex:0,bind:this}))),a.tsx("div",{"class":"esri-print__height-container"},a.tsx("label",null,c.height,a.tsx("input",{type:"text","class":"esri-print__input-text","data-input-name":"height",
onchange:this._updateInputValue,value:""+f,tabIndex:0,bind:this}))),a.tsx("button",{role:"button","aria-label":c.swap,"class":a.join("esri-widget-button","esri-print__swap-button","esri-icon-swap"),onclick:this._switchInput,tabIndex:0,bind:this})),a.tsx("div",{"class":"esri-print__form-section-container"},a.tsx("label",null,a.tsx("input",{"data-option-name":"attributionEnabled",type:"checkbox",onchange:this._toggleInputValue,tabIndex:0,checked:d,bind:this}),c.attribution)))),f=this.exportedLinks.toArray(),
u=this._renderExportedLink(f),t=(l={},l["esri-disabled"]=!h&&!g,l),l=null!=this.get("view")&&"2d"!==this.get("view.type"),k=a.tsx("div",{"class":"esri-print__panel--error"},l?c.sceneViewError:c.serviceError),d=a.tsx("div",null,a.tsx("ul",{"class":"esri-print__layout-tab-list",role:"tablist",onclick:this._toggleLayoutPanel,onkeydown:this._toggleLayoutPanel,bind:this},a.tsx("li",{id:this.id+"__layoutTab","data-tab-id":"layoutTab","class":"esri-print__layout-tab",role:"tab",tabIndex:0,"aria-selected":""+
this._layoutTabSelected,bind:this},c.layoutTab),a.tsx("li",{id:this.id+"__mapOnlyTab","data-tab-id":"mapOnlyTab","class":"esri-print__layout-tab",role:"tab",tabIndex:0,"aria-selected":""+!this._layoutTabSelected,bind:this},c.mapOnlyTab)),d,a.tsx("button",{"aria-label":c.exportDescription,role:"button","class":"esri-print__export-button",tabIndex:0,classes:t,onclick:this._handlePrintMap,bind:this},c["export"]),a.tsx("div",{"class":"esri-print__export-panel-container",afterUpdate:this._scrollExportIntoView,
onclick:this._removeLink,bind:this},a.tsx("h2",{"class":"esri-print__export-title"},c.exportText),0<f.length?null:a.tsx("div",null,a.tsx("div",null,c.exportHint)),u)),l=a.tsx("div",null,a.tsx("div",{"class":"esri-print__container"},a.tsx("header",{"class":"esri-print__header-title"},c["export"]),this.error||!this.printServiceUrl||l||!this.view?k:d));return a.tsx("div",{afterCreate:a.storeNode,bind:this,"class":"esri-print esri-widget esri-widget--panel","data-node-ref":"_rootNode"},l);var l},d.prototype._addFileLink=
function(a){var b=a.layoutOptions.titleText||c.untitled;a=a.format.toLowerCase();a=-1<a.indexOf("png")?"png":a;var e=b+a;void 0!==this._exportedFileNameMap[e]?this._exportedFileNameMap[e]++:this._exportedFileNameMap[e]=0;this.exportedLinks.add(new B({name:b,extension:a,count:this._exportedFileNameMap[e]}))},d.prototype._toPrintTemplate=function(a){var b=this.templateOptions;a=b.height;var e=b.legendEnabled,c=b.width,b=new y({attributionVisible:b.attributionEnabled,layoutOptions:{authorText:b.author||
"",copyrightText:b.copyright||"",titleText:b.title||""},format:b.format,layout:b.layout,outScale:b.scale});return c&&(b.exportOptions.width=c),a&&(b.exportOptions.height=a),e||(b.layoutOptions.legendLayers=[]),b},d.prototype._resetToCurrentScale=function(){this.templateOptions.scale=this.viewModel.view.scale},d.prototype._updateInputValue=function(a){a=a.target;var b=a.getAttribute("data-input-name");this.templateOptions[b]=a.value},d.prototype._handlePrintMap=function(){this._pendingExportScroll=
!0;var a=this._toPrintTemplate(this.templateOptions);this._addFileLink(a);this.viewModel.print(a)},d.prototype._updateFromOption=function(a){var b=a.target;a=b.selectedOptions?b.selectedOptions.item(0).value:b.options[b.selectedIndex].value;b=b.getAttribute("data-target-property");this.templateOptions[b]=a},d.prototype._switchInput=function(){a=[this.templateOptions.height,this.templateOptions.width];this.templateOptions.width=a[0];this.templateOptions.height=a[1];var a},d.prototype._showAdvancedOptions=
function(){this._advancedOptionsVisible=!this._advancedOptionsVisible},d.prototype._scrollExportIntoView=function(){if(this._pendingExportScroll){this._pendingExportScroll=!1;var a=this._rootNode,b=this._rootNode,b=b.scrollHeight-b.clientHeight;0<b&&(a.scrollTop=b)}},d.prototype._toggleInputValue=function(a){a=a.target;var b=a.getAttribute("data-option-name");this.templateOptions[b]=a.checked;"scaleEnabled"===b&&(this.viewModel.scaleEnabled=this.templateOptions.scaleEnabled,this.templateOptions[b]||
this._resetToCurrentScale())},d.prototype._removeLink=function(a){(a=a.target["data-item"])&&"error"===a.state&&this.exportedLinks.remove(a)},d.prototype._renderExportedLink=function(d){return d.map(function(b){var d=(e={},e["esri-icon-loading-indicator"]="pending"===b.state,e["esri-rotating"]="pending"===b.state,e["esri-icon-download"]="ready"===b.state,e["esri-icon-error"]="error"===b.state,e["esri-print__exported-file--error"]="error"===b.state,e),e=(g={},g["esri-disabled"]="pending"===b.state,
g["esri-print__exported-file--error"]="error"===b.state,g);(g=""===b.url?null:b.url)&&(g=C.addProxy(g));var f;return f="pending"===b.state?c.pending:"ready"===b.state?c.ready:c.error,a.tsx("div",{"aria-label":f,key:b.formattedName,"class":"esri-print__exported-file"},a.tsx("a",{"aria-label":b.formattedName+". "+c.linkReady,href:g,tabIndex:0,target:"_blank","class":"esri-print__exported-file-link"},a.tsx("span",{"data-item":b,classes:d}),a.tsx("span",{"data-item":b,"class":"esri-print__exported-file-link-title",
classes:e},b.formattedName)));var e,g})},d.prototype._resetInputValue=function(){this.templateOptions.title=""},d.prototype._toggleLayoutPanel=function(a){this._resetInputValue();(this._layoutTabSelected="layoutTab"===a.target.getAttribute("data-tab-id"),this._layoutTabSelected)?(a=this.get("_templatesInfo.layout.choiceList"),this.templateOptions.layout=a&&a[0]):this.templateOptions.layout="MAP_ONLY"},f([h.aliasOf("viewModel.exportedLinks"),a.renderable()],d.prototype,"exportedLinks",void 0),f([a.renderable(),
h.property({type:v})],d.prototype,"templateOptions",void 0),f([h.aliasOf("viewModel.error")],d.prototype,"error",void 0),f([h.aliasOf("viewModel.printServiceUrl")],d.prototype,"printServiceUrl",void 0),f([h.aliasOf("viewModel.view"),a.renderable()],d.prototype,"view",void 0),f([h.property({type:r}),a.renderable(["viewModel.templatesInfo","viewModel.state"])],d.prototype,"viewModel",void 0),f([a.accessibleHandler()],d.prototype,"_toggleLayoutPanel",null),d=f([h.subclass("esri.widgets.Print")],d)}(h.declared(A))});