"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const react_native_redash_1 = require("react-native-redash");
const react_native_svg_1 = __importStar(require("react-native-svg"));
const react_native_gesture_handler_1 = require("react-native-gesture-handler");
const Constants_1 = require("./Constants");
const Cursor_1 = __importDefault(require("./Cursor"));
const Gesture_1 = __importDefault(require("./Gesture"));
const Quadrant_1 = __importDefault(require("./components/Quadrant"));
const AnimatedPath = react_native_reanimated_1.default.createAnimatedComponent(react_native_svg_1.Path);
const CircularSlider = ({ start, end, minAngleSeparation, actualBedTime, actualAlarmTime }) => {
    const startPos = (0, react_native_reanimated_1.useDerivedValue)(() => {
        "worklet";
        return (0, react_native_redash_1.polar2Canvas)({ theta: start.value, radius: Constants_1.R }, Constants_1.CENTER);
    }, [start]);
    const endPos = (0, react_native_reanimated_1.useDerivedValue)(() => {
        "worklet";
        return (0, react_native_redash_1.polar2Canvas)({ theta: end.value, radius: Constants_1.R }, Constants_1.CENTER);
    }, [end]);
    const duration = (0, react_native_reanimated_1.useDerivedValue)(() => {
        "worklet";
        return (0, Constants_1.absoluteDuration)(start.value, end.value);
    }, [start, end]);
    const animatedProps = (0, react_native_reanimated_1.useAnimatedProps)(() => {
        "worklet";
        const p1 = startPos.value;
        const p2 = endPos.value;
        return {
            d: `M ${p1.x} ${p1.y} ${(0, Constants_1.arc)(p2.x, p2.y, duration.value > Constants_1.PI, false)}`,
        };
    });
    return (<react_native_gesture_handler_1.GestureHandlerRootView style={{ paddingBottom: 10, paddingHorizontal: 25 }}>
      <react_native_1.View>
        <react_native_svg_1.default width={Constants_1.SIZE} height={Constants_1.SIZE}>
          <react_native_svg_1.Defs>
          <react_native_svg_1.Mask id="mask">
            <AnimatedPath stroke="#FD9F07" strokeWidth={Constants_1.STROKE} animatedProps={animatedProps}/>
          </react_native_svg_1.Mask>
        </react_native_svg_1.Defs>
        <Quadrant_1.default actualBedTime={actualBedTime} actualAlarmTime={actualAlarmTime}/>
        <Cursor_1.default pos={startPos}/>
        <Cursor_1.default pos={endPos}/>
      </react_native_svg_1.default>
      <Gesture_1.default start={start} end={end} startPos={startPos} endPos={endPos} minAngleSeparation={minAngleSeparation}/>
    </react_native_1.View>
    </react_native_gesture_handler_1.GestureHandlerRootView>);
};
exports.default = CircularSlider;
