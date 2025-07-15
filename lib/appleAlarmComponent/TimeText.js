"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const TimerText = ({ minutesLong, ...rest }) => {
    const hours = Math.floor(minutesLong / 60);
    const minutes = minutesLong - hours * 60;
    return (<react_native_1.View {...rest}>
      <react_native_1.View style={styles.timerContainer}>
        <react_native_1.Text style={styles.time}>{hours}</react_native_1.Text>
        <react_native_1.Text style={styles.text}>HR</react_native_1.Text>
        <react_native_1.Text style={[styles.time, styles.span]}>{minutes}</react_native_1.Text>
        <react_native_1.Text style={styles.text}>MIN</react_native_1.Text>
      </react_native_1.View>
    </react_native_1.View>);
};
const styles = react_native_1.StyleSheet.create({
    timerContainer: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        flexDirection: 'row',
    },
    time: {
        color: 'white',
        fontSize: 35,
        fontWeight: "300",
    },
    span: {
        marginLeft: 10,
    },
    text: {
        color: 'white',
        fontSize: 15,
        fontWeight: "300",
        marginBottom: 5,
    },
});
exports.default = TimerText;
