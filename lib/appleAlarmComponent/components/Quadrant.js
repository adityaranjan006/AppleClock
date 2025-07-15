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
const react_1 = __importStar(require("react"));
const react_native_redash_1 = require("react-native-redash");
const react_native_svg_1 = require("react-native-svg");
const moonAlarm_svg_1 = __importDefault(require("../../assets/moonAlarm.svg"));
const sunAlarm_svg_1 = __importDefault(require("../../assets/sunAlarm.svg"));
const react_native_1 = require("react-native");
const Constants_1 = require("../Constants");
const convertTime24Hour_1 = require("../../utils/convertTime24Hour");
const LINES = 60;
const DELTA = Constants_1.TAU / LINES;
const { height } = react_native_1.Dimensions.get("window");
const Quadrant = ({ actualBedTime, actualAlarmTime }) => {
    // Calculate duration between bedtime and alarm time in hours
    const durationGap = (0, react_1.useMemo)(() => {
        const bedHour = parseInt((0, convertTime24Hour_1.convertTo24Hour)(actualBedTime));
        const alarmHour = parseInt((0, convertTime24Hour_1.convertTo24Hour)(actualAlarmTime));
        return (alarmHour - bedHour + 24) % 24;
    }, [actualBedTime, actualAlarmTime]);
    // Predefined hour labels to simplify switch case
    const hourLabels = [
        "12 AM", "2", "4", "6 AM", "8", "10",
        "12 PM", "2", "4", "6 PM", "8", "10"
    ];
    return (<>
      {/* Gradients for circle coloring */}
      <react_native_svg_1.Defs>
        {/* <LinearGradient id="warningGradient" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FF9F0A" />
          <Stop offset="1" stopColor="#FF9500" />
        </LinearGradient> */}
        <react_native_svg_1.LinearGradient id="circleGradient" x1="0" y1="0" x2="0" y2="1">
          <react_native_svg_1.Stop offset="0" stopColor="#AEAEAE"/>
          <react_native_svg_1.Stop offset="1" stopColor="#5D5D5D"/>
        </react_native_svg_1.LinearGradient>
      </react_native_svg_1.Defs>

      {/* Main Clock Circle */}
      <react_native_svg_1.Circle strokeWidth={Constants_1.STROKE} stroke="#1C1B1D" cx={Constants_1.SIZE / 2} cy={Constants_1.SIZE / 2} r={Constants_1.R}/>

      <react_native_svg_1.G mask="url(#mask)">
        {/* Color circle based on sleep duration */}
        <react_native_svg_1.Circle fill={"url(#circleGradient)"} cx={Constants_1.SIZE / 2} cy={Constants_1.SIZE / 2} r={Constants_1.R + Constants_1.PADDING} strokeLinecap="round"/>

        {/* Small tick marks for minutes */}
        {Array.from({ length: LINES }, (_, i) => {
            const theta = DELTA * i;
            const p1 = (0, react_native_redash_1.polar2Canvas)({ theta, radius: Constants_1.R - Constants_1.PADDING / 3 }, Constants_1.CENTER);
            const p2 = (0, react_native_redash_1.polar2Canvas)({ theta, radius: Constants_1.R + Constants_1.PADDING / 3 }, Constants_1.CENTER);
            return <react_native_svg_1.Line key={i} stroke="#000000" strokeWidth={3} strokeLinecap="round" x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}/>;
        })}
      </react_native_svg_1.G>

      {/* Hour tick marks */}
      {Array.from({ length: 24 }, (_, i) => {
            const theta = (i * Constants_1.TAU) / 24;
            const p1 = (0, react_native_redash_1.polar2Canvas)({ theta, radius: Constants_1.R - 1.4 * Constants_1.PADDING }, Constants_1.CENTER);
            const p2 = (0, react_native_redash_1.polar2Canvas)({ theta, radius: Constants_1.R - (2.5 * Constants_1.PADDING) / 2 }, Constants_1.CENTER);
            return (<react_native_svg_1.Line key={i} stroke="#646367" strokeWidth={i % 12 === 0 ? 2 : i % 2 === 0 ? 1.5 : 1} strokeLinecap="round" x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}/>);
        })}

      {/* Moon and Sun Icons */}
      <react_native_svg_1.G>
        <react_native_svg_1.G transform={`translate(${Constants_1.SIZE / 2 - 6},${Constants_1.SIZE / 2 - Constants_1.R + 3.2 * Constants_1.PADDING - 10})`}>
          <moonAlarm_svg_1.default width={height * 0.015} height={height * 0.015}/>
        </react_native_svg_1.G>
        <react_native_svg_1.G transform={`translate(${Constants_1.SIZE / 2 - 6},${Constants_1.SIZE / 2 + Constants_1.R - 3.2 * Constants_1.PADDING - 10})`}>
          <sunAlarm_svg_1.default width={height * 0.015} height={height * 0.015}/>
        </react_native_svg_1.G>
      </react_native_svg_1.G>

      {/* Hour Labels */}
      {hourLabels.map((label, i) => {
            const theta = (-i * Constants_1.TAU) / 12 + Constants_1.TAU / 4;
            const position = (0, react_native_redash_1.polar2Canvas)({ theta, radius: Constants_1.R - 2.2 * Constants_1.PADDING }, Constants_1.CENTER);
            const isMajorLabel = label.includes("AM") || label.includes("PM");
            return (<react_native_svg_1.Text key={i} x={position.x} y={position.y} fill="#646367" fontSize={isMajorLabel ? 11 : 10} fontWeight={isMajorLabel ? "bold" : "normal"} textAnchor="middle" alignmentBaseline="middle">
            {label}
          </react_native_svg_1.Text>);
        })}
    </>);
};
exports.default = Quadrant;
