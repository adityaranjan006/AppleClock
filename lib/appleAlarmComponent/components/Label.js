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
const react_native_1 = require("react-native");
const react_native_reanimated_1 = require("react-native-reanimated");
const clockNav_svg_1 = __importDefault(require("../../assets/clockNav.svg"));
const bedNav_svg_1 = __importDefault(require("../../assets/bedNav.svg"));
const react_native_2 = require("react-native");
const Constants_1 = require("../Constants");
const { height } = react_native_2.Dimensions.get("window");
const styles = react_native_1.StyleSheet.create({
    container: {
        justifyContent: "space-around",
        alignItems: "center",
        gap: 8,
        width: 100,
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    iconLabelContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    time: {
        color: "white",
        fontSize: 20,
        fontFamily: "Inter-bold",
        fontWeight: "500",
        textAlign: "center",
        minWidth: 120,
    },
    label: {
        fontSize: 14,
        fontFamily: "Inter-bold",
        fontWeight: "700",
        color: "#FFFFFF",
    },
});
const getAmPm = (hours) => {
    return hours >= 12 ? "pm" : "am";
};
const formatTimeWithAmPm = (hours, minutes) => {
    const ampm = getAmPm(hours);
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
};
const convertTo12HourFormat = (hours, minutes) => {
    const formattedHours = hours > 12 ? hours - 12 : (hours === 0 ? 12 : hours);
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}`;
};
const normalizeHours = (hours) => {
    return hours % 24;
};
const Label = ({ theta, label, iconType, setTime }) => {
    const [timeDisplay, setTimeDisplay] = (0, react_1.useState)("00:00");
    const debounceTimerRef = (0, react_1.useRef)(null);
    const updateTimeInMinutes = (rawMinutes) => {
        try {
            const totalMinutes = isNaN(rawMinutes) ? 0 : Math.round(rawMinutes);
            const hours = Math.floor(totalMinutes / 60);
            const minutes = Math.floor(totalMinutes % 60);
            const formattedTime = formatTimeWithAmPm(hours, minutes);
            setTime(formattedTime);
            setTimeDisplay(formattedTime);
        }
        catch (e) {
            setTimeDisplay("00:00");
        }
    };
    const debouncedUpdateTimeIn5Minutes = (rawMinutes) => {
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
        debounceTimerRef.current = setTimeout(() => {
            try {
                // Round to the nearest 5 minutes
                const totalMinutes = isNaN(rawMinutes) ? 0 : Math.round(rawMinutes / 5) * 5;
                let hours = Math.floor(totalMinutes / 60);
                const minutes = Math.floor(totalMinutes % 60);
                hours = normalizeHours(hours);
                const formattedTime = formatTimeWithAmPm(hours, minutes);
                setTime(formattedTime);
                setTimeDisplay(formattedTime);
            }
            catch (e) {
                setTimeDisplay("00:00");
            }
        }, 180);
    };
    (0, react_native_reanimated_1.useAnimatedReaction)(() => theta.value, (currentValue, previousValue) => {
        if (currentValue !== previousValue) {
            const minutes = (0, Constants_1.radToMinutes)(currentValue);
            (0, react_native_reanimated_1.runOnJS)(debouncedUpdateTimeIn5Minutes)(minutes);
        }
    }, [theta]);
    // Clean up the timer when component unmounts
    (0, react_1.useEffect)(() => {
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, []);
    react_1.default.useEffect(() => {
        debouncedUpdateTimeIn5Minutes((0, Constants_1.radToMinutes)(theta.value));
    }, []);
    const iconSize = height * 0.016;
    const Icon = iconType === "clock" ? clockNav_svg_1.default : bedNav_svg_1.default;
    return (<react_native_1.View style={styles.container}>
      <react_native_1.View style={styles.iconLabelContainer}>
        <Icon width={iconSize} height={iconSize}/>
        <react_native_1.Text style={styles.label}>{label}</react_native_1.Text>
      </react_native_1.View>
      <react_native_1.Text style={styles.time}>{timeDisplay}</react_native_1.Text>
    </react_native_1.View>);
};
exports.default = Label;
