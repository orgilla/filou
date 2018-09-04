"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(w, ratio, isPercentage, _ref) {
  var minWidth = _ref.minWidth,
      minHeight = _ref.minHeight,
      maxWidth = _ref.maxWidth,
      maxHeight = _ref.maxHeight,
      maxResolution = _ref.maxResolution;
  var width = w; // minWidth/minHeight

  if (minWidth && width < minWidth) {
    width = minWidth;
  }

  if (!isPercentage && minHeight && width * ratio < minHeight) {
    width = minHeight / ratio;
  } // maxWidth/maxHeight


  if (maxWidth && width > maxWidth) {
    width = maxWidth;
  }

  if (!isPercentage && maxHeight && width * ratio > maxHeight) {
    width = maxHeight / ratio;
  } // maxResolution


  if (Math.pow(width, 2) * ratio > maxResolution) {
    width = Math.sqrt(maxResolution / ratio);
  }

  return Math.round(width);
};

exports.default = _default;
//# sourceMappingURL=limit-width.js.map
