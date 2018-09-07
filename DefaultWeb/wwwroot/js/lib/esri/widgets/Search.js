//>>built
define("require exports ../core/tsSupport/declareExtendsHelper ../core/tsSupport/decorateHelper ../core/accessorSupport/decorators ./support/widget ./Search/SearchViewModel ./Search/SearchResultRenderer ./Widget ../core/lang ../core/watchUtils ../PopupTemplate dojo/regexp ../core/geolocationUtils dojo/keys dojo/query dojo/i18n!./Search/nls/Search".split(" "),function(F,G,y,f,g,d,r,z,A,B,C,D,E,t,e,l,h){return function(u){function b(a){a=u.call(this)||this;return a._supportsGeolocation=null,a._inputNode=
null,a._searching=null,a._sourceMenuButtonNode=null,a._sourceListNode=null,a._suggestionListNode=null,a._searchResultRenderer=new z({container:document.createElement("div")}),a._suggestPromise=null,a._popupTemplate=new D({title:h.searchResult,content:a._renderSearchResultsContent.bind(a)}),a._relatedTarget=null,a.activeMenu="none",a.activeSource=null,a.activeSourceIndex=null,a.allPlaceholder=null,a.autoNavigate=null,a.autoSelect=null,a.defaultSource=null,a.locationEnabled=!0,a.locationToAddressDistance=
null,a.maxResults=null,a.maxSuggestions=null,a.minSuggestCharacters=null,a.popupEnabled=null,a.popupOpenOnSelect=null,a.popupTemplate=null,a.resultGraphic=null,a.resultGraphicEnabled=null,a.results=null,a.searchAllEnabled=null,a.searchTerm=null,a.selectedResult=null,a.sources=null,a.suggestions=null,a.suggestionsEnabled=null,a.view=null,a.viewModel=new r,a._supportsGeolocation=t.supported(),a}return y(b,u),b.prototype.postInitialize=function(){var a=this;this.viewModel.popupTemplate=this._popupTemplate;
this.own(C.watch(this,"searchTerm",function(c){(c&&"warning"===a.activeMenu||!c&&!a.get("viewModel.selectedSuggestion.location"))&&(a.activeMenu="none")}))},b.prototype.destroy=function(){this._cancelSuggest();this._searchResultRenderer&&(this._searchResultRenderer.viewModel=null,this._searchResultRenderer.destroy(),this._searchResultRenderer=null)},Object.defineProperty(b.prototype,"state",{get:function(){return 0===this.sources.length?"disabled":this._searching?"searching":"ready"},enumerable:!0,
configurable:!0}),b.prototype.clear=function(){},b.prototype.focus=function(){this._inputNode&&(this.activeMenu="suggestion",this._inputNode.focus(),this.emit("search-focus"))},b.prototype.blur=function(a){this._inputNode&&(this._inputNode.blur(),this._inputBlur(a),this.emit("search-blur"))},b.prototype.search=function(a){var c=this;this.activeMenu="none";this._cancelSuggest();a=this.viewModel.search(a).then(function(a){return c.activeMenu=a.numResults?"none":"warning",a}).otherwise(function(){return c.activeMenu=
"none",null}).always(function(a){return c._searching=null,c.notifyChange("state"),a});return this._searching=a.isFulfilled()?null:a,this.notifyChange("state"),a},b.prototype.suggest=function(a){var c=this;this._cancelSuggest();a=this.viewModel.suggest(a).then(function(a){return a.numResults&&(c.activeMenu="suggestion"),c._scrollToTopSuggestion(),a}).otherwise(function(){return null});return this._suggestPromise=a,a},b.prototype.render=function(){var a=this,c=this.viewModel,b=c.placeholder,e=c.searchTerm,
f=this._getSourceName(c.activeSourceIndex),g=(""+e).trim(),k=this.activeMenu,p=this.id,v=this.state,q=this.id+"-suggest-menu",b=d.tsx("input",{bind:this,placeholder:b,"aria-label":h.searchButtonTitle,maxlength:c.maxInputLength,autocomplete:"off",type:"text",tabindex:"0","class":"esri-search__input","aria-autocomplete":"list",value:e,"aria-haspopup":"true","aria-owns":q,role:"textbox",onkeydown:this._handleInputKeydown,onkeyup:this._handleInputKeyup,onclick:this._handleInputClick,oninput:this._handleInputPaste,
onpaste:this._handleInputPaste,afterCreate:this._storeInputNode,afterUpdate:this._storeInputNode,onfocusout:this._storeRelatedTarget,onfocus:this.focus,onblur:this.blur,title:e?"":b}),b=d.tsx("form",{key:"esri-search__form",bind:this,"class":"esri-search__form",onsubmit:this._formSubmit,role:"search"},b),m=e?d.tsx("div",{key:"esri-search__clear-button",bind:this,role:"button","class":d.join("esri-search__clear-button","esri-widget-button"),tabindex:"0",title:h.clearButtonTitle,onfocus:this._clearButtonFocus,
onclick:this._handleClearButtonClick,onkeydown:this._handleClearButtonClick},d.tsx("span",{"aria-hidden":"true","class":"esri-icon-close"})):null,l=this.locationEnabled&&this._supportsGeolocation&&!g?d.tsx("ul",{key:"esri-search__suggestion-list-current-location"},d.tsx("li",{bind:this,onclick:this._handleUseCurrentLocationClick,onkeydown:this._handleUseCurrentLocationClick,onkeyup:this._handleSuggestionKeyup,role:"menuitem",tabindex:"-1"},d.tsx("span",{"aria-hidden":"true",role:"presentation","class":"esri-icon-locate-circled"}),
" ",h.useCurrentLocation)):null,t=1<c.sources.length&&c.activeSourceIndex===r.ALL_INDEX,u=c.suggestions?c.suggestions.map(function(c,b){var e=c.sourceIndex,x=c.results.length;b=x&&t?a._getSuggestionHeaderNode(e):null;c=c.results.map(function(c,b){return a._getSuggestionNode(c,b,e)});c=x?d.tsx("ul",{key:"esri-search__suggestion-list-"+e},c):null;return[b,c]}):null,q=d.tsx("div",{id:q,"aria-expanded":"suggestion"===k,key:"esri-search__suggestions-menu","class":d.join("esri-menu","esri-search__suggestions-menu"),
role:"menu",bind:this,afterCreate:this._storeSuggestionsListNode,afterUpdate:this._storeSuggestionsListNode},l,u),q=d.tsx("div",{key:"esri-search__input-container","class":"esri-search__input-container"},b,q,m),b=d.tsx("div",{key:"esri-search__submit-button",bind:this,role:"button",title:h.searchButtonTitle,"class":d.join("esri-search__submit-button","esri-widget-button"),tabindex:"0",onclick:this._handleSearchButtonClick,onkeydown:this._handleSearchButtonClick},d.tsx("span",{"aria-hidden":"true",
role:"presentation","class":"esri-icon-search"}),d.tsx("span",{"class":"esri-icon-font-fallback-text"},h.searchButtonTitle)),e=g?B.substitute({value:'"'+e+'"'},h.noResultsFoundForValue):h.noResultsFound,e=c.get("selectedSuggestion.location")||g?d.tsx("div",{key:"esri-search__no_results"},d.tsx("div",{"class":"esri-search__warning-header"},h.noResults),d.tsx("div",{"class":"esri-search__warning-text"},e)):null,g=c.get("selectedSuggestion.location")||g?null:d.tsx("div",{key:"esri-search__empty-search"},
d.tsx("span",{"aria-hidden":"true","class":"esri-icon-notice-triangle"}),d.tsx("span",{"class":"esri-search__no-value-text"},h.emptyValue)),g=d.tsx("div",{key:"esri-search__error-menu","class":d.join("esri-menu","esri-search__warning-menu")},d.tsx("div",{"class":"esri-search__warning-body"},e,g)),m=c.sources,e=1<m.length,m=m&&m.toArray(),c=c.searchAllEnabled?this._getSourceNode(r.ALL_INDEX):null,p=p+"-source-menu",f=e?d.tsx("div",{key:"esri-search__source-menu-button",bind:this,role:"button",title:h.searchIn,
"aria-haspopup":"true","aria-expanded":"source"===k,"aria-controls":p,"class":d.join("esri-search__sources-button","esri-widget-button"),tabindex:"0",onkeydown:this._handleSourceMenuButtonKeydown,onclick:this._handleSourcesMenuToggleClick,onkeyup:this._handleSourceMenuButtonKeyup,onblur:this._sourcesButtonBlur,afterCreate:this._storeSourceMenuButtonNode,afterUpdate:this._storeSourceMenuButtonNode},d.tsx("span",{"aria-hidden":"true",role:"presentation","class":"esri-icon-down-arrow esri-search__sources-button--down"}),
d.tsx("span",{"aria-hidden":"true",role:"presentation","class":"esri-icon-up-arrow esri-search__sources-button--up"}),d.tsx("span",{"class":"esri-search__source-name"},f)):null,c=e?d.tsx("ul",{bind:this,afterCreate:this._storeSourcesListNode,afterUpdate:this._storeSourcesListNode},c,m.map(function(c,b){return a._getSourceNode(b)})):null,p=d.tsx("div",{id:p,key:"esri-search__source-menu","class":d.join("esri-menu","esri-search__sources-menu"),role:"menu"},c),k=(n={},n["esri-search--multiple-sources"]=
e,n["esri-search--loading"]="searching"===v,n["esri-search--warning"]="warning"===k,n["esri-search--sources"]="source"===k,n["esri-search--show-suggestions"]="suggestion"===k,n),v=(w={},w["esri-disabled"]="disabled"===v,w);return d.tsx("div",{"class":"esri-search esri-widget",classes:v},d.tsx("div",{role:"presentation",classes:k,"class":"esri-search__container"},f,p,q,b,g));var n,w},b.prototype._handleSourceMenuButtonKeydown=function(a){var c=a.keyCode;return c===e.UP_ARROW||c===e.DOWN_ARROW||c===
e.END||c===e.HOME?(a.preventDefault(),a.stopPropagation(),void(this.activeMenu="source")):void this._handleSourcesMenuToggleClick(a)},b.prototype._handleSourcesMenuToggleClick=function(a){var c="source"===this.activeMenu;if(this.activeMenu=c?"none":"source",this.renderNow(),c)return void(this._sourceMenuButtonNode&&this._sourceMenuButtonNode.focus());(c=this._sourceListNode?l("li",this._sourceListNode):null)&&(a=a.keyCode===e.END?c[c.length-1]:c[0])&&a.focus()},b.prototype._handleClearButtonClick=
function(){this.viewModel.clear();this._focus()},b.prototype._handleSearchButtonClick=function(){this.search()},b.prototype._handleSuggestionClick=function(a){(a=a.currentTarget["data-suggestion"])&&(this._focus(),this.search(a))},b.prototype._handleUseCurrentLocationClick=function(){var a=this;this._focus("none");var c=t.getCurrentPosition().then(function(c){return t.positionToPoint(c,a.view).then(function(c){return a.search(c)})}).always(function(c){return a._searching=null,a.notifyChange("state"),
c});this._searching=c.isFulfilled()?null:c;this.notifyChange("state")},b.prototype._handleSourceClick=function(a){this.viewModel.activeSourceIndex=a.currentTarget["data-source-index"];this._focus("none")},b.prototype._sourcesButtonBlur=function(a){this._removeActiveMenu(a&&a.relatedTarget,this._sourceListNode)},b.prototype._inputBlur=function(a){a=a&&a.relatedTarget;this._removeActiveMenu(a?a:this._relatedTarget,this._suggestionListNode)},b.prototype._storeRelatedTarget=function(a){this._relatedTarget=
a.relatedTarget},b.prototype._clearButtonFocus=function(){this.activeMenu="none"},b.prototype._removeActiveMenu=function(a,c){a&&c&&c.contains(a)||(this.activeMenu="none")},b.prototype._cancelSuggest=function(){var a=this._suggestPromise;a&&(a.cancel(),this._suggestPromise=null)},b.prototype._storeSuggestionsListNode=function(a){this._suggestionListNode=a},b.prototype._storeSourcesListNode=function(a){this._sourceListNode=a},b.prototype._storeInputNode=function(a){this._inputNode=a},b.prototype._storeSourceMenuButtonNode=
function(a){this._sourceMenuButtonNode=a},b.prototype._handleInputKeydown=function(a){var c=a.keyCode;(c===e.TAB||c===e.ESCAPE||a.shiftKey&&c===e.TAB)&&this._cancelSuggest()},b.prototype._handleInputKeyup=function(a){var c=a.keyCode,b=a.ctrlKey||a.metaKey||c===e.copyKey||c===e.LEFT_ARROW||c===e.RIGHT_ARROW||c===e.ENTER||c===e.SHIFT,d=this._suggestionListNode?l("li",this._suggestionListNode):null;if(!b){if(c===e.TAB||c===e.ESCAPE||a.shiftKey&&c===e.TAB)return this._cancelSuggest(),void(c===e.ESCAPE&&
(this.activeMenu="none"));if((c===e.UP_ARROW||c===e.DOWN_ARROW)&&d)return this.activeMenu="suggestion",a.stopPropagation(),a.preventDefault(),this._cancelSuggest(),a=d[c===e.UP_ARROW?d.length-1:0],void(a&&a.focus());this.viewModel.searchTerm&&this.suggest()}},b.prototype._scrollToTopSuggestion=function(){this._suggestionListNode&&(this._suggestionListNode.scrollTop=0)},b.prototype._handleInputClick=function(a){this.activeMenu="suggestion"},b.prototype._handleInputPaste=function(a){var c=this.viewModel;
a=a.target;c.searchTerm!==a.value&&(c.searchTerm=a.value);c.searchTerm&&this.suggest()},b.prototype._handleSourceMenuButtonKeyup=function(a){var c=a.keyCode;if(c===e.UP_ARROW||c===e.DOWN_ARROW||c===e.HOME||c===e.END)a.stopPropagation(),a.preventDefault(),(a=this._sourceListNode?l("li",this._sourceListNode):null)&&(c=a[c===e.UP_ARROW||c===e.END?a.length-1:0])&&c.focus()},b.prototype._handleSourceKeyup=function(a){var c=a.target,b=this._sourceListNode?l("li",this._sourceListNode):null,d=a.keyCode;if(d===
e.ESCAPE)return this._focus("none"),void(this._sourceMenuButtonNode&&this._sourceMenuButtonNode.focus());if(b){c=b.indexOf(c);if((d===e.HOME||d===e.END||d===e.UP_ARROW||d===e.DOWN_ARROW)&&(a.stopPropagation(),a.preventDefault()),d===e.HOME)return b=b[0],void(b&&b.focus());if(d===e.END)return b=b[b.length-1],void(b&&b.focus());if(d===e.UP_ARROW)return a=c-1,b=0>a?this._sourceMenuButtonNode:b[a],void(b&&b.focus());d===e.DOWN_ARROW&&(a=c+1,(b=a>=b.length?this._sourceMenuButtonNode:b[a])&&b.focus())}},
b.prototype._handleSuggestionKeyup=function(a){var c=a.target,b=this._suggestionListNode?l("li",this._suggestionListNode):null,c=b.indexOf(c),d=a.keyCode;if(this._cancelSuggest(),d===e.BACKSPACE||d===e.DELETE)return void this._focus();if(d===e.ESCAPE)return void this._focus("none");if(b){((d===e.HOME||d===e.END||d===e.UP_ARROW||d===e.DOWN_ARROW)&&(a.stopPropagation(),a.preventDefault()),d===e.HOME)&&(a=b[0])&&a.focus();d===e.END&&(a=b[b.length-1])&&a.focus();if(d===e.UP_ARROW)return--c,b=0>c?b[b.length-
1]:b[c],void(b&&b.focus());if(d===e.DOWN_ARROW)return c+=1,b=c>=b.length?b[0]:b[c],void(b&&b.focus())}},b.prototype._focus=function(a){this.focus();a&&(this.activeMenu=a)},b.prototype._formSubmit=function(a){a.preventDefault();this.search()},b.prototype._getSourceName=function(a){var b=this.viewModel.sources.getItemAt(a);return a===r.ALL_INDEX?h.all:b?b.name:h.untitledSource},b.prototype._getSuggestionHeaderNode=function(a){var b=this._getSourceName(a);return d.tsx("div",{key:"esri-search__suggestion-header-"+
a,"class":"esri-header"},b)},b.prototype._splitResult=function(a,b){b=E.escapeString(b);return a.replace(new RegExp("(^|)("+b+")(|$)","ig"),"$1|$2|$3").split("|")},b.prototype._getSuggestionNode=function(a,b,e){var c=this.viewModel.searchTerm;if(c){var f=this._splitResult(a.text||h.untitledResult,c),g=c.toLowerCase(),k=[];return f.forEach(function(a,c){a&&a.length&&(c=e+"-"+b+"-"+c,a.toLowerCase()===g?k.push(d.tsx("strong",{key:"esri-search__partial-match-"+c},a)):k.push(a))}),d.tsx("li",{bind:this,
onclick:this._handleSuggestionClick,onkeydown:this._handleSuggestionClick,onkeyup:this._handleSuggestionKeyup,key:"esri-search__suggestion$-{sourceIndex}_"+b,"data-suggestion":a,role:"menuitem",tabindex:"-1"},k)}},b.prototype._getSourceNode=function(a){var b=(e={},e["esri-search__source--active"]=a===this.viewModel.activeSourceIndex,e);return d.tsx("li",{bind:this,key:"esri-search__source-"+a,onclick:this._handleSourceClick,onkeydown:this._handleSourceClick,onkeyup:this._handleSourceKeyup,"data-source-index":a,
role:"menuitem","class":"esri-search__source",classes:b,tabindex:"-1"},this._getSourceName(a));var e},b.prototype._renderSearchResultsContent=function(){return this._searchResultRenderer.showMoreResultsOpen=!1,this._searchResultRenderer.viewModel=this.viewModel,this._searchResultRenderer},f([g.property(),d.renderable()],b.prototype,"activeMenu",void 0),f([g.aliasOf("viewModel.activeSource"),d.renderable()],b.prototype,"activeSource",void 0),f([g.aliasOf("viewModel.activeSourceIndex"),d.renderable()],
b.prototype,"activeSourceIndex",void 0),f([g.aliasOf("viewModel.allPlaceholder"),d.renderable()],b.prototype,"allPlaceholder",void 0),f([g.aliasOf("viewModel.autoNavigate")],b.prototype,"autoNavigate",void 0),f([g.aliasOf("viewModel.autoSelect")],b.prototype,"autoSelect",void 0),f([g.aliasOf("viewModel.defaultSource")],b.prototype,"defaultSource",void 0),f([g.property()],b.prototype,"locationEnabled",void 0),f([g.aliasOf("viewModel.locationToAddressDistance")],b.prototype,"locationToAddressDistance",
void 0),f([g.aliasOf("viewModel.maxResults")],b.prototype,"maxResults",void 0),f([g.aliasOf("viewModel.maxSuggestions")],b.prototype,"maxSuggestions",void 0),f([g.aliasOf("viewModel.minSuggestCharacters")],b.prototype,"minSuggestCharacters",void 0),f([g.aliasOf("viewModel.popupEnabled")],b.prototype,"popupEnabled",void 0),f([g.aliasOf("viewModel.popupOpenOnSelect")],b.prototype,"popupOpenOnSelect",void 0),f([g.aliasOf("viewModel.popupTemplate")],b.prototype,"popupTemplate",void 0),f([g.aliasOf("viewModel.resultGraphic")],
b.prototype,"resultGraphic",void 0),f([g.aliasOf("viewModel.resultGraphicEnabled")],b.prototype,"resultGraphicEnabled",void 0),f([g.aliasOf("viewModel.results"),d.renderable()],b.prototype,"results",void 0),f([g.aliasOf("viewModel.searchAllEnabled"),d.renderable()],b.prototype,"searchAllEnabled",void 0),f([g.aliasOf("viewModel.searchTerm"),d.renderable()],b.prototype,"searchTerm",void 0),f([g.aliasOf("viewModel.selectedResult")],b.prototype,"selectedResult",void 0),f([g.aliasOf("viewModel.sources"),
d.renderable()],b.prototype,"sources",void 0),f([g.property({readOnly:!0,dependsOn:["sources.length"]}),d.renderable()],b.prototype,"state",null),f([g.aliasOf("viewModel.suggestions"),d.renderable()],b.prototype,"suggestions",void 0),f([g.aliasOf("viewModel.suggestionsEnabled")],b.prototype,"suggestionsEnabled",void 0),f([g.aliasOf("viewModel.view"),d.renderable()],b.prototype,"view",void 0),f([d.vmEvent("search-complete search-clear search-start select-result suggest-start suggest-complete".split(" ")),
g.property({type:r}),d.renderable(["viewModel.activeSource.placeholder","viewModel.activeSource.name"])],b.prototype,"viewModel",void 0),f([g.aliasOf("viewModel.clear")],b.prototype,"clear",null),f([d.accessibleHandler()],b.prototype,"_handleSourcesMenuToggleClick",null),f([d.accessibleHandler()],b.prototype,"_handleClearButtonClick",null),f([d.accessibleHandler()],b.prototype,"_handleSearchButtonClick",null),f([d.accessibleHandler()],b.prototype,"_handleSuggestionClick",null),f([d.accessibleHandler()],
b.prototype,"_handleUseCurrentLocationClick",null),f([d.accessibleHandler()],b.prototype,"_handleSourceClick",null),b=f([g.subclass("esri.widgets.Search")],b)}(g.declared(A))});