//>>built
define(["../../core/declare","dojo/_base/array"],function(d,c){return d(null,{declaredClass:"esri.layers.support.WMSLayerInfo",name:null,title:null,description:null,extent:null,legendURL:null,subLayers:[],allExtents:[],spatialReferences:[],constructor:function(a){a&&(this.name=a.name,this.title=a.title,this.description=a.description,this.extent=a.extent,this.legendURL=a.legendURL,this.subLayers=a.subLayers?a.subLayers:[],this.allExtents=a.allExtents?a.allExtents:[],this.spatialReferences=a.spatialReferences?
a.spatialReferences:[])},clone:function(){var a,b={name:this.name,title:this.title,description:this.description,legendURL:this.legendURL};this.extent&&(b.extent=this.extent.getExtent());b.subLayers=[];c.forEach(this.subLayers,function(a){b.subLayers.push(a.clone())});b.allExtents=[];for(a in this.allExtents)a=parseInt(a,10),isNaN(a)||(b.allExtents[a]=this.allExtents[a].getExtent());return b.spatialReferences=[],c.forEach(this.spatialReferences,function(a){b.spatialReferences.push(a)}),b}})});