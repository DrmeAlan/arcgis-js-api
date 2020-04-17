precision mediump float;

// texture coordinates.
varying highp vec2 v_texcoord;

#include <raster/common/common.glsl>

#include <raster/lut/colorize.glsl>

void main() {
  // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  // return;
  vec2 pixelLocation = getPixelLocation(v_texcoord);
  if (isOutside(pixelLocation)) {
     gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
     return;
  }
  vec4 currentPixel = getPixel(pixelLocation);
  // we use float texture here
  gl_FragColor = colorize(currentPixel, true);
}