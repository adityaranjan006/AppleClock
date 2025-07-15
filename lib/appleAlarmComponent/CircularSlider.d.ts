import React from "react";
import Animated from "react-native-reanimated";
interface CircularProps {
    start: Animated.SharedValue<number>;
    end: Animated.SharedValue<number>;
    minAngleSeparation?: number;
    actualBedTime: string;
    actualAlarmTime: string;
}
declare const CircularSlider: ({ start, end, minAngleSeparation, actualBedTime, actualAlarmTime }: CircularProps) => React.JSX.Element;
export default CircularSlider;
