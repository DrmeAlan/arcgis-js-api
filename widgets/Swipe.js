// COPYRIGHT © 2020 Esri
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
// See http://js.arcgis.com/4.15/esri/copyright.txt for details.

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/tsSupport/assignHelper","dojo/i18n!./Swipe/nls/Swipe","../core/events","../core/accessorSupport/decorators","../core/libs/pep/pep","./Widget","./Swipe/SwipeViewModel","./support/widget"],(function(e,t,i,n,r,o,a,s,l,p,d,c){var v="esri-swipe",u="esri-swipe--disabled",w="esri-swipe--vertical",h="esri-swipe--horizontal",y="esri-swipe__container",f="esri-swipe__divider",_="esri-swipe__handle",g="esri-swipe__handle--hidden",b="esri-icon-up-down-arrows",C="esri-swipe__handle-icon",m="esri-icon-drag-horizontal",P="esri-icon-drag-vertical",M="esri-widget",L="esri-disabled",D={handle:!0,divider:!0};return function(e){function t(t){var i=e.call(this,t)||this;return i.direction=null,i.disabled=!1,i.dragLabel=o.dragLabel,i.iconClass=b,i.label=o.widgetLabel,i.leadingLayers=null,i.position=null,i.trailingLayers=null,i.view=null,i.viewModel=new d,i._pointerOffset=null,i._container=null,i._onContainerPointerDown=i._onContainerPointerDown.bind(i),i._onContainerPointerMove=i._onContainerPointerMove.bind(i),i._onContainerPointerUp=i._onContainerPointerUp.bind(i),i}return i(t,e),Object.defineProperty(t.prototype,"visibleElements",{get:function(){return this._get("visibleElements")||D},set:function(e){this._set("visibleElements",r({},D,e))},enumerable:!0,configurable:!0}),t.prototype.renderHandle=function(){var e,t=this.viewModel.direction,i=this.visibleElements,n=((e={})[m]="vertical"===t,e[P]="horizontal"===t,e),r=this.classes(_,!i.handle&&g);return c.tsx("div",{key:"handle",role:"presentation",class:r},c.tsx("span",{"aria-hidden":"true",class:this.classes(C,n)}))},t.prototype.renderDivider=function(){var e=this.visibleElements;return e&&e.divider?c.tsx("div",{key:"divider",role:"presentation",class:f}):null},t.prototype.renderContent=function(){return[this.renderDivider(),this.renderHandle()]},t.prototype.renderContainer=function(){var e=this.disabled,t=this.dragLabel,i=this.viewModel,n=i.max,r=i.min,o=i.direction,a=i.position,s=a+"%",l={top:"vertical"===o?s:null,left:"vertical"===o?null:s},p=this.renderContent();return e?c.tsx("div",{key:"container",role:"presentation",styles:l,class:y},p):c.tsx("div",{tabIndex:0,key:"container",bind:this,afterCreate:this._afterContainerCreate,onkeydown:this._onContainerKeyDown,"touch-action":"none",role:"slider",title:t,"aria-label":t,"aria-orientation":o,"aria-valuemax":""+n,"aria-valuemin":""+r,"aria-valuenow":""+a,"aria-valuetext":s,styles:l,class:y},p)},t.prototype.render=function(){var e,t=this.viewModel,i=t.state,n=t.direction,r="disabled"===i||this.disabled,o=((e={})[L]=r,e[u]=r,e[w]="vertical"===n,e[h]="horizontal"===n,e);return c.tsx("div",{class:this.classes(v,M,o)},"disabled"===i?null:this.renderContainer())},t.prototype._afterContainerCreate=function(e){l.applyLocal(e),this._container=e,e.addEventListener("pointerdown",this._onContainerPointerDown)},t.prototype._calculatePointerOffset=function(e){var t=this.direction,i=e.target,n=("vertical"===t?i.clientHeight:i.clientWidth)/2,r=i.getBoundingClientRect(),o=e.clientX-r.left,a=e.clientY-r.top;this._pointerOffset="vertical"===t?a-n:o-n},t.prototype._onContainerPointerDown=function(e){e.preventDefault(),this._container&&document.activeElement!==this.container&&this._container.focus(),this._calculatePointerOffset(e),document.addEventListener("pointerup",this._onContainerPointerUp),document.addEventListener("pointermove",this._onContainerPointerMove)},t.prototype._onContainerPointerUp=function(e){e.preventDefault(),document.removeEventListener("pointerup",this._onContainerPointerUp),document.removeEventListener("pointermove",this._onContainerPointerMove)},t.prototype._onContainerPointerMove=function(e){e.preventDefault();var t=this._pointerOffset,i=this.container,n=this.direction,r=e.clientX,o=e.clientY,a=i.getBoundingClientRect(),s=a.top,l=a.left,p=a.width,d=a.height,c=("vertical"===n?o-s-t:r-l-t)/("vertical"===n?d:p)*100;this.position=c},t.prototype._getKeyPosition=function(e){var t=a.eventKey(e),i=this.position,n=this.viewModel,r=n.max,o=n.min,s=n.step,l=n.stepMultiplier,p=n.direction,d=s*l;return["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Home","End","PageUp","PageDown"].indexOf(t)>-1&&(e.preventDefault(),e.stopPropagation()),("vertical"===p?"ArrowDown"===t||"ArrowRight"===t:"ArrowUp"===t||"ArrowRight"===t)?i+(e.shiftKey?d:s):("vertical"===p?"ArrowUp"===t||"ArrowLeft"===t:"ArrowDown"===t||"ArrowLeft"===t)?i-(e.shiftKey?d:s):"Home"===t?o:"End"===t?r:("vertical"===p?"PageDown"===t:"PageUp"===t)?i+d:("vertical"===p?"PageUp"===t:"PageDown"===t)?i-d:null},t.prototype._onContainerKeyDown=function(e){var t=this._getKeyPosition(e);"number"==typeof t&&(this.position=t)},n([s.aliasOf("viewModel.direction")],t.prototype,"direction",void 0),n([s.property(),c.renderable()],t.prototype,"disabled",void 0),n([s.property(),c.renderable()],t.prototype,"dragLabel",void 0),n([s.property()],t.prototype,"iconClass",void 0),n([s.property()],t.prototype,"label",void 0),n([s.aliasOf("viewModel.leadingLayers")],t.prototype,"leadingLayers",void 0),n([s.aliasOf("viewModel.position")],t.prototype,"position",void 0),n([s.aliasOf("viewModel.trailingLayers")],t.prototype,"trailingLayers",void 0),n([s.aliasOf("viewModel.view"),c.renderable()],t.prototype,"view",void 0),n([s.property({type:d}),c.renderable(["viewModel.state","viewModel.position","viewModel.direction"])],t.prototype,"viewModel",void 0),n([s.property(),c.renderable()],t.prototype,"visibleElements",null),t=n([s.subclass("esri.widgets.Swipe")],t)}(s.declared(p))}));