//>>built
define("./Credential ../core/domUtils ../core/lang ../core/Error ../core/urlUtils dijit/Dialog dijit/registry dojo/Deferred dojo/_base/kernel dojo/dom-attr dojo/i18n!./nls/identity dojo/io-query dojo/sniff dijit/form/Button dojo/query".split(" "),function(p,h,q,k,r,l,m,t,f,u,v,n,w){return{_oAuthDfd:null,_oAuthIntervalId:0,_oAuthDialogContent:"\x3cdiv class\x3d'dijitDialogPaneContentArea'\x3e\x3cdiv style\x3d'padding-bottom: 5px; word-wrap: break-word;'\x3e{oAuthInfo}\x3c/div\x3e\x3cdiv style\x3d'margin: 0px; padding: 0px; height: 10px;'\x3e\x3c/div\x3e\x3cdiv class\x3d'esriErrorMsg' style\x3d'display: none; color: white; background-color: #D46464; text-align: center; padding-top: 3px; padding-bottom: 3px;'\x3e{invalidUser}\x3c/div\x3e\x3cdiv style\x3d'margin: 0px; padding: 0px; height: 10px;'\x3e\x3c/div\x3e\x3cdiv class\x3d'dijitDialogPaneActionBar'\x3e\x3cbutton data-dojo-type\x3d'dijit.form.Button' data-dojo-props\x3d'type:\"button\", \"class\":\"esriIdSubmit\"'\x3e{lblOk}\x3c/button\x3e\x3cbutton data-dojo-type\x3d'dijit.form.Button' data-dojo-props\x3d'type:\"button\", \"class\":\"esriIdCancel\"'\x3e{lblCancel}\x3c/button\x3e\x3c/div\x3e",
setOAuthRedirectionHandler:function(b){this._oAuthRedirectFunc=b},oAuthSignIn:function(b,c,a,d){var e=this._oAuthDfd=new t;e.resUrl_=b;e.sinfo_=c;e.oinfo_=a;var k=!d||!1!==d.oAuthPopupConfirmation;if(!a.popup||!k)return this._doOAuthSignIn(b,c,a),e.promise;this._nls||(this._nls=v);this.oAuthDialog||(this.oAuthDialog=this._createOAuthDialog());b=this.oAuthDialog;c=d&&d.error;d=d&&d.token;return h.hide(b.errMsg_),c&&c.details&&403==c.details.httpStatus&&d&&(u.set(b.errMsg_,"innerHTML",this._nls.forbidden),
h.show(b.errMsg_)),b.show(),e.promise},setOAuthResponseHash:function(b){var c=this._oAuthDfd;if(this._oAuthDfd=null,c&&b)if(clearInterval(this._oAuthIntervalId),"#"===b.charAt(0)&&(b=b.substring(1)),b=n.queryToObject(b),b.error){var a="access_denied"===b.error;b=new k(a?"identity-manager:user-aborted":"identity-manager:authentication-failed",a?"ABORTED":"OAuth: "+b.error+" - "+b.error_description);c.reject(b)}else{var a=c.oinfo_._oAuthCred,d=new p({userId:b.username,server:c.sinfo_.server,token:b.access_token,
expires:(new Date).getTime()+1E3*Number(b.expires_in),ssl:"true"===b.ssl,_oAuthCred:a});a.storage=b.persist?window.localStorage:window.sessionStorage;a.token=d.token;a.expires=d.expires;a.userId=d.userId;a.ssl=d.ssl;a.save();c.resolve(d)}},_createOAuthDialog:function(){var b=this._nls,c=q.substitute(b,this._oAuthDialogContent),a=new l({title:b.title,content:c,"class":"esri-widget esriOAuthSignInDialog esriIdentityDialog",style:"min-width: 18em;",esriIdMgr_:this,execute_:function(){var b=a.esriIdMgr_._oAuthDfd;
a.hide_();a.esriIdMgr_._doOAuthSignIn(b.resUrl_,b.sinfo_,b.oinfo_)},cancel_:function(){var b=a.esriIdMgr_._oAuthDfd;a.esriIdMgr_._oAuthDfd=null;a.hide_();var c=new k("identity-manager:user-aborted","ABORTED");b.reject(c)},hide_:function(){h.hide(a.errMsg_);a.hide();l._DialogLevelManager.hide(a)}}),b=a.domNode;return a.btnSubmit_=m.byNode(f.query(".esriIdSubmit",b)[0]),a.btnCancel_=m.byNode(f.query(".esriIdCancel",b)[0]),a.errMsg_=f.query(".esriErrorMsg",b)[0],a.connect(a.btnSubmit_,"onClick",a.execute_),
a.connect(a.btnCancel_,"onClick",a.onCancel),a.connect(a,"onCancel",a.cancel_),a},_doOAuthSignIn:function(b,c,a){var d=this,e={client_id:a.appId,response_type:"token",state:JSON.stringify({portalUrl:a.portalUrl}),expiration:a.expiration,locale:a.locale,redirect_uri:a.popup?r.makeAbsolute(a.popupCallbackUrl):window.location.href.replace(/#.*$/,"")};a.forceLogin&&(e.force_login=!0);var h=a.portalUrl.replace(/^http:/i,"https:")+"/sharing/oauth2/authorize",f=h+"?"+n.objectToQuery(e);if(a.popup){var g;
(7===w("ie")?(g=window.open(a.popupCallbackUrl,"esriJSAPIOAuth",a.popupWindowFeatures),g.location=f):g=window.open(f,"esriJSAPIOAuth",a.popupWindowFeatures),g)?(g.focus(),this._oAuthDfd.oAuthWin_=g,this._oAuthIntervalId=setInterval(function(){if(g.closed){clearInterval(d._oAuthIntervalId);var a=d._oAuthDfd;if(a){var b=new k("identity-manager:user-aborted","ABORTED");a.reject(b)}}},500)):(b=new k("identity-manager:popup-blocked","ABORTED"),this._oAuthDfd.reject(b))}else this._oAuthRedirectFunc?this._oAuthRedirectFunc({authorizeParams:e,
authorizeUrl:h,resourceUrl:b,serverInfo:c,oAuthInfo:a}):window.location=f}}});