//>>built
define(["../../core/Accessor","../../core/kebabDictionary","../../core/lang","../../geometry/support/jsonUtils"],function(c,d,e,f){var g=d({esriSpatialRelIntersects:"intersects",esriSpatialRelContains:"contains",esriSpatialRelCrosses:"crosses",esriSpatialRelEnvelopeIntersects:"envelope-intersects",esriSpatialRelIndexIntersects:"index-intersects",esriSpatialRelOverlaps:"overlaps",esriSpatialRelTouches:"touches",esriSpatialRelWithin:"within",esriSpatialRelRelation:"relation"});return c.createSubclass({declaredClass:"esri.tasks.support.DataLayer",
properties:{geometry:null,name:null,spatialRelationship:null,where:null},toJSON:function(){var a={type:"layer",layerName:this.name,where:this.where,spatialRel:g.toJSON(this.spatialRelationship)},b=this.geometry;return b&&(a.geometryType=f.getJsonType(b),a.geometry=b.toJSON()),e.filter(a,function(a){return null!==a?!0:void 0})}})});