// COPYRIGHT © 2019 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/next/esri/copyright.txt for details.

define(["require","exports","../../../../core/tsSupport/declareExtendsHelper","../../../../core/tsSupport/decorateHelper","../../../../core/Accessor","../../../../core/Evented","../../../../core/Handles","../../../../core/iteratorUtils","../../../../core/PooledArray","../../../../core/accessorSupport/decorators","../../../../geometry/support/aaBoundingRect","../../../support/index"],function(t,e,i,r,n,s,a,o,h,p,d,c){var l=function(){function t(){this.extents=new h({allocator:function(t){return t||d.create()}}),this.tempExtent=d.create(),this.dirty=!1}return Object.defineProperty(t.prototype,"length",{get:function(){return this.extents.length},enumerable:!0,configurable:!0}),t.prototype.clear=function(){this.extents.clear()},t.prototype.add=function(t){this.contains(t)||(this.removeContained(t),d.set(this.extents.pushNew(),t),this.dirty=!0)},t.prototype.pop=function(){return this.dirty&&(this.mergeTight(),this.dirty=!1),this.extents.pop()},t.prototype.mergeTight=function(){for(var t=this.extents,e=this.tempExtent,i=!1;!i;){i=!0;for(var r=0;r<t.length;++r)if(function(i){for(var r=t.data[i],n=d.area(r),s=!1,a=t.length-1;a>i;--a){var o=t.data[a],h=d.area(o);d.expand(r,o,e);var p=n+h;(d.area(e)-p)/p<.05&&(d.set(r,e),n=d.area(r),t.swapElements(a,t.length-1),t.pop(),s=!0)}return s}(r)){i=!1;break}}},t.prototype.containsPoint=function(t){return this.extents.some(function(e){return d.containsPoint(e,t)})},t.prototype.contains=function(t){return this.extents.some(function(e){return d.contains(e,t)})},t.prototype.removeContained=function(t){for(var e=this.extents.length-1;e>=0;--e)d.contains(t,this.extents.data[e])&&this.extents.removeUnorderedIndex(e)},t}();return function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.dirtyExtents=new l,e.globalDirty=!1,e.dirtyGraphicsSet=new Set,e.handles=new a,e.updateElevation=!1,e.layerView=null,e.graphicsCore=null,e.events=new s,e}return i(e,t),Object.defineProperty(e.prototype,"updating",{get:function(){return this.needsUpdate()},enumerable:!0,configurable:!0}),e.prototype.setup=function(t,e,i,r){var n=this;this.layerView=t,this.queryGraphicUIDsInExtent=e,this.graphicsCore=i,this.elevationProvider=r;var s=this.layerView.view.resourceController.scheduler;this.handles.add([r.on("elevation-change",function(t){("scene"!==t.context||i.layer.elevationInfo&&"relative-to-scene"===i.layer.elevationInfo.mode)&&n.elevationUpdateHandler(t)}),this.layerView.watch("suspended",function(){return n.suspendedChange()}),s.registerTask(c.Task.ELEVATION_ALIGNMENT,function(t){return n.update(t)},function(){return n.needsUpdate()})])},e.prototype.destroy=function(){this.dirtyGraphicsSet=null,this.handles.destroy(),this.handles=null,this.layerView=null,this.graphicsCore=null,this.queryGraphicUIDsInExtent=null},e.prototype.clear=function(){this.dirtyGraphicsSet.clear(),this.notifyChange("updating")},e.prototype.suspendedChange=function(){!0===this.layerView.suspended?this.updateElevation=!1:!1===this.layerView.suspended&&this.updateElevation&&(this.globalDirty=!0,this.notifyChange("updating"))},e.prototype.elevationInfoChange=function(){this.globalDirty=!0,this.notifyChange("updating")},e.prototype.needsUpdate=function(){return this.dirtyGraphicsSet&&this.dirtyGraphicsSet.size>0||this.dirtyExtents&&this.dirtyExtents.length>0||this.globalDirty},e.prototype.update=function(t){for(this.globalDirty&&(this.markAllGraphicsElevationDirty(),this.globalDirty=!1,t.madeProgress());this.needsUpdate()&&!t.done;)this._updateDirtyGraphics(t),this._updateDirtyExtents(t);this.layerView.view.deconflictor.setDirty(),this.notifyChange("updating")},e.prototype._updateDirtyGraphics=function(t){for(var e=this,i=this.layerView.view,r=this.graphicsCore.stageLayer.id,n=this.layerView.labeling,s=this;this.dirtyGraphicsSet.size>0&&!t.done;)!function(){var a=Math.min(s.dirtyGraphicsSet.size,100);o.everySet(s.dirtyGraphicsSet,function(r){var n=e.graphicsCore.getGraphics3DGraphicById(r);return e.dirtyGraphicsSet.delete(r),n&&n.alignWithElevation(e.elevationProvider,i.renderCoordsHelper,e.graphicsCore.asyncUpdates),t.madeProgress(),--a>0&&!t.done}),i._stage.processDirtyLayer(r),n&&n.processStageDirty()}()},e.prototype._updateDirtyExtents=function(t){for(var e=this;this.dirtyExtents.length>0&&this.dirtyGraphicsSet.size<100&&!t.done;){var i=this.dirtyExtents.pop();this.events.hasEventListener("invalidate-elevation")&&this.events.emit("invalidate-elevation",{extent:i,spatialReference:this.spatialReference}),this.queryGraphicUIDsInExtent(i,this.spatialReference,function(t){var i=e.graphicsCore.getGraphics3DGraphicById(t);i&&i.needsElevationUpdates()&&e.dirtyGraphicsSet.add(t)}),t.madeProgress()}},e.prototype.markAllGraphicsElevationDirty=function(){var t=this;this.dirtyExtents.clear(),this.dirtyGraphicsSet.clear(),this.graphicsCore.graphics3DGraphics.forEach(function(e,i){t.dirtyGraphicsSet.add(i)})},e.prototype.elevationUpdateHandler=function(t){var e=t.extent;if(this.layerView.suspended){if(!this.updateElevation){var i=this.graphicsCore.computedExtent;i&&e[2]>i.xmin&&e[0]<i.xmax&&e[3]>i.ymin&&e[1]<i.ymax&&(this.updateElevation=!0)}}else e[0]===-1/0?this.globalDirty=!0:this.dirtyExtents.add(e),this.spatialReference=t.spatialReference,this.notifyChange("updating")},r([p.property({readOnly:!0})],e.prototype,"updating",null),e=r([p.subclass("esri.views.3d.layers.graphics.Graphics3DElevationAlignment")],e)}(p.declared(n))});