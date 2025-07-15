"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_native_linear_gradient_1 = require("react-native-linear-gradient");
const Constants_1 = require("../Constants");
const Label_1 = __importDefault(require("./Label"));
const styles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: "#0F0F0F",
        justifyContent: "center",
    },
    values: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 10
    },
    duration: {
        fontFamily: "SFProRounded-Medium",
        fontSize: 24,
        textAlign: "center",
        marginTop: Constants_1.PADDING,
        color: "white",
    },
    Gradient: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 16,
        borderColor: "#1F1F1F"
    }
});
const Container = ({ start, end, children, bedTimeSet, alarmTimeSet }) => {
    return (<react_native_linear_gradient_1.LinearGradient colors={["#0F0F0F", "#0F0F0F"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.Gradient}>
      {children}
      <react_native_1.View style={{ width: "100%", alignItems: "center", marginTop: 15 }}>
        <react_native_1.View style={styles.values}>
          <Label_1.default theta={end} label="BEDTIME" iconType="bed" setTime={bedTimeSet}/>
          <Label_1.default theta={start} label="WAKE UP" iconType="clock" setTime={alarmTimeSet}/>
        </react_native_1.View>
      </react_native_1.View>
    </react_native_linear_gradient_1.LinearGradient>);
};
exports.default = Container;
