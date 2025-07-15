"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_native_reanimated_1 = require("react-native-reanimated");
const CircularSlider_1 = __importDefault(require("./CircularSlider"));
const Constants_1 = require("./Constants");
const Container_1 = __importDefault(require("./components/Container"));
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        //padding: PADDING,
    },
    title: {
        fontFamily: "SFProRounded-Semibold",
        fontSize: 36,
        color: "white",
        marginBottom: 32,
    },
});
const MIN_ANGLE_SEPARATION = Constants_1.PI / 7;
const timeToRadians = (timeStr) => {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (period.toLowerCase() === 'pm' && hours < 12) {
        hours += 12;
    }
    if (period.toLowerCase() === 'am' && hours === 12) {
        hours = 0;
    }
    const angle = (6 - hours) * Constants_1.ONE_HOUR_RAD - minutes * Constants_1.ONE_MINUTE_RAD;
    return angle;
};
const Bedtime = ({ bedTimeSet, alarmTimeSet, actualBedTime, actualAlarmTime }) => {
    const start = (0, react_native_reanimated_1.useSharedValue)(timeToRadians(actualAlarmTime));
    const end = (0, react_native_reanimated_1.useSharedValue)(timeToRadians(actualBedTime));
    react_1.default.useEffect(() => {
        start.value = timeToRadians(actualAlarmTime);
        end.value = timeToRadians(actualBedTime);
    }, [actualAlarmTime, actualBedTime]);
    const angleDiff = (0, react_native_reanimated_1.useDerivedValue)(() => {
        const diff = (end.value - start.value + Constants_1.TAU) % Constants_1.TAU;
        if (diff < MIN_ANGLE_SEPARATION) {
            return (start.value + MIN_ANGLE_SEPARATION) % Constants_1.TAU;
        }
        return end.value;
    });
    react_1.default.useEffect(() => {
        end.value = angleDiff.value;
    }, [angleDiff]);
    return (<react_native_1.View style={styles.container}>
      <Container_1.default start={start} end={end} bedTimeSet={bedTimeSet} alarmTimeSet={alarmTimeSet} actualBedTime={actualBedTime} actualAlarmTime={actualAlarmTime}>
        <CircularSlider_1.default start={start} end={end} minAngleSeparation={MIN_ANGLE_SEPARATION} actualBedTime={actualBedTime} actualAlarmTime={actualAlarmTime}/>
      </Container_1.default>
    </react_native_1.View>);
};
exports.default = Bedtime;
