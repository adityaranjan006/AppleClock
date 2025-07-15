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
const react_native_gesture_handler_1 = require("react-native-gesture-handler");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const react_native_redash_1 = require("react-native-redash");
const Haptics = __importStar(require("expo-haptics"));
const Constants_1 = require("./Constants");
const CursorOverlay_1 = __importDefault(require("./CursorOverlay"));
var Region;
(function (Region) {
    Region[Region["START"] = 0] = "START";
    Region[Region["END"] = 1] = "END";
    Region[Region["MAIN"] = 2] = "MAIN";
})(Region || (Region = {}));
// Function to trigger haptic feedback safely
const triggerHaptic = (style) => {
    Haptics.impactAsync(style);
};
const Gesture = ({ start, end, startPos, endPos, minAngleSeparation }) => {
    const onGestureEvent = (0, react_native_reanimated_1.useAnimatedGestureHandler)({
        onStart: ({ x, y }, ctx) => {
            if ((0, Constants_1.containedInSquare)({ x, y }, startPos.value, Constants_1.STROKE)) {
                ctx.region = Region.START;
                ctx.offset = start.value;
            }
            else if ((0, Constants_1.containedInSquare)({ x, y }, endPos.value, Constants_1.STROKE)) {
                ctx.region = Region.END;
                ctx.offset = end.value;
            }
            else {
                ctx.region = Region.MAIN;
                const { theta } = (0, react_native_redash_1.canvas2Polar)({ x, y }, Constants_1.CENTER);
                ctx.offset = theta;
            }
        },
        onActive: ({ x, y }, ctx) => {
            const { theta } = (0, react_native_redash_1.canvas2Polar)({ x, y }, Constants_1.CENTER);
            const delta = theta - ctx.offset;
            let newStart = start.value;
            let newEnd = end.value;
            if (ctx.region === Region.START || ctx.region === Region.MAIN) {
                const previousStart = start.value;
                newStart = (0, Constants_1.normalize)(start.value + delta);
                if (Math.floor(previousStart / (Math.PI / 72)) !== Math.floor(newStart / (Math.PI / 72))) {
                    (0, react_native_reanimated_1.runOnJS)(triggerHaptic)(Haptics.ImpactFeedbackStyle.Light);
                }
            }
            if (ctx.region === Region.END || ctx.region === Region.MAIN) {
                const previousEnd = end.value;
                newEnd = (0, Constants_1.normalize)(end.value + delta);
                if (Math.floor(previousEnd / (Math.PI / 72)) !== Math.floor(newEnd / (Math.PI / 72))) {
                    (0, react_native_reanimated_1.runOnJS)(triggerHaptic)(Haptics.ImpactFeedbackStyle.Light);
                }
            }
            if (minAngleSeparation) {
                const currentDuration = (0, Constants_1.absoluteDuration)(newStart, newEnd);
                if (currentDuration < minAngleSeparation) {
                    if (ctx.region === Region.START) {
                        newEnd = (0, Constants_1.normalize)(newStart + minAngleSeparation);
                        (0, react_native_reanimated_1.runOnJS)(triggerHaptic)(Haptics.ImpactFeedbackStyle.Heavy);
                    }
                    else if (ctx.region === Region.END) {
                        newStart = (0, Constants_1.normalize)(newEnd - minAngleSeparation);
                        (0, react_native_reanimated_1.runOnJS)(triggerHaptic)(Haptics.ImpactFeedbackStyle.Heavy);
                    }
                    else if (ctx.region === Region.MAIN) {
                        if (currentDuration < minAngleSeparation) {
                            (0, react_native_reanimated_1.runOnJS)(triggerHaptic)(Haptics.ImpactFeedbackStyle.Heavy);
                            return;
                        }
                    }
                }
                else if (currentDuration > 5.2) {
                    const maxDuration = 5.2;
                    if (ctx.region === Region.START) {
                        newEnd = (0, Constants_1.normalize)(newStart + maxDuration);
                        (0, react_native_reanimated_1.runOnJS)(triggerHaptic)(Haptics.ImpactFeedbackStyle.Heavy);
                    }
                    else if (ctx.region === Region.END) {
                        newStart = (0, Constants_1.normalize)(newEnd - maxDuration);
                        (0, react_native_reanimated_1.runOnJS)(triggerHaptic)(Haptics.ImpactFeedbackStyle.Heavy);
                    }
                    else if (ctx.region === Region.MAIN) {
                        if (currentDuration > maxDuration) {
                            (0, react_native_reanimated_1.runOnJS)(triggerHaptic)(Haptics.ImpactFeedbackStyle.Heavy);
                            return;
                        }
                    }
                }
            }
            start.value = newStart;
            end.value = newEnd;
            ctx.offset = theta;
        },
    });
    return (<react_native_gesture_handler_1.PanGestureHandler onGestureEvent={onGestureEvent}>
      <react_native_reanimated_1.default.View style={react_native_1.StyleSheet.absoluteFill}>
        <CursorOverlay_1.default position={endPos} icon="Bed"/>
        <CursorOverlay_1.default position={startPos} icon="Clock"/>
      </react_native_reanimated_1.default.View>
    </react_native_gesture_handler_1.PanGestureHandler>);
};
exports.default = Gesture;
