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
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const ClockAlarm_svg_1 = __importDefault(require("../assets/ClockAlarm.svg"));
const BedAlarm_svg_1 = __importDefault(require("../assets/BedAlarm.svg"));
const Constants_1 = require("./Constants");
const CursorOverlay = ({ position, icon }) => {
    const style = (0, react_native_reanimated_1.useAnimatedStyle)(() => {
        const { x, y } = position.value;
        return {
            position: "absolute",
            top: 0,
            left: 0,
            width: Constants_1.STROKE,
            height: Constants_1.STROKE,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            transform: [
                { translateX: x - Constants_1.STROKE / 2 },
                { translateY: y - Constants_1.STROKE / 2 },
            ],
        };
    });
    return (<react_native_reanimated_1.default.View style={style}>
      {icon === "Clock" ? <ClockAlarm_svg_1.default width={14} height={14}/> : <BedAlarm_svg_1.default width={14} height={14}/>}
    </react_native_reanimated_1.default.View>);
};
exports.default = CursorOverlay;
