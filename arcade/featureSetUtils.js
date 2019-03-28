// COPYRIGHT © 2018 Esri
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
// See http://js.arcgis.com/4.11/esri/copyright.txt for details.

define(["require","exports","../core/tsSupport/extendsHelper","../core/tsSupport/assignHelper","../request","./featureSetCollection","./featureset/polyfill/FeatureLayerAndTable","./featureset/sources/FeatureLayerDynamic","./featureset/sources/FeatureLayerMemory","./featureset/support/cache","./featureset/support/FeatureSet","../core/promiseUtils","../layers/FeatureLayer","../portal/PortalItem","./featureset/actions/OrderBy","./featureset/actions/Top","./featureset/actions/SpatialFilter","./featureset/actions/AttributeFilter"],function(e,t,r,a,i,n,o,l,u,s,c,d,f,h){function p(){null===s.applicationCache&&(s.applicationCache=new s)}function v(e,t){if(s.applicationCache){var r=s.applicationCache.getLayerInfo(e);if(r)return r.then(function(r){return d.resolve(new o({url:e,outFields:t,resourceInfo:r}))});var a=new o({url:e,outFields:t}),i=d.create(function(t,r){s.applicationCache&&s.applicationCache.setLayerInfo(e,i),a.load().then(function(){t(a.resourceInfo)},function(t){s.applicationCache&&s.applicationCache.clearLayerInfo(e),r(t)})});return i.then(function(e){return d.resolve(a)})}return d.resolve(new o({url:e,outFields:t}))}function y(e,t,r,a,i){return v(e,["*"]).then(function(e){return d.resolve(m(e,t,r,a,i))})}function m(e,t,r,a,i){return void 0===t&&(t=null),void 0===r&&(r=null),void 0===a&&(a=!0),void 0===i&&(i=null),!0===e._hasMemorySource()?new u({layer:e,spatialReference:t,outFields:r,includeGeometry:a,lrucache:i}):new l({layer:e,spatialReference:t,outFields:r,includeGeometry:a,lrucache:i})}function _(e,t,r){return void 0===r&&(r=null),new L(e,t,r)}function F(e,t,r){return void 0===r&&(r=null),new b(e,t,r)}function S(e,t,r,a,i,n,l){if(s.applicationCache){var u=s.applicationCache.getLayerInfo(e+":"+n.url);if(u)return u.then(function(e){try{var n=new o({url:e.url+"/"+t,outFields:["*"]});return d.resolve(m(n,r,a,i,l))}catch(e){return d.reject(e)}},function(e){return d.reject(e)})}return d.create(function(u,c){var d=new h({id:e,portal:n}),f=d.load();s.applicationCache&&s.applicationCache.setLayerInfo(e+":"+n.url,f),f.then(function(e){try{var n=new o({url:e.url+"/"+t,outFields:["*"]});u(m(n,r,a,i,l))}catch(e){c(e)}},function(t){s.applicationCache&&s.applicationCache.clearLayerInfo(e+":"+n.url),c(t)})})}Object.defineProperty(t,"__esModule",{value:!0}),t.initialiseMetaDataCache=p,t.constructFeatureSetFromUrl=y,t.constructFeatureSet=m,c._polyfill.table=o;var L=function(e){function t(t,r,a){void 0===r&&(r=null),void 0===a&&(a=null);var i=e.call(this)||this;return i._map=t,i._overridespref=r,i.lrucache=a,i._instantLayers=[],i}return r(t,e),t.prototype.makeAndAddFeatureSet=function(e,t,r){void 0===t&&(t=!0),void 0===r&&(r=null);var a=m(e,this._overridespref,null===r?["*"]:r,t,this.lrucache);return this._instantLayers.push({featureset:a,opitem:e,includeGeometry:t,outFields:JSON.stringify(r)}),a},t.prototype.featureSetByName=function(e,t,r){var i=this;if(void 0===t&&(t=!0),void 0===r&&(r=null),void 0!==this._map.loaded&&void 0!==this._map.load&&!1===this._map.loaded)return this._map.load().then(function(){try{return i.featureSetByName(e,t,r)}catch(e){return d.reject(e)}});null===r&&(r=["*"]),r=r.slice(0),r=r.sort();for(var n=JSON.stringify(r),l=0;l<this._instantLayers.length;l++){var u=this._instantLayers[l];if(u.opitem.title===e&&u.includeGeometry===t&&u.outFields===n)return this.resolvePromise(this._instantLayers[l].featureset)}var s=this._map.layers.find(function(t){return t instanceof f&&t.title===e});if(s)return this.resolvePromise(this.makeAndAddFeatureSet(s,t,r));if(this._map.tables){var c=this._map.tables.find(function(t){return!!(t.title&&t.title===e||t.title&&t.title===e)});if(c){if(c._materializedTable);else{var h=c.outFields?c:a({},c,{outFields:["*"]});c._materializedTable=new o(h)}return c._materializedTable.load().then(function(){return i.resolvePromise(i.makeAndAddFeatureSet(c._materializedTable,t,r))})}}return this.resolvePromise(null)},t.prototype.featureSetById=function(e,t,r){var i=this;if(void 0===t&&(t=!0),void 0===r&&(r=["*"]),void 0!==this._map.loaded&&void 0!==this._map.load&&!1===this._map.loaded)return this._map.load().then(function(){try{return i.featureSetById(e,t,r)}catch(e){return d.reject(e)}});null===r&&(r=["*"]),r=r.slice(0),r=r.sort();for(var n=JSON.stringify(r),l=0;l<this._instantLayers.length;l++){var u=this._instantLayers[l];if(u.opitem.id===e&&u.includeGeometry===t&&u.outFields===n)return this.resolvePromise(this._instantLayers[l].featureset)}var s=this._map.layers.find(function(t){return t instanceof f&&t.id===e});if(s)return this.resolvePromise(this.makeAndAddFeatureSet(s,t,r));if(this._map.tables){var c=this._map.tables.find(function(t){return t.id===e});if(c){if(c._materializedTable);else{var h=a({},c,{outFields:["*"]});c._materializedTable=new o(h)}return c._materializedTable.load().then(function(){return i.resolvePromise(i.makeAndAddFeatureSet(c._materializedTable,t,r))})}}return this.resolvePromise(null)},t}(n),b=function(e){function t(t,r,a){void 0===r&&(r=null),void 0===a&&(a=null);var i=e.call(this)||this;return i._url=t,i._overridespref=r,i.lrucache=a,i.metadata=null,i._instantLayers=[],i}return r(t,e),Object.defineProperty(t.prototype,"url",{get:function(){return this._url},enumerable:!0,configurable:!0}),t.prototype.makeAndAddFeatureSet=function(e,t,r){void 0===t&&(t=!0),void 0===r&&(r=null);var a=m(e,this._overridespref,null===r?["*"]:r,t,this.lrucache);return this._instantLayers.push({featureset:a,opitem:e,includeGeometry:t,outFields:JSON.stringify(r)}),a},t.prototype._loadMetaData=function(){var e=this;if(null!==s.applicationCache){var t=s.applicationCache.getLayerInfo(this._url);if(null!==t)return t.then(function(t){return e.metadata=t,d.resolve(e.metadata)})}var r=i(this._url,{responseType:"json",query:{f:"json"}}).then(function(t){return t.data?(e.metadata={layers:t.data.layers?t.data.layers:[],tables:t.data.tables?t.data.tables:[]},d.resolve(e.metadata)):(e.metadata={layers:[],tables:[]},d.resolve(e.metadata))},function(t){return s.applicationCache&&s.applicationCache.clearLayerInfo(e._url),d.reject(t)});return null!==s.applicationCache&&s.applicationCache.setLayerInfo(this._url,r),r},t.prototype.load=function(){return this._loadMetaData()},t.prototype.clone=function(){return new t(this._url,this._overridespref,this.lrucache)},t.prototype.featureSetByName=function(e,t,r){var a=this;void 0===t&&(t=!0),void 0===r&&(r=null),null===r&&(r=["*"]),r=r.slice(0),r=r.sort();for(var i=JSON.stringify(r),n=0;n<this._instantLayers.length;n++){var o=this._instantLayers[n];if(o.opitem.title===e&&o.includeGeometry===t&&o.outFields===i)return this.resolvePromise(this._instantLayers[n].featureset)}return this._loadMetaData().then(function(i){for(var n=null,o=0,l=i.layers?i.layers:[];o<l.length;o++){var u=l[o];u.name===e&&(n=u)}if(!n)for(var s=0,c=i.tables?i.tables:[];s<c.length;s++){var u=c[s];u.name===e&&(n=u)}return n?v(a._url+"/"+n.id,["*"]).then(function(e){return a.makeAndAddFeatureSet(e,t,r)}):a.resolvePromise(null)})},t.prototype.featureSetById=function(e,t,r){var a=this;void 0===t&&(t=!0),void 0===r&&(r=["*"]),null===r&&(r=["*"]),r=r.slice(0),r=r.sort();var i=JSON.stringify(r);e=null!==e&&void 0!==e?e.toString():"";for(var n=0;n<this._instantLayers.length;n++){var o=this._instantLayers[n];if(o.opitem.id===e&&o.includeGeometry===t&&o.outFields===i)return this.resolvePromise(this._instantLayers[n].featureset)}return this._loadMetaData().then(function(i){for(var n=null,o=0,l=i.layers?i.layers:[];o<l.length;o++){var u=l[o];null!==u.id&&void 0!==u.id&&u.id.toString()===e&&(n=u)}if(!n)for(var s=0,c=i.tables?i.tables:[];s<c.length;s++){var u=c[s];null!==u.id&&void 0!==u.id&&u.id.toString()===e&&(n=u)}return n?v(a._url+"/"+n.id,["*"]).then(function(e){return a.makeAndAddFeatureSet(e,t,r)}):a.resolvePromise(null)})},t}(n);t.createFeatureSetCollectionFromMap=_,t.createFeatureSetCollectionFromService=F,t.constructFeatureSetFromPortalItem=S});