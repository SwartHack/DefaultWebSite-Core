//>>built
define(["require","exports","./Util"],function(e,f,d){return function(){function c(a,b){null==b&&(b=4);var c=d.nextHighestPowerOfTwo(b*a);this.array=new Float32Array(c);this.zeroItem=new Float32Array(a);this.endSlot=0;this.perInstanceDataSize=a;this.emptySlots=[];this.emptySlotsIdx=0;this.id2slot={};this.slot2id=Array(b)}return c.prototype.prepareFree=function(a){this.emptySlots.length+=a},c.prototype.free=function(a){a=this.id2slot[a];null!=a&&(this.emptySlots[this.emptySlotsIdx++]=a,this.slot2id[a]=
void 0)},c.prototype.prepareAllocate=function(a){a-=this.emptySlotsIdx;0<a&&this._resizeArray((this.endSlot+a)*this.perInstanceDataSize)},c.prototype.allocate=function(a){var b;return b=0<this.emptySlotsIdx?this.emptySlots[--this.emptySlotsIdx]:this.endSlot++,this.id2slot[a]=b,this.slot2id[b]=a,b},c.prototype.getSlot=function(a){return this.id2slot[a]},c.prototype.getOffset=function(a){return a*this.perInstanceDataSize},c.prototype.getArray=function(){return this.array},c.prototype.fill=function(a,
b,c){this.array.set(c,a*this.perInstanceDataSize+b)},c.prototype.compact=function(){if(0<this.emptySlotsIdx){this.emptySlots.length=this.emptySlotsIdx;for(this.emptySlots.sort(function(a,b){return a-b});0<this.emptySlotsIdx&&this.emptySlots[this.emptySlotsIdx-1]===this.endSlot;)this.emptySlotsIdx--,this.endSlot--;for(;0<this.emptySlotsIdx;){this.emptySlotsIdx--;var a=this.endSlot-1,b=this.emptySlots[this.emptySlotsIdx],c=a*this.perInstanceDataSize,d=b*this.perInstanceDataSize;this.array.set(this.array.subarray(c,
c+this.perInstanceDataSize),d);this.array.set(this.zeroItem,c);c=this.slot2id[a];this.slot2id[a]=void 0;this.slot2id[b]=c;this.id2slot[c]=b;this.endSlot--}}return this._resizeArray(this.endSlot*this.perInstanceDataSize),this.emptySlots.length=0,this.array},c.prototype._resizeArray=function(a){var b;if(a>this.array.length){for(b=this.array.length||1;a>b;)b*=2;a=new Float32Array(b);a.set(this.array);this.array=a}else if(a<=this.array.length/2){b=this.array.length;for(a*=2;b>=a;)b/=2;a=new Float32Array(b);
a.set(this.array.subarray(0,b));this.array=a}},c}()});