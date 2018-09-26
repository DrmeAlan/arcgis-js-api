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
// See http://js.arcgis.com/4.9/esri/copyright.txt for details.

define(["require","exports","../../lib/gl-matrix","../../support/geometryUtils","../../support/mathUtils","./Util"],function(t,e,i,r,n,s){function o(t,e){var i=e[0]-t[0],r=e[1]-t[1],n=e[2]-t[2],s=e[3]-t[3];return i*i+r*r+n*n+s*s}function a(t,e){return t[0]===e[0]&&t[1]===e[1]&&t[2]===e[2]}function h(t,e){return t[0]===e[0]&&t[1]===e[1]&&t[2]===e[2]&&t[3]===e[3]}var p=function(){function t(t,e,n){this._viewUp=i.vec3d.create(),this._viewForward=i.vec3d.create(),this._viewRight=i.vec3d.create(),this._viewport=i.vec4d.create(),this._padding=i.vec4d.create(),this._fov=55/180*Math.PI,this._near=0,this._far=1e3,this._viewDirty=!0,this._viewMatrix=i.mat4d.create(),this._projectionDirty=!0,this._projectionMatrix=i.mat4d.create(),this._viewProjectionDirty=!0,this._viewProjectionMatrix=i.mat4d.create(),this._viewInverseTransposeMatrixDirty=!0,this._viewInverseTransposeMatrix=i.mat4d.create(),this._frustumPlanesDirty=!0,this._frustumPlanes=[r.plane.create(),r.plane.create(),r.plane.create(),r.plane.create(),r.plane.create(),r.plane.create()],this._fullViewport=null,this.relativeElevation=0,this._eye=i.vec3d.create(t),this._center=i.vec3d.create(e),this._up=void 0!==n?i.vec3d.create(n):i.vec3d.create([0,0,1]),this._padding=i.vec4d.create()}return Object.defineProperty(t.prototype,"eye",{get:function(){return this._eye},set:function(t){this._compareAndSetView(t,this._eye)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"center",{get:function(){return this._center},set:function(t){this._compareAndSetView(t,this._center)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"up",{get:function(){return this._up},set:function(t){this._compareAndSetView(t,this._up)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"viewMatrix",{get:function(){return this._ensureViewClean(),this._viewMatrix},set:function(t){i.mat4d.set(t,this._viewMatrix),this._viewDirty=!1,this._viewInverseTransposeMatrixDirty=!0,this._viewProjectionDirty=!0,this._frustumPlanesDirty=!0},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"viewForward",{get:function(){return this._ensureViewClean(),this._viewForward},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"viewUp",{get:function(){return this._ensureViewClean(),this._viewUp},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"viewRight",{get:function(){return this._ensureViewClean(),this._viewRight},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"near",{get:function(){return this._near},set:function(t){this._near!==t&&(this._near=t,this._projectionDirty=!0,this._viewProjectionDirty=!0,this._frustumPlanesDirty=!0)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"far",{get:function(){return this._far},set:function(t){this._far!==t&&(this._far=t,this._projectionDirty=!0,this._viewProjectionDirty=!0,this._frustumPlanesDirty=!0)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"viewport",{get:function(){return this._viewport},set:function(t){this.x=t[0],this.y=t[1],this.width=t[2],this.height=t[3]},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"x",{get:function(){return this._viewport[0]},set:function(t){t+=this._padding[3],this._viewport[0]!==t&&(this._viewport[0]=t,this._projectionDirty=!0,this._viewProjectionDirty=!0,this._frustumPlanesDirty=!0)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"y",{get:function(){return this._viewport[1]},set:function(t){t+=this._padding[2],this._viewport[1]!==t&&(this._viewport[1]=t,this._projectionDirty=!0,this._viewProjectionDirty=!0,this._frustumPlanesDirty=!0)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"width",{get:function(){return this._viewport[2]},set:function(t){this._viewport[2]!==t&&(this._viewport[2]=t,this._projectionDirty=!0,this._viewProjectionDirty=!0,this._frustumPlanesDirty=!0)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"height",{get:function(){return this._viewport[3]},set:function(t){this._viewport[3]!==t&&(this._viewport[3]=t,this._projectionDirty=!0,this._viewProjectionDirty=!0,this._frustumPlanesDirty=!0)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"fullWidth",{get:function(){return this._viewport[2]+this._padding[1]+this._padding[3]},set:function(t){this.width=t-(this._padding[1]+this._padding[3])},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"fullHeight",{get:function(){return this._viewport[3]+this._padding[0]+this._padding[2]},set:function(t){this.height=t-(this._padding[0]+this._padding[2])},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"fullViewport",{get:function(){return this._fullViewport||(this._fullViewport=i.vec4d.create()),this._fullViewport[0]=this._viewport[0]-this._padding[3],this._fullViewport[1]=this._viewport[1]-this._padding[2],this._fullViewport[2]=this.fullWidth,this._fullViewport[3]=this.fullHeight,this._fullViewport},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"aspect",{get:function(){return this.width/this.height},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"padding",{get:function(){return this._padding},set:function(t){this._padding[0]===t[0]&&this._padding[1]===t[1]&&this._padding[2]===t[2]&&this._padding[3]===t[3]||(this._viewport[0]+=t[3]-this._padding[3],this._viewport[1]+=t[2]-this._padding[2],this._viewport[2]-=t[1]+t[3]-(this._padding[1]+this._padding[3]),this._viewport[3]-=t[0]+t[2]-(this._padding[0]+this._padding[2]),i.vec4d.set(t,this._padding),this._projectionDirty=!0,this._viewProjectionDirty=!0,this._frustumPlanesDirty=!0)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"viewProjectionMatrix",{get:function(){return this._viewProjectionDirty&&(i.mat4d.multiply(this.projectionMatrix,this.viewMatrix,this._viewProjectionMatrix),this._viewProjectionDirty=!1),this._viewProjectionMatrix},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"projectionMatrix",{get:function(){if(this._projectionDirty){var t=this.width,e=this.height,r=this.near*Math.tan(this.fovY/2),n=r*this.aspect;i.mat4d.frustum(-n*(1+2*this._padding[3]/t),n*(1+2*this._padding[1]/t),-r*(1+2*this._padding[2]/e),r*(1+2*this._padding[0]/e),this.near,this.far,this._projectionMatrix),this._projectionDirty=!1}return this._projectionMatrix},set:function(t){i.mat4d.set(t,this._projectionMatrix),this._projectionDirty=!1,this._viewProjectionDirty=!0,this._frustumPlanesDirty=!0},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"fov",{get:function(){return this._fov},set:function(t){this._fov=t,this._projectionDirty=!0,this._viewProjectionDirty=!0,this._frustumPlanesDirty=!0},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"fovX",{get:function(){return s.fovd2fovx(this._fov,this.width,this.height)},set:function(t){this._fov=s.fovx2fovd(t,this.width,this.height),this._projectionDirty=!0,this._viewProjectionDirty=!0,this._frustumPlanesDirty=!0},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"fovY",{get:function(){return s.fovd2fovy(this._fov,this.width,this.height)},set:function(t){this._fov=s.fovy2fovd(t,this.width,this.height),this._projectionDirty=!0,this._viewProjectionDirty=!0,this._frustumPlanesDirty=!0},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"distance",{get:function(){return i.vec3d.dist(this._center,this._eye)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"frustumPoints",{get:function(){return this.computeFrustumPoints()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"frustumPlanes",{get:function(){return this._frustumPlanesDirty&&(this._frustumPlanes=this._computeFrustumPlanes(this._frustumPlanes),this._frustumPlanesDirty=!1),this._frustumPlanes},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"viewInverseTransposeMatrix",{get:function(){return(this._viewInverseTransposeMatrixDirty||this._viewDirty)&&(this._viewInverseTransposeMatrix||(this._viewInverseTransposeMatrix=i.mat4d.create()),i.mat4d.inverse(this.viewMatrix,this._viewInverseTransposeMatrix),i.mat4d.transpose(this._viewInverseTransposeMatrix),this._viewInverseTransposeMatrixDirty=!1),this._viewInverseTransposeMatrix},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"perPixelRatio",{get:function(){return Math.tan(this.fovX/2)/this.width},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"aboveGround",{get:function(){return this.relativeElevation>=0},enumerable:!0,configurable:!0}),t.prototype.copyFrom=function(t){return i.vec3d.set(t._eye,this._eye),i.vec3d.set(t._center,this._center),i.vec3d.set(t._up,this._up),i.vec4d.set(t._viewport,this._viewport),i.vec4d.set(t._padding,this._padding),this._near=t._near,this._far=t._far,this._fov=t._fov,this.relativeElevation=t.relativeElevation,t._viewDirty?this._viewDirty=!0:(i.mat4d.set(t._viewMatrix,this._viewMatrix),i.vec3d.set(t._viewRight,this._viewRight),i.vec3d.set(t._viewUp,this._viewUp),i.vec3d.set(t._viewForward,this._viewForward),this._viewDirty=!1),t._projectionDirty?this._projectionDirty=!0:(i.mat4d.set(t._projectionMatrix,this._projectionMatrix),this._projectionDirty=!1),this._viewProjectionDirty=!0,t._frustumPlanesDirty?this._frustumPlanesDirty=!0:(t.copyFrustumPlanes(this._frustumPlanes),this._frustumPlanesDirty=!1),t._viewInverseTransposeMatrixDirty?this._viewInverseTransposeMatrixDirty=!0:(this._viewInverseTransposeMatrix?i.mat4d.set(t._viewInverseTransposeMatrix,this._viewInverseTransposeMatrix):this._viewInverseTransposeMatrix=i.mat4d.create(t._viewInverseTransposeMatrix),this._viewInverseTransposeMatrixDirty=!1),t._fullViewport?this._fullViewport?i.vec4d.set(t._fullViewport,this._fullViewport):this._fullViewport=i.vec4d.create(t._fullViewport):this._fullViewport=null,this},t.prototype.copyViewFrom=function(t){this.eye=t.eye,this.center=t.center,this.up=t.up},t.prototype.copy=function(){var e=new t;return e.copyFrom(this),e},t.prototype.equivalent=function(t){return a(this._eye,t._eye)&&a(this._center,t._center)&&a(this._up,t._up)&&h(this._viewport,t._viewport)&&h(this._padding,t._padding)&&this._near===t._near&&this._far===t._far&&this._fov===t._fov},t.prototype.almostEquals=function(t,e,r){void 0===r&&(r=!1);var n,s=i.vec3d.dist(this._eye,this._center)*(e||5e-4),a=s*s;return r?(i.vec3d.direction(t._center,t._eye,_),i.vec3d.direction(this._center,this._eye,v),n=1e-10):(i.vec3d.set(t._center,_),i.vec3d.set(this._center,v),n=a),i.vec3d.dist2(t._eye,this._eye)<a&&i.vec3d.dist2(_,v)<n&&Math.abs(t._fov-this._fov)<.001&&o(t._padding,this._padding)<.5&&o(t._viewport,this._viewport)<.5},t.prototype.markViewDirty=function(){this._viewDirty=!0,this._frustumPlanesDirty=!0,this._viewProjectionDirty=!0},t.prototype.computePixelSizeAt=function(t){return this.computePixelSizeAtDist(i.vec3d.dist(t,this._eye))},t.prototype.computePixelSizeAtDist=function(t){return 2*t*Math.tan(this.fovX/2)/this.width},t.prototype.computeDistanceFromRadius=function(t,e){return t/Math.tan(Math.min(this.fovX,this.fovY)/(2*(e||1)))},t.prototype.copyFrustumPlanes=function(t){if(!t){t=new Array(6);for(var e=0;e<6;++e)t[e]=i.vec4d.create()}for(var r=this.frustumPlanes,e=0;e<6;e++)i.vec4d.set(r[e],t[e]);return t},t.prototype.computeFrustumPoints=function(t){if(!t){t=new Array(8);for(var e=0;e<8;++e)t[e]=i.vec3d.create()}return s.matrixToFrustumPoints(this.viewMatrix,this.projectionMatrix,t),t},t.prototype.setGLViewport=function(t){var e=this.viewport,i=this.padding;t.setViewport(e[0]-i[3],e[1]-i[2],e[2]+i[1]+i[3],e[3]+i[0]+i[2])},t.prototype.applyProjection=function(t,e,r){void 0===r&&(r=!1),t!==c&&i.vec3d.set(t,c),c[3]=1,r&&(e[2]=-c[2]),i.mat4d.multiplyVec4(this.projectionMatrix,c),i.vec3d.scale(c,1/Math.abs(c[3]));var s=this.fullViewport;return e[0]=n.lerp(0,s[0]+s[2],.5+.5*c[0]),e[1]=n.lerp(0,s[1]+s[3],.5+.5*c[1]),r||(e[2]=.5*(c[2]+1)),e},t.prototype.projectPoint=function(t,e){c[0]=t[0],c[1]=t[1],c[2]=t[2],c[3]=1,i.mat4d.multiplyVec4(this.viewProjectionMatrix,c),i.vec3d.scale(c,1/Math.abs(c[3]));var r=this.fullViewport;return e[0]=n.lerp(0,r[0]+r[2],.5+.5*c[0]),e[1]=n.lerp(0,r[1]+r[3],.5+.5*c[1]),e[2]=.5*(c[2]+1),e},t.prototype.unprojectPoint=function(t,e,r){if(void 0===r&&(r=!1),r)return console.error("Camera.unprojectPoint() not yet implemented for linear Z"),null;if(i.mat4d.multiply(this.projectionMatrix,this.viewMatrix,u),!i.mat4d.inverse(u))return null;var n=this.fullViewport;return c[0]=2*(t[0]-n[0])/n[2]-1,c[1]=2*(t[1]-n[1])/n[3]-1,c[2]=2*t[2]-1,c[3]=1,i.mat4d.multiplyVec4(u,c),0===c[3]?null:(e[0]=c[0]/c[3],e[1]=c[1]/c[3],e[2]=c[2]/c[3],e)},t.prototype.computeUp=function(t){"global"===t?this.computeUpGlobal():this.computeUpLocal()},t.prototype.computeUpGlobal=function(){i.vec3d.subtract(this.center,this.eye,_);var t=i.vec3d.length(this.center);t<1?(i.vec3d.set3(0,0,1,this.up),this.markViewDirty()):Math.abs(i.vec3d.dot(_,this.center))>.9999*i.vec3d.length(_)*t||(i.vec3d.cross(_,this.center,this.up),i.vec3d.cross(this.up,_,this.up),i.vec3d.normalize(this.up),this.markViewDirty())},t.prototype.computeUpLocal=function(){i.vec3d.direction(this.center,this.eye,_),Math.abs(_[2])<=.9999&&(i.vec3d.scale(_,_[2]),i.vec3d.set3(-_[0],-_[1],1-_[2],this.up),i.vec3d.normalize(this.up),this.markViewDirty())},t.prototype._compareAndSetView=function(t,e){a(t,e)||(i.vec3d.set(t,e),this._viewDirty=!0,this._frustumPlanesDirty=!0,this._viewProjectionDirty=!0)},t.prototype._computeFrustumPlanes=function(t){if(!t){t=new Array(6);for(var e=0;e<6;++e)t[e]=r.plane.create()}return s.matrixToFrustumPlanes(this.viewMatrix,this.projectionMatrix,t),t},t.prototype._ensureViewClean=function(){this._viewDirty&&(i.mat4d.lookAt(this._eye,this._center,this._up,this._viewMatrix),i.vec3d.set3(-this._viewMatrix[2],-this._viewMatrix[6],-this._viewMatrix[10],this._viewForward),i.vec3d.set3(this._viewMatrix[1],this._viewMatrix[5],this._viewMatrix[9],this._viewUp),i.vec3d.set3(this._viewMatrix[0],this._viewMatrix[4],this._viewMatrix[8],this._viewRight),this._viewDirty=!1,this._viewInverseTransposeMatrixDirty=!0)},t}(),c=i.vec4d.create(),u=i.mat4d.create(),_=i.vec3d.create(),v=i.vec3d.create();return p});