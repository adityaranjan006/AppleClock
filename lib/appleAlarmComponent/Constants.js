"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arc = exports.formatDuration2 = exports.formatDuration = exports.radToMinutes = exports.absoluteDuration = exports.normalize = exports.containedInSquare = exports.ONE_HOUR_RAD = exports.ONE_MINUTE_RAD = exports.CENTER = exports.TAU = exports.PI = exports.R = exports.STROKE = exports.SIZE = exports.MARGIN = exports.PADDING = void 0;
const react_native_1 = require("react-native");
const { width } = react_native_1.Dimensions.get("window");
exports.PADDING = 24;
exports.MARGIN = 12;
exports.SIZE = width - exports.PADDING * 2 - exports.MARGIN * 2;
exports.STROKE = 40;
exports.R = (exports.SIZE - exports.STROKE) / 2;
exports.PI = Math.PI;
exports.TAU = 2 * exports.PI;
exports.CENTER = { x: exports.SIZE / 2, y: exports.SIZE / 2 };
exports.ONE_MINUTE_RAD = exports.PI / 720;
exports.ONE_HOUR_RAD = exports.PI / 12;
const containedInSquare = (value, center, side) => {
    "worklet";
    const topLeft = { x: center.x - side / 2, y: center.y - side / 2 };
    return (value.x >= topLeft.x &&
        value.y >= topLeft.y &&
        value.x <= topLeft.x + side &&
        value.y <= topLeft.y + side);
};
exports.containedInSquare = containedInSquare;
const normalize = (value) => {
    "worklet";
    const rest = value % exports.TAU;
    return rest > 0 ? rest : exports.TAU + rest;
};
exports.normalize = normalize;
const absoluteDuration = (start, end) => {
    "worklet";
    // Normalize both angles to be between 0 and TAU
    const normalizedStart = (0, exports.normalize)(start);
    const normalizedEnd = (0, exports.normalize)(end);
    // Calculate clockwise distance from start to end
    let duration = normalizedEnd - normalizedStart;
    // If duration is negative, it means we need to go around the circle
    if (duration < 0) {
        duration += exports.TAU;
    }
    return duration;
};
exports.absoluteDuration = absoluteDuration;
const radToMinutes = (rad) => {
    "worklet";
    const shiftedRad = (0, exports.normalize)(exports.PI / 2 - rad);
    return (24 * 60 * shiftedRad) / exports.TAU;
};
exports.radToMinutes = radToMinutes;
const preFormatDuration = (raw) => {
    "worklet";
    const duration = Math.round(raw);
    const minutes = duration % 60;
    const hours = (duration - minutes) / 60;
    return { hours, minutes };
};
const formatDuration = (duration) => {
    "worklet";
    const { hours, minutes } = preFormatDuration(duration);
    return `${("" + hours).padStart(2, "0")}:${("" + minutes).padStart(2, "0")}`;
};
exports.formatDuration = formatDuration;
const formatDuration2 = (duration) => {
    "worklet";
    const { hours, minutes } = preFormatDuration(duration);
    return `${hours} hr ${minutes} min`;
};
exports.formatDuration2 = formatDuration2;
const arc = (x, y, large = false, sweep = false) => {
    "worklet";
    return `A ${exports.R} ${exports.R} 0 ${large ? "1" : "0"} ${sweep ? "1" : "0"} ${x} ${y}`;
};
exports.arc = arc;
